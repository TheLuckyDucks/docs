# Rematches

After a 1v1 race ends, either player can offer a rematch. The offer sits in the prize claim UI so you do not have to go looking for it: the same screen that lets you claim the payout is where you propose the rematch.

Rematches roll your stake forward instead of paying everything out and asking you to buy back in.

## Offering a rematch

Click Offer Rematch from the prize claim screen on a 1v1 race. This creates the next race and puts your entry fee into it.

Behind the scenes:

* If you are the winner, your stake in the new race is exactly **one entry fee**, taken from your unclaimed winnings. The rest of the payout, minus the platform fee, goes to you when your opponent accepts. You do not need to claim the finished race separately.
* If you are the loser, you deposit one entry fee up front. Your opponent's stake is added when they accept.

Either way, the rematch pot is exactly 2 entry fees, matching the race it followed.

Offering a rematch uses one of your daily races (see [Daily races](../races/daily-races.md)).

## Accepting

Your opponent has a fixed acceptance window to accept. If they accept:

* The finished race pays out immediately to the winner: no separate claim needed.
* The new race starts.

Accepting also uses one of the accepter's daily races.

## Cancelling versus declining

These two look similar in the UI, but they behave differently on chain.

**You cancel your own offer.** The offer clears but the rematch chain on that race stays open. You can offer again, to the same opponent, for as long as the rematch window is still open.

**Your opponent declines.** That closes rematches on that race for good. Neither of you can offer again.

If you cancel while your opponent still has time to accept, a **0.01 SOL** withdrawal penalty applies (the same fixed penalty as withdrawing from a lobby). Once their acceptance window has passed, cancelling is **free**. If you are close to that point and not in a hurry, waiting a bit costs nothing.

Non-participants can also clear an abandoned offer, but only after the acceptance window has expired. This is a safety net; typically the proposer clears their own or the opponent declines first.

## Nobody is ever stuck

* The proposer can cancel at any moment.
* The opponent can decline at any moment.
* After the acceptance window, anyone at all can clear the offer, refunding the proposer in full.
* Your prize from the original race is **never** held hostage by a pending rematch. You can claim it whenever you like even while a rematch offer sits open.

## Rematch chains

A rematch can be rematched. This continues up to the platform's max rematch chain depth (currently **10 deep**) before further rematches are locked. The rematch chain shows up on each race in the chain as the "Rematch X of 10" indicator on the race card.

Rematches inherit the settings of the race they follow, including [no-boost mode](../nfts/boosts.md#no-boost-races) if the original race had boosts disabled. A no-boost rematch chain stays no-boost all the way down.

Rematches use one of each player's daily races per proposal-and-accept cycle. Worth knowing if you rematch a lot: your day's budget goes further when you play fresh races than when you run a long rematch chain.

## Stat tracking

Rematches count as normal races for XP, win count, and other stats. A winner of three rematches in a row counts as three wins; a loser counts as three losses. The chain itself does not award a separate bonus, though some tournament rule sets do treat rematch chains specially.
