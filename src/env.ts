const CannyEnv = {
  apiOrigin: null as string | null,
  apiKey: null as string | null,
};

export function getCannyApiOrigin() {
  return (
    CannyEnv.apiOrigin ??
    process.env.CANNY_API_ORIGIN ??
    "https://canny.io/api/v1"
  );
}

export function setCannyApiOrigin(origin: string) {
  CannyEnv.apiOrigin = origin;
  return CannyEnv.apiOrigin;
}

export function getCannyApiKey() {
  return CannyEnv.apiKey ?? process.env.CANNY_API_KEY ?? "";
}

export function setCannyApiKey(apiKey: string) {
  CannyEnv.apiKey = apiKey;
  return CannyEnv.apiKey;
}
