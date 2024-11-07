import { useCallback, useEffect, useMemo, useState } from 'react';
import useGetNfts from '../hooks/useGetNfts';
import { NFT } from '../types';
import { NFTCard } from '@coinbase/onchainkit/nft';
import {
  NFTMedia,
  NFTOwner,
  NFTTitle,
} from '@coinbase/onchainkit/nft/view';

// TODO: add assets
export default function AgentAssets() {
  const [tab, setTab] = useState('tokens');
  const [nfts, setNfts] = useState<NFT[]>([]);

  const handleSuccess = useCallback((nfts: NFT[]) => {
    setNfts(nfts);
  }, []);

  const { getNfts } = useGetNfts({ onSuccess: handleSuccess });

  const tokensClass = useMemo(() => {
    if (tab === 'tokens') {
      return 'border-b border-[#5788FA] flex items-center justify-center py-1';
    }
    return ' flex items-center justify-center py-1';
  }, [tab]);

  const nftsClass = useMemo(() => {
    if (tab === 'nft') {
      return 'border-b border-[#5788FA] flex items-center justify-center py-1';
    }
    return ' flex items-center justify-center py-1';
  }, [tab]);

  const createdClass = useMemo(() => {
    if (tab === 'created') {
      return 'border-b border-[#5788FA] flex items-center justify-center py-1';
    }
    return ' flex items-center justify-center py-1';
  }, [tab]);

  const handleTabChange = useCallback((tab: string) => {
    return () => setTab(tab);
  }, []);

  useEffect(() => {
    getNfts();
  }, []);

  return (
    <div className="mr-2 mb-4 rounded-sm bg-black p-4">
      <div className="flex flex-col items-start gap-4">
        <div className="flex w-full grow gap-6 border-zinc-700 border-b">
          <button
            type="button"
            onClick={handleTabChange('tokens')}
            className={tokensClass}
          >
            Tokens
          </button>
          <button
            type="button"
            onClick={handleTabChange('nfts')}
            className={nftsClass}
          >
            NFTs
          </button>
          <button
            type="button"
            onClick={handleTabChange('created')}
            className={createdClass}
          >
            Created
          </button>
        </div>

        {tab === 'nfts' && (
          <div className="grid grid-cols-1 xl:grid-cols-2 w-full gap-4">
            {nfts.map((nft, index) => {
              return (
                <NFTCard
                  key={`${nft.contractAddress}-${index}`}
                  contractAddress={nft.contractAddress}
                  tokenId={nft.tokenId}
                  useNFTData={() => nft}
                  onError={(e) => console.log('error', e)}
                  className='shrink'
                >
                  <NFTMedia className='h-[300px]'/>
                  <NFTTitle />
                  <NFTOwner />
                </NFTCard>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
