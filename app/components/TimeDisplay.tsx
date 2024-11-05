import { useMemo } from "react";

type TimeDisplayProps = {
  timestamp: Date;
};

export default function TimeDisplay({ timestamp }: TimeDisplayProps) {
  const formattedTime = useMemo(() => {
    return timestamp
      .toLocaleString("en-US", {
        timeZone: "Asia/Bangkok",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        formatMatcher: "basic",
      })
      .replace(/(\d+)\/(\d+)\/(\d+)/, "$3-$1-$2");
  }, [timestamp]);

  return (
    <div className="text-xs text-gray-500" aria-live="polite">
      {formattedTime} ICT
    </div>
  );
}
