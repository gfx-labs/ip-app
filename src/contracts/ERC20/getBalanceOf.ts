import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
import getDecimals from '../misc/getDecimals'
import { useFormatBNtoPreciseStringAndNumber } from '../../hooks/useFormatBNWithDecimals'
import { ERC20Detailed__factory } from '../../chain/contracts'

export const getBalanceOf = async (
  wallet_address: string,
  contract_address: string,
  providerOrSigner: JsonRpcProvider | JsonRpcSigner
): Promise<{ num: number; str: string }> => {
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
