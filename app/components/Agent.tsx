import { useCallback, useState } from 'react';

import type { Language } from '../types';
import AgentProfile from './AgentProfile';
import AgentStats from './AgentStats';
import Footer from './Footer';
import Navbar from './Navbar';
import Stream from './Stream';

export default function Agent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  const handleLanguageChange = useCallback((lang: Language) => {
    setCurrentLanguage(lang);
  }, []);

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-black font-mono text-[#5788FA]">
      <Navbar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        setCurrentLanguage={handleLanguageChange}
        currentLanguage={currentLanguage}
      />

      <div className="relative flex flex-grow overflow-hidden">
        <div
          className={`
          ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed z-20 flex h-full w-full flex-col overflow-y-auto bg-black p-2 transition-transform duration-300 lg:relative lg:z-0 lg:w-1/3 lg:translate-x-0 lg:border-[#5788FA]/50 lg:border-r `}
        >
          <AgentProfile currentLanguage={currentLanguage} />
          <AgentStats currentLanguage={currentLanguage} />
        </div>

        <Stream currentLanguage={currentLanguage} />
      </div>
      <Footer />
    </div>
  );
}
