import { BaseError, BaseErrorOptions } from './base';

export class RequestError extends BaseError {
  name = 'RequestError';

  constructor(message = 'Request error.', options: BaseErrorOptions = {}) {
    super(message, options);
  }
}

export class TimeoutError extends RequestError {
  name = 'TimeoutError';

  constructor(message = 'Request timeout.', options: BaseErrorOptions = {}) {
    super(message, options);
  }
}

export type HttpRequestErrorData = {
  status: number;
  json?: unknown;
};

export type HttpRequestErrorOptions = BaseErrorOptions & {
  data: HttpRequestErrorData;
};

export class HttpRequestError extends RequestError {
  name = 'HttpRequestError';
  status: number;
  json: unknown;

  constructor(message: string | undefined, options: HttpRequestErrorOptions) {
    super(message ?? `Request failed with status code ${options.data.status}.`, options);
    this.status = options.data.status;
    this.json = options.data.json;
  }
}

export type NextRequestErrorData = {
  status: number;
  responseErrorName: string;
  responseErrorData: unknown;
};

export type NextRequestErrorOptions = BaseErrorOptions & {
  data: NextRequestErrorData;
};

export class NextRequestError extends RequestError {
  name = 'NextRequestError';
  status: number;
  responseErrorName: string;
  responseErrorData: unknown;

  constructor(message = 'Next request error.', options: NextRequestErrorOptions) {
    super(message, options);
    this.status = options.data.status;
    this.responseErrorName = options.data.responseErrorName;
    this.responseErrorData = options.data.responseErrorData;
  }
}
