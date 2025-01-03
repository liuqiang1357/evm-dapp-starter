import { readContract, writeContract } from '@wagmi/core';
import { Address, Hash } from 'viem';
import { ChainId } from '@/configs/chains';
import { ierc20Abi } from '../abis/ierc20';
import { wagmiConfig } from '../utils/evm';
import { amountToRawAmount, rawAmountToAmount } from '../utils/misc';

export type GetDecimalsParams = {
  chainId: ChainId;
  address: Address;
};

export async function getDecimals(params: GetDecimalsParams): Promise<number> {
  const decimals = await readContract(wagmiConfig, {
    chainId: params.chainId,
    address: params.address,
    abi: ierc20Abi,
    functionName: 'decimals',
  });
  return decimals;
}

export type GetSymbolParams = {
  chainId: ChainId;
  address: Address;
};

export async function getSymbol(params: GetDecimalsParams): Promise<string> {
  const symbol = await readContract(wagmiConfig, {
    chainId: params.chainId,
    address: params.address,
    abi: ierc20Abi,
    functionName: 'symbol',
  });
  return symbol;
}

export type GetBalanceParams = {
  chainId: ChainId;
  address: Address;
  account: Address;
  decimals: number;
};

export async function getBalance(params: GetBalanceParams): Promise<string> {
  const balance = await readContract(wagmiConfig, {
    chainId: params.chainId,
    address: params.address,
    abi: ierc20Abi,
    functionName: 'balanceOf',
    args: [params.account],
  });
  return rawAmountToAmount(balance, params.decimals);
}

export type TransferParams = {
  chainId: ChainId;
  address: Address;
  account: Address;
  decimals: number;
  to: Address;
  amount: string;
};

export async function transfer(params: TransferParams): Promise<Hash> {
  const hash = await writeContract(wagmiConfig, {
    chainId: params.chainId,
    address: params.address,
    account: params.account,
    abi: ierc20Abi,
    functionName: 'transfer',
    args: [params.to, amountToRawAmount(params.amount, params.decimals)],
  });
  return hash;
}
