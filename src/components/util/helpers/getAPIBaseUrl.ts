import { VITE_ANALYTICS_URL } from '../../../config'

let SET_BASE_URL = ''

const getAPIBaseUrl = () => {
  if (SET_BASE_URL !== '') {
    return SET_BASE_URL
  }
  const envURL: string = VITE_ANALYTICS_URL()
  SET_BASE_URL = envURL
  return envURL
}

export default getAPIBaseUrl
