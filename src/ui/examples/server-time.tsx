'use client';

import { FC } from 'react';
import { ComponentProps } from 'react';
import { useServerTime } from '@/lib/hooks/time';
import { formatTime } from '@/lib/utils/formatters';

export const ServerTime: FC<ComponentProps<'div'>> = props => {
  const { data: serverTime } = useServerTime();

  return <div {...props}>Server time: {formatTime(serverTime)}</div>;
};
