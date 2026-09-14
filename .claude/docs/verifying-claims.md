# Verifying a claim against the code

> The long form of `../rules/accuracy.md`: which file answers which kind of
> claim, the commands that produce the answer, and the specific ways this bundle
> has been wrong before. Load it when a page states a figure, a permission, a
> precondition or a cost.

Reading the sibling repositories is expected, not exceptional. `Anchor/`,
`Backend/` and `Frontend/app/` are all fair evidence, and a claim on a page
should be traceable to one of them.

## Start from the live config, always

```bash
cd ../TheLuckyDucks/Anchor
perl -0777 -ne '
my %n;
while (/"([A-Za-z0-9_]+)"\s*:\s*("?-?[0-9]+"?)/g) { my ($k,$v)=($1,$2); $v =~ s/"//g; push @{$n{$k}}, $v; }
for my $k (sort keys %n) { for my $v (@{$n{$k}}) {
  my $note = "";
  if ($k =~ /Bps$/) { $note = sprintf("= %.2f%%", $v/100) }
  elsif ($k =~ /(Cost|Fee|Penalty|Entry|Amount|Prize|Rent)/i && $v >= 1000) { $note = sprintf("= %.9g SOL", $v/1e9) }
  elsif ($k =~ /(Timeout|Duration|Window|Cooldown|Age|Grace)/i) { $note = $v >= 3600 ? sprintf("= %.4g h", $v/3600) : ($v >= 60 ? sprintf("= %.4g min", $v/60) : "= ${v}s") }
  printf "%-34s %-14s %s\n", $k, $v, $note } }' platform-config-mainnet.json
```

That prints every live tunable with its units converted, which is the table to
check a page against. `state.rs` comes second, and only to learn the bound a
tunable is capped at or to cover a value with no config field.

## Rent, which is arithmetic

Solana charges `(128 + size) * 6960` lamports to keep an account open, and the
dApp's own copy of that math is `Frontend/app/src/shared/utils/rent.ts`
(`PLAYER_ACCOUNT_LEN`, `ATA_SIZE`). A race account is sized for a **full lobby**,
so its rent depends on the seats:

```bash
cd ../TheLuckyDucks/Anchor
perl -0777 -ne '
  my ($body) = /fn calculate_space\(max_players: u16\) -> usize \{(.*?)\n    \}/s;
  $body =~ s{//[^\n]*}{}g; $body =~ s/\s+//g;
  for my $p (2, 5, 10, 20) {
    my $e = $body; $e =~ s/\(max_playersasusize\*(\d+)\)/$p*$1/g;
    my $size = eval $e; my $rent = (128 + $size) * 6960;
    printf "max_players %-3d size %5d bytes  rent %.6f SOL\n", $p, $size, $rent/1e9;
  }' programs/lucky_ducks/src/state.rs
```

The player account is the same formula over `PlayerAccount::LEN`. Note the
warning in `rent.ts`: accounts created under an earlier layout are shorter and
are never reallocated, so an old account paid less than a new one does. Quote
what a new player pays.

## Permissions: who can send this transaction

Two files, in this order:

1. `Anchor/programs/lucky_ducks/src/contexts.rs` for the instruction's
   `#[derive(Accounts)]`. A `Signer<'info>` field is a required signature; no
   `Signer` at all means **anyone** can submit it.
2. The handler in `Anchor/programs/lucky_ducks/src/instructions/` for the
   `require!` lines, which are the refusals.

`FinalizeRace` is the cautionary example: it carries `platform_config`, `race`
and `system_program` and nothing else, so "the backend submits it, and after a
grace window a participant may" was wrong twice over. There is no grace window
and no participant restriction.

## Preconditions: what the program refuses

For any page that describes an action, the validator for that instruction is the
list of ways a player can be told no. `validate_rematch_proposal` in
`helpers.rs` is a good shape to read: sponsored races, non-1v1 races, an
unfinished race, an **already claimed prize**, a non-participant, an existing
proposal, a full chain and a closed window are each a refusal, and a page that
mentions none of them is describing the happy path only.

```bash
grep -n "fn validate_" -A 25 programs/lucky_ducks/src/helpers.rs
```

## Off-chain surfaces

None of this is in the program, and all of it moves without a release.

| Claim on a page                    | Where the truth lives                                                  |
| ---------------------------------- | ---------------------------------------------------------------------- |
| Badge names, thresholds, emoji     | `Backend/packages/shared/src/constants/badges.constants.ts`            |
| Telegram commands and descriptions | `Backend/packages/shared/src/constants/telegram.constants.ts`          |
| The raid card and its labels       | `Backend/packages/telegram/src/raids-render.ts`, `raids-card.ts`       |
| Raid point weights                 | `Backend/packages/telegram/src/raids-x.ts` (`LIKE_PTS`, `RT_PTS`, ...) |
| The race announcement card         | `Backend/packages/telegram/src/race-card.ts`                           |
| Which collections rent             | `Backend/packages/api/src/controllers/nft-rental.controller.ts`        |
| The lounge arcade                  | `Backend/packages/shared/src/constants/arcade.constants.ts`            |
| A screen, a button, a default      | `Frontend/app/src/`, mapped by `Frontend/app/docs/OVERVIEW.md`         |

The badge catalogue is worth extracting rather than reading:

```bash
cd ../TheLuckyDucks
perl -0777 -ne 'while (/\{\s*id:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*description:\s*"([^"]+)",\s*category:\s*"([^"]+)",\s*threshold:\s*([^,]+),[^}]*?emoji:\s*"([^"]+)"/gs) { print "$4 | $2 | $3 | $6\n" }' \
  Backend/packages/shared/src/constants/badges.constants.ts
```

## What has been wrong before

Every one of these shipped in this bundle, and each is a pattern rather than a
typo:

- A figure read from `state.rs` while the live config held another value.
- A minimum quoted an order of magnitude out, which nothing in a page can catch.
- One rent figure for an account whose size, and therefore rent, varies.
- A promised grace window on an instruction that has no signer and no timer.
- A flow documented without the preconditions that refuse it.
- A "no royalties" claim against a plugin that is present at zero.
- A Telegram card and command list that had moved on without the page.
- A feature described as absent ("no on-platform rental flow") that the backend
  has supported all along.

The shape they share: the page was plausible, internally consistent, and never
checked against the thing it described.
