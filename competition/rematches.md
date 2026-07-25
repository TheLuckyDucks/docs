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

## What the proposer picks

Most of the new race is inherited from the one it follows: entry fee, race duration, join setting, no-boost mode, and any customization the original race had. The proposer can adjust three things independently at propose time:

* **AI commentary.** You can add audio commentary to a rematch even if the finished race did not have it, and you can drop it even if the finished race did. Audio is supported for any race size, **including 1v1**. The audio cost (per second times duration) is deposited by the proposer at propose time, same as on a fresh race. See [audio cost](../economy/fees-and-prizes.md#other-costs-at-creation).
* **X announcement.** Post the rematch publicly to Lucky Ducks' X account. Picked independently at propose time, whether or not the finished race had it. Flat 0.005 SOL cost, deposited by the proposer at propose time. See [X announcement](../races/advanced-options.md#x-announcement).
* **Your Track NFT.** If you hold a Track NFT and pass it, the rematch uses it as the visual background. If you skip it, the rematch keeps whichever Track (if any) the previous race used.
* **Your Runner NFT.** Attach it to lift your daily race allowance ceiling (500 with a Runner vs 50 without). It is optional; without it, the rematch still goes through but counts against the standard allowance. AI commentary itself always requires a Runner in the proposer's wallet, so if you enable audio you are attaching a Runner anyway.

The rematch inherits the race name with a " #N" suffix (where N is the rematch number in the chain), so a race called "Duel" becomes "Duel #2", "Duel #3", and so on.

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
