'use client';

import { generateAvatarURL } from '@cfx-kit/wallet-avatar';
import Image from 'next/image';
import { ComponentProps, FC } from 'react';
import { Address } from 'viem';
import { cn } from '@/lib/utils/shadcn';

type Props = ComponentProps<'div'> & {
  account?: Address;
};

export const AccountIcon: FC<Props> = ({ className, account, ...props }) => {
  return (
    <div
      className={cn('inline-flex size-5 overflow-hidden rounded-full bg-gray-100', className)}
      {...props}
    >
      {account != null && (
        <Image
          className="h-full w-full"
          width="24"
          height="24"
          src={generateAvatarURL(account)}
          alt=""
        />
      )}
    </div>
  );
};
