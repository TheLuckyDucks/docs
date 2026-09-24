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

An invite list of up to 20 wallets, which is also the most players a race can hold. Only listed wallets can join, and everyone else sees the race with Join disabled. The list lives off chain and is published with the race, so the app can show it; only a short fingerprint goes on chain, to prove it was not tampered with. The creator is admitted by the auto join at creation, so in host mode they must list themselves to join later.

### ATA (Associated Token Account)

A small Solana account that holds one SPL token for one wallet. Your wallet needs one per token, and joining a token race creates it for you if you have none, for a one-time deposit of about 0.002 SOL that comes back when you close it. The race vault has one too, and payouts move the token from it to each winner's.

### Boost

A speed bonus added to your duck for one race, sourced from a Boost NFT in your wallet. Capped at 1% on chain.

### Cosmetic

A wearable NFT skin. Visual only, no gameplay impact.

### Daily race allowance

The cap on how many races a wallet can play in a rolling 24 hour window: 50 a day without a Runner, 500 with one. Hosting, sponsoring and creating a race you do not join do **not** count; offering or accepting a rematch does. See [Daily races](../races/daily-races.md).

### Default max players

The largest race you can create without a Runner NFT, and the smallest lobby an underfilled race may auto start from. It is a platform setting, and the create form shows it.

### Delegation

Permission you grant, for a period you choose, letting The Lucky Ducks sign your in-game actions instead of your wallet. It spends from your player vault, expires on its own, revokes instantly, and can never move money off the platform. Granting needs a [verified](#verified) wallet; revoking never does. See [Playing without signing every action](../races/delegated-play.md).

### Entry fee

The amount each joiner pays to participate in a race.

### Finalization

The on-chain transaction that ranks the ducks and lets the winners claim. The backend wallet normally sends it once the race duration elapses, but it requires no particular wallet from that moment on, so anyone can send it if the backend does not.

### Host (hosted race)

A race where the creator does not take a slot as a player. The race opens with zero players and fills as others join. Hosting requires a Runner NFT, is not available for 1v1 races, and the host gives up the Creator Fee Share.

### Join timeout

The lobby window during which players can join a race. Default 1 hour. Customizable per race.

### Linked wallet

A non-Solana wallet linked to your profile so the platform can read its NFT holdings when you join a cross-chain gated race. One signature per wallet proves control, no funds move, and linking a new one replaces the old. See [NFT holders](../races/access-and-gating.md#nft-holders).

### Minimum account age

A creator chosen condition limiting a race to wallets whose player account is at least a certain age, set anywhere from 5 minutes to 6 months. Needs a Runner NFT at creation, and stacks on any join setting.

### Mystery Box

A sealed NFT that opens into a random reward from a themed pool (Cosmetics, Tracks, or Boost). The box opens automatically after minting; the reward is selected by ORAO VRF and minted to your wallet. See [Mystery Boxes](../nfts/mystery-boxes.md).

### NFT Holders (join setting)

Restricts entry to wallets holding a minimum number of NFTs from a chosen collection, on Solana or a supported chain such as Ethereum, Base or Polygon. Creating one always needs a Runner NFT, whichever chain the collection is on. For another chain, joiners link an external wallet once and the platform checks that. Eligibility counts current holdings, verified at join time by a short lived pass, and one NFT cannot secure 2 seats in a race. See [Race access and gating](../races/access-and-gating.md#nft-holders).

### ORAO VRF

The on-chain randomness oracle used by The Lucky Ducks. ORAO operators sign random seeds and publish them to Solana; the smart contract reads the seed and computes race outcomes deterministically.

### Payout target

Where money coming back to you lands: your wallet, or your player vault. Covers prizes, refunds and returned rent. It is set per player, not per race, so nobody else can redirect your money. See [Your player vault](../economy/player-vault.md#where-your-winnings-land).

### PDA (Program Derived Address)

An account whose address the program derives from a set of seeds plus the program ID rather than from a keypair, so nobody holds a key that can sign for it. Races, player accounts, the platform config and race vaults are all PDAs. The term turns up in a block explorer, which is where [Verifying a race on-chain](../trust/verifying-a-race.md) uses it.

### Player account

A per-wallet account holding your race history, win count, XP, your profile, and your player vault balance. Created the first time you race. Rent (~0.0017 SOL) is held separately from your balance and is fully refundable on close, along with everything in the vault.

### Player vault

A balance you top up once and spend across many races, held inside your player account. Not the same as a race vault. Only your wallet can take money out of it. See [Your player vault](../economy/player-vault.md).

### Podium Split

Race mode where the prize pool is split 50% / 30% / 20% between first, second, and third place.

### Race vault

An account owned by the smart contract that holds the entry fees for one race, and closes with it. Not the same thing as your player vault, which is yours and persists across races.

### Rematch

A follow-up 1v1 either player can offer when a race ends, inheriting its settings and rolling the stake forward. Chains up to a platform limit, and a claimed prize closes the option.

### Runner NFT

The advanced access NFT. Required to create races with non-default options.

### Sponsored race

A race where the creator funds the prize pool upfront; joiners pay nothing to enter.

### Threshold (underfilled)

The minimum number of joiners at which a race with start-when-underfilled on can start short. The creator sets it on a slider at creation, and it can never be lower than the platform's default race size.

### Token Holders (join setting)

Restricts entry to wallets holding a minimum amount of a chosen token, checked on chain at join time. The gating token need not be the prize token, and both legacy SPL Token and Token-2022 mints work. See [Race access and gating](../races/access-and-gating.md#token-holders).

### Tolerance

How many empty seats a race will start with on the underfilled path. Take it off the maximum players and you have the threshold the race starts at.

### Tournament

A scheduled event in which teams compete over a fixed window. The races each team runs count toward its standing, and the winning team splits the whole pot between its members.

### Treasury

The platform's fee wallet. Receives the platform fee out of every finalized prize pool. Funds development.

### Verified

A wallet that has linked an off-platform identity, such as X or Telegram, through whichever providers the platform has enabled. It carries a green dot on its avatar, can enter races reserved for verified players, signs you in without your wallet app, and is what [delegation](#delegation) requires. See [Player verification](../trust/verification.md).

### VRF (Verifiable Random Function)

A cryptographic function whose output is provably random and unpredictable, but verifiable after the fact. The basis of fair race outcomes.

### Withdrawn

A participant who left the lobby before it closed, which is allowed within 2 minutes of their own join and never in the last 60 seconds. They get their full entry back from the vault, and a fixed 0.01 SOL penalty leaves their wallet for the treasury, in SOL even on a token race. It never joins the prize pool.

### WTA (Winner Takes All)

Race mode where the first place finisher gets the entire prize pool, minus the platform fee.

### X announcement

Posts the race publicly to The Lucky Ducks' X account. Flat cost of around 0.0005 SOL, straight to the backend wallet at creation and non-refundable. Needs a Runner NFT, and a rematch picks it independently rather than inheriting it. See [X announcement](../races/advanced-options.md#x-announcement).
