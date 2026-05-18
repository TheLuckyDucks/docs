# Teams

A team is a wallet group. Members can join races independently, but their results aggregate into a team standing for team-format tournaments and weekly leaderboards.

## Creating a team

From the Teams page, click Create Team. Pick a name and a short description, and sign the creation transaction. You become the team's founder and first member.

The maximum team size is **10 members** (including the founder). The maximum number of pending join requests at any one time is **20**.

## Inviting members

Two paths:

1. **Direct invite**. The founder sends an invite to a specific wallet address. The recipient sees the invite in their inbox and can accept or decline.
2. **Open team**. The team can mark itself as open to join requests. Other players can request to join from the team's page. The founder approves or declines each request from the team admin panel.

## Joining requests inbox

Every player has a Join Requests inbox in the platform notifications. New requests appear with an Accept and a Decline button. The notification is left-anchored (separate from the right-anchored race action toasts) to avoid colliding during busy race-end sequences.

## Team standings

Team standings work off chain. Aggregation rules are set when the tournament is created (or for weekly leaderboards, set by the platform). Common formats include:

* **Sum of member XP**. Each member's individual XP earned during the window adds to the team total.
* **Top N XP**. Only the top N members' XP counts, encouraging team selection for performance.
* **Average XP**. Mean across all members, penalizing inactive members.
* **Custom**. Per tournament custom weighting.

## Disbanding

The team founder can disband the team at any time. Members are notified and the team's history is preserved (results from past tournaments stay attributable to it), but no new members can join and no new standings accumulate.

## Why teams over solo

Teams are mostly for the social and aspirational side of competition. Coordinating with other players on which races to enter, comparing weekly results, sharing strategies. The platform does not currently award team-only prize pools, but team-based tournaments do.
