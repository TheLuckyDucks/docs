---
description: How to write a player-facing page in this bundle. Reading level, voice, length, punctuation and link conventions. Read before editing any .md page.
paths:
  - "**/*.md"
---

# Writing a page

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
  a reader follows in order (`introduction/how-it-works.md`,
  `trust/verifying-a-race.md`).
- Prefer a table or a short list when the content is a set of cases. Fee tiers,
  join settings and payout splits are tables for a reason.
- A worked example beats a formula. Keep the arithmetic in it correct, and see
  `accuracy.md` for where its inputs come from.
