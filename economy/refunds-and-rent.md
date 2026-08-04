# Refunds and rent

How money flows back to you when something does not finish as expected.

## Withdrawal during the lobby

You can leave a race during the lobby window under two time constraints:

* You must withdraw **within 2 minutes of your own join**. If you have been in the lobby longer than that, the withdraw button is disabled.
* The **last 60 seconds** of the join window are locked for everyone (anti grief), regardless of when they joined.

When you withdraw, the vault refunds your **full entry fee** and a fixed **0.01 SOL** withdrawal penalty is charged separately from your wallet to the platform fee wallet. The penalty is the same regardless of pool size or token, and always paid in SOL even for SPL/token races.

A few details worth knowing:

* The penalty is a separate transfer, not a deduction from the race vault refund. The net effect for you is the same, but on chain you will see two movements: a refund credit and a small SOL debit.
* The penalty comes from whichever account signed. Sign it yourself and it leaves your wallet. Leave it during a session where you are [playing without signing every action](../races/delegated-play.md) and it leaves your player vault instead, so a sponsored race you are leaving still needs a funded vault.
* Sponsored races: joiners paid no entry fee, so withdrawing simply frees the slot. No refund, no penalty, and the sponsor's prize deposit is untouched.
* In a **1v1 (2 player)** race, the creator cannot withdraw (they would strand the sole remaining player). They must use cancel instead.

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

The contract records a cancellation reason on the race account and emits it in the cancel event. Beyond a manual cancel by the creator, the two reasons that can trigger a refund flow are:

* **JoinTimeout**. The join window passed without the race reaching a startable state. This is the expiration path above.
* **StaleRandomness**. The oracle did not fulfill the VRF request within the VRF timeout, which is about two minutes. Rare; the oracle is reliable.

In either case the refund is permissionless: anyone can submit it, not just a participant. **It refunds the whole lobby in one transaction and closes the race**, so there is no such thing as refunding yourself alone, and no way for one player to leave the others behind. The money always goes to each original payer regardless of who paid for the transaction.

### Who triggers it, and who pays for it

Nothing happens on chain when a deadline passes. The race simply becomes refundable, and someone has to submit the transaction.

* **Races the platform created** are swept automatically, and the platform pays the network fee.
* **A race a player created is left alone on purpose.** It is theirs to close. The platform does not close a race somebody else paid for, so the refund waits for the creator or for any participant to trigger it.

You are never left guessing which one you are in: a race sitting past its join window shows up in the Unclaimed Items banner on your player page as soon as it becomes refundable, with the button that clears it.

Triggering it yourself costs the network fee for that transaction. If you trigger it while [playing without signing every action](../races/delegated-play.md), that fee comes from your player vault. See [Provable randomness](../trust/fairness.md#what-if-the-seed-never-arrives) for the deadline itself.

## Race PDA rent

Creating a race allocates a Solana account whose rent is roughly 0.003 SOL, paid by the creator at creation. When the race finalizes (or is cancelled), the contract closes the account and returns the rent to the creator.

Net cost of creating a race for the creator: oracle fee + archival fee + opt in costs. The rent itself is fully refundable.

## Your player account rent

The first time you create or join a race, the contract allocates a small per-wallet account that holds your race history, your profile, and your [player vault](player-vault.md) balance. Rent is around 0.0017 SOL.

That rent is a deposit Solana requires to keep any account open. It is held separately from your vault balance and is never spendable, which is why your balance is always withdrawable in full.

This account is also fully refundable. From the Player page, the close button submits the close instruction and returns everything in one transaction: your SOL balance, every token balance you were holding, and the rent. Your race history is reset. You can recreate the account on your next race; the rent is just held while you are actively using the platform.

## Start-when-underfilled surcharge

If a creator opts into start-when-underfilled, a small surcharge is deposited into the race vault at creation. Two outcomes:

* **Race auto starts on the underfilled path**. The surcharge transfers to the backend authority as compensation for running the auto start operation.
* **Race fills naturally / gets cancelled / refunds**. The surcharge stays in the vault and is returned to the creator along with everything else.

## Where the money lands

Refunds, prizes and returned rent go wherever your payout setting points: your wallet by default, or your [player vault](player-vault.md) if you have chosen to pool them. The setting is yours alone and applies to every race you are in, which matters here because anyone is allowed to trigger a refund on a lobby that never filled.

The one exception is closing your player account. That returns the rent of the account holding the vault, so there is nothing left to credit it to and it always goes to your wallet.

## Where to claim

Most refunds and claims happen automatically through the Player page's "Unclaimed" banner: any race where you have a pending claim shows up there with a single Claim button. The race detail modal also exposes per-race claim buttons.
