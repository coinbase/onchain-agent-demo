import { useCallback } from "react";
import { Language } from "../types";

type LanguageSelectorProps = {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
};

const languages = [
  { code: "en", label: "EN" },
  { code: "th", label: "TH" },
  { code: "zh", label: "CN" },
] as const;

export default function LanguageSelector({
  currentLanguage,
  onLanguageChange,
}: LanguageSelectorProps) {
  const handleClick = useCallback(
    (code: Language) => {
      return () => onLanguageChange(code);
    },
    [onLanguageChange]
  );
  return (
    <div className="inline-flex border border-[#5788FA]/50 rounded-sm overflow-hidden">
      {languages.map(({ code, label }) => (
        <button
          key={code}
          onClick={handleClick(code)}
          style={{ width: "44px" }}
          className={`
            py-1 text-sm font-medium text-center transition-colors
            ${
              currentLanguage === code
                ? "bg-[#5788FA] text-zinc-950 hover:bg-[#3D7BFF]"
                : "hover:bg-zinc-900 hover:text-[#3D7BFF]"
            }
            ${code !== "en" && "border-l border-[#5788FA]/50"}
          `}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
