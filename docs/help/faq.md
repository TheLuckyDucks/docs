---
icon: circle-question
description: The questions players actually ask, ordered from the simple ones to the technical ones.
---

# Frequently asked questions

Ordered easiest first. The early answers are what a new player needs; the last few are for anyone who wants to see the machinery.

## Start here

Nothing below this heading assumes you know anything about crypto.

### Is this a real game or a casino?

A game with on-chain stakes. Skill matters less than in a competitive game, since the outcome is random once boosts are equipped, but there is no house edge: the platform fee comes off the prize pool and the rest goes to players. Spend more on entry fees than you win back and you are losing to other players, not to the platform.

### Can I lose more than my entry fee?

No. The entry fee is your whole stake, and a losing race costs you nothing beyond it. The only other charges are optional and avoidable: 0.01 SOL if you withdraw from a lobby you joined, 0.05 SOL if you cancel a race you created, and the network fee on whatever you sign.

### What is the on-chain cost of playing one race?

For a 0.01 SOL race with no opt ins: roughly 0.000005 SOL in network fees, the 0.01 SOL entry fee, and 0.0023 SOL of one-time player account rent on your very first race. About 0.0123 SOL all in, and the rent comes back if you ever close the account. Creating a race instead of joining one adds the race account's rent, which also returns when the race closes.

### Can I play on my phone?

Yes, and it is built for it. Link a social account and turn on [playing without signing every action](../races/delegated-play.md) and a whole session never opens your wallet app: one tap per join, claim or rematch. [Playing without your wallet app](../races/without-the-wallet-app.md) is the order to set it up in.

### Do I need a Runner NFT to play?

No. Any race is joinable without one. A Runner is for **creating** races past the basics: more than 5 players, AI commentary, X announcement, custom track, name, join timeout or duration, a minimum account age gate, no-boost mode, hosting without playing, sponsored races, and the Allowed Players allowlist.

Two gates are free: Verified Only and Token Holders. NFT Holders always needs a Runner, on every chain, and so does Allowed Players. Each free gate still has its own creator side check: be verified for Verified Only, meet your own threshold for Token Holders, on an approved token. See [Race access and gating](../races/access-and-gating.md).

### Do boosts make it pay to win?

Barely. A boost is capped at 1% on chain, which a direct simulation of the race engine puts at 1 to 2 percentage points of win rate, and a maxed boost still finishes last almost as often as an unboosted duck. If you would rather remove them entirely, sponsored races and no-boost races do. The numbers are on [Boost NFTs](../nfts/boosts.md).

## Playing

### What is the smallest race I can run?

Two players for Winner Takes All, three for Podium Split. Neither starts with fewer.

### Do I have to pre-fund a vault to play?

No. Paying from your wallet works as it always has. The [player vault](../economy/player-vault.md) is a convenience: top up once, then join without approving a transfer each time, and withdraw all of it whenever you like.

### What happens if I close the tab mid-race?

Nothing to the result. The outcome was fixed the moment the oracle published the seed, the race settles without you watching, and anything owed to you waits in the Unclaimed Items banner until you claim it.

## Creating and rematching

### Can I cancel a race I created?

