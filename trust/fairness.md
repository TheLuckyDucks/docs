# Provable randomness

The most important property of Lucky Ducks is that the platform cannot pick a winner. Here is how that works.

## The actor: ORAO Verifiable Random Function (VRF)

ORAO is a Solana-native randomness oracle. When the smart contract needs a random seed for a race, it sends a `request` transaction to the ORAO program. ORAO operators (a distributed set of network participants) compute the response, sign it with their VRF keys, and write the signed seed back to Solana.

The signed seed is publicly verifiable: anyone can check that the seed was produced by the right key over the right inputs. ORAO cannot retroactively change a seed once published.

## How the seed becomes a winner

Once the seed is on chain, the race outcome is deterministic. The Lucky Ducks smart contract has a fixed simulation function: given the seed, the participant list, and the boost values, it computes a strict ranking from first to last.

This function runs in the visual canvas (so the duck animation matches the on-chain truth) and in the on-chain finalization (so the prize payouts match what the canvas showed). The two simulations are identical.

## Anyone can predict the outcome early

This is intentional. Once ORAO publishes the seed and before the race duration elapses, anyone watching the chain can run the same math the contract will run and know who wins. The visual race is just delivery: the math is already done.

The backend deliberately delays the finalization transaction until the race duration has passed so the suspense survives for casual viewers. The backend wallet submits it once the timer ends, and after a 10-second grace window any participant can submit it as a fallback (see [How a race works](../introduction/how-it-works.md#5-finalization)). If you genuinely want to know early, you can. Most players prefer to watch.

## What if the seed never arrives?

The contract splits the waiting period at a single instant: the VRF timeout, around two minutes from the moment the race is waiting on randomness. Before that instant the race can only start. From that instant on, it can only be refunded. Exactly one of the two is possible at any moment, and the contract enforces the boundary, so the backend cannot keep a race pending past it.

Nothing fires on its own when the deadline passes. The race does not auto-cancel; the refund simply becomes possible, and anyone can submit it. The platform sweeps races it created itself, and leaves a race a player created for that player or any participant to close, because closing a race somebody else paid for is not the platform's call. Either way the race appears in your Unclaimed Items as soon as it is refundable.

**A refund returns every stake in one transaction and closes the race.** Nobody can refund only themselves.

That is the part that matters for fairness, and it is why the refund cannot open one moment earlier than the start becomes impossible. The seed is public the instant it lands on chain, so if the two windows overlapped, a player could read the result, dislike it, and exit instead of paying the winner. Because the windows meet exactly and a refund is all or nothing, the worst anyone can do is void a race that was already too late to run, and that returns their own stake along with everyone else's.

## What if I do not trust ORAO?

Read ORAO's audit reports, watch their on-chain operator set, or just observe that the seed is signed and the math is public. There is no scenario where the platform can substitute a seed it chose: the contract only accepts seeds signed by the ORAO program's authorized keys.

## What if the seed is biased?

ORAO uses a VRF scheme: the seed is the output of a one-way function over inputs (including the request transaction's slot) that the contract chooses. Nobody, not even ORAO, can predict the output before submitting. The output is unique per request and uniform across the possibility space.
