# Shot list

> Every image the published pages reference, what each one has to show, and how
> to tell which ones are still placeholders. A `<figure>` whose file is absent
> renders as a broken image on a live public page, so this list is the gate
> between a page edit and a push.

`../rules/documentation.md` carries the figure markup, the naming prefixes and
the rule that a page must read correctly with every image stripped out. This
file is the inventory and does not repeat them.

**Page paths here are relative to `docs/`**, the published tree, while the asset
folder sits at the repository root because GitBook requires it there. That is
why a page climbs two levels to reach an image.

## Three classes of image

**A banner, for a specific part of a page.** A button, a combobox, a slider, a
chip, a row, a cost box: one wide image at roughly 1600x500, named
`<stem>-banner.png`, standing on its own with no columns block. A control looks
the same on a phone as on a desktop, so a pair of it is two pictures of one
thing. Rows in the tables below marked **(banner)** are these.

**A pair, for a whole screen or view.** A lobby, a modal, a page, an explorer
view: `<stem>-desktop.png` and `<stem>-mobile.png`, shown in one row by a
`{% columns %}` block at 70/30, which GitBook stacks on a narrow screen. The
platform is played on phones, so a desktop-only shot of a screen describes an
experience most readers do not have.

**Artwork, single.** A cover, a card cover, an art grid.

The test for which: if the sentence beside it talks about part of the page,
banner. If it shows the reader where they are, pair.

