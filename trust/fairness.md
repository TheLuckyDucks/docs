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

## What about cancellation?

If ORAO fails to deliver a seed within the platform's VRF timeout (~120 seconds), the race auto-cancels and refunds everyone. The smart contract enforces this timeout on chain; the backend cannot keep a race "pending" beyond it.

## What if I do not trust ORAO?

Read ORAO's audit reports, watch their on-chain operator set, or just observe that the seed is signed and the math is public. There is no scenario where the platform can substitute a seed it chose: the contract only accepts seeds signed by the ORAO program's authorized keys.

## What if the seed is biased?

ORAO uses a VRF scheme: the seed is the output of a one-way function over inputs (including the request transaction's slot) that the contract chooses. Nobody, not even ORAO, can predict the output before submitting. The output is unique per request and uniform across the possibility space.
