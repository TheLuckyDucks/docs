# How to verify a Lucky Ducks race on-chain

This guide walks through verifying a race independently of the Lucky Ducks website, using public Solana block explorers. By the end, you can confirm yourself that every race is provably fair: the randomness comes from a public source, anyone can recompute the winner, and the payout went where the program said it would.

## Before you start — what you need

You need three things: the program address, a block explorer, and the race ID from the race you want to verify.

* **Program address**: `DuckBzSivbVv6b5zAw6EGP8YtLBbXwZmcoJPTQ5m1BkM`
* **Block explorers**: any of these work. Solana Explorer doesn't render Anchor 0.30+ IDLs well, so prefer Solscan or SolanaFM for inspecting account contents.
  * Solscan: `https://solscan.io/account/<address>`
  * SolanaFM: `https://solana.fm/address/<address>`
  * Solana Explorer: `https://explorer.solana.com/address/<address>`
* **Race ID**: every race has a sequential number, visible in the UI and in the race URL. The race ID is what makes the race's accounts predictable: anyone who knows the ID can derive every account the race uses and look at it directly.

The ORAO VRF program — the third-party randomness oracle Lucky Ducks uses — has its own address: `VRFzZoJdhFWL8rkvu87LpKM3RbcVezpMEc6X5GVDr7y`. We'll come back to this in the VRF section.

## Step 0 — Verify the program itself is legitimate

This step is one-time, not per-race. You're checking that the deployed program matches the open-source code and hasn't been silently modified.

Open the program address on Solscan. Look for three things.

**Owner**: should be `BPFLoaderUpgradeab1e11111111111111111111111`. This is the Solana upgradeable-loader program — every standard upgradeable program shows this owner. If it shows anything else, something is off.

**Upgrade authority**: this is the wallet that can deploy new versions of the program. Healthy options are either a single address that the team has documented publicly, or `None` (meaning the program is permanently locked at its current version). An anonymous upgrade authority that doesn't match any disclosed wallet is a yellow flag — the team could push a malicious update at any time.

**Last deployed slot**: the slot number when the current version was deployed. Compare this with the team's announced version history. A surprise recent deploy that wasn't announced is a yellow flag.

For the most thorough check, the team should publish a build hash that you can reproduce locally with `solana-verify`. If they have, run it: it confirms the on-chain bytes match the publicly available source code.

## Step 1 — Find the race account

Every race lives in a Program Derived Address (PDA) that anyone can compute given just the race ID. The PDA is deterministic — the program can't lie about which address a race lives at.

The PDA derivation is `[b"race", platform_config_pubkey, race_id_as_u64_le]`. You don't have to compute it by hand. The Lucky Ducks UI shows it on the race page, and any block explorer search by race ID will surface it.

Once you have the race PDA, open it in Solscan. The "Data" or "Anchor" tab shows the race account decoded into fields. Read these in order:

* **creator**: the wallet that started the race
* **race\_id**: should match the ID you searched for
* **entry\_fee**: the SOL or token amount each player paid
* **max\_players**: how many players the race accepts
* **prize\_pool**: the actual SOL or token amount at stake. After all joiners, this should be `entry_fee × number of players` (for non-sponsored races) or the sponsor's deposit (for sponsored races). For races that started underfilled, it'll be less than `entry_fee × max_players` — that's expected.
* **status**: where in its lifecycle the race is. Possible values are `Open`, `VRFPending`, `Racing`, `Completed`, `Cancelled`, `Refunded`.
* **players**: the list of player wallets that joined
* **randomness\_account**: the address of the ORAO VRF account that will provide (or already provided) the random seed. Empty for races still in `Open`. We'll inspect this in step 4.
* **vrf\_seed**: the actual random seed used to determine winners. Empty until VRF is fulfilled and consumed.
* **winners**: the list of winning wallets. Empty until the race is finalized.

Everything you see in the UI for this race should match what's on chain. If the UI claims a race has a 10 SOL prize pool but the race account shows 1 SOL, the UI is lying.

## Step 2 — Verify race creation

In the race PDA's "Transactions" tab on Solscan, scroll to the very first transaction. That's the `create_race` (or `create_race_token`) call.

Click through to the transaction details. You'll see:

