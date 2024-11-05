import { notoSansThai } from "../constants";
import { translations } from "../translations";
import { Language, StreamEntry } from "../types";
import { getActionIcon } from "../utils";
import TimeDisplay from "./TimeDisplay";

type StreamEntryItemProps = {
  entry: StreamEntry;
  currentLanguage: Language;
};

function StreamEntryItem({ entry, currentLanguage }: StreamEntryItemProps) {
  if (entry.type) {
    return (
      <div className="mb-2">
        <TimeDisplay timestamp={entry.timestamp} />
        <div
          className={`flex items-center space-x-2 text-[#5788FA] ${
            currentLanguage === "th" ? notoSansThai.className : ""
          }`}
        >
          {getActionIcon(entry.type)}
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
          currentLanguage === "th" ? notoSansThai.className : ""
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
  return (
    <div className="flex-grow p-4 pb-40 overflow-y-auto">
      <p
        className={`text-zinc-500 ${
          currentLanguage === "th" ? notoSansThai.className : ""
        }`}
      >
        {translations[currentLanguage].stream.realTime}
      </p>
      <div className="mt-4 space-y-2" role="log" aria-live="polite">
        {streamEntries.map((entry, index) => (
          <StreamEntryItem
            key={index}
            entry={entry}
            currentLanguage={currentLanguage}
          />
        ))}
      </div>
      {isThinking && (
        <div className="flex items-center mt-4 text-[#5788FA] opacity-70">
          <span
            className={`font-mono ${
              currentLanguage === "th" ? notoSansThai.className : ""
            }`}
          >
            {translations[currentLanguage].stream.thinking}
            {loadingDots}
          </span>
        </div>
      )}
    </div>
  );
}
