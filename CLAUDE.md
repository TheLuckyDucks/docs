# CLAUDE.md

The map of the Lucky Ducks player documentation repository. Read at session
start. The rules themselves are in `.claude/rules/`, and
"Which file answers what" below says which one to open.

## What this is

The source of the player documentation site for theluckyducks.com: a GitBook
space backed by this repository. Markdown, one file per page, with
`docs/SUMMARY.md` as the sidebar.

**The pages are the product, and their reader is a player, not a developer**:
someone who has connected a wallet once and wants to know what a button costs,
why their refund was short, or whether a Runner NFT is required for the thing
they are trying to do.

**The only code here is tooling**: `scripts/check-pages.mjs`,
`scripts/sync-assets.mjs` and `scripts/capture-shots.mjs`, behind the commands
below. The checker verifies shape and cannot verify a fact, so **nothing
verifies a claim on a page**. Every fee, limit, percentage and timeout is a
value in a deployed Solana program or its on-chain config, decided in the
product repository and never here. A wrong number on a money page is the
highest-cost defect this repository can ship, because a player acts on it:
`.claude/rules/accuracy.md` says where each figure comes from.

## Publishing, and what a session never does

**Pushing this repository publishes the site, and the sync is two-way.** A
commit pushed to this branch is pulled into the live space, and an edit made in
the GitBook web editor is committed here by GitBook itself
(`GITBOOK-<n>: No subject`).

- **A session never commits and never pushes.** Everything it does stays in the
  working tree. It runs the check, says what it changed, and the owner reviews
  and runs git. Here in particular a push cannot be reviewed afterwards: it
  puts every page in the tree in front of players at once, a page written for
  behaviour mainnet does not have yet included.
- **The site describes MAINNET only.** Nothing about devnet, beta or test
  builds, and no "coming soon". A page for behaviour that is not on mainnet yet
  is written with the change and HELD until the deploy, because a player who
  reads about a gate or a screen mainnet does not have is misled exactly as by
  a stale page. A hand-over names the pages that are held.
- **Change the smallest span that fixes the problem**, never a whole page for
  one sentence. A local edit that is not pushed yet races anyone working in the
  web editor, and a full-file rewrite turns a one-line correction into a
  conflict against every concurrent edit. So the owner pulls before a batch
  starts, and a finished batch is handed over at once instead of sitting.
- **GitBook normalizes markdown when it writes back.** Hand-tuned formatting
  survives only until someone touches the page in the editor, so spend no
  effort on formatting that carries no meaning, and do not read a
  formatting-only diff from GitBook as damage.
- **A site takes no custom code: no CSS, no HTML, no JavaScript, on any plan.**
  A styling request cannot be answered with a stylesheet. Everything that
  shapes a page comes from its content: the page icon, the page description
  and GitBook's own blocks. What the plan allows is in `IMPORTING.md`, and
  anything it does allow is set in the GitBook customization panel, not here.
- **`.gitbook.yaml` decides what GitBook reads**, and `npm run check` holds it:
  `root: ./docs`, with the readme and the summary relative to that root.
  Changing `root` or `structure` re-points the whole site, so neither is
  touched. The one edit it takes is a `redirects:` entry when a page moves
  (`.claude/rules/site-structure.md`). Prettier is not extended to it.

## Layout

**`docs/` is the published tree and nothing else is.** GitBook reads that
folder and ignores everything beside it, so tooling, rules and this file cannot
surface as a page. **Nothing written for a session goes inside `docs/`**: a
markdown file there is a candidate page before anyone lists it. The rules sit
under `.claude/`, a dot-directory GitBook would skip even if the content root
moved, and this file sits at the root because that is where it is loaded from.

| Path               | Holds                                                                                                          |
| ------------------ | -------------------------------------------------------------------------------------------------------------- |
| `docs/README.md`   | The welcome page, and the space root                                                                           |
| `docs/SUMMARY.md`  | The sidebar. A page not listed here is not navigable                                                           |
| `docs/<section>/`  | The pages: `introduction`, `races`, `nfts`, `competition`, `economy`, `trust`, `help`                          |
| `.gitbook/assets/` | Every image, one folder per section plus `brand/`. **Repository root, not `docs/`**: GitBook requires it there |
| `.gitbook.yaml`    | GitBook config: the content root, the readme and summary, and redirects                                        |
| `scripts/`         | The three tools. The only code                                                                                 |
| `package.json`     | Tooling only: `prettier`, `yaml`, `playwright-core`. Nothing here is published                                 |
| `IMPORTING.md`     | GitBook reference: connecting a space, the plan, the literal block syntax                                      |
| `.claude/rules/`   | The rules, loaded by the tool                                                                                  |
| `.claude/docs/`    | Reference material, opened on demand                                                                           |

