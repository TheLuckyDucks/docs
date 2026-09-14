---
icon: wallet
description: A balance you top up once and spend across many races, and the setting that decides where winnings land.
---

# Your player vault

A balance you top up once and spend across many races, instead of approving a wallet transfer every time you join.

{% hint style="info" %}
Not to be confused with a race vault, which holds one race's entry fees and closes with that race. Your player vault is yours, it persists, and only you can take money out.
{% endhint %}

{% columns %}
{% column width="70%" %}

<figure><img src="../../.gitbook/assets/economy/app-play-balance-panel-desktop.png" alt="The Play Balance panel on the Player page with SOL and token balances, deposit and withdraw buttons"><figcaption><p>Top up, withdraw, and set what pays for a race, all in one panel.</p></figcaption></figure>

{% endcolumn %}

{% column width="30%" %}

<figure><img src="../../.gitbook/assets/economy/app-play-balance-panel-mobile.png" alt="The Play Balance panel on the Player page with SOL and token balances, deposit and withdraw buttons, on a phone"><figcaption><p>On a phone</p></figcaption></figure>

{% endcolumn %}
{% endcolumns %}

## Where it lives

Inside your player account, the same on chain account holding your race history and profile, so if you have raced you already have one. Depositing creates nothing new and costs no extra rent.

The balance is not a number recorded somewhere: it is the actual SOL in your account, above the small deposit Solana requires to keep any account open. That deposit sits apart and never counts as balance, which is why you can withdraw everything and never meet a minimum you cannot spend.

## Topping up

From the Player page choose Deposit, pick SOL or a supported token, enter an amount and sign. You can hold SOL and several tokens at once, each tracked separately.

{% hint style="info" %}
**A deposit always needs your wallet's signature.** Not a policy: money leaving your wallet requires your wallet to sign, so no setting and no permission can move it for you.
{% endhint %}

## Spending from it

What pays for a race entry is a setting, not a question per race.

With [delegated signing](../races/delegated-play.md) on, the vault pays, because nothing is asking your wallet and there is no other account to draw on.

Signing for yourself, your wallet pays. To spend the balance instead, tick **Pay race entries from your Play Balance if it can cover them** in the Play Balance panel. It is remembered for your wallet, and it only appears while delegated signing is off, since a live permission already spends the balance.

If the balance falls short, your wallet pays and the app says so. Nothing fails and nothing is half-paid.

{% hint style="warning" %}
**A token race spends from two balances at once.** The entry fee comes from your token balance, the network fee and race costs from your SOL. A vault full of a token but empty of SOL cannot fund a token race, and the app says so before you sign.
{% endhint %}

{% hint style="warning" %}
**The vault cannot pay rent.** Opening an account on Solana needs a deposit from a wallet that signs for it, so creating a race, or your very first player account, always comes from your wallet. Everything else can come from the vault. On an action signed for you, the fee payer fronts the rent and your vault repays it.
{% endhint %}

## Taking money out

Withdraw any amount, any time, from the Player page. Only your wallet can authorise it: no permission you grant and no platform setting can move money out of your vault or your account.

Closing the account returns everything in one transaction, your SOL, every token balance and the rent deposit. Your race history resets, and the account comes back the next time you race. See [Refunds and rent](refunds-and-rent.md#your-player-account-rent).

## Where your winnings land

Separately from how you pay, you choose where returning money goes:

{% tabs %}
{% tab title="Wallet (default)" %}
Prizes, refunds and returned rent arrive in your wallet, as they always have.
{% endtab %}

{% tab title="Vault" %}
The same money joins your vault balance instead, ready to fund the next race with no top up.
{% endtab %}
{% endtabs %}

The choice is yours alone and covers every race you are in, which matters on refunds, because anyone may trigger a refund on a lobby that never filled. It covers returned rent as well as prizes.

The one exception is closing your account: that returns the rent of the account holding the vault, so there is nothing left to credit and it always goes to your wallet.

{% columns %}
{% column width="70%" %}

<figure><img src="../../.gitbook/assets/economy/app-payout-target-setting-desktop.png" alt="The payout target setting with wallet and vault options, wallet selected"><figcaption><p>One setting, per player, covering prizes, refunds and returned rent.</p></figcaption></figure>

{% endcolumn %}

{% column width="30%" %}

<figure><img src="../../.gitbook/assets/economy/app-payout-target-setting-mobile.png" alt="The payout target setting with wallet and vault options, wallet selected, on a phone"><figcaption><p>On a phone</p></figcaption></figure>

{% endcolumn %}
{% endcolumns %}

Pooling is worth it if you race often, and you can set it back to Wallet whenever you like.

## Next

Funding your vault is also what makes [playing without signing every action](../races/delegated-play.md) possible.

{% content-ref url="../races/delegated-play.md" %}
[delegated-play.md](../races/delegated-play.md)
{% endcontent-ref %}
