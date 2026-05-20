# Refunds and rent

How money flows back to you when something does not finish as expected.

## Withdrawal during the lobby

You can leave a race during the lobby window. The contract refunds your entry fee minus the platform fee for the current prize pool tier. The withheld percentage is sent directly to the **platform fee wallet (treasury)**.

The withdrawal penalty mirrors the [platform fee tier](fees-and-prizes.md#platform-fee-tiers) the pool sits in at the moment of withdrawal. For SOL races:

| Pool size at withdrawal | Refunded to you | Sent to fee wallet |
|-------------------------|-----------------|---------------------|
| Up to 0.05 SOL          | 90%             | 10%                 |
| Up to 0.1 SOL           | 92.5%           | 7.5%                |
| Up to 0.5 SOL           | 95%             | 5%                  |
| Up to 1 SOL             | 97%             | 3%                  |
| Above 1 SOL             | 98%             | 2%                  |

SPL token races follow the same logic against the token's own fee tier schedule.

Withdrawal is unavailable in the last few minutes of the lobby window, to prevent griefing through last-second drops.

Withdrawn players are shown in the participants list with a strikethrough; they no longer count toward the lobby fill counter or the underfilled start threshold.

## Full refund on race cancellation

If the race never finalizes, every paid participant can claim a **full** refund. Cancellation paths include:

* The lobby never filled past the minimum for the chosen race mode (2 for WTA, 3 for Podium Split).
* The creator manually cancelled before the join window opened.
* The ORAO randomness request timed out (rare; the oracle is reliable).
* The on-chain start transition failed for any reason.

Refund claims are permissionless: anyone can submit the claim on a participant's behalf. The funds always go to the original payer regardless of who pays for the tx.

## Race PDA rent

Creating a race allocates a Solana account whose rent is roughly 0.003 SOL, paid by the creator at creation. When the race finalizes (or is cancelled), the contract closes the account and returns the rent to the creator.

Net cost of creating a race for the creator: oracle fee + archival fee + opt in costs. The rent itself is fully refundable.

## Player stats PDA rent

The first time you create or join a race, the contract allocates a small per-wallet `PlayerStats` account to track your race history. Rent is around 0.0017 SOL.

This account is also fully refundable. From the Player page, the Close Stats Account button submits the close instruction, the rent returns to your wallet, and your race history is reset. You can recreate the account on your next race; the rent is just held while you are actively using the platform.

## Start-when-underfilled surcharge

If a creator opts into start-when-underfilled, a small surcharge is deposited into the race vault at creation. Two outcomes:

* **Race auto starts on the underfilled path**. The surcharge transfers to the backend authority as compensation for running the auto start operation.
* **Race fills naturally / gets cancelled / refunds**. The surcharge stays in the vault and is returned to the creator along with everything else.

## Where to claim

Most refunds and claims happen automatically through the Player page's "Unclaimed" banner: any race where you have a pending claim shows up there with a single Claim button. The race detail modal also exposes per-race claim buttons.
