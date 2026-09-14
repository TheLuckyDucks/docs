# Content map

> Which page owns which topic, which topics are deliberately split across
> several pages, and where a new page belongs. Read this before adding a
> section, so it lands on the page that already owns the subject instead of
> becoming a fourth partial answer.

`../rules/documentation.md` is how to write a page. `../rules/accuracy.md` is
how to check a figure. This file is the map, and it repeats neither.

**Page paths here are relative to `docs/`**, the published tree.

---

## Reading order

`SUMMARY.md` is the sidebar and the intended reading order, not an alphabetical
index. The sections are sequenced so a new player can go top to bottom:
orientation, then the thing they came to do, then the things that modify it,
then the money, then the trust story, then reference.

| Section            | Answers                                                     |
| ------------------ | ----------------------------------------------------------- |
| Getting Started    | What is this, how does one race go, what do I do first      |
| Races              | How do I create or join one, and what are all these options |
| NFTs               | What do the four collections change                         |
| Competition        | Tournaments, teams, rematches, badges                       |
| Economy            | What does it cost, what do I get back                       |
| Trust and Fairness | Why should I believe the result                             |
| Help               | FAQ, glossary, bot, where to find us                        |

A page whose section is not obvious is usually a page trying to answer two
questions.

## Page ownership

The page in the right column is the one that carries the full treatment. Every
other mention links to it rather than restating it.

| Topic                                                        | Owned by                              |
| ------------------------------------------------------------ | ------------------------------------- |
| What the platform is, and who runs it                        | `introduction/what-is-lucky-ducks.md` |
| The lifecycle of one race, start to finish                   | `introduction/how-it-works.md`        |
| First-time wallet to first race                              | `introduction/getting-started.md`     |
| The create-a-race form and its choices                       | `races/creating-a-race.md`            |
| Joining, the lobby, watching the race                        | `races/joining-and-playing.md`        |
| Signing once instead of once per action                      | `races/delegated-play.md`             |
| WTA and Podium Split, and ties                               | `races/race-modes.md`                 |
| Who may join: the five join settings, gates, allowlists      | `races/access-and-gating.md`          |
| Everything optional at creation                              | `races/advanced-options.md`           |
| Hosting without playing, cancelling, expiry                  | `races/hosting-and-cancelling.md`     |
| The daily race allowance                                     | `races/daily-races.md`                |
| The four collections at a glance                             | `nfts/README.md`                      |
| Runner, and what it unlocks                                  | `nfts/runners.md`                     |
| Boost mechanics, stacking, fairness                          | `nfts/boosts.md`                      |
| Tracks and custom scenery                                    | `nfts/tracks.md`                      |
| Cosmetics and avatars                                        | `nfts/cosmetics.md`                   |
| Mystery Boxes                                                | `nfts/mystery-boxes.md`               |
| Tournaments, rule sets, standings                            | `competition/tournaments.md`          |
| Teams, membership, standings                                 | `competition/teams.md`                |
| Rematch proposals and chains                                 | `competition/rematches.md`            |
| Badges and XP milestones                                     | `competition/badges.md`               |
| Entry fee, platform fee tiers, prize pool                    | `economy/fees-and-prizes.md`          |
| The pre-funded balance, deposits, withdrawals, payout target | `economy/player-vault.md`             |
| Creator fee share                                            | `economy/creator-fee-share.md`        |
| Withdrawals, refunds, rent, surcharges                       | `economy/refunds-and-rent.md`         |
| Token races, supported programs                              | `economy/spl-tokens.md`               |
| ORAO VRF and how a seed becomes a winner                     | `trust/fairness.md`                   |
| Checking a race yourself in an explorer                      | `trust/verifying-a-race.md`           |
| Player profiles and verification badges                      | `trust/verification.md`               |
| Common questions                                             | `help/faq.md`                         |
| Terms a player will meet                                     | `help/glossary.md`                    |
| The Telegram bot and raids                                   | `help/telegram-bot.md`                |
| Where to reach the team                                      | `help/social-networks.md`             |

