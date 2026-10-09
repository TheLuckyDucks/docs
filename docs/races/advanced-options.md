---
icon: sliders
description: Every optional opt in on the create form, what it costs, and which ones need a Runner NFT.
---

# Advanced options

The opt ins on the Create Race form. All need a Runner NFT in your wallet except where noted.

## AI commentary

A per second play by play in an AI voice, generated as the race starts. It costs the platform's audio rate times the race duration.

The narration names the ducks, the boosts in play and the standings. It never predicts the winner. Generating it can add up to 60 seconds after the lobby closes.

{% hint style="info" %}
**The race never waits indefinitely.** If the track is not ready, the race starts silently instead of holding the lobby, and the audio is added to the race when it finishes, which can be part way through or after the finish. Either way it is archived with the race, so a silent race is not a race whose audio is lost.
{% endhint %}

Any race size can have it, 1v1 and rematches included. On a rematch the proposer decides, whatever the finished race had.

<figure><img src="../../.gitbook/assets/races/app-ai-commentary-toggle-banner.png" alt="The AI commentary toggle on the create form with its per second cost beside it"><figcaption><p>The cost shown is the race duration times the platform's audio rate.</p></figcaption></figure>

## X announcement

Posts the race to The Lucky Ducks X account when it goes live, which is useful for community events or for reaching players who are not watching the app.

{% hint style="warning" %}
Flat cost at creation, itemised in the cost breakdown before you sign. It is **non-refundable** once the race exists, even if the race never fills. [Fees and prizes](../economy/fees-and-prizes.md#other-costs-at-creation) has the figure.
{% endhint %}

The backend reads the on-chain flag and posts for you, so you sign nothing on X. The post carries the race link and the basics: entry fee, mode, when it starts. No-boost races are marked as such.

On a rematch the proposer picks this independently, whatever the finished race had.

<figure><img src="../../.gitbook/assets/races/app-x-announcement-toggle-banner.png" alt="The X announcement toggle on the create form with its flat cost beside it"><figcaption><p>A flat cost, itemised before you sign and gone for good once the race exists.</p></figcaption></figure>

## Custom name

A title on the race card, up to 32 characters, so players can pick your race out of the lobby list. Handy for a themed event or a community match.

<figure><img src="../../.gitbook/assets/races/app-custom-name-field-banner.png" alt="The custom name field on the create form with a race title typed into it"><figcaption><p>Up to 32 characters, and it is what players read on the card.</p></figcaption></figure>

## Custom race duration

The default duration is open to everyone. Any other value, up to the ceiling the form shows, needs a Runner NFT. See [Race duration](creating-a-race.md#race-duration).

<figure><img src="../../.gitbook/assets/races/app-race-duration-field-banner.png" alt="The race duration field on the create form showing the platform maximum"><figcaption><p>The form states the ceiling the platform currently allows.</p></figcaption></figure>

## Custom join timeout

The lobby window is 1 hour by default, and a custom timeout overrides it: minimum 1 minute, maximum 1 week. Long windows suit scheduled events, short ones suit a rapid queue.

<figure><img src="../../.gitbook/assets/races/app-join-timeout-field-banner.png" alt="The custom join timeout field on the create form set to a short window"><figcaption><p>Anything from 1 minute to 1 week, in place of the 1 hour default.</p></figcaption></figure>

## Custom track

Use a Track NFT you own as the background. It changes the pond, the lighting and the props, and nothing about the outcome. See [Track NFTs](../nfts/tracks.md).

The built in tracks are always free. Anything else needs the Track NFT in your wallet, and that is all it needs: a custom track is the one option here that does not ask for a Runner.

<figure><img src="../../.gitbook/assets/races/app-custom-track-picker-banner.png" alt="The track picker on the create form with the built in tracks and a Track NFT"><figcaption><p>The four built in tracks are free. Anything else has to be in your wallet.</p></figcaption></figure>

## Start when underfilled

Lets the race launch short of max players once the join timeout passes. Without it, an unfilled race expires and can only be refunded.

The box stays greyed out until you raise the maximum above the platform default race size. At the default there is nothing to fall short of, so there is nothing to opt into.

Enabling it adds a slider for the minimum players to start with. It runs from the platform's default race size up to one below your maximum, so you cannot set a threshold the race could never reach. A 10 player race with the slider at 7 starts with 7, 8 or 9 once the window closes.

<figure><img src="../../.gitbook/assets/races/app-underfilled-slider-banner.png" alt="The start when underfilled card on a 10 player race, its slider at the 5 player minimum"><figcaption><p>The slider will not go below the platform's default race size.</p></figcaption></figure>

It also adds a small surcharge for the backend's auto start, which comes back to you if the race never starts that way. See [Refunds and rent](../economy/refunds-and-rent.md#start-when-underfilled-surcharge).

One thing to know before you tick it: once enough players have joined to reach your threshold, the race is eligible to start, and from that moment you can no longer [cancel](hosting-and-cancelling.md#cancelling-a-race) it.

## Sponsored race

You fund the pool instead of the joiners, which is how giveaways and marketing races work. Set the prize when you create, and players enter free. The platform fee still comes out of what you sponsored, and so does the [jackpot fee](../economy/fees-and-prizes.md#the-jackpot-fee), unless you switch it off.

<figure><img src="../../.gitbook/assets/races/app-sponsored-race-toggle-banner.png" alt="The sponsored race toggle on the create form with the prize amount field open"><figcaption><p>You set the prize, and joiners enter for nothing.</p></figcaption></figure>

## Join settings (who can join)

The form also decides who may enter: Open, Verified Only, Allowed Players, NFT Holders or Token Holders. Verified Only and Token Holders need no Runner; NFT Holders and Allowed Players always do. See [Race access and gating](access-and-gating.md).

<figure><img src="../../.gitbook/assets/races/app-join-setting-picker-banner.png" alt="The join setting selector open, with all five options listed"><figcaption><p>Five settings, one per race, fixed once the race exists.</p></figcaption></figure>

## Minimum account age

Requires a joiner's player account to be at least a certain age. It is off by default, and the slider sets anything from **5 minutes** to **6 months**.

- A joining wallet needs an existing player account, old enough, or the join is rejected.
- An account created during the join transaction counts as zero seconds old, which makes this a cheap barrier against wallets spun up for one race.
- It stacks on any join setting, including none.

Worth knowing:

- It is fixed at creation for the life of the race, and rematches inherit it.
- Your own auto join faces the same check. Too new and you wait, lower the threshold, or use host mode to create without joining. See [Hosting, cancelling, and refunds](hosting-and-cancelling.md).
- Unsure whether your wallet qualifies? The join screen tells you before you sign.

<figure><img src="../../.gitbook/assets/races/app-minimum-account-age-toggle-banner.png" alt="The minimum account age slider on the create form, set to 12 hours"><figcaption><p>Off by default. Slide it anywhere from 5 minutes to 6 months.</p></figcaption></figure>

## Combining options

Most options stack freely. The one hard exclusion is that AI commentary cannot be added to a race that has already started.
