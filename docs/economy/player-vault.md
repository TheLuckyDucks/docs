---
icon: wallet
description: A balance you top up once and spend across many races, and the setting that decides where winnings land.
---

# Your player vault

Your player vault is a balance you top up once and spend across many races. Instead of approving a wallet transfer every time you join, you pay from a balance the platform already holds for you.

{% hint style="info" %}
It is not the same thing as a race vault. A race vault holds one race's entry fees and closes when that race ends. Your player vault is yours, it persists, and only you can take money out of it.
{% endhint %}

{% columns %}
{% column width="70%" %}

<figure><img src="../../.gitbook/assets/economy/app-play-balance-panel-desktop.png" alt="The Play Balance panel on the Player page with SOL and token balances, deposit and withdraw buttons"><figcaption><p>The Play Balance panel is where you top up, withdraw, and set what pays for a race.</p></figcaption></figure>
{% endcolumn %}

{% column width="30%" %}

<figure><img src="../../.gitbook/assets/economy/app-play-balance-panel-mobile.png" alt="The Play Balance panel on the Player page with SOL and token balances, deposit and withdraw buttons, on a phone"><figcaption><p>On a phone</p></figcaption></figure>
{% endcolumn %}
{% endcolumns %}

## Where it lives

The vault is part of your player account, the same on chain account that tracks your race history and your profile. You already have one if you have raced before. Nothing new is created and no extra rent is charged when you first deposit.

The balance is not a number the platform records somewhere. It is the actual SOL sitting in your account, above the small deposit Solana requires to keep any account open. That deposit is held separately and is never counted as part of your balance, which is why you can always withdraw all of it and never hit a minimum you cannot spend.

## Topping up

From the Player page, choose Deposit, pick SOL or a supported token, enter an amount, and sign. The money moves from your wallet into your player account.

{% hint style="info" %}
**A deposit always needs your wallet signature.** This is not a policy the platform chose. Money leaving your wallet requires your wallet to sign, so no setting and no permission can move it for you.
{% endhint %}

You can hold SOL and several tokens in the vault at the same time. Each is tracked separately.

## Spending from it

Where a race entry is paid from is a setting, not a question you answer per race.

If you have turned on [delegated signing](../races/delegated-play.md), the vault pays. It has to: nothing is asking your wallet, so there is no other account to draw on.

If you are signing for yourself, your wallet pays. To spend the balance instead, tick **Pay race entries from your Play Balance if it can cover them**, in the Play Balance panel on the Player page. The setting is remembered for your wallet, and it appears only while delegated signing is off, because a live permission already spends the balance.

If your balance does not cover the total, your wallet pays instead and the app tells you. Nothing fails and nothing is half-paid.

{% hint style="warning" %}
**A token race spends from two balances at once.** The entry fee comes out of your token balance, while the network fee and any race costs come out of your SOL balance. A vault holding plenty of a token but no SOL cannot fund a token race, and the app will say so before you sign.
{% endhint %}

{% hint style="warning" %}
**The vault cannot pay rent.** Opening a new account on Solana requires a deposit, and that deposit has to come from a wallet that signs for it, so creating a race or your very first player account is always paid from your wallet. Everything else, entry fees and race costs alike, can come from the vault. On an action signed for you, the fee payer fronts the rent and your vault repays it afterwards.
{% endhint %}

## Taking money out

Withdraw any amount, any time, from the Player page. Only your wallet can authorise it. No permission you grant, and no platform setting, can move money out of your vault or out of your account.

Closing your player account returns everything in one transaction: your SOL balance, every token balance, and the rent deposit. Your race history resets, and the account is recreated the next time you race. See [Refunds and rent](refunds-and-rent.md#your-player-account-rent).

## Where your winnings land

Separately from how you pay, you choose where money coming back to you goes:

{% tabs %}
{% tab title="Wallet (default)" %}
Prizes, refunds and returned rent arrive in your wallet, as they always have.
{% endtab %}

{% tab title="Vault" %}
The same money is added to your vault balance instead, ready to fund your next race with no top up.
{% endtab %}
{% endtabs %}

The choice is yours alone and applies to every race you are in. Nobody else can change where your money lands, which matters on refunds, because anyone is allowed to trigger a refund on a lobby that never filled.

It covers returned rent too, not just prizes. The one exception is closing your account: that returns the rent of the account that holds the vault, so there is nothing left to credit it to and it always goes to your wallet.

{% columns %}
{% column width="70%" %}

<figure><img src="../../.gitbook/assets/economy/app-payout-target-setting-desktop.png" alt="The payout target setting with wallet and vault options, wallet selected"><figcaption><p>One setting, per player, covering prizes, refunds and returned rent.</p></figcaption></figure>
{% endcolumn %}

{% column width="30%" %}

<figure><img src="../../.gitbook/assets/economy/app-payout-target-setting-mobile.png" alt="The payout target setting with wallet and vault options, wallet selected, on a phone"><figcaption><p>On a phone</p></figcaption></figure>
{% endcolumn %}
{% endcolumns %}

Pooling winnings is worth it if you race often. Set it back to Wallet at any time.

## Next

Funding your vault is also what makes [playing without signing every action](../races/delegated-play.md) possible.

{% content-ref url="../races/delegated-play.md" %}
[delegated-play.md](../races/delegated-play.md)
{% endcontent-ref %}
