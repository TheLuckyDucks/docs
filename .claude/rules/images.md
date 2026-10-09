---
description: Images on a page. Which class of image a sentence wants, the figure markup, captions and alt text, file names, and how the files in .gitbook/assets are created and replaced. Read before adding, changing or removing a figure.
paths:
  - "docs/**/*.md"
  - ".gitbook/assets/**"
  - ".claude/docs/screenshots.md"
---

# Images

Files live in `.gitbook/assets/<section>/`, where the section is the page
folder that uses them, and `brand/` holds the artwork of the welcome page. A
page references one by relative path (`CLAUDE.md`, "Layout"), always inside a
`<figure>` with an `alt` and a `<figcaption>`, never as a bare `![]()`.

`.claude/docs/screenshots.md` is the shot list: every image, what it must
show, and how to capture one. A new image gets a row there, and
`npm run check` fails on an asset without one.

## Which image does a sentence want?

- **Talking about part of a page**, a button, a combobox, a slider, a chip, a
  cost box? A **banner**: one wide image, `<stem>-banner.png`, on its own with
  no columns block. A control looks the same on a phone, so a pair of it is two
  pictures of one thing.
- **Showing a whole screen or view**, a lobby, a modal, a page, an explorer
  view? A **pair**: `<stem>-desktop.png` and `<stem>-mobile.png` in a single
  `{% columns %}` block at 70/30, desktop first, which GitBook stacks on a
  narrow screen. The platform is played on phones, so a desktop-only screen
  describes an experience most readers do not have, and a pair split over two
  rows reads as two unrelated screens.
- **Artwork** (a cover, a card cover, an art grid) is a single file outside any
  columns block.

**One banner per control, and one control per banner.** A page documenting
several options gives each one its own banner instead of a single shot of the
panel they share: `races/advanced-options.md` carries a banner per opt in, and
`races/creating-a-race.md` one per required choice. A panel shot sitting above
those is the same pixels twice, so it comes out. Where the control a section
needs already has a banner on another page, reference that file: it lives in
the folder of the page that owns the subject, and a reused file beats a second
capture of one control.

**A columns block cannot go inside a stepper step.** It does not render as a
row there, so a step wanting a pair means the page uses numbered headings
instead: `introduction/getting-started.md` and `trust/verifying-a-race.md`
both do. A banner inside a step is fine.

## The markup of a pair

```html
{% columns %} {% column width="70%" %}
<figure>
  <img
    src="../../.gitbook/assets/races/app-lobby-list-desktop.png"
    alt="What the image shows"
  />
  <figcaption><p>What it tells the reader.</p></figcaption>
</figure>
{% endcolumn %} {% column width="30%" %}
<figure>
  <img
    src="../../.gitbook/assets/races/app-lobby-list-mobile.png"
    alt="What the image shows, on a phone"
  />
  <figcaption><p>On a phone</p></figcaption>
</figure>
{% endcolumn %} {% endcolumns %}
```

The desktop caption carries the meaning, the phone caption is always
`On a phone`, and the phone `alt` is the desktop `alt` plus `, on a phone`: the
pair is one thing shown twice, not two subjects.

`npm run check` fails on a missing file, an `img` with no `alt`, a half pair,
a pair outside a columns block or split across two, halves in the wrong order,
a banner inside a columns block, and an asset no page references.

## What the words around an image owe the reader

- **The page has to read correctly with every image stripped out.** A
  screenshot is a second copy of the answer, never the only one, because the
  dApp changes faster than the pages do and a stale screenshot is the failure
  mode. A page that says "click the button shown above" has moved the answer
  into an asset that will go stale.
- **The caption says what the reader should take from it.** "The cost breakdown
  box" is a label. "Every line you are about to pay, before you sign" is a
  caption. A caption that has become false is corrected like any other
  sentence, and the screenshot is listed for recapture.
- **`alt` describes the screen for someone who cannot see it**, and is not the
  caption repeated.

## File names

`app-` for the dApp, `explorer-` for a block explorer, `nft-` for collection
art, `tg-` for Telegram, `docs-` for artwork made for these pages, then
`-banner`, or `-desktop` and `-mobile`, on a screenshot.

## Creating, removing and replacing the files

- **Never hand-manage the files in `.gitbook/assets/`. Run `npm run assets`.**
  It builds a labelled placeholder for anything a page now references and lists
  anything nothing references any more; `npm run assets -- --prune` deletes
  those. Adding a figure and forgetting the asset ships a broken image on a
  live public page, and deleting a figure and forgetting the file leaves art
  nobody can find. `npm run check` fails until the command has been run, so the
  asset lands before the page does.
- **Replace a capture through git, never through the web editor.** An upload in
  the editor lands flat in `.gitbook/assets/` and loses its folder, so the
  layout decays one file at a time.
