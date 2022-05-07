/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
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

export interface ChainlinkOracleRelayInterface extends utils.Interface {
  functions: {
    "_divide()": FunctionFragment;
    "_feedAddress()": FunctionFragment;
    "_multiply()": FunctionFragment;
    "currentValue()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "_divide"
      | "_feedAddress"
      | "_multiply"
      | "currentValue"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "_divide", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "_feedAddress",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "_multiply", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "currentValue",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "_divide", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "_feedAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "_multiply", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "currentValue",
    data: BytesLike
  ): Result;

  events: {};
}

export interface ChainlinkOracleRelay extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ChainlinkOracleRelayInterface;

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
    _divide(overrides?: CallOverrides): Promise<[BigNumber]>;

    _feedAddress(overrides?: CallOverrides): Promise<[string]>;

    _multiply(overrides?: CallOverrides): Promise<[BigNumber]>;

    currentValue(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  _divide(overrides?: CallOverrides): Promise<BigNumber>;

  _feedAddress(overrides?: CallOverrides): Promise<string>;

  _multiply(overrides?: CallOverrides): Promise<BigNumber>;

  currentValue(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    _divide(overrides?: CallOverrides): Promise<BigNumber>;

    _feedAddress(overrides?: CallOverrides): Promise<string>;

    _multiply(overrides?: CallOverrides): Promise<BigNumber>;

    currentValue(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    _divide(overrides?: CallOverrides): Promise<BigNumber>;

    _feedAddress(overrides?: CallOverrides): Promise<BigNumber>;

    _multiply(overrides?: CallOverrides): Promise<BigNumber>;

    currentValue(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    _divide(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    _feedAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    _multiply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    currentValue(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
