import { apiRequest } from '../utils/ky';

export async function getServerTime(): Promise<number> {
  const result = await apiRequest<number>({
    url: 'time',
  });
  return result;
}
