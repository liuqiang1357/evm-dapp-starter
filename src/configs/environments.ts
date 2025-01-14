import { $enum } from 'ts-enum-util';

export enum Environment {
  Production = 'production',
  Development = 'development',
}

export const environment = $enum(Environment).asValueOrThrow(process.env.NEXT_PUBLIC_ENVIRONMENT);
