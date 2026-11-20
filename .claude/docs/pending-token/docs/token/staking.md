---
icon: seedling
description: Stake a token at a fixed APY, each deposit on its own lock, and take each stake back whole when its lock ends.
---

# Staking

Stake a token into a pool and earn its fixed yearly rate, its APY, every second you are staked. Each deposit is a stake of its own, with its own lock, and comes back whole when its lock ends, or sooner for a penalty where the pool allows it.

{% columns %}
{% column width="70%" %}

<figure><img src="../../.gitbook/assets/token/app-staking-pools-desktop.png" alt="The staking page: each pool with its APY, its lock, its fees, how much is staked and the rewards it has generated"><figcaption><p>Every pool's terms, side by side, before you stake.</p></figcaption></figure>

{% endcolumn %}

{% column width="30%" %}

<figure><img src="../../.gitbook/assets/token/app-staking-pools-mobile.png" alt="The staking page: each pool with its APY, its lock, its fees, how much is staked and the rewards it has generated, on a phone"><figcaption><p>On a phone</p></figcaption></figure>

{% endcolumn %}
{% endcolumns %}

## Pools

Each pool has a name, on its tab, and stakes one token and pays its rewards in that same token, in another token, or in SOL. The Lucky Ducks token's pools are listed first. A pool's card shows everything that decides what you earn and what you pay: its APY, its lock, whether you can leave early and at what penalty, its fees, its minimum stake, its caps, how much is staked and by how many stakers (out of how many it allows, on a dial, where it limits them), and the rewards it has generated so far.

**The APY is fixed when the pool is created and never changes.** Your stake earns it whatever others stake or withdraw. A pool that pays in another token or in SOL pays at a fixed rate per token staked, which its card shows as what a year earns per token: for example, a pool at 10% paying 0.0001 SOL a year for each token staked.

A pool may cap how much it holds in all and how much one wallet may stake in it, how many stakes one wallet may hold open, how many wallets may stake in it, and the largest single deposit. The stake form shows the caps a pool sets and the room left under them. If you hold the most stakes a pool allows, merge some once their locks end to make room.

## Viewing your position with X

If you have linked your X account to your wallet in the Lucky Ducks app, you can sign in with X instead of connecting a wallet: open the sign-in screen from the wallet button and press X. The page then shows the stakes, rewards and figures of the wallet your X account is linked to, whatever wallet app your browser has connected. Signing in with X only lets you look: to stake, claim, compound, unstake or merge, connect that same wallet, which signs each of them. Signing in with X cannot create an account or link one; link it from your wallet in the Lucky Ducks app first. Sign out from the wallet button.

## Staking

Choose a pool, enter an amount and sign. Each deposit becomes a stake of its own.

- **The deposit fee**, where the pool charges one, is taken from what you deposit, and what is left is your stake. The pool's minimum is on what you deposit, before the fee: deposit the minimum and the stake is that, less its fee.
- **The lock** is the pool's lock at the moment you stake: your stake is locked until then, counted from its own deposit. A later change to the pool's lock does not move a stake already made. A pool with no lock lets you leave at any time.
- **A token that takes a fee on every transfer** credits you what arrives after it.

The form shows the fee, what will be credited and when the lock ends, before you sign.

Your first stake in a pool opens your staker account there, which records your stakes and the rewards you are owed, and each stake keeps a small record of its own. Each takes the small SOL deposit Solana requires to keep an account open: a stake's comes back when you unstake it or merge it, and the staker account's when you close it.

<figure><img src="../../.gitbook/assets/token/app-staking-stake-form-banner.png" alt="The stake form: the amount, the deposit fee, what will be credited and when the lock ends"><figcaption><p>The fee, what is credited and the lock's end, before you sign.</p></figcaption></figure>

## Rewards

Rewards build up every second, on each stake at the pool's APY, until the stake's lock ends. **After that, a stake earns nothing until you claim or compound it**: claiming or compounding a stake whose lock has ended starts a new period, locking it again for the pool's lock from that moment, and it earns again. Each stake's card says where it stands: **Locked**, with a countdown to its lock's end; **Ended**, once its lock has run out and it has stopped earning; or **Unlocked**, in a pool with no lock. Before you sign, the page shows which stakes a claim or a compound would lock again and until when. To take a stake out instead, unstake it: an unstake never locks anything again, and what the stake earned stays yours to claim. A stake in a pool with no lock earns without end.

Under your position's figures, a chart shows what you will be able to claim over the next lock period, or the next year in a pool with no lock, if you change nothing: it steps up on each date one of your stakes' lock ends, by what that stake earned, and rises steadily for a stake with no lock. Its axis is marked once a day; hover over the chart, or tap it on a phone, to read the amount at a date.

A stake's rewards are claimed or compounded once its lock has ended: while it is locked, its Claim and Compound wait for the lock end its card shows. One claim collects the rewards of every stake past its lock, and whatever an unstaked stake left you, and pays it less the pool's claim fee where it charges one; rewards left by an unstaked stake can be claimed at any time. With more stakes than one transaction holds, the page says when to claim again for the rest.

Every Claim and Compound button shows what it moves, and hovering it shows the fee taken and what you get. Claim all and Compound all first open a list of the stakes they settle, with what each brings and the date their new period ends, and you confirm there before your wallet opens.

