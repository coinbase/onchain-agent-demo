import { ChangeEvent, useCallback } from "react";
import { Language } from "../types";
import { notoSansThai } from "../constants";
import { translations } from "../translations";
import SendSvg from "../svg/SendSvg";

type PremadeChatInputProps = {
  text: string;
  currentLanguage: Language;
  setUserInput: (input: string) => void;
};

function PremadeChatInput({
  text,
  currentLanguage,
  setUserInput,
}: PremadeChatInputProps) {
  return (
    <button
      onClick={() => setUserInput(text)}
      className={`text-[#5788FA] whitespace-nowrap hover:text-[#3D7BFF] hover:bg-zinc-900 transition-colors border border-[#5788FA]/50 px-2 py-1 rounded-sm ${
        currentLanguage === "th" ? notoSansThai.className : ""
      }`}
    >
      {text}
    </button>
  );
}

export type ChatInputProps = {
  handleSubmit: (e: React.FormEvent) => void;
  userInput: string;
  setUserInput: (input: string) => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  currentLanguage: Language;
};

export default function ChatInput({
  currentLanguage,
  handleSubmit,
  userInput,
  setUserInput,
  handleKeyPress,
}: ChatInputProps) {
  const handleInputChange = useCallback(
    // TODO: sanitize
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setUserInput(e.target.value);
    },
    [setUserInput]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed bottom-0 right-0 w-full lg:w-2/3 border-t border-[#5788FA]/50 bg-black"
    >
      <div className="relative">
        <textarea
          value={userInput}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className={`w-full h-24 lg:h-36 bg-black text-[#5788FA] p-4 pr-10 placeholder-[#5788FA] placeholder-opacity-50 ${
            currentLanguage === "th" ? notoSansThai.className : ""
          }`}
          placeholder={translations[currentLanguage].chat.placeholder}
          rows={1}
        />
        <div className="px-2 absolute bottom-0.5 right-0 flex items-center justify-between w-full -translate-y-1/2">
          <div className="flex space-x-2 text-xs lg:text-sm ml-2 overflow-x-auto">
            <PremadeChatInput
              setUserInput={setUserInput}
              currentLanguage={currentLanguage}
              text={translations[currentLanguage].chat.suggestions.send}
            />
            <PremadeChatInput
              setUserInput={setUserInput}
              currentLanguage={currentLanguage}
              text={translations[currentLanguage].chat.suggestions.create}
            />
            <PremadeChatInput
              setUserInput={setUserInput}
              currentLanguage={currentLanguage}
              text={translations[currentLanguage].chat.suggestions.swap}
            />
          </div>
          <button
            type="submit"
            disabled={!/[a-zA-Z]/.test(userInput)}
            className={`p-1.5 rounded-sm transition-colors ${
              /[a-zA-Z]/.test(userInput)
                ? "bg-[#5788FA] text-zinc-950 hover:bg-[#3D7BFF]"
                : "bg-[#5788FA] text-zinc-950 opacity-50 cursor-not-allowed"
            }`}
          >
            <SendSvg />
          </button>
        </div>
      </div>
    </form>
  );
}
