import { BaseError, BaseErrorOptions } from './base';

export class RequestError extends BaseError {
  name = 'RequestError';

  constructor(message = 'Request error.', options: BaseErrorOptions = {}) {
    super(message, options);
  }
}

export class NetworkError extends RequestError {
  name = 'NetworkError';

  constructor(message = 'Network error.', options: BaseErrorOptions = {}) {
    super(message, options);
  }
}

export type HttpRequestErrorData = {
  status: number;
};

export type HttpRequestErrorOptions = BaseErrorOptions & {
  data: HttpRequestErrorData;
};

export class HttpRequestError extends RequestError {
  name = 'HttpRequestError';
  status: number;

  constructor(message = 'Http request error.', options: HttpRequestErrorOptions) {
    super(message, options);
    this.status = options.data.status;
  }
}

export type NextRequestErrorData = HttpRequestErrorData & {
  responseErrorName: string;
  responseErrorData: unknown;
};

export type NextRequestErrorOptions = HttpRequestErrorOptions & {
  data: NextRequestErrorData;
};

export class NextRequestError extends HttpRequestError {
  name = 'NextRequestError';
  responseErrorName: string;
  responseErrorData: unknown;

  constructor(message = 'Next request error.', options: NextRequestErrorOptions) {
    super(message, options);
    this.responseErrorName = options.data.responseErrorName;
    this.responseErrorData = options.data.responseErrorData;
  }
}
