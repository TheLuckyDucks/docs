# Content map

> Which page owns which topic, which page is the home of which fact, and which
> topics are deliberately split across several pages. Open it before adding a
> section or a sentence, so it lands on the page that already owns the subject
> instead of becoming a fourth partial answer.

`.claude/rules/site-structure.md` is the rule this map serves: each fact has
one home, and every other page keeps a phrase and a link. This file is the map,
and it repeats no rule.

**Page paths here are relative to `docs/`**, the published tree.

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
| Competition        | Tournaments, teams, rematches, badges, the jackpot          |
| Economy            | What does it cost, what do I get back                       |
| Trust and Fairness | Why should I believe the result                             |
| Help               | FAQ, glossary, bot, where to find us                        |

## Which page owns a topic

The page in the right column carries the full treatment. Every other mention
links to it rather than restating it.

| Topic                                                                     | Owned by                              |
| ------------------------------------------------------------------------- | ------------------------------------- |
| What the platform is, and who runs it                                     | `introduction/what-is-lucky-ducks.md` |
| The lifecycle of one race, start to finish                                | `introduction/how-it-works.md`        |
| First-time wallet to first race                                           | `introduction/getting-started.md`     |
| The create-a-race form and its required choices                           | `races/creating-a-race.md`            |
| Joining, the lobby, watching the race                                     | `races/joining-and-playing.md`        |
| WTA and Podium Split, and ties                                            | `races/race-modes.md`                 |
| Who may join: the five join settings, gates, allowlists                   | `races/access-and-gating.md`          |
| Everything optional at creation                                           | `races/advanced-options.md`           |
| Hosting without playing, cancelling, expiry                               | `races/hosting-and-cancelling.md`     |
| The daily race allowance                                                  | `races/daily-races.md`                |
| The order of setting up a session with no wallet app                      | `races/without-the-wallet-app.md`     |
| Signing once instead of once per action                                   | `races/delegated-play.md`             |
| The four collections at a glance, where to buy, surprise items, royalties | `nfts/README.md`                      |
| Runner, and what it unlocks                                               | `nfts/runners.md`                     |
| Boost mechanics, stacking, fairness                                       | `nfts/boosts.md`                      |
| Tracks and custom scenery                                                 | `nfts/tracks.md`                      |
| Cosmetics and avatars                                                     | `nfts/cosmetics.md`                   |
| A duck made to your design: the steps, discards, vouchers, your creations | `nfts/creating-a-duck.md`             |
| Mystery Boxes                                                             | `nfts/mystery-boxes.md`               |
| Renting an NFT                                                            | `nfts/renting.md`                     |
| Tournaments, rule sets, standings                                         | `competition/tournaments.md`          |
| Teams, membership, the freeze                                             | `competition/teams.md`                |
| Rematch proposals and chains                                              | `competition/rematches.md`            |
| Badges and XP milestones                                                  | `competition/badges.md`               |
| The jackpot: the pot, who is entered, the draw                            | `competition/jackpot.md`              |
| The community lottery                                                     | `competition/community-lottery.md`    |
| Entry fee, platform fee tiers, the jackpot fee, prize pool                | `economy/fees-and-prizes.md`          |
| The pre-funded balance, deposits, withdrawals, payout target              | `economy/player-vault.md`             |
| Which balance the top bar button shows                                    | `economy/player-vault.md`             |
| Creator fee share                                                         | `economy/creator-fee-share.md`        |
| Withdrawals, refunds, rent, surcharges                                    | `economy/refunds-and-rent.md`         |
| Token races, supported programs                                           | `economy/spl-tokens.md`               |
| ORAO VRF and how a seed becomes a winner                                  | `trust/fairness.md`                   |
| Checking a race yourself in an explorer                                   | `trust/verifying-a-race.md`           |
| Player profiles and verification badges                                   | `trust/verification.md`               |
| Common questions                                                          | `help/faq.md`                         |
| Terms a player will meet                                                  | `help/glossary.md`                    |
| Language, dollar figures, race sound, seasonal theme                      | `help/preferences.md`                 |
| The Telegram bot and raids                                                | `help/telegram-bot.md`                |
| Where to reach the team                                                   | `help/social-networks.md`             |

## Which page is the home of a fact

The figure, the windows and the exceptions are stated on the home and nowhere
else. `help/faq.md` and `help/glossary.md` are the home of nothing: an answer
or a definition there is a sentence and a link.

