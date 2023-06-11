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

export class BadResponseError extends Error {
  private _response: Response;
  constructor(response: Response) {
    super(`[${response.status}] - ${response.statusText}`);
    this._response = response;
  }

  get response() {
    return this._response;
  }
}

export async function safeJsonResponseBody(
  response: Response
): Promise<AsyncResult<unknown>> {
  try {
    const body = await response.json();
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
    const response = await fetch(url, {
      body: JSON.stringify(requestData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return {
        success: false,
        error: new BadResponseError(response),
      };
    }

    const body = await safeJsonResponseBody(response);

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
