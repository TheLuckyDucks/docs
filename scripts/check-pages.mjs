#!/usr/bin/env node
/**
 * Structural check over every published page.
 *
 * It verifies SHAPE and never facts: front matter parses, blocks are balanced,
 * links and anchors resolve, images exist and are paired, the shot list is
 * complete. Nothing here can tell you a fee is wrong, which is still the
 * highest-cost defect this repository can carry. See .claude/rules/accuracy.md.
 *
 * Usage: npm run check
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { dirname, join, normalize, relative, sep } from "node:path";
import { parse as parseYaml } from "yaml";

const ROOT = process.cwd();
/** The published tree. Everything outside it is tooling or agent docs. */
const CONTENT = "docs";
const CONTENT_DIR = join(ROOT, CONTENT);
const INTERNAL = new Set([`${CONTENT}/SUMMARY.md`]);
const KNOWN_FRONT_MATTER = new Set([
  "icon",
  "description",
  "cover",
  "coverY",
  "layout",
  "hidden",
]);
const HINT_STYLES = new Set(["info", "success", "warning", "danger"]);
/** Artwork carries no viewport pair. */
const SINGLE_ASSETS = new Set([
  "docs-cover-welcome.png",
  "docs-hero-race-canvas.png",
  "nft-cosmetics-grid.png",
  "nft-track-examples.png",
]);
const SINGLE_ASSET_PREFIXES = ["nft-card-"];

const problems = [];
const problem = (file, message) => problems.push({ file, message });

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

const pages = walk(CONTENT_DIR)
  .filter((p) => !INTERNAL.has(p))
  .sort();

