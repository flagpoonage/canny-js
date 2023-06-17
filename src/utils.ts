import { getCannyApiKey, getCannyApiOrigin } from "./env.js";

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

export class BadResponseError<T> extends Error {
  private _response: T;
  constructor(code: number, message: string | undefined, response: T) {
    super(`[${code}] - ${message}`);
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

export type FetchFunction = <T>(p: string, d: Record<string, unknown>) => Promise<AsyncResult<T>>;

const fetch = {
  fn: null as null | FetchFunction
}; 

export function setFetchFunction (fn: FetchFunction) {
  fetch.fn = fn;
}

export function cannyRequest<T>(
  path: string,
  data: Record<string, unknown> = {}
) {
  const request_data = { ...data, apiKey: getCannyApiKey() };
  return fetch.fn?.<T>(`${getCannyApiOrigin()}${path}`, request_data);
}
