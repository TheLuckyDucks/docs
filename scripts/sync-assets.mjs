#!/usr/bin/env node
/**
 * Keep `.gitbook/assets/` in step with what the pages reference.
 *
 * - A referenced file that does not exist gets a labelled placeholder, built
 *   from the figure's own alt text so the card describes the shot it stands in
 *   for. That is what stops a page shipping a broken image.
 * - A file nothing references is reported, and deleted with `--prune`. It is
 *   not deleted by default because a real capture that has lost its figure is
 *   work, and `npm run check` already fails on the orphan, so nothing rots
 *   quietly either way.
 *
 * Placeholders need ffmpeg, which lives in WSL on the usual host. Without it
 * the script says so and changes nothing.
 *
 * Usage: npm run assets            generate what is missing, list orphans
 *        npm run assets -- --prune generate, and delete the orphans
 */
import {
  readFileSync,
  readdirSync,
  existsSync,
  mkdirSync,
  unlinkSync,
  rmdirSync,
} from "node:fs";
import { dirname, join, normalize, relative, sep } from "node:path";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { writeFileSync } from "node:fs";

const ROOT = process.cwd();
const CONTENT = "docs";
const ASSETS = join(".gitbook", "assets");
const PRUNE = process.argv.includes("--prune");

const FONT_BOLD = "/usr/share/fonts/truetype/ubuntu/Ubuntu-B.ttf";
const FONT_MONO = "/usr/share/fonts/truetype/ubuntu/UbuntuMono-R.ttf";

/** Labels for references that carry no alt text of their own. */
const FALLBACK_LABELS = {
  "docs-cover-welcome.png": "Space cover. Pond, flock and wordmark",
  "docs-hero-race-canvas.png":
    "A five duck race mid-run, wide crop of the canvas",
  "nft-card-runners.png": "Card cover: Runner collection art",
  "nft-card-boosts.png": "Card cover: Boost collection art",
  "nft-card-tracks.png": "Card cover: a track background",
  "nft-card-cosmetics.png": "Card cover: two or three duck skins",
  "nft-card-mystery-boxes.png": "Card cover: a sealed Mystery Box",
  "nft-card-renting.png": "Card cover: an item with the Rental label",
  "docs-card-getting-started.png": "Card cover: a first race, start to finish",
  "docs-card-races.png": "Card cover: the create race form",
  "docs-card-nfts.png": "Card cover: the four collections together",
  "docs-card-competition.png": "Card cover: a tournament standings board",
  "docs-card-economy.png": "Card cover: a prize pool and its payout",
  "docs-card-trust.png": "Card cover: a verified race result",
  "docs-card-help.png": "Card cover: the Telegram bot answering a question",
  "social-card-telegram.png": "Card cover: the Telegram group",
  "social-card-x.png": "Card cover: the X profile",
  "social-card-youtube.png": "Card cover: the YouTube channel",
  "social-card-tiktok.png": "Card cover: the TikTok profile",
};

/** One format per shape of asset: size, type face sizes, wrap, kicker. */
function formatFor(base) {
  if (base.endsWith("-banner.png"))
    return {
      w: 600,
      h: 250,
      fsk: 13,
      fsl: 18,
      fsn: 10,
      cols: 40,
      max: 3,
      kicker: "BANNER PLACEHOLDER",
    };
  if (base.endsWith("-mobile.png"))
    return {
      w: 390,
      h: 640,
      fsk: 15,
      fsl: 21,
      fsn: 11,
      cols: 26,
      max: 6,
      kicker: "PHONE PLACEHOLDER",
    };
  if (base.endsWith("-desktop.png"))
    return {
      w: 1440,
      h: 810,
      fsk: 30,
      fsl: 40,
      fsn: 22,
      cols: 44,
      max: 3,
      kicker: "DESKTOP PLACEHOLDER",
    };
  if (base === "docs-cover-welcome.png")
    return {
      w: 1990,
      h: 480,
      fsk: 26,
      fsl: 34,
      fsn: 20,
      cols: 60,
      max: 2,
      kicker: "ARTWORK PLACEHOLDER",
    };
  // every card cover, whichever table it fills. GitBook crops a cover wide,
  // so all three prefixes want the same 16:9. A card is a few hundred pixels
  // across in a grid, so 640x360 is already 2x for it.
  if (
    ["nft-card-", "docs-card-", "social-card-"].some((p) => base.startsWith(p))
  )
    return {
      w: 640,
      h: 360,
      fsk: 14,
      fsl: 20,
      fsn: 11,
      cols: 34,
      max: 3,
      kicker: "ARTWORK PLACEHOLDER",
    };
  return {
    w: 1440,
    h: 810,
    fsk: 30,
    fsl: 40,
    fsn: 22,
    cols: 44,
    max: 3,
    kicker: "ARTWORK PLACEHOLDER",
  };
}

const toPosix = (p) => p.split(sep).join("/");

function walk(dir, hit = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || entry.name === "node_modules") continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, hit);
    else if (entry.name.endsWith(".md"))
      hit.push(toPosix(relative(ROOT, full)));
  }
  return hit;
}

function wrap(text, cols, max) {
  const out = [];
  let line = "";
  for (const word of String(text).split(/\s+/)) {
    if ((line + " " + word).trim().length > cols) {
      if (line) out.push(line);
      line = word;
    } else line = (line ? line + " " : "") + word;
  }
  if (line) out.push(line);
  return out.slice(0, max);
}

