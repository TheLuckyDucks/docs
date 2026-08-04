# CLAUDE.md

Project memory for the Lucky Ducks player documentation. Read at session start.
Topic rules live in `.claude/rules/`.

## What this is

The source of the player-facing documentation site for theluckyducks.com. It is
a GitBook space backed by this repository: plain markdown, one file per page,
`SUMMARY.md` as the sidebar.

**There is no code here.** No build, no tests, no lint, no CI. Nothing verifies
a claim on a page, so the only thing standing between a reader and a wrong
number is whoever wrote it. That absence shapes every rule in `.claude/rules/`.

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

## Layout

| Path             | Holds                                                                    |
| ---------------- | -------------------------------------------------------------------------- |
| `README.md`      | The welcome page, and the space root per `.gitbook.yaml`                  |
| `SUMMARY.md`     | The sidebar. A page not listed here is not navigable                      |
| `introduction/`  | Orientation: what the platform is, how a race works, first race           |
| `races/`         | Creating, joining, configuring, gating, hosting, cancelling               |
| `nfts/`          | The four collections, plus Mystery Boxes                                  |
| `competition/`   | Tournaments, teams, rematches, badges                                     |
| `economy/`       | Fees, prizes, creator fee share, refunds, rent, SPL token races           |
| `trust/`         | Randomness, on-chain verification, player verification                    |
| `help/`          | FAQ, glossary, Telegram bot, social links                                 |
| `styles/`        | `website.css`, the custom theme                                           |
| `.gitbook.yaml`  | Modern GitBook config: readme and summary locations                       |
| `book.json`      | Legacy `gitbook-cli` config: title, plugins, theme, brand variables       |
| `IMPORTING.md`   | How to import and build the bundle. Not published, not in `SUMMARY.md`    |

`.claude/docs/OVERVIEW.md` is the content map: which page owns which topic, and
where a new one belongs.

## Where agent docs live, and why they are hidden

Everything an agent reads lives under `.claude/`, not in a `docs/` folder at the
root. GitBook syncs this repository's tree, and a top-level markdown directory
risks appearing in the published space; a dot-directory does not.

`CLAUDE.md` is the exception and has to sit at the root, because that is where
it is loaded from. If it ever surfaces as a page in the space, unlist it there
rather than moving it.

## Adding, moving and renaming a page

- **A new page needs two edits.** Create the `.md` in the right folder, then add
  its line to `SUMMARY.md` under the correct heading. A page missing from
  `SUMMARY.md` is unreachable through navigation and is the most common way a
  new page silently does nothing.
- **Renaming a file breaks every inbound link and its published URL.** Links
  here are relative paths (`../nfts/runners.md`), so a rename means grepping for
  the old filename and fixing every hit, in `SUMMARY.md` too.
- **Renaming a heading breaks deep links silently.** Anchors are derived from
  heading text, so `boosts.md#no-boost-races` dies the moment that heading is
  reworded, and nothing reports it. Grep for the anchor before editing a heading
  that other pages point at:

  ```bash
  grep -rn "boosts.md#" --include=*.md .
  ```

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

Full rules, including the vocabulary table and the punctuation convention this
bundle keeps: `.claude/rules/documentation.md`.

## Every number here is a claim about a live program

Entry fees, penalties, percentages, limits, timeouts and player caps are all
values in a deployed Solana program or in its on-chain config account. They are
not decided in this repository and cannot be verified from it.

Before writing or changing one, check it against the source named in
`.claude/rules/accuracy.md`. That rule carries the claim-to-source table and the
commands. A wrong number on a money page is the highest-cost defect this
repository can ship, because a player acts on it.

## Markdown conventions

- **Plain markdown only.** No GitBook block syntax (`{% hint %}`,
  `{% content-ref %}`) is used anywhere. Keeping it that way is what lets the
  legacy `gitbook-cli` path in `IMPORTING.md` still build, and keeps every page
  readable as a file.
- Bullets use `*`, matching the existing pages.
- Links are relative paths to the `.md` file, with an anchor fragment when
  pointing at a section.
- Emoji appear in a few headings (`competition/badges.md`) where they mirror the
  badge art. Do not add them elsewhere.

## Do not touch

- `styles/website.css` unless the change is a deliberate brand decision. Custom
  CSS applies only on GitBook paid tiers and on the legacy builder, so a change
  here is invisible in some environments and not in others.
- `book.json` plugin list. It targets `gitbook-cli`, which is unmaintained, and
  a plugin added on a whim is a build that fails on a machine nobody tests on.
- `.gitbook.yaml`. It defines the space root. Changing it re-points the whole
  site.
