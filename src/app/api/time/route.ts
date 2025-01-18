import { withResponse } from '@/lib/utils/next';

export const GET = withResponse(() => {
  return Date.now();
});
