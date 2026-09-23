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
/**
 * `--session <phase>` drives the signed-in tab of a Chrome you are logged into,
 * one phase at a time, because the site shows different things in each and
 * only you can move between them:
 *
 *   logged-out  Phantom installed, not signed in: the login screen as a player sees it
 *   off         signed in, delegated signing off
 *   on          signed in, delegated signing on
 */
const T = Number(arg("--timeout", 8000)); // every wait, and the screenshot itself
const SESSION = arg("--session", null);
if (SESSION && !["logged-out", "off", "on"].includes(SESSION)) {
  console.error("--session takes logged-out, off or on");
  process.exit(1);
}
const MODE = SESSION || "guest";
const ONLY = (arg("--only", "") || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

/**
 * Desktop and phone, both at 2x, which is the ratio the shot list asks for.
 *
 * The phone is a FIXED 390x640 frame, and every phone shot is that whole frame
 * rather than a crop of its element, so each phone half of a pair comes out
 * 780x1280 and they all sit the same size in their 30% column. A crop to the
 * element made every phone shot a different shape.
 */
const DESKTOP = {
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
};
const PHONE = {
  viewport: { width: 390, height: 640 },
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
 * `modes` says which runs take it: `guest` (the default) and the three
 * `--session` phases. A shot in both `guest` and `off` is retaken signed in.
 * `hold` keeps a shot out of every run until `--only` names it.
 */
const SHOTS = [
  // ---------- no wallet, the app
  {
    stem: "app-connect-wallet",
    folder: "introduction",
    kind: "banner",
    path: "/app/",
    guestEntry: false, // this shot IS the login screen
    modes: ["logged-out"],
    target: '[data-cy="login-wallet-option"]',
    span: ['[data-cy="login-wallet-option"]', '[data-cy="login-sign"]'],
    pad: 20,
  },
  {
    stem: "app-lobby-list",
    modes: ["guest", "off"],
    folder: "introduction",
    kind: "pair",
    path: "/app/races",
    target: '[data-cy="race-grid"]',
    clip: "viewport",
  },
  {
    stem: "app-race-cards-modes",
    modes: ["guest", "off"],
    folder: "races",
    kind: "banner",
    path: "/app/races",
    // Two open cards of different modes that already share a row. The grid
    // pins each card in place, so hiding one leaves a hole rather than
    // pulling the next up: pick a pair from the same row. The ids go stale as
    // races start.
    span: ["#race-5010", "#race-5008"],
    target: "#race-5010",
    pad: 12,
    note: "5010 is Winner Takes All and 5008 Podium, both open, one row",
  },
  {
    stem: "app-race-detail-modal",
    modes: ["off"],
    folder: "races",
    kind: "pair",
    path: "/app/races",
    // A race this wallet has joined and that has not started, opened from its
    // card, so the modal shows a lobby the reader is in rather than one to join.
    steps: [{ click: "#race-5015 >> text=/^#5015$/" }],
    target: MODAL,
    after: [
      {
        click:
          '.modal-sm :text-is("CLOSE"), .modal-md :text-is("CLOSE"), .modal-lg :text-is("CLOSE")',
        optional: true,
      },
    ],
    note: "race 5015: joined by the signed-in wallet, not started",
  },
  {
    stem: "app-lobby-participants",
    modes: ["off"],
    folder: "races",
    kind: "pair",
    path: "/app/races",
    steps: [
      { click: '#race-5008 [data-cy="race-action"][data-action="lobby"]' },
      {
        click:
          '.modal-sm :text-is("Players"), .modal-md :text-is("Players"), .modal-lg :text-is("Players")',
      },
    ],
    target: MODAL,
    after: [
      {
        click:
          '.modal-sm :text-is("CLOSE"), .modal-md :text-is("CLOSE"), .modal-lg :text-is("CLOSE")',
        optional: true,
      },
    ],
    note: "race 5008's lobby on the Players tab: joined, not started, boosts showing",
  },
  {
    stem: "app-lobby-filling",
    modes: ["off"],
    folder: "introduction",
    kind: "pair",
    path: "/app/races",
    steps: [
      { click: '#race-4979 [data-cy="race-action"][data-action="lobby"]' },
    ],
    target: MODAL,
    after: [
      {
        click:
          '.modal-sm :text-is("CLOSE"), .modal-md :text-is("CLOSE"), .modal-lg :text-is("CLOSE")',
        optional: true,
      },
    ],
    note: "race 4979's lobby, joined and filling. The lounge outlives a page change, so it is closed",
  },
  {
    stem: "app-tournament-page",
    hold: "no tournament is running, so the page renders nothing",
    modes: ["guest", "off"],
    folder: "competition",
    kind: "pair",
    path: "/app/tournaments",
    target: '[data-cy="tournament-hero"]',
    note: "only renders while a tournament is running. Fails otherwise",
  },
  {
    stem: "app-team-roster",
    modes: ["guest", "off"],
    folder: "competition",
    kind: "pair",
    path: "/app/teams",
    steps: [
      // A member lands on My Team, where the list of rows is not shown.
      { click: 'button:has-text("All Teams")', optional: true },
      { click: '[data-cy="team-row"]', text: "TopDegens" },
    ],
    target: '[data-cy="team-detail-modal"]',
    note: "pinned to TopDegens, so the roster is the same team every time",
  },

  {
    stem: "app-login-linked-account",
    folder: "races",
    kind: "pair",
    path: "/app/",
    guestEntry: false,
    modes: ["logged-out"],
    target: '[data-cy="login"]',
    clip: "viewport",
    fit: true, // zoomed out to fit, never scrolled
    note: "needs a wallet extension installed, or it says none was found",
  },

  // ---------- no wallet, the marketplace
  {
    stem: "app-marketplace-collections",
    modes: ["guest", "off"],
    folder: "nfts",
    kind: "pair",
    path: "/marketplace/",
    // The marketplace tab keeps its category between shots, so pick the default.
    steps: [
      {
        click: '[data-cy="nav-tab"][data-category="cosmetics"]',
        optional: true, // a phone keeps its tabs in the drawer; desktop already chose
      },
    ],
    target: '[data-cy="tier-card"]',
    clip: "viewport",
  },
  {
    stem: "app-marketplace-rent-button",
    modes: ["guest", "off"],
    folder: "nfts",
    kind: "banner",
    path: "/marketplace/",
    // Only the Runner rents today. The banner is its price row and its Mint and
    // Rent buttons, so it does not repeat the whole card nft-runner-example shows.
    steps: [{ click: '[data-cy="nav-tab"][data-category="runner"]' }],
    span: [
      '[data-cy="tier-card"]:has(button:has-text("Rent")) [data-cy="tier-price"]',
      '[data-cy="tier-card"]:has(button:has-text("Rent")) button:has-text("Rent")',
    ],
    target: '[data-cy="tier-card"] button:has-text("Rent")',
  },

  // ---------- no wallet, pinned to races that show the thing
  {
    stem: "app-verify-fairness",
    modes: ["guest"],
    folder: "trust",
    kind: "pair",
    // Its own view, and no wallet is needed to read it. The frame is the shot:
    // the whole working runs to several screens, and the top is what says what
    // the screen is: the seed, then the formula under it.
    path: "/app/verify/4398",
    target: '[data-cy="verify-view"]',
    clip: "viewport",
    settle: 2500,
    note: "race 4398: completed, seed on chain",
  },
  {
    stem: "app-verify-entry",
    modes: ["guest"],
    folder: "trust",
    kind: "banner",
    path: "/app/races/4398",
    // The way in from a finished race: the panel holds the seed and the link
    // that opens the verification screen.
    steps: [
      { click: '.modal-md :text-is("Details")' },
      { click: ':text-is("Verify fairness")' },
    ],
    span: [':text-is("Verify fairness")', '[data-cy="open-verify-race"]'],
    target: '[data-cy="open-verify-race"]',
    pad: 14,
  },
  {
    stem: "app-boost-badges-lobby",
    modes: ["guest", "off"],
    folder: "nfts",
    kind: "banner",
    path: "/app/races/4971",
    steps: [{ click: '.modal-md :text-is("Players")' }],
    target: '.pb-nickname:text-is("dotfx") >> xpath=ancestor::*[6]',
    maxHeight: 186, // three rows: a banner, not the whole list
    note: "race 4971: an open lobby where eight players carry a boost",
  },
  {
    stem: "app-verified-badge",
    modes: ["guest", "off"],
    folder: "trust",
    kind: "banner",
    path: "/app/races/4971",
    steps: [{ click: '.modal-md :text-is("Players")' }],
    target: '.pb-nickname:text-is("dotfx") >> xpath=ancestor::*[5]',
    note: "one verified player's row in race 4971",
  },
  {
    stem: "app-no-boost-race-card",
    folder: "nfts",
    kind: "banner",
    path: "/app/archives",
    // Race 5000 is sponsored, so its header carries 🚫 where the bolt goes:
    // the one refusal a card marks. A creator's own no-boost race shows no
    // chip at all, which a picture cannot point at.
    target: "#race-5000",
    note: "race 5000, sponsored, from the archive so it stays reachable",
  },
  {
    stem: "app-rematch-chain-indicator",
    modes: ["guest", "off"],
    folder: "competition",
    kind: "banner",
    path: "/app/archives",
    // The archive loads a page at a time as you reach its end, and 4980 sinks
    // further every day. Each pair reaches the last card, which is what pulls
    // in the next page, then the card is brought to the middle.
    steps: [
      { scrollTo: '[data-cy="race-card"] >> nth=-1', block: "end" },
      { wait: 1500 },
      { scrollTo: '[data-cy="race-card"] >> nth=-1', block: "end" },
      { wait: 1500 },
      { scrollTo: '[data-cy="race-card"] >> nth=-1', block: "end" },
      { wait: 1500 },
      { scrollTo: '[data-cy="race-card"] >> nth=-1', block: "end" },
      { wait: 1500 },
      { scrollTo: '[data-cy="race-card"] >> nth=-1', block: "end" },
      { wait: 1500 },
      { scrollTo: '[data-cy="race-card"] >> nth=-1', block: "end" },
      { wait: 1500 },
      { scrollTo: "#race-4980", block: "center" },
    ],
    target: "#race-4980",
    note: "race 4980, the first rematch of 4977",
  },
  {
    stem: "app-usd-estimate",
    modes: ["guest", "off"],
    folder: "economy",
    kind: "banner",
    path: "/app/races",
    target: "#race-4979 .stat-box",
  },
  {
    stem: "nft-runner-example",
    modes: ["guest", "off"],
    folder: "nfts",
    kind: "banner",
    path: "/marketplace/",
    steps: [{ click: '[data-cy="nav-tab"][data-category="runner"]' }],
    target: '[data-cy="tier-card"]',
  },

  // ---------- a block explorer, no wallet and no app at all
  {
    stem: "explorer-program-account",
    folder: "trust",
    kind: "pair",
    url: "https://explorer.solana.com/address/DuckBzSivbVv6b5zAw6EGP8YtLBbXwZmcoJPTQ5m1BkM",
    guestEntry: false,
    explorer: true,
    steps: [{ click: 'button:has-text("Accept")', optional: true }],
    target: ':text-is("Program Account")',
    clip: "viewport",
    settle: 3000,
  },
  {
    stem: "explorer-race-account-data",
    folder: "trust",
    kind: "pair",
    url: "https://explorer.solana.com/address/etneesrvQsQGVWVZKuWXq6okUWzRHnKYnE1A8T8g4qN",
    guestEntry: false,
    explorer: true,
    steps: [
      { click: 'button:has-text("Accept")', optional: true },
      { click: ':text-is("Anchor Data")' },
      { wait: 3000 },
      { scrollTo: ':text-is("Anchor Data")' },
    ],
    target: ':text-is("Anchor Data")',
    clip: "viewport",
    keepScroll: true,
    settle: 1500,
    note: "race 4398's account",
  },
  {
    stem: "explorer-orao-randomness-account",
    folder: "trust",
    kind: "pair",
    url: "https://explorer.solana.com/address/3aCVxMEQWyJC62R4WPdL31xaqwn6g8kSMbP2TPCVMkk5",
    guestEntry: false,
    explorer: true,
    steps: [{ click: 'button:has-text("Accept")', optional: true }],
    target: ':text-is("Overview")',
    clip: "viewport",
    settle: 3000,
    note: "race 4398's randomness account",
  },
  {
    stem: "explorer-claim-prize-balances",
    folder: "trust",
    kind: "pair",
    url: "https://explorer.solana.com/tx/3GNk5Nu4bftBAN4uLHYDzvCs4F462zezQHVJrJrLw4ChoJzRDfHMea1u6ghFLyGSg2hLyH7WHH5aGJoFZ31hKM2i",
    guestEntry: false,
    explorer: true,
    steps: [
      { click: 'button:has-text("Accept")', optional: true },
      { wait: 2500 },
      { scrollTo: ':text-is("Accounts & SOL balance")' },
    ],
    target: ':text-is("Accounts & SOL balance")',
    clip: "viewport",
    keepScroll: true,
    settle: 1500,
    note: "race 4982's claim. 4398's prize is still unclaimed",
  },

  // ---------- needs a signed-in tab (--session)
  {
    stem: "app-create-race-form",
    folder: "races",
    kind: "pair",
    path: "/app/races",
    modes: ["off"],
    steps: [{ click: '[data-cy="create-race"]' }],
    target: '[data-cy="create-modal"]',
  },
  // ---------- the create form, signed in with a Runner
  {
    stem: "app-entry-fee-field",
    folder: "races",
    kind: "banner",
    path: "/app/races",
    modes: ["off"],
    steps: [
      { click: '[data-cy="create-race"]' },
      { scrollTo: '[data-cy="create-amount"]', block: "center" },
    ],
    target: '[data-cy="create-amount"]',
    // The labels sit two levels up. Matching "Entry fee" by text finds the race
    // cards behind the modal first, which carry the same words.
    span: [
      '[data-cy="create-amount"] >> xpath=ancestor::*[2]',
      '[data-cy="currency-picker"] >> xpath=..',
    ],
  },
  {
    stem: "app-max-players-field",
    folder: "races",
    kind: "banner",
    path: "/app/races",
    modes: ["off"],
    steps: [
      { click: '[data-cy="create-race"]' },
      { scrollTo: '[data-cy="max-players"]', block: "center" },
    ],
    target: '[data-cy="max-players"]',
    span: ['[data-cy="max-players"] >> xpath=ancestor::*[2]'],
  },
  {
    stem: "app-race-mode-picker",
    folder: "races",
    kind: "banner",
    path: "/app/races",
    modes: ["off"],
    steps: [
      { click: '[data-cy="create-race"]' },
      { scrollTo: "text=/^race mode$/i", block: "start" },
      { click: '[data-cy="race-mode-picker"] [data-cy="dropdown-trigger"]' },
    ],
    target: '[data-cy="race-mode-picker"]',
    span: [
      "text=/^race mode$/i",
      '[data-cy="race-mode-picker"] [data-cy="dropdown-option"] >> nth=-1',
    ],
  },
  {
    stem: "app-join-setting-picker",
    folder: "races",
    kind: "banner",
    path: "/app/races",
    modes: ["off"],
    steps: [
      { click: '[data-cy="create-race"]' },
      { scrollTo: "text=/^player validation$/i", block: "start" },
      { click: '[data-cy="validation-picker"] [data-cy="dropdown-trigger"]' },
    ],
    target: '[data-cy="validation-picker"]',
    span: [
      "text=/^player validation$/i",
      '[data-cy="validation-picker"] [data-cy="dropdown-option"] >> nth=-1',
    ],
  },
  {
    stem: "app-currency-picker",
    folder: "economy",
    kind: "banner",
    path: "/app/races",
    modes: ["off"],
    steps: [
      { click: '[data-cy="create-race"]' },
      { scrollTo: '[data-cy="currency-picker"]', block: "start" },
      { click: '[data-cy="currency-picker"] [data-cy="dropdown-trigger"]' },
    ],
    target: '[data-cy="currency-picker"]',
    span: [
      '[data-cy="currency-picker"]',
      '[data-cy="currency-picker"] [data-cy="dropdown-option"] >> nth=-1',
    ],
  },
  {
    stem: "app-create-race-cost-breakdown",
    folder: "races",
    kind: "banner",
    path: "/app/races",
    modes: ["off"],
    steps: [
      { click: '[data-cy="create-race"]' },
      { click: "text=/^refundable rent/i" },
    ],
    cardOf: "text=/^refundable rent/i",
  },
  {
    stem: "app-custom-name-field",
    folder: "races",
    kind: "banner",
    path: "/app/races",
    modes: ["off"],
    steps: [{ click: '[data-cy="create-race"]' }],
    cardOf: "text=/^race name/i",
  },
  {
    stem: "app-custom-track-picker",
    folder: "races",
    kind: "banner",
    path: "/app/races",
    modes: ["off"],
    steps: [
      { click: '[data-cy="create-race"]' },
      { click: '[data-cy="create-modal"] button:has-text("Track")' },
    ],
    // Two up from the tab is the form's scroll column, which starts at the tab
    // bar, so capping the height keeps the tabs and the track list only.
    target:
      '[data-cy="create-modal"] button:has-text("Track") >> xpath=ancestor::*[2]',
    maxHeight: 245,
    note: "this wallet holds no Track NFT, so only the built in tracks show",
  },
  {
    stem: "app-race-duration-field",
    folder: "races",
    kind: "banner",
    path: "/app/races",
    modes: ["off"],
    steps: [{ click: '[data-cy="create-race"]' }],
    cardOf: "text=/^race duration/i",
  },
  {
    stem: "app-join-timeout-field",
    folder: "races",
    kind: "banner",
    path: "/app/races",
    modes: ["off"],
    steps: [{ click: '[data-cy="create-race"]' }],
    cardOf: "text=/^join timeout/i",
  },
  {
    stem: "app-minimum-account-age-toggle",
    folder: "races",
    kind: "banner",
    path: "/app/races",
    modes: ["off"],
    steps: [{ click: '[data-cy="create-race"]' }],
    cardOf: "text=/^minimum account age/i",
  },
  {
    stem: "app-ai-commentary-toggle",
    folder: "races",
    kind: "banner",
    path: "/app/races",
    modes: ["off"],
    steps: [{ click: '[data-cy="create-race"]' }],
    cardOf: "text=/^ai-generated audio commentary/i",
  },
  {
    stem: "app-x-announcement-toggle",
    folder: "races",
    kind: "banner",
    path: "/app/races",
    modes: ["off"],
    steps: [{ click: '[data-cy="create-race"]' }],
    cardOf: "text=/^announce on x/i",
  },
  {
    stem: "app-host-mode-toggle",
    folder: "races",
    kind: "banner",
    path: "/app/races",
    modes: ["off"],
    steps: [{ click: '[data-cy="create-race"]' }],
    cardOf: "text=/^create without joining/i",
  },
  {
    stem: "app-underfilled-slider",
    folder: "races",
    kind: "banner",
    path: "/app/races",
    // The checkbox needs both halves of `enabled`: a Runner in the wallet, and a
    // seat count above the platform default. Hence 10 seats, and hence "on",
    // which is the phase whose wallet holds a Runner.
    modes: ["on"],
    steps: [
      { click: '[data-cy="create-race"]' },
      { scrollTo: '[data-cy="max-players"]', block: "center" },
      {
        fill: 'input[data-cy="max-players"], [data-cy="max-players"] input',
        value: "10",
      },
      { press: "Tab" },
      { wait: 800 },
      {
        check:
          'text=/allow race to start with .* minimum/i >> xpath=ancestor::*[.//input[@type="checkbox"]][1]//input[@type="checkbox"]',
      },
    ],
    cardOf: "text=/allow race to start with .* minimum/i",
    after: [
      {
        restore:
          'text=/allow race to start with .* minimum/i >> xpath=ancestor::*[.//input[@type="checkbox"]][1]//input[@type="checkbox"]',
        optional: true,
      },
      {
        fill: 'input[data-cy="max-players"], [data-cy="max-players"] input',
        value: "2",
        optional: true,
      },
      { press: "Tab", optional: true },
    ],
    note: "sets 10 seats and ticks it for the shot, then puts both back",
  },
  {
    stem: "app-create-race-opt-ins",
    folder: "races",
    kind: "pair",
    path: "/app/races",
    modes: ["off"],
    steps: [
      { click: '[data-cy="create-race"]' },
      {
        uncheck:
          'text=/^announce on x/i >> xpath=ancestor::*[.//input[@type="checkbox"]][1]//input[@type="checkbox"]',
      },
      {
        uncheck:
          'input[data-cy="skip-autojoin"], [data-cy="skip-autojoin"] input',
      },
      {
        uncheck:
          'text=/^no boosts/i >> xpath=ancestor::*[.//input[@type="checkbox"]][1]//input[@type="checkbox"]',
      },
      { scrollTo: "text=/^ai-generated audio commentary/i", block: "start" },
    ],
    target: '[data-cy="create-modal"]',
    after: [
      {
        restore:
          'text=/^announce on x/i >> xpath=ancestor::*[.//input[@type="checkbox"]][1]//input[@type="checkbox"]',
        optional: true,
      },
      {
        restore:
          'input[data-cy="skip-autojoin"], [data-cy="skip-autojoin"] input',
        optional: true,
      },
      {
        restore:
          'text=/^no boosts/i >> xpath=ancestor::*[.//input[@type="checkbox"]][1]//input[@type="checkbox"]',
        optional: true,
      },
    ],
    note: "unticks the saved X, host and no-boost settings for the shot, then ticks them back",
  },
  {
    stem: "app-allowed-players-list",
    folder: "races",
    kind: "banner",
    path: "/app/races",
    modes: ["off"],
    steps: [
      { click: '[data-cy="create-race"]' },
      { scrollTo: "text=/^player validation$/i", block: "start" },
      { click: '[data-cy="validation-picker"] [data-cy="dropdown-trigger"]' },
      {
        click: '[data-cy="validation-picker"] [data-cy="dropdown-option"]',
        text: "Allow List",
      },
      { scrollTo: '[data-cy="allow-list"]', block: "center" },
    ],
    target: '[data-cy="allow-list"] >> xpath=..',
  },
  {
    stem: "app-nft-gate-fields",
    folder: "races",
    kind: "banner",
    path: "/app/races",
    modes: ["off"],
    steps: [
      { click: '[data-cy="create-race"]' },
      { scrollTo: "text=/^player validation$/i", block: "start" },
      { click: '[data-cy="validation-picker"] [data-cy="dropdown-trigger"]' },
      {
        click: '[data-cy="validation-picker"] [data-cy="dropdown-option"]',
        text: "NFT Holders",
      },
      { scrollTo: '[data-cy="holder-gate"]', block: "center" },
    ],
    cardOf: '[data-cy="holder-gate"]',
  },
  {
    stem: "app-token-gate-fields",
    folder: "races",
    kind: "banner",
    path: "/app/races",
    modes: ["off"],
    steps: [
      { click: '[data-cy="create-race"]' },
      { scrollTo: "text=/^player validation$/i", block: "start" },
      { click: '[data-cy="validation-picker"] [data-cy="dropdown-trigger"]' },
      {
        click: '[data-cy="validation-picker"] [data-cy="dropdown-option"]',
        text: "Token Holders",
      },
      { scrollTo: '[data-cy="holder-gate"]', block: "center" },
    ],
    cardOf: '[data-cy="holder-gate"]',
  },
  {
    stem: "app-creator-share-preview",
    folder: "economy",
    kind: "banner",
    path: "/app/races",
    modes: ["off"],
    steps: [
      { click: '[data-cy="create-race"]' },
      {
        uncheck:
          'input[data-cy="skip-autojoin"], [data-cy="skip-autojoin"] input',
      },
      { scrollTo: "text=/^creator fee share/i", block: "start" },
      { click: "text=/^creator fee share/i" },
    ],
    cardOf: "text=/^creator fee share/i",
    after: [
      {
        restore:
          'input[data-cy="skip-autojoin"], [data-cy="skip-autojoin"] input',
        optional: true,
      },
    ],
    note: "switches host mode off for the shot and back on after",
  },

  {
    stem: "app-sponsored-race-toggle",
    folder: "races",
    kind: "banner",
    path: "/app/races",
    modes: ["off"],
    // On the Sponsored tab the entry fee becomes PRIZE POOL. The tab bar sits
    // far above it, so the crop is the prize row, whose label says which tab.
    steps: [
      { click: '[data-cy="create-race"]' },
      { click: '[data-cy="create-tab"]', text: "Sponsored" },
      { scrollTo: '[data-cy="create-amount"]', block: "center" },
    ],
    span: ['[data-cy="create-amount"] >> xpath=ancestor::*[3]'],
    target: '[data-cy="create-amount"]',
    after: [
      { click: '[data-cy="create-tab"]', text: "Regular", optional: true },
    ],
    note: "switches the tab for the shot, never creates",
  },

  // ---------- the player page, signed in as a player with history and NFTs
  {
    stem: "app-play-balance-panel",
    folder: "economy",
    kind: "banner",
    path: "/app/player/settings",
    modes: ["off"],
    steps: [{ scrollTo: '[data-cy="vault-balance"]', block: "center" }],
    span: [
      "text=/^play balance$/i >> visible=true",
      '[data-cy="vault-balance"]',
      '[data-cy="vault-withdraw"]',
    ],
    target: '[data-cy="vault-balance"]',
  },
  {
    stem: "app-pay-from-balance-checkbox",
    folder: "economy",
    kind: "banner",
    path: "/app/player/settings",
    modes: ["off"],
    steps: [{ scrollTo: '[data-cy="vault-spend-toggle"]', block: "center" }],
    span: [
      '[data-cy="vault-spend-toggle"]',
      "text=/pay race entries from your play balance/i >> visible=true",
      "text=/cannot cover comes out of your wallet/i >> visible=true",
    ],
    target: '[data-cy="vault-spend-toggle"]',
    note: "only exists while delegated signing is off",
  },
  {
    stem: "app-vault-deposit-dialog",
    folder: "economy",
    kind: "banner",
    path: "/app/player/settings",
    modes: ["off"],
    steps: [
      { scrollTo: '[data-cy="vault-amount"]', block: "center" },
      {
        fill: 'input[data-cy="vault-amount"], [data-cy="vault-amount"] input',
        value: "0.05",
      },
    ],
    span: [
      '[data-cy="vault-amount"] >> xpath=ancestor::*[2]',
      '[data-cy="vault-currency"] >> xpath=..',
      '[data-cy="vault-deposit"]',
    ],
    target: '[data-cy="vault-deposit"]',
    after: [
      {
        fill: 'input[data-cy="vault-amount"], [data-cy="vault-amount"] input',
        value: "",
        optional: true,
      },
    ],
    note: "types an amount, never presses Deposit",
  },
  {
    stem: "app-vault-withdraw-dialog",
    folder: "economy",
    kind: "banner",
    path: "/app/player/settings",
    modes: ["off"],
    steps: [
      { scrollTo: '[data-cy="vault-amount"]', block: "center" },
      {
        fill: 'input[data-cy="vault-amount"], [data-cy="vault-amount"] input',
        value: "0.039",
      },
    ],
    span: [
      '[data-cy="vault-amount"] >> xpath=ancestor::*[2]',
      '[data-cy="vault-withdraw"]',
      "text=/rent your vault must keep/i >> visible=true",
    ],
    target: '[data-cy="vault-withdraw"]',
    after: [
      {
        fill: 'input[data-cy="vault-amount"], [data-cy="vault-amount"] input',
        value: "",
        optional: true,
      },
    ],
    note: "types the balance, never presses Withdraw",
  },
  {
    stem: "app-delegation-duration-selector",
    folder: "races",
    kind: "banner",
    path: "/app/player/settings",
    modes: ["off"],
    steps: [
      { scrollTo: '[data-cy="grant-duration"]', block: "center" },
      {
        click: '[data-cy="grant-duration"] [data-cy="dropdown-trigger"]',
        optional: true,
      },
    ],
    span: [
      "text=/^delegated signing$/i >> visible=true",
      '[data-cy="grant-duration"]',
      '[data-cy="grant-duration"] [data-cy="dropdown-option"] >> nth=-1',
      '[data-cy="grant-enable"]',
    ],
    target: '[data-cy="grant-duration"]',
    note: "opens the duration list, never presses Enable",
  },
  {
    stem: "app-payout-target-setting",
    folder: "economy",
    kind: "banner",
    path: "/app/player/settings",
    modes: ["off"],
    steps: [{ scrollTo: '[data-cy="payout-target"]', block: "center" }],
    span: [
      "text=/^send my winnings to$/i >> visible=true",
      '[data-cy="payout-target"]',
    ],
    target: '[data-cy="payout-target"]',
  },
  {
    stem: "app-telegram-handle-toggle",
    folder: "trust",
    kind: "banner",
    path: "/app/player/settings",
    modes: ["off"],
    steps: [
      { scrollTo: "text=/^announcements$/i >> visible=true", block: "center" },
    ],
    span: [
      "text=/^announcements$/i >> visible=true",
      "text=/announce your activity on telegram/i >> visible=true",
    ],
    target: "text=/announce your activity on telegram/i >> visible=true",
    pad: 20,
  },
  {
    stem: "app-close-account-button",
    folder: "economy",
    kind: "banner",
    path: "/app/player/settings",
    modes: ["off"],
    steps: [
      {
        scrollTo: "text=/^close player account$/i >> visible=true",
        block: "center",
      },
    ],
    span: [
      "text=/^close player account$/i >> visible=true",
      "text=/closing removes your verified status/i >> visible=true",
    ],
    target: "text=/closing removes your verified status/i >> visible=true",
    pad: 20,
    note: "the section only. Close Account is never pressed",
  },
  {
    stem: "app-verification-tab",
    folder: "trust",
    kind: "pair",
    path: "/app/player/verification",
    modes: ["off"],
    target: "text=/verified via/i >> visible=true",
    clip: "viewport",
  },
  {
    stem: "app-link-external-wallet",
    folder: "races",
    kind: "banner",
    path: "/app/player/verification",
    modes: ["off"],
    steps: [
      { scrollTo: "text=/^evm wallet$/i >> visible=true", block: "center" },
    ],
    span: [
      "text=/^evm wallet$/i >> visible=true",
      "text=/^link evm wallet$/i >> visible=true",
    ],
    target: "text=/^link evm wallet$/i >> visible=true",
    pad: 20,
  },
  {
    stem: "app-badges-profile",
    folder: "competition",
    kind: "pair",
    path: "/app/player",
    modes: ["off"],
    steps: [
      { scrollTo: "text=/^badges \\(/i >> visible=true", block: "start" },
    ],
    target: "text=/^badges \\(/i >> visible=true",
    clip: "viewport",
    keepScroll: true,
  },
  {
    stem: "app-nickname-avatar-fields",
    folder: "trust",
    kind: "banner",
    path: "/app/player",
    modes: ["off"],
    // The pencil beside the nickname: an icon, named only by its label.
    steps: [{ click: '[aria-label="Edit profile"], [title="Edit profile"]' }],
    // Editing is inline: the nickname becomes a field beside the avatar. The crop
    // is the nearest box holding both.
    target: "input:visible >> xpath=ancestor::*[.//img][1]",
    after: [{ press: "Escape", optional: true }],
    note: "opens Edit profile, never saves",
  },

  // ---------- the join dialog: opened, never submitted
  {
    stem: "app-boost-picker",
    folder: "nfts",
    kind: "banner",
    path: "/app/races",
    modes: ["off"],
    steps: [
      {
        click:
          '[data-cy="race-card"] [data-cy="race-action"][data-action="join"]',
      },
      {
        scrollTo: '[data-cy="join-modal"] button:has-text("%") >> xpath=..',
        block: "start",
      },
    ],
    span: ['[data-cy="join-modal"] button:has-text("%") >> xpath=..'],
    extendDown: 250,
    target: '[data-cy="join-modal"] button:has-text("%") >> xpath=..',
    after: [{ click: '[data-cy="join-cancel"]', optional: true }],
    note: "delegation must be OFF: with it on, joining is one tap",
  },
  {
    stem: "app-cosmetic-picker",
    folder: "nfts",
    kind: "banner",
    path: "/app/races",
    modes: ["off"],
    steps: [
      {
        click:
          '[data-cy="race-card"] [data-cy="race-action"][data-action="join"]',
      },
      { click: '[data-cy="join-modal"] button:has-text("🦆")' },
      {
        scrollTo: '[data-cy="join-modal"] button:has-text("🦆") >> xpath=..',
        block: "start",
      },
    ],
    span: ['[data-cy="join-modal"] button:has-text("🦆") >> xpath=..'],
    extendDown: 250,
    target: '[data-cy="join-modal"] button:has-text("🦆") >> xpath=..',
    after: [{ click: '[data-cy="join-cancel"]', optional: true }],
    note: "delegation must be OFF: with it on, joining is one tap",
  },

  // ---------- the marketplace, signed in
  {
    stem: "app-rental-duration-slider",
    folder: "nfts",
    kind: "banner",
    path: "/marketplace/",
    modes: ["off"],
    steps: [{ click: '[data-cy="tier-card"] button:has-text("Rent")' }],
    target: '[data-cy="rent-modal"]',
    after: [{ click: '[data-cy="rent-cancel"]', optional: true }],
    note: "opens the rent dialog, never confirms",
  },

  // ---------- a won race whose prize is still unclaimed (--session on)
  //
  // Race 4985 finished with this wallet first and the prize never taken, which
  // is the only state that renders a CLAIM button. Nothing here presses it: a
  // delegated session would send the claim with no wallet prompt at all.
  {
    stem: "app-race-finish-claim",
    folder: "introduction",
    kind: "pair",
    path: "/app/races/4985",
    modes: ["on"],
    target: MODAL,
    note: "race 4985: won, unclaimed. CLAIM is never pressed",
  },
  {
    stem: "app-claim-prize",
    folder: "races",
    kind: "banner",
    path: "/app/races/4985",
    modes: ["on"],
    // The podium and the button that empties it, which is the pair the page
    // describes. The tab row above them says nothing a reader needs here.
    span: [
      '.modal-md :text-is("#1") >> xpath=ancestor::*[3]',
      '.modal-md button:has-text("CLAIM")',
    ],
    target: '.modal-md button:has-text("CLAIM")',
    note: "race 4985. The button is framed, never pressed",
  },
  {
    stem: "app-unclaimed-items-banner",
    folder: "economy",
    kind: "banner",
    path: "/app/leaderboard",
    modes: ["on"],
    // It lives in the top bar rather than on a page, so it is already banner
    // shaped: trophy, total owed, and the button that sweeps the lot.
    target: 'button:has-text("CLAIM ALL") >> xpath=ancestor::*[1]',
    pad: 10,
    note: "CLAIM ALL is framed, never pressed",
  },

  // ---------- the founder's own team (--session on, a team creator)
  {
    stem: "app-team-invite",
    folder: "competition",
    kind: "banner",
    path: "/app/teams",
    modes: ["on"],
    steps: [
      { click: '[data-cy="team-subtab"]', text: "Members" },
      { scrollTo: "text=/^INVITE LINK$/i", block: "center" },
    ],
    span: ["text=/^INVITE LINK$/i", 'button:has-text("Save message")'],
    target: "text=/^INVITE LINK$/i",
  },

  // ---------- a fresh wallet: no player account, no Runner (--session off)
  //
  // Order matters. Opening the create form raises the player-account modal
  // before anything is signed; Cancel drops it, but "Let's race!" marks the
  // account checked for the session and the modal never shows again. So the
  // modal is taken first and cancelled, and the locked form second.
  {
    stem: "app-player-account-modal",
    folder: "introduction",
    kind: "banner",
    path: "/app/races",
    modes: ["off"],
    steps: [{ click: '[data-cy="create-race"]' }],
    target: '[data-cy="first-race-modal"]',
    after: [{ click: '[data-cy="first-race-cancel"]', optional: true }],
    note: "a wallet with no player account. Cancelled, never confirmed",
  },
  {
    stem: "app-create-race-runner-locked",
    folder: "nfts",
    kind: "banner",
    path: "/app/races",
    modes: ["off"],
    // "Let's race!" only resumes the pending action, which is opening this
    // form. The account itself is created by the first create or join.
    steps: [
      { click: '[data-cy="create-race"]' },
      { click: '[data-cy="first-race-confirm"]', optional: true },
      { scrollTo: "text=/^No Runner NFT found$/", block: "center" },
    ],
    // Without a Runner the gated options are not on the form at all. What a
    // player sees instead is this notice, listing what one would unlock.
    span: [
      '[data-cy="create-modal"] button:has-text("Runner")',
      '[data-cy="create-modal"] button:has-text("Duck")',
      "text=/^Hold a Runner NFT to unlock/",
    ],
    target: "text=/^No Runner NFT found$/",
    pad: 20,
    note: "a wallet with no Runner",
  },

  // ---------- a wallet renting a Runner (--session off)
  {
    stem: "app-rented-ribbon",
    folder: "nfts",
    kind: "banner",
    path: "/app/races",
    modes: ["off"],
    // The ribbon renders only on the renter's own screens: the create and
    // join pickers, and their collection. Here, the create form's Runner tab.
    steps: [
      { click: '[data-cy="create-race"]' },
      { waitFor: '[data-cy="nft-rented"]' },
    ],
    span: [
      '[data-cy="create-modal"] button:has-text("Runner")',
      '[data-cy="create-modal"] button:has-text("Duck")',
      '[data-cy="nft-rented"] >> xpath=ancestor::*[4]',
    ],
    target: '[data-cy="nft-rented"]',
    pad: 12,
    settle: 1500,
    note: "a wallet with a rented Runner. Opens the form, never submits",
  },

  {
    stem: "nft-card-renting",
    folder: "nfts",
    kind: "single",
    path: "/app/player/nfts",
    modes: ["off"],
    // The renter's own collection: the art under its RENTED band, with the
    // countdown to the end of the term, and the name below.
    steps: [{ waitFor: '[data-cy="nft-rented"]' }],
    target: '[data-cy="nft-rented"] >> xpath=ancestor::*[2]',
    aspect: 16 / 9,
    settle: 1500,
    note: "a wallet with a rented Runner",
  },

  // ---------- the delegation panel with a live grant (--session on)
  {
    stem: "app-delegated-signing-panel",
    folder: "races",
    kind: "banner",
    path: "/app/player/settings",
    modes: ["on"],
    steps: [{ scrollTo: '[data-cy="grant-status"]', block: "center" }],
    span: [
      "text=/^delegated signing$/i >> visible=true",
      '[data-cy="grant-status"]',
      '[data-cy="grant-revoke"]',
    ],
    target: '[data-cy="grant-status"]',
  },
  {
    stem: "app-delegation-revoke",
    folder: "races",
    kind: "banner",
    path: "/app/player/settings",
    modes: ["on"],
    steps: [{ scrollTo: '[data-cy="grant-revoke"]', block: "center" }],
    span: ['[data-cy="grant-status"]', '[data-cy="grant-revoke"]'],
    target: '[data-cy="grant-revoke"]',
    note: "never pressed",
  },

  // ---------- joined, inside the 120s withdraw window (--session on)
  {
    stem: "app-withdraw-button",
    hold: "only exists for 120s after a join, so it is joined for by hand",
    folder: "races",
    kind: "banner",
    path: "/app/races",
    modes: ["on"],
    steps: [{ click: '[data-cy="confirm-cancel"]', optional: true }],
    // The button carries both numbers: the entry coming back and the flat
    // penalty going out. It renders on the card, not in the race modal, and it
    // is gone 120 seconds after the join that put it there.
    span: [
      '#race-4998 [data-cy="race-action"][data-action="lobby"]',
      '#race-4998 [data-cy="race-action"][data-action="withdraw"]',
    ],
    target: '#race-4998 [data-cy="race-action"][data-action="withdraw"]',
    pad: 12,
    note: "race 4996, joined for the shot. Only takeable inside the window",
  },

  // ---------- the covers on the welcome page
  //
  // Seven 16:9 cards and one space cover, each a single file at its bare name
  // because a cover is linked from a hidden column rather than shown in a
  // figure.
  //
  // A cover is DISPLAYED SMALL, so a screenshot of a whole page arrives as an
  // unreadable thumbnail. Each of these is one subject close up, and `aspect`
  // pads that subject out to the ratio the cover wants rather than handing the
  // cover a shape it then crops again, off centre.
  {
    stem: "docs-card-getting-started",
    folder: "brand",
    kind: "single",
    path: "/app/races",
    modes: ["on"],
    target: '[data-cy="race-card"]',
    aspect: 16 / 9,
    note: "one race card, close enough to read the entry fee",
  },
  {
    stem: "docs-card-races",
    folder: "brand",
    kind: "single",
    path: "/app/races",
    modes: ["on"],
    steps: [
      { click: '[data-cy="create-race"]' },
      { scrollTo: '[data-cy="create-amount"]', block: "center" },
    ],
    // Entry fee, currency, max players and validation: a 2x2 block 560px
    // wide. The pad reaches up to the labels, which sit above the inputs.
    span: ['[data-cy="create-amount"]', '[data-cy="validation-picker"]'],
    target: '[data-cy="create-amount"]',
    pad: 28,
    aspect: 16 / 9,
    note: "the money and the seats, which is what the form is about",
  },
  {
    stem: "docs-card-nfts",
    folder: "brand",
    kind: "single",
    path: "/marketplace/",
    modes: ["guest"],
    steps: [{ click: '[data-cy="nav-tab"][data-category="boost"]' }],
    span: ['[data-cy="tier-card"] >> nth=0', '[data-cy="tier-card"] >> nth=2'],
    target: '[data-cy="tier-card"]',
    pad: 12,
    aspect: 16 / 9,
    note: "three tiers side by side, each with its price",
  },
  {
    stem: "docs-card-competition",
    folder: "brand",
    kind: "single",
    // Written for a tournament standings board. Nothing is running, and a
    // team page is too wide to read at cover size, so it is the badge wall:
    // its heading and the first rows, which read at any size.
    path: "/app/player",
    modes: ["on"],
    steps: [
      { scrollTo: "text=/^badges \\(/i >> visible=true", block: "center" },
    ],
    span: [
      "text=/^badges \\(/i >> visible=true",
      "text=/^badges \\(/i >> visible=true >> xpath=following-sibling::*[1]",
    ],
    target: "text=/^badges \\(/i >> visible=true",
    maxHeight: 380,
    aspect: 16 / 9,
  },
  {
    stem: "docs-card-economy",
    folder: "brand",
    kind: "single",
    path: "/app/races/4985",
    modes: ["on"],
    target: '.modal-md :text-is("#1") >> xpath=ancestor::*[3]',
    aspect: 16 / 9,
    note: "race 4985: a pool and what each place took out of it",
  },
  {
    stem: "docs-card-trust",
    folder: "brand",
    kind: "single",
    path: "/app/verify/4398",
    modes: ["guest"],
    steps: [
      { scrollTo: ':text-is("Players recorded on-chain")', block: "center" },
    ],
    // the panel: its heading, the tx link and the finishing order under it
    target: ':text-is("Players recorded on-chain") >> xpath=ancestor::*[2]',
    aspect: 16 / 9,
    note: "race 4398: the winners as the chain recorded them",
  },
  {
    stem: "docs-card-help",
    folder: "brand",
    kind: "single",
    url: "https://theluckyducks.com/",
    guestEntry: false,
    steps: [{ scrollTo: "#faq", block: "start" }, { wait: 1200 }],
    target: "#faq",
    maxHeight: 420,
    aspect: 16 / 9,
    keepScroll: true,
    settle: 1500,
  },
  {
    stem: "docs-cover-welcome",
    folder: "brand",
    kind: "single",
    url: "https://theluckyducks.com/",
    guestEntry: false,
    // The space cover is a wide strip across the top of the page rather than a
    // subject, so here the window IS the crop.
    viewport: { width: 1990, height: 480 },
    steps: [
      {
        css: "html { scrollbar-width: none } ::-webkit-scrollbar { display: none }",
      },
    ],
    target: "text=/^Duck Racing$/",
    clip: "viewport",
    settle: 3000,
  },
  // ---------- the NFT covers and figures, off the marketplace as a guest
  //
  // `inside` cuts a 16:9 band out of the art itself rather than padding the
  // art out with page, so a cover of a Runner is all Runner.
  {
    stem: "nft-card-runners",
    folder: "nfts",
    kind: "single",
    path: "/marketplace/",
    steps: [{ click: '[data-cy="nav-tab"][data-category="runner"]' }],
    target: '[data-cy="tier-card"] video',
    aspect: 16 / 9,
    inside: true,
    settle: 2000,
  },
  {
    stem: "nft-card-boosts",
    folder: "nfts",
    kind: "single",
    path: "/marketplace/",
    steps: [{ click: '[data-cy="nav-tab"][data-category="boost"]' }],
    target: '[data-cy="tier-card"] img',
    aspect: 16 / 9,
    inside: true,
  },
  {
    stem: "nft-card-cosmetics",
    folder: "nfts",
    kind: "single",
    path: "/marketplace/",
    steps: [{ click: '[data-cy="nav-tab"][data-category="cosmetics"]' }],
    // three skins in a row, which is what the row asks for
    span: [
      '[data-cy="tier-card"] >> nth=0 >> video',
      '[data-cy="tier-card"] >> nth=2 >> video',
    ],
    target: '[data-cy="tier-card"] video',
    pad: 8,
    aspect: 16 / 9,
    settle: 2000,
  },
  {
    stem: "nft-cosmetics-grid",
    folder: "nfts",
    kind: "single",
    path: "/marketplace/",
    // Tall enough for two rows of four. The tab bar is pinned, and a crop
    // that scrolled under it had the bar lying across the first row.
    viewport: { width: 1440, height: 1800 },
    steps: [
      { click: '[data-cy="nav-tab"][data-category="cosmetics"]' },
      { unstick: '[data-cy="nav-tab"]' },
    ],
    span: ['[data-cy="tier-card"] >> nth=0', '[data-cy="tier-card"] >> nth=7'],
    target: '[data-cy="tier-card"]',
    pad: 12,
    settle: 2000,
  },
];

/**
 * Where a shot's files land, one per viewport it needs.
 *
 * A shot can override the desktop viewport, which is how a banner gets to be
 * banner-shaped: a wide short window clipped to itself is a strip of the page,
 * where the same crop out of a full desktop window would be a screenshot of
 * everything.
 *
 * `single` is the odd one and belongs to the covers: a card cover or a space
 * cover is one file at its bare name, because nothing references it through a
 * figure and so nothing carries the `-banner` the other kinds spell out.
 */
const targetsFor = (shot) => {
  const dir = OUT ? OUT : join(ROOT, ASSETS, shot.folder);
  const desktop = shot.viewport
    ? { ...DESKTOP, viewport: shot.viewport }
    : DESKTOP;
  if (shot.kind === "single")
    return [{ file: join(dir, shot.stem + ".png"), device: desktop }];
  return shot.kind === "pair"
    ? [
        { file: join(dir, shot.stem + "-desktop.png"), device: desktop },
        {
          file: join(dir, shot.stem + "-mobile.png"),
          device: PHONE,
          phone: true,
        },
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
    await guest.waitFor({ state: "visible", timeout: T });
  } catch {
    return;
  }
  await guest.click();
  await page.waitForTimeout(2500);
};

/**
 * `optional` lets a step find nothing, for things that only sometimes appear:
 * a cookie banner shows on a fresh profile and never again. `scrollTo` brings a
 * section to the top of whatever scrolls around it, which is how a shot frames
 * the part of a long panel it is about rather than the panel's first lines.
 */
const runSteps = async (page, steps = []) => {
  for (const step of steps) {
    const timeout = step.optional ? Math.min(4000, T) : T;
    try {
      // `css` adds a stylesheet, for chrome the browser draws over the page:
      // a viewport crop takes the scrollbar with it. Guest shots only, since a
      // guest context is thrown away after its shot and a session tab is not.
      if (step.css) await page.addStyleTag({ content: step.css });
      // `unstick` hides whatever pinned bar holds the selector, so a crop that
      // scrolled under it shows the page instead of the bar lying across it.
      if (step.unstick) {
        await page
          .locator(step.unstick)
          .first()
          .evaluate(
            (el) => {
              for (let n = el; n && n !== document.body; n = n.parentElement) {
                const pos = getComputedStyle(n).position;
                if (pos === "fixed" || pos === "sticky") {
                  n.style.visibility = "hidden";
                  return;
                }
              }
            },
            undefined,
            { timeout },
          );
      }
      if (step.click) {
        // `text` narrows a row selector to the one you meant. A list orders
        // itself by whatever is live, so "the first team" is a different team
        // every week, and a shot on a page should not be.
        const loc = step.text
          ? page.locator(step.click).filter({ hasText: step.text })
          : page.locator(step.click);
        await loc.first().click({ timeout });
        await page.waitForTimeout(1200);
      }
      if (step.check || step.uncheck) {
        // Remember the box as found, once per shot, so `restore` can put back
        // what this wallet had rather than what some other wallet had.
        const sel = step.check || step.uncheck;
        const box = page.locator(sel).first();
        page.__was = page.__was || {};
        if (!(sel in page.__was))
          page.__was[sel] = await box.isChecked({ timeout });
        await box.setChecked(!!step.check, { force: true, timeout });
        await page.waitForTimeout(500);
      }
      if (step.restore) {
        const was = (page.__was || {})[step.restore];
        if (was !== undefined) {
          await page
            .locator(step.restore)
            .first()
            .setChecked(was, { force: true, timeout });
          await page.waitForTimeout(400);
        }
      }
      if (step.press) {
        await page.keyboard.press(step.press);
        await page.waitForTimeout(500);
      }
      if (step.fill) {
        await page.locator(step.fill).first().fill(step.value, { timeout });
        await page.waitForTimeout(500);
      }
      if (step.waitFor) {
        await page.locator(step.waitFor).first().waitFor({ timeout });
      }
      if (step.scrollTo) {
        const loc = page.locator(step.scrollTo).first();
        await loc.waitFor({ timeout });
        await loc.evaluate(
          (el, block) => el.scrollIntoView({ block }),
          step.block || "start",
        );
        await page.waitForTimeout(600);
      }
    } catch (err) {
      if (!step.optional) throw err;
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
const bounds = async (page, el, maxHeight = Infinity) => {
  const box = await el.evaluate((node) => {
    const r = node.getBoundingClientRect();
    let [x1, y1, x2, y2] = [r.left, r.top, r.right, r.bottom];
    const clipped = (child) => {
      for (let n = child.parentElement; n && n !== node; n = n.parentElement) {
        const s = getComputedStyle(n);
        if (s.overflowX !== "visible" || s.overflowY !== "visible") return true;
      }
      return false;
    };
    for (const child of node.querySelectorAll("*")) {
      const c = child.getBoundingClientRect();
      if (!c.width || !c.height) continue;
      // Rows inside a scroll area overhang the panel but are not drawn there.
      // Only something that really pokes out, a share button, widens the box.
      if (clipped(child)) continue;
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
    height: Math.min(Math.ceil(box.y2), box.vh, y + maxHeight) - y,
    vw: box.vw,
    vh: box.vh,
  };
};

/**
 * Grow a crop to an aspect ratio, around what it already holds.
 *
 * A card cover is displayed small and at a fixed ratio, so a screenshot of a
 * whole page arrives as an unreadable thumbnail: the cover wants ONE thing,
 * close up. Cropping tight to that one thing gives whatever shape the element
 * happens to be, which the cover then crops again, off centre. So the tight box
 * is the subject and this pads it out to the ratio the cover wants, taking in
 * the surroundings evenly and never leaving the viewport.
 */
const crop = (box, shot) => {
  const fit = shot.inside ? insideAspect : toAspect;
  const { vw, vh, ...rest } = shot.aspect ? fit(box, shot.aspect) : box;
  return rest;
};

/**
 * The other way round, for art: a band cut out of the middle of the subject
 * rather than the subject with its surroundings. A square Runner cut to 16:9 is
 * all Runner, where padding it out would be mostly page background.
 */
const insideAspect = (box, ratio) => {
  let { x, y, width, height } = box;
  if (width / height > ratio) {
    const want = Math.round(height * ratio);
    x += Math.round((width - want) / 2);
    width = want;
  } else {
    const want = Math.round(width / ratio);
    y += Math.round((height - want) / 2);
    height = want;
  }
  return { x, y, width, height };
};

const toAspect = (box, ratio) => {
  const vw = box.vw ?? Infinity;
  const vh = box.vh ?? Infinity;
  let { x, y, width, height } = box;
  if (width / height < ratio) {
    const want = Math.min(Math.round(height * ratio), vw);
    x = Math.max(0, Math.min(vw - want, Math.round(x - (want - width) / 2)));
    width = want;
  } else {
    const want = Math.min(Math.round(width / ratio), vh);
    y = Math.max(0, Math.min(vh - want, Math.round(y - (want - height) / 2)));
    height = want;
  }
  return { x, y, width, height };
};

/**
 * Serve nothing from cache.
 *
 * The site's backgrounds are seasonal, so a capture run days apart can be
 * dressed differently from the site everyone else is looking at, and a browser
 * profile that is reused between runs holds the old art indefinitely. This
 * forces every request to go to the network for the life of the page.
 *
 * A guest context starts empty, so the app's service worker is installed fresh
 * by the run itself and has nothing stale to answer with. Purging it here was
 * tried and taken out again: the extra navigation it needed left the page in a
 * state where the screenshot hung.
 */
const noCache = async (page) => {
  const cdp = await page.context().newCDPSession(page);
  await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
};

/**
 * Take the picture. A guest context knows its own 2x scale, so Playwright's
 * screenshot is right there. A session page is emulated at 2x from outside,
 * which Playwright does not know about, so its screenshot comes out at 1x;
 * capturing through the same DevTools session that set the scale keeps it.
 */
const snap = async (page, clip) => {
  if (!page.__cdp) {
    return page.screenshot(clip ? { clip, timeout: T } : { timeout: T });
  }
  const params = { format: "png", fromSurface: true };
  if (clip) {
    // DevTools clips in page coordinates, the boxes here are viewport ones.
    const { sx, sy } = await page.evaluate(() => ({
      sx: visualViewport.pageLeft,
      sy: visualViewport.pageTop,
    }));
    params.clip = { ...clip, x: clip.x + sx, y: clip.y + sy, scale: 1 };
  }
  const res = await Promise.race([
    page.__cdp.send("Page.captureScreenshot", params),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("screenshot timed out")), T),
    ),
  ]);
  return Buffer.from(res.data, "base64");
};

/**
 * Move a signed-in app to `path` without reloading it.
 *
 * The app follows back and forward (`App.tsx`), so pushing a path and firing
 * `popstate` changes page with no request for the page itself, and none of the
 * wallet and NFT reads a reload repeats. It passes through the leaderboard
 * first on purpose: a race modal opens only when the races page mounts fresh,
 * and leaving it is also what closes whatever the previous shot left open.
 */
const spaGo = async (page, path) => {
  const go = (p) =>
    page.evaluate((u) => {
      history.pushState(null, "", u);
      dispatchEvent(new PopStateEvent("popstate"));
    }, p);
  await go("/app/leaderboard");
  await page.waitForTimeout(700);
  await go(path);
  await page.waitForTimeout(1800);
};

const shoot = async (page, shot, file, phone = false) => {
  if (!SESSION) await noCache(page).catch(() => {});
  // `--race` deep-links a race you chose, instead of taking whichever card is
  // at the top of a live list. The app routes /app/races/<id> to that race's
  // modal, so the click step is then redundant.
  const deepLink = shot.race && RACE;
  const url = shot.url || BASE + (deepLink ? "/app/races/" + RACE : shot.path);
  // A signed-in page is not reloaded when it is already where the shot
  // wants it. Every reload re-runs the app's wallet and NFT reads, which is
  // exactly the load a session run is meant to keep down.
  const here = new URL(page.url());
  const there = new URL(url);
  const sameApp = (root) =>
    here.origin === there.origin &&
    here.pathname.startsWith(root) &&
    there.pathname.startsWith(root);
  if (SESSION && MODE !== "logged-out" && sameApp("/app")) {
    await spaGo(page, there.pathname);
  } else if (SESSION && sameApp("/marketplace")) {
    // The marketplace is one page with tabs: close what the last shot opened.
    await page.keyboard.press("Escape").catch(() => {});
    await page.keyboard.press("Escape").catch(() => {});
    await page.waitForTimeout(500);
  } else if (!(SESSION && page.url() === url)) {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: T * 3 });
  }
  if (shot.guestEntry !== false && !SESSION) await enterGuest(page);
  if (!deepLink) await runSteps(page, shot.steps);
  // `cardOf` crops to the card a label sits in: the nearest ancestor that draws
  // a border and is wide enough to be a card rather than a chip. The form's
  // cards carry no hook of their own, and a heading is the one stable thing.
  if (shot.cardOf) {
    const label = page.locator(shot.cardOf).first();
    await label.waitFor({ state: "visible", timeout: T });
    await label.evaluate(
      (node, [minWidth, cardLevel]) => {
        let level = cardLevel;
        for (const old of document.querySelectorAll("[data-capture-target]"))
          old.removeAttribute("data-capture-target");
        const scope =
          node.closest(
            '[data-cy="create-modal"], .modal-sm, .modal-md, .modal-lg',
          ) || document.body;
        const min =
          minWidth ??
          (scope === document.body
            ? 300
            : scope.getBoundingClientRect().width * 0.6);
        let n = node;
        while (n && n !== scope) {
          const s = getComputedStyle(n);
          if (
            parseFloat(s.borderTopWidth) > 0 &&
            n.getBoundingClientRect().width >= min &&
            --level <= 0
          )
            break;
          n = n.parentElement;
        }
        const card = n && n !== scope ? n : node;
        card.scrollIntoView({ block: "center" });
        card.setAttribute("data-capture-target", "1");
      },
      [shot.minWidth ?? null, shot.cardLevel ?? 1],
    );
    await page.waitForTimeout(400);
  }
  const el = page
    .locator(shot.cardOf ? "[data-capture-target]" : shot.target)
    .first();
  await el.waitFor({ state: "visible", timeout: T });
  // A viewport shot wants the top of the page, the filter bar and all. Pulling
  // the target into view instead starts the crop half way down the first card.
  const frame = phone || shot.clip === "viewport";
  if (frame && !shot.keepScroll) {
    await page.evaluate(() => window.scrollTo(0, 0));
  } else if (!frame) {
    await el.scrollIntoViewIfNeeded().catch(() => {});
  }
  // Park the pointer on the empty right edge first. A click leaves it over the
  // control it pressed, and a tooltip it summons would be in the picture.
  const edge = await page.evaluate(() => [
    innerWidth - 2,
    Math.round(innerHeight / 2),
  ]);
  await page.mouse.move(edge[0], edge[1]).catch(() => {});
  await page.waitForTimeout(300);
  await page.waitForTimeout(shot.settle ?? 800); // let art and live numbers settle
  // A toast is never the subject. A "new version" notice arrives whenever a
  // deploy lands mid-run and stays until closed, and a race result can pop up
  // over anything, so every one on screen is dismissed before the picture.
  const toasts = await page.locator('[data-cy="toast-dismiss"]').all();
  for (const x of toasts) await x.click({ timeout: 1000 }).catch(() => {});
  if (toasts.length) await page.waitForTimeout(600); // let it fade out
  // `fit` zooms the page out until the whole of it fits the frame, for a screen
  // that should be seen entire rather than scrolled: the login card is taller
  // than both frames. The zoom is undone afterwards, so your tab is left as it was.
  let unzoom = null;
  if (shot.fit) {
    const was = await page.evaluate(() => document.documentElement.style.zoom);
    unzoom = () =>
      page.evaluate((z) => {
        document.documentElement.style.zoom = z;
      }, was);
    for (let i = 0; i < 5; i++) {
      const over = await page.evaluate(
        () => document.documentElement.scrollHeight / innerHeight,
      );
      if (over <= 1.005) break;
      await page.evaluate((o) => {
        const z = Number(document.documentElement.style.zoom || 1);
        document.documentElement.style.zoom = String(
          Math.floor((z / o) * 100) / 100,
        );
      }, over);
      await page.waitForTimeout(400);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);
  }
  try {
    mkdirSync(dirname(file), { recursive: true });
    // A modal or a control wants its own bounds. A list does NOT: clipping a
    // scroll container to its element gives every row it holds, which came out
    // as a 9952px tall phone shot. Those want what fits on a screen instead.
    // `span` crops from the first of several elements to the last, for a banner
    // about a stretch of a panel: a wallet button down to its sign button, with
    // the logo above them left out.
    if (shot.span && !frame) {
      const boxes = [];
      for (const sel of shot.span) {
        const b = await page.locator(sel).first().boundingBox();
        if (b) boxes.push(b);
      }
      if (boxes.length) {
        const pad = shot.pad ?? 16;
        const vp = await page.evaluate(() => ({
          width: innerWidth,
          height: innerHeight,
        }));
        const x = Math.max(0, Math.min(...boxes.map((b) => b.x)) - pad);
        const y = Math.max(0, Math.min(...boxes.map((b) => b.y)) - pad);
        const x2 = Math.max(...boxes.map((b) => b.x + b.width)) + pad;
        // `extendDown` reaches past the last element, for a list that has no hook
        // of its own under a tab bar that does.
        // `maxHeight` caps a span the way it caps a target: a heading and the
        // first rows of the long list under it, not the whole list.
        const y2 = Math.min(
          Math.max(
            Math.max(...boxes.map((b) => b.y + b.height)) + pad,
            y + (shot.extendDown ?? 0),
          ),
          y + (shot.maxHeight ?? Infinity),
        );
        const span = {
          x,
          y,
          width: Math.min(x2, vp.width) - x,
          height: Math.min(y2, vp.height) - y,
          vw: vp.width,
          vh: vp.height,
        };
        writeFileSync(file, await snap(page, crop(span, shot)));
        return;
      }
    }
    const png = frame
      ? await snap(page)
      : await snap(page, crop(await bounds(page, el, shot.maxHeight), shot));
    writeFileSync(file, png);
  } finally {
    if (unzoom) await unzoom();
    // `after` puts back what the shot changed, a toggle or a picked option, so
    // the next shot starts from the form as you left it.
    if (shot.after) await runSteps(page, shot.after).catch(() => {});
    page.__was = {};
  }
};

/** Guest runs get a clean context each time, so no state leaks between shots. */
const captureGuest = async (browser, shot) => {
  const files = [];
  for (const { file, device, phone } of targetsFor(shot)) {
    refuseIfAbsent(file);
    const context = await browser.newContext(device);
    try {
      await shoot(await context.newPage(), shot, file, phone);
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
/**
 * Size a page the way a context would have, but on a page that already exists.
 * A session cannot make its own context: extensions do not load in one, so
 * the wallet would vanish and the login screen would say none was found.
 */
const emulate = async (page, device) => {
  const cdp = await page.context().newCDPSession(page);
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width: device.viewport.width,
    height: device.viewport.height,
    deviceScaleFactor: device.deviceScaleFactor,
    mobile: !!device.isMobile,
  });
  await cdp.send("Emulation.setTouchEmulationEnabled", {
    enabled: !!device.hasTouch,
  });
  page.__cdp = cdp;
  return async () => {
    delete page.__cdp;
    await cdp.send("Emulation.clearDeviceMetricsOverride").catch(() => {});
    await cdp
      .send("Emulation.setTouchEmulationEnabled", { enabled: false })
      .catch(() => {});
    await cdp.detach().catch(() => {});
  };
};

/**
 * `--session` drives the tab you signed in to. It finds that tab by address,
 * because the first page of a real profile is as likely to be the wallet's own
 * popup, and it leaves the window at its own size when it is done.
 */
const captureSession = async (browser, shot) => {
  const context = browser.contexts()[0];
  if (!context)
    throw new Error("no open context. Is that Chrome showing a tab?");
  const root = (shot.path || "").startsWith("/marketplace")
    ? "/marketplace"
    : "/app";
  let page = context.pages().find((p) => p.url().startsWith(BASE + root));
  if (!page) {
    page = await context.newPage();
    await page.goto(BASE + (root === "/app" ? "/app/" : "/marketplace/"), {
      waitUntil: "domcontentloaded",
      timeout: T * 3,
    });
    await page.waitForTimeout(4000);
  }
  const files = [];
  for (const { file, device, phone } of targetsFor(shot)) {
    refuseIfAbsent(file);
    // A background tab is not painted, so a screenshot of one waits forever.
    await page.bringToFront();
    const restore = await emulate(page, device);
    try {
      await page.waitForTimeout(800); // let the layout answer the new size
      await shoot(page, shot, file, phone);
      files.push(file);
    } finally {
      await restore();
    }
  }
  return files;
};

const list = () => {
  for (const s of SHOTS) {
    const where = s.hold ? "held" : (s.modes || ["guest"]).join("+");
    console.log(
      "  " + s.stem.padEnd(34) + s.kind.padEnd(8) + where.padEnd(11) + s.path,
    );
    if (s.note) console.log(" ".repeat(36) + "note: " + s.note);
  }
  const guest = SHOTS.filter((s) =>
    (s.modes || ["guest"]).includes("guest"),
  ).length;
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
    : SHOTS.filter((s) => !s.hold && (s.modes || ["guest"]).includes(MODE));

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

// A session run is attached to your browser over DevTools and leaves it open,
// and that connection alone keeps node alive after the last shot. Leave on purpose.
main().then(() => {
  if (SESSION) process.exit(process.exitCode || 0);
});
