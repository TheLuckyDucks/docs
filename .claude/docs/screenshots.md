# Shot list

> Every image the published pages reference, what each one has to show, and how
> to tell which ones are still placeholders. A `<figure>` whose file is absent
> renders as a broken image on a live public page, so this list is the gate
> between a page edit and a push.

`../rules/documentation.md` carries the figure markup, the naming prefixes and
the rule that a page must read correctly with every image stripped out. This
file is the inventory and does not repeat them.

## Two files per screenshot, side by side

**Every screenshot is a pair: a desktop capture and a phone capture**, shown in
one row by a `{% columns %}` block at 70/30, which GitBook stacks vertically on
a narrow screen. The platform is played on phones, so a desktop-only shot
describes an experience most readers do not have.

```
{% columns %}
{% column width="70%" %}
<figure><img src="../.gitbook/assets/races/app-create-race-form-desktop.png" alt="..."><figcaption><p>What it tells the reader.</p></figcaption></figure>
{% endcolumn %}

{% column width="30%" %}
<figure><img src="../.gitbook/assets/races/app-create-race-form-mobile.png" alt="..., on a phone"><figcaption><p>On a phone</p></figcaption></figure>
{% endcolumn %}
{% endcolumns %}
```

The desktop caption carries the meaning; the phone caption is always `On a
phone`, because the pair shows one thing twice. The phone `alt` is the desktop
`alt` plus `, on a phone`.

**Artwork is single.** A cover, a card cover or an art grid is one file with no
viewport pair, and it sits outside any columns block.

## Folders

Assets live under `.gitbook/assets/<section>/`, where the section is the page
folder that uses them. It keeps a pair adjacent, keeps a section's shots
together, and makes an orphan obvious.

| Folder                   | Holds                                                          |
| ------------------------ | -------------------------------------------------------------- |
| `.gitbook/assets/brand/` | Artwork for the root `README.md`: the space cover and its hero |
| `introduction/`          | Getting Started                                                |
| `races/`                 | Races, and the cost breakdown `economy/` borrows               |
| `nfts/`                  | Collections, boxes, renting, and the six card covers           |
| `competition/`           | Tournaments, teams, rematches, badges, lottery                 |
| `economy/`               | Vault, payouts, creator share, refunds, tokens                 |
| `trust/`                 | Verification, and the four block explorer shots                |
| `help/`                  | Telegram                                                       |

An asset used by two pages lives in the folder of the page that owns the
subject, and the other page reaches it by relative path. There is one:
`races/app-create-race-cost-breakdown-*`, which `economy/fees-and-prizes.md`
also shows.

{% hint style="warning" %}
**An image re-uploaded through the GitBook web editor lands flat in
`.gitbook/assets/` and loses its folder**, because that is where the editor
writes. Replace a capture through git, not through the editor, or this layout
decays one file at a time.
{% endhint %}

## Which files are missing

Run from the repository root. It reads the published pages only, so the example
paths in `CLAUDE.md` and `IMPORTING.md` do not show up as gaps:

```bash
grep -rho '\.gitbook/assets/[A-Za-z0-9._/-]*\.png' --include='*.md' \
  --exclude-dir=.claude --exclude=CLAUDE.md --exclude=IMPORTING.md . \
  | sed 's|.*\.gitbook/assets/||' | sort -u \
  | while read -r a; do [ -f ".gitbook/assets/$a" ] || echo "MISSING $a"; done
```

An empty result means every figure on every page resolves. The reverse check,
for assets nothing references any more:

```bash
find .gitbook/assets -name '*.png' | sed 's|^\.gitbook/assets/||' \
  | while read -r a; do grep -rq "assets/$a" --include='*.md' --exclude-dir=.claude . \
    || echo "ORPHAN $a"; done
```

A third check, that every pair is complete:

```bash
find .gitbook/assets -name '*-desktop.png' | while read -r f; do
  [ -f "${f%-desktop.png}-mobile.png" ] || echo "NO PHONE SHOT $f"; done
find .gitbook/assets -name '*-mobile.png' | while read -r f; do
  [ -f "${f%-mobile.png}-desktop.png" ] || echo "NO DESKTOP SHOT $f"; done
```

## Every file is currently a generated placeholder

