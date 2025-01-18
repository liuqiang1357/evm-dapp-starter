import { nextRequest } from '../utils/axios';

export async function getServerTime(): Promise<number> {
  const result = await nextRequest<number>({
    url: '/api/time',
  });
  return result;
}
