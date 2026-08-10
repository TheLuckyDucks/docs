# Teams

A team is a wallet group that competes together in **tournaments**. Members join races independently, but their results aggregate into a team standing for team-format tournaments.

There are no team-based events outside of tournaments at the moment. Teams exist for tournament competition specifically.

## Creating a team

From the Teams page, click Create Team. Pick a **name** and an **avatar**, then sign the creation transaction. You become the team's founder and first member.

A team holds up to **20 members**, the founder included, and can carry **20** pending join requests at a time. The team's page shows the cap and how many seats are left.

## Inviting members

Two paths:

1. **Direct invite**. The founder sends an invite to a specific wallet address. The recipient sees the invite in their inbox and can accept or decline.
2. **Open team**. The team can mark itself as open to join requests. Other players can request to join from the team's page. The founder approves or declines each request from the team admin panel.

## Joining requests inbox

Every player has a Join Requests inbox in the platform notifications. New requests appear with an Accept and a Decline button. The notification is left-anchored (separate from the right-anchored race action toasts) to avoid colliding during busy race-end sequences.

## Team standings in tournaments

Standings are computed off the chain, on one rule chosen when the tournament is created. Every rule is a **per-player average**, whether it counts wins, races, XP, volume, podiums, duels, last places, or races using a particular NFT, so a big team does not out-score a small one just by having more members. [Tournaments](tournaments.md#scoring) has the full set and the bonus for racing against outsiders.

Computing standings off the chain is what lets a new rule appear without upgrading the program. The winners are written on chain before anything is paid.

## Teams are frozen while a tournament runs

While a tournament is under way, nothing about any team can change. You cannot create one, request to join, add or kick a member, leave, or delete. A roster reshuffled mid-event would let a team earn points under one lineup and collect under another.

Sort your team out before a tournament starts. If one is already running, these buttons stay disabled until it ends.

## Disbanding

The team founder can disband the team at any time. Members are notified and the team's history is preserved (results from past tournaments stay attributable to it), but no new members can join and no new standings accumulate.

## Why teams over solo

A tournament pot goes to one team and is split between its members, so a team is the only way to win one. Everything else is the social side: agreeing which races to enter, comparing results, sharing what works.
