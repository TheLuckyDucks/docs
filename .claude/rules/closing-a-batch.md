# Closing a batch, and launching an agent

Everything this repository runs is light: a text scan, a prettier pass and a
structural checker, seconds each, with no compiler and no test suite behind
them. So what costs here is not a run, it is running one per edit and reading
more of it than decides anything.

**A rule about how to run or check something lives in these files, never only
in one session's private notes.** `CLAUDE.md` has the host and the commands,
and this file has the order. Another session, or an agent, reads the
repository and nothing else, so a rule kept anywhere else has to be retold by
hand every time.

## When do I run anything?

**A run of small requests is ONE batch.** While requests are still arriving,
only edit: nothing is scanned, formatted or checked per request or per file.
Write each edit to the conventions as it is made. When the edits have stopped,
once, in this order:

1. **The convention scan** over the files the batch touched.
2. **The format pass** over the same files.
3. **The check**, then the fixes it names, then the check again.

The scan goes first because a fix it asks for can change a line's length, and
the formatter should see the line once. The check goes last because it is the
gate on the tree that gets handed over.

## The convention scan

It looks for what neither prettier nor the checker decides. Perl runs on the
Windows host, so this needs no WSL:

```bash
perl -ne 'print "$ARGV:$.: $_" if /\xE2\x80\x94|\xE2\x80\x93|\S - \S|[Tt]witter|[Tt]weet|\r/; close ARGV if eof' <the files the batch touched>
```

| A hit on                        | Means                                                                    |
| ------------------------------- | ------------------------------------------------------------------------ |
| An em dash or an en dash        | Repunctuate (`CLAUDE.md`). The checker fails on either in a page as well |
| A hyphen with a space each side | A dash in disguise, unless it is a minus sign in arithmetic              |
| The words Twitter or tweet      | "X" and "post", unless the line is the rule that forbids them            |
| A carriage return               | A CRLF file. Convert it to LF, nothing else                              |

A hit is read and fixed by hand, and only that file is scanned again.

## The format pass

```bash
wsl -d Ubuntu -- bash -lc '. "$HOME/.nvm/nvm.sh"; cd /mnt/WORK/DeFi/TheLuckyDucksDocs && npx prettier --write docs/races/race-modes.md docs/help/faq.md'
```

- **Name the files the batch touched**, as literal words. `npm run format`
  rewrites every file its glob matches, and a file someone else left
  unformatted lands in the diff and buries the change. Reach for it only when
  the sweep is the task.
- **`--check` is for asking, `--write` is for fixing.** A `--check` that names
  files outside the batch reports state that was already there, and is not the
  batch's to clean up.
- Formatting cannot change a word, so it has no bearing on whether the check
  passes. What it decides is which tree is handed over, which is why it comes
  before the check and never after the hand-over.

## The check

`npm run check`, in the form `CLAUDE.md` gives. Its last line is the verdict,
and each finding above it names its file. Fix what it names and run it again
until the last line reads `no problems`.

**Never report a check as passing that you have not seen pass**, and never
report a fact as verified because the check passed: the check reads structure
only (`accuracy.md`).

## What do I hand over?

The tree, uncommitted, and a report the owner can review before running git:

- what changed, page by page, and why;
- **which pages describe behaviour mainnet does not have yet**, so that they
  are held rather than pushed (`CLAUDE.md`, "Publishing");
- every page that moved or was renamed, with its redirect;
- any figure that could not be verified, said as such;
- the check's verdict line.

## May I launch an agent?

**An agent is launched only on the owner's word.** The owner's rule: "agents
usage consumes a lot of tokens: limit its usage: ask user before launching
agent". An agent starts with none of the session's context and rebuilds it by
reading, so even a small task costs a large number of tokens, several at once
multiply that, and the owner pays for every one.

- **Ask first.** Say what the agent would do, why the session cannot
  reasonably do it itself and roughly how large it is, and wait for a yes.
  Resuming a finished agent with new work counts as launching one; a message to
  an agent that is already running does not.
- **Default to no agent.** A handful of tool calls, a lookup whose target is
  known, a small edit on a page already read or a check that can be run inline
  is the session's own work. An agent is for work that is large, independent of
  the session's thread, and worth the cost of a fresh reader.
- **When one is approved**, name the pages it owns so that no two agents edit
  one file, point its brief at these rule files instead of restating them, and
  say that it never commits or pushes.
