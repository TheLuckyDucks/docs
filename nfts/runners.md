# Runner NFTs

The access pass collection. Holding a Runner NFT in your wallet unlocks the advanced race creation features that are otherwise hidden.

## What it unlocks

* **Max players > 5**. The default cap is 5 (any non-Runner can create races up to 5 slots). Runner holders can create races up to 20 slots.
* **AI commentary**. The per second narration track only opens to Runner holders.
* **Custom race duration**. The default 30 second duration is available to everyone; picking anything else (up to 5 minutes) requires a Runner.
* **Custom join timeout**. The 1 minute to 1 week slider only appears for Runner holders.
* **Custom name**. Naming a race in the lobby list.
* **Start when underfilled**. The opt in to let the race launch with fewer than max players.
* **Higher daily creation limit**. Non-Runner verified players can create 50 races per day. Runners can create 500.
* **Host without playing**. Create a race that opens with zero players and waits for others to join, without taking a slot yourself. See [Hosting, cancelling, and refunds](../races/hosting-and-cancelling.md).
* **Sponsored race**. Fund the prize pool yourself instead of asking joiners to.
* **Allowed Players (allowlist) race**. Restricting joins to an invite list of up to 20 wallets. The allowlist itself counts as a customization.
* **Minimum account age gate**. Requiring joiners to have a player account at least a certain age.

## What Runner is not required for

Three of the four gated join settings can be hosted **without** a Runner NFT, provided the race stays on default settings otherwise. Each has its own creator side check (see [Race access and gating](../races/access-and-gating.md)):

* Verified Only requires the creator to be verified themselves.
* NFT Holders requires the gating collection to be on the platform's approved list, and the creator to hold at least the minimum number of items themselves at auto join time.
* Token Holders requires the gating token to be on the platform's approved list, and the creator to hold at least the minimum amount themselves at auto join time.

Allowed Players is the exception among the gates: it still requires a Runner.

The Runner NFT is also what unlocks the [Creator Fee Share](../economy/creator-fee-share.md) on a race, even when the gate itself does not require it.

## What it does not do

Runners are not boosts. They do not change your duck's speed. They do not give you a head start. They do not affect outcomes in any race you join, only what features you can use when creating.

## Acquiring

* New Runner mints drop occasionally. Check the homepage banner or Telegram.
* Secondary market on Tensor, MagicEden, or the Lucky Ducks in app marketplace.
* Floor price moves with demand. The collection is intentionally small to keep the holder set tight.

## Verifying you have one

When you connect a wallet that holds a Runner, the Create Race modal shows full options. When you connect a wallet that does not, the gated options are dimmed with a "🏃 Runner NFT" chip and a slightly reduced opacity. The modal still opens, you can still create standard races, you just cannot use the unlocked features.

## Borrowing or renting

Runner NFTs are transferable Solana assets. There is no on-platform rental flow, but nothing stops you from arranging an over-the-counter loan with another holder. The contract only checks "is this NFT in the wallet signing the tx" at the moment of `create_race`; the same NFT can move freely between wallets between races.
