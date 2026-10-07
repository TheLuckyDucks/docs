---
icon: sack-dollar
description: A pot of SOL and tokens that races pay into, won whole by one of the top players of each period. Who is entered, how the winner is picked and how the prize is claimed.
---

# The jackpot

The jackpot is a pot of SOL and tokens that builds up from races and is won, whole, by one of the top players of each period. There is no ticket to buy. You enter by racing well enough to finish the period near the top.

## Where the pot comes from

Every race that pays out sends a share of its prize pool to the pot, in the currency the race was run in: SOL from a SOL race, the token from a token race. That share is the jackpot fee. It sits beside the platform fee, and winners receive the pool less both. [Fees and prizes](../economy/fees-and-prizes.md#the-jackpot-fee) has the arithmetic.

- **The platform sets the rate**, never above 10% of a pool. It can be zero, which stops races feeding the pot without touching what is already in it.
- **A race's creator can switch it off for that race**, on the create form. A race that does not feed the jackpot shows no jackpot mark, and its winners keep that share.
- **It is fixed when a race is created.** A later change never reprices a race you have already joined, and every race shows its rate before you sign.
- **A refund, a cancelled race and a tournament prize pay none.**

Anyone can also send SOL or a supported token straight to the pot, which is how a sponsor tops it up.

{% hint style="success" %}
Nobody can withdraw the pot, the platform included. It leaves one way only: as the prize of a draw, less the oracle fee for that draw's random number.
{% endhint %}

## Who is entered

Each period, players are ranked on what they did in it, and the top of that ranking become the finalists. The Jackpot tab shows the rules in force beside the live standings.

| Rule             | What it decides                                                                |
| ---------------- | ------------------------------------------------------------------------------ |
| Period           | How often the pot is drawn: every day, every week or every month               |
| Ranked by        | XP earned in races, races won, or races lost                                   |
| Races that count | Any mix of paid SOL races, paid token races and sponsored races of either kind |
| Finalists        | How many of the top players are entered, from 1 to 50                          |
| Who is eligible  | A minimum number of races in the period, and optionally verified players only  |

Two players level on the ranking are separated by age: whoever has been on the platform longer places higher.

A rule change applies from the next period, never to the one being played.

### Why not every player is entered

The jackpot is for players who are racing now. If every account ever created went into the draw, most of the entries would belong to accounts nobody uses any more, and a pot built by this period's races could go to a player who last raced months ago. So only what you did during the period counts, and the program itself refuses a finalist who has not raced since the period began.

{% hint style="warning" %}
A finalist needs a player account that raced during the period. Close yours before the draw and you cannot be named, whatever your rank.
{% endhint %}

## How the winner is picked

When the period ends, the platform writes the finalists on chain and, in the same transaction, asks ORAO for a random number, the same provable source [every race uses](../trust/fairness.md). The list is public before the number exists, so it cannot be chosen to fit a result.

When the number arrives, a published formula turns it into one position in that list. The finalist in that position wins. Anyone can send that transaction, so nobody can sit on a result.

With the rules set to a single finalist there is no draw. The period's top player wins the pot.

**There is no minimum pot.** A draw runs when its period ends, whether the pot is large, mostly tokens, or small after a quiet week.

{% hint style="info" %}
The ranking is computed off chain, like tournament standings, which is what lets the rules change between periods. What the chain guarantees is everything after it: the list is fixed before the randomness, the pick follows from the two, and the prize cannot go to anyone but that finalist.
{% endhint %}

## Claiming the prize

A jackpot is claimed, like a race prize. Win one and the Jackpot tab shows a Claim button, and the prize appears with your other unclaimed winnings.

- **You receive everything the pot held**: its SOL and every token, each in its own currency.
- **It lands in your wallet or your player vault**, following the same [payout target](../economy/player-vault.md#where-your-winnings-land) your race prizes use.
- **A token you have never held needs a token account**, the small deposit Solana asks to keep one open, about 0.002 SOL each at today's rate. The claim opens it and you pay it. It is yours, and comes back if you ever close the account.
- **A pot with many tokens is claimed in several transactions.** The app sends them in order and tells you how many are left.

{% hint style="success" %}
There is no deadline. An unclaimed prize waits for you, and nobody else can take it: anyone may send the claim, but the money can only go to the winner.
{% endhint %}

## When a draw waits

- **Nobody qualified, or the pot is empty.** The draw moves back a day at a time and the period stays open, so the standings keep counting until it runs.
- **The random number never arrives.** It is asked for again, for the same finalists.

## Following along in Telegram

`/jackpot` in a group with the bot shows the pot, the next draw, the rules and the leaders. Groups also get a post when a period starts and another when the winner is drawn. See [The Lucky Ducks Telegram bot](../help/telegram-bot.md#jackpot-announcements).

## Checking a draw yourself

Past winners on the Jackpot tab carry two links for every draw: the transaction that drew the winner, and a public archive of the draw holding its finalists in ranked order, the random number and the winner. With those and the formula below, anyone can recompute who should have won.

<details>

<summary>The formula, for anyone who wants to recompute a draw</summary>

Take the 64 bytes ORAO published for the draw, append the text `jackpot_winner` and the draw's number as 8 little-endian bytes, and hash the result with SHA-256. Read the first 8 bytes of the hash as a little-endian number and divide by the number of finalists. The remainder is the winner's position in the list, counting from zero.

The draw's number is part of the hash so that 2 draws could never share an outcome by sharing a random number.

</details>