// what the pages reference, and the best label for each
const referenced = new Map();
for (const page of walk(join(ROOT, CONTENT))) {
  const text = readFileSync(join(ROOT, page), "utf8");
  const dir = dirname(page);
  const resolve = (p) => toPosix(normalize(join(dir, p)));
  for (const m of text.matchAll(
    /<img\s+src="((?:\.\.\/)*\.gitbook\/assets\/[A-Za-z0-9._/-]+\.png)"\s+alt="([^"]*)"/g,
  )) {
    const path = resolve(m[1]);
    const label = m[2].replace(/,\s*on a phone$/, "");
    if (!referenced.has(path)) referenced.set(path, label);
  }
  for (const m of text.matchAll(
    /(?:\.\.\/)*\.gitbook\/assets\/[A-Za-z0-9._/-]+\.png/g,
  )) {
    const path = resolve(m[0]);
    if (!referenced.has(path)) {
      const base = path.slice(path.lastIndexOf("/") + 1);
      referenced.set(path, FALLBACK_LABELS[base] ?? base.replace(/\.png$/, ""));
    }
  }
}

// what is on disk
const onDisk = [];
if (existsSync(join(ROOT, ASSETS))) {
  for (const entry of readdirSync(join(ROOT, ASSETS), {
    withFileTypes: true,
  })) {
    const rel = toPosix(join(ASSETS, entry.name));
    if (!entry.isDirectory()) {
      if (entry.name.endsWith(".png")) onDisk.push(rel);
      continue;
    }
    for (const file of readdirSync(join(ROOT, ASSETS, entry.name)))
      if (file.endsWith(".png"))
        onDisk.push(toPosix(join(ASSETS, entry.name, file)));
  }
}

const missing = [...referenced.keys()]
  .filter((p) => !existsSync(join(ROOT, p)))
  .sort();
const orphans = onDisk.filter((p) => !referenced.has(p)).sort();

// generate the missing ones
let made = 0;
if (missing.length) {
  const probe = spawnSync("ffmpeg", ["-version"], { stdio: "ignore" });
  if (probe.error) {
    console.log(
      `${missing.length} placeholder(s) needed, but ffmpeg is not on PATH.`,
    );
    console.log(
      "Run this through WSL, where ffmpeg lives. Nothing was changed.",
    );
    for (const p of missing) console.log(`  needed ${p}`);
    process.exit(1);
  }
  const labelFile = join(tmpdir(), "ld-placeholder-label.txt");
  for (const path of missing) {
    const base = path.slice(path.lastIndexOf("/") + 1);
    const f = formatFor(base);
    writeFileSync(
      labelFile,
      wrap(referenced.get(path), f.cols, f.max).join("\n") + "\n",
      "utf8",
    );
    mkdirSync(join(ROOT, dirname(path)), { recursive: true });
    const yKicker = Math.round(f.h / 10);
    const yRule = yKicker + f.fsk + 12;
    const yName = f.h - Math.round(f.h / 8);
    const ruleW = Math.round(f.w / 7);
    const vf = [
      `drawbox=x=10:y=10:w=${f.w - 20}:h=${f.h - 20}:color=0x2A313B:t=3`,
      `drawtext=fontfile=${FONT_BOLD}:text=${f.kicker}:fontsize=${f.fsk}:fontcolor=0xFFD700:x=(w-text_w)/2:y=${yKicker}`,
      `drawbox=x=${Math.round((f.w - ruleW) / 2)}:y=${yRule}:w=${ruleW}:h=2:color=0xFFD700@0.55:t=fill`,
      `drawtext=fontfile=${FONT_BOLD}:textfile=${labelFile}:fontsize=${f.fsl}:fontcolor=0xE9EAEC:line_spacing=10:x=(w-text_w)/2:y=(h-text_h)/2`,
      `drawtext=fontfile=${FONT_MONO}:text=${path
        .slice(ASSETS.length + 1)
        .split(sep)
        .join(
          "/",
        )}:fontsize=${f.fsn}:fontcolor=0x11D4C4:x=(w-text_w)/2:y=${yName}`,
    ].join(",");
    const run = spawnSync(
      "ffmpeg",
      [
        "-nostdin",
        "-y",
        "-hide_banner",
        "-loglevel",
        "error",
        "-f",
        "lavfi",
        "-i",
        `color=c=0x0E1218:s=${f.w}x${f.h}`,
        "-vf",
        vf,
        "-frames:v",
        "1",
        join(ROOT, path),
      ],
      { stdio: "inherit" },
    );
    if (run.status === 0) {
      console.log(`  made    ${path}`);
      made++;
    } else console.log(`  FAILED  ${path}`);
  }
}

// deal with the orphans
let removed = 0;
for (const path of orphans) {
  if (PRUNE) {
    unlinkSync(join(ROOT, path));
    try {
      rmdirSync(join(ROOT, dirname(path)));
    } catch {
      /* folder still holds assets, which is the normal case */
    }
    console.log(`  deleted ${path}`);
    removed++;
  } else {
    console.log(`  orphan  ${path}`);
  }
}

console.log(
  `\n${referenced.size} referenced, ${onDisk.length + made - removed} on disk, ` +
    `${made} generated, ${orphans.length} orphan(s)${PRUNE ? ` deleted` : " (run with --prune to delete)"}`,
);
if (orphans.length && !PRUNE) process.exit(1);
