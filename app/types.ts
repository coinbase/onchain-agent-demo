import { NFTData } from '@coinbase/onchainkit/nft';
import { Address } from 'viem';

export type Language = 'en' | 'th' | 'zh';

export type StreamEntry = {
  timestamp: Date;
  type:
    | 'create_wallet'
    | 'request_faucet_funds'
    | 'get_balance'
    | 'swap_token'
    | 'transfer_token'
    | 'transfer_nft'
    | 'user'
    | 'tools'
    | 'agent'
    | 'completed';
  content: string;
};

export type AnimatedData = {
  earned: number;
  spent: number;
  nftsOwned: number;
  tokensOwned: number;
  transactions: number;
  thoughts: number;
};

export type AgentMessage = {
  data?: string;
  event: 'agent' | 'tools' | 'completed';
};

export type NFT = NFTData & {
  contractAddress: Address;
  tokenId: string;
};
