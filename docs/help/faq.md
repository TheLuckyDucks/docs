---
icon: circle-question
description: The questions players actually ask, ordered from the simple ones to the technical ones.
---

# Frequently asked questions

Ordered easiest first. The early answers are what a new player needs; the last few are for anyone who wants to see the machinery.

## Start here

Nothing below this heading assumes you know anything about crypto.

### Is this a real game or a casino?

A game with on-chain stakes. The result of a race is random, so nothing you do during one changes it, but there is no house edge: the platform fee comes off the prize pool and the rest goes to players. Spend more on entry fees than you win back and you are losing to other players, not to the platform.

### Can I lose more than my entry fee?

No. The entry fee is your whole stake, and a losing race costs you nothing beyond it. The only other charges are optional and avoidable: a small penalty if you withdraw from a lobby you joined or cancel a race you created, and the network fee on whatever you sign. See [Refunds and rent](../economy/refunds-and-rent.md).

### What is the on-chain cost of playing one race?

The entry fee, a small network fee on what you sign, and on your very first race a one-time deposit for your player account, which comes back if you ever close it. Creating a race instead of joining one adds a few small creation costs and the race account's rent, which also returns when the race closes. [Fees and prizes](../economy/fees-and-prizes.md) and [Refunds and rent](../economy/refunds-and-rent.md) have the figures.

### Can I play on my phone?

Yes, and it is built for it. Link a social account and turn on [playing without signing every action](../races/delegated-play.md) and a whole session never opens your wallet app: one tap per join, claim or rematch. [Playing without your wallet app](../races/without-the-wallet-app.md) is the order to set it up in.

### Does my wallet sign the transactions the app sends?

Yes, with nothing to set. Wallets that support Solana's newer v1 transactions (Phantom and Solflare, for example) sign that format, and others use the older format automatically. If a wallet fails a v1 transaction, the app retries that action in the older format, which can mean a second approval, and keeps to it for the rest of your session.

### Do I need a Runner NFT to play?

No. Any race is joinable without one. A Runner is for **creating** races past the basics, such as a bigger lobby, a longer race or a sponsored prize. [Runner NFTs](../nfts/runners.md) lists everything it unlocks, and [Race access and gating](../races/access-and-gating.md) says which join settings need one.

### Do boosts make it pay to win?

Barely. A boost is a small edge with a cap the contract enforces, and a maxed boost still finishes last almost as often as an unboosted duck. If you would rather remove them entirely, sponsored races and no-boost races do. The numbers are on [Boost NFTs](../nfts/boosts.md).

## Playing

### What is the smallest race I can run?

Two players for Winner Takes All, three for Podium Split. Neither starts with fewer. See [Race modes](../races/race-modes.md).

### Do I have to pre-fund a vault to play?

No. Paying from your wallet works as it always has. The [player vault](../economy/player-vault.md) is a convenience: top up once, then join without approving a transfer each time, and withdraw all of it whenever you like.

### What is the jackpot fee on my race?

A share of the race's prize pool that goes into [the jackpot](../competition/jackpot.md), a pot won whole by one of the top players of each period. It is separate from the platform fee and shown before you sign. [Fees and prizes](../economy/fees-and-prizes.md#the-jackpot-fee) has the rest: when it is taken, and how a creator switches it off.

### What happens if I close the tab mid-race?

Nothing to the result. The outcome was fixed the moment the oracle published the seed, the race settles without you watching, and anything owed to you waits in the Unclaimed Items banner until you claim it.

## Creating and rematching

### Can I cancel a race I created?

