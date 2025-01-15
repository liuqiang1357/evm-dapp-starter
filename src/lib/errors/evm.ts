import { BaseError, BaseErrorOptions } from './base';

export abstract class EvmError extends BaseError {}

export class UnknownEvmError extends EvmError {
  constructor(message = 'Unknown evm error.', options: BaseErrorOptions = {}) {
    super(message, options);
  }
}

export class ConnectorNotConnectedError extends EvmError {
  constructor(message = 'Wallet not connected.', options: BaseErrorOptions = {}) {
    super(message, { ...options, external: options.external ?? true });
  }
}

export class ChainMismatchError extends EvmError {
  constructor(
    message = 'The current chain of the wallet does not match the requesting one, please switch in the wallet.',
    options: BaseErrorOptions = {},
  ) {
    super(message, { ...options, external: options.external ?? true });
  }
}

export class UserRejectedRequestError extends EvmError {
  constructor(message = 'User rejected request.', options: BaseErrorOptions = {}) {
    super(message, { ...options, external: options.external ?? true });
  }
}
