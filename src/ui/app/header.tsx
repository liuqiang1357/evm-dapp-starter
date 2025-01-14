'use client';

import { ComponentProps, FC } from 'react';
import { cn } from '@/lib/utils/shadcn';
import { Connect } from './connect';
import { SwitchChain } from './switch-chain';
import { SwitchTheme } from './switch-theme';

export const Header: FC<ComponentProps<'div'>> = ({ className, ...props }) => {
  return (
    <div className={cn('container flex h-20 items-center justify-between', className)} {...props}>
      <div className="text-2xl">Evm Dapp Starter</div>

      <div className="flex space-x-4">
        <SwitchChain />
        <Connect />
        <SwitchTheme />
      </div>
    </div>
  );
};