## Topics that live on more than one page

These are split on purpose. The split is the thing to preserve: each page
answers its own question and links out for the rest. Adding the full story to
whichever page you happen to be editing is how the bundle drifts into three
half-answers that disagree.

**Money coming back.** Three pages touch it and they are not interchangeable.
`races/race-modes.md` says what happens to the pool when a race does not run.
`races/hosting-and-cancelling.md` is the creator's view: cancelling, expiry, and
what it costs them. `economy/refunds-and-rent.md` is the full accounting,
including rent and the underfilled-start surcharge, and it is the one that owns
the figures.

**What a Runner NFT does.** `nfts/runners.md` owns the collection and the full
list of what holding one unlocks. `races/access-and-gating.md` owns the hosting
gate as a property of the create form. `races/daily-races.md` owns the allowance
it raises. `economy/creator-fee-share.md` owns the revenue it enables.

**Gating.** `races/access-and-gating.md` owns all five join settings and every
gate type. `nfts/runners.md`, `nfts/boosts.md` and `trust/verification.md` each
describe what a player needs to pass one, from their own side.

**Boost fairness.** `nfts/boosts.md` owns both the mechanic and the argument
that it is fair, including no-boost races. Several pages deep-link into
`#no-boost-races`, so that heading is effectively an API. Grep before rewording
it.

**The vault and delegation are two pages on purpose.**
`economy/player-vault.md` owns the money: what the balance is, depositing,
withdrawing, and the payout target that decides where winnings land.
`races/delegated-play.md` owns the permission: what may be signed for you, what
never can be, and how to revoke. They depend on each other, because delegation
spends from the vault, so each links to the other once and neither restates it.

The word "vault" carries two meanings on this site. A **race vault** holds one
race's entry fees and closes when the race ends. A **player vault** is a
persistent balance owned by one player. `help/glossary.md` distinguishes them
and every page that could be read either way must say which it means.

**Where money lands.** Three pages state it and only one owns it.
`economy/refunds-and-rent.md` owns the payout target's effect on refunds and
rent, `economy/player-vault.md` owns the setting itself, and
`races/joining-and-playing.md` mentions it in one clause on the claim step. Keep
that proportion.

**Verification, which is two unrelated things.** `trust/verification.md` is
about a player proving who they are and earning a profile badge.
`trust/verifying-a-race.md` is about anyone checking a race result on chain.
Their filenames are one word apart and they are the pair most likely to be
confused, cross-linked wrongly, or edited into each other. Check which one you
are in before adding a section about "verification".

## What lives outside this bundle

Some of what a player sees is not described here, and should not be pulled in.

- **The dApp interface itself.** Screens, buttons and wallet dialogs change
  faster than a page can track. Describe what happens and what it costs, not
  where the button is.

  Screenshots are the deliberate exception, and they do not change that rule:
  an image shows the reader what a screen looks like, while the prose still has
  to carry the answer on its own. A page that says "click the button shown
  above" has moved the answer into an asset that will go stale. The shot list
  and the re-capture procedure are `screenshots.md`.

- **Anything off chain.** XP, leaderboards, badge awards, tournament standings
  and the Telegram bot are backend features. They can change without a program
  release, so a page describing them precisely will go stale first.
- **Developer-facing material.** Instruction names, account layouts and seeds
  belong in the program repository. `trust/verifying-a-race.md` is the single
  deliberate exception, because going on chain is exactly what it teaches.

## Adding a page

1. Find the topic in the ownership table. If it is already owned, the change is
   a section on that page, not a new file.
2. If it is genuinely new, put the file in the folder whose section a reader
   would look in, and give it a filename that reads as the topic.
3. Add its line to `SUMMARY.md`, positioned where a reader meets the concept in
   the top-to-bottom order.
4. Add a row to the ownership table above.
5. Link to it from the page a reader is most likely to be on when the question
   occurs to them. A page nothing links to is a page nothing reaches.
