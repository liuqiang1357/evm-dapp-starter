'use client';

import { useConnectModal } from '@rainbow-me/rainbowkit';
import { disconnect } from '@wagmi/core';
import { useAtomValue } from 'jotai';
import { ComponentProps, FC } from 'react';
import { accountAtom } from '@/lib/states/evm';
import { formatLongText } from '@/lib/utils/formatters';
import { cn } from '@/lib/utils/shadcn';
import { wagmiConfig } from '@/lib/utils/wagmi';
import { Button } from '@/ui/shadcn/button';
import { AccountIcon } from './account-icon';

export const Connect: FC<ComponentProps<'div'>> = ({ className, ...props }) => {
  const account = useAtomValue(accountAtom);

  const { openConnectModal } = useConnectModal();

  return (
    <div className={cn('group relative inline-flex', className)} {...props}>
      <Button
        className={cn('flex items-center', account != null && 'group-hover:opacity-0')}
        variant="outline"
        onClick={openConnectModal}
      >
        {account != null ? (
          <>
            <AccountIcon account={account} />
            <div className="ml-2">{formatLongText(account, { headTailLength: 4 })}</div>
          </>
        ) : (
          'Connect wallet'
        )}
      </Button>
      {account != null && (
        <Button
          className="absolute inset-0 flex h-auto items-center opacity-0 group-hover:opacity-100"
          variant="destructive"
          onClick={() => disconnect(wagmiConfig)}
        >
          Disconnect
        </Button>
      )}
    </div>
  );
};
