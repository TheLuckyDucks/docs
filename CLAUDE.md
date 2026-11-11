# CLAUDE.md

The Lucky Ducks player documentation: the GitBook space for theluckyducks.com,
backed by this repository. The rules are in `.claude/rules/`.

<!-- Holds only what a session cannot work out from the files: .claude/rules/instruction-files.md -->

## The reader, and what nothing checks

- **The pages are the product, and their reader is a player, not a
  developer**: someone who has connected a wallet once and wants to know what
  a button costs, why their refund was short, or whether a Runner NFT is
  required for the thing they are trying to do.
- **Nothing verifies a claim on a page.** The only code is the tooling in
  `scripts/` behind the commands below, and the checker verifies shape, never
  a fact. Every fee, limit, percentage and timeout is a value in a deployed
  Solana program or its on-chain config, decided in the product repository
  and never here. A wrong number on a money page is the highest-cost defect
  this repository can ship, because a player acts on it:
  `.claude/rules/accuracy.md` says where each figure comes from.

## Publishing, and what a session never does

Pushing this repository publishes the site, and the sync is two-way: a commit
pushed to this branch is pulled into the live space, and an edit in the GitBook
web editor is committed here by GitBook itself (`GITBOOK-<n>: No subject`).

- **A session never commits and never pushes.** It leaves the working tree,
  runs the check and says what it changed; the owner reviews and runs git. A
  push cannot be reviewed afterwards: it puts every page in the tree in front
  of players at once, a page for behaviour mainnet lacks yet included.
- **The site describes mainnet only**: nothing about devnet, beta or test
  builds, and no "coming soon". A page for behaviour not on mainnet yet is
  written with the change and held until the deploy, since a player reading
  about a gate or screen mainnet lacks is misled as by a stale page. A
  hand-over names the pages that are held.
- **Change the smallest span that fixes the problem**, never a whole page for
  one sentence: an unpushed local edit races anyone in the web editor, and a
  full-file rewrite turns a one-line fix into a conflict with every concurrent
  edit. So the owner pulls before a batch, and a finished batch is handed over
  at once instead of sitting.
- **GitBook normalizes markdown when it writes back**, so hand-tuned
  formatting lasts until someone touches the page in the editor: spend no
  effort on formatting that carries no meaning, and a formatting-only diff
  from GitBook is not damage.
- **A site takes no custom code: no CSS, no HTML, no JavaScript, on any
  plan.** A styling request cannot be answered with a stylesheet: what shapes
  a page is its content, the page icon, the page description and GitBook's own
  blocks. What the plan allows is in `IMPORTING.md`, and it is set in the
  GitBook customization panel, not here.
- **`.gitbook.yaml` decides what GitBook reads**, and `npm run check` holds
  it: `root: ./docs`, with the readme and the summary relative to that root.
  Changing `root` or `structure` re-points the whole site, so neither is
  touched; its one edit is a `redirects:` entry when a page moves
  (`.claude/rules/site-structure.md`). Prettier is not extended to it.
- **`docs/` is the published tree and nothing else is.** GitBook ignores
  everything beside it, so tooling, rules and this file never surface as a
  page. Nothing written for a session goes inside `docs/`: a markdown file
  there is a candidate page before anyone lists it. `.gitbook/assets/` sits at
  the repository root because GitBook requires it there
  (`.claude/rules/images.md`).

## This host

Windows 11 with WSL (Ubuntu), and the Bash tool is Git Bash on the Windows
host. `git` and `perl` run on both sides; `node`, `npm`, `npx` and `ffmpeg`
only in WSL, node once nvm is sourced; `python` only in WSL, the Windows name
being a stub that errors. So every `npm` command goes through WSL, and a text
scan is written in perl so that it runs on the host.

- **`D:\WORK` is the only Windows path WSL mounts, at `/mnt/WORK`, not
  `/mnt/d`**: this repository is `/mnt/WORK/DeFi/TheLuckyDucksDocs` there.
  `/mnt/c` and `/mnt/d` exist with no drive behind them, so a path under
  either silently addresses nothing, and nothing on `C:` is reachable from WSL.
- **nvm does not initialise under `bash -lc`, so the command sources it:**

  ```bash
  wsl -d Ubuntu -- bash -lc '. "$HOME/.nvm/nvm.sh"; cd /mnt/WORK/DeFi/TheLuckyDucksDocs && npm run check'
  ```

- **Never write a Node version directory** (`~/.nvm/versions/node/vX.Y.Z/bin`),
  here or in a script: the set of versions changes, and the day the pinned one
  goes, the command dies with `node: command not found`, which reads as a
  broken toolchain. Sourcing nvm uses whichever version its `default` names.
- **A WSL command with logic in it goes in a script file.** What is typed after
  `wsl -d Ubuntu --` is read by other shells before the one that runs it, and
  nothing they change raises an error. Each line: typed inline: what reaches
  the command.
  - A bare `/mnt/...` argument: `C:/Program Files/Git/mnt/...`, since Git
    Bash rewrites what looks like a Unix path.
  - `$var` assigned in the same string, or a loop variable: empty, since it is
    read before the command runs.
  - `$?`: 0, after a run that failed.
  - A file list built by `files=$(...)`: commands, not arguments, so each file
    named is run as a script.

  `$HOME` above survives only because every shell that reads it has the same
  value. So one command with literal arguments is typed inline, any `/mnt/...`
  path inside the quoted string; anything with a variable, a loop, an exit
  code to read or a computed file list goes in a script file, run as
  `wsl -d Ubuntu -- bash -lc 'bash /mnt/WORK/<path>/<script>.sh'`.

