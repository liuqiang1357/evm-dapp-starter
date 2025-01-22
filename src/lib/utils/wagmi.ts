import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { BaseError as WagmiBaseError } from '@wagmi/core';
import { createConfig } from '@wagmi/core';
import {
  Chain,
  createClient,
  http,
  BaseError as ViemBaseError,
  UserRejectedRequestError as ViemUserRejectedRequestError,
} from 'viem';
import { appName, walletConnectProjectId } from '@/configs/app';
import { chains, supportedChainIds } from '@/configs/chains';
import { UnknownEvmError, UserRejectedRequestError } from '../errors/evm';

export const wagmiConfig = createConfig({
  chains: supportedChainIds.map(chainId => chains[chainId]) as [Chain, ...Chain[]],
  client: ({ chain }) => {
    return createClient({ chain, transport: http() });
  },
  connectors:
    typeof window !== 'undefined'
      ? getDefaultWallets({ appName, projectId: walletConnectProjectId }).connectors
      : undefined,
});

export function convertMaybeEvmError(error: Error): Error {
  if (error instanceof WagmiBaseError) {
    return new UnknownEvmError(error.shortMessage, { cause: error });
  }
  if (error instanceof ViemBaseError) {
    if (error.walk(error => error instanceof ViemUserRejectedRequestError) != null) {
      return new UserRejectedRequestError(undefined, { cause: error });
    }
    return new UnknownEvmError(error.shortMessage, { cause: error });
  }
  return error;
}
