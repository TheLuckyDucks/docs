# The token pages, pending

The token, the presale, staking and the OTC desk are off the GitBook, kept
here to put back when they are wanted. `pending-token/` holds each file at
the path it had, so restoring is moving it back:

- `pending-token/docs/token/*.md`: the four pages, to `docs/token/`
- `pending-token/assets/token/`: their screenshots, to `.gitbook/assets/token/`
- `pending-token/assets/brand/docs-card-token.png`: the home page card's
  cover, to `.gitbook/assets/brand/`
- `pending-token/assets/help/tg-*-banner.png`: the bot page's three token
  shots, to `.gitbook/assets/help/`

The pages are as they were published; the lines other pages lost are below,
verbatim. Before putting anything back, check every figure against the
product repository again: these pages were written for an earlier state.

## To put them back

1. Move the files above back to their paths.
2. Put back each block below where its heading says.
3. `npx prettier --write` the touched files, then `npm run check`, and
   delete this file and `pending-token/`.

## The SUMMARY block

## The Token

- [The Lucky Ducks token](token/the-token.md)
- [Buying in the presale](token/presale.md)
- [Staking](token/staking.md)
- [The OTC desk](token/otc-desk.md)

## The home page card

In `docs/README.md`'s cards table, between the Economy card and the Trust and
Fairness card, joined back into one line with no space between the tags, as
the table's other cards are:

```html
<tr>
  <td><strong>The Token</strong></td>
  <td>
    The Lucky Ducks token, and how to buy it in the presale, stake it or trade
    it in blocks.
  </td>
  <td><a href="token/the-token.md">the-token.md</a></td>
  <td>
    <a href="../.gitbook/assets/brand/docs-card-token.png"
      >docs-card-token.png</a
    >
  </td>
</tr>
```

## The bot page's command rows

In `docs/help/telegram-bot.md`'s command table, after `/joke`:

```markdown
| `/ca` | The token's address, to copy with a tap, with its page and charts |
| `/price` | What one token is worth, in dollars and in SOL. `/quote` does the same |
| `/stake` | Every staking pool, by name: what it stakes and pays, how much is staked and by how many, its APY, its lock and its reserve. Add a pool's number, as in `/stake 1`, for that pool in full |
```

The `/url` row read:

```markdown
| `/url` | Every link and social, the token's pages among them |
```

## The bot page's token section

Before "## Raids: boost the post together":

```markdown
## Token announcements

A group can also follow [the Lucky Ducks token](../token/the-token.md). Each of these posts is switched on per group by whoever added the bot, and each can be held to a smallest size in dollars, so one group may see every buy and another only the large ones.

- **Buys.** A buy on the official pool is posted with what was paid in SOL and in dollars, the tokens bought, the price and the market cap after it, the buyer, and whether it is their first buy. Buttons lead to the charts and to where to buy.
- **Staking.** A new stake, a claim, a compound and an unstake are each a post of their own, naming the pool and the amount.
- **OTC offers.** An order on [the OTC desk](../token/otc-desk.md) is posted only when its maker asked for it, and only when it is open to anyone. It goes out as soon as the order is posted. The post gives the side, the size, the price against the pool's, how it fills, whether it can be reserved and on what bond, until when it is open, how its tokens are released and who posted it, with a button to the order.

`/stake` gives each pool's APY, fixed when the pool was created. For a pool that pays in another token or in SOL it also gives what that yield is worth at today's prices, when both tokens have one: an estimate, since prices move.

<figure><img src="../../.gitbook/assets/help/tg-buy-post-banner.png" alt="A buy post in a Telegram group: the SOL paid, the tokens bought, the price, the market cap and the buyer"><figcaption><p>Every figure is the buy's own, read from the pool it went through.</p></figcaption></figure>

<figure><img src="../../.gitbook/assets/help/tg-stake-reply-banner.png" alt="The bot's answer to /stake: each pool with its staked total, stakers, APY, lock and reserve"><figcaption><p>Add a pool's number to see that pool in full.</p></figcaption></figure>

<figure><img src="../../.gitbook/assets/help/tg-otc-offer-post-banner.png" alt="An OTC offer post: the side, the size, the price against the pool's and a button to the order"><figcaption><p>Posted only when the maker asked for it.</p></figcaption></figure>
```

## The shot list

In `.claude/docs/screenshots.md`, the folder line, after the `economy/` one:

```markdown
- `token/`: The token page, the presale, staking, the OTC desk
```

The section, between `## economy/` and `## trust/`:

```markdown
## token/

Captured on theluckyducks.com/token, /presale, /otc and /staking, which are separate
apps from the dApp. A presale shot needs a sale with both phases set, and
the allocation banner a wallet the priority rule admits, signed in.

- `app-token-page`: `token/the-token.md`; The token page from the top: the address, the facts, the allocations and the official pool
- `app-token-facts` (banner): `token/the-token.md`; The supply and the three facts: mint, freeze and metadata authority, each with its state
- `app-token-allocations` (banner): `token/the-token.md`; The allocations table: share, wallet, lock with its provider link, released so far
- `app-token-giveaways` (banner): `token/the-token.md`; The giveaway list: each free race, when it ended, its prize and winners
- `app-presale-sale`: `token/presale.md`; A sale's page: both phases with price and wallet limit, sold against the minimum, the buy form
- `app-presale-allocation` (banner): `token/presale.md`; The priority phase signed in: the wallet's allocation and what it has bought
- `app-presale-claim` (banner): `token/presale.md`; The claim button with the released amount not yet claimed
- `app-staking-pools`: `token/staking.md`; The pool list: what each stakes and pays, its APY, lock, fees, staked, and reward reserve
- `app-staking-stake-form` (banner): `token/staking.md`; The stake form: the amount, the deposit fee, the amount credited and when the lock ends
- `app-otc-desk`: `token/otc-desk.md`; The order book: sell and buy orders, size, price, each against the pool
- `app-otc-post-order` (banner): `token/otc-desk.md`; The post order form with the parts, taker, expiry, release and Telegram and X choices
- `app-otc-pool-floor` (banner): `token/otc-desk.md`; An order marked under the floor, the pool's price and the floor beside it
- `app-otc-releases` (banner): `token/otc-desk.md`; My desk: a release part way out, with Claim
```

The rows the other folders lost: the card under the card covers, the three
banners under `help/`:

```markdown
- `docs-card-token.png`: `README.md`; Card cover, 16:9, the token page: the address, the facts and the allocations
- `tg-buy-post` (banner): `help/telegram-bot.md`; A buy post: SOL paid, tokens bought, price, market cap, buyer, the chart buttons
- `tg-stake-reply` (banner): `help/telegram-bot.md`; The answer to /stake: each pool's staked total, stakers, APY, lock and reserve
- `tg-otc-offer-post` (banner): `help/telegram-bot.md`; An OTC offer post: side, size, price against the pool's, the order button
```

## OVERVIEW

In `.claude/docs/OVERVIEW.md`, the section line, after Economy's:

```markdown
- The Token: What the token is, and how to buy, stake or trade it
```

The page lines, after `economy/spl-tokens.md`'s:

```markdown
- `token/the-token.md`: The Lucky Ducks token: its address, its facts, the allocations, the official pool, giveaway races
- `token/presale.md`: Buying in the presale: the phases, the minimum, refunds, claims
- `token/staking.md`: Staking pools, rewards, unbonding, closing a position
- `token/otc-desk.md`: The OTC desk: orders, the fee, the pool's floor, releases
```
