import {
  BaseError as WagmiBaseError,
  ConnectorNotConnectedError as WagmiConnectorNotConnectedError,
} from '@wagmi/core';
import { getDefaultConfig } from 'connectkit';
import {
  Chain,
  BaseError as ViemBaseError,
  ChainMismatchError as ViemChainMismatchError,
  UserRejectedRequestError as ViemUserRejectedRequestError,
} from 'viem';
import { createConfig } from 'wagmi';
import { chains, supportedChainIds } from '@/configs/chains';
import {
  ChainMismatchError,
  EvmError,
  UserRejectedRequestError,
  WalletNotConnectedError,
} from '../errors/evm';

export const wagmiConfig = createConfig(
  getDefaultConfig({
    appName: 'demo',
    walletConnectProjectId: '83333dd2a970d5644e1318f9370b15a1',
    chains: supportedChainIds.map(chainId => chains[chainId]) as [Chain, ...Chain[]],
    ssr: true,
  }),
);

export function convertMaybeEvmError(error: Error): Error {
  if (error instanceof WagmiBaseError) {
    if (error instanceof WagmiConnectorNotConnectedError) {
      return new WalletNotConnectedError(undefined, { cause: error });
    }
    return new EvmError(error.shortMessage, { cause: error });
  }
  if (error instanceof ViemBaseError) {
    if (error instanceof ViemUserRejectedRequestError) {
      return new UserRejectedRequestError(error.shortMessage, { cause: error });
    }
    if (error instanceof ViemChainMismatchError) {
      return new ChainMismatchError(error.shortMessage, { cause: error });
    }
    return new EvmError(error.shortMessage, { cause: error });
  }
  return error;
}
