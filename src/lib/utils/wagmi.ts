import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  BaseError as WagmiBaseError,
  ConnectorNotConnectedError as WagmiConnectorNotConnectedError,
} from '@wagmi/core';
import {
  Chain,
  BaseError as ViemBaseError,
  ChainMismatchError as ViemChainMismatchError,
  UserRejectedRequestError as ViemUserRejectedRequestError,
} from 'viem';
import { chains, supportedChainIds } from '@/configs/chains';
import {
  ChainMismatchError,
  ConnectorNotConnectedError,
  UnknownEvmError,
  UserRejectedRequestError,
} from '../errors/evm';

export const wagmiConfig = getDefaultConfig({
  appName: 'demo',
  projectId: '83333dd2a970d5644e1318f9370b15a1',
  chains: supportedChainIds.map(chainId => chains[chainId]) as [Chain, ...Chain[]],
});

export function convertMaybeEvmError(error: Error): Error {
  if (error instanceof WagmiBaseError) {
    if (error instanceof WagmiConnectorNotConnectedError) {
      return new ConnectorNotConnectedError(undefined, { cause: error });
    }
    return new UnknownEvmError(error.shortMessage, { cause: error });
  }
  if (error instanceof ViemBaseError) {
    if (error.walk(error => error instanceof ViemUserRejectedRequestError) != null) {
      return new UserRejectedRequestError(undefined, { cause: error });
    }
    if (error.walk(error => error instanceof ViemChainMismatchError) != null) {
      return new ChainMismatchError(undefined, { cause: error });
    }
    return new UnknownEvmError(error.shortMessage, { cause: error });
  }
  return error;
}
