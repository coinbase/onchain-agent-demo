import { cn } from '@coinbase/onchainkit/theme';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTransactionCount } from 'wagmi';
import { AGENT_WALLET_ADDRESS, DEFAULT_PROMPT } from '../constants';
import useChat from '../hooks/useChat';
import type { AgentMessage, StreamEntry } from '../types';
import { markdownToPlainText } from '../utils';
import StreamItem from './StreamItem';

type StreamProps = {
  className?: string;
};

export default function Stream({ className }: StreamProps) {
  const [streamEntries, setStreamEntries] = useState<StreamEntry[]>([]);
  const [isThinking, setIsThinking] = useState(true);
  const [loadingDots, setLoadingDots] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleSuccess = useCallback((messages: AgentMessage[]) => {
    let message = messages.find((res) => res.event === 'agent');
    if (!message) {
      message = messages.find((res) => res.event === 'tools');
    }
    if (!message) {
      message = messages.find((res) => res.event === 'error');
    }
    const streamEntry: StreamEntry = {
      timestamp: new Date(),
      content: markdownToPlainText(message?.data || ''),
      type: 'agent',
    };
    setIsThinking(false);
    setStreamEntries((prev) => [...prev, streamEntry]);
    setTimeout(() => {
      setIsThinking(true);
    }, 800);
  }, []);

  const { postChat, isLoading } = useChat({
    onSuccess: handleSuccess,
  });

  // enables live stream of agent thoughts
  useEffect(() => {
    const streamInterval = setInterval(() => {
      if (!isLoading) {
        postChat(DEFAULT_PROMPT);
      }
    }, 6000);

    return () => {
      clearInterval(streamInterval);
    };
  }, [isLoading, postChat]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Dependency is required
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

  const { data: transactionCount } = useTransactionCount({
    address: AGENT_WALLET_ADDRESS,
    query: { refetchInterval: 5000 },
  });

  return (
    <div className={cn('flex w-full flex-col md:flex md:w-1/2', className)}>
      <div className="flex items-center border-[#5788FA]/50 border-b p-2">
        Total transactions: {transactionCount}
      </div>
      <div className="max-w-full flex-grow overflow-y-auto p-4 pb-20">
        <p className="text-zinc-500">Streaming real-time...</p>
        <div className="mt-4 space-y-2" role="log" aria-live="polite">
          {streamEntries.map((entry, index) => (
            <StreamItem
              key={`${entry.timestamp.toDateString()}-${index}`}
              entry={entry}
            />
          ))}
        </div>
        {isThinking && (
          <div className="mt-4 flex items-center text-[#5788FA] opacity-70">
            <span className="max-w-full font-mono">
              Agent is observing
              {loadingDots}
            </span>
          </div>
        )}
        <div className="mt-3" ref={bottomRef} />
      </div>
    </div>
  );
}
