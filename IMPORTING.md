# Importing into GitBook

Internal notes on how this bundle reaches gitbook.com, what the platform will and will not render, and what the site plan allows. Not published, and not listed in `SUMMARY.md`.

## How this repository becomes the site

The space is backed by this repository over GitBook's Git Sync, on one branch, in both directions. GitBook reads two things from the tree:

- `.gitbook.yaml`, which sets the space root, the first page (`README.md`) and the navigation file (`SUMMARY.md`).
- `SUMMARY.md`, which is the sidebar. A page not listed there is not navigable.

To point a new space at this repository: create the space, choose **Synchronize with Git provider**, pick the provider and repository, and select the branch. GitBook reads `.gitbook.yaml` on the first sync and the pages render immediately.

## Custom CSS is not possible, on any plan

GitBook does not accept custom code of any kind in a site: no CSS, no HTML, no JavaScript. This is a platform limitation and not a plan restriction, so no upgrade unlocks it. Site appearance is whatever the customization panel offers.

The site runs on the **Basic Site** plan, which is GitBook's free site tier. That means:

- **Available**: the block editor and Git Sync, basic customization (site theme, colour, light and dark default), search, and preview deployments for a branch.
- **Not available**: custom domain, custom fonts, custom logo, footer customization, the bold and gradient themes, semantic and code-block colours, PDF export, AI search, adaptive content, authenticated access, site sections.

Everything that shapes how a page looks therefore has to come from the content itself: page icons and descriptions in front matter, and GitBook's own blocks.

## What the pages use

GitBook block syntax is used deliberately, so every block here has to survive a round trip through the web editor:

| Block             | Syntax                                                         |
| ----------------- | -------------------------------------------------------------- |
| Front matter      | `icon:`, `description:`, and `cover:`/`coverY:` on `README.md` |
| Hint              | `{% hint style="info\|success\|warning\|danger" %}`            |
| Stepper           | `{% stepper %}` / `{% step %}` with an `###` title per step    |
| Tabs              | `{% tabs %}` / `{% tab title="..." %}`                         |
| Expandable        | `<details>` with a `<summary>`                                 |
| Cards             | `<table data-view="cards">` with a `data-card-target` column   |
| Page link card    | `{% content-ref url="..." %}`                                  |
| Code with a title | `{% code title="..." %}` around a fenced block                 |
| Diagram           | A fenced ` ```mermaid ` block                                  |
| Columns           | `{% columns %}` / `{% column width="70%" %}`                   |
| Image             | `<figure><img src="..." alt="..."><figcaption>`                |

Page icons are Font Awesome names without the `fa-` prefix.

## Images

Image files live in `.gitbook/assets/<section>/`, one folder per page folder plus `brand/` for the root artwork. Reference them by relative path from the page: `.gitbook/assets/brand/x.png` from `README.md`, `../.gitbook/assets/races/x.png` from a page in a folder.

Every screenshot is two files, `-desktop.png` and `-mobile.png`, shown as one row by a `{% columns %}` block at 70/30. Artwork is a single file.

Two things to know about the editor. GitBook writes anything uploaded through it **flat** into `.gitbook/assets/`, so replacing a capture there breaks the folder layout for that file; replace captures through git. And a `<figure>` whose file is missing renders as a broken image on the live site, so the asset has to land before the page does.

`.claude/docs/screenshots.md` is the shot list: every image the pages reference, what it should show, the capture conventions, and the commands that find missing files, orphans and half-finished pairs.

## Editing

Every page is a markdown file, one file per page. To add one:

1. Create the `.md` file in the folder whose section a reader would look in.
2. Give it `icon:` and `description:` front matter.
3. Add its line to `SUMMARY.md` under the right heading.
4. Commit and push, or make the same change in the editor and let the sync bring it back.

The docs are intentionally short. Most pages are 200-400 words. The platform changes often; small targeted updates beat encyclopedic walls. When a feature changes, find the page that mentions it (search the repo for the keyword) and edit just that section.

## Avoiding hyphens and em-dashes

By convention, this bundle uses periods and commas instead of em-dashes (`—`) or hyphens (`-`) as in-sentence separators. Keep the convention if you add new pages; it matches the rest of the app's copy.
