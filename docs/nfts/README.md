---
icon: images
description: Four collections, what each one changes, how the platform detects them, and where to get one.
---

# NFT collections

Four collections, each with its own job. All four are Metaplex Core assets on Solana, tradable on the Lucky Ducks marketplace and on Tensor and MagicEden, and race actions check the connected wallet for the right one.

## The four collections

| Collection            | Purpose                           | Affects race outcome? |
| --------------------- | --------------------------------- | --------------------- |
| **Runners**           | Unlock advanced race features     | No                    |
| **Boosts**            | Add a small speed advantage       | Yes                   |
| **Tracks**            | Custom race backgrounds           | No                    |
| **Cosmetics / Ducks** | Visual customization of your duck | No                    |

{% hint style="info" %}
Only Boosts touch who wins. The rest are access (Runners) or looks (Tracks, Cosmetics).
{% endhint %}

## How NFT detection works

Creating or joining a race scans your connected wallet for assets from the relevant collection, and one valid asset unlocks the matching features. Scans cache for a few minutes, so if you just transferred an NFT in and the page has not noticed, reconnect your wallet or reload the page.

{% hint style="success" %}
The contract checks the NFT is in the wallet at the moment of the transaction, independently of the page. The frontend cannot fake it.
{% endhint %}

## Where to acquire

- **Mints.** New collections drop periodically, announced on the homepage and in Telegram.
- **Marketplace.** The in-app marketplace lists every Lucky Ducks NFT for sale, filterable by collection.
- **Third party.** Tensor and MagicEden carry the same NFTs, and buying there lands the asset in the same wallet.
- **Mystery Boxes.** Sealed boxes that open into a random reward from the matching collection. See [Mystery Boxes](mystery-boxes.md).
- **Renting.** Some tiers rent by the day. The NFT sits in your wallet and works normally for the term, then returns on its own. See [Renting an NFT](renting.md).

{% columns %}
{% column width="70%" %}

<figure><img src="../../.gitbook/assets/nfts/app-marketplace-collections-desktop.png" alt="The in-app marketplace filtered by collection, showing listings for each of the four collections"><figcaption><p>The in-app marketplace, filtered by collection.</p></figcaption></figure>

{% endcolumn %}

{% column width="30%" %}

<figure><img src="../../.gitbook/assets/nfts/app-marketplace-collections-mobile.png" alt="The in-app marketplace filtered by collection, showing listings for each of the four collections, on a phone"><figcaption><p>On a phone</p></figcaption></figure>

{% endcolumn %}
{% endcolumns %}

## What about royalties

The reward collections carry the Metaplex Core Royalties plugin because the standard wants it there, and the rate on it is **zero**. So no royalty is taken when you sell, on this marketplace or any other: what a buyer pays is what you receive, minus whatever that marketplace charges.

## Next

What each collection actually does:

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th><th data-hidden data-card-cover data-type="files"></th></tr></thead><tbody><tr><td><strong>Runner NFTs</strong></td><td>The access pass. Unlocks advanced race creation and lifts your daily allowance.</td><td><a href="runners.md">runners.md</a></td><td><a href="../../.gitbook/assets/nfts/nft-card-runners.png">nft-card-runners.png</a></td></tr><tr><td><strong>Boost NFTs</strong></td><td>The only collection that affects outcomes, capped at 1% on chain.</td><td><a href="boosts.md">boosts.md</a></td><td><a href="../../.gitbook/assets/nfts/nft-card-boosts.png">nft-card-boosts.png</a></td></tr><tr><td><strong>Track NFTs</strong></td><td>Custom scenery for a race you create. Visual only.</td><td><a href="tracks.md">tracks.md</a></td><td><a href="../../.gitbook/assets/nfts/nft-card-tracks.png">nft-card-tracks.png</a></td></tr><tr><td><strong>Cosmetic NFTs</strong></td><td>Wearable duck skins, and your platform avatar.</td><td><a href="cosmetics.md">cosmetics.md</a></td><td><a href="../../.gitbook/assets/nfts/nft-card-cosmetics.png">nft-card-cosmetics.png</a></td></tr><tr><td><strong>Mystery Boxes</strong></td><td>Sealed boxes that open into a random reward from a themed pool.</td><td><a href="mystery-boxes.md">mystery-boxes.md</a></td><td><a href="../../.gitbook/assets/nfts/nft-card-mystery-boxes.png">nft-card-mystery-boxes.png</a></td></tr><tr><td><strong>Renting an NFT</strong></td><td>Pay by the day, race with it, and it returns on its own.</td><td><a href="renting.md">renting.md</a></td><td><a href="../../.gitbook/assets/nfts/nft-card-renting.png">nft-card-renting.png</a></td></tr></tbody></table>
