---
icon: diagram-project
description: The full lifecycle of one race, from the create transaction to the moment the account closes.
---

# How a race works

A race is a Solana account. Creating one allocates the account, joining deposits your entry fee into its vault, and at the end the contract pays the winners and closes it. Here is the whole lifecycle.

```mermaid
flowchart TD
    A["1. Creation: create_race signed, vault derived"] --> B["2. Lobby: players join, 1 hour by default"]
    B --> C{"Lobby fills, or starts underfilled?"}
    C -->|"Yes"| D["3. Start: Open becomes VRFPending, randomness requested"]
    C -->|"Join window passes"| X["Cancelled: every stake refundable"]
    D --> E["4. VRF resolution: ORAO publishes the seed on chain"]
    E -->|"No seed inside the VRF timeout"| X
    E --> F["5. Finalization: the contract ranks the ducks, status Completed"]
    F --> G["Winners claim their share of the vault"]
    G --> H["6. Cleanup: race account closed, rent returns to the creator"]
    X --> H
```

## 1. Creation

The creator picks the parameters and signs a `create_race` transaction:

- Entry fee (SOL or SPL token)
- Max players (2 to 5 by default, up to 20 with a Runner NFT)
- Race duration (30 seconds by default, up to the platform maximum of 3 minutes with a Runner NFT)
- Payout mode (Winner Takes All, or Podium split across 1st, 2nd, 3rd)
- Optional opt ins: race name, AI commentary, custom track, custom join timeout, start when underfilled

The transaction allocates the race account, derives a vault for the deposits, and emits a `race:created` event. The race shows up in the lobby list seconds later.

## 2. Lobby

Players have 1 hour by default to join. Joining is one transaction: your entry fee moves into the vault, your wallet joins the participants list, and the lobby updates live over a websocket.

{% columns %}
{% column width="70%" %}

<figure><img src="../../.gitbook/assets/introduction/app-lobby-filling-desktop.png" alt="A race lobby with four of five slots taken, each showing a player avatar and nickname"><figcaption><p>The lobby updates as each join transaction confirms.</p></figcaption></figure>

{% endcolumn %}

{% column width="30%" %}

<figure><img src="../../.gitbook/assets/introduction/app-lobby-filling-mobile.png" alt="A race lobby with four of five slots taken, each showing a player avatar and nickname, on a phone"><figcaption><p>On a phone</p></figcaption></figure>

{% endcolumn %}
{% endcolumns %}

You can withdraw while the lobby is open. That returns your entry fee and charges a fixed 0.01 SOL penalty, always in SOL even on token races. The penalty goes to the platform fee wallet to discourage join-and-bail griefing, and it does not swell the remaining prize pool.

## 3. Start

The race starts when the lobby fills, or earlier if the creator enabled start when underfilled and the join timeout has passed. Starting is its own on chain transition: the race moves from `Open` to `VRFPending` and the contract requests randomness from an ORAO oracle.

## 4. VRF resolution

ORAO publishes the seed back within seconds, in public. Anyone watching can run the same deterministic math the contract will run and know the winners before the visual race does. The backend holds the finalization transaction until the duration has elapsed, so the suspense survives.

## 5. Finalization

Once the duration is up, the backend wallet submits finalization. The contract runs the simulation, ranks the ducks and moves the race to `Completed`. Winners can claim.

Finalizing is permissionless the moment the duration has elapsed. The instruction takes no signer at all, so if the backend is unreachable, anyone can submit it and the race still settles. In practice the backend gets there first and nobody has to.

{% hint style="success" %}
Claims work the same way. Anyone can submit a claim for a winner, and the money still goes to the winner, into their wallet or their player vault according to their own setting.
{% endhint %}

## 6. Cleanup

The race account closes and its rent returns to the creator. If something went wrong on the way, such as an oracle timeout, the race moves to `Cancelled` instead and every participant can claim a full refund.

{% content-ref url="getting-started.md" %}
[getting-started.md](getting-started.md)
{% endcontent-ref %}
