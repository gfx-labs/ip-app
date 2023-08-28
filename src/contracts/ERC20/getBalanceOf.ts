import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
import getDecimals from '../misc/getDecimals'
import { useFormatBNtoPreciseStringAndNumber } from '../../hooks/useFormatBNWithDecimals'
import { ERC20Detailed__factory } from '../../chain/contracts'
import { BigNumber } from 'ethers'
import { BN } from '../../easy/bn'

export const getBalanceOf = async (
  wallet_address: string,
  contract_address: string,
  providerOrSigner: JsonRpcProvider | JsonRpcSigner
): Promise<{ num: number; str: string; bn: BigNumber }> => {
  if(wallet_address == undefined || wallet_address == "" ) {
    return {
      num: 0,
      str: "0",
      bn: BN(0),
    }
  }
  const contract = ERC20Detailed__factory.connect(
    contract_address,
    providerOrSigner
  )
  const balance = await contract.balanceOf(wallet_address)
  const decimals = await getDecimals(contract, providerOrSigner)
  const formattedBalance = useFormatBNtoPreciseStringAndNumber(
    balance,
    decimals
  )
  return formattedBalance
}