/** GitBook derives an anchor from the heading text. */
function slug(heading) {
  return heading
    .toLowerCase()
    .replace(/`/g, "")
    .replace(/\*\*/g, "")
    .replace(/_/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[^a-z0-9 -]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

const body = new Map();
const headings = new Map();
for (const page of pages) {
  const text = readFileSync(join(ROOT, page), "utf8");
  body.set(page, text);
  const set = new Set();
  for (const line of text.split("\n")) {
    const m = /^(#{1,6})\s+(.+?)\s*$/.exec(line);
    if (m) set.add(slug(m[2]));
  }
  headings.set(page, set);
}

const resolveFrom = (page, target) =>
  toPosix(normalize(join(dirname(page) === "." ? "" : dirname(page), target)));

const assetUsers = new Map();
const isSingle = (base) =>
  SINGLE_ASSETS.has(base) ||
  SINGLE_ASSET_PREFIXES.some((p) => base.startsWith(p));

// Attribute values can hold a % (width="70%"), so an opener matches to %} on
// the line, and the narrower name of a pair needs a negative lookahead.
const BLOCK_PAIRS = [
  ["hint", /\{%\s*hint\b[^\n]*?%\}/g, /\{%\s*endhint\s*%\}/g],
  ["tabs", /\{%\s*tabs\s*%\}/g, /\{%\s*endtabs\s*%\}/g],
  ["tab", /\{%\s*tab\b(?!s)[^\n]*?%\}/g, /\{%\s*endtab\s*%\}/g],
  ["stepper", /\{%\s*stepper\s*%\}/g, /\{%\s*endstepper\s*%\}/g],
  ["step", /\{%\s*step\b(?!per)[^\n]*?%\}/g, /\{%\s*endstep\s*%\}/g],
  ["code", /\{%\s*code\b[^\n]*?%\}/g, /\{%\s*endcode\s*%\}/g],
  [
    "content-ref",
    /\{%\s*content-ref\b[^\n]*?%\}/g,
    /\{%\s*endcontent-ref\s*%\}/g,
  ],
  ["columns", /\{%\s*columns\s*%\}/g, /\{%\s*endcolumns\s*%\}/g],
  ["column", /\{%\s*column\b(?!s)[^\n]*?%\}/g, /\{%\s*endcolumn\s*%\}/g],
];

const count = (text, re) =>
  (text.match(new RegExp(re.source, "g")) || []).length;

for (const page of pages) {
  const text = body.get(page);

  // front matter, parsed rather than pattern-matched
  if (!text.startsWith("---\n")) {
    problem(page, "no front matter");
  } else {
    const end = text.indexOf("\n---\n", 3);
    if (end < 0) {
      problem(page, "front matter is not terminated");
    } else {
      const block = text.slice(4, end + 1);
      let data;
      try {
        data = parseYaml(block);
      } catch (err) {
        problem(
          page,
          `front matter is not valid YAML: ${err.message.split("\n")[0]}`,
        );
      }
      if (data !== undefined) {
        if (data === null || typeof data !== "object" || Array.isArray(data)) {
          problem(page, "front matter is not a mapping");
        } else {
          for (const key of ["icon", "description"]) {
            const value = data[key];
            if (value === undefined)
              problem(page, `front matter has no ${key}:`);
            else if (typeof value !== "string" || !value.trim())
              problem(page, `front matter ${key}: is not a non-empty string`);
          }
          for (const key of Object.keys(data)) {
            if (!KNOWN_FRONT_MATTER.has(key))
              problem(page, `front matter has an unknown key: ${key}`);
          }
          // A colon plus space in an unquoted scalar is the failure GitBook
          // reports as "Failed to parse YAML front matter", and prettier does
          // not add the quotes for you. Keep the values colon-free instead.
          for (const line of block.split("\n")) {
            const m = /^([a-zA-Z][\w-]*):\s+(.*)$/.exec(line);
            if (!m) continue;
            const value = m[2];
            if (/^["'[{]/.test(value.trim())) continue;
            if (/:\s/.test(value))
              problem(page, `front matter ${m[1]}: holds ": "`);
            if (/\s#/.test(value))
              problem(page, `front matter ${m[1]}: holds " #"`);
          }
        }
      }
    }
  }

  const h1 = (text.match(/^# .+$/gm) || []).length;
  if (h1 !== 1) problem(page, `expected 1 H1, found ${h1}`);

  for (const [name, open, close] of BLOCK_PAIRS) {
    const o = count(text, open);
    const c = count(text, close);
    if (o !== c)
      problem(page, `${name}/end${name} unbalanced: ${o} open, ${c} close`);
  }

  const details = count(text, /<details>/g);
  const endDetails = count(text, /<\/details>/g);
  const summary = count(text, /<summary>/g);
  if (details !== endDetails)
    problem(page, `details unbalanced: ${details} open, ${endDetails} close`);
  if (details !== summary)
    problem(
      page,
      `details/summary mismatch: ${details} details, ${summary} summary`,
    );

  for (const m of text.matchAll(/\{%\s*hint\s+style="([^"]+)"/g)) {
    if (!HINT_STYLES.has(m[1])) problem(page, `unknown hint style "${m[1]}"`);
  }

  for (const m of text.matchAll(
    /\{%\s*step\s*%\}([\s\S]*?)\{%\s*endstep\s*%\}/g,
  )) {
    if (!/^###\s+\S/m.test(m[1])) problem(page, "a step has no ### title");
    if (/<details>/.test(m[1])) problem(page, "a step contains <details>");
  }

  for (const m of text.matchAll(/<img\s+src="([^"]+)"([^>]*)>/g)) {
    const [, src, rest] = m;
    if (!/alt="[^"]*\S[^"]*"/.test(rest))
      problem(page, `img has no alt: ${src}`);
    const resolved = resolveFrom(page, src);
    if (resolved.startsWith(".."))
      problem(page, `img path leaves the repo: ${src}`);
    if (!assetUsers.has(resolved)) assetUsers.set(resolved, new Set());
    assetUsers.get(resolved).add(page);
    if (!existsSync(join(ROOT, resolved)))
      problem(page, `img file missing: ${resolved}`);
  }

  // every other asset reference: card covers, the cover in front matter
  for (const m of text.matchAll(
    /(?:\.\.\/)*\.gitbook\/assets\/[A-Za-z0-9._/-]+\.png/g,
  )) {
    const resolved = resolveFrom(page, m[0]);
    if (!assetUsers.has(resolved)) assetUsers.set(resolved, new Set());
    assetUsers.get(resolved).add(page);
    if (!existsSync(join(ROOT, resolved)))
      problem(page, `asset missing: ${resolved}`);
  }

  for (const m of text.matchAll(/\]\(([^)\s]+)\)/g)) {
    const link = m[1];
    if (/^(https?:|mailto:)/.test(link)) continue;
    if (link.startsWith("#")) {
      if (!headings.get(page).has(link.slice(1)))
        problem(page, `dead same-page anchor: ${link}`);
      continue;
    }
    const [path, anchor] = link.split("#");
    if (!path || !path.endsWith(".md")) continue;
    const target = resolveFrom(page, path);
    if (!existsSync(join(ROOT, target))) {
      problem(page, `dead link: ${link}`);
      continue;
    }
    if (anchor && headings.has(target) && !headings.get(target).has(anchor))
      problem(page, `dead anchor: ${link}`);
  }

  for (const m of text.matchAll(/\{%\s*content-ref\s+url="([^"]+)"/g)) {
    const url = m[1];
    if (/^https?:/.test(url)) continue;
    if (!existsSync(join(ROOT, resolveFrom(page, url))))
      problem(page, `content-ref target missing: ${url}`);
  }

  if (/—/.test(text)) problem(page, "em dash present");
  if (/–/.test(text)) problem(page, "en dash present");

  // a screenshot is a desktop and a phone half, in one columns block
  const desktop = [
    ...text.matchAll(/assets\/[^"]*?([A-Za-z0-9._-]+)-desktop\.png/g),
  ].map((m) => m[1]);
  const mobile = [
    ...text.matchAll(/assets\/[^"]*?([A-Za-z0-9._-]+)-mobile\.png/g),
  ].map((m) => m[1]);
  for (const base of desktop)
    if (!mobile.includes(base))
      problem(page, `${base}-desktop.png has no phone half on this page`);
  for (const base of mobile)
    if (!desktop.includes(base))
      problem(page, `${base}-mobile.png has no desktop half on this page`);
  const columns = count(text, /\{%\s*columns\s*%\}/g);
  if (columns !== desktop.length)
    problem(
      page,
      `pairs and columns blocks disagree: ${desktop.length} pairs, ${columns} columns`,
    );
}

// .gitbook.yaml decides what GitBook reads at all. A wrong root publishes
// nothing, and nothing else in this check would notice.
try {
  const config = parseYaml(readFileSync(join(ROOT, ".gitbook.yaml"), "utf8"));
  const root = String(config?.root ?? "./")
    .replace(/^\.\//, "")
    .replace(/\/$/, "");
  if (root !== CONTENT)
    problem(
      ".gitbook.yaml",
      `root is "${config?.root}", expected "./${CONTENT}"`,
    );
  for (const [key, fallback] of [
    ["readme", "README.md"],
    ["summary", "SUMMARY.md"],
  ]) {
    const value = config?.structure?.[key] ?? fallback;
    if (!existsSync(join(ROOT, root, value)))
      problem(
        ".gitbook.yaml",
        `structure.${key} points at a missing file: ${value}`,
      );
  }
} catch (err) {
  problem(
    ".gitbook.yaml",
    `unreadable or invalid YAML: ${err.message.split("\n")[0]}`,
  );
}

// SUMMARY.md lists every page, and only pages that exist
const summaryText = readFileSync(join(CONTENT_DIR, "SUMMARY.md"), "utf8");
const listed = new Set(
  [...summaryText.matchAll(/\]\(([^)]+\.md)\)/g)].map((m) => m[1]),
);
for (const page of pages)
  if (!listed.has(page.slice(CONTENT.length + 1)))
    problem(page, "not listed in SUMMARY.md");
for (const entry of listed)
  if (!existsSync(join(CONTENT_DIR, entry)))
    problem(
      `${CONTENT}/SUMMARY.md`,
      `lists a file that does not exist: ${entry}`,
    );

// the shot list documents every asset, and every asset is still referenced
const shotList = ".claude/docs/screenshots.md";
const shots = existsSync(join(ROOT, shotList))
  ? readFileSync(join(ROOT, shotList), "utf8")
  : (problem(shotList, "missing"), "");
for (const asset of [...assetUsers.keys()].sort()) {
  const base = asset.slice(asset.lastIndexOf("/") + 1);
  const stem = base
    .replace(/-(desktop|mobile)\.png$/, "")
    .replace(/\.png$/, "");
  if (shots && !shots.includes(stem)) problem(shotList, `no row for ${stem}`);
}

const assetsDir = join(ROOT, ".gitbook", "assets");
const onDisk = [];
if (existsSync(assetsDir)) {
  for (const folder of readdirSync(assetsDir)) {
    const full = join(assetsDir, folder);
    if (!statSync(full).isDirectory()) {
      onDisk.push(`.gitbook/assets/${folder}`);
      continue;
    }
    for (const file of readdirSync(full))
      onDisk.push(`.gitbook/assets/${folder}/${file}`);
  }
}
for (const asset of onDisk) {
  if (!asset.endsWith(".png")) continue;
  if (!assetUsers.has(asset)) problem(asset, "orphan: no page references it");
  const base = asset.slice(asset.lastIndexOf("/") + 1);
  if (isSingle(base)) continue;
  if (!/-(desktop|mobile)\.png$/.test(base))
    problem(asset, "screenshot is neither -desktop nor -mobile");
  const other = asset.includes("-desktop.png")
    ? asset.replace("-desktop.png", "-mobile.png")
    : asset.replace("-mobile.png", "-desktop.png");
  if (!existsSync(join(ROOT, other)))
    problem(asset, `half a pair: ${other} is missing`);
}

const byFile = new Map();
for (const { file, message } of problems) {
  if (!byFile.has(file)) byFile.set(file, []);
  byFile.get(file).push(message);
}
for (const file of [...byFile.keys()].sort()) {
  console.log(file);
  for (const message of byFile.get(file)) console.log(`    ${message}`);
}
console.log(
  problems.length
    ? `\n${problems.length} problem(s) across ${pages.length} pages`
    : `no problems: ${pages.length} pages, ${assetUsers.size} assets, all resolved`,
);
process.exit(problems.length ? 1 : 0);
