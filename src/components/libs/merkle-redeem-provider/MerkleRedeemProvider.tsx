import { BigNumber } from 'ethers'
import { createContext, useContext, useEffect, useState } from 'react'
import createClaimOf, { Claim } from '../../../contracts/MerkleRedeem/createClaim'
import getSpecificWeekClaim  from '../../../contracts/MerkleRedeem/getSpecificWeekClaim'
import getClaimStatusOf from '../../../contracts/MerkleRedeem/getClaimStatus'
import { BN } from '../../../easy/bn'
import { DEFAULT_ADDRESS, useWeb3Context } from '../web3-data-provider/Web3Provider'
import { SPECIFIC_WEEKS } from '../../../contracts/MerkleRedeem/whitelists'

export type MerkleRedeemContextType = {
  claims: Claim[]
  claimStatus: number[]
  claimAmount: BigNumber
  loading: boolean
}

export const MerkleRedeemContext = createContext<MerkleRedeemContextType>({} as MerkleRedeemContextType)

export const MerkleRedeemContextProvider = ({ children }: { children: React.ReactElement }) => {
  const { currentAccount, chainId, currentSigner } = useWeb3Context()
  const [claimStatus, setClaimStatus] = useState<number[]>([])
  const [claimAmount, setClaimAmount] = useState(BN('0'))
  const [claims, setClaims] = useState<Claim[]>([])
  const [loading, setLoading] = useState(true)


  let lastAccount = DEFAULT_ADDRESS
  useEffect(() => {
    if(lastAccount != currentAccount){
      setLoading(true)
    }
    if (currentSigner && currentAccount) {
      getClaimStatusOf(currentAccount, currentSigner!).then((claimStatus) => {
        setClaimStatus(claimStatus)
        const claims = createClaimOf(currentAccount, claimStatus)
        Promise.all(SPECIFIC_WEEKS.map(async (week) => {
          return getSpecificWeekClaim(currentAccount, currentSigner, week).then((claimRes) => {
            if (claimRes) {
              claims.push(claimRes)
            }
          })
        })).then(()=>{
          let iptToClaim = BN(0)
          claims.forEach((x)=>{
              iptToClaim = iptToClaim.add(x.balance)
          })
          setClaims(claims)
          setClaimAmount(iptToClaim)
          setLoading(false)
        })
      }).catch((e)=>{
        console.log(`could not find claims for ${currentAccount}`, e)
      })
    }
  }, [chainId, currentAccount, currentSigner])

  return <MerkleRedeemContext.Provider value={{ loading, claimStatus, claims, claimAmount }}>{children}</MerkleRedeemContext.Provider>
}

export const useMerkleRedeemContext = () => {
  const context = useContext(MerkleRedeemContext)

  if (context === undefined) {
    throw new Error('useModalContext must be used within a ModalProvider')
  }

  return context
}
