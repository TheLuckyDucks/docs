---
description: Where a fact lives on the site, and how to add, move or rename a page or a heading without breaking a public URL. Read before stating a rule or a number on a page, and before touching SUMMARY.md or .gitbook.yaml.
paths:
  - "docs/**/*.md"
  - ".gitbook.yaml"
---

# Where things live on the site

The known failure of this site is duplication: a claim copied onto several
pages, each copy making the others look corroborated, and each going stale
separately. A wrong sentence about who a limit applies to was once on four
pages at the same time.

## Where does a fact go?

**Each fact has one home.** The page whose subject the fact is keeps the full
statement: the rule, the number, the steps. `.claude/docs/OVERVIEW.md` is the
map of which page that is.

- **Every other page keeps at most a short phrase and a link.** "A small fixed
  penalty in SOL" with a link is a phrase. The figure, the windows and the
  exceptions are the home's.
- **The glossary defines a term and links to the page that explains it.** It
  carries no figure and no rule of its own.
- **The FAQ answers in a sentence and links.** It carries no rule, no number
  and no steps of its own. A question whose answer needs more than that
  belongs on the page that owns the subject, with the FAQ pointing there.
- **A number an operator configures is described as a rule, with where the app
  shows it.** A fee rate, a period length or a count is stated on its home page
  at most, and phrased so that changing it cannot falsify the page
  (`accuracy.md`).
- **Before adding a sentence, look for the one that already says it.** Grep the
  pages for the term or the figure. If the fact has a home, the edit is a link
  to it; if the home is wrong, the edit is there and nowhere else.

A topic split across pages on purpose is listed in `OVERVIEW.md` with what
each page owns. The split is the thing to preserve: adding the full story to
whichever page you happen to be editing is how three half-answers that
disagree come about.

## How do I add a page?

1. Find the topic in the ownership table of `OVERVIEW.md`. If it is already
   owned, the change is a section on that page, not a new file.
2. If it is genuinely new, create the `.md` in the folder whose section a
   reader would look in, with a filename that reads as the topic and `icon:`
   and `description:` front matter (`pages.md`).
3. Add its line to `SUMMARY.md` under the right heading. **A page missing from
   `SUMMARY.md` is unreachable through navigation**, which is the most common
   way a new page silently does nothing. `npm run check` fails on it.
4. Add its row to the ownership table.
5. Link to it from the page a reader is most likely to be on when the question
   occurs to them. A page nothing links to is a page nothing reaches.

**Order in `SUMMARY.md` is the reading order.** The sections are sequenced so
that a new player can read top to bottom. Put a page where someone would meet
the concept, not where the alphabet puts it. A page whose section is not
obvious is usually a page trying to answer two questions.

## May I move, merge or rename a page?

**A page's path is its public URL**, so only when the table of contents is
plainly wrong for a reader: two pages on one subject, one page on two
subjects, a page under the wrong section. Never for style. Prefer fixing a
duplicate inside the pages that exist.

A page that does move, merge or change its filename takes all of these in the
same batch:

1. **A redirect from the old path**, in `.gitbook.yaml`, so the old URL keeps
   working. The key is the old path without `.md`, the value the new file, and
   both are relative to the content root:

   ```yaml
   redirects:
     races/old-name: races/new-name.md
   ```

   `root` and `structure` stay exactly as they are (`CLAUDE.md`).

2. Its line in `SUMMARY.md`.
3. Every inbound link, every `{% content-ref %}` and every asset reference.
   Links are relative paths, so grep for the old filename and fix every hit.
4. Its rows in `.claude/docs/OVERVIEW.md` and `.claude/docs/screenshots.md`.
5. A line in the hand-over naming the old path, the new one and the redirect.

## May I reword a heading?

**An anchor is derived from the heading text**, so rewording a heading breaks
every deep link into it. `npm run check` reports a dead anchor inside this
repository; a link from outside it breaks silently. Grep before editing a
heading other pages point at:

```bash
grep -rn "boosts.md#" --include=*.md docs
```

**A heading that other pages deep-link into cannot move inside a tab, a
stepper step or an expandable either**, because those are not headings and the
anchor disappears with them. `races/access-and-gating.md` keeps its gates as
`##` sections for exactly this reason, and `nfts/boosts.md#no-boost-races` is
linked from enough pages to be treated as fixed.