In a pool that pays in the token it stakes you can also compound, a single stake from its card or every stake past its lock at once: each stake's rewards are added to that same stake, less the pool's compound fee, and it starts a new period, locked again for the pool's lock. Rewards left over from a stake you already unstaked go into your newest stake past its lock. Where compounding would take you or the pool past a cap, the part that does not fit is paid to you as a claim instead, less the claim fee.

Rewards are paid from the pool's reward reserve, which the team funds. In a pool that pays in the token it stakes, a claim or a compound larger than the reserve is still paid: what the reserve lacks is lent from the tokens staked in the pool, and the next funding repays that loan before it refills the reserve. While a loan is open, an unstake that would leave less staked in the pool than was lent waits until the pool is funded again, and the page says so before you sign. In a pool that pays in another token or in SOL, a claim larger than the reserve waits until the pool is funded again, and unstaking never depends on the reserve.

{% hint style="info" %}
A very small SOL claim can be refused by the network when your wallet holds less than the minimum balance Solana requires of an account. The page tells you before you sign: add a little SOL to your wallet, or claim once more has built up.
{% endhint %}

## Unstaking

Unstake one stake at a time. Once its lock has ended, it comes back to you at once, whole or in part, less the pool's unstake fee where it charges one. A partial unstake leaves the rest staked under the same stake, and must leave at least the pool's minimum; to take more, unstake the whole stake. What a stake earned up to that second stays yours to claim.

Before its lock ends, a stake can leave only whole and only where the pool allows it, and then it pays the pool's early-unstake penalty instead of the unstake fee, a share of the stake that the page shows before you sign. Where the pool allows no early exit, the stake waits for its lock to end.

## Merging stakes

Once two or more of your stakes in a pool have passed their locks, you can merge them into a new stake: tick the stakes to merge, and their amounts add up in the new one. The new stake is locked for the pool's lock from the moment you merge, as a new deposit is, and earns from the start. Each stake merged closes and returns its small SOL deposit to you, less the new stake's own. A stake still locked cannot be merged, and one merge takes as many stakes as one transaction holds.

What each merged stake earned up to then stays yours to claim. In a pool that pays in the token it stakes, each stake's row also shows what it earned, with a box of its own: tick it and that reward goes into the new stake instead, less the pool's compound fee. This needs the pool to be able to pay the rewards of every stake you merge, from its reserve and what it can lend, compounding not to be paused, and the new stake to stay under the pool's caps; where one of these fails, the boxes are shut and the dialog says why. The merge itself is never paused.

Before you sign, the dialog shows what the new stake will hold, the SOL that comes back to you and when the new stake's lock ends.

## Fees and penalties

A pool sets its own fees: a deposit fee, a claim fee, a compound fee and an unstake fee, each at most 25%, and an early-unstake penalty of at most 50%. A stake leaving after its lock pays the unstake fee; one leaving early pays the penalty instead, never both. Every fee and penalty goes to the platform's treasury. While anyone is staked in a pool, its claim, compound and unstake fees and its penalty can only be lowered, and an early exit the pool offers cannot be withdrawn. The deposit fee and the lock apply to new stakes only.

## Pool activity

Under each pool, below your stakes, a chart shows what happened in the pool day by day. Each bar is one day: what was deposited, compounded and unstaked, and, in a pool that pays its rewards in the token it stakes, what was claimed. The line is how much the whole pool held staked at the end of each day. Switch between the last 30, 60, 90 or 180 days with the buttons above the chart, and hover over a day, or tap it on a phone, to read its figures; a claim paid in another token or in SOL is shown there in that token. Today's figures are still growing until the day ends (in UTC), so the last part of the line is drawn dashed. Everyone can see the chart, with or without a wallet connected.

## Leaderboard

The Leaderboard tab, after the pools' tabs at the top of the page, ranks the wallets holding stakes by how much they have staked. It opens on All pools, every pool of the Lucky Ducks token together: each wallet ranked by what it holds across them, its return counted over all of them, and its rewards shown once per token they were paid in. Pick a pool instead, and the table shows that pool's hundred largest holders with how much each has staked, their return (ROI: the rewards the pool has paid them over what they hold staked, on a small dial that fills from red to green as it grows), the rewards the pool has paid them, and the day they first staked. Press a column's heading to sort the table by it; each holder keeps their place by stake. A holder's picture and nickname are their Lucky Ducks player profile's, with the verified mark when they are verified; one without a picture shows the first two characters of their wallet. If your wallet is among them, its row is highlighted. On a phone, swipe the table sideways to see every column.

## Paused pools

When a pool is paused, new stakes and compounding stop. Unstaking and claiming keep working.

## Moving to another wallet

If your wallet is compromised, you can ask for everything you hold in every pool to be moved to a new wallet. Open your wallet page from the wallet button at the top right and follow the steps: your current wallet signs, naming the new wallet, and then the new wallet signs too, to show it is yours. The page then shows where the move stands.

The team reviews each request. While it does, it may freeze your positions: nobody, you included, can stake, unstake, claim or compound in a frozen pool until the review ends, so whoever holds the old key cannot take anything either. The team then moves every stake in every pool to the new wallet, each with its amount and its lock unchanged, and then the rewards you are owed. If the request cannot be confirmed, it is rejected and your positions are unfrozen.

{% hint style="warning" %}
A move protects only what is still in the pool. Whoever holds your old key can unstake whatever its locks allow until the freeze, so request the move as soon as you suspect a compromise. The team can only move a position to the wallet you named, and never without your request.
{% endhint %}

## Closing your staker account

Once you have no stake left in a pool and no rewards to claim, close your staker account there to get its deposit back.
