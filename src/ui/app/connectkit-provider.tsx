'use client';

import { ConnectKitProvider as Provider, Types } from 'connectkit';
import { useAtomValue } from 'jotai';
import { useTheme } from 'next-themes';
import { FC, ReactNode } from 'react';
import { mainnet } from 'viem/chains';
import { chainIdAtom } from '@/lib/states/evm';
import { AccountIcon } from './account-icon';

// Hot-fix: Connectkit uses this to resolve address name, but it is unstable.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(mainnet.rpcUrls.default.http as any)[0] = 'https://ethereum-rpc.publicnode.com';

export const ConnectKitProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { resolvedTheme } = useTheme();

  const chainId = useAtomValue(chainIdAtom);

  return (
    <Provider
      mode={resolvedTheme as Types.Mode | undefined}
      customTheme={{
        '--ck-accent-color': 'hsl(var(--primary))',
        '--ck-accent-text-color': 'hsl(var(--primary-foreground))',
      }}
      options={{
        initialChainId: chainId,
        customAvatar: AccountIcon,
      }}
    >
      {children}
    </Provider>
  );
};
