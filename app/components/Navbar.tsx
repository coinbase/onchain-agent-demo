import { useEffect, useCallback, useState } from 'react';
import { notoSansThai } from '../constants';
import { translations } from '../translations';
import type { Language } from '../types';
import LanguageSelector from './LanguageSelector';

type NavbarProps = {
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  isMobileMenuOpen: boolean;
  setCurrentLanguage: (language: Language) => void;
  currentLanguage: Language;
};

export default function Navbar({
  setIsMobileMenuOpen,
  isMobileMenuOpen,
  setCurrentLanguage,
  currentLanguage,
}: NavbarProps) {
  const [isLiveDotVisible, setIsLiveDotVisible] = useState(true);

  // enables glowing live on sepolia dot
  useEffect(() => {
    const dotInterval = setInterval(() => {
      setIsLiveDotVisible((prev) => !prev);
    }, 1000);

    return () => clearInterval(dotInterval);
  }, []);

  const handleClick = useCallback(() => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }, [isMobileMenuOpen, setIsMobileMenuOpen]);

  return (
    <div className="flex items-center justify-between border-[#5788FA]/50 border-b p-2">
      <div className="flex items-center space-x-2">
        <button className="mr-2 lg:hidden" onClick={handleClick} type="button">
          ☰
        </button>
        <div
          className={`h-2 w-2 rounded-full transition-all duration-700 ease-in-out ${
            isLiveDotVisible
              ? 'bg-green-500 opacity-100'
              : 'bg-green-500 opacity-40'
          }
        `}
        />
        <span
          className={`text-sm text-zinc-50 ${
            currentLanguage === 'th' ? notoSansThai.className : ''
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
