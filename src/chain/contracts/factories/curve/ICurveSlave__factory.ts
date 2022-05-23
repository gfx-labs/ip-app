/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  ICurveSlave,
  ICurveSlaveInterface,
} from "../../curve/ICurveSlave";

const _abi = [
  {
    inputs: [
      {
        internalType: "int256",
        name: "x_value",
        type: "int256",
      },
    ],
    name: "valueAt",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class ICurveSlave__factory {
  static readonly abi = _abi;
  static createInterface(): ICurveSlaveInterface {
    return new utils.Interface(_abi) as ICurveSlaveInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ICurveSlave {
    return new Contract(address, _abi, signerOrProvider) as ICurveSlave;
  }
}
