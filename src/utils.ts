import { getCannyApiKey, getCannyApiOrigin } from "./env.js";
import { got, HTTPError, Response } from "got-cjs";

type AsyncSuccess<T> = {
  success: true;
  value: T;
};

type AsyncError = {
  success: false;
  error: Error;
};

export type AsyncResult<T> = AsyncError | AsyncSuccess<T>;

export class FailedFetchError extends Error {
  private _error: unknown;
  constructor(error: unknown) {
    super("Failed to fetch");
    this._error = error;
  }

  get error() {
    return this._error;
  }
}

export class BadResponseError extends Error {
  private _response: Response;
  constructor(response: Response) {
    super(`[${response.statusCode}] - ${response.statusMessage}`);
    this._response = response;
  }

  get response() {
    return this._response;
  }
}

export function safeJsonResponseBody(response: string): AsyncResult<unknown> {
  try {
    const body = JSON.parse(response);
    return {
      success: true,
      value: body,
    };
  } catch (ex) {
    return {
      success: false,
      error: new Error("Invalid JSON body"),
    };
  }
}

export async function post<T>(
  url: string,
  requestData: unknown
): Promise<AsyncResult<T>> {
  try {
    const response = await got.post(url, {
      json: requestData,
    });

    if (!response.ok) {
      return {
        success: false,
        error: new BadResponseError(response),
      };
    }

    const body = safeJsonResponseBody(response.body);

    if (!body.success) {
      return {
        success: false,
        error: body.error,
      };
    }

    return {
      success: true,
      value: body.value as T,
    };
  } catch (ex) {
    if (ex instanceof HTTPError) {
      return {
        success: false,
        error: ex,
      };
    }

    return {
      success: false,
      error: new FailedFetchError(ex),
    };
  }
}

export function cannyRequest<T>(
  path: string,
  data: Record<string, unknown> = {}
) {
  const request_data = { ...data, apiKey: getCannyApiKey() };
  return post<T>(`${getCannyApiOrigin()}${path}`, request_data);
}
