---
description: Where every number and mechanic on a page comes from, and how to check one. Read before writing or changing any figure, limit, fee, percentage or timeout.
paths:
  - "**/*.md"
---

# Checking a claim

Nothing in this repository verifies a claim. `npm run check` reads structure
only, so a page with perfect front matter, balanced blocks and live links can
still carry a wrong fee, and it ships silently for a player to act on. **A
number on a money page is the highest-cost defect this bundle can carry.**

Every mechanic described here is behaviour of a deployed Solana program, and
every figure is either a constant in that program or a value in its on-chain
config. Both live in sibling repositories under `TheLuckyDucks/`.

## Claim to source

| A page claims                                                | Authoritative source                                                               |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| A live fee, penalty, cap, timeout, percentage or threshold   | `Anchor/platform-config-mainnet.json`                                              |
| A default, a bound on a tunable, or a hard-coded limit       | `Anchor/programs/lucky_ducks/src/state.rs`                                         |
| What an instruction does, and the edge cases around it       | `Anchor/docs/program-reference.md`                                                 |
| Refunds, penalties, rent, who pays for what                  | `Anchor/docs/program-reference.md`, `Anchor/.claude/rules/vault-and-delegation.md` |
| Randomness, VRF, how a winner is determined                  | `Anchor/programs/lucky_ducks/src/helpers.rs`, `calculate_finish_time`              |
| A wallet flow, a button, what a screen shows                 | `Frontend/app/`, mapped by `Frontend/app/docs/OVERVIEW.md`                         |
| XP, leaderboards, badges, standings, the Telegram bot, raids | `Backend/`. None of it is on chain                                                 |
| A collection address, or which NFT gates what                | `Anchor/platform-config-mainnet.json`, the `nftCollection*` fields                 |

The general shape of the game, written for a player rather than a developer, is
`Anchor/README.md`. It is the closest thing to a peer of this bundle and a good
first stop when a page needs to describe a mechanic end to end.

## Mainnet is the source, not the constant

`state.rs` constants are what a **freshly initialized** config is seeded with.
The live values are in the on-chain `PlatformConfig` account, and
`platform-config-mainnet.json` mirrors it. They diverge whenever an
administrator updates a tunable, which is a transaction rather than a release.

Read the JSON first. Fall back to `state.rs` only for something that has no
config field, or to learn the bound a tunable is capped at.

**This is the single largest source of wrong figures on these pages.** Four
divergences were live at once, each one a page that had quoted the constant:
the race duration ceiling (`maxRaceDuration` well under `MAX_RACE_DURATION`),
the lobby window (`joinTimeout` far above `JOIN_TIMEOUT_DEFAULT`), the team cap
(`maxTeamMembers` above `MAX_TEAM_MEMBERS_DEFAULT`) and the per-action delegate
charge (`delegateTxCost` a multiple of `DELEGATE_TX_COST_DEFAULT`). A constant
that looks like a plausible answer is exactly how this defect ships.

```bash
cd ../TheLuckyDucks/Anchor
cat platform-config-mainnet.json
```

Units in that file: lamports for SOL amounts as strings, seconds for durations,
basis points for `*Bps` fields, plain percentages for the podium splits. One SOL
is 1,000,000,000 lamports, and one percent is 100 basis points, so `feeBps: 1000`
is ten percent and `creatorFeeShareRunnerBps: 4000` is forty.

## Traps that produce a confidently wrong page

- **`state.rs` holds two values for many constants.** Timeouts, windows and
  limits have a `#[cfg(feature = "test-mode")]` twin, and the test value is
  often the one a grep reports first. A withdraw window of ten seconds is the
  test constant; the production one is minutes. Always look at which `cfg` block
  the hit sits in.

  ```bash
  grep -n -B1 'cfg(feature = "test-mode")' programs/lucky_ducks/src/state.rs
  ```

- **The player cap includes the creator.** `maxPlayers` is the total size of the
  lobby, so a cap of twenty means a player races against nineteen others. Every
  "race against N other players" sentence is an off-by-one waiting to happen.
