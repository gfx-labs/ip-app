import { JsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";
import { BigNumber, Contract, ethers, utils } from "ethers";
import { IERC20__factory } from "../chain/contracts/factories/genesis/wave.sol";
import { Rolodex } from "../chain/rolodex/rolodex";
import { useVaultDataContext } from "../components/libs/vault-data-provider/VaultDataProvider";
import { useWeb3Context } from "../components/libs/web3-data-provider/Web3Provider";
import {useDecimals} from "./useTokenInfo";


export const useDepositCollateral = async (
  amount: string,
  collateral_address: string,
  signer: JsonRpcSigner,
  vaultAddress: string,
  currentAccount: string,
) => {

  const formattedERC20Amount = utils.parseUnits(amount, 18);

  try {
    const transferAttempt = await IERC20__factory.connect(
      collateral_address,
      signer
    ).transfer(vaultAddress!, formattedERC20Amount);

  const contract = new ethers.Contract(collateral_address, minABI, signer);
  const formattedTransferAmount = utils.parseUnits(amount, await useDecimals(contract))
  const fee = await signer.getFeeData()
  console.log(fee, "sending erc20 to vault");
  const transferReceipt = transferAttempt.wait();

  console.log(transferReceipt);

  return transferReceipt;
  } catch (err) {
    console.log(err);
    throw new Error("Could not deposit");
  }
};

export const useWithdrawCollateral = async (
  amount: string,
  collateral_address: string,
  signer: JsonRpcSigner
) => {
  const { vaultAddress } = useVaultDataContext();
  const { currentAccount } = useWeb3Context();

  const formattedERC20Amount = utils.parseUnits(amount, 18);

  try {
    const transferAttempt = await IERC20__factory.connect(
      collateral_address,
      signer
    ).transferFrom(currentAccount, vaultAddress!, formattedERC20Amount);

    const transferReceipt = transferAttempt.wait();

    console.log(transferReceipt);

    return transferReceipt;
  } catch (err) {
    console.log(err);
    throw new Error("Could not deposit");
  }
};


const minABI = [
  // transfer
  {
    constant: true,
    inputs: [{ name: "target", type: "address" }, {name:"amount", type:"uint256"}],
    name: "transfer",
    outputs: [],
    type: "function",
  },
  // decimals
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [
      {
        name: "",
        type: "uint8",
      },
    ],
    payable: false,
    type: "function",
  },
];


