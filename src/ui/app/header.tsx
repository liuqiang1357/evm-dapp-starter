'use client';

import { ComponentProps, FC } from 'react';
import { tm } from 'lib/utils/tailwind';
import { Connect } from './connect';
import { SwitchTheme } from './switch-theme';

export const Header: FC<ComponentProps<'div'>> = ({ className, ...props }) => {
  return (
    <div className={tm('container flex h-20 items-center justify-between', className)} {...props}>
      <div className="text-2xl">Eth Dapp Starter</div>

      <div className="flex">
        <Connect />
        <SwitchTheme className="ml-4" />
      </div>
    </div>
  );
};