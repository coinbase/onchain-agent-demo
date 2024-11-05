import { useCallback } from "react";
import { translations } from "../translations";
import { Language } from "../types";
import LanguageSelector from "./LanguageSelector";
import { notoSansThai } from "../constants";

type NavbarProps = {
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  isLiveDotVisible: boolean;
  isMobileMenuOpen: boolean;
  setCurrentLanguage: (language: Language) => void;
  currentLanguage: Language;
};

export default function Navbar({
  setIsMobileMenuOpen,
  isMobileMenuOpen,
  isLiveDotVisible,
  setCurrentLanguage,
  currentLanguage,
}: NavbarProps) {
  const handleClick = useCallback(() => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }, [isMobileMenuOpen, setIsMobileMenuOpen]);

  return (
    <div className="flex justify-between items-center p-2 border-b border-[#5788FA]/50">
      <div className="flex items-center space-x-2">
        <button className="lg:hidden mr-2" onClick={handleClick}>
          ☰
        </button>
        <div
          className={`
          w-2 h-2 rounded-full 
          transition-all duration-700 ease-in-out
          ${
            isLiveDotVisible
              ? "bg-green-500 opacity-100"
              : "bg-green-500 opacity-40"
          }
        `}
        />
        <span
          className={`text-sm text-zinc-50 ${
            currentLanguage === "th" ? notoSansThai.className : ""
          }`}
        >
          {translations[currentLanguage].header.liveOn}
        </span>
      </div>
      <LanguageSelector
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
      />
    </div>
  );
}
