# Creator Fee Share

Creator Fee Share lets a race **creator** keep part of the platform fee that comes out of the prize pool at race end. It does not change what winners receive — only where the platform's cut goes.

## What this changes (and what it doesn't)

* **Entry fees:** unchanged. Players still pay the same amount to join.
* **Winner payout:** unchanged. Winners still take home `prize_pool − platform fee`, split according to the race mode.
* **Platform fee total:** unchanged. Still pulled from the prize pool at the fee-tier rate.
* **Where the platform fee goes:** this is the only thing that moves. The fee can now be split between the treasury and the race creator.

If the share is set to 50%, the platform keeps half of its usual cut and the creator gets the other half. If it's set to 100%, the entire fee goes to the creator and the treasury gets nothing on that race. If it's 0% (the default), the creator gets nothing extra and behavior is identical to a race without the feature.

## Which races qualify

Only **regular Winner-Takes-All and Podium races**. Creator Fee Share does **not** apply to:

* **1v1 races (2 players).** Pots are small and the matchup is symmetric — there's no creator-side flywheel to reward, so 1v1s are excluded by design.
* **Sponsored races.** When the creator funds the prize themselves, they don't earn a cut of the platform fee on top of that. The treasury keeps the full fee.
* **Refunded or cancelled races.** No prize is claimed, so no fee is paid, so there's no share to pay out.

Rematches inherit whatever share was active on the original race, even if the platform default has since changed.

## How the share is set

The share is a platform-wide setting controlled by the team. It is **not** per-creator and **not** chosen per-race at creation time. The current default lives in the platform config and is exposed at `GET /api/config` under `race.creatorFeeShareBps` for anyone who wants to inspect it.

Important detail: **each race snapshots the share at creation**. If the platform raises the share later, races that were already created continue using the value that was in effect when they were created. This protects creators from sudden downward changes and keeps the math on any in-flight race fully predictable.

## A worked example

Say a Winner-Takes-All race has a 1 SOL prize pool. The fee tier at that pool size is 3% (see [Fees and prizes](fees-and-prizes.md#platform-fee-tiers)).

* Platform fee: `1 SOL × 3% = 0.03 SOL`
* Winner payout: `1 SOL − 0.03 SOL = 0.97 SOL` (always, regardless of share)

Now, depending on the Creator Fee Share value at race creation:

| Creator share | Treasury keeps | Creator receives |
|---------------|----------------|-------------------|
| 0% (default)  | 0.03 SOL        | 0                 |
| 50%           | 0.015 SOL       | 0.015 SOL         |
| 100%          | 0               | 0.03 SOL          |

The winner gets 0.97 SOL in every case.

## Where the creator share lands

* **SOL races.** The creator's share rides along with the existing rent return at race close. You don't need to claim anything separately — it lands in the creator's wallet the moment the race is fully settled.
* **SPL token races.** The creator's share is sent to the creator's Associated Token Account for that token. If they don't have one yet for the mint, it's created automatically as part of the claim transaction. Both legacy SPL Token and Token-2022 mints are supported, the same way as the rest of the [SPL flow](spl-tokens.md).
