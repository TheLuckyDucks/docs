---
icon: plus
description: The Create Race form choice by choice, from entry fee and lobby size to duration, mode and every opt in.
---

# Creating a race

Open the Create Race modal from the main page. The form is organized top to bottom in the order you usually fill it in.

{% columns %}
{% column width="70%" %}

<figure><img src="../../.gitbook/assets/races/app-create-race-form-desktop.png" alt="The Create Race modal showing the entry fee field with its currency picker, max players, duration and race mode"><figcaption><p>The required choices sit at the top of the form, the opt ins below them.</p></figcaption></figure>
{% endcolumn %}

{% column width="30%" %}

<figure><img src="../../.gitbook/assets/races/app-create-race-form-mobile.png" alt="The Create Race modal showing the entry fee field with its currency picker, max players, duration and race mode, on a phone"><figcaption><p>On a phone</p></figcaption></figure>
{% endcolumn %}
{% endcolumns %}

## Required choices

### Entry fee

The amount each player pays to join. Denominated in SOL by default, or any supported SPL token (legacy or Token-2022 like USDC, USDT, etc... more will be added over time). The minimum is 0.001 SOL or the equivalent token amount. The maximum is 10 SOL.

The platform fee on the prize pool scales with the entry fee: 10% on tiny pots, dropping to 2% on large ones. See [Fees and prizes](../economy/fees-and-prizes.md) for the full tier table.

### Max players

How many seats the lobby has. The default cap is 5, the absolute max is 20. Anything past the default cap requires you to hold a Runner NFT in the connected wallet. See [Runner NFTs](../nfts/runners.md).

### Race duration

How long the visual race takes. 30 seconds to 5 minutes. Shorter races are punchier, longer races give more time for the audio commentary to develop a story if you opt in to it.

{% hint style="warning" %}
The default minimum duration (30 seconds) is available to everyone. **Picking any other value requires a Runner NFT in the connected wallet**, the same way the join timeout slider does. Without a Runner the duration field is locked at 30s. See [Runner NFTs](../nfts/runners.md).
{% endhint %}

### Race mode

{% tabs %}
{% tab title="Winner Takes All" %}
The first place finisher gets the entire prize pool, minus the platform fee. Cleanest format for small races.
{% endtab %}

{% tab title="Podium split" %}
The pot is split 50/30/20 between first, second, and third. Requires at least 3 players. Better for big lobbies.
{% endtab %}
{% endtabs %}

## Optional opt ins

These are off by default. Most need a Runner NFT to enable.

- **AI commentary**. A funny per second narration track generated on the fly. Adds a small cost per race second.
- **X announcement**. Post the race to Lucky Ducks' X (Twitter) account so it's advertised outside the app. Small flat cost, non-refundable. See [Advanced options](advanced-options.md#x-announcement).
- **Custom join timeout**. Default is 1 hour; you can shorten or extend it.
- **Custom name**. Show a race title (up to 32 characters) in the lobby list.
- **Custom track**. Use a Track NFT you own as the race background.
- **Start when underfilled**. Permit the race to launch with fewer than max players once the join timeout passes. See [Advanced options](advanced-options.md).
- **Host without playing**. Create the race without taking a slot as a player. Not available for 1v1 races, and the host gives up the Creator Fee Share. See [Hosting, cancelling, and refunds](hosting-and-cancelling.md).
- **Sponsored race**. Pay the prize pool yourself instead of asking players to. Useful for community giveaways.
- **No-boost race**. Disable boost NFTs for everyone in this race, including yourself. See [No-boost races](../nfts/boosts.md#no-boost-races).
- **Join setting (who can join)**. Open by default. Switch to Verified Only, NFT Holders, or Token Holders to gate the race without needing a Runner. Allowed Players (invite list of up to 20 wallets) is also available but requires a Runner. See [Race access and gating](access-and-gating.md).
- **Minimum account age**. Require joiners to have a player account at least a certain age. Useful for keeping fresh wallets out. Defaults to 24 hours when enabled. See [Advanced options](advanced-options.md#minimum-account-age).

## Sign and submit

The cost box at the bottom totals everything you will pay: entry fee, oracle fee (\~0.0035 SOL), archival fee (\~0.0001 SOL), any opt in costs, and the rent for the race PDA itself. Rent is fully refunded when the race ends. After signing, the race appears in the lobby and the join timer starts.

{% columns %}
{% column width="70%" %}

<figure><img src="../../.gitbook/assets/races/app-create-race-cost-breakdown-desktop.png" alt="The cost breakdown box at the foot of the create form, itemising entry fee, oracle fee, archival fee and rent"><figcaption><p>Every line you are about to pay, before you sign. The rent line comes back when the race closes.</p></figcaption></figure>
{% endcolumn %}

{% column width="30%" %}

<figure><img src="../../.gitbook/assets/races/app-create-race-cost-breakdown-mobile.png" alt="The cost breakdown box at the foot of the create form, itemising entry fee, oracle fee, archival fee and rent, on a phone"><figcaption><p>On a phone</p></figcaption></figure>
{% endcolumn %}
{% endcolumns %}

{% hint style="success" %}
Part of the platform fee comes back to you if you race in your own race. No NFT is needed to earn it, and each NFT you bring adds more. See [Creator Fee Share](../economy/creator-fee-share.md).
{% endhint %}

{% content-ref url="advanced-options.md" %}
[advanced-options.md](advanced-options.md)
{% endcontent-ref %}
