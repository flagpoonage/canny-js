import {
  AsyncResult,
  BadResponseError,
  FailedFetchError,
  setFetchFunction,
} from "./utils.js";

export * from "./api/index.js";

async function post<T>(
  url: string,
  requestData: unknown
): Promise<AsyncResult<T>> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      return {
        success: false,
        error: new BadResponseError<Response>(
          response.status,
          response.statusText,
          response
        ),
      };
    }

    const body = await (async (): Promise<AsyncResult<T>> => {
      try {
        const json = await response.json();
        return {
          success: true,
          value: json,
        };
      } catch (ex) {
        return {
          success: false,
          error: new BadResponseError<Response>(
            response.status,
            response.statusText,
            response
          ),
        };
      }
    })();

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

setFetchFunction(post);
