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

| File                  | What it is                                                                                                                         | Load when                                                            |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `OVERVIEW.md`         | Reading order, page ownership, the topics deliberately split across pages, where a new page goes                                   | Adding a page or a section, or unsure which page owns a subject      |
| `screenshots.md`      | Every image the pages reference, what each one must show, and how to find the missing ones                                         | Adding or replacing an image, or capturing a batch of them           |
| `verifying-claims.md` | Which file in the sibling repos answers which claim, the commands that produce the answer, and the ways this bundle has been wrong | Writing or changing a figure, a permission, a precondition or a cost |

## Why everything is outside the content tree

`.gitbook.yaml` sets `root: ./docs`, so GitBook reads that folder and nothing
else. Agent docs live under `.claude/` at the repository root, which puts them
outside the published tree twice over: outside the content root, and in a
dot-directory that would be skipped even if that root moved. `CLAUDE.md` at the
root is the one exception to the dot-directory habit, because that is where it
is loaded from.

The rule that follows: **nothing agent-facing goes inside `docs/`.** A markdown
file there is a candidate page before anyone lists it.

The bundle also carries one internal file at the root that predates this
directory: `../../IMPORTING.md`, which covers how the Git Sync works, the
literal syntax of every block the pages use, and what the site plan allows. It
is not listed in `SUMMARY.md` and is not published. Read it before touching
`.gitbook.yaml`, and before answering any question about styling: GitBook
accepts no custom CSS, HTML or JS in a site on any plan.

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
