import { JsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";
import { BigNumber, Contract, ethers, utils } from "ethers";
import { IERC20__factory } from "../chain/contracts/factories/genesis/wave.sol";
import { Rolodex } from "../chain/rolodex/rolodex";
import { useDecimals } from "./useTokenInfo";

export const useDepositUSDC = async (
  usdc_amount: string,
  rolodex: Rolodex,
  signer: JsonRpcSigner
) => {
  const formattedUSDCAmount = utils.parseUnits(usdc_amount, 6);
  console.log(formattedUSDCAmount, "forms");

  try {
    const getApproval = await IERC20__factory.connect(
      rolodex.addressUSDC!,
      signer
    ).approve(rolodex.addressUSDI, Number(formattedUSDCAmount));

    getApproval.wait();

    const depositAttempt = await rolodex.USDI?.connect(signer).deposit(
      Number(formattedUSDCAmount)
    );

    console.log(depositAttempt);
    const receipt = await depositAttempt?.wait();
    return receipt;
  } catch (err) {
    console.log(err);
    throw new Error("Could not deposit");
  }
};

export const useDepositCollateral = async (
  amount: string,
  collateral_address: string,
  signer: JsonRpcSigner,
  vaultAddress: string
) => {
  const formattedERC20Amount = utils.parseUnits(amount, 18);

  try {
    const transferAttempt = await IERC20__factory.connect(
      collateral_address,
      signer
    ).transfer(vaultAddress!, formattedERC20Amount);

    
    const transferReceipt = transferAttempt.wait();

    // const contract = new ethers.Contract(collateral_address, minABI, signer);
    // const formattedTransferAmount = utils.parseUnits(
    //   amount,
    //   await useDecimals(contract)
    // );

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
    inputs: [
      { name: "target", type: "address" },
      { name: "amount", type: "uint256" },
    ],
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
