---
description: How to write a player-facing page. Reader, reading level, vocabulary, voice, length, front matter, blocks, links and page structure. Read before editing any page.
paths:
  - "docs/**/*.md"
---

# Writing a page

Every page is read by a player mid-task, usually on a phone, usually because
something cost more than they expected or a button was disabled. Write for that
reader. They are not a developer, they did not read the previous page, and they
will stop at the first paragraph that does not answer their question.

What a page may say is three other rules: `accuracy.md` for a figure or a
mechanic, `site-structure.md` for which page states a fact, and `CLAUDE.md` for
the site describing mainnet only. Images are `images.md`.

## Who is reading: one page, two readers

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
  makes sense after reading two other pages fails the reader who arrived from
  a search result. Link for depth and for the full rule, never for
  comprehension.
- **Never make an expert wade through a tutorial.** No wallet-installation
  walkthroughs outside `introduction/getting-started.md`, no explaining what a
  blockchain is, no paragraph of encouragement before the answer.
- **Do not write down to anyone.** No "don't worry", no "it's really simple",
  no exclamation marks reassuring the reader. Someone confused by a fee is not
  reassured by being told it is easy.
- **Where depth is genuinely needed, put it at the bottom.** The answer comes
  first, the mechanism after it. `trust/fairness.md` and
  `economy/creator-fee-share.md` are the shape to match.

The test: read the page as someone who has never heard of Solana, then as
someone who runs a validator. If either one hits a sentence they cannot use, it
is the wrong sentence.

## Which words

Assume general crypto literacy is being built, not present. Wallet, token, NFT,
transaction and fee can stand alone. Anything Solana-specific or
platform-specific gets its clause.

| Do not write, unexplained      | Write                                                            |
| ------------------------------ | ---------------------------------------------------------------- |
| "your PlayerAccount PDA"       | "your player account, which the program creates for your wallet" |
| "rent-exempt"                  | "the small SOL deposit Solana requires to keep an account open"  |
| "the VRF callback"             | "when the randomness arrives on chain"                           |
| "ATA"                          | "your token account for that token"                              |
| "lamports"                     | SOL, converted. Lamports only where an explorer will show them   |
| "CPI", "discriminator", "seed" | Nothing. These belong in the program repository                  |

- `help/glossary.md` exists for terms a player meets repeatedly. An entry there
  is not a substitute for the clause on first use; it is the second copy for
  someone who forgot.
- "X" and "post" are in `CLAUDE.md`, with the punctuation rule.
- Numerals for quantities: `3 minutes`, not three minutes.
- Emoji appear in a few headings of `competition/badges.md`, where they mirror
  the badge art. Do not add them elsewhere.

## Voice

- **Second person, present tense, plain words.** "You pay the entry fee when
  you join", not "the entry fee is payable on joining".
- **Answer the question in the first sentence**, then explain. A player who
  stops reading after one line should still have the answer.
- **No developer framing.** Instruction names, account layouts, PDAs, wire
  formats, discriminators, seeds and handler names belong in the program
  repository. Say what the player gets. `trust/verifying-a-race.md` is the one
  page that deliberately goes on chain, because verifying is the thing it
  teaches, and even there each step says what it proves before it says what to
  click.
- **Never explain a limitation by blaming the implementation.** State what
  happens and what the player can do instead.
- **Describe what happens and what it costs, not where the button is.** Screens
  and dialogs change faster than a page can track.

## How long

Most pages are a few hundred words and they stay that way. The platform changes
often, and a short page is one that gets corrected rather than abandoned. When
a feature changes, find the page that mentions it and edit just that section.

A page that has grown past what someone will scan wants splitting, with a link
from the original. Adding a fourteenth section to a long page buries the
thirteen above it.

## No dates, no version stamps, no change narration

A page describes how the platform works now. It is not a changelog.

- No "recently", "currently", "as of the latest update", "this used to".
- No "new" on a feature. Everything is new to a first-time reader, and the word
  is wrong forever after the second week.
- No "coming soon". A page for what mainnet does not have yet is held, not
  hedged (`CLAUDE.md`).

When something is removed from the platform, delete the section describing it.
Do not leave a note saying it is gone.

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
- `docs/README.md` additionally carries `cover:` and `coverY:`. No other page
  does.

**No colon followed by a space anywhere in a value.** This is YAML, so
`description: The form, choice by choice: entry fee` is a second key and GitBook
refuses the whole page with "Failed to parse YAML front matter". Prettier does
not add the quotes for you, and the page is live before anyone notices.
Repunctuate instead of quoting, so the value stays safe whatever quoting style
GitBook writes back: `The form choice by choice, from entry fee to`. The same
goes for a bare ` #`, which YAML reads as a comment. `npm run check` parses every block and fails on both.

## Blocks

GitBook's own blocks are used deliberately, because they survive a round trip
through the web editor. Each one has a job; reach for the block that matches
the job, not the one that looks busiest. `IMPORTING.md` lists the literal
syntax of each.

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

- **A hint is for a consequence, not for emphasis.** A page where three
  paragraphs in four sit in a coloured box has no emphasis left.
- **Nothing a page deep-links into may live inside a block.** Tabs, steps and
  expandables carry no anchors (`site-structure.md`).
- **A stepper's step titles are `###`.** GitBook numbers the steps, so the
  titles must not.
- **No block nests inside another.** Steppers reject expandables, expandables
  reject steppers, and a hint holds text, a list or a table.
- **A mistyped block renders as literal text on a live public page.** There is
  no build to catch it. Copy the shape from a page that already uses the
  block, and never alter the syntax itself.

## Links

- A relative path to the `.md` file, with an anchor fragment for a section:
  `../nfts/boosts.md#no-boost-races`.
- Link the first mention of a concept the reader may not have, not every
  mention. A paragraph with four links is a paragraph nobody finishes.
- An anchor comes from the heading's text, so a heading other pages point at
  is not reworded without a grep (`site-structure.md`).

## The shape of a page

- `# Title` once, matching the label used in `SUMMARY.md`.
- `##` for sections. Numbered headings only for an ordered procedure whose
  steps a reader follows in order, and only where a stepper is wrong for it:
  `introduction/how-it-works.md` keeps numbers because other pages deep-link
  into `#5-finalization`.
- Prefer a table or a short list when the content is a set of cases. Fee tiers,
  join settings and payout splits are tables for a reason.
- A worked example beats a formula. Keep its arithmetic correct and state its
  inputs in it (`accuracy.md`).
