import createCache from "@emotion/cache";

export function createEmotionCache() {
  return createCache({ key: "css" });
}

// https://mui.com/guides/server-rendering/#handling-the-request
// 
