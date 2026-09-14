---
icon: mobile-screen
description: Set up a session that never opens your wallet app, in the order the platform requires.
---

# Playing without your wallet app

On a phone, the slowest part of a race is not the race. It is the handoff: tap, wait for the wallet app to open, approve, wait to be sent back. Doing that once is fine. Doing it for every join, every claim and every rematch is what makes a quick game feel slow.

You can set things up so a whole session never opens your wallet app. This page is the path. Each step has its own page with the detail; here is the order and what each one buys you.

## The three steps, once each

{% stepper %}
{% step %}

### Connect your wallet and sign in

The first sign-in is always the wallet, because signing a message is the only thing that proves the wallet is yours. Nothing else can establish that, so nothing else is offered until it has happened once.

{% endstep %}

{% step %}

### Link an account

Verification attaches an off-platform identity to your wallet: X, Telegram, Facebook or whichever providers the platform has enabled. From then on that account is a second way in. See [Player verification](../trust/verification.md).

{% endstep %}

{% step %}

### Turn on delegated play

This lets Lucky Ducks sign your in-game actions for a period you choose, funded from your [player vault](../economy/player-vault.md). See [Playing without signing every action](delegated-play.md).

{% endstep %}
{% endstepper %}

After that, opening the app means picking your linked account on the login screen, and playing means one tap per action.

{% columns %}
{% column width="70%" %}

<figure><img src="../../.gitbook/assets/races/app-login-linked-account-desktop.png" alt="The login screen offering a linked social account alongside the connect wallet button"><figcaption><p>Once an account is linked, it appears on the login screen as a second way in.</p></figcaption></figure>
{% endcolumn %}

{% column width="30%" %}

<figure><img src="../../.gitbook/assets/races/app-login-linked-account-mobile.png" alt="The login screen offering a linked social account alongside the connect wallet button, on a phone"><figcaption><p>On a phone</p></figcaption></figure>
{% endcolumn %}
{% endcolumns %}

## The order is not a suggestion

Each step depends on the one before it, and the app will refuse out of order:

- You cannot link an account until you have joined at least one race. A brand new wallet cannot verify.
- You cannot turn on delegated play until your wallet is verified. The program itself refuses, not just the app.

That second refusal exists because the two halves only work together. Signing your actions for you removes the wallet from playing; the linked account removes it from signing in. With only the first, every visit would still start in the wallet app, which is the thing you were trying to avoid.

## What still needs your wallet app

Setting it up is the point at which you use the wallet, and there is a short list that always will:

| Action                               | Why                                                                                     |
| ------------------------------------ | --------------------------------------------------------------------------------------- |
| Topping up your vault                | Money leaving your wallet needs your wallet's signature. No arrangement can change that |
| Withdrawing from your vault          | Value leaving the platform is the line the whole design rests on                        |
| Closing your player account          | The other exit, for the same reason                                                     |
| Granting or extending delegated play | The permission is your consent, so it cannot renew itself                               |

Everything else you do in a game is covered.

## If you lose access to the linked account

Link a second one. Any account attached to your wallet signs you in, and none of them is the primary for that purpose: verify with X and link Google later, and either will do. Only the first link runs an on-chain transaction; the rest are recorded off chain.

{% hint style="success" %}
Your wallet always works as a way in. The linked account is a convenience on top of it, never a replacement, so losing every linked account costs you the convenience and not the account.
{% endhint %}

## Turning it back off

Revoking delegated play is always available. It needs no verification, it works even if the platform has switched the feature off for everyone, and it takes effect immediately.

Signing in with your wallet is likewise always available, whatever you have linked. Nothing in this arrangement can lock you out of your own wallet.

{% content-ref url="delegated-play.md" %}
[delegated-play.md](delegated-play.md)
{% endcontent-ref %}
