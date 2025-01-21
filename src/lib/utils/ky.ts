import ky, { HTTPError, TimeoutError as KyTimeoutError, Options } from 'ky';
import { HttpRequestError, NextRequestError, TimeoutError } from '../errors/request';

export type HttpRequestParams = Options & {
  url?: string;
};

export async function httpRequest<T = unknown>(params: HttpRequestParams): Promise<T> {
  try {
    const { url, ...rest } = params;
    const response = await ky(url ?? '', { retry: 0, timeout: 30_000, ...rest });
    return response.json();
  } catch (error) {
    if (error instanceof HTTPError) {
      let json = null;
      try {
        json = await error.response.json();
      } catch {
        // ignore
      }
      throw new HttpRequestError(undefined, {
        data: { status: error.response.status, json },
        cause: error,
      });
    }
    if (error instanceof KyTimeoutError) {
      throw new TimeoutError(undefined, { cause: error });
    }
    throw error;
  }
}

export async function nextRequest<T = unknown>(params: HttpRequestParams): Promise<T> {
  try {
    return await httpRequest<T>({ prefixUrl: '/api', ...params });
  } catch (error) {
    if (error instanceof HttpRequestError) {
      const json = error.json as { name: string; message: string; data: unknown } | null;
      if (json != null) {
        throw new NextRequestError(json.message, {
          data: {
            status: error.status,
            responseErrorName: json.name,
            responseErrorData: json.data,
          },
          cause: error,
        });
      }
    }
    throw error;
  }
}
