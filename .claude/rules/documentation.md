---
description: How to write a player-facing page in this bundle. Reading level, voice, length, front matter, blocks, images, punctuation and link conventions. Read before editing any .md page.
paths:
  - "**/*.md"
---

# Writing a page

**Page paths here are relative to `docs/`**, the published tree: `SUMMARY.md`
means `docs/SUMMARY.md`. Links between pages are relative to each other, so the
content root never appears in one.

Every page is read by a player mid-task, usually on a phone, usually because
something cost more than they expected or a button was disabled. Write for that
reader. They are not a developer, they did not read the previous page, and they
will stop at the first paragraph that does not answer their question.

## Reading level: one page, two readers

Every page has to work for someone whose first wallet is a week old **and** for
someone who has been in crypto for years. That is one page, not two, and not a
compromise page that half-serves both.

The rule that makes it possible: **assume no prior knowledge, but never spend a
reader's patience proving it.**

- **Explain a term in the clause where it first appears, then move on.** "The
  race vault, the account that holds everyone's entry fees until the race
  settles, pays out automatically." A newcomer just learned the term. An expert
  read six extra words and lost nothing.
- **Never send a newcomer away to understand a sentence.** A page that only
  makes sense after reading two other pages is a page that fails the reader who
  arrived from a search result. Link for depth, never for comprehension.
- **Never make an expert wade through a tutorial.** No wallet-installation
  walkthroughs outside `introduction/getting-started.md`, no explaining what a
  blockchain is, no paragraph of encouragement before the answer.
- **Do not write down to anyone.** No "don't worry", no "it's really simple",
  no exclamation marks reassuring the reader. Someone confused by a fee is not
  reassured by being told it is easy.
- **Where depth is genuinely needed, put it at the bottom.** The answer comes
  first, the mechanism after it. A reader who stops early got what they came
  for; a reader who keeps going gets the detail. `trust/fairness.md` and
  `economy/creator-fee-share.md` are the shape to match.

The test: read the page as someone who has never heard of Solana, then as
someone who runs a validator. If either one hits a sentence they cannot use, it
is the wrong sentence.

## Vocabulary

Assume general crypto literacy is being built, not present. Wallet, token, NFT,
transaction and fee can stand alone. Anything Solana-specific or platform-specific
gets its clause.

| Do not write, unexplained      | Write                                                           |
| ------------------------------ | --------------------------------------------------------------- |
| "your PlayerAccount PDA"       | "your stats account, which the program creates for your wallet" |
| "rent-exempt"                  | "the small SOL deposit Solana requires to keep an account open" |
| "the VRF callback"             | "when the randomness arrives on chain"                          |
| "ATA"                          | "your token account for that token"                             |
| "lamports"                     | SOL, converted. Lamports only where an explorer will show them  |
| "CPI", "discriminator", "seed" | Nothing. These belong in the program repository                 |

`help/glossary.md` exists for terms a player meets repeatedly. Adding a term
there is not a substitute for the clause on first use; it is the second copy for
someone who forgot.

**The platform is X, and it has no other name here.** Not Twitter, not "X
(Twitter)", and a post is a post rather than a tweet. The verb for resharing is
repost, which is also what the bot's raid card counts. Numerals for quantities
too: `3 minutes`, not three minutes.

## Voice

- **Second person, present tense.** "You pay the entry fee when you join", not
  "the entry fee is payable on joining".
- **Answer the question in the first sentence**, then explain. A player who
  stops reading after one line should still have the answer.
- **No developer framing.** Instructions, accounts, discriminators, seeds and
  handler names belong in the program repository. `trust/verifying-a-race.md` is
  the one page that deliberately goes on chain, because verifying is the thing
  it is teaching, and even there each step says what it proves before it says
  what to click.
- **Never explain a limitation by blaming the implementation.** State what
  happens and what the player can do instead.

## Length

Most pages are a few hundred words and they stay that way. The platform changes
often, and a short page is one that gets corrected rather than abandoned.

