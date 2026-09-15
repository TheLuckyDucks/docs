#!/usr/bin/env node
/**
 * Capture real screenshots from the live site into `.gitbook/assets/`.
 *
 * It drives a Chrome you are already running, over its DevTools port, rather
 * than carrying a browser of its own. On the usual host that means node lives
 * in WSL and Chrome on Windows, so `.wslconfig` needs `networkingMode=mirrored`
 * for WSL to reach the port at all: Chrome refuses to bind it anywhere but
 * loopback, whatever `--remote-debugging-address` says. `--cdp` points
 * somewhere else when that is not the arrangement.
 *
 * Two modes, because the site shows a guest far less than it shows a player:
 *
 * - **Guest**, the default, comes in through the "continue as guest" button and
 *   takes what needs no wallet: the login screen, the race list, a race someone
 *   else is in, tournaments, teams, the marketplace.
 * - **`--session`** drives the tab you have already signed in to, so the same
 *   manifest reaches the create form and the player page. You connect the
 *   wallet by hand once. Nothing here ever signs anything.
 *
 * It only ever OVERWRITES. A shot whose file does not already exist is
 * refused, because `sync-assets.mjs` owns which files exist and `check-pages`
 * fails on a file no page references. So: add the figure, run `npm run assets`,
 * then capture over the placeholder it built.
 *
 * Usage: npm run capture                      every guest shot
 *        npm run capture -- --list            what it knows how to take
 *        npm run capture -- --only app-lobby-list,app-team-roster
 *        npm run capture -- --session         the shots needing a signed-in tab
 *        npm run capture -- --out /tmp/shots  stage them instead of landing them
 *
 * Start Chrome first, from Windows, on a profile of its own:
 *   chrome.exe --remote-debugging-port=9222 --user-data-dir=%TEMP%\ld-shots
 * Add `--headless=new` for guest runs. Leave it off for `--session`, so you can
 * reach the wallet.
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { chromium } from "playwright-core";

const ROOT = process.cwd();
const ASSETS = join(".gitbook", "assets");

const arg = (name, fallback) => {
  const i = process.argv.indexOf(name);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
};
const has = (name) => process.argv.includes(name);

const CDP = arg("--cdp", "http://localhost:9222");
const BASE = arg("--base", "https://theluckyducks.com");
const OUT = arg("--out", null);
const RACE = arg("--race", null);
const SESSION = has("--session");
const ONLY = (arg("--only", "") || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

/** Desktop and phone, both at 2x, which is the ratio the shot list asks for. */
const DESKTOP = {
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
};
const PHONE = {
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
};

/**
 * The app's modals are `GlassModal`, which carries a hand-written size class
 * and no `role="dialog"`, so this is what a modal has to be found by. Only one
 * is ever open, which is what keeps the size classes from colliding.
 */
const MODAL = ".modal-sm, .modal-md, .modal-lg";

/**
 * What each shot is and how to reach it.
 *
 * `target` is both the thing waited for and the thing cropped to, so a shot
 * cannot come out as a picture of a loading spinner: a selector that never
 * resolves fails the shot by name instead of writing something wrong.
 *
 * `wallet: true` marks one the site will not show a guest. Those are skipped
 * unless `--session`, where they run against your signed-in tab.
 */
