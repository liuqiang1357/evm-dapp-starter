import { $enum } from 'ts-enum-util';

export enum Target {
  Mainnet = 'mainnet',
  Testnet = 'testnet',
}

export const target = $enum(Target).asValueOrDefault(
  process.env.NEXT_PUBLIC_TARGET,
  Target.Mainnet,
);