A page that has grown past what someone will scan is a page that wants
splitting, with a link from the original. Adding a fourteenth section to a long
page buries the thirteen above it.

## Front matter

Every page opens with it, and both fields are required:

```yaml
---
icon: flag-checkered
description: One sentence saying what the page answers.
---
```

- `icon` is a Font Awesome name without the `fa-` prefix. It is the sidebar
  glyph, so it has to read at 16px: prefer a plain object over a scene.
- `description` is the subtitle under the title, the subtitle on any card that
  points at the page, and the meta description a search result shows. Write it
  as a sentence a reader would recognise the page by, never as a keyword list,
  and do not repeat the title in it.

`README.md` additionally carries `cover:` and `coverY:`. No other page does.

**No colon followed by a space anywhere in a value.** This is YAML, so
`description: The form, choice by choice: entry fee` is a second key and GitBook
refuses the whole page with "Failed to parse YAML front matter". Prettier does
not add the quotes for you, and the page is live before anyone notices.
Repunctuate instead of quoting, so the value stays safe whatever quoting style
GitBook writes back: `The form choice by choice, from entry fee to`. The same
goes for a bare ` #`, which YAML reads as a comment. `npm run check` parses
every block and fails on both.

## Blocks

GitBook's blocks are used, and each one has a job. Reach for the block that
matches the job, not the one that looks busiest.

| Block                       | For                                                                    |
| --------------------------- | ---------------------------------------------------------------------- |
| `{% hint style="info" %}`   | A consequence a reader will otherwise miss                             |
| `style="warning"`           | A cost, a penalty, a window that closes, a thing that cannot be undone |
| `style="danger"`            | The reader losing something: a rental voided, a flag that never resets |
| `style="success"`           | A guarantee the platform cannot take away                              |
| `{% stepper %}`             | A procedure a reader performs in order, once                           |
| `{% tabs %}`                | Two or three parallel cases where a reader needs one of them           |
| `<details>`                 | Depth a reader does not need to finish the page                        |
| `<table data-view="cards">` | Navigation, on a page whose job is to send readers elsewhere           |
| `{% content-ref %}`         | The one page a reader most likely wants next, at the foot of a page    |
| `{% code title="..." %}`    | Something a reader copies, where the title says what it is             |
| ` ```mermaid `              | A flow or a lifecycle that a list would describe worse                 |

Rules that hold across all of them:

- **A hint is for a consequence, not for emphasis.** A page where three
  paragraphs in four sit in a coloured box has no emphasis left. If everything
  is a warning, nothing is.
- **Nothing a page deep-links into may live inside a block.** Tabs, steps and
  expandables carry no anchors, so a `##` heading another page points at stays a
  heading. `CLAUDE.md` has the grep.
- **A stepper's step titles are `###`.** GitBook numbers the steps, so the
  titles must not.
- **No block nests inside another.** Steppers reject expandables, expandables
  reject steppers, and a hint holds text, a list or a table.
- **A mistyped block renders as literal text on a live page.** There is no
  build to catch it. Copy the shape from a page that already uses it.

## Images

Files live in `.gitbook/assets/<section>/`, where the section is the page folder
that uses them, and `brand/` holds the root `README.md` artwork. Reference them
relative to the page: `../.gitbook/assets/brand/x.png` from `docs/README.md`,
`../../.gitbook/assets/races/x.png` from a page in a section. Always a figure, never
a bare `![]()`.

**A screenshot is two files on one row, always.** A desktop capture and a phone
capture, in a single `{% columns %}` block at 70/30, desktop first: GitBook
stacks them on a narrow screen. The platform is played on phones, so a
desktop-only shot describes an experience most readers do not have, and a pair
split across two rows reads as two unrelated screens. `npm run check` fails on a
half pair, on a pair outside a columns block, and on the halves in the wrong
order.

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

