import { cn } from '@coinbase/onchainkit/theme';
import { useCallback, useEffect, useRef, useState } from 'react';
import { notoSansThai } from '../constants';
import useChat from '../hooks/useChat';
import type { AgentMessage, Language, StreamEntry } from '../types';
import { markdownToPlainText } from '../utils';
import ChatInput from './ChatInput';
import StreamItem from './StreamItem';

type ChatProps = {
  currentLanguage: Language;
  enableLiveStream?: boolean;
  className?: string;
};

export default function Chat({ className, currentLanguage }: ChatProps) {
  const [userInput, setUserInput] = useState('');
  const [streamEntries, setStreamEntries] = useState<StreamEntry[]>([]);

  const bottomRef = useRef<HTMLDivElement>(null);

  const handleSuccess = useCallback((messages: AgentMessage[]) => {
    const message = messages.find((res) => res.event === 'agent');
    const streamEntry: StreamEntry = {
      timestamp: new Date(),
      content: markdownToPlainText(message?.data || ''),
      type: 'agent',
    };

    setStreamEntries((prev) => [...prev, streamEntry]);
  }, []);

  const { postChat, isLoading } = useChat({ onSuccess: handleSuccess });

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!userInput.trim()) {
        return;
      }

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

  // biome-ignore lint/correctness/useExhaustiveDependencies: Dependency is required
  useEffect(() => {
    // scrolls to the bottom of the chat when messages change
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [streamEntries]);

  return (
    <div className={cn('flex h-full w-1/2 grow flex-col md:flex', className)}>
      <div className="flex grow flex-col overflow-y-auto p-4 pb-20">
        <p
          className={`text-zinc-500 ${
            currentLanguage === 'th' ? notoSansThai.className : ''
          }`}
        >
          Ask me something...
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

        <div className="mt-3" ref={bottomRef} />
      </div>

      <ChatInput
        currentLanguage={currentLanguage}
        userInput={userInput}
        handleKeyPress={handleKeyPress}
        handleSubmit={handleSubmit}
        setUserInput={setUserInput}
        disabled={isLoading}
      />
    </div>
  );
}
