---
icon: person-running
description: Taking a slot in someone else's race, with eligibility, boosts, cosmetics, withdrawing and claiming.
---

# Joining and playing

The race list updates live, newest at the top. Each card carries the entry fee, prize pool, slots taken, duration and any opt in badges: audio, custom track, runner only, sponsored.

## Joining

Tap Join on a race card, or open the race and tap Join there. Either way the join dialog opens, with the race at the top, a Boost tab listing the Boost NFTs in your wallet and a Duck tab listing your cosmetics. Pick what you want to bring, sign, and your duck takes its slot.

{% columns %}
{% column width="70%" %}

<figure><img src="../../.gitbook/assets/races/app-race-detail-modal-desktop.png" alt="The race modal for a lobby you have joined, with its prize pool, seats taken, entry fee and duration"><figcaption><p>A lobby you are in: the pool, the seats, the fee and the duration.</p></figcaption></figure>

{% endcolumn %}

{% column width="30%" %}

<figure><img src="../../.gitbook/assets/races/app-race-detail-modal-mobile.png" alt="The race modal for a lobby you have joined, with its prize pool, seats taken, entry fee and duration, on a phone"><figcaption><p>On a phone</p></figcaption></figure>

{% endcolumn %}
{% endcolumns %}

The confirmation asks where the entry fee comes from: your wallet, or a balance you pre-funded. See [Your player vault](../economy/player-vault.md). With [playing without signing every action](delegated-play.md) on, joining is one tap and no wallet popup appears at all.

### Eligibility

Some races ask for more than the entry fee, and the modal spells out whatever applies:

- **Verified only.** Wallets that have completed Telegram, X or Facebook verification.
- **Allowlist (invite only).** Only the wallets the creator invited, up to 20. Off the list, Join stays disabled and the modal says the race is invite only.
- **NFT Holders.** A minimum number of NFTs from a chosen collection, both shown so you can check at a glance. If the collection lives on another chain, such as Ethereum, Base or Polygon, the check runs against the external wallet linked to your profile, and the join flow sends you to link one first if you have not.
- **Token Holders.** A minimum amount of a chosen token, which need not be the race's prize token.
- **Minimum account age.** A player account at least a certain age. A brand new account created during the join transaction is always too young, and the modal says so rather than failing silently.

[Race access and gating](access-and-gating.md) is the full reference.

<figure><img src="../../.gitbook/assets/races/app-gated-race-join-disabled-banner.png" alt="A gated race with Join disabled and the requirement stated above it"><figcaption><p>Whatever a race asks for, the modal says it before you sign.</p></figcaption></figure>

### NFT boost selection

Hold any Boost NFTs and you can pick one, adding a small percentage to your duck's speed for that race. Boosts are never consumed, so the same one works in every race you join. See [Boost NFTs](../nfts/boosts.md).

<figure><img src="../../.gitbook/assets/nfts/app-boost-picker-banner.png" alt="The boost picker in the join modal, each boost showing its percentage"><figcaption><p>One boost per race, and it is never consumed.</p></figcaption></figure>

### Cosmetic selection

Cosmetics change how your duck looks, picked from the cosmetic tab. Own none and your duck races in default plumage. They are visual only and change no outcome.

<figure><img src="../../.gitbook/assets/nfts/app-cosmetic-picker-banner.png" alt="The cosmetics tab in the join modal with one skin selected and a preview of the duck"><figcaption><p>Visual only, and it changes nothing a race decides.</p></figcaption></figure>

### Your Runner NFT

Nothing to pick, and nothing to switch on. Joining never needs a Runner, and if you hold one the app reads it from your connected wallet by itself, which is what raises your [daily race allowance](daily-races.md). There is no control for it in the join modal because there is no choice to make. See [Runner NFTs](../nfts/runners.md).

## During the lobby

The modal stays open while the lobby fills, and participants appear as they join with their avatar, nickname and any NFT badges.

{% columns %}
{% column width="70%" %}

<figure><img src="../../.gitbook/assets/races/app-lobby-participants-desktop.png" alt="The race modal while the lobby fills, participants listed with avatars, nicknames and NFT badges"><figcaption><p>Players appear as they join, and the modal stays open throughout.</p></figcaption></figure>

{% endcolumn %}

{% column width="30%" %}

<figure><img src="../../.gitbook/assets/races/app-lobby-participants-mobile.png" alt="The race modal while the lobby fills, participants listed with avatars, nicknames and NFT badges, on a phone"><figcaption><p>On a phone</p></figcaption></figure>

{% endcolumn %}
{% endcolumns %}

### Withdrawing

Changed your mind? Click Withdraw. Two windows apply: **within 2 minutes of your own join**, and never in the **last 60 seconds** of the lobby, which is locked for everyone.

{% hint style="warning" %}
The vault then refunds your full entry fee and charges a fixed **0.01 SOL** penalty from your wallet, always in SOL even on token races. [Refunds and rent](../economy/refunds-and-rent.md#withdrawal-during-the-lobby) has the full rules.
{% endhint %}

<figure><img src="../../.gitbook/assets/races/app-withdraw-button-banner.png" alt="The withdraw button in the race modal with the time left on it"><figcaption><p>Live for 2 minutes after your own join, and dead in the last minute of the window.</p></figcaption></figure>

## When the race starts

The modal gives way to the canvas, after a short loading screen if audio is still generating. The race runs for whatever duration the creator picked, every paddle and somersault driven by the on chain seed.

## After

Finish first in Winner Takes All, or on the podium in Podium Split, and the claim button appears with your payout on it. Click to sign and the money arrives at once, in your wallet by default or in your player vault if you pool your winnings there.

<figure><img src="../../.gitbook/assets/races/app-claim-prize-banner.png" alt="The post race screen with the payout amount on the claim button and the finishing order beside it"><figcaption><p>The button carries the amount. Where it lands is your own payout setting.</p></figcaption></figure>

Lost? Nothing to do. The race archives itself and the page returns to the lobby list.

{% content-ref url="../economy/player-vault.md" %}
[player-vault.md](../economy/player-vault.md)
{% endcontent-ref %}
