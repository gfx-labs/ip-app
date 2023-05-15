
export const VITE_ANALYTICS_URL = () => {
  const u = import.meta.env.VITE_ANALYTICS_URL
  const DEFAULT_ANALYTICS_URL = 'https://analytics-api.gfx.xyz'
  return  u ? u : DEFAULT_ANALYTICS_URL
}

export const GOOGLE_ANALYTICS_TAG = () => {
  const u = import.meta.env.GOOGLE_ANALYTICS_TAG
  return  u ? u : ""
}
