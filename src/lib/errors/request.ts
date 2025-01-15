import { BaseError, BaseErrorOptions } from './base';

export abstract class RequestError extends BaseError {
  constructor(message: string, options: BaseErrorOptions = {}) {
    super(message, options);
  }
}

export class UnknownRequestError extends RequestError {
  constructor(message = 'Unknown request error.', options: BaseErrorOptions = {}) {
    super(message, options);
  }
}

export class BadRequestError extends RequestError {
  constructor(message = 'Bad request.', options: BaseErrorOptions = {}) {
    super(message, options);
  }
}

export class UnauthorizedError extends RequestError {
  constructor(
    message = 'The session has timed out, please sign in again.',
    options: BaseErrorOptions = {},
  ) {
    super(message, options);
  }
}

export class InternalServiceError extends RequestError {
  constructor(message = 'Internal service error.', options: BaseErrorOptions = {}) {
    super(message, options);
  }
}

export class NetworkError extends RequestError {
  constructor(message = 'Network error.', options: BaseErrorOptions = {}) {
    super(message, options);
  }
}