Each one is a flat dark card carrying `DESKTOP PLACEHOLDER`, `PHONE
PLACEHOLDER` or `ARTWORK PLACEHOLDER` in gold, the shot it stands in for, and
its own path in mono. They exist so no page renders a broken image before the
real captures land, which means the missing-file check above comes back empty
and is no longer the question worth asking. The question is which ones are
still placeholders, and a placeholder announces itself on the page.

Placeholders are the only assets at exactly the generated sizes, so this lists
the ones nobody has replaced yet:

```bash
find .gitbook/assets -name '*.png' | while read -r f; do
  d=$(perl -e 'open my $h, "<", $ARGV[0] or die; binmode $h; read $h, my $b, 33;
               my ($w, $y) = unpack("x16NN", $b); print "${w}x$y"' "$f")
  case "$d" in 1440x810|390x640|1280x720|1990x480) echo "placeholder $f $d" ;; esac
done
```

A real capture at 2x will not match those numbers. If one happens to, the page
is the tiebreak: look at it.

To regenerate one, render it in WSL where ffmpeg lives. `label.txt` holds the
wrapped caption, one line per line, because `drawtext` does not wrap:

```bash
ffmpeg -nostdin -y -f lavfi -i "color=c=0x0E1218:s=1440x810" \
  -vf "drawbox=x=10:y=10:w=1420:h=790:color=0x2A313B:t=3,\
drawtext=fontfile=/usr/share/fonts/truetype/ubuntu/Ubuntu-B.ttf:text=DESKTOP PLACEHOLDER:fontsize=30:fontcolor=0xFFD700:x=(w-text_w)/2:y=81,\
drawtext=fontfile=/usr/share/fonts/truetype/ubuntu/Ubuntu-B.ttf:textfile=label.txt:fontsize=40:fontcolor=0xE9EAEC:line_spacing=10:x=(w-text_w)/2:y=(h-text_h)/2,\
drawtext=fontfile=/usr/share/fonts/truetype/ubuntu/UbuntuMono-R.ttf:text=races/NAME-desktop.png:fontsize=22:fontcolor=0x11D4C4:x=(w-text_w)/2:y=709" \
  -frames:v 1 .gitbook/assets/races/NAME-desktop.png
```

**`-nostdin` is not optional in a loop**: ffmpeg reads stdin for keypresses and
swallows one byte per invocation, which silently eats the first character of
every following line of whatever list is being piped in.

## How to capture

- **One component, not a browser.** Crop to the panel, modal, card or row the
  caption is about. No window chrome, no address bar, no operating system dock.
- **Desktop at a desktop width, phone at ~390 logical px.** Capture at 2x pixel
  ratio and let GitBook scale down. Crop the phone shot to the component too: a
  full device screen sits in a 30% column and nothing in it will be legible.
- **The app's own dark theme, both times.** The published site renders in the
  reader's theme, but these are pictures of a dark product, and mixing light and
  dark captures across a pair looks like a bug.
- **The same state in both halves of a pair.** Same race, same balance, same
  selection. A pair that disagrees reads as two different features.
- **Nobody else's identity.** A lobby or a leaderboard shows real players. Use
  the team's own wallets, or a devnet lobby, or crop the other rows out. Never
  publish another player's handle, avatar or wallet without asking.
- **Plausible, non-record amounts.** A screenshot of a 40 SOL pot reads as a
  promise. Prefer the small figures a new player will actually see.
- **PNG, and the exact path below.** Drop it in and the page picks it up with no
  edit. That is the point of fixing the names here.

Two sizes are special: `brand/docs-cover-welcome.png` is the space cover and
wants roughly **1990x480**, and the six `nfts/nft-card-*.png` are card covers,
so a **16:9** crop of collection art each.

## brand/ (artwork, single files)

| File                        | Page        | Shows                                                                   |
| --------------------------- | ----------- | ----------------------------------------------------------------------- |
| `docs-cover-welcome.png`    | `README.md` | The space cover. Pond, flock, wordmark. 1990x480, readable when cropped |
| `docs-hero-race-canvas.png` | `README.md` | A five duck race mid-run with position markers, wide crop of the canvas |

## introduction/

Each row is two files: `<name>-desktop.png` and `<name>-mobile.png`.

