---
description: How the rule files, the reference files and CLAUDE.md themselves are written. Read before editing any of them.
paths:
  - "CLAUDE.md"
  - "IMPORTING.md"
  - ".claude/**/*.md"
---

# Writing a rule or a reference file

These files are read by a session with no memory of how the repository got
this way, so they follow different rules from the pages: the reader is whoever
works here, not a player.

## Where does a rule go?

- **A rule goes under `.claude/rules/`, once.** Every `.md` there is loaded by
  the tool, at launch or with a matching file (`CLAUDE.md`, "Which file answers
  what"). Scope a rule with `paths:` when it concerns only the pages, and leave
  it unscoped only when every session needs it.
- **`.claude/docs/` holds reference material, not rules.** Nothing loads it, so
  a rule placed there is read only by whoever already knew to look. It holds
  the long form: inventories, maps, commands.
- **Nothing exists in both.** A copy that drifts is worse than no copy, because
  it is indistinguishable from current guidance. When a rule and a reference
  file disagree, the rule wins and the reference file is stale.
- **Keep rules short.** Every line of a rule costs context in every session
  that loads it.
- **`CLAUDE.md` is the map**: what the repository is, publishing, the host, the
  commands, and a pointer to each rule. A new rule file gets its row there.

## How is one written?

- **State the invariant, not the edit.** Would the line still be true and
  useful if someone rewrote the file tomorrow.
- **No dates, no version stamps, no session narration.** Git has the dates.
- **Never cite a section by number.** Cite it by its heading, or by the file
  that owns the rule.
- **A count is a measurement, not a fact.** Never write a number without the
  command that regenerates it.
- **Record the why.** Git has the what. A line earns its place by naming a
  failure mode or a constraint that is not visible from the files.
- **A command block runs as written** from the directory named just above it,
  or from the repository root when none is named.
- **A file that names a page, a script or a path is part of that thing's
  rename.** Moving it is not done until the files naming it are updated.
- **Fix or delete a stale file.** Do not leave it and add a caveat.
- Page paths are relative to `docs/`, and the conventions that hold in every
  file are in `CLAUDE.md`: no em dashes, "X" and "post", LF, prettier.