* The creator's wallet signed and submitted the tx
* Two new accounts were created: the race account and a "race vault" PDA
* The creator transferred a few amounts of SOL to the race vault: their entry fee (if non-sponsored), the VRF cost (paid up front so the race can pay the oracle when randomness is requested), and optionally an audio cost
* An on-chain log entry — visible in the "Program Logs" section of the tx — reads `Race #N: created by ABC... (entry: X, players: Y, mode: Z, sponsored: bool)`

The race vault is the address where all the race's money lives. Find it the same way: it's a PDA derived from the race address, and Solscan will link directly to it from the race's tx history. Watch the vault's balance grow as players join and shrink to zero when prizes are paid out.

## Step 3 — Verify each join

Every time a player joins, there's a separate `join_race` transaction with that player's signature. In the race PDA's tx history you'll see one such tx per joiner.

Each join tx should show: the joiner's wallet signing, the joiner transferring `entry_fee` lamports (or tokens) from their wallet to the race vault, and a log entry `Race #N: Player ABC... joined`.

Two things to double-check: the wallet that signed is the wallet appended to the `players` list on the race account, and the amount transferred equals the race's `entry_fee` exactly. Both should always be true; if either is off, something is wrong.

If the race is sponsored, joiners don't pay an entry fee — the sponsor funded the pool at creation. In that case the join tx still has the joiner signing but no SOL transfer.

## Step 4 — Verify the randomness source

This is the most important step for trust. Lucky Ducks doesn't generate its own randomness — it uses ORAO VRF, a third-party verifiable random function. The race outcome is determined by a seed that ORAO produces and signs, and anyone can verify the seed came from ORAO by looking at the on-chain accounts.

In the race account's "Transactions" tab, find a transaction with `request_randomness` in its instructions. This is the moment Lucky Ducks asked ORAO for a random number for this specific race.

In that tx you'll see:

* A call to the Lucky Ducks program (the `request_randomness` instruction)
* A nested invocation of the ORAO VRF program (`VRFzZoJdhFWL8rkvu87LpKM3RbcVezpMEc6X5GVDr7y`)
* A new account created: this is the ORAO randomness account for this race. Its address is exactly what appears in the race's `randomness_account` field. Click through to it.

The randomness account starts empty (no seed yet). Then, within seconds, the ORAO fulfillment authority — a wallet operated by ORAO, *not* by Lucky Ducks — signs and submits a transaction that writes the seed into the account.

In the randomness account's tx history, look for the fulfillment transaction. It's signed by an ORAO-operated wallet, calls the ORAO program, and writes the seed bytes into the account. After fulfillment, the seed is publicly visible: anyone can read it. There's no way for Lucky Ducks to change it after the fact, because the account is owned by the ORAO program, not the Lucky Ducks program.

This is the proof that the randomness is fair. Lucky Ducks doesn't control the seed; ORAO does. ORAO doesn't know which players are in the race and can't bias the result toward any of them. Both parties (Lucky Ducks and ORAO) would have to collude — and even then, the seed is generated by ORAO's cryptographic procedure and is publicly checkable against ORAO's public key.

One subtle thing worth understanding: the seed becomes publicly readable the moment ORAO fulfills, which is usually before the race's `race_duration` has elapsed. Anyone watching the chain can compute the winner before the race officially "ends." The Lucky Ducks backend deliberately delays finalization until the race timer runs out, so the UI feels suspenseful. But the outcome is locked in by VRF the second the seed is fulfilled — no one can change it.

## Step 5 — Verify winner determination

Once the seed is on chain, a `consume_randomness` instruction reads it from the ORAO account and writes it into the race account's `vrf_seed` field. After that, anyone can recompute who the winner should be.

Find the `finalize_race` transaction in the race's tx history. This is where winners are determined. Inspect:

* The transaction's program logs include `Race #N: Finalized - X winner(s) determined`
* The race account's `status` field changes to `Completed`
* The race account's `winners` field is now populated

