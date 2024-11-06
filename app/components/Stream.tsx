import { useCallback, useEffect, useRef, useState } from 'react';
import { DEFAULT_PROMPT, notoSansThai } from '../constants';
import useChat from '../hooks/useChat';
import { translations } from '../translations';
import type { AgentMessage, Language, StreamEntry } from '../types';
import ChatInput from './ChatInput';
import StreamItem from './StreamItem';

type StreamProps = {
  currentLanguage: Language;
};

export default function Stream({ currentLanguage }: StreamProps) {
  const [streamEntries, setStreamEntries] = useState<StreamEntry[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isThinking, setIsThinking] = useState(true);
  const [loadingDots, setLoadingDots] = useState('');
  const [isChatMode, setIsChatMode] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

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
        postChat(DEFAULT_PROMPT);
      }
    }, 1500);

    return () => {
      clearInterval(streamInterval);
    };
  }, [isLoading, postChat, isChatMode]);

  useEffect(() => {
    // reset entries on language change
    setStreamEntries([]);
  }, [currentLanguage]);

  useEffect(() => {
    // scrolls to the bottom of the chat when messages change
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [streamEntries]);

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setLoadingDots((prev) => (prev.length >= 3 ? '' : `${prev}.`));
    }, 500);

    return () => clearInterval(dotsInterval);
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

  return (
    <div className="flex w-full flex-grow flex-col lg:w-2/3">
      <div className="flex-grow overflow-y-auto p-4 pb-20">
        <p
          className={`text-zinc-500 ${
            currentLanguage === 'th' ? notoSansThai.className : ''
          }`}
        >
          {translations[currentLanguage].stream.realTime}
        </p>
        <div className="mt-4 space-y-2" role="log" aria-live="polite">
          {streamEntries.map((entry, index) => (
            <StreamItem
              key={`${entry.timestamp.toDateString()}-${index}`}
              entry={entry}
              currentLanguage={currentLanguage}
            />
          ))}
        </div>
        {isThinking && !isChatMode && (
          <div className="mt-4 flex items-center text-[#5788FA] opacity-70">
            <span
              className={`font-mono ${
                currentLanguage === 'th' ? notoSansThai.className : ''
              }`}
            >
              {translations[currentLanguage].stream.thinking}
              {loadingDots}
            </span>
          </div>
        )}
        <div className="mt-3" ref={bottomRef} />
      </div>
      <ChatInput
        currentLanguage={currentLanguage}
        userInput={userInput}
        handleKeyPress={handleKeyPress}
        handleSubmit={handleSubmit}
        setUserInput={setUserInput}
      />
    </div>
  );
}
