# Player verification

Verification ties your wallet to an off-platform identity. It is optional but unlocks limits and tournament eligibility.

## What gets verified

The platform supports OAuth2 verification with:

* **X (Twitter)**
* **Telegram**
* **Facebook**

After verifying, the wallet has a verified flag and the chosen identity's display name and avatar.

## When verification is offered

The first three race actions on a fresh wallet are unverified. After that, the platform shows an "Verify yourself" prompt in the player page. You can verify at any time before then by going directly to the player page.

Verification is a one-time off-chain OAuth flow. You authorize the chosen provider, the platform's backend confirms the OAuth grant, and your wallet's `verified` flag flips to true. The flag is stored on the player profile and shown next to your nickname in race lobbies, leaderboards, and team rosters.

## What verification unlocks

* **Higher daily race creation limit**. Unverified wallets can create up to the standard daily cap. Verified wallets can create up to 50 races per day (500 if also a Runner NFT holder).
* **Tournament eligibility**. Some tournament rule sets require participants to be verified, to keep sybil-style ranking abuse out of the leaderboard.
* **Identity badge**. A small checkmark next to your nickname signals you are verified. Other players see this on race cards and lobbies.

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
