# Frequently asked questions

### Is this a real game or a casino?

It is a game with on-chain stakes. Skill matters less than in a typical skill-based competitive game (the outcome is random once boosts are equipped), but there is no house edge: the platform fee comes off the prize pool, the rest goes to players. If you spend more on entry fees than you win back over time, you are losing to other players, not to the platform.

### Do I need a Runner NFT to play?

No. You can join any race without a Runner. The Runner is only required to **create** advanced races (over 5 players, AI commentary, custom track or name, custom join timeout, custom race duration, hosting without playing, sponsored or private). Standard 2-to-5 player races with the default 30s duration work for everyone.

### Can I cancel a race I created?

Yes, while the join window is still open. Cancelling refunds every player their full entry and charges the creator a flat 0.05 SOL penalty (paid in SOL even on token races). Once a race has reached its start condition, it can no longer be cancelled. See [Hosting, cancelling, and refunds](../races/hosting-and-cancelling.md#cancelling-a-race).

### Can I create a race without joining it?

Yes, if you hold a Runner NFT. This is called hosting. The race opens with zero players and fills as others join. Hosting is not available for 1v1 races, and a host gives up the Creator Fee Share for that race. See [Hosting, cancelling, and refunds](../races/hosting-and-cancelling.md#host-a-race-without-playing).

### What is the smallest race I can run?

Two players for Winner Takes All. Three players for Podium Split. The race will not start with fewer.

### My race never started. Where is my money?

Stuck races automatically cancel after the join timeout passes without enough players, or after the VRF timeout (~120 seconds) if the oracle did not respond. In either case, you can claim a full refund from the Unclaimed Items banner on your player page or from the race detail modal.

### Can someone else claim my prize?

Anyone can submit the claim transaction, but the funds always go to the wallet that earned them. The signer of the claim tx is irrelevant to the destination.

### Why does the same race ID number sometimes skip?

Race IDs are bumped on chain whenever a rematch is proposed, including rematches that get declined or expire. A declined rematch closes its reserved PDA but the counter does not decrement, so race IDs may have gaps. This is normal.

### What is the on-chain cost of playing one race?

For a 0.01 SOL SOL race with no opt ins: roughly 0.000005 SOL in network fees + 0.01 SOL entry fee + 0.0017 SOL one-time stats account rent on your very first race. Total first-race spend: about 0.012 SOL.

### Can I see the outcome of a race before it ends?

Yes. Once ORAO has published the seed, the outcome is deterministic. Re-run the contract's simulation function on the seed and the participant list and you get the same ranking the canvas will eventually show. Most players prefer to wait and watch.

### Are races permissionless to start?

The first start path is the lobby filling naturally; that triggers the next transition automatically. The start-when-underfilled path is permissionless: any wallet can submit the start transaction once the join timeout has passed and the lobby has enough joiners. A backend cleanup worker submits this on schedule, but anyone else can race them to it.

Finalization works the same way with a small grace window: the backend wallet submits it once the race duration ends, and after a 10-second timeout it becomes permissionless to any participant: a fallback path that kicks in if the backend is unreachable.

### What happens if the website is down?

Your wallet still owns your funds. All claim, refund, and cancel actions are permissionless and can be submitted directly to the smart contract via any Solana RPC client. The website is a convenience layer over the chain, not an authority.

### Can I run my own client?

Yes. The smart contract is open and the IDL is published. Anyone can write a custom client (CLI, Discord bot, alternative web frontend) that interacts with it. The official frontend has no special permissions.