While the join window is open, yes. Every player gets their full entry back and you pay a flat 0.05 SOL penalty, in SOL even on a token race. Once the race reaches its start condition it can no longer be cancelled. See [Hosting, cancelling, and refunds](../races/hosting-and-cancelling.md#cancelling-a-race).

### Can I create a race without joining it?

Yes, with a Runner NFT. That is hosting: the race opens empty and fills as others join. It is not available for 1v1, and a host gives up the Creator Fee Share for that race. See [Hosting, cancelling, and refunds](../races/hosting-and-cancelling.md#host-a-race-without-playing).

There is also a 30 second cooldown between creations from the same wallet, Runner or not.

### Do sponsored and host-mode races count against my daily limit?

No. Neither consumes any of your daily allowance, because neither seats you in the race. Offering and accepting a rematch each do, one per player. See [Daily races](../races/daily-races.md).

### Can I still rematch after my opponent declines?

No. A decline closes rematches on that race for good. Cancelling your own offer does not, so you can offer again while the window lasts. See [Rematches](../competition/rematches.md#cancelling-versus-declining).

### I offered a rematch and my opponent vanished. Are my funds locked?

No. Cancel the offer and your stake comes back, free of charge once their acceptance window has passed.

### Does a pending rematch stop me claiming my prize?

No, it is always claimable. The reverse is the trap: claiming first ends the chance of a rematch on that race, because the winner's next stake comes out of those unclaimed winnings. See [Rematches](../competition/rematches.md).

### Can I gate a race on an NFT collection from another chain?

Yes, with a Runner NFT, which this gate always needs. Pick the NFT Holders join setting and then the chain: Solana by default, or a supported chain such as Ethereum, Base or Polygon. Joiners link the external wallet holding the NFT once, and the check runs against it at join time. The race itself is unchanged, still on Solana with SOL or SPL prizes. See [NFT holders](../races/access-and-gating.md#nft-holders).

## When something goes wrong

### My race never started. Where is my money?

A race becomes refundable once the join timeout passes without enough players, or once the VRF timeout, about 3 minutes, passes with no seed from the oracle. Nothing fires by itself at that moment: the refund becomes possible and somebody has to submit it.

Races the platform created are swept automatically. A race a player created is deliberately left for its creator or any participant to close, because the platform does not close a race somebody else paid for. Either way it shows up in the Unclaimed Items banner on your player page, and the button there clears it.

One refund returns every stake in the lobby and closes the race, so triggering it clears the race for everyone rather than just for you.

### Can someone else claim my prize?

Anyone can submit the claim transaction, and the money still goes to the player who earned it, into their wallet or their player vault by their own payout setting. Whoever signs and pays for the transaction cannot change where it lands.

### If I let Lucky Ducks sign for me, can it take my money?

Not out of the platform. The permission covers playing: joining, creating, claiming, refunds, rematches and team actions. Withdrawing from your vault and closing your account need your wallet's signature, and the contract itself excludes them rather than a setting doing it.

What a misused permission could do is spend your vault balance on races you did not choose, or act on your teams. That is why the duration is yours to size, and why revoking is instant and always available. See [Playing without signing every action](../races/delegated-play.md).

### What happens if the website is down?

Your wallet still owns your funds. Claims, refunds and cancels are permissionless and can be submitted straight to the contract through any Solana RPC client. The website is a convenience over the chain, not an authority.

## Trust, and how it works underneath

From here on the answers assume a little more, and the last few are for anyone who wants to see the machinery.

### How do I know a race was fair?

Check it yourself. The seed came from an oracle account the platform does not own, the ranking is a deterministic function of that seed, and every transfer is on chain. [Verifying a race on-chain](../trust/verifying-a-race.md) walks through it in a block explorer, and takes about 3 minutes once you know what to click.

### Can I see the outcome before the race ends?

Yes. Once ORAO publishes the seed the outcome is fixed, so re-running the contract's simulation on that seed and the participant list gives the ranking the canvas will show. Most players would rather watch.

### Are races permissionless to start?

A lobby that fills triggers the next transition on its own. The start-when-underfilled path is permissionless: any wallet can submit the start transaction once the join timeout has passed and enough players are in. A backend worker does it on schedule, and anyone else can beat it there.

Finalization is permissionless from the moment the race duration has elapsed. The backend wallet normally submits it, but the instruction takes no signer at all, so anyone can step in if the backend is unreachable.

### Why ORAO for the randomness, and not Switchboard or another VRF?

Five reasons, and all of them matter more in a 30 second race than they would in a lending protocol that reads a price once an hour.

**Latency, because the seed gates the race.** The race moves `Open` to `VRFPending` and then waits: no seed, no start, so the oracle's response time is the player's waiting time. ORAO typically fulfils within seconds and usually inside a minute even under load, which is what keeps a full lobby from sitting there. The contract puts a hard edge on that wait at the VRF timeout, around 3 minutes, after which the race can only be refunded.

**Cost, per race and paid up front.** Randomness here is not a protocol-level subscription amortised over many reads. Each race buys its own, and the creator funds it: the VRF cost is transferred into the race vault by the create transaction, so the race can pay the oracle at request time whether or not it ever fills. At around 0.00275 SOL that stays cheap enough to run races all day. See [Fees and prizes](../economy/fees-and-prizes.md#other-costs-at-creation).

**A request model that is one account, owned by the oracle.** Requesting creates a single randomness account through a CPI to the ORAO program, and ORAO's own fulfilment authority writes the seed into it. The account belongs to ORAO's program rather than to Lucky Ducks, which is exactly what makes the seed checkable by a stranger and unchangeable by us. Fewer moving parts than a queue with cranks to keep alive, and one account address to hand a sceptic. [Verifying a race on-chain](../trust/verifying-a-race.md) walks that check.

**Devnet parity, and a test suite that includes the oracle.** The same program and the same oracle run on devnet, and the local test suite clones the ORAO program so a race runs end to end, randomness included, before anything reaches mainnet. An oracle that only really exists on mainnet would mean shipping the riskiest step untested.

**Support that answers.** When an oracle does misbehave, the question is how quickly a human helps. ORAO's team has been fast to respond, which is worth more than a feature table at the moment a race is stuck.

None of it asks you to trust ORAO, which is the point of [Provable randomness](../trust/fairness.md): the seed is signed, the account is theirs rather than ours, and the maths on top is public.

### Why do race ID numbers sometimes skip?

Race IDs are bumped on chain whenever a rematch is proposed, including one that gets declined or expires. A declined rematch closes its reserved account but the counter does not go back, so gaps are normal.

### Can I run my own client?

Yes. The contract is open and the IDL is published, so a CLI, a Discord bot or an alternative frontend can all talk to it. The official frontend holds no special permissions.

{% hint style="info" %}
Not here? Ask on Telegram or X. [Social networks](social-networks.md) has every channel, and the [Glossary](glossary.md) covers any term on this page you have not met yet.
{% endhint %}
