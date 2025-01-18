import { BaseError, BaseErrorOptions } from './base';

export class EvmError extends BaseError {
  name = 'EvmError';

  constructor(message = 'Evm error.', options: BaseErrorOptions = {}) {
    super(message, options);
  }
}

export class ConnectorNotConnectedError extends EvmError {
  name = 'ConnectorNotConnectedError';

  constructor(message = 'Wallet not connected.', options: BaseErrorOptions = {}) {
    super(message, { ...options, needFix: options.needFix ?? false });
  }
}

export class ChainMismatchError extends EvmError {
  name = 'ChainMismatchError';

  constructor(
    message = 'The current chain of the wallet does not match the requesting one, please switch in the wallet.',
    options: BaseErrorOptions = {},
  ) {
    super(message, { ...options, needFix: options.needFix ?? false });
  }
}

export class UserRejectedRequestError extends EvmError {
  name = 'UserRejectedRequestError';

  constructor(message = 'User rejected request.', options: BaseErrorOptions = {}) {
    super(message, { ...options, needFix: options.needFix ?? false });
  }
}