const SHOTS = [
  // ---------- no wallet, the app
  {
    stem: "app-connect-wallet",
    folder: "introduction",
    kind: "banner",
    path: "/app/",
    guestEntry: false, // this shot IS the login screen
    target: '[data-cy="login"]',
    clip: "viewport",
    viewport: { width: 1200, height: 760 },
  },
  {
    stem: "app-lobby-list",
    folder: "introduction",
    kind: "pair",
    path: "/app/races",
    target: '[data-cy="race-grid"]',
    clip: "viewport",
  },
  {
    stem: "app-race-cards-modes",
    folder: "races",
    kind: "banner",
    path: "/app/races",
    target: '[data-cy="race-grid"]',
    clip: "viewport",
    viewport: { width: 1440, height: 560 },
    note: "wants two cards, one of each mode. Check the crop before keeping it",
  },
  {
    stem: "app-race-detail-modal",
    folder: "races",
    kind: "pair",
    path: "/app/races",
    race: true,
    steps: [{ click: '[data-cy="race-card"][data-status="Open"]' }],
    target: MODAL,
  },
  {
    stem: "app-lobby-participants",
    folder: "races",
    kind: "pair",
    path: "/app/races",
    race: true,
    steps: [{ click: '[data-cy="race-card"][data-status="Open"]' }],
    target: MODAL,
    note: "wants a part-filled lobby, so pick one: --race 4926",
  },
  {
    stem: "app-lobby-filling",
    folder: "introduction",
    kind: "pair",
    path: "/app/races",
    race: true,
    steps: [{ click: '[data-cy="race-card"][data-status="Open"]' }],
    target: MODAL,
    note: "wants four of five seats taken, so pick one: --race 4926",
  },
  {
    stem: "app-tournament-page",
    folder: "competition",
    kind: "pair",
    path: "/app/tournaments",
    target: '[data-cy="tournament-hero"]',
    note: "only renders while a tournament is running. Fails otherwise",
  },
  {
    stem: "app-team-roster",
    folder: "competition",
    kind: "pair",
    path: "/app/teams",
    steps: [{ click: '[data-cy="team-row"]', text: "TopDegens" }],
    target: '[data-cy="team-detail-modal"]',
    note: "pinned to TopDegens, so the roster is the same team every time",
  },

  // ---------- no wallet, the marketplace
  {
    stem: "app-marketplace-collections",
    folder: "nfts",
    kind: "pair",
    path: "/marketplace/",
    target: '[data-cy="tier-card"]',
    clip: "viewport",
  },
  {
    stem: "app-marketplace-rent-button",
    folder: "nfts",
    kind: "banner",
    path: "/marketplace/",
    target: '[data-cy="tier-card"]',
    clip: "viewport",
    viewport: { width: 1000, height: 560 },
    note: "needs a rentable tier in view. Confirm Rent is inside the crop",
  },

  // ---------- needs a signed-in tab (--session)
  {
    stem: "app-create-race-form",
    folder: "races",
    kind: "pair",
    path: "/app/races",
    wallet: true,
    steps: [{ click: '[data-cy="create-race"]' }],
    target: '[data-cy="create-modal"]',
  },
  {
    stem: "app-entry-fee-field",
    folder: "races",
    kind: "banner",
    path: "/app/races",
    wallet: true,
    steps: [{ click: '[data-cy="create-race"]' }],
    target: '[data-cy="currency-picker"]',
  },
  {
    stem: "app-max-players-field",
    folder: "races",
    kind: "banner",
    path: "/app/races",
    wallet: true,
    steps: [{ click: '[data-cy="create-race"]' }],
    target: '[data-cy="max-players"]',
  },
  {
    stem: "app-race-mode-picker",
    folder: "races",
    kind: "banner",
    path: "/app/races",
    wallet: true,
    steps: [{ click: '[data-cy="create-race"]' }],
    target: '[data-cy="race-mode-picker"]',
  },
  {
    stem: "app-join-setting-picker",
    folder: "races",
    kind: "banner",
    path: "/app/races",
    wallet: true,
    steps: [{ click: '[data-cy="create-race"]' }],
    target: '[data-cy="validation-picker"]',
  },
  {
    stem: "app-allowed-players-list",
    folder: "races",
    kind: "banner",
    path: "/app/races",
    wallet: true,
    steps: [{ click: '[data-cy="create-race"]' }],
    target: '[data-cy="allow-list"]',
    note: "pick Allowed Players in the join setting first, or the list is absent",
  },
  {
    stem: "app-creator-share-preview",
    folder: "economy",
    kind: "banner",
    path: "/app/races",
    wallet: true,
    steps: [{ click: '[data-cy="create-race"]' }],
    target: '[data-cy="creator-fee-share"]',
  },
  {
    stem: "app-play-balance-panel",
    folder: "economy",
    kind: "banner",
    path: "/app/player",
    wallet: true,
    target: '[data-cy="vault-balance"]',
  },
  {
    stem: "app-payout-target-setting",
    folder: "economy",
    kind: "banner",
    path: "/app/player",
    wallet: true,
    target: '[data-cy="payout-target"]',
  },
  {
    stem: "app-pay-from-balance-checkbox",
    folder: "economy",
    kind: "banner",
    path: "/app/player",
    wallet: true,
    target: '[data-cy="vault-spend-toggle"]',
  },
  {
    stem: "app-delegated-signing-panel",
    folder: "races",
    kind: "banner",
    path: "/app/player",
    wallet: true,
    target: '[data-cy="grant-status"]',
  },
  {
    stem: "app-delegation-duration-selector",
    folder: "races",
    kind: "banner",
    path: "/app/player",
    wallet: true,
    target: '[data-cy="grant-duration"]',
  },
  {
    stem: "app-delegation-revoke",
    folder: "races",
    kind: "banner",
    path: "/app/player",
    wallet: true,
    target: '[data-cy="grant-revoke"]',
  },
];

