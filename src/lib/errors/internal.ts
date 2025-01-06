import { BaseError, BaseErrorOptions } from './base';

export class InternalError extends BaseError {
  constructor(message = 'Internal error.', options: BaseErrorOptions = {}) {
    super(message, options);
    this.expose = options.expose ?? false;
  }
}

export class CancelledError extends InternalError {
  constructor(message = 'Cancelled.', options: BaseErrorOptions = {}) {
    super(message, options);
  }
}
