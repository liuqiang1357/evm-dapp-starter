import { useQuery } from '@tanstack/react-query';
import { getServerTime } from '../apis/time';

export function useServerTime() {
  return useQuery({
    queryKey: ['server-time'],
    queryFn: async () => {
      return await getServerTime();
    },
  });
}