| Shot                      | Page                                  | Shows                                                           |
| ------------------------- | ------------------------------------- | --------------------------------------------------------------- |
| `app-connect-wallet`      | `introduction/getting-started.md`     | The connect dialog with the wallet list                         |
| `app-lobby-list`          | `introduction/getting-started.md`     | Three or four open race cards: entry fee, pool, slots, duration |
| `app-race-finish-claim`   | `introduction/getting-started.md`     | The post race screen: finishing order, claim button with amount |
| `app-lobby-filling`       | `introduction/how-it-works.md`        | One lobby at four of five seats, each with avatar and nickname  |
| `app-race-canvas-midrace` | `introduction/what-is-lucky-ducks.md` | Ducks part way down the lane with the standings overlay         |

## races/

| Shot                             | Page                                                     | Shows                                                             |
| -------------------------------- | -------------------------------------------------------- | ----------------------------------------------------------------- |
| `app-create-race-form`           | `races/creating-a-race.md`                               | Top of the create form: entry fee, max players, duration, mode    |
| `app-create-race-cost-breakdown` | `races/creating-a-race.md`, `economy/fees-and-prizes.md` | The itemised cost box, rent line visible                          |
| `app-race-detail-modal`          | `races/joining-and-playing.md`                           | The detail modal with participants, boost and cosmetic tabs       |
| `app-claim-prize`                | `races/joining-and-playing.md`                           | The claim button with the payout on it, finishing order beside it |
| `app-login-linked-account`       | `races/without-the-wallet-app.md`                        | The login screen offering a linked account next to connect wallet |
| `app-delegated-signing-panel`    | `races/delegated-play.md`                                | The delegated signing panel: duration, expiry, revoke             |
| `app-race-cards-modes`           | `races/race-modes.md`                                    | Two cards side by side, one WTA badge, one Podium Split badge     |
| `app-join-setting-picker`        | `races/access-and-gating.md`                             | The join setting selector open, all five options visible          |
| `app-link-external-wallet`       | `races/access-and-gating.md`                             | The link an external wallet panel with the supported chains       |
| `app-gated-race-join-disabled`   | `races/access-and-gating.md`                             | A gated race with Join disabled and the requirement stated        |
| `app-advanced-options-panel`     | `races/advanced-options.md`                              | The opt in toggles with their costs shown                         |
| `app-underfilled-slider`         | `races/advanced-options.md`                              | The start-when-underfilled slider at 7 on a 10 player race        |
| `app-cancel-race-confirm`        | `races/hosting-and-cancelling.md`                        | The cancel confirmation: refund to players, flat SOL penalty      |
| `app-daily-allowance`            | `races/daily-races.md`                                   | Races remaining today and the exact reset time                    |

## nfts/

| Shot                            | Page                    | Shows                                                          |
| ------------------------------- | ----------------------- | -------------------------------------------------------------- |
| `app-marketplace-collections`   | `nfts/README.md`        | The marketplace filtered by collection                         |
| `app-create-race-runner-locked` | `nfts/runners.md`       | The create form with gated options dimmed, each with the chip  |
| `nft-runner-example`            | `nfts/runners.md`       | One Runner in the marketplace with its traits beside it        |
| `app-boost-picker`              | `nfts/boosts.md`        | The boost picker in the join modal, each with its percentage   |
| `app-boost-badges-lobby`        | `nfts/boosts.md`        | A participant list where two players carry boost badges        |
| `app-no-boost-race-card`        | `nfts/boosts.md`        | A race card with the crossed-out circle marker                 |
| `app-cosmetic-picker`           | `nfts/cosmetics.md`     | The cosmetics tab with one skin selected and the duck preview  |
| `app-mystery-box-types`         | `nfts/mystery-boxes.md` | The three box types with price and remaining supply            |
| `app-mystery-box-reveal`        | `nfts/mystery-boxes.md` | The reveal progress part way through, one step active          |
| `app-marketplace-rent-button`   | `nfts/renting.md`       | A tier with Rent beside Buy                                    |
| `app-rental-duration-slider`    | `nfts/renting.md`       | The day slider with shortcut marks and the total on the button |
| `app-rented-ribbon`             | `nfts/renting.md`       | A picker tile carrying the RENTED ribbon                       |

Single files in the same folder, all artwork:

