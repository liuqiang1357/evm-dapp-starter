import {
  BaseError as WagmiBaseError,
  ConnectorNotConnectedError as WagmiConnectorNotConnectedError,
} from '@wagmi/core';
import { getDefaultConfig } from 'connectkit';
import { produce } from 'immer';
import {
  Chain,
  BaseError as ViemBaseError,
  ChainMismatchError as ViemChainMismatchError,
  UserRejectedRequestError as ViemUserRejectedRequestError,
} from 'viem';
import { arbitrum, goerli, mainnet, sepolia } from 'viem/chains';
import { createConfig } from 'wagmi';
import { ChainId, chainIds, ChainMap, chainNames } from '@/configs/chains';
import {
  ChainMismatchError,
  EthereumError,
  UserRejectedRequestError,
  WalletNotConnectedError,
} from '../errors/ethereum';

const chains: ChainMap<Chain> = {
  [ChainId.Mainnet]: produce(mainnet, chain => {
    chain.rpcUrls.default.http[0] = 'https://ethereum-rpc.publicnode.com' as never;
  }),
  [ChainId.Arbitrum]: arbitrum,
  [ChainId.Sepolia]: produce(sepolia, chain => {
    chain.rpcUrls.default.http[0] = 'https://ethereum-sepolia-rpc.publicnode.com' as never;
  }),
  [ChainId.Goerli]: goerli,
  [ChainId.NeoxDev]: {
    id: ChainId.NeoxDev,
    name: chainNames[ChainId.NeoxDev],
    nativeCurrency: {
      name: 'GAS',
      symbol: 'GAS',
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ['http://172.18.17.135:8562'],
      },
    },
    blockExplorers: {
      default: {
        name: 'Neo X Chain Explorer',
        url: 'http://localhost',
      },
    },
    testnet: true,
  },
};

export const wagmiConfig = createConfig(
  getDefaultConfig({
    appName: 'demo',
    walletConnectProjectId: '83333dd2a970d5644e1318f9370b15a1',
    chains: chainIds.map(chainId => chains[chainId]) as [Chain, ...Chain[]],
    ssr: true,
  }),
);

export function convertMaybeEthereumError(error: Error): Error {
  if (error instanceof WagmiBaseError) {
    if (error instanceof WagmiConnectorNotConnectedError) {
      return new WalletNotConnectedError(undefined, { cause: error });
    }
    return new EthereumError(error.shortMessage, { cause: error });
  }
  if (error instanceof ViemBaseError) {
    if (error instanceof ViemUserRejectedRequestError) {
      return new UserRejectedRequestError(error.shortMessage, { cause: error });
    }
    if (error instanceof ViemChainMismatchError) {
      return new ChainMismatchError(error.shortMessage, { cause: error });
    }
    return new EthereumError(error.shortMessage, { cause: error });
  }
  return error;
}