Because the asset folder stays at the root, a page climbs out of the content
tree to reach an image: `../../.gitbook/assets/<section>/x.png` from a page in
a section, `../.gitbook/assets/brand/x.png` from `docs/README.md`.

**Page paths are written relative to `docs/` in every rule and reference
file**, because that is how a reader of the site sees them:
`races/access-and-gating.md` means `docs/races/access-and-gating.md`. Links
between pages are relative to each other, so the content root never appears in
one.

## This host

**Windows 11 with WSL (Ubuntu): two shells, and node exists in only one.**

| Tool                 | Windows host (the Bash tool is Git Bash) | WSL                      |
| -------------------- | ---------------------------------------- | ------------------------ |
| `git`, `perl`        | yes                                      | yes                      |
| `node`, `npm`, `npx` | **no**                                   | yes, once nvm is sourced |
| `ffmpeg`             | no                                       | yes                      |
| `python`             | no (the name is a stub that errors)      | yes                      |

So every `npm` command goes through WSL, and a text scan is written in perl so
that it runs on the host.

| Windows                          | WSL                                |
| -------------------------------- | ---------------------------------- |
| `D:\WORK`                        | `/mnt/WORK`                        |
| `D:\WORK\DeFi\TheLuckyDucksDocs` | `/mnt/WORK/DeFi/TheLuckyDucksDocs` |
| `D:\WORK\.claude-tmp`            | `/mnt/WORK/.claude-tmp`            |

**`D:\WORK` is the only Windows path WSL mounts, and not at `/mnt/d`.**
`/mnt/c` and `/mnt/d` exist with no drive behind them, so a path under either
silently addresses nothing, and nothing on `C:` can be read or written from
WSL.

**nvm does not initialise under `bash -lc`, so the command sources it:**

```bash
wsl -d Ubuntu -- bash -lc '. "$HOME/.nvm/nvm.sh"; cd /mnt/WORK/DeFi/TheLuckyDucksDocs && npm run check'
```

**Never write a Node version directory** (`~/.nvm/versions/node/vX.Y.Z/bin`),
here or in a script. More than one version is installed and the set changes:
the day the pinned one is upgraded away, the command dies with
`node: command not found`, which reads as a broken toolchain rather than as a
stale string. Sourcing nvm uses whichever version its `default` alias names.

**A WSL command with logic in it goes in a script file.** What is typed after
`wsl -d Ubuntu --` is read by other shells before the one that runs it, and
none of what they change raises an error:

| Typed inline                                           | What reaches the command                                                      |
| ------------------------------------------------------ | ----------------------------------------------------------------------------- |
| A bare `/mnt/...` argument                             | `C:/Program Files/Git/mnt/...`: Git Bash rewrites what looks like a Unix path |
| `$var` assigned in the same string, or a loop variable | Empty: it is read before the command runs                                     |
| `$?`                                                   | 0, after a run that failed                                                    |
| A file list built by `files=$(...)`                    | Commands, not arguments: each file named is run as a script                   |

`$HOME` in the command above survives only because it has the same value in
every shell that reads it. So one command with literal arguments is typed
inline, with any `/mnt/...` path inside the quoted string, and anything with a
variable, a loop, an exit code to read or a computed list of files is written
to a script file and run as
`wsl -d Ubuntu -- bash -lc 'bash /mnt/WORK/<path>/<script>.sh'`.

**`D:\WORK\.claude-tmp` is the scratch folder both sides reach, and it can be
emptied at any time.** A log or a one-off script goes there; Git Bash reads it
at `/d/WORK/.claude-tmp/`. No rule depends on a tool there and no document
names a file there as something that exists: a tool worth keeping lives in this
repository's `scripts/`.

## The commands

All four run through WSL, in the form above.

- **`npm run check`** is the gate before a hand-over. It reads every page and
  prints one line per finding under the file it is in. **Its last line is the
  verdict**: `no problems: <n> pages, <m> assets, all resolved`, or
  `<n> problem(s) across <m> pages`. Read that line, never an exit code. It
  covers front matter, balanced blocks, links and anchors, images and their
  pairs, `docs/SUMMARY.md`, `.gitbook.yaml` and the shot list, and it fails on
  an em dash or an en dash in a page.
- **`npm run format`** is prettier, on its defaults, over every `.md`,
  `package.json` and `scripts/*.mjs`; `npm run format:check` is the read-only
  half. A batch formats only the files it touched:
  `npx prettier --write <files>`.
- **`npm run assets`** builds a labelled placeholder for any image a page
  references and the repository lacks, and lists any asset nothing references;
  `npm run assets -- --prune` deletes those. It needs ffmpeg.
