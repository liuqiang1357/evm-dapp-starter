import {
  readContract,
  sendTransaction,
  switchChain,
  getBalance as wagmiGetBalance,
  writeContract,
} from '@wagmi/core';
import { Address, Hash } from 'viem';
import { ChainId, chains } from '@/configs/chains';
import { erc20Abi } from '../abis/erc20';
import { amountToRawAmount, rawAmountToAmount } from '../utils/misc';
import { wagmiConfig } from '../utils/wagmi';

export type GetDecimalsParams = {
  chainId: ChainId;
  address: Address | null;
};

export async function getDecimals(params: GetDecimalsParams): Promise<number> {
  if (params.address == null) {
    return chains[params.chainId].nativeCurrency.decimals;
  }
  const decimals = await readContract(wagmiConfig, {
    chainId: params.chainId,
    address: params.address,
    abi: erc20Abi,
    functionName: 'decimals',
  });
  return decimals;
}

export type GetSymbolParams = {
  chainId: ChainId;
  address: Address | null;
};

export async function getSymbol(params: GetDecimalsParams): Promise<string> {
  if (params.address == null) {
    return chains[params.chainId].nativeCurrency.symbol;
  }
  const symbol = await readContract(wagmiConfig, {
    chainId: params.chainId,
    address: params.address,
    abi: erc20Abi,
    functionName: 'symbol',
  });
  return symbol;
}

export type GetBalanceParams = {
  chainId: ChainId;
  address: Address | null;
  account: Address;
  decimals: number;
};

export async function getBalance(params: GetBalanceParams): Promise<string> {
  if (params.address == null) {
    const balance = await wagmiGetBalance(wagmiConfig, {
      chainId: params.chainId,
      address: params.account,
    });
    return rawAmountToAmount(balance.value, params.decimals);
  }
  const balance = await readContract(wagmiConfig, {
    chainId: params.chainId,
    address: params.address,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [params.account],
  });
  return rawAmountToAmount(balance, params.decimals);
}

export type TransferParams = {
  chainId: ChainId;
  address: Address | null;
  account: Address;
  decimals: number;
  to: Address;
  amount: string;
};

export async function transfer(params: TransferParams): Promise<Hash> {
  await switchChain(wagmiConfig, { chainId: params.chainId });

  if (params.address == null) {
    const hash = await sendTransaction(wagmiConfig, {
      chainId: params.chainId,
      to: params.to,
      value: amountToRawAmount(params.amount, params.decimals),
    });
    return hash;
  }
  const hash = await writeContract(wagmiConfig, {
    chainId: params.chainId,
    address: params.address,
    account: params.account,
    abi: erc20Abi,
    functionName: 'transfer',
    args: [params.to, amountToRawAmount(params.amount, params.decimals)],
  });
  return hash;
}
