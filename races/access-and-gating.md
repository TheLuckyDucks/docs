# Race access and gating

Every race has a **join setting** that decides who is allowed to enter. By default a race is open to everyone, but you can lock it down to verified players, a private invite list, NFT holders, or token holders.

This page covers each option, when a Runner NFT is (and is not) needed to host, and how these gates stack with the [minimum account age](advanced-options.md#minimum-account-age) option.

## The five join settings

| Setting | Who can join |
|---------|--------------|
| **Open** | Anyone with a wallet. Default. |
| **Verified players only** | Players who have linked and verified a social account (X, Telegram, or Facebook). |
| **Allowed players** | Only the wallets on the creator's invite list. |
| **NFT holders** | Players who hold a minimum number of NFTs from a chosen collection. |
| **Token holders** | Players who hold a minimum balance of a chosen token. |

Players see every race in the list regardless of the setting. If they do not qualify, the Join button stays disabled and the race detail tells them why.

## When you need a Runner NFT to host

Most validation gates (Verified Only, NFT Holders, Token Holders) can be hosted **without** a Runner NFT. Each has its own creator side eligibility check (see the per gate sections below). Allowed Players is the exception among the gates.

A Runner NFT **is** required when you customize a race beyond the basics. Hosting needs a Runner as soon as you:

* give it a custom name,
* add a sponsored prize,
* change the race length from the default (30 seconds),
* open more seats than the standard lobby (more than 5 players),
* set a custom join window or enable start when underfilled,
* enable AI commentary,
* require a minimum account age,
* host without joining as a player, or
* use the **Allowed Players (allowlist)** join setting.

If you host a plain race with default settings and one of the three Runner free gates (Verified Only, NFT Holders, Token Holders), no Runner NFT is needed. The moment you customize it beyond the defaults, or switch to Allowed Players, the Runner NFT is required.

The Runner NFT only needs to be in the host's wallet at create time. Players joining the race never need one; their eligibility depends on the join setting you chose.

## Verified players only

Pick this to limit a race to people who have proven who they are by linking a social account. Players who have not [verified](../trust/verification.md) will see the race but cannot join. This is a good way to cut down on throwaway wallets without managing an invite list yourself.

The creator must themselves be verified to host a Verified Only race. No Runner NFT is required for this gate.

## NFT holders

Pick this to require that each player owns NFTs from a specific collection. You choose the collection and the **minimum number** a player must hold (at least one).

The collection must be one that the platform has approved (whitelisted) for gating. The current list of approved collections is maintained by the team; if the collection you want to gate on is not on the list, the create transaction will refuse to go through. This exists so a creator cannot gate on an arbitrary or spammy collection.

When an eligible player joins, the app checks their wallet and prepares a one time eligibility pass for that join, so the race confirms they qualify at the moment they enter. This works across NFT types on Solana, including Metaplex Core and compressed NFTs, so most approved collections are supported.

Creator side eligibility: no Runner NFT is required, provided the collection is approved. The creator's auto join is subject to the same threshold check as any joiner (the backend will not sign their eligibility pass unless they hold the minimum number themselves). If you host without playing, only the collection whitelist gate applies at create time.

A few things worth knowing:

* Eligibility is based on **how many NFTs you hold right now**, not how long you have held them.
* Each NFT can secure **one seat per race**. The same NFT cannot be used to take two spots in the same race.
* The eligibility pass is short lived, so finish your join promptly after the app prepares it. If it expires, just join again.

## Token holders

Pick this to require a minimum balance of a specific token. You choose the token and the **minimum amount** (greater than zero). The check happens directly on chain when a player joins, so there is no extra preparation step beyond signing the join transaction.

The token must be one that the platform has approved (whitelisted) as a gating asset. This is the same list used for SPL prize tokens; the current entries are visible in the token picker at race creation. If the token you want to gate on is not on the list, the create transaction will refuse.

The gating token does not have to be the same as the race's prize token: you can run a SOL race that requires holding USDC, or a USDC race that requires holding AMPS, and so on. Both legacy SPL Tokens and Token-2022 mints are supported, the same as for [token races](../economy/spl-tokens.md).

Creator side eligibility: no Runner NFT is required, provided the token is approved. If you auto join your own race, the contract also checks your balance meets the threshold at create time. In host mode (creating without auto joining) the balance check runs only when you later join.

## Allowed players (private invites)

Pick this to invite specific wallets to a private race. You can invite up to **20 wallets**, which is also the maximum number of players a race can hold.

How it works:

* Add the wallets you want to invite, one per line, when you create the race.
* The creator's wallet is treated specially depending on how the race is created:
  * In a **normal** (non-sponsored, non-host) race, the creator is auto joined as the first player. The allowlist check is skipped for that one auto join, so you do not need to add your own wallet to the list.
  * In a **host mode** race, the creator does not auto join. If you want to join your own host mode race later, your wallet must be on the allowlist like any other joiner. Host mode itself requires a Runner NFT, since it counts as customization.
  * In a **sponsored** race, the creator does not play at all, so the allowlist does not affect them.
* If your wallet is on the list, the race shows an active Join button and you can enter like any other race.
* The invite list is held for about an hour while you build it and complete the create transaction. If you take longer than that and the hold expires, just re-enter the list and create again. No funds are involved at this step, so an expired hold costs nothing.

A note on how the list is stored: only a short fingerprint of the list is recorded on chain with the race, not the wallets themselves. The full list lives off chain on the platform backend and is exposed through the race endpoints, so the dApp and anything reading the API can see who is invited. The list is not secret; the on chain fingerprint is just a way to verify the list has not been tampered with between creation and join time.

For groups larger than 20 wallets, use a public race with another join setting (for example NFT Holders, Token Holders, or Verified Only) instead.

Hosting an Allowed Players race requires a Runner NFT (unlike the other gates). This is because the allowlist itself counts as a customization: the contract has to store the invite list root and verify each joiner's proof against it.

## Stacking with minimum account age

The optional [minimum account age](advanced-options.md#minimum-account-age) gate stacks on top of any join setting. For example, you can run an NFT Holders race that also requires each wallet to have a player account at least a certain age. Both checks must pass: a player must hold the required NFTs **and** meet the age requirement.

## Gating and creator rewards

Creator rewards are tied to the Runner NFT, not to the gate you chose. A host who creates with a Runner NFT unlocks the [Creator Fee Share](../economy/creator-fee-share.md), and adding a Track NFT raises that share further, up to the cap. If you host a gated race without a Runner, the race still runs, but you do not earn a creator share on it. Races created by the platform itself (auto hosted system races) do not earn a creator share either, since there is no individual creator wallet to pay it to.

## Good to know

* The host is auto joined when the race is created (in normal, non-sponsored, non-host mode), so you do not enter your own race separately.
* Switching a race to Verified Only, NFT Holders, or Token Holders on its own does not require a Runner NFT. Switching to Allowed Players does. Runner is also required once you customize the race beyond the defaults.
* For NFT and Token gates, the minimum must be greater than zero. Setting it to zero would let everyone in, which is the same as Open, so it is not allowed.
* For NFT and Token gates, the collection or token has to be on the platform's approved list. If it is not, the create transaction refuses.
* Players always see gated races in the list. They simply cannot join unless they meet the requirement, and the Join button reflects that.
