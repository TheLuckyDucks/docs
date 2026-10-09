---
icon: book
description: Every term you will meet across these pages and the app, in one alphabetical list.
---

# Glossary

Terms you will see across the docs and the app.

{% hint style="info" %}
Two terms are worth reading together before anything else: a **race vault** holds one race's entry fees and closes with the race, while a **player vault** is your own persistent balance. Several pages mention both.
{% endhint %}

### Allowlist (private race)

An invite list of wallets a creator sets on a private race. Only listed wallets can join, and everyone else sees the race with Join disabled. See [Allowed players](../races/access-and-gating.md#allowed-players-private-invites).

### ATA (Associated Token Account)

A small Solana account that holds one SPL token for one wallet. Your wallet needs one per token, and joining a token race creates it for you if you have none, for a one-time deposit that comes back when you close it. See [SPL token races](../economy/spl-tokens.md#how-a-token-race-works).

### Boost

A speed bonus added to your duck for one race, sourced from a Boost NFT in your wallet and capped on chain. See [Boost NFTs](../nfts/boosts.md).

### Cosmetic

A wearable NFT skin. Visual only, no gameplay impact. See [Cosmetic NFTs](../nfts/cosmetics.md).

### Daily race allowance

The cap on how many races a wallet can play in a rolling day, higher with a Runner NFT. See [Daily races](../races/daily-races.md) for the limits and what counts.

### Default max players

The largest race you can create without a Runner NFT, and the smallest lobby an underfilled race may auto start from. It is a platform setting, and the create form shows it. See [Max players](../races/creating-a-race.md#max-players).

### Delegation

Permission you grant, for a period you choose, letting The Lucky Ducks sign your in-game actions instead of your wallet. It spends from your player vault, expires on its own, revokes instantly, and can never move money off the platform. Granting needs a [verified](#verified) wallet; revoking never does. See [Playing without signing every action](../races/delegated-play.md).

### Entry fee

The amount each joiner pays to participate in a race.

### Finalization

The on-chain transaction that ranks the ducks and lets the winners claim, sent once the race duration has elapsed. See [How a race works](../introduction/how-it-works.md#5-finalization).

### Host (hosted race)

A race where the creator does not take a slot as a player. The race opens with zero players and fills as others join. See [Host a race without playing](../races/hosting-and-cancelling.md#host-a-race-without-playing).

### Jackpot

A pot of SOL and tokens that races pay into, won whole by one of the top players of each period, picked by provable randomness, and claimed by the winner. See [The jackpot](../competition/jackpot.md).

### Jackpot fee

The share of a race's prize pool that goes into the jackpot, a separate fee beside the platform fee. See [Fees and prizes](../economy/fees-and-prizes.md#the-jackpot-fee).

### Join timeout

The lobby window during which players can join a race. It has a default, and a creator can set their own. See [Custom join timeout](../races/advanced-options.md#custom-join-timeout).

### Linked wallet

A non-Solana wallet linked to your profile so the platform can read its NFT holdings when you join a cross-chain gated race. Linking moves no funds. See [NFT holders](../races/access-and-gating.md#nft-holders).

### Minimum account age

A creator chosen condition limiting a race to wallets whose player account is at least a certain age. See [Minimum account age](../races/advanced-options.md#minimum-account-age).

### Mystery Box

A sealed NFT that opens into a random reward from a themed pool (Cosmetics, Tracks, or Boost). The box opens automatically after minting; the reward is selected by ORAO VRF and minted to your wallet. See [Mystery Boxes](../nfts/mystery-boxes.md).

### NFT Holders (join setting)

Restricts entry to wallets holding a minimum number of NFTs from a chosen collection, on Solana or another supported chain. See [Race access and gating](../races/access-and-gating.md#nft-holders).

### ORAO VRF

The on-chain randomness oracle used by The Lucky Ducks. ORAO operators sign random seeds and publish them to Solana; the smart contract reads the seed and computes race outcomes deterministically. See [Provable randomness](../trust/fairness.md).

### Payout target

Where money coming back to you lands: your wallet, or your player vault. It is set per player, not per race, so nobody else can redirect your money. See [Your player vault](../economy/player-vault.md#where-your-winnings-land).

### PDA (Program Derived Address)

An account whose address the program derives from a set of seeds plus the program ID rather than from a keypair, so nobody holds a key that can sign for it. Races, player accounts, the platform config and race vaults are all PDAs. The term turns up in a block explorer, which is where [Verifying a race on-chain](../trust/verifying-a-race.md) uses it.

### Player account

A per-wallet account holding your race history, win count, XP, your profile, and your player vault balance. Created the first time you race, for a rent deposit that is fully refundable on close. See [Refunds and rent](../economy/refunds-and-rent.md#your-player-account-rent).

### Player vault

A balance you top up once and spend across many races, held inside your player account. Not the same as a race vault. Only your wallet can take money out of it. See [Your player vault](../economy/player-vault.md).

### Podium Split

Race mode where the prize pool is split between first, second, and third place. See [Race modes](../races/race-modes.md).

### Race vault

An account owned by the smart contract that holds the entry fees for one race, and closes with it. Not the same thing as your player vault, which is yours and persists across races.

### Rematch

A follow-up 1v1 either player can offer when a race ends, inheriting its settings and rolling the stake forward. See [Rematches](../competition/rematches.md).

### Runner NFT

The advanced access NFT. Required to create races with non-default options. See [Runner NFTs](../nfts/runners.md).

### Sponsored race

A race where the creator funds the prize pool upfront; joiners pay nothing to enter. See [Sponsored race](../races/advanced-options.md#sponsored-race).

### Threshold (underfilled)

The minimum number of joiners at which a race with start-when-underfilled on can start short. The creator sets it on a slider at creation. See [Start when underfilled](../races/advanced-options.md#start-when-underfilled).

### Token Holders (join setting)

Restricts entry to wallets holding a minimum amount of a chosen token, checked on chain at join time. See [Race access and gating](../races/access-and-gating.md#token-holders).

### Tolerance

How many empty seats a race will start with on the underfilled path. Take it off the maximum players and you have the threshold the race starts at.

### Tournament

A scheduled event in which teams compete over a fixed window. The races each team runs count toward its standing, and the winning team splits the whole pot between its members. See [Tournaments](../competition/tournaments.md).

### Treasury

The platform's fee wallet. Receives the platform fee out of every finalized prize pool. Funds development.

### Verified

A wallet that has linked an off-platform identity, such as X or Telegram, through whichever providers the platform has enabled. It carries a green dot on its avatar, can enter races reserved for verified players, signs you in without your wallet app, and is what [delegation](#delegation) requires. See [Player verification](../trust/verification.md).

### VRF (Verifiable Random Function)

A cryptographic function whose output is provably random and unpredictable, but verifiable after the fact. The basis of fair race outcomes.

### Withdrawn

A participant who left the lobby before it closed. They get their full entry back from the vault, and a fixed penalty in SOL leaves their wallet for the treasury. See [Refunds and rent](../economy/refunds-and-rent.md#withdrawal-during-the-lobby).

### WTA (Winner Takes All)

Race mode where the first place finisher gets the entire prize pool, minus fees. See [Race modes](../races/race-modes.md).

### X announcement

Posts the race publicly to The Lucky Ducks' X account, for a flat non-refundable cost at creation. See [X announcement](../races/advanced-options.md#x-announcement).
