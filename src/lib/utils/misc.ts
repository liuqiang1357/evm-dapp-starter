import BigNumber from 'bignumber.js';

export function rawAmountToAmount(rawAmount: bigint, decimals: number): string {
  const bn = new BigNumber(rawAmount.toString());
  return bn.dp(0, BigNumber.ROUND_DOWN).shiftedBy(-decimals).toFixed();
}

export function amountToRawAmount(amount: string, decimals: number): bigint {
  const bn = new BigNumber(amount);
  return BigInt(bn.shiftedBy(decimals).dp(0, BigNumber.ROUND_DOWN).toFixed());
}

export function notNullish<T>(value: T | null | undefined): value is T {
  return value != null && value !== undefined;
}
