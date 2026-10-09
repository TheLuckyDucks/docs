# GitBook reference

How this repository reaches gitbook.com, what the site plan allows, and the
literal syntax of every block the pages use. Reference material, opened on
demand: not published, not listed in `SUMMARY.md`, and not a rule file. What a
session may and may not do with the sync is in `CLAUDE.md`, "Publishing".

## Connecting a space to this repository

The space is backed by this repository over GitBook's Git Sync, on one branch,
in both directions. GitBook reads `.gitbook.yaml` at the repository root for
the content root (`root: ./docs`), the first page and the navigation file, and
publishes only what is under that root. `.gitbook/assets/` is the one
exception to the layout: GitBook requires it at the repository root.

To point a new space at this repository: create the space, choose
**Synchronize with Git provider**, pick the provider and the repository, and
select the branch. GitBook reads `.gitbook.yaml` on the first sync and the
pages render immediately.

## What the plan allows

The site runs on the **Basic Site** plan, GitBook's free site tier.

- **Available**: the block editor and Git Sync, basic customization (site
  theme, colour, light and dark default), search, and preview deployments for a
  branch.
- **Not available**: custom domain, custom fonts, custom logo, footer
  customization, the bold and gradient themes, semantic and code-block
  colours, PDF export, AI search, adaptive content, authenticated access, site
  sections.

Custom code is a different matter: no plan accepts any, so no upgrade unlocks
a stylesheet (`CLAUDE.md`, "Publishing").

## The literal syntax of each block

Which block does which job is `.claude/rules/pages.md`. This is how each one is
written, and every one of them survives a round trip through the web editor:

| Block             | Syntax                                                              |
| ----------------- | ------------------------------------------------------------------- |
| Front matter      | `icon:`, `description:`, and `cover:`/`coverY:` on `docs/README.md` |
| Hint              | `{% hint style="info\|success\|warning\|danger" %}`                 |
| Stepper           | `{% stepper %}` / `{% step %}` with an `###` title per step         |
| Tabs              | `{% tabs %}` / `{% tab title="..." %}`                              |
| Expandable        | `<details>` with a `<summary>`                                      |
| Cards             | `<table data-view="cards">` with a `data-card-target` column        |
| Page link card    | `{% content-ref url="..." %}`                                       |
| Code with a title | `{% code title="..." %}` around a fenced block                      |
| Diagram           | A fenced ` ```mermaid ` block                                       |
| Columns           | `{% columns %}` / `{% column width="70%" %}`                        |
| Image             | `<figure><img src="..." alt="..."><figcaption>`                     |

Page icons are Font Awesome names without the `fa-` prefix. A card cover is
linked from a hidden `data-card-cover` column rather than shown in a figure.

## What the web editor does to images

GitBook writes anything uploaded through the editor **flat** into
`.gitbook/assets/`, which is why a capture is replaced through git
(`.claude/rules/images.md`).