- **`D:\WORK\.claude-tmp` is the scratch folder both sides reach**
  (`/mnt/WORK/.claude-tmp`, `/d/WORK/.claude-tmp/` in Git Bash), for a log or
  a one-off script. It can be emptied at any time, so no rule or document
  relies on a file there: a tool worth keeping lives in `scripts/`.

## The commands

All four run through WSL, in the form above; when and in what order is
`.claude/rules/closing-a-batch.md`.

- **`npm run check`** is the gate before a hand-over. It reads every page and
  prints one line per finding under its file. Its last line is the verdict,
  `no problems: <n> pages, <m> assets, all resolved` or
  `<n> problem(s) across <m> pages`: read that line, never an exit code. It
  covers front matter, balanced blocks, links and anchors, images and their
  pairs, `docs/SUMMARY.md`, `.gitbook.yaml` and the shot list, and fails on an
  em dash or an en dash in a page.
- **`npm run format`** is prettier, on its defaults, over every `.md`,
  `package.json` and `scripts/*.mjs`; `npm run format:check` is the read-only
  half. A batch formats only the files it touched:
  `npx prettier --write <files>`.
- **`npm run assets`** builds a labelled placeholder for any image a page
  references and the repository lacks, and lists any asset nothing
  references; `npm run assets -- --prune` deletes those. It needs ffmpeg.
- **`npm run capture`** takes real screenshots off the live site into
  `.gitbook/assets/`, overwriting only what `npm run assets` made
  (`.claude/docs/screenshots.md`, "How to capture").

## Conventions that hold in every file

Pages, rules, reference files and script comments alike.

- **No em dashes, and no spaced hyphen standing in for one.** `a - b` joining
  two clauses is the same dash with different bytes. Repunctuate: a colon
  before an explanation, a full stop between two statements, commas around an
  aside. If none fits, the sentence is doing two jobs and wants splitting.
  Wrong, then right:
  - `"The pool is split three ways - 50, 30, 20"`; `"The pool is split three ways: 50, 30, 20."`
  - `"You can cancel, but it costs - see below"`; `"You can cancel, but it costs. See below."`
  - `"Boosts stack (up to the cap - see Boosts)"`; `"Boosts stack, up to the cap. See Boosts."`

  A hyphen keeps its real jobs: compound modifiers (`on-chain`, `no-boost`,
  `opt-in`), ranges, list bullets, minus signs, and anything a player types or
  reads verbatim. The app's own copy keeps the same convention, and so does a
  reply to the owner.

- **The network is "X", never "Twitter", and what is published there is a
  "post", never a "tweet".** Not "X (Twitter)" either. The verb for resharing
  is repost, which is also what the bot's raid card counts. An identifier
  keeps the name it has.
- **Every text file is LF**, in the working tree as in the index.
  `.gitattributes` pins it (`* text=auto eol=lf`) over `core.autocrlf=true` on
  this host, and `.vscode/settings.json` sets `files.eol` for new files; images
  are binary and never touched. Verify with
  `git ls-files --eol -co --exclude-standard | grep -E "w/(crlf|mixed)"`: it
  must come back empty, and a file it names is converted (`\r\n` to `\n` only).
- **Prettier owns the layout, and a table is never aligned by hand.** Write a
  row as its cells with one space each side of a pipe and leave the widths to
  the pass: hand alignment turns a one-cell change into a diff of the whole
  table. Prettier touches presentation only, never words, and leaves `{% %}`
  blocks and raw HTML alone, which makes it safe on a tree GitBook also writes.
- **Page paths are written relative to `docs/` in every rule and reference
  file**, as a reader of the site sees them: `races/access-and-gating.md` is
  `docs/races/access-and-gating.md`. Links between pages are relative to each
  other, so the content root never appears in one.

## Which file answers what

A rule in `.claude/rules/` loads at launch without `paths:`, else when a file
matching them is read or edited. It is written once, in the file that owns it,
and every other mention points there. Each line: rule: loads; answers.

- `closing-a-batch.md`: at launch; when to scan, format and check, what to
  hand over, and when an agent may be launched
- `pages.md`: with a page; how a page is written: reader, voice, vocabulary,
  length, front matter, blocks, links
- `site-structure.md`: with a page or `.gitbook.yaml`; where a fact lives, and
  adding, moving or renaming a page without breaking a URL
- `images.md`: with a page or an asset; which image a sentence wants, its
  markup, its name and how the files are managed
- `accuracy.md`: with a page; where a figure or a mechanic comes from, and how
  to phrase one an operator can change
- `instruction-files.md`: with this file or one under `.claude/`; how rules
  and reference files are written

Nothing loads `.claude/docs/` or `IMPORTING.md`: open one when the task needs
it. Each line: file: open it when.

- `.claude/docs/OVERVIEW.md`: adding a page or a section, or unsure which page
  owns a subject or a fact.
- `.claude/docs/screenshots.md`: adding, replacing or capturing an image.
  `npm run check` reads it at that path, so it does not move.
- `.claude/docs/verifying-claims.md`: checking a figure, a permission, a
  precondition or a cost against the product repository.
- `IMPORTING.md`: connecting a space, answering a styling question, or needing
  the literal syntax of a block.
