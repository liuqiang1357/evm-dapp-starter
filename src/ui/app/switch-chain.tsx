'use client';

import { switchChain } from '@wagmi/core';
import { useAtomValue } from 'jotai';
import { ComponentProps, FC } from 'react';
import { chains, supportedChainIds } from '@/configs/chains';
import { chainIdAtom, connectorChainIdAtom } from '@/lib/states/evm';
import { cn } from '@/lib/utils/shadcn';
import { wagmiConfig } from '@/lib/utils/wagmi';
import { Button } from '@/ui/shadcn/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/ui/shadcn/dropdown-menu';

export const SwitchChain: FC<ComponentProps<'div'>> = ({ className, ...props }) => {
  const chainId = useAtomValue(chainIdAtom);

  const connectorChainId = useAtomValue(connectorChainIdAtom);

  return (
    <div className={cn('inline-block', className)} {...props}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {connectorChainId != null && connectorChainId !== chainId ? (
            <Button variant="destructive">Wrong network</Button>
          ) : (
            <Button variant="outline">{chains[chainId].name}</Button>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {supportedChainIds.map(chainId => (
            <DropdownMenuItem key={chainId} onClick={() => switchChain(wagmiConfig, { chainId })}>
              {chains[chainId].name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
