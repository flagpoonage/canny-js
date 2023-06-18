import got, { HTTPError, Response } from "got-cjs";
import {
  AsyncResult,
  BadResponseError,
  safeJsonResponseBody,
  FailedFetchError,
  setFetchFunction,
} from "./utils.js";

async function post<T>(
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
        error: new BadResponseError<Response>(
          response.statusCode,
          response.statusMessage,
          response
        ),
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

setFetchFunction(post);

export * from "./api/index.js";
export * from "./types/index.js";
