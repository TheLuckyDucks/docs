---
icon: rotate-right
description: A rematch of the 1v1 you just finished, at the stake its creator set from same stakes to double or nothing, what the proposer picks, and why nobody is ever stuck.
---

# Rematches

When a 1v1 ends, either player can offer a rematch, played for the stake the race's creator set: anything from the same stake again to double or nothing. Whoever wins the rematch takes its pot. The offer sits on the prize claim screen so you do not go looking for it.

<figure><img src="../../.gitbook/assets/competition/app-rematch-offer-banner.png" alt="The prize claim screen with an Offer Rematch button beside the claim button"><figcaption><p>Claiming and rematching are the same stop.</p></figcaption></figure>

## What can be rematched

A finished 1v1 you played in. Sponsored races cannot be rematched, and neither can a race whose prize has already been claimed. Token races rematch exactly like SOL ones.

{% hint style="warning" %}
**Claim the prize and the rematch goes with it.** The winner's stake in the next race is the prize still sitting in the old race, so once it is paid out there is nothing to roll forward and the program refuses the offer. Rematch first, or claim and start a fresh race.
{% endhint %}

## The rematch stake

Whoever creates a paid 1v1 sets what its rematches are played for with the **Rematch Stake** slider on the create form, from ×1 to ×2 in steps of ×0.05. Any creator can, no Runner NFT needed. Each rematch stakes the entry fee of the race before it times that multiplier, so the pot grows by it at every rematch. The slider starts at ×1.25, and at ×2 rematches are double or nothing. Under it a curve shows how the pot grows over a full chain at the multiplier you set: point at a rematch, or tap it, to read its pot and each player's stake in the race's currency. The race details show the multiplier a 1v1 uses, so you know before you join, and every rematch of the chain keeps it.

| Multiplier                | What each player stakes                     | What the winner takes          | Paid out when the rematch is accepted     |
| ------------------------- | ------------------------------------------- | ------------------------------ | ----------------------------------------- |
| **×2**, double or nothing | the whole pot of the last race              | twice that, so the pot doubles | nothing                                   |
| **×1.5**                  | one and a half of the last race's entry fee | the pot grows by half          | the rest of the winner's prize, less fees |
| **×1**, same stakes       | the race's entry fee                        | 2 entry fees, every time       | the rest of the winner's prize, less fees |

A lower multiplier is the cheaper way to keep playing: the pot still grows, more slowly, and the winner banks the rest of their prize each time. At ×1 every rematch costs what the first race did. From ×1.75 up the create form warns you how much the last rematch of a full chain would stake, because a multiplier compounds: at ×2 a tenth rematch would stake over a thousand times the first entry fee.

Two windows also apply, both short and both platform settings, so the app is where to read them: you have a window from the finish to make the offer, and your opponent then has their own window to answer it.

## Offering a rematch

Click Offer Rematch on the claim screen. That creates the next race and puts your stake in it:

- **Winner.** Your stake comes out of the prize you have not claimed and stays where it is. Your opponent matches it when they accept.
- **Loser.** You deposit the stake up front. The winner's stake joins it when they accept.

At ×2 your stake is the whole prize, so the new pot is twice the old one: a race of 2 entry fees is rematched for 4, and that rematch for 8. No fee is taken when it is accepted; the pot pays its fees once, when the last race of the chain is claimed. Below ×2 your stake is the entry fee times the multiplier, so at ×1.5 a race of 2 entry fees is rematched for 3, and when it is accepted the winner is paid the rest of their prize, less the platform fee and the jackpot fee. The amount on the button is what you are putting in, and the note beside it says what the winner takes. Offering uses one of your [daily races](../races/daily-races.md).

## What the proposer picks

The new race's entry fee is the stake: the entry fee of the race before it times the multiplier, the whole pot at ×2. It inherits the duration, join setting, the multiplier, [no-boost mode](../nfts/boosts.md#no-boost-races) and every customization the old one had. Four things are yours to change:

| At propose time     | What it does                                                                                                                                                     |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **AI commentary**   | On or off regardless of what the finished race had, 1v1 included. You deposit the [audio cost](../economy/fees-and-prizes.md#other-costs-at-creation) now        |
| **X announcement**  | Posts the rematch publicly, for a flat non-refundable cost paid now. See [X announcement](../races/advanced-options.md#x-announcement)                           |
| **Your Track NFT**  | Pick one and the rematch uses it. Pick none and the rematch keeps whatever Track the last race had                                                               |
| **Your Runner NFT** | Nothing to pick. The app uses the Runner in your wallet on its own, and it lifts your [daily allowance](../races/daily-races.md). AI commentary needs one anyway |

The name carries over with a `#N` suffix, so "Duel" becomes "Duel #2", then "Duel #3".

<figure><img src="../../.gitbook/assets/competition/app-rematch-proposer-options-banner.png" alt="The rematch proposal dialog with the commentary, announcement, track and runner choices"><figcaption><p>Four choices are yours. The rest is inherited from the race you just played.</p></figcaption></figure>

## Accepting

Accepting inside the window starts the new race. If the winner made the offer, the loser deposits the match as they accept. There is no separate claim to make. At ×2 nothing is paid out, since the finished race's prize is the winner's stake in the new one. Below ×2 the stake stays in and the rest of the prize is paid to the winner, less fees. It uses one of the accepter's daily races.

## Cancelling versus declining

These look alike and are not.

**You cancel your own offer.** It clears, but rematches on that race stay open, so you can offer again while the window lasts.

**Your opponent declines.** That closes rematches on that race for good. Neither of you can offer again.

{% hint style="warning" %}
Cancelling while your opponent can still accept costs the same fixed penalty as [leaving a lobby](../economy/refunds-and-rent.md#withdrawal-during-the-lobby). Once their window has passed it is free, so waiting a moment is worth it if you are not in a hurry.
{% endhint %}

## Nobody is ever stuck

- The proposer can cancel at any moment.
- The opponent can decline at any moment.
- Once the acceptance window passes, anyone at all can clear the offer, and the proposer is refunded in full.
- Until one of those happens, the offered race is closed to everything else: nobody can join it, and it cannot be cancelled or refunded like an ordinary race.

## Rematch chains

A rematch can be rematched, up to the platform's maximum chain depth, at the same multiplier. At ×2 the pot doubles at every step and at ×1.5 it grows by half, so the stakes of a chain climb fast: read the amount on the button before you offer or accept. At ×1 it stays at 2 entry fees. Each card carries a Rematch #N badge saying how far down the chain it is, and a chain keeps the windows the first race was created with.

<figure><img src="../../.gitbook/assets/competition/app-rematch-chain-indicator-banner.png" alt="A race card carrying a Rematch #1 badge beside its race number"><figcaption><p>How far down the chain this race is.</p></figcaption></figure>

No-boost mode is inherited all the way down, so a rematch cannot sneak boosts back into a level match.

Each proposal and each acceptance spends a daily race, per player. Worth knowing if you rematch a lot: a long chain eats your day faster than fresh races do.

Each offer also takes the next race number, and one that is declined or expires does not give it back. That is why race numbers sometimes skip.

## Stat tracking

Rematches count as normal races for XP, wins and everything else. Three in a row is three wins for one player and three losses for the other. The chain itself pays no bonus, though some tournament rules treat rematch chains specially.
