# CLAUDE.md

Project memory for the Lucky Ducks player documentation. Read at session start.
Topic rules live in `.claude/rules/`.

## What this is

The source of the player-facing documentation site for theluckyducks.com. It is
a GitBook space backed by this repository: markdown, one file per page,
`SUMMARY.md` as the sidebar.

**The pages are the product. The only code here is tooling**: a structural
checker, `scripts/check-pages.mjs`, run by `npm run check`, and an asset
synchroniser, `scripts/sync-assets.mjs`, run by `npm run assets`. The checker
verifies shape and cannot verify a fact: front matter parses, blocks balance, links and anchors
resolve, images exist and are paired, `SUMMARY.md` is complete. **Nothing
verifies a claim on a page**, so the only thing standing between a reader and a
wrong number is still whoever wrote it. That is what shapes
`.claude/rules/accuracy.md`.

The audience is a player, not a developer. Someone who has connected a wallet
once and wants to know what a button costs, why their refund was short, or
whether a Runner NFT is required for the thing they are trying to do.

## GitBook writes to this branch

Every commit in this repository's history is authored by GitBook
(`GITBOOK-<n>: No subject`). The sync is bidirectional: an edit made in the
GitBook web editor is committed here, and a commit pushed here is pulled into
the space.

Three consequences, all of which have to shape how work is done:

- **A local edit races with the editor.** Anyone editing in GitBook while a
  local change is unpushed produces a conflict on a file nobody was expecting to
  conflict. Pull before starting, and push a finished change promptly rather
  than sitting on it.
- **GitBook normalizes markdown when it writes back.** Hand-tuned formatting,
  table alignment padding and link style survive only until someone touches the
  page in the editor. Do not spend effort on formatting that carries no meaning,
  and do not treat a formatting-only diff from GitBook as damage.
- **Never rewrite a page wholesale to fix a sentence.** A full-file rewrite
  turns a one-line correction into a conflict against every concurrent edit.
  Change the smallest span that fixes the problem.

## The site plan decides what is possible

The space publishes on GitBook's **Basic Site** plan, the free site tier.

**GitBook accepts no custom code in a site: no CSS, no HTML, no JavaScript, on
any plan.** That is a platform limitation and no upgrade lifts it, so a styling
request cannot be answered with a stylesheet. Everything that shapes a page has
to come from the content: page icons, page descriptions, and GitBook's own
blocks.

Basic Site also excludes custom domain, custom fonts, custom logo, footer
customization, the bold and gradient themes, semantic and code colours, PDF
export, AI search, adaptive content, authenticated access and site sections.
Anything that is available is set in the GitBook customization panel, not in
this repository. `IMPORTING.md` carries the detail.

## Layout

**`docs/` is the published tree and nothing else is.** `.gitbook.yaml` sets
`root: ./docs`, so GitBook reads that folder and ignores everything beside it.
Tooling, agent docs and this file sit outside it and cannot surface as a page.

| Path                 | Holds                                                                        |
| -------------------- | ---------------------------------------------------------------------------- |
| `docs/README.md`     | The welcome page, and the space root per `.gitbook.yaml`                     |
| `docs/SUMMARY.md`    | The sidebar. A page not listed here is not navigable                         |
| `docs/introduction/` | Orientation: what the platform is, how a race works, first race              |
| `docs/races/`        | Creating, joining, configuring, gating, hosting, cancelling                  |
| `docs/nfts/`         | The four collections, plus Mystery Boxes and renting                         |
| `docs/competition/`  | Tournaments, teams, rematches, badges, the community lottery                 |
| `docs/economy/`      | Fees, prizes, creator fee share, refunds, rent, SPL token races              |
| `docs/trust/`        | Randomness, on-chain verification, player verification                       |
| `docs/help/`         | FAQ, glossary, Telegram bot, social links                                    |
| `.gitbook/assets/`   | Every image, in one folder per section. **Repository root, not `docs/`**     |
| `.gitbook.yaml`      | GitBook config: the content root, readme and summary locations               |
| `scripts/`           | `check-pages.mjs` and `sync-assets.mjs`. The only code in the repository     |
| `package.json`       | Tooling only: `prettier` and `yaml`. Nothing here is published               |
| `IMPORTING.md`       | How the sync works, what the plan allows. Not published, not in `SUMMARY.md` |

The asset folder is the one thing that does **not** move under `docs/`: GitBook
requires `.gitbook/assets/` at the repository root. So a page reaches an image
by climbing out of the content tree, which is why a page in a section uses
`../../.gitbook/assets/<section>/x.png` and `docs/README.md` uses
`../.gitbook/assets/brand/x.png`.

**Page paths are written relative to `docs/` everywhere in this file and under
`.claude/`**, because that is how a reader of the site sees them: `SUMMARY.md`
means `docs/SUMMARY.md`, and `races/access-and-gating.md` means
`docs/races/access-and-gating.md`. Links between pages are relative to each
other and so are unaffected by the content root.

`.claude/docs/OVERVIEW.md` is the content map: which page owns which topic, and
where a new one belongs. `.claude/docs/screenshots.md` is the shot list for
every image the pages reference. `.claude/docs/verifying-claims.md` is how to
check a figure, a permission or a precondition against the sibling repositories.

## The commands, and where they run

**Node is not on this host's PATH outside WSL**, so they all go through it:

```bash
wsl -d Ubuntu -- bash -lc 'export PATH="$HOME/.nvm/versions/node/v24.10.0/bin:$PATH"; cd /mnt/WORK/DeFi/TheLuckyDucksDocs && npm run check'
```

- **`npm run check`** is the gate before a push. It exits non-zero on a problem
  and prints one line per finding. Run it after any edit to a page, a figure or
  `SUMMARY.md`.
