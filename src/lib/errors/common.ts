import { BaseError, BaseErrorOptions } from './base';

export class InternalError extends BaseError {
  name = 'InternalError';

  constructor(message = 'Internal error.', options: BaseErrorOptions = {}) {
    super(message, options);
  }
}
