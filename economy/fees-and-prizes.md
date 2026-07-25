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

The platform fee percentage is picked from a tier schedule at race creation, based on the **entry fee** (or, for a sponsored race, the sponsor's deposit). It is then applied to the full prize pool at claim time. Smaller entry fees pay a higher percentage; larger ones pay less.

| Entry fee (per player) | Platform fee |
|-------------------------|--------------|
| Up to 0.05 SOL | 10% |
| Up to 0.1 SOL | 7.5% |
| Up to 0.5 SOL | 5% |
| Up to 1 SOL | 3% |
| Above 1 SOL | 2% |

Worked example: a race with a 0.1 SOL entry fee and 10 players. Entry fee falls in the second tier, so the fee is 7.5%. The pool at fill is 1 SOL. At claim the platform takes 1 × 7.5% = 0.075 SOL, and winners share the remaining 0.925 SOL.

For a sponsored race, the sponsor's deposit is what the tier is picked against (there is no per player entry fee). A 1 SOL sponsored prize sits in the 3% tier, so the platform takes 0.03 SOL at claim and winners share 0.97 SOL.

SPL token pools use the same percentage schedule but with thresholds adjusted for that token's typical denomination. The full schedule is in `/config` under `race.feeTiers` and per-token under `splTokens[].feeTiers`.

## Prize pool calculation

* **Regular race**. Pool = entry fee × number of paid joiners.
* **Sponsored race**. Pool = whatever the creator deposited. Joiners pay nothing; the platform fee comes out of the sponsor's deposit at finalization.

## Other costs at creation

A few small costs are paid by the creator at race creation, separate from the pool:

* **Oracle fee** (~0.0035 SOL). Paid to ORAO for the VRF request.
* **Archival fee** (~0.0001 SOL). Goes to the IPFS archival worker.
* **Audio cost** (if AI commentary is enabled). About 0.00005 SOL per race second, so a 30 second race costs roughly 0.0015 SOL and a 5 minute race about 0.015 SOL.
* **X announcement cost** (if X announcement is enabled). Flat 0.005 SOL.
* **Start-when-underfilled cost** (if opted in). Paid to the backend authority on auto start, refunded if the race never auto starts.
* **Race PDA rent**. Around 0.003 SOL. Fully refunded to the creator when the race closes.

These costs are all listed in the cost breakdown box at the bottom of the Create Race modal before you sign.

## A note for creators

On regular (non-sponsored) races, part of the platform fee can be redirected back to the race creator. See [Creator Fee Share](creator-fee-share.md) for details.
