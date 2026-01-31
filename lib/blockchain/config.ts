import { http, createConfig } from 'wagmi';
import { celo, celoAlfajores } from 'wagmi/chains';
import { injected, walletConnect } from 'wagmi/connectors';

// Get environment variables
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '';

export const config = createConfig({
  chains: [celoAlfajores, celo],
  connectors: [
    injected(),
    walletConnect({
      projectId,
      metadata: {
        name: 'Soccer Quiz Pro',
        description: 'Play soccer quizzes and earn SOCPT tokens on CELO',
        url: process.env.NEXT_PUBLIC_FARCASTER_FRAME_URL || 'https://localhost:3000',
        icons: ['https://avatars.githubusercontent.com/u/37784886']
      }
    }),
  ],
  transports: {
    [celoAlfajores.id]: http(),
    [celo.id]: http(),
  },
});

// Network configuration helper
export const getActiveChain = () => {
  const chainId = process.env.NEXT_PUBLIC_CHAIN_ID || '44787';
  return chainId === '42220' ? celo : celoAlfajores;
};

// Contract addresses (update after deployment)
export const CONTRACTS = {
  PAYMENT: process.env.NEXT_PUBLIC_PAYMENT_CONTRACT_ADDRESS as `0x${string}`,
  TOKEN: process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS as `0x${string}`,
};

// Network details
export const NETWORK_CONFIG = {
  [celoAlfajores.id]: {
    name: 'CELO Alfajores Testnet',
    explorer: 'https://alfajores.celoscan.io',
    faucet: 'https://faucet.celo.org/alfajores',
  },
  [celo.id]: {
    name: 'CELO Mainnet',
    explorer: 'https://celoscan.io',
    faucet: null,
  },
};

// Quiz payment amount
export const QUIZ_FEE = '0.1'; // 0.1 CELO
export const QUIZ_FEE_WEI = BigInt('100000000000000000'); // 0.1 CELO in wei
