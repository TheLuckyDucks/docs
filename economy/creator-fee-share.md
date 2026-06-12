# Creator Fee Share

Creator Fee Share lets a race creator keep part of the platform fee at race end. It does not change what winners receive. It only changes where the platform's cut goes.

## What this changes (and what it doesn't)

* **Entry fees:** unchanged. Players still pay the same amount to join.
* **Winner payout:** unchanged. Winners still take home the prize pool minus the platform fee, split according to the race mode.
* **Platform fee total:** unchanged. Still pulled from the prize pool at the fee tier rate.
* **Where the platform fee goes:** this is the only thing that moves. Part of the fee can be redirected from the treasury to the race creator.

## Runner is the gate, Track is a bonus

The size of a creator's share depends on which NFTs were used to create the race.

* **Runner NFT.** Required for any creator share at all. A race created with a Runner (and more than 2 players) earns the Runner share, currently **40%** of the platform fee.
* **Track NFT.** Adds a bonus on top of the Runner share, currently **10%**. A Track NFT only counts when used together with a Runner. A Track on its own gives nothing.

The maximum possible share is therefore **50%** (Runner + Track). Without a Runner, the creator's share is always 0%, even if a Track was used.

| Race created with... | Creator share |
|----------------------|----------------|
| No Runner NFT (Track or not) | 0% |
| 1-v-1 race (2 players) | 0% |
| Runner NFT, more than 2 players | 40% (Runner) |
| Runner NFT plus Track NFT, more than 2 players | 50% (Runner + Track) |

The Runner and Track percentages are platform settings managed by the team. They can be tuned over time. New rates only apply to **new** races; races already created keep the share they snapshotted at creation.

## Which races qualify

Only regular Winner Takes All and Podium races. Creator Fee Share does **not** apply to:

* **1-v-1 races (2 players).** Excluded by design.
* **Sponsored races.** When the creator funds the prize themselves, they don't earn a cut of the platform fee on top of that. The treasury keeps the full fee.
* **Hosted races (creator did not join as a player).** A creator who [hosts without playing](../races/hosting-and-cancelling.md#host-a-race-without-playing) gives up the Creator Fee Share. Hosting and earning a share are separate paths.
* **Refunded or cancelled races.** No prize is claimed, so no fee is paid, so there's no share to pay out.

Rematches inherit whatever share was snapshotted on the original race, even if platform defaults have since changed.

## The snapshot rule

Each race captures the share it will use **at the moment of creation**. The captured value already combines Runner and Track if both are present. If the platform later changes the Runner or Track percentages, races already created stay on the old value.

This protects creators from surprise drops mid-race and keeps the math on any in-flight race fully predictable.

## A worked example

Say a Winner Takes All race has a 1 SOL prize pool. The fee tier at that pool size is 3% (see [Fees and prizes](fees-and-prizes.md#platform-fee-tiers)).

* Platform fee: `1 SOL × 3% = 0.03 SOL`
* Winner payout: `1 SOL - 0.03 SOL = 0.97 SOL` (always, regardless of creator share)

Depending on the NFTs used to create the race, the 0.03 SOL fee splits like this:

| Race created with... | Creator share | Treasury keeps | Creator receives |
|----------------------|---------------|----------------|-------------------|
| No Runner | 0% | 0.03 SOL | 0 |
| Runner | 40% | 0.018 SOL | 0.012 SOL |
| Runner + Track | 50% | 0.015 SOL | 0.015 SOL |

The winner gets 0.97 SOL in every case.

## Where the creator share lands

* **SOL races.** The creator's share rides along with the existing rent return at race close. There is no separate claim step. It lands in the creator's wallet the moment the race settles.
* **SPL token races.** The creator's share is sent to the creator's Associated Token Account for that token. If they don't have one for the mint yet, it's created automatically as part of the claim transaction. Both legacy SPL Token and Token-2022 mints are supported, the same way as the rest of the [SPL flow](spl-tokens.md).

## Tracking it

Two places surface the creator share:

* **On the race itself.** A race exposes `creatorFeeShareBps`, which is the combined Runner + Track value snapshotted at creation. The dApp uses this to show players what cut the creator earns for that specific race.
* **At payout.** A real-time event fires when the share is paid out at claim time, with the amount, the creator's wallet, and the transaction signature. The creator sees the payout immediately in their personal feed.

If the share is 0 (because no Runner was used, or the race is 1-v-1, or it was sponsored), no payout event is emitted, since there's nothing to pay.

## For administrators

The Runner and Track defaults live in the platform configuration as two separate values:

* `creatorFeeShareRunnerBps`: the Runner-only share, in basis points (10000 = 100%).
* `creatorFeeShareTrackBps`: the Track bonus added when both Runner and Track are used, also in basis points.

Both must be between 0 and 10000. Only the configuration owner can change them, and the new values only take effect for new races.

## Why this exists

It rewards the creators who use their NFTs to actually run races, not just hold them. A Runner holder who creates a lot of regular races contributes a lot of fee volume; this lets the platform pass some of that back automatically. Pairing it with a Track adds a small extra incentive to use the full NFT toolkit when creating.
