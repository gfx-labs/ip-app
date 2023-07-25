import { VITE_ANALYTICS_URL } from '../../../config'
import { useWeb3Context } from '../../libs/web3-data-provider/Web3Provider'
import { Chains } from '../../../chain/chains'
let SET_BASE_URL = ''

const getAPIBaseUrl = () => {
  const { chainId } = useWeb3Context()

  // if (SET_BASE_URL !== '') {
  //   return SET_BASE_URL
  // }
  
  const envURL: string = VITE_ANALYTICS_URL(Chains.getInfo(chainId).analytics)
  if (envURL == SET_BASE_URL) {
    return SET_BASE_URL
  }
  SET_BASE_URL = envURL
  return envURL
}

export default getAPIBaseUrl