```
{% columns %}
{% column width="70%" %}
<figure><img src="../../.gitbook/assets/races/app-create-race-form-desktop.png" alt="..."><figcaption><p>What it tells the reader.</p></figcaption></figure>
{% endcolumn %}

{% column width="30%" %}
<figure><img src="../../.gitbook/assets/races/app-create-race-form-mobile.png" alt="..., on a phone"><figcaption><p>On a phone</p></figcaption></figure>
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

## What the checker already covers

`npm run check` is the gate, and it owns every mechanical question about images:

- a figure whose file is missing,
- an asset on disk that no page references any more,
- half a pair, either direction, both on disk and on the page,
- a pair split across two columns blocks, or a screenshot outside one,
- an `img` with no `alt`,
- an asset with no row in this file.

So there is nothing to grep by hand. Run it from the repository root, through
WSL, because node is not on this host's PATH otherwise:

```bash
wsl -d Ubuntu -- bash -lc 'export PATH="$HOME/.nvm/versions/node/v24.10.0/bin:$PATH"; cd /mnt/WORK/DeFi/TheLuckyDucksDocs && npm run check'
```

What it cannot tell you is whether a file is a real capture or a placeholder,
which is the next section.

## Every file is currently a generated placeholder

Each one is a flat dark card carrying `DESKTOP PLACEHOLDER`, `PHONE
PLACEHOLDER` or `ARTWORK PLACEHOLDER` in gold, the shot it stands in for, and
its own path in mono. They exist so no page renders a broken image before the
real captures land, which is also why the checker has nothing to report: every
figure resolves. The open question is which files are still placeholders, and a
placeholder announces itself on the page.

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

To build the placeholders, run `npm run assets`. It reads the pages, generates a
card for every referenced file that does not exist, labels it with that
figure's own alt text, and picks the size from the filename: 1440x810 for
`-desktop`, 390x640 for `-mobile`, 1280x720 for a card cover, 1990x480 for the
space cover. It needs ffmpeg, so run it through WSL like the other commands.

The same command reports any asset no page references any more, and
`npm run assets -- --prune` deletes those. Never add or remove these files by
hand: `npm run check` fails on a missing file and on an orphan, so the two
commands are the whole procedure.

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

| Shot                              | Page                                  | Shows                                                           |
| --------------------------------- | ------------------------------------- | --------------------------------------------------------------- |
| `app-connect-wallet` **(banner)** | `introduction/getting-started.md`     | The connect dialog with the wallet list                         |
| `app-lobby-list`                  | `introduction/getting-started.md`     | Three or four open race cards: entry fee, pool, slots, duration |
| `app-race-finish-claim`           | `introduction/getting-started.md`     | The post race screen: finishing order, claim button with amount |
| `app-lobby-filling`               | `introduction/how-it-works.md`        | One lobby at four of five seats, each with avatar and nickname  |
| `app-race-canvas-midrace`         | `introduction/what-is-lucky-ducks.md` | Ducks part way down the lane with the standings overlay         |

## races/

| Shot                                          | Page                                                     | Shows                                                             |
| --------------------------------------------- | -------------------------------------------------------- | ----------------------------------------------------------------- |
| `app-create-race-form`                        | `races/creating-a-race.md`                               | Top of the create form: entry fee, max players, duration, mode    |
| `app-create-race-cost-breakdown` **(banner)** | `races/creating-a-race.md`, `economy/fees-and-prizes.md` | The itemised cost box, rent line visible                          |
| `app-race-detail-modal`                       | `races/joining-and-playing.md`                           | The detail modal with participants, boost and cosmetic tabs       |
| `app-claim-prize` **(banner)**                | `races/joining-and-playing.md`                           | The claim button with the payout on it, finishing order beside it |
| `app-login-linked-account`                    | `races/without-the-wallet-app.md`                        | The login screen offering a linked account next to connect wallet |
| `app-delegated-signing-panel` **(banner)**    | `races/delegated-play.md`                                | The delegated signing panel: duration, expiry, revoke             |
| `app-race-cards-modes` **(banner)**           | `races/race-modes.md`                                    | Two cards side by side, one WTA badge, one Podium Split badge     |
| `app-join-setting-picker` **(banner)**        | `races/access-and-gating.md`                             | The join setting selector open, all five options visible          |
| `app-link-external-wallet` **(banner)**       | `races/access-and-gating.md`                             | The link an external wallet panel with the supported chains       |
| `app-gated-race-join-disabled` **(banner)**   | `races/access-and-gating.md`                             | A gated race with Join disabled and the requirement stated        |
| `app-advanced-options-panel` **(banner)**     | `races/advanced-options.md`                              | The opt in toggles with their costs shown                         |
| `app-underfilled-slider` **(banner)**         | `races/advanced-options.md`                              | The start-when-underfilled slider at 7 on a 10 player race        |
| `app-cancel-race-confirm` **(banner)**        | `races/hosting-and-cancelling.md`                        | The cancel confirmation: refund to players, flat SOL penalty      |

## nfts/

| Shot                                         | Page                    | Shows                                                          |
| -------------------------------------------- | ----------------------- | -------------------------------------------------------------- |
| `app-marketplace-collections`                | `nfts/README.md`        | The marketplace filtered by collection                         |
| `app-create-race-runner-locked` **(banner)** | `nfts/runners.md`       | The create form with gated options dimmed, each with the chip  |
| `nft-runner-example` **(banner)**            | `nfts/runners.md`       | One Runner in the marketplace with its traits beside it        |
| `app-boost-picker` **(banner)**              | `nfts/boosts.md`        | The boost picker in the join modal, each with its percentage   |
| `app-boost-badges-lobby` **(banner)**        | `nfts/boosts.md`        | A participant list where two players carry boost badges        |
| `app-no-boost-race-card` **(banner)**        | `nfts/boosts.md`        | A race card with the crossed-out circle marker                 |
| `app-cosmetic-picker` **(banner)**           | `nfts/cosmetics.md`     | The cosmetics tab with one skin selected and the duck preview  |
| `app-mystery-box-types`                      | `nfts/mystery-boxes.md` | The three box types with price and remaining supply            |
| `app-mystery-box-reveal` **(banner)**        | `nfts/mystery-boxes.md` | The reveal progress part way through, one step active          |
| `app-marketplace-rent-button` **(banner)**   | `nfts/renting.md`       | A tier with Rent beside Buy                                    |
| `app-rental-duration-slider` **(banner)**    | `nfts/renting.md`       | The day slider with shortcut marks and the total on the button |
| `app-rented-ribbon` **(banner)**             | `nfts/renting.md`       | A picker tile carrying the RENTED ribbon                       |

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

| Shot                                       | Page                               | Shows                                                          |
| ------------------------------------------ | ---------------------------------- | -------------------------------------------------------------- |
| `app-tournament-page`                      | `competition/tournaments.md`       | The tournament page: window, rule, pot, standings              |
| `app-tournament-claim` **(banner)**        | `competition/tournaments.md`       | The claim button with one member's share and its dollar figure |
| `app-team-roster`                          | `competition/teams.md`             | A team page with roster, member cap and seats left             |
| `app-join-requests-inbox` **(banner)**     | `competition/teams.md`             | The inbox with one pending request, accept and decline         |
| `app-rematch-offer` **(banner)**           | `competition/rematches.md`         | The claim screen with Offer Rematch beside the claim button    |
| `app-rematch-chain-indicator` **(banner)** | `competition/rematches.md`         | A card showing its position in the chain, as Rematch X of Y    |
| `app-badges-profile`                       | `competition/badges.md`            | A profile badge grid, unlocked lit and locked dimmed           |
| `app-lottery-box`                          | `competition/community-lottery.md` | The pick a number box, line part filled, taken numbers out     |

## economy/

| Shot                                      | Page                           | Shows                                                    |
| ----------------------------------------- | ------------------------------ | -------------------------------------------------------- |
| `app-play-balance-panel` **(banner)**     | `economy/player-vault.md`      | The Play Balance panel: balances, deposit, withdraw      |
| `app-payout-target-setting` **(banner)**  | `economy/player-vault.md`      | The payout target control, wallet selected               |
| `app-creator-share-preview` **(banner)**  | `economy/creator-fee-share.md` | The create form line stating what the race will earn     |
| `app-unclaimed-items-banner` **(banner)** | `economy/refunds-and-rent.md`  | The Unclaimed Items banner with one refundable race      |
| `app-currency-picker` **(banner)**        | `economy/spl-tokens.md`        | The currency picker listing SOL and the supported tokens |

## trust/

The four explorer shots are captured on a real mainnet race, which means the
figures in them are public already. Use the **same** race for all four, so a
reader following the page sees one story. A phone capture of an explorer is
still worth having: it is where most readers will actually check a race.

| Shot                               | Page                        | Shows                                                                                                                                                          |
| ---------------------------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app-verify-fairness`              | `trust/verifying-a-race.md` | The Verify fairness panel on a finished race: seed, per player derivation, finish times, winners. Open it and frame a derivation row together with the winners |
| `app-verification-tab`             | `trust/verification.md`     | The verification tab with the enabled providers                                                                                                                |
| `app-verified-badge` **(banner)**  | `trust/verification.md`     | A lobby row with the checkmark next to the nickname                                                                                                            |
| `explorer-program-account`         | `trust/verifying-a-race.md` | Owner, upgrade authority, last deployed slot                                                                                                                   |
| `explorer-race-account-data`       | `trust/verifying-a-race.md` | The decoded race account: creator, fee, status, players, winners                                                                                               |
| `explorer-orao-randomness-account` | `trust/verifying-a-race.md` | The randomness account with the ORAO program as its owner                                                                                                      |
| `explorer-claim-prize-balances`    | `trust/verifying-a-race.md` | Balance changes on the claim tx: vault out, winner in, fee in                                                                                                  |

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
