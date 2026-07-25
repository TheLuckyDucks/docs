# Glossary

Terms you will see across the docs and the app.

### ATA (Associated Token Account)

A Solana account that holds a specific SPL token for a specific wallet. Each wallet has one ATA per token mint. Token races use a vault-owned ATA to hold the prize pool; payouts go from the vault ATA to each winner's ATA. The platform supports ATAs for both the legacy SPL Token program and SPL Token-2022.

### Allowlist (private race)

An invite list of up to 20 wallets the creator can attach to a race (also the maximum players a race can hold). Only listed wallets can join; everyone else sees the race but cannot click Join. The full list is stored off chain on the platform backend and exposed through the race endpoints, so it is visible in the dApp; only a short fingerprint is recorded on chain to prevent tampering. The creator's own wallet is implicitly allowed only via the auto join at race creation (when the race is neither sponsored nor in host mode); in host mode the creator must add their wallet to the list if they want to join later.

### Boost

A speed bonus added to your duck for one race, sourced from a Boost NFT in your wallet. Capped at 1% on chain.

### Cleanup worker

A backend process that submits permissionless transactions to keep the system healthy. Examples: archiving expired races, calling `start_underfilled_race` once eligibility opens.

### Cosmetic

A wearable NFT skin. Visual only, no gameplay impact.

### Daily race allowance

The cap on how many races a wallet can play (join or auto-join) in a rolling 24 hour window. Non-Runner verified wallets get 50 per day; Runner holders get 500. Hosting, sponsoring, and creating a race you do not join yourself do **not** count. Offering or accepting a rematch does. See [Daily races](../races/daily-races.md).

### Default max players

The platform's max race size that does not require a Runner NFT. Currently 5.

### Discriminator

The first 8 bytes of any Anchor account, used to identify the account type. Lucky Ducks accounts (Race, PlayerStats, PlatformConfig, etc.) all start with one.

### Entry fee

The amount each joiner pays to participate in a race.

### Finalization

The on-chain transaction that closes a race and pays out the winners. The backend wallet triggers it once the race duration elapses; if it hasn't fired within 10 seconds, it becomes permissionless and any participant can submit it.

### Host (hosted race)

A race where the creator does not take a slot as a player. The race opens with zero players and fills as others join. Hosting requires a Runner NFT, is not available for 1v1 races, and the host gives up the Creator Fee Share.

### Minimum account age

An optional, creator chosen condition that limits a race to wallets whose player account is at least a certain age. Defaults to 24 hours when enabled. Requires a Runner NFT at race creation. Independent of the join setting (Anyone, Verified Only, Allowed Players, NFT Holders, or Token Holders): can be combined with any of them.

### Mystery Box

A sealed NFT that opens into a random reward from a themed pool (Cosmetics, Tracks, or Boost). The box opens automatically after minting; the reward is selected by ORAO VRF and minted to your wallet. See [Mystery Boxes](../nfts/mystery-boxes.md).

### Join timeout

The lobby window during which players can join a race. Default 1 hour. Customizable per race.

### NFT Holders (join setting)

A race join setting that restricts entry to wallets holding at least a chosen number of NFTs from a chosen collection. Eligibility is based on current holdings and is checked at join time using a short lived eligibility pass. The same NFT cannot secure two seats in the same race. See [Race access and gating](../races/access-and-gating.md#nft-holders).

### Token Holders (join setting)

A race join setting that restricts entry to wallets holding at least a chosen amount of a chosen token. Checked directly on chain at join time. The gating token does not have to be the race's prize token. Supports both legacy SPL Token and Token-2022 mints. See [Race access and gating](../races/access-and-gating.md#token-holders).

### No-boost race

A race created with boost NFTs disabled for everyone, including the creator. Marked with a crossed-out circle icon on race cards. Requires a Runner NFT to create. Rematches inherit the setting. See [No-boost races](../nfts/boosts.md#no-boost-races).

### X announcement (X tweet)

An optional creation setting that posts the race publicly to Lucky Ducks' X (Twitter) account. Flat cost (currently 0.005 SOL) paid straight to the backend wallet at creation, non-refundable. Requires a Runner NFT to enable. Picked independently for rematches, not inherited. See [X announcement](../races/advanced-options.md#x-announcement).

### ORAO VRF

The on-chain randomness oracle used by Lucky Ducks. ORAO operators sign random seeds and publish them to Solana; the smart contract reads the seed and computes race outcomes deterministically.

### PDA (Program Derived Address)

A Solana account whose address is deterministically derived from a set of seeds plus the program ID, with no private key. Every race, every player stats account, the platform config, and every NFT have associated PDAs.

### Podium Split

Race mode where the prize pool is split 50/30/20 between first, second, and third place.

### Race vault

A PDA owned by the smart contract that holds the entry fees for a specific race. Closed at finalization.

### Rematch

A subsequent race proposed by the winner against the same opponents, with the same parameters (by default). Chains up to 11 deep.

### Runner NFT

The advanced access NFT. Required to create races with non-default options.

### Sponsored race

A race where the creator funds the prize pool upfront; joiners pay nothing to enter.

### Stats PDA

A per-wallet account that tracks your race history, win count, XP, and other stats. Created the first time you race. Rent (~0.0017 SOL) is fully refundable on close.

### Threshold (underfilled)

The minimum joiner count at which an underfilled-opted-in race can auto-start. Computed as `maxPlayers - tolerance`, where tolerance is set at creation.

### Tolerance

The number of missing slots a race tolerates before auto-starting on the underfilled path. `maxPlayers - tolerance` gives the minimum-to-start threshold.

### Tournament

A scheduled competitive event that aggregates race results into a leaderboard, with a prize pool paid to top finishers.

### Treasury

The platform's fee wallet. Receives the platform fee out of every finalized prize pool. Funds development.

### Verified

A wallet that has linked an off-platform identity via OAuth (X, Telegram). Unlocks higher daily race creation limits and tournament eligibility.

### VRF (Verifiable Random Function)

A cryptographic function whose output is provably random and unpredictable, but verifiable after the fact. The basis of fair race outcomes.

### Withdrawn

A participant who left the lobby before it closed. Two windows apply: within 2 minutes of their own join, and not in the last 60 seconds of the lobby. Gets their full entry back from the vault; a fixed 0.01 SOL penalty is charged separately from their wallet (always in SOL, even on token races); the penalty goes to the treasury fee wallet, not the prize pool.

### WTA (Winner Takes All)

Race mode where the first place finisher gets the entire prize pool, minus the platform fee.
