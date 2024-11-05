import { useEffect, useMemo, useRef } from 'react';
import { notoSansThai } from '../constants';
import { translations } from '../translations';
import type { Language, StreamEntry } from '../types';
import { getActionIcon } from '../utils';
import TimeDisplay from './TimeDisplay';

type StreamEntryItemProps = {
  entry: StreamEntry;
  currentLanguage: Language;
};

function StreamEntryItem({ entry, currentLanguage }: StreamEntryItemProps) {
  const className = useMemo(() => {
    let baseClass = 'flex items-center space-x-2';

    if (entry?.type && ['tools', 'user'].includes(entry?.type)) {
      baseClass += ' text-[#5788FA]';
    } else {
      baseClass += ' text-gray-300';
    }

    if (currentLanguage === 'th') {
      baseClass += ` ${notoSansThai.className}`;
    }

    return baseClass;
  }, [currentLanguage, entry?.type]);

  const icon = useMemo(() => {
    return getActionIcon(entry.type);
  }, [entry]);

  if (entry.type) {
    return (
      <div className="mb-2">
        <TimeDisplay timestamp={entry.timestamp} />
        <div className={className}>
          {icon && <div className="h-4 w-4">{icon}</div>}
          <span>{entry.content}</span>
        </div>
      </div>
    );
  }
  return (
    <div className="mb-2">
      <TimeDisplay timestamp={entry.timestamp} />
      <div
        className={`text-gray-300 ${
          currentLanguage === 'th' ? notoSansThai.className : ''
        }`}
      >
        {entry.content}
      </div>
    </div>
  );
}

type StreamProps = {
  currentLanguage: Language;
  streamEntries: StreamEntry[];
  isThinking: boolean;
  loadingDots: string;
};

export default function Stream({
  currentLanguage,
  streamEntries,
  isThinking,
  loadingDots,
}: StreamProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scrolls to the bottom of the chat when messages change
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
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
          <StreamEntryItem
            key={`${entry.timestamp.toDateString()}-${index}`}
            entry={entry}
            currentLanguage={currentLanguage}
          />
        ))}
      </div>
      {isThinking && (
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
  );
}