| Fact                                                                       | Home                                                  |
| -------------------------------------------------------------------------- | ----------------------------------------------------- |
| Entry fee minimum and maximum; the Fee figure on the form                  | `races/creating-a-race.md`, "Entry fee"               |
| Lobby size: the default cap and the maximum                                | `races/creating-a-race.md`, "Max players"             |
| Race duration: the floor and the ceiling                                   | `races/creating-a-race.md`, "Race duration"           |
| The "feeds the jackpot" choice on the form                                 | `races/creating-a-race.md`, "Feeding the jackpot"     |
| Join window: the default and the custom range                              | `races/advanced-options.md`, "Custom join timeout"    |
| Race name length; the minimum account age range                            | `races/advanced-options.md`                           |
| Everything a Runner unlocks                                                | `nfts/runners.md`, "What it unlocks"                  |
| Which join settings need a Runner; allowlist size; the NFT gate's cap      | `races/access-and-gating.md`                          |
| Daily allowance: the limits, the window, the creation cooldown             | `races/daily-races.md`                                |
| Podium percentages; the fewest players each mode starts with               | `races/race-modes.md`                                 |
| Platform fee tiers                                                         | `economy/fees-and-prizes.md`, "Platform fee tiers"    |
| Jackpot fee: its ceiling, when it is taken, what pays none                 | `economy/fees-and-prizes.md`, "The jackpot fee"       |
| Network fee; oracle, archival, audio and X announcement costs              | `economy/fees-and-prizes.md`                          |
| How a dollar figure is priced                                              | `economy/fees-and-prizes.md`                          |
| Withdraw windows and penalty; cancel penalty; who triggers a refund        | `economy/refunds-and-rent.md`                         |
| Rent of the player account, and of a race account by lobby size            | `economy/refunds-and-rent.md`                         |
| The underfilled-start surcharge; very small SOL payouts                    | `economy/refunds-and-rent.md`                         |
| The token account deposit; the address line in a currency picker           | `economy/spl-tokens.md`                               |
| The payout target, what it covers and its one exception                    | `economy/player-vault.md`, "Where your winnings land" |
| Creator Fee Share percentages and which races earn it                      | `economy/creator-fee-share.md`                        |
| Delegation: what it covers and never can, durations, the per-action charge | `races/delegated-play.md`                             |
| Verification: providers, when it is offered, one-way, a second account     | `trust/verification.md`                               |
| The oracle's deadline; why ORAO                                            | `trust/fairness.md`                                   |
| Finalization and starting, and who may send each                           | `introduction/how-it-works.md`                        |
| The boost cap, the win rates, no-boost races                               | `nfts/boosts.md`                                      |
| Where to buy an NFT; royalties                                             | `nfts/README.md`                                      |
| An item sold as a surprise: what is kept back, who sees it, no renting     | `nfts/README.md`, "Surprise items"                    |
| Team size, pending requests, the freeze during a tournament                | `competition/teams.md`                                |
| Tournament scoring, the pot, its fee ceiling, claiming                     | `competition/tournaments.md`                          |
| Rematch rules, windows, chain depth, why race numbers skip                 | `competition/rematches.md`                            |
| Jackpot period, finalists, the draw, cancelling, claiming                  | `competition/jackpot.md`                              |
| Jackpot posts in Telegram; raid point weights; how a card names you        | `help/telegram-bot.md`                                |

## Topics that live on more than one page

These are split on purpose. The split is the thing to preserve: each page
answers its own question and links out for the rest.

**Money coming back.** `races/race-modes.md` says in a sentence what happens
to the pool when a race does not run. `races/hosting-and-cancelling.md` is the
creator's view: cancelling, expiry, and what is left to them.
`economy/refunds-and-rent.md` is the full accounting and the one that owns
every figure, the penalties included.

**What a Runner NFT does.** `nfts/runners.md` owns the collection and the full
list of what holding one unlocks. `races/access-and-gating.md` owns which join
settings need one. `races/daily-races.md` owns the allowance it raises.
`economy/creator-fee-share.md` owns the revenue it adds to.

**The create form.** `races/creating-a-race.md` owns the required choices and
their limits. `races/advanced-options.md` owns each opt in. What an opt in
costs is on `economy/fees-and-prizes.md`, and the form's own list of opt ins is
a phrase and a link each.

**Gating.** `races/access-and-gating.md` owns all five join settings and every
gate type. `nfts/runners.md`, `nfts/boosts.md` and `trust/verification.md` each
describe what a player needs to pass one, from their own side.

**Boost fairness.** `nfts/boosts.md` owns both the mechanic and the argument
that it is fair, including no-boost races. Several pages deep-link into
`#no-boost-races`, so that heading is treated as fixed.

**The jackpot is two pages on purpose.** `economy/fees-and-prizes.md` owns the
jackpot FEE: what a race pays, the worked example, what is exempt.
`competition/jackpot.md` owns the pot and the draw: who is entered, how the
winner is picked, how it is paid. Every other page that states what winners
receive says "minus fees" and links to the first.

**The vault and delegation are two pages on purpose.**
`economy/player-vault.md` owns the money: what the balance is, depositing,
withdrawing, and the payout target that decides where winnings land.
`races/delegated-play.md` owns the permission: what may be signed for you, what
never can be, and how to revoke. They depend on each other, because delegation
spends from the vault, so each links to the other and neither restates it.
`races/without-the-wallet-app.md` owns only the ORDER of the steps, and links
to those two and to `trust/verification.md` for the rest.

The word "vault" carries two meanings on this site. A **race vault** holds one
race's entry fees and closes when the race ends. A **player vault** is a
persistent balance owned by one player. `help/glossary.md` distinguishes them
and every page that could be read either way must say which it means.

**A payout that finds no token account.** `economy/spl-tokens.md` gives the
overview for a claim and a refund, `economy/refunds-and-rent.md` owns the
refund's side, and `races/delegated-play.md` owns what a claim sent for you
bills your vault.

**Verification, which is two unrelated things.** `trust/verification.md` is
about a player proving who they are and earning a profile badge.
`trust/verifying-a-race.md` is about anyone checking a race result on chain.
Their filenames are one word apart and they are the pair most likely to be
confused, cross-linked wrongly, or edited into each other. Check which one you
are in before adding a section about "verification".

## What the pages leave out

- **Where a button is.** A page describes what happens and what it costs
  (`.claude/rules/pages.md`). A screenshot shows the screen, and the prose
  still carries the answer on its own.
- **Anything off chain, in detail.** XP, leaderboards, badge awards, tournament
  standings and the Telegram bot are backend features. They can change without
  a program release, so a page describing them precisely goes stale first.
- **Developer-facing material.** Instruction names, account layouts and seeds
  belong in the program repository. `trust/verifying-a-race.md` is the single
  deliberate exception, because going on chain is exactly what it teaches.