- **`npm run capture`** takes real screenshots off the live site into
  `.gitbook/assets/`, driving a Chrome started with
  `--remote-debugging-port=9222`. It never creates a file, only overwrites one
  `npm run assets` already made, and `npm run capture -- --list` says what it
  can take. On this host it needs `networkingMode=mirrored` in `.wslconfig`,
  because Chrome binds its debug port to loopback and WSL is otherwise a
  separate network.

When each one runs, and in what order, is `.claude/rules/closing-a-batch.md`.

## Conventions that hold in every file

Pages, rules, reference files and script comments alike.

- **No em dashes, and no spaced hyphen standing in for one.** `a - b` joining
  two clauses is the same dash with different bytes. Repunctuate instead: a
  colon before an explanation, a full stop between two independent statements,
  commas around an aside. If none of those fit, the sentence is doing two jobs
  and wants splitting.

  | Instead of                                    | Write                                         |
  | --------------------------------------------- | --------------------------------------------- |
  | `"The pool is split three ways - 50, 30, 20"` | `"The pool is split three ways: 50, 30, 20."` |
  | `"You can cancel, but it costs - see below"`  | `"You can cancel, but it costs. See below."`  |
  | `"Boosts stack (up to the cap - see Boosts)"` | `"Boosts stack, up to the cap. See Boosts."`  |

  A hyphen keeps its real jobs: compound modifiers (`on-chain`, `no-boost`,
  `opt-in`), ranges, list bullets, minus signs, and anything a player types or
  reads verbatim. The app's own copy keeps the same convention, and so does a
  reply to the owner.

- **The network is "X", never "Twitter", and what is published there is a
  "post", never a "tweet".** Not "X (Twitter)" either. The verb for resharing
  is repost, which is also what the bot's raid card counts. An identifier keeps
  the name it has.
- **Every text file is LF**, in the working tree as in the index: pages,
  scripts, JSON, YAML. `.gitattributes` pins it (`* text=auto eol=lf`), which
  overrides `core.autocrlf=true` on this host, and `.vscode/settings.json` sets
  `files.eol` so the editor creates a new file the same way. Images are binary
  and never touched. Verify with
  `git ls-files --eol -co --exclude-standard | grep -E "w/(crlf|mixed)"`, which
  must come back empty; when it names a file, convert that file (`\r\n` to
  `\n`, nothing else).
- **Prettier owns the layout, and a table is never aligned by hand.** Write a
  row as its cells with one space each side of a pipe and leave the widths to
  the pass: aligning by hand turns a one-cell change into a diff of the whole
  table. Prettier touches presentation only, never words, and leaves `{% %}`
  blocks and raw HTML alone, which is what makes it safe on a tree GitBook also
  writes to.

## Which file answers what

**Every `.md` under `.claude/rules/` is loaded by the tool**: at launch when it
has no `paths:` front matter, and when a file matching its `paths:` is read or
edited when it has one. So a rule is written once, in the file below that owns
it, and every other mention is a pointer.

| Rule file                            | Loads                                  | Answers                                                                               |
| ------------------------------------ | -------------------------------------- | ------------------------------------------------------------------------------------- |
| `.claude/rules/closing-a-batch.md`   | At launch                              | When to scan, format and check, what to hand over, and when an agent may be launched  |
| `.claude/rules/pages.md`             | With a page                            | How a page is written: reader, voice, vocabulary, length, front matter, blocks, links |
| `.claude/rules/site-structure.md`    | With a page or `.gitbook.yaml`         | Where a fact lives, and adding, moving or renaming a page without breaking a URL      |
| `.claude/rules/images.md`            | With a page or an asset                | Which image a sentence wants, its markup, its name and how the files are managed      |
| `.claude/rules/accuracy.md`          | With a page                            | Where a figure or a mechanic comes from, and how to phrase one an operator can change |
| `.claude/rules/instruction-files.md` | With this file or one under `.claude/` | How rules and reference files are written                                             |

**`.claude/docs/` is not loaded by the tool.** It holds reference material,
opened when the task needs it:

| Reference file                     | Open it when                                                                                        |
| ---------------------------------- | --------------------------------------------------------------------------------------------------- |
| `.claude/docs/OVERVIEW.md`         | Adding a page or a section, or unsure which page owns a subject or a fact                           |
| `.claude/docs/screenshots.md`      | Adding, replacing or capturing an image. `npm run check` reads it at that path, so it does not move |
| `.claude/docs/verifying-claims.md` | Checking a figure, a permission, a precondition or a cost against the product repository            |
| `IMPORTING.md`                     | Connecting a space, answering a styling question, or needing the literal syntax of a block          |
