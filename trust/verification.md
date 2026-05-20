# Player verification

Every wallet has a player profile. Verification additionally ties your wallet to an off-platform identity, which is optional but unlocks limits and tournament eligibility.

## Profile basics: nickname and avatar

Every player can set a **nickname** and an **avatar** on the Player page, independent of verification. These show up next to your wallet in race lobbies, participant lists, leaderboards, and team rosters.

* **Nickname**. Short display name. Unique-per-platform isn't enforced; collisions are disambiguated by the truncated wallet shown next to the name.
* **Avatar**. An image you upload. If you don't set one, the platform uses a deterministic identicon derived from your wallet address.

Both fields are stored off chain on your player profile. You can change them any time.

## What gets verified

The platform supports OAuth2 verification with:

* **X (Twitter)**
* **Telegram**

After verifying, the wallet has a verified flag and gains access to the chosen identity's display name and avatar (which you can optionally adopt as your profile nickname/avatar).

## When verification is offered

The first three race actions on a fresh wallet are unverified. After that, the platform shows a "Verify yourself" prompt on the player page. You can verify at any time before then by going directly to the player page.

Verification is a one-time off-chain OAuth flow. You authorize the chosen provider, the platform's backend confirms the OAuth grant, and your wallet's `verified` flag flips to true. The flag is stored on the player profile and shown next to your nickname in race lobbies, leaderboards, and team rosters.

## What verification unlocks

* **Higher daily race creation limit**. Unverified wallets can create up to the standard daily cap. Verified wallets can create up to 50 races per day (500 if also a Runner NFT holder).
* **Tournament eligibility**. Some tournament rule sets require participants to be verified, to keep sybil-style ranking abuse out of the leaderboard.
* **Identity badge**. A small checkmark next to your nickname signals you are verified. Other players see this on race cards and lobbies.
* **Telegram handle in announcements** (Telegram-verified players only — see below).

## Telegram handle in group announcements

If you verify with Telegram, you can opt in to display your **Telegram handle** in the platform's Telegram group announcements (race wins, podium finishes, tournament results, and similar event posts).

The opt-in is off by default. Toggle it from the Player page once you are Telegram-verified. With it on, announcement messages tag your `@handle` so the broadcast reaches you and your contacts. With it off, announcements use your platform nickname only.

You can flip the opt-in on or off at any time. Past announcements aren't rewritten.

## Privacy

The platform stores only what is needed: a stable identifier from the OAuth provider, your display name, and your avatar URL. The platform does not receive your email, phone number, OAuth refresh tokens, or any other PII from the provider. The OAuth grant covers only the scopes needed to confirm you control the linked account.

You can unverify at any time from the Player page. Unverifying drops the off-chain link; the verified flag flips back to false. The wallet's race history remains untouched.

## Multiple providers per wallet

You can verify with multiple providers (X, Telegram, and Facebook all at once). The platform shows whichever identity you set as primary. Future events may give bonuses for being verified across multiple providers, but the current verified flag is binary.

## What verification does not do

* It does not change your wallet's race history.
* It does not give you a boost.
* It does not give you a discount on entry fees.
* It does not let the platform refund you out of band; refunds are always on chain.
