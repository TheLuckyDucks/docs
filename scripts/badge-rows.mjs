#!/usr/bin/env node
/**
 * Build the badge medal rows on `competition/badges.md` from the medals the
 * site serves.
 *
 * Each row puts one ladder's medals side by side, lowest rung first: every
 * 64x64 medal in the product repository's
 * `Frontend/packages/www/public/badges/<id>.png` scaled four times with
 * nearest-neighbour, so the pixel art stays sharp, with a 48 px transparent
 * gap between medals and none at the ends. Rerun it whenever the medals are
 * redrawn; the ids, and so this list, change only when a ladder does.
 *
 * It only ever OVERWRITES, like `capture-shots.mjs`: `sync-assets.mjs` owns
 * which files exist. A new row is a figure on the page first, then
 * `npm run assets`, then a line in ROWS and a run of this.
 *
 * Usage: npm run badges                  every row
 *        npm run badges -- --only docs-badges-last-place
 *        npm run badges -- --product <path>  the product repository, when it
 *                                            is not checked out beside this one
 *
 * Needs ffmpeg, like `npm run assets`.
 */
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";

const ROWS = {
  "docs-badges-lucky-dodge": [
    "arcade_lucky_dodge_1000",
    "arcade_lucky_dodge_5000",
    "arcade_lucky_dodge_15000",
  ],
  "docs-badges-lucky-shot": [
    "arcade_lucky_shot_5000",
    "arcade_lucky_shot_25000",
    "arcade_lucky_shot_75000",
  ],
  "docs-badges-lucky-fight": [
    "arcade_lucky_fight_wins_5",
    "arcade_lucky_fight_wins_25",
    "arcade_lucky_fight_wins_100",
  ],
  "docs-badges-lucky-flaps": [
    "arcade_lucky_flaps_5000",
    "arcade_lucky_flaps_25000",
    "arcade_lucky_flaps_60000",
  ],
  "docs-badges-lucky-squad": [
    "arcade_lucky_squad_10000",
    "arcade_lucky_squad_50000",
    "arcade_lucky_squad_100000",
  ],
  "docs-badges-losing-streak": [
    "lose_streak_5",
    "lose_streak_20",
    "lose_streak_50",
    "lose_streak_100",
  ],
  "docs-badges-last-place": [
    "last_place_5",
    "last_place_25",
    "last_place_50",
    "last_place_100",
    "last_place_250",
  ],
};

const MEDAL_SIDE = 256;
const GAP = 48;

const argument = (name) => {
  const at = process.argv.indexOf(name);
  return at === -1 ? null : process.argv[at + 1];
};

const root = resolve(import.meta.dirname, "..");
const product = resolve(
  argument("--product") ?? join(root, "..", "TheLuckyDucks"),
);
const medals = join(product, "Frontend/packages/www/public/badges");
const assets = join(root, ".gitbook/assets/competition");
const only = argument("--only")?.split(",");

if (!existsSync(medals)) {
  console.error(`no medals at ${medals}: pass --product <path>`);
  process.exit(1);
}

let failed = 0;
for (const [name, ids] of Object.entries(ROWS)) {
  if (only && !only.includes(name)) continue;
  const out = join(assets, `${name}.png`);
  if (!existsSync(out)) {
    console.error(
      `${name}: no such asset; add its figure and run npm run assets first`,
    );
    failed += 1;
    continue;
  }
  const missing = ids.filter((id) => !existsSync(join(medals, `${id}.png`)));
  if (missing.length) {
    console.error(`${name}: no medal for ${missing.join(", ")}`);
    failed += 1;
    continue;
  }
  const inputs = ids.flatMap((id) => ["-i", join(medals, `${id}.png`)]);
  const scaled = ids.map((_, i) => {
    const pad =
      i < ids.length - 1
        ? `,pad=${MEDAL_SIDE + GAP}:${MEDAL_SIDE}:0:0:color=0x00000000`
        : "";
    return `[${i}:v]scale=${MEDAL_SIDE}:${MEDAL_SIDE}:flags=neighbor,format=rgba${pad}[m${i}]`;
  });
  const stack = `${ids.map((_, i) => `[m${i}]`).join("")}hstack=inputs=${ids.length},format=rgba`;
  const run = spawnSync(
    "ffmpeg",
    [
      "-y",
      "-loglevel",
      "error",
      ...inputs,
      "-filter_complex",
      `${scaled.join(";")};${stack}`,
      "-frames:v",
      "1",
      out,
    ],
    { stdio: "inherit" },
  );
  if (run.status !== 0) {
    console.error(`${name}: ffmpeg failed`);
    failed += 1;
    continue;
  }
  console.log(`${name}: ${ids.length} medals`);
}
process.exit(failed ? 1 : 0);