The desktop caption carries the meaning, the phone caption is always `On a
phone`, and the phone `alt` is the desktop `alt` plus `, on a phone`: the pair
is one thing shown twice, not two subjects. **Artwork is single**: a cover, a
card cover or an art grid is one file outside any columns block.

- **The page has to read correctly with every image stripped out.** A screenshot
  is a second copy of the answer, never the only one, because the dApp changes
  faster than the pages do and a stale screenshot is the failure mode.
- **A figure whose file is missing is a broken image on a live public page.**
  The asset lands before the page does.
- **The caption says what the reader should take from it.** "The cost breakdown
  box" is a label. "Every line you are about to pay, before you sign" is a
  caption.
- **`alt` describes the screen for someone who cannot see it**, and is not the
  caption repeated.
- Naming: `app-` for the dApp, `explorer-` for a block explorer, `nft-` for
  collection art, `tg-` for Telegram, `docs-` for artwork made for these pages,
  then `-desktop` or `-mobile` on a screenshot. `.claude/docs/screenshots.md` is
  the shot list, and a new image gets a row.
- **Never hand-manage the files in `.gitbook/assets/`. Run `npm run assets`.**
  It builds a labelled placeholder for anything a page now references and lists
  anything nothing references any more; `npm run assets -- --prune` deletes
  those. Adding a figure and forgetting the asset ships a broken image, and
  deleting a figure and forgetting the file leaves art nobody can find. Both are
  one command, and `npm run check` fails until you have run it.
- **Replace a capture through git, never through the web editor.** An upload in
  the editor lands flat in `.gitbook/assets/` and loses its folder.

## No dates, no version stamps, no change narration

A page describes how the platform works now. It is not a changelog.

- No "recently", "currently", "as of the latest update", "this used to".
- No "new" on a feature. Everything is new to a first-time reader, and the word
  is wrong forever after the second week.
- No "coming soon" without a link to somewhere that will actually say when.
  Otherwise it is a promise the page cannot keep and nobody will come back to
  remove.

When something is removed from the platform, delete the section describing it.
Do not leave a note saying it is gone.

## Punctuation

This bundle uses **no em dashes and no hyphens as sentence separators.**
Repunctuate instead of substituting one mark for the other:

| Instead of                                        | Write                                            |
| ------------------------------------------------- | ------------------------------------------------ |
| `"The pool is split three ways - 50, 30, 20"`     | `"The pool is split three ways: 50, 30, 20."`    |
| `"You can cancel, but it costs - see below"`      | `"You can cancel, but it costs. See below."`     |
| `"Boosts stack (up to the cap - see Boost NFTs)"` | `"Boosts stack, up to the cap. See Boost NFTs."` |

A colon before an explanation, a full stop between two independent statements,
commas around an aside. If none of those fit, the sentence is doing two jobs and
wants splitting.

Hyphens keep their real jobs: compound modifiers (`on-chain`, `no-boost`,
`opt-in`) and anything a player will type or read verbatim.

## Links

- Relative path to the `.md` file, with an anchor fragment for a section:
  `../nfts/boosts.md#no-boost-races`.
- **An anchor is derived from the heading text**, so rewording a heading breaks
  every deep link into it and nothing reports the break. Grep before rewording:

  ```bash
  grep -rn "<file>.md#" --include=*.md .
  ```

- Link the first mention of a concept the reader may not have, not every
  mention. A paragraph with four links is a paragraph nobody finishes.
- A new page is not done until it has a line in `SUMMARY.md`.

## Structure

- `# Title` once, matching the label used in `SUMMARY.md`.
- `##` for sections. Numbered headings only for an ordered procedure whose steps
  a reader follows in order, and only where a stepper is wrong for it:
  `introduction/how-it-works.md` keeps numbers because other pages deep-link
  into `#5-finalization`.
- Prefer a table or a short list when the content is a set of cases. Fee tiers,
  join settings and payout splits are tables for a reason.
- A worked example beats a formula. Keep the arithmetic in it correct, and see
  `accuracy.md` for where its inputs come from.
