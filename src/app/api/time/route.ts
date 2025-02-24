import { withResponse } from '@/lib/utils/next';

export const runtime = 'edge';

export const GET = withResponse(() => {
  return Date.now();
});
