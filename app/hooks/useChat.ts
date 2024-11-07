import { useCallback, useState } from 'react';
import { API_URL } from '../config';
import type { AgentMessage } from '../types';

type UseChatResponse = {
  messages?: AgentMessage[];
  error?: Error;
  postChat: (input: string) => void;
  isLoading: boolean;
};

type UseChatProps = {
  onSuccess: (messages: AgentMessage[]) => void;
};

export default function useChat({ onSuccess }: UseChatProps): UseChatResponse {
  const [isLoading, setIsLoading] = useState(false);

  const postChat = useCallback(
    async (input: string) => {
      setIsLoading(true);

      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ input }),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const text = await response.text();
        
        const parsedMessages = text
          .trim()
          .split('\n')
          .map((line) => {
            try {
              return JSON.parse(line);
            } catch (error) {
              console.error('Failed to parse line as JSON:', line, error);
              return null;
            }
          })
          .filter(Boolean);

        onSuccess(parsedMessages);
        return { messages: parsedMessages, error: null };
      } catch (error) {
        console.error('Error posting chat:', error);
        return { messages: [], error: error as Error };
      } finally {
        setIsLoading(false);
      }
    },
    [onSuccess],
  );

  return { postChat, isLoading };
}
