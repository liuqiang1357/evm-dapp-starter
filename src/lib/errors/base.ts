export type BaseErrorOptions = {
  cause?: Error;
  data?: unknown;
  external?: boolean;
};

export abstract class BaseError extends Error {
  cause: Error | null;
  data: unknown;
  external: boolean;
  handled = false;

  constructor(message: string, options: BaseErrorOptions = {}) {
    super(message);
    this.cause = options.cause ?? null;
    this.data = options.data;
    this.external = options.external ?? false;
  }

  walk(fn: (error: Error) => boolean): Error | null {
    if (fn(this)) {
      return this;
    }
    if (this.cause instanceof BaseError) {
      return this.cause.walk(fn);
    }
    if (this.cause != null && fn(this.cause)) {
      return this.cause;
    }
    return null;
  }
}
