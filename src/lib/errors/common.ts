import { BaseError, BaseErrorOptions } from './base';

export class InternalError extends BaseError {
  constructor(message = 'Internal error.', options: BaseErrorOptions = {}) {
    super(message, options);
  }
}

export class ExternalError extends BaseError {
  constructor(message = 'External error.', options: BaseErrorOptions = {}) {
    super(message, { ...options, external: options.external ?? true });
  }
}
