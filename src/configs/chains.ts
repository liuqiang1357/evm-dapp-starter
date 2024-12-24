import { produce } from 'immer';
import { Chain } from 'viem';
import { arbitrum, goerli, mainnet, sepolia } from 'viem/chains';
import { target, Target } from './env';

export enum ChainId {
  Mainnet = 1,
  Arbitrum = 42161,
  Sepolia = 11155111,
  Goerli = 5,
}

export const supportedChainIds = {
  [Target.MainNet]: [ChainId.Mainnet, ChainId.Arbitrum],
  [Target.TestNet]: [ChainId.Sepolia, ChainId.Goerli],
}[target];

export const chains: Record<ChainId, Chain> = {
  [ChainId.Mainnet]: produce(mainnet, chain => {
    chain.rpcUrls.default.http[0] = 'https://ethereum-rpc.publicnode.com' as never;
  }),
  [ChainId.Arbitrum]: arbitrum,
  [ChainId.Sepolia]: produce(sepolia, chain => {
    chain.rpcUrls.default.http[0] = 'https://ethereum-sepolia-rpc.publicnode.com' as never;
  }),
  [ChainId.Goerli]: goerli,
};
