/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type { BaseContract, BigNumber, Signer, utils } from "ethers";
import type { EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../common";

export interface USDIEventsInterface extends utils.Interface {
  functions: {};

  events: {
    "Burn(address,uint256)": EventFragment;
    "Deposit(address,uint256)": EventFragment;
    "Donation(address,uint256,uint256)": EventFragment;
    "Mint(address,uint256)": EventFragment;
    "Withdraw(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Burn"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Deposit"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Donation"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Mint"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Withdraw"): EventFragment;
}

export interface BurnEventObject {
  from: string;
  _value: BigNumber;
}
export type BurnEvent = TypedEvent<[string, BigNumber], BurnEventObject>;

export type BurnEventFilter = TypedEventFilter<BurnEvent>;

export interface DepositEventObject {
  _from: string;
  _value: BigNumber;
}
export type DepositEvent = TypedEvent<[string, BigNumber], DepositEventObject>;

export type DepositEventFilter = TypedEventFilter<DepositEvent>;

export interface DonationEventObject {
  _from: string;
  _value: BigNumber;
  _totalSupply: BigNumber;
}
export type DonationEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  DonationEventObject
>;

export type DonationEventFilter = TypedEventFilter<DonationEvent>;

export interface MintEventObject {
  to: string;
  _value: BigNumber;
}
export type MintEvent = TypedEvent<[string, BigNumber], MintEventObject>;

export type MintEventFilter = TypedEventFilter<MintEvent>;

export interface WithdrawEventObject {
  _from: string;
  _value: BigNumber;
}
export type WithdrawEvent = TypedEvent<
  [string, BigNumber],
  WithdrawEventObject
>;

export type WithdrawEventFilter = TypedEventFilter<WithdrawEvent>;

export interface USDIEvents extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: USDIEventsInterface;

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

  functions: {};

  callStatic: {};

  filters: {
    "Burn(address,uint256)"(from?: null, _value?: null): BurnEventFilter;
    Burn(from?: null, _value?: null): BurnEventFilter;

    "Deposit(address,uint256)"(
      _from?: string | null,
      _value?: null
    ): DepositEventFilter;
    Deposit(_from?: string | null, _value?: null): DepositEventFilter;

    "Donation(address,uint256,uint256)"(
      _from?: string | null,
      _value?: null,
      _totalSupply?: null
    ): DonationEventFilter;
    Donation(
      _from?: string | null,
      _value?: null,
      _totalSupply?: null
    ): DonationEventFilter;

    "Mint(address,uint256)"(to?: null, _value?: null): MintEventFilter;
    Mint(to?: null, _value?: null): MintEventFilter;

    "Withdraw(address,uint256)"(
      _from?: string | null,
      _value?: null
    ): WithdrawEventFilter;
    Withdraw(_from?: string | null, _value?: null): WithdrawEventFilter;
  };

  estimateGas: {};

  populateTransaction: {};
}
