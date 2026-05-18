# What is Lucky Ducks

Lucky Ducks is a duck racing platform on Solana. Picture a stylized pond, a small flock of ducks at the starting line, and a 30-second sprint to the finish. Every race is a real Solana transaction. Every prize is paid out by a verified smart contract. Every random number that decides the outcome is produced by an oracle, not by the website.

## The pitch

Most online racing games hide the math. The server picks a winner, plays the animation, and trusts you not to ask too many questions. Lucky Ducks does the opposite: the math is the product. The smart contract takes your entry fee, locks it in a per race vault, requests randomness from an on chain oracle, and pays the winners according to a payout table the contract itself enforces.

This means three things that matter:

* **Anyone can verify a race**. Once randomness is published, the outcome is deterministic. Re-running the math on the same seed gives the same finishing positions, every time.
* **The platform cannot pick a winner**. The team writes the smart contract, deploys it, and then has no special ability to influence outcomes.
* **Refunds are automatic**. If a race never starts (not enough players, oracle failed, transaction stuck), every player can claim their entry fee back via a permissionless instruction. No support ticket required.

## The catch

It runs on Solana, so you need a Solana wallet, a tiny SOL balance for fees, and a willingness to sign transactions to play. The first time you race, the smart contract creates a small on chain account to track your stats. That account costs \~0.0017 SOL in rent, fully refundable if you close it later. Beyond that, the entry fee for any race is whatever the creator set, denominated in SOL or one of the supported SPL tokens.

## Who runs it

The Lucky Ducks team writes the smart contract, the backend, the frontend, and the cosmetic art. The platform takes a small treasury fee on every prize pool to cover hosting, oracle costs, and ongoing development. Past that, your money goes to other players.
