import { SkipToken, skipToken, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { waitForTransactionReceipt } from '@wagmi/core';
import {
  getBalance,
  GetBalanceParams,
  getDecimals,
  GetDecimalsParams,
  getSymbol,
  GetSymbolParams,
  transfer,
  TransferParams,
} from '../apis/tokens';
import { wagmiConfig } from '../utils/evm';

export function useDecimals(params: GetDecimalsParams | SkipToken) {
  return useQuery({
    queryKey: ['decimals', params],
    queryFn:
      params !== skipToken
        ? async () => {
            return await getDecimals(params);
          }
        : skipToken,
    staleTime: Infinity,
  });
}

export function useSymbol(params: GetSymbolParams | SkipToken) {
  return useQuery({
    queryKey: ['symbol', params],
    queryFn:
      params !== skipToken
        ? async () => {
            return await getSymbol(params);
          }
        : skipToken,
    staleTime: Infinity,
  });
}

export type UseBalanceParams = Omit<GetBalanceParams, 'decimals'>;

export function useBalance(params: UseBalanceParams | SkipToken) {
  const { data: decimals } = useDecimals(
    params !== skipToken ? { chainId: params.chainId, address: params.address } : skipToken,
  );

  const apiParams = params !== skipToken && decimals != null ? { ...params, decimals } : skipToken;

  return useQuery({
    queryKey: ['balance', apiParams],
    queryFn:
      apiParams !== skipToken
        ? async () => {
            return await getBalance(apiParams);
          }
        : skipToken,
  });
}

export function useTransfer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: TransferParams) => {
      const hash = await transfer(params);
      await waitForTransactionReceipt(wagmiConfig, { chainId: params.chainId, hash });
      queryClient.invalidateQueries({
        queryKey: ['balance', { chainId: params.chainId, account: params.account }],
      });
    },
  });
}
