import { coinbaseWallet, injected, safe, walletConnect } from '@wagmi/connectors';
import {
  BaseError as WagmiBaseError,
  ConnectorNotConnectedError as WagmiConnectorNotConnectedError,
} from '@wagmi/core';
import {
  Chain,
  createClient,
  http,
  BaseError as ViemBaseError,
  ChainMismatchError as ViemChainMismatchError,
  UserRejectedRequestError as ViemUserRejectedRequestError,
} from 'viem';
import { createConfig } from 'wagmi';
import { chains, supportedChainIds } from '@/configs/chains';
import {
  ChainMismatchError,
  ConnectorNotConnectedError,
  EvmError,
  UserRejectedRequestError,
} from '../errors/evm';
import { notNullish } from './misc';

export const wagmiConfig = createConfig({
  chains: supportedChainIds.map(chainId => chains[chainId]) as [Chain, ...Chain[]],
  client({ chain }) {
    return createClient({ chain, transport: http() });
  },
  connectors: [
    injected({ target: 'metaMask' }),
    coinbaseWallet({ appName: 'demo', overrideIsMetaMask: false }),
    walletConnect({ showQrModal: false, projectId: '83333dd2a970d5644e1318f9370b15a1' }),
    typeof window !== 'undefined' && window?.parent !== window
      ? safe({ allowedDomains: [/gnosis-safe.io$/, /app.safe.global$/] })
      : null,
  ].filter(notNullish),
  ssr: true,
});

export function convertMaybeEvmError(error: Error): Error {
  if (error instanceof WagmiBaseError) {
    if (error instanceof WagmiConnectorNotConnectedError) {
      return new ConnectorNotConnectedError(undefined, { cause: error });
    }
    return new EvmError(error.shortMessage, { cause: error });
  }
  if (error instanceof ViemBaseError) {
    if (error instanceof ViemUserRejectedRequestError) {
      return new UserRejectedRequestError(undefined, { cause: error });
    }
    if (error instanceof ViemChainMismatchError) {
      return new ChainMismatchError(undefined, { cause: error });
    }
    return new EvmError(error.shortMessage, { cause: error });
  }
  return error;
}
