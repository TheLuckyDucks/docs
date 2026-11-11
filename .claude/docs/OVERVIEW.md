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

Each line: section: what it answers.

- Getting Started: What is this, how does one race go, what do I do first
- Races: How do I create or join one, and what are all these options
- NFTs: What do the four collections change
- Competition: Tournaments, teams, rematches, badges, the jackpot
- Economy: What does it cost, what do I get back
- The Token: What the token is, and how to buy, stake or trade it
- Trust and Fairness: Why should I believe the result
- Help: FAQ, glossary, bot, where to find us

## Which page owns a topic

The page named first carries the full treatment of the topic after it. Every
other mention links to it rather than restating it. Each line: page: the topic
it owns.

- `introduction/what-is-lucky-ducks.md`: What the platform is, and who runs it
- `introduction/how-it-works.md`: The lifecycle of one race, start to finish
- `introduction/getting-started.md`: First-time wallet to first race
- `races/creating-a-race.md`: The create-a-race form and its required choices
- `races/joining-and-playing.md`: Joining, the lobby, watching the race
- `races/race-modes.md`: WTA and Podium Split, and ties
- `races/access-and-gating.md`: Who may join: the five join settings, gates, allowlists
- `races/advanced-options.md`: Everything optional at creation
- `races/hosting-and-cancelling.md`: Hosting without playing, cancelling, expiry
- `races/daily-races.md`: The daily race allowance
- `races/without-the-wallet-app.md`: The order of setting up a session with no wallet app
- `races/delegated-play.md`: Signing once instead of once per action
- `nfts/README.md`: The four collections at a glance, where to buy, surprise items, royalties
- `nfts/runners.md`: Runner, and what it unlocks
- `nfts/boosts.md`: Boost mechanics, stacking, fairness
- `nfts/tracks.md`: Tracks and custom scenery
- `nfts/cosmetics.md`: Cosmetics and avatars
- `nfts/creating-a-duck.md`: A duck made to your design: the steps, discards, vouchers, your creations
- `nfts/mystery-boxes.md`: Mystery Boxes
- `nfts/renting.md`: Renting an NFT
- `competition/tournaments.md`: Tournaments, rule sets, standings
- `competition/teams.md`: Teams, membership, the freeze
- `competition/rematches.md`: Rematch proposals and chains
- `competition/badges.md`: Badges and XP milestones
- `competition/jackpot.md`: The jackpot: the pot, who is entered, the draw
- `competition/community-lottery.md`: The community lottery
- `economy/fees-and-prizes.md`: Entry fee, platform fee tiers, the jackpot fee, prize pool
- `economy/player-vault.md`: The pre-funded balance, deposits, withdrawals, payout target
- `economy/player-vault.md`: Which balance the top bar button shows
- `economy/creator-fee-share.md`: Creator fee share
- `economy/refunds-and-rent.md`: Withdrawals, refunds, rent, surcharges
- `economy/spl-tokens.md`: Token races, supported programs
- `token/the-token.md`: The Lucky Ducks token: its address, its facts, the allocations, the official pool, giveaway races
- `token/presale.md`: Buying in the presale: the phases, the minimum, refunds, claims
- `token/staking.md`: Staking pools, rewards, unbonding, closing a position
- `token/otc-desk.md`: The OTC desk: orders, the fee, the pool's floor, releases
- `trust/fairness.md`: ORAO VRF and how a seed becomes a winner
- `trust/verifying-a-race.md`: Checking a race yourself in an explorer
- `trust/verification.md`: Player profiles and verification badges
- `help/faq.md`: Common questions
- `help/glossary.md`: Terms a player will meet
- `help/preferences.md`: Language, dollar figures, race sound, seasonal theme
- `help/telegram-bot.md`: The Telegram bot and raids
- `help/social-networks.md`: Where to reach the team

## Which page is the home of a fact

