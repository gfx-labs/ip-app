import { JsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";
import { BigNumber, Contract, utils } from "ethers";
import { IERC20__factory } from "../chain/contracts/factories/genesis/wave.sol";
import { Rolodex } from "../chain/rolodex/rolodex";
import { useVaultDataContext } from "../components/libs/vault-data-provider/VaultDataProvider";
import { useWeb3Context } from "../components/libs/web3-data-provider/Web3Provider";

export const useBorrow = async (
  vaultID: number,
  amount: string,
  rolodex: Rolodex,
  signer: JsonRpcSigner
) => {

  const formattedERC20Amount = utils.parseUnits(amount, 18);

  try {
   await rolodex.VC?.connect(signer).borrowUsdi(
      Number(vaultID),
      formattedERC20Amount
    )

  } catch (err) {
    console.log(err);
    throw new Error("Could not borrow");
  }
};

export const useRepay = async (
  amount: string,
  rolodex: Rolodex
) => {
  const { vaultID } = useVaultDataContext();

  const formattedERC20Amount = utils.parseUnits(amount, 18);

  try {
    await rolodex.VC?.repayUSDi(
      Number(vaultID),
      formattedERC20Amount
    )

  } catch (err) {
    console.log(err);
    throw new Error("Could not repay");
  }
};

