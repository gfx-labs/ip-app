import {JsonRpcProvider} from "@ethersproject/providers";
import { ethers } from "ethers";
import { useDecimals, useFormatWithDecimals } from "./useTokenInfo";

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
  contract_address: string,
  provider: JsonRpcProvider,
) => {
  return getBalance(contract_address, wallet_address, provider)
};

export const getBalance  = async (
  contract_address: string,
  target: string,
  provider: JsonRpcProvider,
):Promise<number>=>{
  const contract = new ethers.Contract(contract_address, minABI, provider);
  const balance = await contract.balanceOf(target);
  const decimals = await useDecimals(contract, provider);

  const formattedBalance = useFormatWithDecimals(balance, decimals);

  return Number(formattedBalance.toFixed(8));
}
