---
icon: coins
description: Racing in USDC, USDT or another supported token, and what differs from a SOL race.
---

# SPL token races

Races and tournaments can run in supported SPL tokens instead of SOL. USDC and USDT are supported and more arrive over time; the currency picker on the create form is the live list.

<figure><img src="../../.gitbook/assets/economy/app-currency-picker-banner.png" alt="The currency picker beside the entry fee field, listing SOL and supported tokens with balances"><figcaption><p>The picker is the live list. A token that is not in it is not supported yet.</p></figcaption></figure>

## Supported token programs

Both Solana token standards work:

{% tabs %}
{% tab title="SPL Token (Legacy)" %}
The original program (`TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA`). Most major tokens run here, USDC and USDT included.
{% endtab %}

{% tab title="SPL Token-2022" %}
The newer program (`TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb`), with extensions like transfer fees, interest-bearing balances and confidential transfers. Tokens such as AMPS use it.
{% endtab %}
{% endtabs %}

The vault, the ATA derivation and the payout logic pick the right program from the mint's owner, so there is nothing to configure: choose the token and the instructions route themselves.

For a Token-2022 mint with the transfer fee extension, the platform reads that fee from the mint and accounts for it in joining and payout, so the player and the pool always see the post-fee amount on chain.

## How a token race works

Mechanically identical to a SOL race, with three differences:

- The entry fee is denominated in the token's smallest unit. USDC has 6 decimals, so 1 USDC is 1,000,000 base units.
- Each participant needs an Associated Token Account for that mint. Without one, the join transaction creates it and you pay a one-time ATA rent of about 0.002 SOL, recoverable when you close the account.
- The vault holds the token in a vault-owned ATA, and payouts move it from there to each winner's ATA.

{% hint style="warning" %}
Costs paid in SOL stay in SOL. Network fees, rent, and the withdrawal or cancellation penalties are all charged in SOL even when the pot is a token.
{% endhint %}

## Selecting a token

The entry fee field carries a currency picker listing SOL and every supported token with its icon, symbol and your balance. Availability and order come from `splTokens[].priority` in `/config`, so higher priority sits first.

## Fee tier differences

Each token has its own tier schedule. The percentages match SOL's (10%, 7.5%, 5%, 3%, 2%) while the thresholds suit that token's denomination, which is why AMPS and AISI sit at much higher absolute numbers. `splTokens[].feeTiers` in `/config` carries the full schedule.

## Joining without the token

Hold none of the chosen token and the join button is disabled with an "Insufficient balance" tooltip. That check happens client-side, before anything is signed.

## Tournaments in SPL tokens

A tournament pot can be in a supported token, and when it is, only races in that token count toward the standings, so the event and its prize share one currency.

Claiming works as it does for SOL: one transaction pays every member of the winning team, creating a token account for anyone who lacks one, so there is nothing to set up first. See [Tournaments](../competition/tournaments.md#claiming).

## Why use SPL tokens

- **Stablecoins** keep an entry fee fixed in USD terms, with no exposure to SOL moving between joining and finalization.
- **Community tokens** drive activity in their own ecosystems, turning race pools into liquidity events for those projects.
