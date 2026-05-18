# NFT collections

Lucky Ducks ships four NFT collections, each with a different purpose. All four use the Metaplex Core standard on Solana, are tradable on the Lucky Ducks marketplace and on third party marketplaces (Tensor, MagicEden), and are verifiable through the platform: race actions check whether the connected wallet holds an asset from the appropriate collection.

## The four collections

| Collection | Purpose | Affects race outcome? |
|------------|---------|-----------------------|
| **Runners** | Unlock advanced race features | No |
| **Boosts** | Add a small speed advantage | Yes |
| **Tracks** | Custom race backgrounds | No |
| **Cosmetics / Ducks** | Visual customization of your duck | No |

Only the Boosts collection mechanically affects who wins. The rest are about access (Runners), customization (Tracks, Cosmetics), or both.

## How NFT detection works

When you create or join a race, the page scans the connected wallet for assets matching the relevant collection's verified creator pubkey. If at least one valid asset is found, the relevant features unlock in the UI. Scans are cached for a few minutes; if you just transferred an NFT in and the page hasn't picked it up, refresh the wallet adapter to retrigger.

The smart contract independently verifies the NFT is in the wallet at the moment of the transaction. The frontend cannot fake this check.

## Where to acquire

* **Mints**. New collections drop periodically. Mint links appear on the homepage and in the Telegram announcement channel.
* **Marketplace**. The in-app marketplace lists every Lucky Ducks NFT currently for sale. Filter by collection.
* **Third party**. Tensor and MagicEden list the same NFTs. Buying from a third party works identically to buying in-app, the NFT lands in the same wallet.

## What about royalties

Boosts, Runners, and Tracks ship without enforced royalties at the moment. The Cosmetics collection has royalty enforcement enabled via the Metaplex Core Royalties plugin. Creator royalties feed back into platform development.

## Next

Read the per collection pages for what each NFT actually does:

* [Runner NFTs](runners.md)
* [Boost NFTs](boosts.md)
* [Track NFTs](tracks.md)
* [Cosmetic NFTs](cosmetics.md)
