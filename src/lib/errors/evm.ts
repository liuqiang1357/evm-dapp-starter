import { BaseError, BaseErrorOptions } from './base';

export class EvmError extends BaseError {}

export class WalletNotConnectedError extends EvmError {
  constructor(message = 'Wallet not connected.', options: BaseErrorOptions = {}) {
    super(message, options);
  }
}

export class ChainMismatchError extends EvmError {
  constructor(message = 'Chain mismatch.', options: BaseErrorOptions = {}) {
    super(message, options);
  }
}

export class UserRejectedRequestError extends EvmError {
  constructor(message = 'User rejected request.', options: BaseErrorOptions = {}) {
    super(message, options);
  }
}
