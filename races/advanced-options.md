# Advanced options

The optional opt ins in the Create Race modal. All of them require a Runner NFT in your wallet except where noted.

## AI commentary

A funny per second play by play track narrated by an AI voice, generated on the fly the moment the race starts. Adds a small cost per race second (the platform's audio cost setting times the race duration).

The narration references the duck names, the boosts in play, and the current standings. It does not predict the winner. Generation can add up to 60 seconds of waiting time after the lobby closes before the visual race begins.

## Custom name

Sets a title on the race card so other players can identify it in the lobby list. Useful when running a themed event or a community match.

## Custom race duration

The default visual race duration is 30 seconds and is available to everyone. Changing it up to 180 seconds, requires a Runner NFT. Shorter races stay punchy; longer races give the AI commentary more room to develop a story.

## Custom join timeout

The default lobby window is 1 hour. Setting a shorter or longer custom timeout overrides it. Minimum 1 minute, maximum 1 week. Custom timeouts are useful for scheduled events (long window for announcements) or rapid-fire match queues (short window for quick turnover).

## Custom track

Use a Track NFT you own as the race background. The track changes the visual environment (different pond, lighting, props) without affecting outcomes. See [Track NFTs](../nfts/tracks.md).

The four built in tracks (day, night, sunset, sunrise) are always available and free. Custom tracks need a held Track NFT.

## Start when underfilled

Permit the race to launch with fewer than max players once the join timeout passes. Without this option, an unfilled race expires and refunds. With it, the race starts as long as the lobby has at least `default_max_players` joined (currently 5).

When you enable it, a slider appears for setting the minimum players to auto start. The minimum value of the slider is the platform's default cap (5 currently), the maximum is `maxPlayers - 1`. A 10 player race with the slider at 7 will auto start with 7, 8, or 9 players once the join window closes.

This option adds a small surcharge to cover the backend's auto start operation. The surcharge is paid out of the race vault to the operator on auto start; it stays in the vault and refunds with everything else if the race never starts.

## Sponsored race

Pay the prize pool yourself instead of asking joiners to. Useful for community giveaways or marketing events. Set the prize amount when creating; players join for free and the pot is funded by your wallet upfront. The platform fee still applies, taken from the prize amount you sponsored.

## Private race

Restrict joins to a wallet allowlist you provide. Each line in the allowlist field is a wallet address that can join. Other wallets see the race in the list but cannot click Join. Useful for tournament brackets or invite only events.

## Combining options

Most options stack. The only hard exclusion is that AI commentary cannot be added to a race that has already started. Everything else can be mixed freely.
