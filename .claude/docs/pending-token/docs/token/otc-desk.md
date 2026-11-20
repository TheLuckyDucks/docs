---
icon: handshake
description: Trade the Lucky Ducks token against SOL or a whitelisted token in blocks, off the pool, with nobody holding anything for you.
---

# The OTC desk

The OTC desk at theluckyducks.com/otc is where large blocks of the Lucky Ducks token change hands for SOL or a whitelisted token without going through the pool. Nobody holds anything for you: what an order deposits sits in an account of the desk's own program, and a fill swaps both sides in one transaction. The Lucky Ducks cannot take it. It leaves only through a fill, its maker's cancel, a close after the order's expiry, or a cancel by the desk, which returns what is left to the maker.

{% columns %}
{% column width="70%" %}

<figure><img src="../../.gitbook/assets/token/app-otc-desk-desktop.png" alt="The OTC desk: open sell and buy orders with their size, price and how each stands against the pool"><figcaption><p>Every open order, with its price set against the pool's.</p></figcaption></figure>

{% endcolumn %}

{% column width="30%" %}

<figure><img src="../../.gitbook/assets/token/app-otc-desk-mobile.png" alt="The OTC desk: open sell and buy orders with their size, price and how each stands against the pool, on a phone"><figcaption><p>On a phone</p></figcaption></figure>

{% endcolumn %}
{% endcolumns %}

## Orders

Every order trades the Lucky Ducks token against one other token its maker picks: SOL, or any token the platform has whitelisted. A sell order deposits Lucky Ducks tokens and asks a price in the other token. A buy order deposits the other token to buy Lucky Ducks tokens with it. The desk shows the smallest order it takes. The maker sets the price: the desk shows how it stands against the pool's, and promises nothing about what the token will be worth.

- **Whole or in parts.** An order fills whole unless its maker allows parts, and the maker sets the smallest part. The last tokens of an order can always be filled below it.
- **Anyone, or one wallet.** An order can be open to anyone, or to one named wallet, which alone can fill it.
- **An expiry.** An order can carry one. After it nobody can fill the order, and anyone can close it, which sends what is left back to its maker.
- **Announced.** A maker can ask for an order to be posted on The Lucky Ducks' Telegram and X. Only an order open to anyone is posted, and only where OTC offers are being announced. The post on X costs a small fee in SOL, shown beside its checkbox and paid to the treasury when the order is posted; Telegram is free.

<figure><img src="../../.gitbook/assets/token/app-otc-post-order-banner.png" alt="The post order form: side, amount, price, parts, taker, expiry, release and the Telegram and X checkboxes"><figcaption><p>Every term of an order, chosen before it is posted.</p></figcaption></figure>

Posting asks once more before your wallet opens, with what leaves it and the exact fee.

## The fee

The fee is shown on the desk, and the forms for posting and filling an order show its exact amount before your wallet opens. The buyer pays it on top of the price, in the token the order trades against, and an order keeps the fee that was in force when it was posted. Rounding always favours the maker: a buyer pays rounded up to that token's smallest unit, and a seller filling a buy order is paid rounded down. Every transaction also pays Solana's network fee.

## The pool's limits

An order open to anyone cannot be filled while its price stands further from the official pool's current price than the desk allows: a sell order below it, a buy order above it. That keeps anyone from trading between an order and the pool for a profit. The desk marks an order past these limits. The order stays up, and can be filled again once the pool's price comes back to it. An order for a named wallet is not held to the pool.

An order priced in a token other than SOL is held to the same limits, read through that token's own pool against SOL. A token with no such pool takes no order open to anyone: an order in it must name a wallet.

## Flexible settlement

A maker can make an order flexible. Whoever takes one can fill it at once, as on any order, or reserve it: they post a bond, a share of the price the maker picks from 10% to 50%, what they are taking is held for them at the order's price, and they have the settlement window shown on the desk to finish the trade.

- **On time.** On a sell order the bond counts toward the price. On a buy order it comes back.
- **Too late.** The maker keeps the bond and gets back what was reserved, in their wallet rather than on the order. An order that a lapsed reservation emptied shows as closed rather than filled, and its Filled share counts only what actually traded.

Settle from My desk, or from the order itself, before the countdown on the reservation runs out. A maker can still cancel a flexible order, and a reservation already made carries on: it outlives the order.

<figure><img src="../../.gitbook/assets/token/app-otc-pool-floor-banner.png" alt="An order marked as under the pool's floor, with the pool's price beside it"><figcaption><p>Under the floor, an open order waits rather than filling.</p></figcaption></figure>

## Releases

A seller can make the tokens a fill buys wait, then release a share at once and the rest steadily over a period, or in up to 12 equal steps (25% every month, say), 12 months at most in all, and the desk can set a minimum wait every fill takes. An order posted under the pool's price, to sell or to buy, gets at least a release the desk sets: nothing at once, then the tokens come out in equal steps over a period that grows with how far under the pool the order was posted, two steps at 5% under, six at 25% and twelve at 50%. A seller can make it slower (a longer wait, a longer period or more steps), never faster. A price only slightly under the pool, within a small margin the desk sets (half a percent to start with), counts as at the pool and takes no such release. It is fixed when the order is posted and never changes afterwards. Claim released tokens from My desk. A fill with no wait and no period pays the tokens straight to your wallet.

Posting an order, and a fill that opens a release, each pay a small SOL deposit to keep an account open. It is returned when that account closes.

<figure><img src="../../.gitbook/assets/token/app-otc-releases-banner.png" alt="My desk: a release with what has come out so far and a Claim button"><figcaption><p>What a fill bought, coming out on the order's terms.</p></figcaption></figure>

## Cancelling and pauses

A maker can cancel at any time, even while the desk is paused, and what is left comes back. While the desk is paused nobody can post or fill.
