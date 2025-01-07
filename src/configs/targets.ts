import { $enum } from 'ts-enum-util';

export enum Target {
  Production = 'production',
  Development = 'development',
}

export const target = $enum(Target).asValueOrThrow(process.env.NEXT_PUBLIC_TARGET);
