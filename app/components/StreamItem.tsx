import { useMemo } from 'react';
import { notoSansThai } from '../constants';
import type { Language, StreamEntry } from '../types';
import { getActionIcon } from '../utils';
import TimeDisplay from './TimeDisplay';

type StreamItemProps = {
  entry: StreamEntry;
  currentLanguage: Language;
};

export default function StreamItem({
  entry,
  currentLanguage,
}: StreamItemProps) {
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
