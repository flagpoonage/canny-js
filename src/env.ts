const CannyEnv = {
  apiOrigin: "https://canny.io/api/v1",
  apiKey: "",
};

export function getCannyApiOrigin() {
  return CannyEnv.apiOrigin;
}

export function setCannyApiOrigin(origin: string) {
  CannyEnv.apiOrigin = origin;
  return CannyEnv.apiOrigin;
}

export function getCannyApiKey() {
  return CannyEnv.apiKey;
}

export function setCannyApiKey(apiKey: string) {
  CannyEnv.apiKey = apiKey;
  return CannyEnv.apiKey;
}