/**
 * Where a shot's files land, one per viewport it needs.
 *
 * A shot can override the desktop viewport, which is how a banner gets to be
 * banner-shaped: a wide short window clipped to itself is a strip of the page,
 * where the same crop out of a full desktop window would be a screenshot of
 * everything.
 */
const targetsFor = (shot) => {
  const dir = OUT ? OUT : join(ROOT, ASSETS, shot.folder);
  const desktop = shot.viewport
    ? { ...DESKTOP, viewport: shot.viewport }
    : DESKTOP;
  return shot.kind === "pair"
    ? [
        { file: join(dir, shot.stem + "-desktop.png"), device: desktop },
        { file: join(dir, shot.stem + "-mobile.png"), device: PHONE },
      ]
    : [{ file: join(dir, shot.stem + "-banner.png"), device: desktop }];
};

const refuseIfAbsent = (file) => {
  if (!OUT && !existsSync(file)) {
    throw new Error(
      "no file at " + file + ". Add the figure, then run `npm run assets`",
    );
  }
};

/**
 * Click through the guest door when the login screen is what loaded.
 *
 * It waits for the button rather than asking whether it is there yet: the page
 * is a React app behind `domcontentloaded`, so an immediate look finds nothing
 * and the shot then times out on a login screen that was always going to
 * become the race list. A timeout here means we are already past the door.
 */
const enterGuest = async (page) => {
  const guest = page.locator('[data-cy="login-guest"]').first();
  try {
    await guest.waitFor({ state: "visible", timeout: 10000 });
  } catch {
    return;
  }
  await guest.click();
  await page.waitForTimeout(2500);
};

const runSteps = async (page, steps = []) => {
  for (const step of steps) {
    if (step.click) {
      // `text` narrows a row selector to the one you meant. A list orders
      // itself by whatever is live, so "the first team" is a different team
      // every week, and a shot on a page should not be.
      const loc = step.text
        ? page.locator(step.click).filter({ hasText: step.text })
        : page.locator(step.click);
      await loc.first().click({ timeout: 15000 });
      await page.waitForTimeout(1200);
    }
    if (step.waitFor) {
      await page.locator(step.waitFor).first().waitFor({ timeout: 15000 });
    }
    if (step.wait) await page.waitForTimeout(step.wait);
  }
};

/**
 * The element's own box, widened to hold whatever pokes out of it.
 *
 * A modal's share button sits half outside the panel's top edge, so clipping to
 * the panel cuts it in half, which reads as a rendering bug rather than as a
 * crop. This takes the union with every descendant, caps the growth at 80px a
 * side so one stray fixed-position child cannot swallow the page, and stays
 * inside the viewport because a clip that leaves it is an error.
 */
const bounds = async (page, el) => {
  const box = await el.evaluate((node) => {
    const r = node.getBoundingClientRect();
    let [x1, y1, x2, y2] = [r.left, r.top, r.right, r.bottom];
    for (const child of node.querySelectorAll("*")) {
      const c = child.getBoundingClientRect();
      if (!c.width || !c.height) continue;
      if (c.left < r.left - 48 || c.right > r.right + 48) continue;
      if (c.top < r.top - 48 || c.bottom > r.bottom + 48) continue;
      x1 = Math.min(x1, c.left);
      y1 = Math.min(y1, c.top);
      x2 = Math.max(x2, c.right);
      y2 = Math.max(y2, c.bottom);
    }
    return { x1, y1, x2, y2, vw: innerWidth, vh: innerHeight };
  });
  const x = Math.max(0, Math.floor(box.x1));
  const y = Math.max(0, Math.floor(box.y1));
  return {
    x,
    y,
    width: Math.min(Math.ceil(box.x2), box.vw) - x,
    height: Math.min(Math.ceil(box.y2), box.vh) - y,
  };
};

/**
 * Serve nothing from cache.
 *
 * The site's backgrounds are seasonal, so a capture run days apart can be
 * dressed differently from the site everyone else is looking at, and a browser
 * profile that is reused between runs holds the old art indefinitely. This
 * forces every request to go to the network for the life of the page.
 */
const noCache = async (page) => {
  const cdp = await page.context().newCDPSession(page);
  await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
};

