import { Noto_Sans_Thai } from 'next/font/google';

export const notoSansThai = Noto_Sans_Thai({
  weight: ['400', '700'],
  subsets: ['thai'],
});

export const AGENT_WALLET_ADDRESS =
  '0x3C9df7A3aa2565F6C891758638FDEeC36fd7D29a';

export const AGENT_NAME = 'Based Agent';

export const DEFAULT_PROMPT =
  'Be creative and same something interesting about the blockchain and your abilities';

// export const DEFAULT_PROMPT =
//   'Be creative and do something interesting on the blockchain. Choose an action or set of actions and execute it in a way that highlights your abilities.';
