export type Language = "en" | "th" | "zh";

export type ThoughtEntry = {
  timestamp: Date;
  type?: undefined;
  content: string;
};

export type ActionEntry = {
  timestamp: Date;
  type:
    | "create_wallet"
    | "request_faucet_funds"
    | "get_balance"
    | "swap_token"
    | "transfer_token"
    | "transfer_nft"
    | "user";
  content: string;
};

export type StreamEntry = ThoughtEntry | ActionEntry;

export type AnimatedData = {
  earned: number;
  spent: number;
  nftsOwned: number;
  tokensOwned: number;
  transactions: number;
  thoughts: number;
};
