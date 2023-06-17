import http from "http";
import { got } from "got-cjs";
import { pipeline } from "node:stream/promises";
import { getCannyApiOrigin } from "../env";
import path from "path";
import { PassThrough, Writable } from "stream";

export interface ProxyResponse {
  status: number;
  headers: Record<string, string>;
  body: unknown;
}

export function createCannyProxyRequestHandler(options: CannyProxyOptions) {
  return async function cannyProxyRequestHandler(
    request: http.IncomingMessage,
    response: http.ServerResponse
  ) {
    if (request.method === "OPTIONS") {
      response.setHeader("Access-Control-Allow-Methods", "OPTIONS, POST, GET");
      response.setHeader("Access-Control-Allow-Origin", "*");
      response.setHeader("Access-Control-Allow-Headers", "*");
      response.statusCode = 200;
      return response.end();
    }

    if (
      !request.url ||
      (options.apiPath && !request.url.startsWith(options.apiPath))
    ) {
      response.statusCode = 404;
      return response.end();
    }

    const api_specifier = options.apiPath
      ? request.url.split(options.apiPath)[1]
      : request.url;

    try {
      const origin = options.cannyApiOrigin ?? getCannyApiOrigin();

      await pipeline(
        got.stream.post(path.join(origin, api_specifier), {
          headers: {
            "Content-Type": "application/json",
            "Content-Length": request.headers["content-length"],
          },
          body: request,
        }),
        response
      );
    } catch (ex) {
      console.error(ex);
      response.statusCode = 500;
      response.write("Error");
      response.end();
    }
  };
}

interface CannyProxyOptions {
  apiPath?: string;
  cannyApiOrigin?: string;
  port?: number;
  host?: string;
}

export function createCannyProxy(options: CannyProxyOptions = {}) {
  const server = new http.Server(createCannyProxyRequestHandler(options));
  server.listen(options.port ?? 80, options.host ?? "0.0.0.0");
  return server;
}