- **`npm run assets`** builds a labelled placeholder for any image a page
  references but the repository lacks, and lists any asset nothing references.
  `npm run assets -- --prune` deletes those. It needs ffmpeg, which WSL has.
- **`npm run format`** is prettier over every `.md`, which owns the formatting.
  `npm run format:check` is the read-only half.

Two things about running them here. Check which node version is current under
`~/.nvm/versions/node/` rather than trusting the line above, and **never read
`$?` through `bash -lc`**: the outer Git Bash expands it before WSL sees it, so
a failing command reads as a pass. Use `&& echo ok || echo failed` instead.

## Where agent docs live

Everything an agent reads lives under `.claude/` at the repository root, outside
the content tree. That is now belt and braces: a file outside `docs/` is not
read by GitBook at all, and a dot-directory would be skipped even if the content
root moved back. `CLAUDE.md` sits at the root for the same reason, because that
is where it is loaded from.

Nothing agent-facing belongs inside `docs/`. A markdown file there is a
candidate page even before anyone lists it in `SUMMARY.md`.

## Adding, moving and renaming a page

- **A new page needs three edits.** Create the `.md` in the right folder with
  `icon:` and `description:` front matter, then add its line to `SUMMARY.md`
  under the correct heading. A page missing from `SUMMARY.md` is unreachable
  through navigation and is the most common way a new page silently does
  nothing.
- **Renaming a file breaks every inbound link and its published URL.** Links
  here are relative paths (`../nfts/runners.md`), so a rename means grepping for
  the old filename and fixing every hit, in `SUMMARY.md` and in every
  `{% content-ref %}` too.
- **Renaming a heading breaks deep links silently.** Anchors are derived from
  heading text, so `boosts.md#no-boost-races` dies the moment that heading is
  reworded, and nothing reports it. Grep for the anchor before editing a heading
  that other pages point at:

  ```bash
  grep -rn "boosts.md#" --include=*.md .
  ```

  **A heading that other pages deep-link into cannot move inside a tab, a
  stepper step or an expandable either**, because those are not headings and the
  anchor disappears with them. `races/access-and-gating.md` keeps five gates as
  `##` sections for exactly this reason.

- **Order in `SUMMARY.md` is the reading order.** The sections are sequenced so
  a new player can read top to bottom. Put a page where someone would meet the
  concept, not where the alphabet puts it.

## Reading level and voice

**Every page serves a crypto newcomer and a veteran at the same time.** Assume
no prior knowledge, but never spend a reader's patience proving it: explain a
term in the clause where it first appears and move on. A newcomer must never
have to read another page to understand a sentence, and a veteran must never
have to wade through a tutorial to reach the answer. Do not write down to
either.

Second person, present tense, plain words. A page answers a question a player
actually has, in its first sentence, with the mechanism after it.

Pages are deliberately short, most of them a few hundred words. The platform
changes often, and a short page is one that gets corrected instead of going
stale. When a page grows past what a reader will scan, split it and link rather
than adding another section.

Full rules, including the vocabulary table, the block vocabulary and the
punctuation convention this bundle keeps: `.claude/rules/documentation.md`.

## Every number here is a claim about a live program

Entry fees, penalties, percentages, limits, timeouts and player caps are all
values in a deployed Solana program or in its on-chain config account. They are
not decided in this repository and cannot be verified from it.

Before writing or changing one, check it against the source named in
`.claude/rules/accuracy.md`. That rule carries the claim-to-source table and the
commands. A wrong number on a money page is the highest-cost defect this
repository can ship, because a player acts on it.

## Markdown conventions

- **GitBook block syntax is used deliberately.** Hints, steppers, tabs,
  expandables, cards, page-link cards, titled code blocks and Mermaid diagrams
  all appear. They are GitBook's own syntax, so they survive a round trip
  through the web editor. `.claude/rules/documentation.md` says which block does
  which job; `IMPORTING.md` lists the literal syntax of each.
- **Every page carries `icon:` and `description:` front matter.** The icon is a
  Font Awesome name without the `fa-` prefix and shows in the sidebar; the
  description is the subtitle under the page title, the card subtitle, and the
  meta description a search engine reads.
- **Images live in `.gitbook/assets/<section>/`**, one folder per page folder
  plus `brand/` for the root artwork, referenced by relative path from the page
  inside a `<figure>` with an `alt` and a `<figcaption>`. **Every screenshot is a
  pair**, desktop and phone, in a `{% columns %}` block at 70/30; artwork is a
  single file. A figure whose file is missing renders as a broken image on the
  live site, so an image and its asset ship together.
  `.claude/docs/screenshots.md` is the shot list and the capture procedure.
- **Prettier owns the formatting**, on its defaults, over every `.md` in the
  repository including this file and everything under `.claude/`. So bullets are
  `-`, table cells are padded to the column width, and emphasis is `_`. Nothing
  is configured, so a run needs no setup:

  ```bash
  npx --yes prettier --write "**/*.md"
  ```

  It touches presentation only, never words, which is what makes it safe to run
  on a tree that GitBook also writes to. It leaves `{% %}` blocks and raw HTML
  alone. Do not extend it to `.gitbook.yaml`.

- Links are relative paths to the `.md` file, with an anchor fragment when
  pointing at a section.
- Emoji appear in a few headings (`competition/badges.md`) where they mirror the
  badge art. Do not add them elsewhere.

## Do not touch

- `.gitbook.yaml`. It defines the space root. Changing it re-points the whole
  site.
- The block syntax itself. A mistyped `{% hint %}` does not fail a build,
  because there is no build: it renders as literal text on a live public page.
  Copy the shape from a page that already uses the block.
