import { BigNumber } from 'ethers'
import { createContext, useContext, useEffect, useState } from 'react'
import createClaimOf, {
  Claim,
} from '../../../contracts/MerkleRedeem/createClaim'
import getClaimStatusOf from '../../../contracts/MerkleRedeem/getClaimStatus'
import { BN } from '../../../easy/bn'
import { useWeb3Context } from '../web3-data-provider/Web3Provider'

export type MerkleRedeemContextType = {
  claims: Claim[]
  claimStatus: boolean[]
  claimAmount: BigNumber
}

export const MerkleRedeemContext = createContext<MerkleRedeemContextType>(
  {} as MerkleRedeemContextType
)

export const MerkleRedeemContextProvider = ({
  children,
}: {
  children: React.ReactElement
}) => {
  const { currentAccount, signerOrProvider, chainId, currentSigner } =
    useWeb3Context()
  const [claimStatus, setClaimStatus] = useState([true])
  const [claimAmount, setClaimAmount] = useState(BN('0'))
  const [claims, setClaims] = useState<Claim[]>([])

  useEffect(() => {
    if (currentSigner && currentAccount) {
      console.log('getting claim status 31', currentAccount, currentSigner)
      getClaimStatusOf(currentAccount, currentSigner!).then((claimStatus) => {
        setClaimStatus(claimStatus)
        console.log(claimStatus, 'claim status')
        const claims = createClaimOf(currentAccount, claimStatus)
        console.log(claims, 'claims')
        setClaims(claims)

        const iptToClaim = claims.reduce((iptToClaim, claim) => {
          return iptToClaim.add(claim.balance)
        }, BN(0))
        console.log(iptToClaim, 'ipt to claim')
        setClaimAmount(iptToClaim)
      })
    }
  }, [chainId, currentAccount, currentSigner])

  return (
    <MerkleRedeemContext.Provider value={{ claimStatus, claims, claimAmount }}>
      {children}
    </MerkleRedeemContext.Provider>
  )
}

export const useMerkleRedeemContext = () => {
  const context = useContext(MerkleRedeemContext)

  if (context === undefined) {
    throw new Error('useModalContext must be used within a ModalProvider')
  }

  return context
}
