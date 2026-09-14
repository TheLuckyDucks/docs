---
icon: chart-pie
description: Winner Takes All or Podium Split, what each one pays, and why there are never any ties.
---

# Race modes

Two payout modes, picked when the race is created.

{% tabs %}
{% tab title="Winner Takes All (WTA)" %}
First place takes the whole prize pool, minus the platform fee. Everyone else gets nothing.

WTA is the canonical mode. Reach for it when you want the simplest payout, one winner and everyone else chasing that slot, or when the entry fee is large enough that splitting it three ways would leave podium places feeling thin.

A 5 player race with a 0.1 SOL entry fee has a 0.5 SOL pool. After the platform fee, the winner pockets roughly 0.45 SOL.
{% endtab %}

{% tab title="Podium Split" %}
The pool is divided between the top three:

- **1st place**: 50%
- **2nd place**: 30%
- **3rd place**: 20%

It needs at least 3 players, and the percentages are fixed on chain, so no race can change them.

Reach for it when you want more players to leave with something, or when the entry fee is moderate enough that three smaller payouts still matter.

A 10 player race with a 0.05 SOL entry fee has a 0.5 SOL pool. After the platform fee, the splits are roughly 0.225 / 0.135 / 0.09 SOL.
{% endtab %}
{% endtabs %}

<figure><img src="../../.gitbook/assets/races/app-race-cards-modes-banner.png" alt="Two race cards side by side, one badged Winner Takes All and one badged Podium Split"><figcaption><p>The mode is on the card, before you open the race.</p></figcaption></figure>

## Choosing between them

WTA is the sharper rush: one winner, total commitment. Podium Split pays out more often for less each time. Neither is better, and communities land differently: some run WTA only, others switch by lobby size.

## What if there are ties?

{% hint style="info" %}
There are none. The on chain seed produces a strict order, so two ducks can look level and the contract still has one winner.
{% endhint %}

## Refunds

If a race never finalizes, whether the oracle stuck or the lobby never reached 2 players in WTA or 3 in Podium Split, every participant can claim a full refund. Your fee is never held hostage by a stuck race. See [Refunds and rent](../economy/refunds-and-rent.md).
