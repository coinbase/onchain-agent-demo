import { ActionEntry, Language, ThoughtEntry } from "./types";
import NftSvg from "./svg/NftSvg";
import RequestSvg from "./svg/RequestSvg";
import SendSvg from "./svg/SendSvg";
import SwapSvg from "./svg/SwapSvg";
import TokenSvg from "./svg/TokenSvg";
import WalletSvg from "./svg/WalletSvg";
import { translations } from "./translations";

export const getActionIcon = (type: ActionEntry["type"]) => {
  switch (type) {
    case "create_wallet":
      return <WalletSvg />;
    case "request_faucet_funds":
      return <RequestSvg />;
    case "get_balance":
      return <WalletSvg />;
    case "swap_token":
      return <SwapSvg />;
    case "transfer_token":
      return <TokenSvg />;
    case "transfer_nft":
      return <NftSvg />;
    case "user":
      return <SendSvg />;
    default:
      return null;
  }
};

export const generateRandomThought = (
  currentLanguage: Language
): ThoughtEntry => {
  const thoughts = [
    translations[currentLanguage].thoughts.analyzing,
    translations[currentLanguage].thoughts.processing,
    translations[currentLanguage].thoughts.optimizing,
    translations[currentLanguage].thoughts.generating,
    translations[currentLanguage].thoughts.evaluating,
    translations[currentLanguage].thoughts.simulating,
  ];
  return {
    timestamp: new Date(),
    content: thoughts[Math.floor(Math.random() * thoughts.length)],
  };
};

export const generateRandomAction = (
  currentLanguage: Language
): ActionEntry => {
  const actions = [
    {
      type: "create_wallet" as const,
      content: `${translations[currentLanguage].actions.createWallet} 0x453b...3432`,
    },
    {
      type: "request_faucet_funds" as const,
      content: translations[currentLanguage].actions.requestFunds,
    },
    {
      type: "get_balance" as const,
      content: `0x4534...d342${translations[currentLanguage].actions.getBalance} 1003.45 USDC`,
    },
    {
      type: "transfer_token" as const,
      content: `${translations[currentLanguage].actions.transferToken} 100 USDC ${translations[currentLanguage].actions.to} 0x1234...5678`,
    },
    {
      type: "transfer_nft" as const,
      content: `${translations[currentLanguage].actions.transferNft} #1234 ${translations[currentLanguage].actions.to} 0x5678...9012`,
    },
    {
      type: "swap_token" as const,
      content: `${translations[currentLanguage].actions.swapToken} 10 ETH ${translations[currentLanguage].actions.to} 15000 USDC`,
    },
  ];
  const randomAction = actions[Math.floor(Math.random() * actions.length)];
  return {
    timestamp: new Date(),
    type: randomAction.type,
    content: randomAction.content,
  };
};
