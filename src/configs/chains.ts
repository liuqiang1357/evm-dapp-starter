import { produce } from 'immer';
import { Chain } from 'viem';
import { arbitrum, arbitrumSepolia, mainnet, sepolia } from 'viem/chains';
import { Environment, environment } from './environments';

export enum ChainId {
  Mainnet = 1,
  Arbitrum = 42161,
  Sepolia = 11155111,
  ArbitrumSepolia = 421614,
}

export const supportedChainIds = {
  [Environment.Production]: [ChainId.Mainnet, ChainId.Arbitrum],
  [Environment.Development]: [ChainId.Sepolia, ChainId.ArbitrumSepolia],
}[environment];

export const chains: Record<ChainId, Chain> = {
  [ChainId.Mainnet]: produce(mainnet, chain => {
    (chain.rpcUrls.default.http[0] as string) = 'https://ethereum-rpc.publicnode.com';
  }),
  [ChainId.Arbitrum]: arbitrum,
  [ChainId.Sepolia]: produce(sepolia, chain => {
    (chain.rpcUrls.default.http[0] as string) = 'https://ethereum-sepolia-rpc.publicnode.com';
  }),
  [ChainId.ArbitrumSepolia]: arbitrumSepolia,
};
