# Onchain Agent Demo

![Token-creation](https://github.com/user-attachments/assets/016c26cd-c599-4f7c-bafd-c8090069b53e)


A web app that enables onchain interactions through a conversational UI using AgentKit, a collaboration between [CDP SDK](https://docs.cdp.coinbase.com/) and [OnchainKit](https://onchainkit.xyz).

## Overview

This project features a Next.js frontend designed to work seamlessly with [CDP's AgentKit backend](https://github.com/coinbase/onchain-agent-demo-backend). Together, they enable the creation of an AI agent capable of performing onchain operations on Base. The agent uses GPT-4 for natural language understanding and AgentKit for onchain interactions.

## Key Features

- **AI-Powered Chat Interface**: Interactive chat interface for natural language interactions onchain
- **Onchain Operations**: Ability to perform various blockchain operations through Agentkit:
  - Deploy and interact with ERC-20 tokens
  - Create and manage NFTs
  - Check wallet balances
  - Request funds from faucet
- **Real-time Updates**: Server-Sent Events (SSE) for streaming responses
- **Responsive Design**: Modern UI built with Tailwind CSS
- **Wallet Integration**: Secure wallet management through CDP Agentkit

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Development**: TypeScript, Biome for formatting/linting

## Prerequisites

- [Bun](https://bun.sh) for package management

## Environment Setup

Create a `.env.local` file with the following variables:

```bash
NEXT_PUBLIC_API_URL= # The base URL for API requests. This must be set to the endpoint of your backend service.
```

## Installation

1. Install dependencies:
```bash
bun i
```

2. Start the development server:
```bash
bun dev
```

## Development

- Format code: `bun run format`
- Lint code: `bun run lint`
- Run CI checks: `bun run ci:check`

## Deploying to Replit

- [Frontend Template](https://replit.com/@alissacrane1/onchain-agent-demo-frontend?v=1)
- [Backend Template](https://replit.com/@alissacrane1/onchain-agent-demo-backend?v=1)

Steps:
- Sign up for a Replit account, or login to your existing one.
- Navigate to the template links, and click `Use Template` on the top right hand side.
- Under `Secrets` in `Workspace Features`, add the environment variables below.
  - Tip: You can click `Edit as JSON` and copy the values below in.
- Click `Deploy` in the top right.
  - Tip: Deploy your backend first, as you'll need the deployment URL to set as `NEXT_PUBLIC_API_URL` in the frontend.
  - Tip: You can click `Run` to test if the applications run properly before deploying.

**Backend Secrets**
```
{
  "CDP_API_KEY_NAME": "get this from https://portal.cdp.coinbase.com/projects/api-keys",
  "CDP_API_KEY_PRIVATE_KEY": "get this from https://portal.cdp.coinbase.com/projects/api-keys",
  "OPENAI_API_KEY": "get this from https://platform.openai.com/api-keys",
  "NETWORK_ID": "base-sepolia"
}
```

**Important: Replit resets the SQLite template on every deployment, before sending funds to your agent or using it on Mainnet be sure to read [Agent Wallet](https://github.com/coinbase/onchain-agent-demo-backend?tab=readme-ov-file#agent-wallet) and save your wallet ID and seed in a safe place.**

**Frontend Secrets**
```
{
  "NEXT_PUBLIC_API_URL": "your backend deployment URL here"
}
```

Note: you'll need to include the scheme (`https://`) in `NEXT_PUBLIC_API_URL`.

## License

See [LICENSE.md](LICENSE.md) for details.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute to this project.

Special shoutout to [Shu Ding](https://x.com/shuding) for his amazing generative UI for the NFT art.
