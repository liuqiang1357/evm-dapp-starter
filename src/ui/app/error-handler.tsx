'use client';

import { useAtom } from 'jotai';
import { FC, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { BaseError } from '@/lib/errors/base';
import { lastErrorAtom } from '@/lib/states/errors';

export const ErrorHandler: FC = () => {
  const [lastError, setLastError] = useAtom(lastErrorAtom);

  const recentMessages = useRef<Partial<Record<string, boolean>>>({});

  useEffect(() => {
    if (lastError != null) {
      setLastError(null);

      if (lastError instanceof BaseError) {
        setTimeout(() => {
          if (!lastError.handled) {
            lastError.handled = true;

            if (recentMessages.current[lastError.message] !== true) {
              recentMessages.current[lastError.message] = true;

              toast.error(lastError.message);

              setTimeout(() => {
                delete recentMessages.current[lastError.message];
              }, 1000);
            }
          }
        });
        if (lastError.needFix) {
          console.error(lastError);
        } else {
          // eslint-disable-next-line no-console
          console.log(lastError);
        }
      } else {
        console.error(lastError);
      }
    }
  }, [lastError, setLastError]);

  return null;
};
