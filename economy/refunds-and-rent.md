# Refunds and rent

How money flows back to you when something does not finish as expected.

## Withdrawal during the lobby

You can leave a race during the lobby window. The contract refunds your entry fee minus a fixed **withdrawal penalty**, currently **0.01 SOL**. The penalty is the same regardless of pool size or token. The collected amount goes to the platform fee wallet (treasury). It does not increase the prize pool.

A few details worth knowing:

* The penalty is always paid in **SOL**, even for SPL/token races. The rest of your entry refunds in the original asset.
* The penalty applies only to withdrawals **within the join window**. If the race expires or is cancelled by the creator, no withdrawal penalty applies.

Withdrawal is unavailable in the last few minutes of the lobby window, to prevent griefing through last second drops.

Withdrawn players are shown in the participants list with a strikethrough; they no longer count toward the lobby fill counter or the underfilled start threshold.

## Full refund on race cancellation or expiration

If the race never finalizes, every paid participant can claim a **full** refund. This covers two distinct cases.

### Creator cancellation during the join window

The creator can cancel a race while the join window is still open, even if nobody has joined yet. When they do:

* Every player who joined (including the creator, if they joined as a player) gets their **full** entry back.
* The creator pays a fixed **0.05 SOL** penalty to the platform. The penalty is the same for SOL races and token races (token races still pay it in SOL) and does not scale with the pot size.

A race that has already passed the start point cannot be cancelled. For details, see [Hosting, cancelling, and refunds](../races/hosting-and-cancelling.md#cancelling-a-race).

### Expiration (join window passed without starting)

If the join window passes and the race never reached its start condition, the race expires and can be refunded. Triggering the refund is permissionless: anyone can submit it, not just the creator. Players get their full entry back. There is **no** penalty on expiration. The penalty only applies to manual cancellation while the join window is still open.

### Other refund paths

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
