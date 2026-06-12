# Hosting, cancelling, and refunds

This page covers three related things a creator can do with a race they made: host it without playing, cancel it during the join window, or let it expire if nobody shows up.

## Host a race without playing

Normally the person who creates a race also joins it as the first player. You can instead **host** a race without playing. The race opens with no players and fills as others join.

A few things to know about hosting:

* You need a Runner NFT to host a race this way. See [Runner NFTs](../nfts/runners.md).
* Hosting is not available for 1v1 races.
* A host does not earn the [Creator Fee Share](../economy/creator-fee-share.md). Hosting and earning a share of the platform fee are separate paths, and a host gives that share up.
* You can still join your own race later while the join window is open. Once you join, you are treated as a normal player. If the race is then cancelled or expires, you get your full entry back like anyone else.

Hosting is useful for community events, tournaments where the organizer should not also be a participant, or any time you want to put up a race for others without taking a slot yourself.

## Cancelling a race

Only the creator can cancel a race, and only while the join window is still open.

When you cancel:

* Everyone who joined, including you if you joined, gets their full entry back.
* You pay a small fixed penalty in SOL that goes to the platform.

The penalty is a flat amount, currently **0.05 SOL**. It is the same whether the race is a SOL race or a token race, and it does not change with the size of the pot. For a token race the penalty is still paid in SOL.

You cannot cancel a race that is already ready to start. If your race was set to [start when underfilled](advanced-options.md#start-when-underfilled) and enough players have joined to reach that point, the race goes ahead instead of being cancelled.

The penalty exists so cancelling stays a deliberate action, not a casual one. Joiners committed real funds when they signed up; the small SOL charge keeps creators from yanking races on a whim.

## When a race expires

If the join window passes and the race never filled or started, it can be refunded. Refunding an expired race is permissionless: anyone can trigger it, not just the creator.

When a race expires and is refunded:

* Every player gets their full entry back.
* If you hosted a race and never joined it, there is nothing to refund to you on the entry side, since you never paid an entry. Any leftover value from setting up the race (rent, unused opt-in costs) still comes back to you.
* There is no penalty once the race has expired. The penalty only applies while the join window is open.

A race that nobody joined is simply closed when it expires. No penalty, no fanfare.

## Quick comparison

| Situation | Who triggers | Player refund | Creator penalty |
|-----------|--------------|---------------|------------------|
| Withdraw during lobby | The player themselves | Entry minus 0.01 SOL flat penalty | Not applicable (creator unaffected) |
| Creator cancels during lobby | Creator only | Full entry returned | 0.05 SOL flat |
| Race expires (join window passes unfilled) | Anyone, permissionless | Full entry returned | None |

For everything else around money flow (rent, surcharges, where to find pending refunds) see [Refunds and rent](../economy/refunds-and-rent.md).
