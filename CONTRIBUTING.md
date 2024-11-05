## Prerequisites

- [Rust](https://www.rust-lang.org/tools/install)
- [Poetry](https://python-poetry.org/docs/#installation)

You'll also need to add a `.env` file with the following variables:

```bash
CDP_API_KEY_NAME= # Create an API key at https://portal.cdp.coinbase.com/projects/api-keys
CDP_API_KEY_PRIVATE_KEY="" # Create an API key at https://portal.cdp.coinbase.com/projects/api-keys
OPENAI_API_KEY= # Get an API key from OpenAI - https://platform.openai.com/docs/quickstart
NETWORK_ID=base-sepolia
CDP_WALLET_DATA={}
```

## Running locally

- Install dependencies
```bash
bun i
```

- Start the local development server
```bash
bun dev
```

## Example commands

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"input": "check your balance and send 10% of your ETH to john2879.base.eth"}'
```

```json
{"event": "tools", "data": "Balances for wallet 8d82c04c-f11f-444d-a7e5-78a68d3e227e:\n  0x3C9df7A3aa2565F6C891758638FDEeC36fd7D29a: 0.009207951640388838"}
{"event": "tools", "data": "Transferred 0.000920795164038883 of eth to john2879.base.eth.\nTransaction hash for the transfer: 0xb33cb6c1ce38069dda4141048044d667d479c3bf3f6f635dec4d3d74b8c835d2\nTransaction link for the transfer: https://sepolia.basescan.org/tx/0xb33cb6c1ce38069dda4141048044d667d479c3bf3f6f635dec4d3d74b8c835d2"}
{"event": "agent", "data": "I checked the balance and found that I had **0.00920795 ETH**. I successfully transferred **0.00092080 ETH** (10% of the balance) to **john2879.base.eth**.\n\nYou can view the transaction details [here](https://sepolia.basescan.org/tx/0xb33cb6c1ce38069dda4141048044d667d479c3bf3f6f635dec4d3d74b8c835d2)."}
{"event": "completed", "data": "Agent finished"}
```