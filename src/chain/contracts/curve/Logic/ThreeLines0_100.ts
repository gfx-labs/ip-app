/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../../common";

export interface ThreeLines0_100Interface extends utils.Interface {
  functions: {
    "_r0()": FunctionFragment;
    "_r1()": FunctionFragment;
    "_r2()": FunctionFragment;
    "_s1()": FunctionFragment;
    "_s2()": FunctionFragment;
    "valueAt(int256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "_r0" | "_r1" | "_r2" | "_s1" | "_s2" | "valueAt"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "_r0", values?: undefined): string;
  encodeFunctionData(functionFragment: "_r1", values?: undefined): string;
  encodeFunctionData(functionFragment: "_r2", values?: undefined): string;
  encodeFunctionData(functionFragment: "_s1", values?: undefined): string;
  encodeFunctionData(functionFragment: "_s2", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "valueAt",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "_r0", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "_r1", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "_r2", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "_s1", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "_s2", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "valueAt", data: BytesLike): Result;

  events: {};
}

export interface ThreeLines0_100 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ThreeLines0_100Interface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    _r0(overrides?: CallOverrides): Promise<[BigNumber]>;

    _r1(overrides?: CallOverrides): Promise<[BigNumber]>;

    _r2(overrides?: CallOverrides): Promise<[BigNumber]>;

    _s1(overrides?: CallOverrides): Promise<[BigNumber]>;

    _s2(overrides?: CallOverrides): Promise<[BigNumber]>;

    valueAt(
      x_value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;
  };

  _r0(overrides?: CallOverrides): Promise<BigNumber>;

  _r1(overrides?: CallOverrides): Promise<BigNumber>;

  _r2(overrides?: CallOverrides): Promise<BigNumber>;

  _s1(overrides?: CallOverrides): Promise<BigNumber>;

  _s2(overrides?: CallOverrides): Promise<BigNumber>;

  valueAt(x_value: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    _r0(overrides?: CallOverrides): Promise<BigNumber>;

    _r1(overrides?: CallOverrides): Promise<BigNumber>;

    _r2(overrides?: CallOverrides): Promise<BigNumber>;

    _s1(overrides?: CallOverrides): Promise<BigNumber>;

    _s2(overrides?: CallOverrides): Promise<BigNumber>;

    valueAt(
      x_value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    _r0(overrides?: CallOverrides): Promise<BigNumber>;

    _r1(overrides?: CallOverrides): Promise<BigNumber>;

    _r2(overrides?: CallOverrides): Promise<BigNumber>;

    _s1(overrides?: CallOverrides): Promise<BigNumber>;

    _s2(overrides?: CallOverrides): Promise<BigNumber>;

    valueAt(
      x_value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    _r0(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    _r1(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    _r2(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    _s1(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    _s2(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    valueAt(
      x_value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
