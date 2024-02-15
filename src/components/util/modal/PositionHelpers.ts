import { JsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers"
import { V3PositionValuator__factory } from "../../../contract_abis/factories/pools/V3PositionValuator__factory"
import { INonfungiblePositionManager__factory } from "../../../contract_abis/factories/_external/uniswap/INonfungiblePositionManager__factory"
import { Univ3CollateralToken__factory } from "../../../contract_abis/factories/pools/Univ3CollateralToken__factory"
import { NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS, V3_POSITION_VALUATOR_ADDRESS } from "../../../constants"

export const isValidPosition = async (
  tokenId: string,
  signerOrProvider: JsonRpcProvider | JsonRpcSigner
) => {
  try {
    const contract = V3PositionValuator__factory.connect(V3_POSITION_VALUATOR_ADDRESS, signerOrProvider)
    const result = await contract.getValue(Number(tokenId))
    if (result == undefined || result.isZero()) {
      return false
    }
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}

export const approvePosition = async (
  wrapped_addr: string,
  tokenId: string,
  signer: JsonRpcSigner
) => {
  const contract = INonfungiblePositionManager__factory.connect(NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS, signer)
  const tx = await contract.approve(wrapped_addr, tokenId)
  return tx
}

export const depositPosition = async (
  wrapped_addr: string,
  vault_id: string,
  tokenId: string,
  signer: JsonRpcSigner
) => {
  const contract = Univ3CollateralToken__factory.connect(wrapped_addr, signer)
  const tx = await contract.deposit(tokenId, vault_id)
  return tx
}

// -1 means doesnt exist
export const getIdxFromId = async (
  wrapped_addr: string,
  wallet_addr: string,
  tokenId: string,
  signerOrProvider: JsonRpcProvider | JsonRpcSigner
) => {
  const contract = Univ3CollateralToken__factory.connect(wrapped_addr, signerOrProvider)
  const tx = await contract.depositedPositions(wallet_addr)
  for (let i = 0; i < tx.length; i++) {
    if (tx[i].toString() == tokenId) {
      return i
    }
  }
  return -1
}