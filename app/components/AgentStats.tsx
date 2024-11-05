import { notoSansThai } from "../constants";
import { translations } from "../translations";
import { AnimatedData, Language } from "../types";

type AgentStats = {
  currentLanguage: Language;
  animatedData: AnimatedData;
  walletBalance: number;
};

export default function AgentStats({
  currentLanguage,
  animatedData,
  walletBalance,
}: AgentStats) {
  return (
    <div className="mb-4 mr-2 bg-black border border-[#5788FA]/50 rounded-sm">
      <div className="flex flex-col items-start p-4">
        <span className="text-2xl font-bold text-[#5788FA]">
          ${walletBalance.toFixed(2)}
        </span>
        <ul className="space-y-1 pt-4">
          <li className={currentLanguage === "th" ? notoSansThai.className : ""}>
            {translations[currentLanguage].profile.stats.earned}: $
            {animatedData.earned.toFixed(2)}
          </li>
          <li className={currentLanguage === "th" ? notoSansThai.className : ""}>
            {translations[currentLanguage].profile.stats.spent}: $
            {animatedData.spent.toFixed(2)}
          </li>
          <li className={currentLanguage === "th" ? notoSansThai.className : ""}>
            {translations[currentLanguage].profile.stats.nfts}:{" "}
            {animatedData.nftsOwned}
          </li>
          <li className={currentLanguage === "th" ? notoSansThai.className : ""}>
            {translations[currentLanguage].profile.stats.tokens}:{" "}
            {animatedData.tokensOwned}
          </li>
          <li className={currentLanguage === "th" ? notoSansThai.className : ""}>
            {translations[currentLanguage].profile.stats.transactions}:{" "}
            {animatedData.transactions}
          </li>
        </ul>
      </div>
    </div>
  );
}
