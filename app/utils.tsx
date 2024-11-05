import ArrowSvg from './svg/ArrowSvg';
import NftSvg from './svg/NftSvg';
import RequestSvg from './svg/RequestSvg';
import SwapSvg from './svg/SwapSvg';
import TokenSvg from './svg/TokenSvg';
import WalletSvg from './svg/WalletSvg';
import type { StreamEntry } from './types';

export const getActionIcon = (type: StreamEntry['type']) => {
  switch (type) {
    case 'create_wallet':
      return <WalletSvg />;
    case 'request_faucet_funds':
      return <RequestSvg />;
    case 'get_balance':
      return <WalletSvg />;
    case 'swap_token':
      return <SwapSvg />;
    case "tools":
      return <TokenSvg />;
    case 'transfer_nft':
      return <NftSvg />;
    case "user":
      return <ArrowSvg className="-rotate-45 w-3 w-3" />
    default:
      return null;
  }
};
