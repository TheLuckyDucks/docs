# Tournaments

A tournament is a scheduled event in which **teams** compete over a fixed window for a single prize pot. You do not sign up and you do not pay to enter. You race as you normally would, and the races your [team](teams.md) runs during the window count toward its standing.

One tournament runs at a time. Its page shows the window, the rule it is scored on, the pot, and the live standings.

## What counts

A race counts toward your team's standing when it finishes inside the window and meets the tournament's conditions. Each tournament sets its own, and its page lists them:

- Races have to start after the tournament does. A race created earlier does not count even if it settles during the window.
- If the pot is denominated in a token, only races using that token count.
- A team may need a minimum number of members to qualify at all.
- Sponsored races, the ones somebody else paid for, are either included or excluded.

Only races that have finalized on chain count. One still in its lobby, waiting on randomness, or mid-run is not counted until it settles.

## Scoring

Every rule is a **per-player average**, so a large team does not win by size alone. Ten members racing once each score exactly what one member racing ten times scores.

| Family                                                     | Scored on                                                                                                           |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Wins, races, XP, SOL volume, token volume, podium finishes | The average per member, one rule per metric                                                                         |
| Weighted                                                   | Average wins at 60 percent plus average races at 40 percent                                                         |
| Duels                                                      | Points from 1v1 rematches, doubled against another team or a solo racer                                             |
| Worst results                                              | Most last places per member. The more you lose, the better                                                          |
| Creators                                                   | Most completed races created per member                                                                             |
| Biggest races                                              | Bigger lobbies score more, with a bonus for a mixed lobby                                                           |
| NFT and token rules                                        | Races per member, where races using a Boost, a Cosmetic, or the tournament's paired collection or token count twice |

The first family carries a **diversity bonus**: 10 percent per outside team or solo racer your team meets, averaged across your races. Racing only against your own members scores the least. The other rules already account for outside play, so they take no bonus.

Two teams that tie are separated by which was created first, and then by a fixed seed. There are no shared places.

## The pot and who gets it

The platform funds the pot when it creates the tournament, in SOL or in a [supported token](../economy/spl-tokens.md). Nothing is added during the window.

The **winning team takes all of it**, split equally between its members. There is no second or third place. A pot that does not divide exactly leaves a few lamports over, and the first winner in the list receives them.

A platform fee comes out of the pot before the split. It is set per tournament and cannot exceed 10 percent.

Standings are computed off the chain, which is what lets a rule change between tournaments without touching the program. The winners are then written on chain, and from that point the payout is the program's to make and nobody can alter the list.

## Claiming

Once the winners are locked in, a single transaction pays every one of them at once. Any winner can send it and the whole team gets paid, so the first of you to press Claim settles it for everybody. If you have turned on [playing without signing every action](../races/delegated-play.md), the platform can send it for you instead.

Whoever sends it, the money goes to the winners' own wallets. Paying the network fee does not entitle the sender to anything.

The Claim button shows your share and what it is worth. While a tournament is running that dollar figure follows the market; once it has ended it is fixed at the rate when it ended, so what you won does not appear to change afterwards. A tournament that ended without a usable price shows the amount and no dollar figure.

## Your team is frozen while a tournament runs

From the moment a tournament starts until it ends, teams cannot change: no creating one, no requesting to join, no adding, kicking, or leaving, and no deleting. A roster reshuffled mid-event would let a team collect points under one lineup and claim under another.

Build or join your team before a tournament starts. If a tournament is already running, the buttons are disabled until it ends.
