# Creating a race

Open the Create Race modal from the main page. The form is organized top to bottom in the order you usually fill it in.

## Required choices

### Entry fee

The amount each player pays to join. Denominated in SOL by default, or any supported SPL token (USDC, USDT, more added over time). The minimum is 0.001 SOL or the equivalent token amount. The maximum is 10 SOL.

The platform fee on the prize pool scales with the entry fee: 10% on tiny pots, dropping to 2% on large ones. See [Fees and prizes](../economy/fees-and-prizes.md) for the full tier table.

### Max players

How many seats the lobby has. The default cap is 5, the absolute max is 20. Anything past the default cap requires you to hold a Runner NFT in the connected wallet. See [Runner NFTs](../nfts/runners.md).

### Race duration

How long the visual race takes. 30 to 180 seconds, in 15 second steps. Shorter races are punchier, longer races give more time for the audio commentary to develop a story if you opt in to it.

### Race mode

* **Winner Takes All (WTA)**. The first place finisher gets the entire prize pool, minus the platform fee. Cleanest format for small races.
* **Podium split**. The pot is split 50/30/20 between first, second, and third. Requires at least 3 players. Better for big lobbies.

## Optional opt ins

These are off by default. Most need a Runner NFT to enable.

* **AI commentary**. A funny per second narration track generated on the fly. Adds a small cost per race second.
* **Custom join timeout**. Default is 1 hour; you can shorten or extend it.
* **Custom name**. Show a race title in the lobby list.
* **Custom track**. Use a Track NFT you own as the race background.
* **Start when underfilled**. Permit the race to launch with fewer than max players once the join timeout passes. See [Advanced options](advanced-options.md).
* **Sponsored race**. Pay the prize pool yourself instead of asking players to. Useful for community giveaways.
* **Private race**. Restrict joins to a wallet allowlist you provide.

## Sign and submit

The cost box at the bottom totals everything you will pay: entry fee, oracle fee (\~0.0035 SOL), archival fee (\~0.0001 SOL), any opt in costs, and the rent for the race PDA itself. Rent is fully refunded when the race ends. After signing, the race appears in the lobby and the join timer starts.
