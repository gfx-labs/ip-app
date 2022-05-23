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

export interface AnchoredViewRelayInterface extends utils.Interface {
  functions: {
    "_anchorAddress()": FunctionFragment;
    "_anchorRelay()": FunctionFragment;
    "_mainAddress()": FunctionFragment;
    "_mainRelay()": FunctionFragment;
    "_widthDenominator()": FunctionFragment;
    "_widthNumerator()": FunctionFragment;
    "currentValue()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "_anchorAddress"
      | "_anchorRelay"
      | "_mainAddress"
      | "_mainRelay"
      | "_widthDenominator"
      | "_widthNumerator"
      | "currentValue"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "_anchorAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "_anchorRelay",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "_mainAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "_mainRelay",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "_widthDenominator",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "_widthNumerator",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "currentValue",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "_anchorAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_anchorRelay",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_mainAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "_mainRelay", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "_widthDenominator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_widthNumerator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "currentValue",
    data: BytesLike
  ): Result;

  events: {};
}

export interface AnchoredViewRelay extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: AnchoredViewRelayInterface;

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
    _anchorAddress(overrides?: CallOverrides): Promise<[string]>;

    _anchorRelay(overrides?: CallOverrides): Promise<[string]>;

    _mainAddress(overrides?: CallOverrides): Promise<[string]>;

    _mainRelay(overrides?: CallOverrides): Promise<[string]>;

    _widthDenominator(overrides?: CallOverrides): Promise<[BigNumber]>;

    _widthNumerator(overrides?: CallOverrides): Promise<[BigNumber]>;

    currentValue(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  _anchorAddress(overrides?: CallOverrides): Promise<string>;

  _anchorRelay(overrides?: CallOverrides): Promise<string>;

  _mainAddress(overrides?: CallOverrides): Promise<string>;

  _mainRelay(overrides?: CallOverrides): Promise<string>;

  _widthDenominator(overrides?: CallOverrides): Promise<BigNumber>;

  _widthNumerator(overrides?: CallOverrides): Promise<BigNumber>;

  currentValue(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    _anchorAddress(overrides?: CallOverrides): Promise<string>;

    _anchorRelay(overrides?: CallOverrides): Promise<string>;

    _mainAddress(overrides?: CallOverrides): Promise<string>;

    _mainRelay(overrides?: CallOverrides): Promise<string>;

    _widthDenominator(overrides?: CallOverrides): Promise<BigNumber>;

    _widthNumerator(overrides?: CallOverrides): Promise<BigNumber>;

    currentValue(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    _anchorAddress(overrides?: CallOverrides): Promise<BigNumber>;

    _anchorRelay(overrides?: CallOverrides): Promise<BigNumber>;

    _mainAddress(overrides?: CallOverrides): Promise<BigNumber>;

    _mainRelay(overrides?: CallOverrides): Promise<BigNumber>;

    _widthDenominator(overrides?: CallOverrides): Promise<BigNumber>;

    _widthNumerator(overrides?: CallOverrides): Promise<BigNumber>;

    currentValue(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    _anchorAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    _anchorRelay(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    _mainAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    _mainRelay(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    _widthDenominator(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    _widthNumerator(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    currentValue(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
