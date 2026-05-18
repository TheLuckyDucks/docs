# Tournaments

Scheduled competitive events that aggregate race results into a leaderboard. Tournaments run for a fixed duration (24 hours to 30 days) with rules set when the tournament is created.

## How they work

Every race played during the tournament window counts toward the tournament if the participating wallet is registered for the event. Race results feed into a tournament leaderboard. At the end of the window, the prize pool is split among the top finishers according to the prize structure.

## Rule sets

Tournaments use one of several rule sets, set when the tournament is created:

* **XP**. Players earn XP per race played, win or lose, with bonuses for wins and podium finishes. Highest XP at the end wins.
* **Wins**. Pure win count. Most wins during the window wins the tournament.
* **Losses**. The dark mirror: most losses wins (yes really, for the irony tournaments).
* **Custom**. The tournament creator can layer in custom multipliers and bonuses.

The leaderboard standings are computed off chain by the backend. Off chain leaderboards keep the rule sets flexible without needing a smart contract upgrade for every new tournament format.

## Prize pool

The pool comes from one of two sources:

* **Sponsored**. The tournament creator funds the pot upfront. Players join for free.
* **Buy in**. Each player pays a registration fee that pools into the prize.

The pool sits in an on chain tournament vault and is paid out to winners by a permissionless claim after the tournament ends.

## SPL token claims

Tournament prizes can be denominated in SOL or any supported SPL token. SPL token claims work like SOL claims: anyone can submit the claim transaction on a winner's behalf; the prize always goes to the winner's wallet. The wire format for SPL claims interleaves the wallet and the destination ATA in a flat list, not segmented blocks.

## Standings update cadence

The leaderboard updates every few minutes during the tournament window. The race results that count toward the tournament are the ones already finalized on chain. Pending races (still in lobby, VRF pending, racing) are not counted until they finalize.

## Active tournament indicator

When a tournament is active, the platform shows a tournament badge in the header and on race cards. Joining a race during the window automatically counts you, no separate registration needed (in most rule sets; sponsored tournaments may require a one-time signup tx).
