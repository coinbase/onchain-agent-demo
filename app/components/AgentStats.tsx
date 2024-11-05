import { useBalance, useTransactionCount } from 'wagmi';
import { AGENT_WALLET_ADDRESS, notoSansThai } from '../constants';
import { translations } from '../translations';
import type { Language } from '../types';

type AgentStats = {
  currentLanguage: Language;
};

export default function AgentStats({ currentLanguage }: AgentStats) {
  const { data } = useBalance({
    address: AGENT_WALLET_ADDRESS,
    query: { refetchInterval: 5000 },
  });

  const { data: transactionCount } = useTransactionCount({
    address: AGENT_WALLET_ADDRESS,
    query: { refetchInterval: 5000 },
  });

  return (
    <div className="mr-2 mb-4 rounded-sm border border-[#5788FA]/50 bg-black">
      <div className="flex flex-col items-start p-4">
        <span className="font-bold text-2xl text-[#5788FA]">
          {`${Number.parseFloat(data?.formatted || '').toFixed(6)} ETH`}
        </span>
        {/* TODO: update with actual data */}
        <ul className="space-y-1 pt-4">
          <li
            className={currentLanguage === 'th' ? notoSansThai.className : ''}
          >
            {translations[currentLanguage].profile.stats.earned}: $
            N/A
          </li>
          <li
            className={currentLanguage === 'th' ? notoSansThai.className : ''}
          >
            {translations[currentLanguage].profile.stats.spent}: $
            N/A
          </li>
          <li
            className={currentLanguage === 'th' ? notoSansThai.className : ''}
          >
            {translations[currentLanguage].profile.stats.nfts}:{" "}
            N/A
          </li>
          <li
            className={currentLanguage === 'th' ? notoSansThai.className : ''}
          >
            {translations[currentLanguage].profile.stats.tokens}:{" "}
            N/A
          </li>
          <li
            className={currentLanguage === 'th' ? notoSansThai.className : ''}
          >
            {translations[currentLanguage].profile.stats.transactions}:{" "}
            {transactionCount}
          </li>
        </ul>
      </div>
    </div>
  );
}
