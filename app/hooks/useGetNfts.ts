import { useCallback, useState } from 'react';
import { SIMPLE_HASH_API_KEY } from '../config';
import { AGENT_WALLET_ADDRESS } from '../constants';
import { NFT } from '../types';

const URL = `https://api.simplehash.com/api/v0/nfts/owners?chains=base-sepolia&wallet_addresses=${AGENT_WALLET_ADDRESS}&limit=50`;

type UseGetNftProps = {
  onSuccess: (nfts: NFT[]) => void;
};

type RawNFt = {
  contract_address: string;
  token_id: string;
};

export default function useGetNfts({ onSuccess }: UseGetNftProps) {
  const [isLoading, setIsLoading] = useState(false);

  const getNfts = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await fetch(URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': SIMPLE_HASH_API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const { nfts } = await response.json();

      const parsedNfts: NFT[] = nfts?.map((nft: any) => {
        return {
          contractAddress: nft?.contract_address,
          tokenId: nft?.token_id,
          name: nft?.name || nft?.collection?.name,
          contractType: nft?.contract?.type,
          ownderAddress: nft?.owners?.[0]?.owner_address
        };
      });

      onSuccess(parsedNfts);
      return { nfts: parsedNfts, error: null };
    } catch (error) {
      console.error('Error posting chat:', error);
      return { nfts: [], error: error as Error };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { getNfts, isLoading };
}