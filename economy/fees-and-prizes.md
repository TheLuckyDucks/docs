# Fees and prizes

What you pay to play, where the money goes, and how the prize pool is split.

## What you pay

When you join a race, your entry fee moves entirely into the race vault. The race vault then pays the platform fee out of the prize pool at race end, and pays the rest to the winners.

The transaction you sign also covers:

* **Network fee**. Roughly 0.000005 SOL per signed transaction. Solana's standard.
* **No platform-side ATA rent** for SOL races. SPL token races may require a small one-time Associated Token Account creation if you do not yet have one for that mint.

## Where the entry fee goes

| Path | Recipient | When |
|------|-----------|------|
| Prize pool | Winner(s) | Race finalization |
| Platform fee | Treasury | Race finalization |
| Stays in vault if cancelled | Original payers | Race cancellation |

The split happens automatically as part of the race finalization transaction. You do not need to do anything for the platform fee to take its cut.

## Platform fee tiers

The platform fee is a percentage of the prize pool, set by the on chain `fee_tiers` schedule. Smaller pots pay a higher percentage; larger pots pay less. Here is the current SOL schedule:

| Pool size | Platform fee |
|-----------|--------------|
| Up to 0.05 SOL | 10% |
| Up to 0.1 SOL | 7.5% |
| Up to 0.5 SOL | 5% |
| Up to 1 SOL | 3% |
| Above 1 SOL | 2% |

SPL token pools use the same percentage schedule but with thresholds adjusted for that token's typical denomination. The full schedule is in `/config` under `race.feeTiers` and per-token under `splTokens[].feeTiers`.

## Prize pool calculation

* **Unsponsored race**. Pool = entry fee × number of paid joiners. Withdrawn players get 90% back; the 10% penalty stays in the pool, increasing the per-winner take.
* **Sponsored race**. Pool = whatever the creator deposited. Joiners pay nothing; the platform fee comes out of the sponsor's deposit at finalization.

## Other costs at creation

A few small costs are paid by the creator at race creation, separate from the pool:

* **Oracle fee** (~0.0035 SOL). Paid to ORAO for the VRF request.
* **Archival fee** (~0.0001 SOL). Goes to the IPFS archival worker.
* **Audio cost** (if AI commentary is enabled). Per second cost times duration.
* **Start-when-underfilled cost** (if opted in). Paid to the backend authority on auto start, refunded if the race never auto starts.
* **Race PDA rent**. Around 0.003 SOL. Fully refunded to the creator when the race closes.

These costs are all listed in the cost breakdown box at the bottom of the Create Race modal before you sign.
