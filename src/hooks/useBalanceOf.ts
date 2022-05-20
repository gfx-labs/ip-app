import { JsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";
import { BigNumber, ethers } from "ethers";
import { provider } from "../chain/rolodex/rolodex";

const minABI = [
  // balanceOf
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
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

export const useBalanceOf = (
  wallet_address: string,
  contract_address: string
) => {
  const contract = new ethers.Contract(contract_address, minABI, provider);

  return (async function getBalance() {
    const balance = await contract.balanceOf(wallet_address);
    const decimals = await contract.decimals();
    
    const formattedBalance = Number(ethers.utils.formatUnits(balance._hex, decimals))
    
    return formattedBalance;
  })();
};

export const useERC20BalanceOf = (
  wallet_address: string,
  contract_address: string,
  signerOrProvider: JsonRpcProvider | JsonRpcSigner
) => {
  const erc20Contract = new ethers.Contract(
    contract_address,
    minABI,
    signerOrProvider
  );

  return (async function getBalance() {
    const balance = await erc20Contract.balanceOf(wallet_address);

    const formattedBalance = BigNumber.from(balance?._hex).toString();
    console.log(wallet_address, contract_address, formattedBalance);
    return formattedBalance;
  })();
};
