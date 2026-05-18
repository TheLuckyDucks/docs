# SPL token races

Races and tournaments can be denominated in supported SPL tokens instead of SOL. Currently supported tokens include USDC, USDT, AMPS, and AISI, with more added periodically.

## How a token race works

Mechanically identical to a SOL race. The differences are:

* The entry fee is denominated in the token's smallest unit (e.g. USDC has 6 decimals, so 1 USDC = 1,000,000 base units).
* Each participant needs an Associated Token Account (ATA) for that mint. If you do not have one, the join transaction creates it automatically; this adds a one-time ATA rent (~0.002 SOL) you pay yourself, recoverable when you close the ATA.
* The race vault holds the token in a vault-owned ATA. Payouts move the token from the vault ATA to each winner's ATA.

## Selecting a token

In the Create Race modal, the entry fee field has a currency picker on the right. The picker lists SOL plus the platform's currently supported tokens, with the token's icon, symbol, and your current balance.

Token availability and priority order are set by the platform via `splTokens[].priority` in `/config`. Tokens with higher priority appear first.

## Fee tier differences

Each token has its own fee tier schedule. The percentages are the same as SOL (10%, 7.5%, 5%, 3%, 2%), but the dollar thresholds differ to match the token's denomination. AMPS and AISI have much higher absolute thresholds because their unit price is lower than SOL or USD.

The `splTokens[].feeTiers` field in `/config` carries the full schedule.

## Joining without the token

If you do not have any of the chosen token in your wallet, the join button is disabled with a "Insufficient balance" tooltip. The balance check happens client-side before the tx is signed.

## Tournaments in SPL tokens

Tournament prize pools can also be SPL token denominated. The claim wire format for token tournaments interleaves the wallet and ATA addresses in a flat list: `[wallet, ata, wallet, ata, ...]` for the top N winners. The SOL race claim format is segmented (all wallets first, then all ATAs), so token tournament claims use a different account ordering. The wallet adapter handles this transparently; you just click Claim.

## Why use SPL tokens

* **Stablecoins (USDC, USDT)** keep the entry fee fixed in USD terms. No exposure to SOL price swings between joining and finalization.
* **Community tokens (AMPS, AISI)** drive activity in their respective ecosystems. Race pools become liquidity events for those projects.
