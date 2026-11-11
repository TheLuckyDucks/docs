---
description: "How the rule files, the reference files and CLAUDE.md themselves are written. Read before editing any of them."
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
  what"). Scope a rule with `paths:` when it concerns only some files, and
  leave it unscoped only when every session needs it. One topic per rule file.
- **Rules and reference files sit under `.claude/`**, a dot-directory GitBook
  would skip even if the content root moved; `CLAUDE.md` sits at the root
  because that is where it is loaded from.
- **`.claude/docs/` holds reference material, not rules.** Nothing loads it, so
  a rule placed there is read only by whoever already knew to look. It holds
  the long form: inventories, maps, commands.
- **A procedure for one task is a skill, not a rule**: a rule loads on every
  matching edit, a skill only when invoked.
- **Nothing exists in both.** A copy that drifts is worse than no copy, because
  it is indistinguishable from current guidance. When a rule and a reference
  file disagree, the rule wins and the reference file is stale.
- **Keep rules short.** Every line of a rule costs context in every session
  that loads it.
- **`CLAUDE.md` holds only what a session cannot work out from the files**:
  publishing, the host, the commands, the conventions, the misleading places,
  and a pointer to each rule. It stays under 200 lines and never describes the
  layout or the file tree, which a session reads for itself. A new rule file
  gets its line there. A note only for maintainers goes in a block HTML comment
  (`<!-- ... -->`), which is stripped before loading; an `@path` import loads
  with its importer and saves nothing.

## How is one written?

- **State the invariant, not the edit.** Would the line still be true and
  useful if someone rewrote the file tomorrow.
- **No dates, no version stamps, no session narration, no attribution.** Git
  has the dates; state the rule and its one-line why, not who made it.
- **Never cite a section by number.** Cite it by its heading, or by the file
  that owns the rule.
- **A count is a measurement, not a fact.** Never write a number without the
  command that regenerates it.
- **Record the why.** Git has the what. A line earns its place by naming a
  failure mode or a constraint that is not visible from the files.
- **Plain wording**: no IMPORTANT, no capitals for emphasis, no piled bold. A
  bold lead on a bullet is fine, bold inside the sentence beyond it is not: a
  model over-applies an emphasised line.
- **Headers and bullets over dense paragraphs.**
- **A list, not a table, and a list names its columns once**: a lead line
  (`Each line: <A>: <B>; <C>.`), then `- a: b; c`. Measured in tokens, a padded
  table costs about 13% more than such a list, while a list repeating the
  column names in every row saves only 5%, and at five or more columns costs
  more than the table. A wide grid whose rows need their column names to be
  read stays a table, and so does one with a `;` inside a middle cell.
- **A rule's front matter**: `paths:` is the only field Claude Code reads, each
  glob quoted. The `description:` stays, quoted (`description: "..."`): an
  unquoted `: ` or ` #` makes the YAML invalid or truncates it, and a rule
  whose front matter fails to parse loads unscoped, every session. A page's
  front matter is the other way round: repunctuated, never quoted
  (`pages.md`).
- **File names**: lower kebab inside `.claude/`, UPPER-KEBAB outside it;
  `CLAUDE.md`, `SKILL.md`, `INDEX.md` and `README.md` are fixed, and a file a
  script reads by name keeps that name. The file system is case-insensitive,
  so git records a case-only rename only through `git mv -f`, which the owner
  runs.
- **A command block runs as written** from the directory named just above it,
  or from the repository root when none is named.
- **A file that names a page, a script or a path is part of that thing's
  rename.** Moving it is not done until the files naming it are updated.
- **Fix or delete a stale file.** Do not leave it and add a caveat.
- Page paths are relative to `docs/`, and the conventions that hold in every
  file are in `CLAUDE.md`: no em dashes, "X" and "post", LF, prettier.
