import { useCallback, useEffect, useState } from 'react';

import useChat from '../hooks/useChat';
import type { AgentMessage, Language, StreamEntry } from '../types';
import AgentProfile from './AgentProfile';
import AgentStats from './AgentStats';
import ChatInput from './ChatInput';
import Footer from './Footer';
import Navbar from './Navbar';
import Stream from './Stream';

export default function Agent() {
  const [streamEntries, setStreamEntries] = useState<StreamEntry[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isThinking, setIsThinking] = useState(true);
  const [loadingDots, setLoadingDots] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [isLiveDotVisible, setIsLiveDotVisible] = useState(true);
  const [isChatMode, setIsChatMode] = useState(false);

  // TODO: revisit this logic
  const handleSuccess = useCallback((messages: AgentMessage[]) => {
    // const message = messages.find((res) => res.event === "agent");
    const filteredMessages = messages.filter(
      (msg) => msg.event !== 'completed',
    );
    const streams = filteredMessages.map((msg) => {
      return {
        timestamp: new Date(),
        content: msg?.data || '',
        type: msg?.event,
      };
    });
    // const streamEntry = {
    //   timestamp: new Date(),
    //   content: message?.data || "",
    // };
    setIsThinking(false);
    setStreamEntries((prev) => [...prev, ...streams]);
    setTimeout(() => {
      setIsThinking(true);
    }, 800);
  }, []);

  const { postChat, isLoading } = useChat({ onSuccess: handleSuccess });

  // enables live stream of agent thoughts
  useEffect(() => {
    const streamInterval = setInterval(() => {
      if (!isLoading && !isChatMode) {
        postChat('same a one liner that is inspiring');
      }
    }, 1500);

    return () => {
      clearInterval(streamInterval);
    };
  }, [isLoading, postChat, isChatMode]);

  // enables dot animation for "agent is thinking..."
  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setLoadingDots((prev) => (prev.length >= 3 ? '' : `${prev}.`));
    }, 500);

    return () => clearInterval(dotsInterval);
  }, []);

  // enables glowing live on sepolia dot
  useEffect(() => {
    const dotInterval = setInterval(() => {
      setIsLiveDotVisible((prev) => !prev);
    }, 1000);

    return () => clearInterval(dotInterval);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!userInput.trim()) {
        return;
      }

      // disable live stream
      setIsChatMode(true);
      setUserInput('');

      const userMessage: StreamEntry = {
        timestamp: new Date(),
        type: 'user',
        content: userInput.trim(),
      };

      setStreamEntries((prev) => [...prev, userMessage]);

      postChat(userInput);
    },
    [postChat, userInput],
  );

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e);
      }
    },
    [handleSubmit],
  );

  const handleLanguageChange = useCallback((lang: Language) => {
    setCurrentLanguage(lang);
    setStreamEntries([]);
  }, []);

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-black font-mono text-[#5788FA]">
      <Navbar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        isLiveDotVisible={isLiveDotVisible}
        setCurrentLanguage={handleLanguageChange}
        currentLanguage={currentLanguage}
      />

      <div className="relative flex flex-grow overflow-hidden">
        <div
          className={`
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} fixed z-20 flex h-full w-full flex-col overflow-y-auto bg-black p-2 transition-transform duration-300 lg:relative lg:z-0 lg:w-1/3 lg:translate-x-0 lg:border-[#5788FA]/50 lg:border-r `}
        >
          <AgentProfile currentLanguage={currentLanguage} />
          <AgentStats currentLanguage={currentLanguage} />
        </div>

        <div className="flex w-full flex-grow flex-col lg:w-2/3">
          <Stream
            currentLanguage={currentLanguage}
            streamEntries={streamEntries}
            isThinking={isThinking && !isChatMode}
            loadingDots={loadingDots}
          />
          <ChatInput
            currentLanguage={currentLanguage}
            userInput={userInput}
            handleKeyPress={handleKeyPress}
            handleSubmit={handleSubmit}
            setUserInput={setUserInput}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