- **`DEFAULT_MAX_PLAYERS` and `MAX_PLAYERS_DEFAULT` are different things.** One
  is the lobby size a race gets when the creator picks nothing, the other is the
  largest lobby anyone may configure. The names are one word apart and mean
  opposite ends of the same range.
- **Fee tiers are thresholds, not brackets.** The rate is chosen by which
  threshold the entry fee falls under, and the whole fee is charged at that one
  rate. There is no progressive banding, and describing it as one would overstate
  what a large race pays.
- **SOL and token races are separate instructions with the same rules.** A
  mechanic verified on the SOL path almost always holds on the token path, but
  the costs paid in SOL (rent, penalties, network fees) stay in SOL there. Say
  which currency a figure is in whenever a page is about token races.
- **Rent is computed, not configured, and a race's rent is not one number.** The
  race account is sized for a full lobby, so its rent scales with the seats and
  quoting a single figure is wrong for every race but one. Compute it from
  `Race::calculate_space` rather than guessing, and say which lobby size the
  figure belongs to.
- **Who may send a transaction is answered by the `Accounts` struct, not by the
  prose.** A page once promised a grace window and a participants-only fallback
  on an instruction that takes no signer at all. Read the `#[derive(Accounts)]`
  in `Anchor/programs/lucky_ducks/src/contexts.rs` for `Signer` fields before
  claiming anyone is privileged, or that anyone is excluded.
- **A page that describes the button misses what the program refuses.** The
  rematch page documented the flow and none of its preconditions, so two
  refusals a player can hit went unmentioned: a claimed prize and a sponsored
  race. Read every `require!` in that instruction's validator and cover each
  refusal a player can actually reach.
- **A feature being "off" and being "absent" are different claims.** Two pages
  disagreed about royalties because one read a plugin as missing and the other
  read it as present. It is present at a rate of zero. When a page says a
  feature does not apply, establish whether it is absent or neutral, and ask if
  the answer is only visible on chain.
- **Backend surfaces drift with no program change.** The Telegram card, its
  metric labels and the command catalogue all moved while the contract stood
  still. Before editing `help/telegram-bot.md`, read the renderer and the
  catalogue rather than the page. `../docs/verifying-claims.md` names the files.
- **When the frontend and the program disagree, the program wins, and a
  frontend COMMENT is the weakest evidence in the repository.** The NFT Holders
  gate is premium in `is_premium_base`, so creating one always needs a Runner,
  while a comment in the create form still described it as free when the
  collection is whitelisted. Whitelisting decides which collections may gate;
  it has not decided create cost since that changed. A page written from the UI
  layer inherits whatever the UI has not caught up on.

## Phrase a tunable so an admin change cannot falsify the page

An administrator can change most figures without a release, so a page that
states one as a fact goes stale without anybody editing anything.

- Prefer the mechanism: "the platform fee drops as the entry fee rises, and the
  exact rate is shown before you confirm."
- When an exact figure genuinely helps, put it in a **worked example** with its
  own stated inputs. An example that says "a 1 SOL pool at a 3 percent fee"
  stays readable and honest even after the rate moves, in a way that "the fee is
  3 percent" does not.
- Point at the surface that shows the live value. The confirmation screen and
  the explorer are always right; a sentence here is right until someone signs a
  transaction.

Values that are NOT admin-tunable can be stated flatly: the program id, the
podium split having exactly three places, the fact that there are no ties, the
fact that a seed cannot be changed after it is committed.

## Before changing a figure

1. Find the field in `platform-config-mainnet.json`, or the constant and its
   `cfg` block in `state.rs`.
2. Convert the units. Lamports to SOL, basis points to percent, seconds to
   minutes.
3. Grep this bundle for the old figure. The same number usually appears on more
   than one page, and in a worked example whose arithmetic then has to be redone.

   ```bash
   grep -rn "0.05 SOL" --include=*.md .
   ```

4. Re-check any worked example that consumed it. An example with stale
   arithmetic is worse than no example, because it looks verified.

If the sibling repositories are not checked out, say the figure could not be
verified rather than carrying it over from the surrounding prose. An unverified
number that reads plausibly is exactly the defect this rule exists to stop.
