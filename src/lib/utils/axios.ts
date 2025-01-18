import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { HttpRequestError, NetworkError, NextRequestError } from '../errors/request';

export async function nextRequest<T = unknown>(params: AxiosRequestConfig): Promise<T> {
  try {
    const response = await axios.request(params);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const response = error.response;
      if (response != null) {
        const message: string | undefined = response.data?.message;
        const responseErrorName = response.data?.name;
        const responseErrorData = response.data?.data;

        if (message != null && responseErrorName != null) {
          throw new NextRequestError(message, {
            data: { status: response.status, responseErrorName, responseErrorData },
            cause: error,
          });
        }
        throw new HttpRequestError(message ?? error.message, {
          data: { status: response.status },
          cause: error,
        });
      }
      throw new NetworkError(undefined, { cause: error });
    }
    throw error;
  }
}
