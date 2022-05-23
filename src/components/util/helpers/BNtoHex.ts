import { BigNumber } from "ethers";

export const BNtoHex = (BN: BigNumber) => BigNumber.from(BN._hex).toString();