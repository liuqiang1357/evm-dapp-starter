import { target, Target } from './env';

export enum ChainId {
  Mainnet = 1,
  Arbitrum = 42161,
  Sepolia = 11155111,
  Goerli = 5,
  NeoxDev = 2312251829,
}

export const chainIds = {
  [Target.MainNet]: [ChainId.Mainnet, ChainId.Arbitrum],
  [Target.TestNet]: [ChainId.Sepolia, ChainId.Goerli, ChainId.NeoxDev],
}[target];

export type ChainMap<T> = Record<ChainId, T>;

export const chainNames: ChainMap<string> = {
  [ChainId.Mainnet]: 'Mainnet',
  [ChainId.Arbitrum]: 'Arbitrum',
  [ChainId.Sepolia]: 'Sepolia',
  [ChainId.Goerli]: 'Goerli',
  [ChainId.NeoxDev]: 'NeoX-Dev',
};
