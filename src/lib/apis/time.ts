import { nextRequest } from '../utils/ky';

export async function getServerTime(): Promise<number> {
  const result = await nextRequest<number>({
    url: 'time',
  });
  return result;
}