The winner-selection algorithm is deterministic: given the seed and the player list (including each player's NFT speed boost, if any), there is one and only one correct winner (or winning podium). The algorithm is published in the source code of the Lucky Ducks program. You can read it on GitHub and recompute the winner yourself from the seed and player data — the result must match what's in the `winners` field.

For races with a single winner (Winner-Takes-All mode), exactly one wallet is in `winners`. For podium mode, three wallets are listed in order: 1st, 2nd, 3rd.

If the wallet in `winners[0]` doesn't match what the algorithm produces from `vrf_seed` and `players`, the program is broken — but because the algorithm runs on-chain inside the program (which has a public, verified hash), this can't happen unless the program itself has been compromised.

## Step 6 — Verify the payout

The final step is the `claim_prize` (or `claim_prize_token`) transaction. Find it in the race's tx history. Inspect:

* The transaction calls the Lucky Ducks program with the `claim_prize` instruction
* Money leaves the race vault: typically 95% to the winner(s), 5% to the platform fee wallet (the exact split depends on the [platform fee tier](../economy/fees-and-prizes.md#platform-fee-tiers) for this pool size)
* For podium races, the winner amounts follow the configured split (50/30/20 by default)
* The race account is eventually closed (its rent is returned to the creator) once everything is settled

You can verify the exact amounts by looking at the SOL or token balance changes on each account in this transaction:

* Race vault: goes to zero (or near zero)
* Winner wallet: receives `prize_pool × (1 - fee_pct) × winner_share`
* Platform fee wallet: receives `prize_pool × fee_pct`

The fee wallet address is stored in the platform config account (also a PDA, derived as `[b"platform_config"]` under the program). Open it the same way and check that the wallet receiving fees matches what's declared there.

If a race had a token prize instead of SOL, the same flow applies but with SPL token transfers instead of SOL transfers. The platform supports both the legacy SPL Token program and SPL Token-2022 — the destination ATAs and the transfer instructions will differ slightly depending on which program owns the mint, but the verification logic is the same. Solscan shows token balance changes on the "Tokens" tab of each transaction.

## What to look for as red and green flags

**Healthy signals.** Race PDA exists at the predicted address. Vault balance matches the announced prize pool. The randomness account is owned by ORAO's program, not Lucky Ducks'. Seed was written by an ORAO-signed transaction. Finalize-race tx ran successfully, winners match the deterministic algorithm. Claim-prize tx sent the prize to the winner and the correct percentage to the fee wallet. Everything happened in the order create → joins → request → fulfill → consume → finalize → claim, with timestamps that make sense.

**Yellow flags worth asking about.** Upgrade authority is a wallet you can't identify and the team hasn't published a deploy schedule. Random-looking accounts get mixed into transfers that the UI doesn't explain. Fees are higher than the tier schedule the platform documents. A race took unusually long between fulfillment and finalize (acceptable for the suspense delay, but if it's hours, something is wrong).

**Red flags that should stop you from playing.** The `randomness_account` field on the race is set to an address that isn't owned by the ORAO program. The seed in `vrf_seed` doesn't match what's at the ORAO randomness account. Winners listed don't match what the algorithm produces. The payout transaction sent SOL to a wallet that isn't the winner or the documented fee wallet. The race account doesn't exist at the predicted PDA, meaning the UI is showing a "race" that has no on-chain backing. Any one of these means something is fundamentally wrong — either a bug or a scam.

## A worked example

Say you played race #142 and won 9.5 SOL. To verify it end-to-end:

1. Look up race #142 in the UI; copy the race address from the page or derive it as the PDA.
2. Solscan that race address. Confirm `winners[0]` is your wallet.
3. Click through to `randomness_account`. Confirm the account is owned by the ORAO VRF program.
4. Read `vrf_seed` from the race account and the seed bytes in the ORAO account. They should match.
5. Find the `claim_prize` transaction in the race's tx list. Confirm: 9.5 SOL went from race vault to your wallet, 0.5 SOL went from race vault to the fee wallet (5% of 10 SOL prize pool at the 5% tier), race vault balance is now near zero, race account is closed.

If all five check out, the race was fair and the payout was correct. Total verification time once you know what to click on: about three minutes.

## Why this matters

The whole point of blockchain games is that you don't have to trust the operator. Everything that affects your money is enforced by code that anyone can read, executed by validators that no one party controls, with randomness from an oracle that signs its outputs. If a Lucky Ducks race ever produces a result you can't reproduce by following these steps, the right move is to stop playing and ask the team to explain — not to assume good faith and keep going.

The flip side: when verification checks out, you have real cryptographic certainty, not just a company's word, that the race ran honestly. That's a stronger guarantee than any traditional online platform can give.