const shoot = async (page, shot, file) => {
  await noCache(page).catch(() => {});
  // `--race` deep-links a race you chose, instead of taking whichever card is
  // at the top of a live list. The app routes /app/races/<id> to that race's
  // modal, so the click step is then redundant.
  const deepLink = shot.race && RACE;
  await page.goto(BASE + (deepLink ? "/app/races/" + RACE : shot.path), {
    waitUntil: "domcontentloaded",
    timeout: 45000,
  });
  if (shot.guestEntry !== false && !SESSION) await enterGuest(page);
  if (!deepLink) await runSteps(page, shot.steps);
  const el = page.locator(shot.target).first();
  await el.waitFor({ state: "visible", timeout: 20000 });
  // A viewport shot wants the top of the page, the filter bar and all. Pulling
  // the target into view instead starts the crop half way down the first card.
  if (shot.clip === "viewport") {
    await page.evaluate(() => window.scrollTo(0, 0));
  } else {
    await el.scrollIntoViewIfNeeded().catch(() => {});
  }
  await page.waitForTimeout(800); // let art and live numbers settle
  mkdirSync(dirname(file), { recursive: true });
  // A modal or a control wants its own bounds. A list does NOT: clipping a
  // scroll container to its element gives every row it holds, which came out
  // as a 9952px tall phone shot. Those want what fits on a screen instead.
  const png =
    shot.clip === "viewport"
      ? await page.screenshot({ timeout: 20000 })
      : await page.screenshot({ clip: await bounds(page, el), timeout: 20000 });
  writeFileSync(file, png);
};

/** Guest runs get a clean context each time, so no state leaks between shots. */
const captureGuest = async (browser, shot) => {
  const files = [];
  for (const { file, device } of targetsFor(shot)) {
    refuseIfAbsent(file);
    const context = await browser.newContext(device);
    try {
      await shoot(await context.newPage(), shot, file);
      files.push(file);
    } finally {
      await context.close();
    }
  }
  return files;
};

/**
 * `--session` has to drive the tab you signed in to, so it reuses the open
 * context rather than making one. That means no viewport emulation: resize the
 * window by hand for a phone shot, or take those as a guest.
 */
const captureSession = async (browser, shot) => {
  const context = browser.contexts()[0];
  if (!context)
    throw new Error("no open context. Is that Chrome showing a tab?");
  const page = context.pages()[0] || (await context.newPage());
  const files = [];
  for (const { file } of targetsFor(shot)) {
    refuseIfAbsent(file);
    await shoot(page, shot, file);
    files.push(file);
  }
  return files;
};

const list = () => {
  for (const s of SHOTS) {
    const where = s.wallet ? "signed in" : "guest";
    console.log(
      "  " + s.stem.padEnd(34) + s.kind.padEnd(8) + where.padEnd(11) + s.path,
    );
    if (s.note) console.log(" ".repeat(36) + "note: " + s.note);
  }
  const guest = SHOTS.filter((s) => !s.wallet).length;
  console.log(
    "\n  " +
      SHOTS.length +
      " shots: " +
      guest +
      " as a guest, " +
      (SHOTS.length - guest) +
      " needing a signed-in tab.",
  );
};

const main = async () => {
  if (has("--list")) return list();

  const wanted = ONLY.length
    ? SHOTS.filter((s) => ONLY.includes(s.stem))
    : SHOTS.filter((s) => (SESSION ? s.wallet : !s.wallet));

  if (!wanted.length) {
    console.log("nothing to do: no shot matched.");
    return;
  }

  let browser;
  try {
    browser = await chromium.connectOverCDP(CDP);
  } catch (err) {
    console.error(
      "cannot reach Chrome at " +
        CDP +
        ".\n" +
        "  Start it with --remote-debugging-port, and on this host check\n" +
        "  .wslconfig carries networkingMode=mirrored.\n  " +
        err.message,
    );
    process.exitCode = 1;
    return;
  }

  const failed = [];
  for (const shot of wanted) {
    process.stdout.write("  " + shot.stem + " ... ");
    try {
      const files = SESSION
        ? await captureSession(browser, shot)
        : await captureGuest(browser, shot);
      console.log(files.map((f) => f.replace(ROOT, "").slice(1)).join(", "));
    } catch (err) {
      console.log("FAILED");
      failed.push(shot.stem + ": " + String(err.message).split("\n")[0]);
    }
  }
  // Closing a CDP-attached browser can take the window with it, and in session
  // mode that is the window you signed in to. Disconnect instead.
  if (!SESSION) await browser.close();

  console.log(
    "\n  " +
      (wanted.length - failed.length) +
      " of " +
      wanted.length +
      " captured" +
      (OUT ? " into " + OUT : ""),
  );
  if (failed.length) {
    console.log("\n  failed:");
    for (const f of failed) console.log("    " + f);
    console.log(
      "\n  A failure is almost always a selector that has moved. Fix it in\n" +
        "  SHOTS, or take that one by hand. Nothing was written for these.",
    );
    process.exitCode = 1;
  }
};

main();
