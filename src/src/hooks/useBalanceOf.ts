import { ethers } from "ethers";
import { provider } from "../chain/rolodex/rolodex";
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
  contract_address: string
) => {
  const contract = new ethers.Contract(contract_address, minABI, provider);

  return (async function getBalance() {
    const balance = await contract.balanceOf(wallet_address);
    const decimals = await useDecimals(contract);

    const formattedBalance = useFormatWithDecimals(balance, decimals);

    return formattedBalance;
  })();
};
