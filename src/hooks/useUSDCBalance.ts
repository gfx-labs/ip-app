import { BigNumber, ethers } from "ethers";
import { Rolodex, provider } from "../chain/rolodex/rolodex";

const minABI = [
  // balanceOf
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
];

export const useUSDCBalanceOf = (rolodex: Rolodex, usdc_address: string) => {
  const usdcContract = new ethers.Contract(
    usdc_address,
    minABI,
    provider
  );

  return (async function getBalance() {
    const balance = await usdcContract.balanceOf(rolodex.addressUSDI);

    const formattedBalance = BigNumber.from(balance?._hex).toString();

    return formattedBalance;
  })();
};