The figure, the windows and the exceptions are stated on the home and nowhere
else. `help/faq.md` and `help/glossary.md` are the home of nothing: an answer
or a definition there is a sentence and a link. Each line: home page, and its
section where one is named: the fact.

- `races/creating-a-race.md`, "Entry fee": Entry fee minimum and maximum; the Fee figure on the form
- `races/creating-a-race.md`, "Max players": Lobby size: the default cap and the maximum
- `races/creating-a-race.md`, "Race duration": Race duration: the floor and the ceiling
- `races/creating-a-race.md`, "Feeding the jackpot": The "feeds the jackpot" choice on the form
- `races/advanced-options.md`, "Custom join timeout": Join window: the default and the custom range
- `races/advanced-options.md`: Race name length; the minimum account age range
- `nfts/runners.md`, "What it unlocks": Everything a Runner unlocks
- `races/access-and-gating.md`: Which join settings need a Runner; allowlist size; the NFT gate's cap
- `races/daily-races.md`: Daily allowance: the limits, the window, the creation cooldown
- `races/race-modes.md`: Podium percentages; the fewest players each mode starts with
- `economy/fees-and-prizes.md`, "Platform fee tiers": Platform fee tiers
- `economy/fees-and-prizes.md`, "The jackpot fee": Jackpot fee: its ceiling, when it is taken, what pays none
- `economy/fees-and-prizes.md`: Network fee; oracle, archival, audio and X announcement costs
- `economy/fees-and-prizes.md`: How a dollar figure is priced
- `economy/refunds-and-rent.md`: Withdraw windows and penalty; cancel penalty; who triggers a refund
- `economy/refunds-and-rent.md`: Rent of the player account, and of a race account by lobby size
- `economy/refunds-and-rent.md`: The underfilled-start surcharge; very small SOL payouts
- `economy/spl-tokens.md`: The token account deposit; the address line in a currency picker
- `economy/player-vault.md`, "Where your winnings land": The payout target, what it covers and its one exception
- `economy/creator-fee-share.md`: Creator Fee Share percentages and which races earn it
- `races/delegated-play.md`: Delegation: what it covers and never can, durations, the per-action charge
- `trust/verification.md`: Verification: providers, when it is offered, one-way, a second account
- `trust/fairness.md`: The oracle's deadline; why ORAO
- `introduction/how-it-works.md`: Finalization and starting, and who may send each
- `nfts/boosts.md`: The boost cap, the win rates, no-boost races
- `nfts/README.md`: Where to buy an NFT; royalties
- `nfts/README.md`, "Surprise items": An item sold as a surprise: what is kept back, who sees it, no renting
- `competition/teams.md`: Team size, pending requests, the freeze during a tournament
- `competition/tournaments.md`: Tournament scoring, the pot, its fee ceiling, claiming
- `competition/rematches.md`: Rematch rules, windows, chain depth, why race numbers skip
- `competition/jackpot.md`: Jackpot period, finalists, the draw, cancelling, claiming
- `help/telegram-bot.md`: Jackpot posts in Telegram; raid point weights; how a card names you

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
jackpot fee: what a race pays, the worked example, what is exempt.
`competition/jackpot.md` owns the pot and the draw: who is entered, how the
winner is picked, how it is paid. Every other page that states what winners
receive says "minus fees" and links to the first.

**The vault and delegation are two pages on purpose.**
`economy/player-vault.md` owns the money: what the balance is, depositing,
withdrawing, and the payout target that decides where winnings land.
`races/delegated-play.md` owns the permission: what may be signed for you, what
never can be, and how to revoke. They depend on each other, because delegation
spends from the vault, so each links to the other and neither restates it.
`races/without-the-wallet-app.md` owns only the order of the steps, and links
to those two and to `trust/verification.md` for the rest.

The word "vault" carries two meanings on this site. A race vault holds one
race's entry fees and closes when the race ends. A player vault is a
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
