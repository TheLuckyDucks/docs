# Joining and playing

The race list updates in real time. New races appear at the top of the list and animate in. The card shows the entry fee, the prize pool, the current slot count, the duration, and any opt in badges (audio, custom track, runner only, sponsored).

## Joining

Tap a card to open the detail modal, then Join Race. The modal shows the participants list, the available NFT boosts in your wallet (if any), and the available cosmetics. Choose what you want to wear, sign the transaction, and your duck takes its slot.

You can also join straight from the card via the Join button when you do not need to customize.

The confirmation step asks where the entry fee comes from: your wallet, or a balance you have pre-funded. See [Your player vault](../economy/player-vault.md). If you have turned on [playing without signing every action](delegated-play.md), joining takes one tap and no wallet popup appears at all.

### Eligibility

Some races have join conditions beyond paying the entry fee. The detail modal calls out anything that applies to the race in front of you:

- **Verified only**. The race only accepts wallets that have completed Telegram, X, or Facebook verification.
- **Allowlist (invite only)**. The race only accepts wallets the creator added to the invite list (up to 20). If your wallet is not on the list, Join stays disabled and the modal tells you the race is invite only.
- **NFT Holders**. The race only accepts wallets holding at least a chosen number of NFTs from a chosen collection. The modal shows you the collection and threshold so you can check at a glance. If the collection is on another chain (Ethereum, Base, Polygon, and so on), the check runs against the external wallet you have linked to your profile; if you have not linked one, the join flow points you to that step first.
- **Token Holders**. The race only accepts wallets holding at least a chosen amount of a chosen token. The token does not have to be the race's prize token.
- **Minimum account age**. The race only accepts wallets whose player account is at least a certain age. Brand new players whose account is being created during the join transaction are always too young. If your wallet does not qualify, the Join button is disabled and the modal tells you why.

For the full reference on these gates, see [Race access and gating](access-and-gating.md).

### NFT boost selection

If you hold any Boost NFTs in the connected wallet, you can select one to attach to this race. The boost adds a small percentage to your duck's speed for this race only. Boost NFTs are not consumed: you can use the same boost in every race you join. See [Boost NFTs](../nfts/boosts.md).

### Cosmetic selection

Cosmetic NFTs change how your duck looks. Pick one from the cosmetic tab. If you do not own any cosmetics, your duck races in default plumage. Cosmetics are visual only and do not affect the outcome.

## During the lobby

The detail modal stays open while the lobby fills. Participants appear as they join, with their avatar, nickname, and any equipped NFT badges.

### Withdrawing

If you change your mind during the join window, click Withdraw. Two windows apply: you have to withdraw **within 2 minutes of your own join**, and the **last 60 seconds** of the lobby are locked for everyone. If you qualify, the vault refunds your full entry fee and a fixed **0.01 SOL** penalty is charged from your wallet to the platform (always in SOL, even on token races). See [Refunds and rent](../economy/refunds-and-rent.md#withdrawal-during-the-lobby) for the full rules.

## When the race starts

The lobby modal transitions to the canvas. A short loading screen plays while the audio (if any) finishes generating. The visual race lasts whatever duration the creator picked: ducks paddle, leap, occasionally somersault, all driven by the on chain seed.

## After

Winners can claim from the post race screen. If you finished first (WTA) or in the podium (Podium Split mode), the claim button appears with your payout amount. Click to sign. The funds arrive instantly, in your wallet by default or in your player vault if you have chosen to pool your winnings there.

If you lost, no claim is needed. The race archives itself automatically and the page returns to the lobby list.
