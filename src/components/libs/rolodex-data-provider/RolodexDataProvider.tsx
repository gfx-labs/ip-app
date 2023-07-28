import {createContext, useState, useContext, useEffect, useRef} from 'react'
import { NewRolodex, Rolodex } from '../../../chain/rolodex/rolodex'
import { Logp } from '../../../logger'
import { useWeb3Context } from '../web3-data-provider/Web3Provider'

export const RolodexContentContext = createContext({} as Rolodex | null)

export const RolodexContentProvider = ({ children }: { children: React.ReactElement }) => {
  const ctx = useWeb3Context()
  const currentSignerOrProvider = useRef(ctx.signerOrProvider)
  const currentChainId = useRef(ctx.chainId)
  const [rolodex, setRolodex] = useState<Rolodex | null>(null)

  useEffect(() => {
    setRolodex(null)
    currentSignerOrProvider.current = ctx.signerOrProvider
    currentChainId.current = ctx.chainId
    NewRolodex(ctx).then((rolodex) => {
      if (currentSignerOrProvider.current === ctx.signerOrProvider && currentChainId.current === ctx.chainId) {
        setRolodex(rolodex)
      }
    }).catch(Logp('failed setting up rolodex'))
  }, [ctx.signerOrProvider, ctx.chainId])

  return <RolodexContentContext.Provider value={rolodex}>{children}</RolodexContentContext.Provider>
}

export const useRolodexContext = () => {
  const context = useContext(RolodexContentContext)

  if (context === undefined) {
    throw new Error('useRolodexContext must be used within a RolodexProvider')
  }

  return context
}
