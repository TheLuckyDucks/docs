# Your first race

Six steps from a fresh browser tab to a finished race.

### 1. Get a Solana wallet

Phantom, Solflare, Backpack, and most major Solana wallets work. The wallet adapter handles the connection automatically. If you do not have one yet, Phantom is the easiest to start with: it is a browser extension and a mobile app, both free.

### 2. Top up with a small SOL balance

You need SOL to pay transaction fees (roughly 0.000005 SOL per signed transaction) plus whatever the race entry fee is. A safe starting balance is 0.05 SOL: enough for a stats account, a few dozen tx fees, and a couple of typical races.

### 3. Connect

Go to `theluckyducks.com/app/` and click Connect Wallet. Approve the connection in your wallet. The first connection is a signed message, not a transaction, so it costs nothing.

### 4. Create the on chain stats account

On your very first action (create or join a race), the smart contract needs a `PlayerStats` account to track your race history. A modal will explain this once and ask you to approve a one time transaction. The rent is around 0.0017 SOL and is fully refundable if you ever close the account.

### 5. Join a race or make one

The lobby list shows all open races. Pick one that matches your appetite (entry fee, max players, duration) and click Join. Or open the Create Race modal and set the parameters yourself. Either way, signing the transaction is the commitment: your entry fee moves into the race vault as soon as it confirms.

### 6. Watch your duck race

Once the race starts, the canvas takes over. Ducks paddle, splash, occasionally somersault. The visual race plays at a fixed pace driven by the on chain seed. Once it ends, winners can claim with a single click.

### Optional: verify

The first three race actions are unverified. After three, the platform offers OAuth verification with X, Telegram, or Facebook. Verified players get a checkmark badge, a higher daily race creation limit, and rank for tournaments.
