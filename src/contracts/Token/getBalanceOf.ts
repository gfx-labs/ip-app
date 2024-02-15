import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
import getDecimals from './getDecimals'
import { ERC20Detailed__factory } from '../../contract_abis'
import { BigNumber, utils } from 'ethers'
import { BN } from '../../easy/bn'
import { Univ3CollateralToken__factory } from '../../contract_abis/factories/pools/Univ3CollateralToken__factory'
import { INonfungiblePositionManager__factory } from '../../contract_abis/factories/_external/uniswap/INonfungiblePositionManager__factory'
import { NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS } from '../../constants'

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
  const formatted = utils.formatUnits(balance, decimals)

  return {
    str: formatted,
    num: Number(formatted),
    bn: balance,
  }
}

export const getBalanceOfPosition = async (
  vault_address: string,
  contract_address: string,
  providerOrSigner: JsonRpcProvider | JsonRpcSigner
): Promise<string> => {
  const contract = Univ3CollateralToken__factory.connect(contract_address, providerOrSigner)
  const balance = await contract.balanceOf(vault_address)
  const decimals = await getDecimals(contract, providerOrSigner)
  const formattedBalance = utils.formatUnits(balance, decimals)
  return formattedBalance
}

export const getNumWalletPositions = async (
  wallet_address: string,
  signerOrProvider: JsonRpcProvider | JsonRpcSigner
): Promise<string> => {
  const contract = INonfungiblePositionManager__factory.connect(NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS,
    signerOrProvider)
  const numPositions = await contract.balanceOf(wallet_address)
  return numPositions.toString()
}

export const getVaultPositions = async (
  wrapped_addr: string,
  wallet_addr: string,
  signerOrProvider: JsonRpcProvider | JsonRpcSigner
) => {
  const contract = Univ3CollateralToken__factory.connect(wrapped_addr, signerOrProvider)
  const tx = await contract.depositedPositions(wallet_addr)
  let out = []
  for (let i = 0; i < tx.length; i++) {
    out[i] = tx[i].toString()
  }
  return out
}