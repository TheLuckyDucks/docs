---
icon: robot
description: Commands, group announcements and raids. What everyone can use, and what linking your X account adds.
---

# The Lucky Ducks Telegram bot

The bot keeps a group in sync with on chain racing and rewards engagement on X. Join the main group at [t.me/TheLuckyDucks](https://t.me/TheLuckyDucks), or add the bot to your own. [Social networks](social-networks.md) lists every channel.

## Everyday commands

| Command        | What it does                                                     |
| -------------- | ---------------------------------------------------------------- |
| `/duck`        | Your player stats. `/player` and `/user` do the same             |
| `/leaderboard` | Top players. Add `day`, `week`, `month` or `all` for a window    |
| `/races`       | Open races                                                       |
| `/race`        | One race in detail                                               |
| `/team`        | Your team's stats                                                |
| `/teams`       | Browse teams                                                     |
| `/raidboard`   | The raid leaderboard. Add `week` or `month` for a shorter window |
| `/duckfact`    | A random duck fact                                               |
| `/joke`        | A random duck joke                                               |
| `/url`         | Every link and social                                            |
| `/help`        | The command list                                                 |

{% hint style="info" %}
Whoever added the bot to a group can narrow that list, so a command you use in one group may be absent in another. `/help` always shows what the group you are in actually offers.
{% endhint %}

## Race announcements

The bot posts a card when a race opens, and again for wins and prize claims, each linking to the race on the site. A race card carries the name, the entry fee and prize, the seats, the mode, who may join, the duration and join window, and the creator. Extras appear as their own rows when they apply: a sponsored badge, a minimum account age, a Track, AI commentary, a flexible start threshold, and whether boosts are allowed or disabled. A rematch says so instead, with its depth and the race the chain started from.

{% columns %}
{% column width="70%" %}

<figure><img src="../../.gitbook/assets/help/tg-race-announcement-desktop.png" alt="A race announcement card posted by the bot in a Telegram group, with the entry fee, mode and a link"><figcaption><p>Announcements carry the race link, so the group can join from the chat.</p></figcaption></figure>

{% endcolumn %}

{% column width="30%" %}

<figure><img src="../../.gitbook/assets/help/tg-race-announcement-mobile.png" alt="A race announcement card posted by the bot in a Telegram group, with the entry fee, mode and a link, on a phone"><figcaption><p>On a phone</p></figcaption></figure>

{% endcolumn %}
{% endcolumns %}

### Why two groups show different races

{% hint style="info" %}
Each group has its own announcement policy, set by whoever added the bot: it can be scoped to particular join settings, tokens or NFT collections, or to sponsored races only. `/races` applies the same policy, so the list in one group is not the list in another, and neither is the full list. The site always shows everything.
{% endhint %}

### How you appear on a card

Announcements name you by the first of these that exists: your linked and verified X or Telegram handle, then your nickname, then a shortened wallet address. The first two appear with your wallet beside them, because nicknames are not unique and a card naming two people identically is worse than one with an address on it.

Would rather not appear by handle? Unlink it. See [Player verification](../trust/verification.md#telegram-handle-in-group-announcements).

## Raids: boost the post together

A **raid** rallies the group around a post from The Lucky Ducks on X. While one is live the bot keeps a card updated in place:

{% code title="A live raid card" %}

```
🦆 Raid the X Post!

> The pond is open. 20 seat lobby, 0.05 SOL in,
> winner takes the pot.

👤 @TheDucksRun
🔗 Post: https://x.com/.../status/...
🕐 Duration: 1h 30m

❤️ Likes: 7/10
▓▓▓▓▓▓▓░░░
🔁 Reposts: 3/3 ✅
▓▓▓
💬 Replies: 1/5
▓░░░░
```

{% endcode %}

Each line shows the count against the goal, with a bar under it and a tick once the goal is met. Under the card sit Like, Repost and Reply buttons that open X with the action ready, so you never leave Telegram to find the post. When every goal lands, or the timer runs out, the card flips to a summary with the top raiders on it and the next post in the queue goes live.

{% hint style="success" %}
You need not link anything to help a raid: **everyone's** likes, reposts and replies count toward the group goals.
{% endhint %}

### Earn points on the raid leaderboard

To have your engagement credited to you, link your X account once, from the Verification tab on the site or as a second link if you verified another way. See [Player verification](../trust/verification.md).

From then on, when a raid ends the bot tallies who engaged:

- Like = **2** points
- Repost = **3** points
- Reply = **4** points

Check standings with `/raidboard`. Points feed your global XP and unlock raid badges, listed in [Badges](../competition/badges.md).

Linking stays optional. Without it you still push the group goals, you just do not appear on the personal board.

## FAQ

<details>

<summary>Do I need a wallet to raid?</summary>

No. Anyone can engage with the post. Points and XP need a linked, verified wallet.

</details>

<details>

<summary>How is engagement counted?</summary>

The live card reads the post's public counts. Personal points are tallied once, when the raid ends.

</details>

<details>

<summary>Why link both X and Telegram?</summary>

It ties both identities to one wallet, so raid points and future rewards land in the right place. A second link never costs an on chain step.

</details>
