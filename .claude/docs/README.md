# Agent docs for the player documentation bundle

Which file to load, and when. `../../CLAUDE.md` is the always-loaded entry
point; everything here is loaded on demand.

## The split between `.claude/docs/` and `.claude/rules/`

`.claude/rules/*.md` **auto-load** when editing a matching path, which in this
repository means any `.md`, because every file here is a page. They are short
and normative, and must stay that way: every line costs context in every
session. `.claude/docs/*.md` are loaded on demand and hold the long form.

Nothing should exist in both. When a rule and a doc disagree, the rule wins and
the doc is stale.

| Rule (auto-loads)           | Covers                                                      |
| --------------------------- | ----------------------------------------------------------- |
| `../rules/documentation.md` | Audience, voice, length, punctuation, links, page structure |
| `../rules/accuracy.md`      | Where every figure comes from, and how to check one         |

## Map

| File          | What it is                                                                                       | Load when                                                       |
| ------------- | ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------- |
| `OVERVIEW.md` | Reading order, page ownership, the topics deliberately split across pages, where a new page goes | Adding a page or a section, or unsure which page owns a subject |

## Why everything is under a dot-directory

GitBook syncs this repository's tree into the published space, so a top-level
markdown directory risks appearing to players. A dot-directory does not.
`CLAUDE.md` at the root is the one exception, because that is where it is loaded
from.

The published bundle also carries one internal file at the root that predates
this directory: `../../IMPORTING.md`, which covers importing into GitBook and
building with the legacy `gitbook-cli`. It is not listed in `SUMMARY.md` and is
not published. Read it before touching `book.json`, `.gitbook.yaml` or
`styles/website.css`.

## Cross-repo

The sibling repositories under `TheLuckyDucks/` are where the claims on these
pages are decided:

- `Anchor/` is the on-chain program. `Anchor/docs/README.md` indexes its docs,
  `Anchor/platform-config-mainnet.json` holds the live tunables, and
  `Anchor/README.md` is a player-facing description of the game that is the
  closest peer to this bundle.
- `Frontend/app/` is the dApp a player actually uses, mapped by
  `Frontend/app/docs/OVERVIEW.md`.
- `Backend/` owns everything off chain: XP, leaderboards, badges, standings and
  the Telegram bot.

`../rules/accuracy.md` carries the claim-to-source table. Do not restate it
here.

## Conventions for these files

These are agent-facing, so they follow the sibling repositories' documentation
rules rather than the player-facing voice:

- **State the invariant, not the edit.** Would the line still be true and useful
  if someone rewrote the file tomorrow.
- **No dates, no version stamps, no session narration.** Git has the dates.
- **A count is a measurement, not a fact.** Never write a number without the
  command that regenerates it.
- **Record the why.** Git has the what. A line earns its place by naming a
  failure mode or a constraint that is not visible from the files.
- **No em dashes**, and no hyphen standing in for one. This bundle avoids both;
  repunctuate the sentence.
- **Fix or delete a stale file.** Do not leave it and add a caveat.
