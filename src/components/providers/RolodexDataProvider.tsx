import {createContext, useState, useContext, useEffect, useRef} from 'react'
import { NewRolodex, Rolodex } from '../../chain/rolodex'
import { Logp } from '../../logger'
import { useWeb3Context } from './Web3Provider'
import { Chains } from '../../chain/chains'

export const RolodexContentContext = createContext({} as Rolodex | null)

export const RolodexContentProvider = ({ children }: { children: React.ReactElement }) => {
  const {provider, chainId} = useWeb3Context()
  const [rolodex, setRolodex] = useState<Rolodex | null>(null)

  useEffect(() => {
    setRolodex(null)
    if (provider && Chains[chainId]) {
      NewRolodex(provider, chainId).then((rolodex) => {
        setRolodex(rolodex)
      }).catch(Logp('failed setting up rolodex'))
    }
  }, [provider, chainId])

  return <RolodexContentContext.Provider value={rolodex}>{children}</RolodexContentContext.Provider>
}

export const useRolodexContext = () => {
  const context = useContext(RolodexContentContext)

  if (context === undefined) {
    throw new Error('useRolodexContext must be used within a RolodexProvider')
  }

  return context
}
