# Rematches

After a race ends, the winner can propose a rematch against the loser (or losers, in a multi-player race). The challenge stays open for a configurable window, and the rematch race is automatically created if accepted.

## Proposing

From the race summary after winning, click Propose Rematch. The interface shows the previous race's parameters as defaults: same entry fee, same race mode, same duration, same max players. Adjust if you want; the rematch is just another `create_race` call with the previous race's id stored as a reference.

The proposal carries a `rematchProposalTimeout` from the platform config (currently 45 seconds). The challenged players have that long to accept, decline, or let it expire.

## Accepting

The challenged player(s) see a Rematch Proposal notification on their player page and in the race detail modal of the original race. Accepting sends the entry fee for the rematch and triggers the rematch race to start.

## Declining

A player can explicitly decline. The rematch slot is reserved on chain at the moment of proposal, but on decline that race PDA is closed and rent refunds to the proposer.

## Letting it expire

If neither accept nor decline happens within the timeout, the rematch expires automatically. The rematch PDA closes and the proposer's funds are returned.

## Rematch chains

A rematch can be rematched. If the loser of the original is now the winner of the rematch, they can propose another rematch. This continues up to the platform's max rematch chain depth (currently 11 deep) before further rematches are locked.

The rematch chain shows up on each race in the chain as the "Rematch X of 11" indicator on the race card.

## Counter implications

Rematches reserve a fresh race id on chain even before they are accepted. This means the race counter increments on every rematch proposal, including ones that get declined or expire. Race ids may have gaps as a result. This is normal and not a bug: the gaps correspond to declined or expired rematches.

## Stat tracking

Rematches count as normal races for XP, win count, and other stats. A winner of three rematches in a row counts as three wins; a loser counts as three losses. The chain itself does not award a separate bonus, though some tournament rule sets do treat rematch chains specially.
