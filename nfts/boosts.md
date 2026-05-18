# Boost NFTs

The only NFT collection that affects race outcomes. Equipping a Boost NFT when joining a race gives your duck a small speed advantage for that race.

## How the boost works

Each Boost NFT has a fixed `boost_bps` value baked into its on chain metadata. `bps` stands for basis points, where 100 bps = 1%. A boost of 80 bps adds 0.8% to your duck's effective speed.

The boost percentage is capped on chain at **100 bps (1%) maximum**. Even if a boost claims a higher value off chain, the contract clamps it to 1%. This keeps the impact bounded: a boost is an edge, not a guarantee.

## Stacking and selection

You can only equip one boost per race. If your wallet holds multiple boosts, the join modal shows them all in a picker and you choose which one to use. If you do not pick, the race runs without a boost.

Boost NFTs are **not consumed** on use. The same boost works in every race you join, forever. Wear and tear is not a concept here.

## Counter mechanics

A 1% boost over a 30 second race is small but meaningful. In a 5 player race where ducks finish within a few percent of each other, holding a 1% boost shifts the win probability noticeably.

There is no counter NFT. Boosts cannot be neutralized or stolen. The only way another player counters your boost is by holding their own.

## Verifying the badge

Joined participants in the lobby show a small boost badge next to their name if they equipped one. The badge color indicates the boost size (cooler colors for smaller boosts, hotter colors for bigger ones). You can see at a glance who is running with what.

## Why the cap

The 1% cap is on chain and intentional. If boosts stacked or scaled unboundedly, a wealthy player could dominate every race they joined. Capping at 1% means even the most expensive boost is a slight edge, not a sure thing. Skill (or luck, depending how you frame it) still does the heavy lifting.

## Acquiring

Same channels as the other collections: scheduled mints, marketplace listings, third party secondary. Boost floor prices track the overall game's activity.