While the join window is open, yes. Every player gets their full entry back and you pay a flat penalty in SOL. Once the race reaches its start condition it can no longer be cancelled. See [Hosting, cancelling, and refunds](../races/hosting-and-cancelling.md#cancelling-a-race).

### Can I create a race without joining it?

Yes, with a Runner NFT. That is hosting: the race opens empty and fills as others join. It is not available for 1v1, and a host gives up the Creator Fee Share for that race. See [Hosting, cancelling, and refunds](../races/hosting-and-cancelling.md#host-a-race-without-playing).

There is also a short cooldown between creations from the same wallet, Runner or not. See [Daily races](../races/daily-races.md).

### Do sponsored and host-mode races count against my daily limit?

No. Neither consumes any of your daily allowance, because neither seats you in the race. Offering and accepting a rematch each do, one per player. See [Daily races](../races/daily-races.md).

### Can I still rematch after my opponent declines?

No. A decline closes rematches on that race for good. Cancelling your own offer does not, so you can offer again while the window lasts. See [Rematches](../competition/rematches.md#cancelling-versus-declining).

### I offered a rematch and my opponent vanished. Are my funds locked?

No. Cancel the offer and your stake comes back, free of charge once their acceptance window has passed.

### Does a pending rematch stop me claiming my prize?

Only while the offer is open, because the program holds the prize until the offer is settled. Accepting rolls the finished race's prize into the rematch with no claim at all, and a decline, a cancel or clearing an expired offer makes it claimable again. The reverse is the trap: claiming first ends the chance of a rematch on that race, because the winner's next stake is that unclaimed prize. See [Rematches](../competition/rematches.md).

### Can I gate a race on an NFT collection from another chain?

Yes, with a Runner NFT, which this gate always needs. Pick the NFT Holders join setting and then the chain. Joiners link the external wallet holding the NFT once, and the race itself is unchanged, still on Solana. See [NFT holders](../races/access-and-gating.md#nft-holders).

## When something goes wrong

### My race never started. Where is my money?

Still yours, and refundable. A race that never started shows up in the Unclaimed Items banner in the top bar, on every page, and the button there returns every stake in the lobby. [Refunds and rent](../economy/refunds-and-rent.md#full-refund-on-race-cancellation-or-expiration) says when a race becomes refundable and who can submit the refund.

### Can someone else claim my prize?

Anyone can submit the claim transaction, and the money still goes to the player who earned it, into their wallet or their player vault by their own payout setting. Whoever signs and pays for the transaction cannot change where it lands.

### If I let The Lucky Ducks sign for me, can it take my money?

Not out of the platform. The permission covers playing, and the contract itself excludes withdrawing from your vault and closing your account: those need your wallet's signature. What a misused permission could do is spend your vault balance on races you did not choose, or act on your teams, which is why its duration is yours to size and revoking is instant. See [Playing without signing every action](../races/delegated-play.md).

### What happens if the website is down?

Your wallet still owns your funds. Claims and refunds need nobody's permission, a cancel needs only its creator's signature, and all of them can be sent straight to the contract with any tool that reaches Solana. The website is a convenience over the chain, not an authority.

## Trust, and how it works underneath

From here on the answers assume a little more, and the last few are for anyone who wants to see the machinery.

### How do I know a race was fair?

Check it yourself. The seed came from an oracle account the platform does not own, the ranking is a deterministic function of that seed, and every transfer is on chain. [Verifying a race on-chain](../trust/verifying-a-race.md) walks through it in a block explorer.

### Can I see the outcome before the race ends?

Yes. Once ORAO publishes the seed the outcome is fixed, so re-running the contract's simulation on that seed and the participant list gives the ranking the canvas will show. Most players would rather watch. See [Provable randomness](../trust/fairness.md#anyone-can-predict-the-outcome-early).

### Can anyone start or finish a race?

Yes, once its moment has come. Starting an underfilled race and finalizing a race both need nobody's permission: the backend normally sends them, and any wallet can step in if it does not. See [How a race works](../introduction/how-it-works.md#3-start).

### Why ORAO for the randomness, and not Switchboard or another VRF?

Because the seed gates the race: it has to arrive within seconds, cost little enough to buy for every race, and sit in an account the platform does not own. [Provable randomness](../trust/fairness.md#why-orao) gives the reasons in full, and none of them asks you to trust ORAO.

### Why do race ID numbers sometimes skip?

A rematch offer takes the next race number, and one that is declined or expires does not give it back, so gaps are normal. See [Rematches](../competition/rematches.md#rematch-chains).

### Can I run my own client?

Yes. The contract is open and the IDL is published, so a CLI, a Discord bot or an alternative frontend can all talk to it. The official frontend holds no special permissions.

{% hint style="info" %}
Not here? Ask on Telegram or X. [Social networks](social-networks.md) has every channel, and the [Glossary](glossary.md) covers any term on this page you have not met yet.
{% endhint %}
