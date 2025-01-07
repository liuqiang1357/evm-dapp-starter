export type BaseErrorOptions = {
  cause?: Error;
  data?: unknown;
  expose?: boolean;
};

export class BaseError extends Error {
  cause: Error | null;
  data: unknown;
  expose: boolean;

  constructor(message: string, options: BaseErrorOptions = {}) {
    super(message);
    this.cause = options.cause ?? null;
    this.data = options.data;
    this.expose = options.expose ?? true;
  }

  printTraceStack(): void {
    console.error(this);
    for (
      let error = this.cause;
      error != null;
      error = error instanceof BaseError ? error.cause : null
    ) {
      console.error('Caused by:', error);
    }
  }
}
