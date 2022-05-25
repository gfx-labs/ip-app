import React from "react";
import { BigNumber, Contract, utils } from "ethers";
import { provider } from "../chain/rolodex/rolodex";

const minABI = [
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

export const useDecimals = async (
  contractAddressOrContract: string | Contract
): Promise<number> => {
  if (typeof contractAddressOrContract === "string") {
    const contract = new Contract(contractAddressOrContract, minABI, provider);

    const decimals = await contract.decimals();

    return decimals;
  }

  const decimals = await contractAddressOrContract.decimals();

  return decimals;
};

export const useBalanceOf = (
  wallet_address: string,
  contract_address: string
) => {
  const contract = new Contract(contract_address, minABI, provider);

  return (async function getBalance() {
    const balance = await contract.balanceOf(wallet_address);
    const decimals = await useDecimals(contract);

    const formattedBalance = useFormatWithDecimals(balance, decimals)

    return formattedBalance;
  })();
};

export const useFormatWithDecimals = (amount: BigNumber, decimals: number) =>
  Number(utils.formatUnits(amount._hex, decimals));