| File                         | Page                | Shows                                                              |
| ---------------------------- | ------------------- | ------------------------------------------------------------------ |
| `nft-card-runners.png`       | `nfts/README.md`    | Card cover, 16:9, Runner art                                       |
| `nft-card-boosts.png`        | `nfts/README.md`    | Card cover, 16:9, Boost art                                        |
| `nft-card-tracks.png`        | `nfts/README.md`    | Card cover, 16:9, a track background                               |
| `nft-card-cosmetics.png`     | `nfts/README.md`    | Card cover, 16:9, two or three duck skins                          |
| `nft-card-mystery-boxes.png` | `nfts/README.md`    | Card cover, 16:9, a sealed box                                     |
| `nft-card-renting.png`       | `nfts/README.md`    | Card cover, 16:9, an item with the Rental label                    |
| `nft-cosmetics-grid.png`     | `nfts/cosmetics.md` | A grid of skins across outfits and palettes                        |
| `nft-track-examples.png`     | `nfts/tracks.md`    | The four built in tracks side by side: day, night, sunset, sunrise |

## competition/

| Shot                          | Page                               | Shows                                                          |
| ----------------------------- | ---------------------------------- | -------------------------------------------------------------- |
| `app-tournament-page`         | `competition/tournaments.md`       | The tournament page: window, rule, pot, standings              |
| `app-tournament-claim`        | `competition/tournaments.md`       | The claim button with one member's share and its dollar figure |
| `app-team-roster`             | `competition/teams.md`             | A team page with roster, member cap and seats left             |
| `app-join-requests-inbox`     | `competition/teams.md`             | The inbox with one pending request, accept and decline         |
| `app-rematch-offer`           | `competition/rematches.md`         | The claim screen with Offer Rematch beside the claim button    |
| `app-rematch-chain-indicator` | `competition/rematches.md`         | A card showing its position in the chain, as Rematch X of Y    |
| `app-badges-profile`          | `competition/badges.md`            | A profile badge grid, unlocked lit and locked dimmed           |
| `app-lottery-box`             | `competition/community-lottery.md` | The pick a number box, line part filled, taken numbers out     |

## economy/

| Shot                         | Page                           | Shows                                                    |
| ---------------------------- | ------------------------------ | -------------------------------------------------------- |
| `app-play-balance-panel`     | `economy/player-vault.md`      | The Play Balance panel: balances, deposit, withdraw      |
| `app-payout-target-setting`  | `economy/player-vault.md`      | The payout target control, wallet selected               |
| `app-creator-share-preview`  | `economy/creator-fee-share.md` | The create form line stating what the race will earn     |
| `app-unclaimed-items-banner` | `economy/refunds-and-rent.md`  | The Unclaimed Items banner with one refundable race      |
| `app-currency-picker`        | `economy/spl-tokens.md`        | The currency picker listing SOL and the supported tokens |

## trust/

The four explorer shots are captured on a real mainnet race, which means the
figures in them are public already. Use the **same** race for all four, so a
reader following the page sees one story. A phone capture of an explorer is
still worth having: it is where most readers will actually check a race.

| Shot                               | Page                        | Shows                                                            |
| ---------------------------------- | --------------------------- | ---------------------------------------------------------------- |
| `app-verification-tab`             | `trust/verification.md`     | The verification tab with the enabled providers                  |
| `app-verified-badge`               | `trust/verification.md`     | A lobby row with the checkmark next to the nickname              |
| `explorer-program-account`         | `trust/verifying-a-race.md` | Owner, upgrade authority, last deployed slot                     |
| `explorer-race-account-data`       | `trust/verifying-a-race.md` | The decoded race account: creator, fee, status, players, winners |
| `explorer-orao-randomness-account` | `trust/verifying-a-race.md` | The randomness account with the ORAO program as its owner        |
| `explorer-claim-prize-balances`    | `trust/verifying-a-race.md` | Balance changes on the claim tx: vault out, winner in, fee in    |

## help/

| Shot                   | Page                   | Shows                                                      |
| ---------------------- | ---------------------- | ---------------------------------------------------------- |
| `tg-race-announcement` | `help/telegram-bot.md` | A race announcement card in a group: entry fee, mode, link |

The phone half of this one is the Telegram mobile app, not a browser.

## Pages that deliberately carry no image

`help/faq.md`, `help/glossary.md`, `help/social-networks.md` and
`trust/fairness.md`. The first three are reference text a reader scans, and
`fairness.md` carries a Mermaid sequence instead, which is text in the
repository and cannot go stale against a redesign.
