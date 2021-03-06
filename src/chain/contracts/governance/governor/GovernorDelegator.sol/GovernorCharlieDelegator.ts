/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../../../common";

export interface GovernorCharlieDelegatorInterface extends utils.Interface {
  functions: {
    "_setImplementation(address)": FunctionFragment;
    "implementation()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "_setImplementation"
      | "_setImplementation(address)"
      | "implementation"
      | "implementation()"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "_setImplementation",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "_setImplementation(address)",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "implementation",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "implementation()",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "_setImplementation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_setImplementation(address)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "implementation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "implementation()",
    data: BytesLike
  ): Result;

  events: {
    "CancelTransaction(bytes32,address,uint256,string,bytes,uint256)": EventFragment;
    "EmergencyVotingPeriodSet(uint256,uint256)": EventFragment;
    "ExecuteTransaction(bytes32,address,uint256,string,bytes,uint256)": EventFragment;
    "NewAdmin(address,address)": EventFragment;
    "NewDelay(uint256,uint256)": EventFragment;
    "NewEmergencyDelay(uint256,uint256)": EventFragment;
    "NewEmergencyQuorum(uint256,uint256)": EventFragment;
    "NewImplementation(address,address)": EventFragment;
    "NewPendingAdmin(address,address)": EventFragment;
    "NewQuorum(uint256,uint256)": EventFragment;
    "ProposalCanceled(uint256)": EventFragment;
    "ProposalCreated(uint256,address,address[],uint256[],string[],bytes[],uint256,uint256,string)": EventFragment;
    "ProposalExecuted(uint256)": EventFragment;
    "ProposalQueued(uint256,uint256)": EventFragment;
    "ProposalThresholdSet(uint256,uint256)": EventFragment;
    "QueueTransaction(bytes32,address,uint256,string,bytes,uint256)": EventFragment;
    "VoteCast(address,uint256,uint8,uint256,string)": EventFragment;
    "VotingDelaySet(uint256,uint256)": EventFragment;
    "VotingPeriodSet(uint256,uint256)": EventFragment;
    "WhitelistAccountExpirationSet(address,uint256)": EventFragment;
    "WhitelistGuardianSet(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "CancelTransaction"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "CancelTransaction(bytes32,address,uint256,string,bytes,uint256)"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EmergencyVotingPeriodSet"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "EmergencyVotingPeriodSet(uint256,uint256)"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ExecuteTransaction"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "ExecuteTransaction(bytes32,address,uint256,string,bytes,uint256)"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewAdmin"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewAdmin(address,address)"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewDelay"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewDelay(uint256,uint256)"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewEmergencyDelay"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "NewEmergencyDelay(uint256,uint256)"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewEmergencyQuorum"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "NewEmergencyQuorum(uint256,uint256)"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewImplementation"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "NewImplementation(address,address)"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewPendingAdmin"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "NewPendingAdmin(address,address)"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewQuorum"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewQuorum(uint256,uint256)"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ProposalCanceled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ProposalCanceled(uint256)"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ProposalCreated"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "ProposalCreated(uint256,address,address[],uint256[],string[],bytes[],uint256,uint256,string)"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ProposalExecuted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ProposalExecuted(uint256)"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ProposalQueued"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "ProposalQueued(uint256,uint256)"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ProposalThresholdSet"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "ProposalThresholdSet(uint256,uint256)"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "QueueTransaction"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "QueueTransaction(bytes32,address,uint256,string,bytes,uint256)"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "VoteCast"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "VoteCast(address,uint256,uint8,uint256,string)"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "VotingDelaySet"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "VotingDelaySet(uint256,uint256)"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "VotingPeriodSet"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "VotingPeriodSet(uint256,uint256)"
  ): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "WhitelistAccountExpirationSet"
  ): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "WhitelistAccountExpirationSet(address,uint256)"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "WhitelistGuardianSet"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "WhitelistGuardianSet(address,address)"
  ): EventFragment;
}

export interface CancelTransactionEventObject {
  txHash: string;
  target: string;
  value: BigNumber;
  signature: string;
  data: string;
  eta: BigNumber;
}
export type CancelTransactionEvent = TypedEvent<
  [string, string, BigNumber, string, string, BigNumber],
  CancelTransactionEventObject
>;

export type CancelTransactionEventFilter =
  TypedEventFilter<CancelTransactionEvent>;

export interface EmergencyVotingPeriodSetEventObject {
  oldEmergencyVotingPeriod: BigNumber;
  emergencyVotingPeriod: BigNumber;
}
export type EmergencyVotingPeriodSetEvent = TypedEvent<
  [BigNumber, BigNumber],
  EmergencyVotingPeriodSetEventObject
>;

export type EmergencyVotingPeriodSetEventFilter =
  TypedEventFilter<EmergencyVotingPeriodSetEvent>;

export interface ExecuteTransactionEventObject {
  txHash: string;
  target: string;
  value: BigNumber;
  signature: string;
  data: string;
  eta: BigNumber;
}
export type ExecuteTransactionEvent = TypedEvent<
  [string, string, BigNumber, string, string, BigNumber],
  ExecuteTransactionEventObject
>;

export type ExecuteTransactionEventFilter =
  TypedEventFilter<ExecuteTransactionEvent>;

export interface NewAdminEventObject {
  oldAdmin: string;
  newAdmin: string;
}
export type NewAdminEvent = TypedEvent<[string, string], NewAdminEventObject>;

export type NewAdminEventFilter = TypedEventFilter<NewAdminEvent>;

export interface NewDelayEventObject {
  oldTimelockDelay: BigNumber;
  proposalTimelockDelay: BigNumber;
}
export type NewDelayEvent = TypedEvent<
  [BigNumber, BigNumber],
  NewDelayEventObject
>;

export type NewDelayEventFilter = TypedEventFilter<NewDelayEvent>;

export interface NewEmergencyDelayEventObject {
  oldEmergencyTimelockDelay: BigNumber;
  emergencyTimelockDelay: BigNumber;
}
export type NewEmergencyDelayEvent = TypedEvent<
  [BigNumber, BigNumber],
  NewEmergencyDelayEventObject
>;

export type NewEmergencyDelayEventFilter =
  TypedEventFilter<NewEmergencyDelayEvent>;

export interface NewEmergencyQuorumEventObject {
  oldEmergencyQuorumVotes: BigNumber;
  emergencyQuorumVotes: BigNumber;
}
export type NewEmergencyQuorumEvent = TypedEvent<
  [BigNumber, BigNumber],
  NewEmergencyQuorumEventObject
>;

export type NewEmergencyQuorumEventFilter =
  TypedEventFilter<NewEmergencyQuorumEvent>;

export interface NewImplementationEventObject {
  oldImplementation: string;
  newImplementation: string;
}
export type NewImplementationEvent = TypedEvent<
  [string, string],
  NewImplementationEventObject
>;

export type NewImplementationEventFilter =
  TypedEventFilter<NewImplementationEvent>;

export interface NewPendingAdminEventObject {
  oldPendingAdmin: string;
  newPendingAdmin: string;
}
export type NewPendingAdminEvent = TypedEvent<
  [string, string],
  NewPendingAdminEventObject
>;

export type NewPendingAdminEventFilter = TypedEventFilter<NewPendingAdminEvent>;

export interface NewQuorumEventObject {
  oldQuorumVotes: BigNumber;
  quorumVotes: BigNumber;
}
export type NewQuorumEvent = TypedEvent<
  [BigNumber, BigNumber],
  NewQuorumEventObject
>;

export type NewQuorumEventFilter = TypedEventFilter<NewQuorumEvent>;

export interface ProposalCanceledEventObject {
  id: BigNumber;
}
export type ProposalCanceledEvent = TypedEvent<
  [BigNumber],
  ProposalCanceledEventObject
>;

export type ProposalCanceledEventFilter =
  TypedEventFilter<ProposalCanceledEvent>;

export interface ProposalCreatedEventObject {
  id: BigNumber;
  proposer: string;
  targets: string[];
  values: BigNumber[];
  signatures: string[];
  calldatas: string[];
  startBlock: BigNumber;
  endBlock: BigNumber;
  description: string;
}
export type ProposalCreatedEvent = TypedEvent<
  [
    BigNumber,
    string,
    string[],
    BigNumber[],
    string[],
    string[],
    BigNumber,
    BigNumber,
    string
  ],
  ProposalCreatedEventObject
>;

export type ProposalCreatedEventFilter = TypedEventFilter<ProposalCreatedEvent>;

export interface ProposalExecutedEventObject {
  id: BigNumber;
}
export type ProposalExecutedEvent = TypedEvent<
  [BigNumber],
  ProposalExecutedEventObject
>;

export type ProposalExecutedEventFilter =
  TypedEventFilter<ProposalExecutedEvent>;

export interface ProposalQueuedEventObject {
  id: BigNumber;
  eta: BigNumber;
}
export type ProposalQueuedEvent = TypedEvent<
  [BigNumber, BigNumber],
  ProposalQueuedEventObject
>;

export type ProposalQueuedEventFilter = TypedEventFilter<ProposalQueuedEvent>;

export interface ProposalThresholdSetEventObject {
  oldProposalThreshold: BigNumber;
  newProposalThreshold: BigNumber;
}
export type ProposalThresholdSetEvent = TypedEvent<
  [BigNumber, BigNumber],
  ProposalThresholdSetEventObject
>;

export type ProposalThresholdSetEventFilter =
  TypedEventFilter<ProposalThresholdSetEvent>;

export interface QueueTransactionEventObject {
  txHash: string;
  target: string;
  value: BigNumber;
  signature: string;
  data: string;
  eta: BigNumber;
}
export type QueueTransactionEvent = TypedEvent<
  [string, string, BigNumber, string, string, BigNumber],
  QueueTransactionEventObject
>;

export type QueueTransactionEventFilter =
  TypedEventFilter<QueueTransactionEvent>;

export interface VoteCastEventObject {
  voter: string;
  proposalId: BigNumber;
  support: number;
  votes: BigNumber;
  reason: string;
}
export type VoteCastEvent = TypedEvent<
  [string, BigNumber, number, BigNumber, string],
  VoteCastEventObject
>;

export type VoteCastEventFilter = TypedEventFilter<VoteCastEvent>;

export interface VotingDelaySetEventObject {
  oldVotingDelay: BigNumber;
  newVotingDelay: BigNumber;
}
export type VotingDelaySetEvent = TypedEvent<
  [BigNumber, BigNumber],
  VotingDelaySetEventObject
>;

export type VotingDelaySetEventFilter = TypedEventFilter<VotingDelaySetEvent>;

export interface VotingPeriodSetEventObject {
  oldVotingPeriod: BigNumber;
  newVotingPeriod: BigNumber;
}
export type VotingPeriodSetEvent = TypedEvent<
  [BigNumber, BigNumber],
  VotingPeriodSetEventObject
>;

export type VotingPeriodSetEventFilter = TypedEventFilter<VotingPeriodSetEvent>;

export interface WhitelistAccountExpirationSetEventObject {
  account: string;
  expiration: BigNumber;
}
export type WhitelistAccountExpirationSetEvent = TypedEvent<
  [string, BigNumber],
  WhitelistAccountExpirationSetEventObject
>;

export type WhitelistAccountExpirationSetEventFilter =
  TypedEventFilter<WhitelistAccountExpirationSetEvent>;

export interface WhitelistGuardianSetEventObject {
  oldGuardian: string;
  newGuardian: string;
}
export type WhitelistGuardianSetEvent = TypedEvent<
  [string, string],
  WhitelistGuardianSetEventObject
>;

export type WhitelistGuardianSetEventFilter =
  TypedEventFilter<WhitelistGuardianSetEvent>;

export interface GovernorCharlieDelegator extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: GovernorCharlieDelegatorInterface;

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
    _setImplementation(
      implementation_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "_setImplementation(address)"(
      implementation_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    implementation(overrides?: CallOverrides): Promise<[string]>;

    "implementation()"(overrides?: CallOverrides): Promise<[string]>;
  };

  _setImplementation(
    implementation_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "_setImplementation(address)"(
    implementation_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  implementation(overrides?: CallOverrides): Promise<string>;

  "implementation()"(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    _setImplementation(
      implementation_: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "_setImplementation(address)"(
      implementation_: string,
      overrides?: CallOverrides
    ): Promise<void>;

    implementation(overrides?: CallOverrides): Promise<string>;

    "implementation()"(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "CancelTransaction(bytes32,address,uint256,string,bytes,uint256)"(
      txHash?: BytesLike | null,
      target?: string | null,
      value?: null,
      signature?: null,
      data?: null,
      eta?: null
    ): CancelTransactionEventFilter;
    CancelTransaction(
      txHash?: BytesLike | null,
      target?: string | null,
      value?: null,
      signature?: null,
      data?: null,
      eta?: null
    ): CancelTransactionEventFilter;

    "EmergencyVotingPeriodSet(uint256,uint256)"(
      oldEmergencyVotingPeriod?: null,
      emergencyVotingPeriod?: null
    ): EmergencyVotingPeriodSetEventFilter;
    EmergencyVotingPeriodSet(
      oldEmergencyVotingPeriod?: null,
      emergencyVotingPeriod?: null
    ): EmergencyVotingPeriodSetEventFilter;

    "ExecuteTransaction(bytes32,address,uint256,string,bytes,uint256)"(
      txHash?: BytesLike | null,
      target?: string | null,
      value?: null,
      signature?: null,
      data?: null,
      eta?: null
    ): ExecuteTransactionEventFilter;
    ExecuteTransaction(
      txHash?: BytesLike | null,
      target?: string | null,
      value?: null,
      signature?: null,
      data?: null,
      eta?: null
    ): ExecuteTransactionEventFilter;

    "NewAdmin(address,address)"(
      oldAdmin?: null,
      newAdmin?: null
    ): NewAdminEventFilter;
    NewAdmin(oldAdmin?: null, newAdmin?: null): NewAdminEventFilter;

    "NewDelay(uint256,uint256)"(
      oldTimelockDelay?: null,
      proposalTimelockDelay?: null
    ): NewDelayEventFilter;
    NewDelay(
      oldTimelockDelay?: null,
      proposalTimelockDelay?: null
    ): NewDelayEventFilter;

    "NewEmergencyDelay(uint256,uint256)"(
      oldEmergencyTimelockDelay?: null,
      emergencyTimelockDelay?: null
    ): NewEmergencyDelayEventFilter;
    NewEmergencyDelay(
      oldEmergencyTimelockDelay?: null,
      emergencyTimelockDelay?: null
    ): NewEmergencyDelayEventFilter;

    "NewEmergencyQuorum(uint256,uint256)"(
      oldEmergencyQuorumVotes?: null,
      emergencyQuorumVotes?: null
    ): NewEmergencyQuorumEventFilter;
    NewEmergencyQuorum(
      oldEmergencyQuorumVotes?: null,
      emergencyQuorumVotes?: null
    ): NewEmergencyQuorumEventFilter;

    "NewImplementation(address,address)"(
      oldImplementation?: null,
      newImplementation?: null
    ): NewImplementationEventFilter;
    NewImplementation(
      oldImplementation?: null,
      newImplementation?: null
    ): NewImplementationEventFilter;

    "NewPendingAdmin(address,address)"(
      oldPendingAdmin?: null,
      newPendingAdmin?: null
    ): NewPendingAdminEventFilter;
    NewPendingAdmin(
      oldPendingAdmin?: null,
      newPendingAdmin?: null
    ): NewPendingAdminEventFilter;

    "NewQuorum(uint256,uint256)"(
      oldQuorumVotes?: null,
      quorumVotes?: null
    ): NewQuorumEventFilter;
    NewQuorum(oldQuorumVotes?: null, quorumVotes?: null): NewQuorumEventFilter;

    "ProposalCanceled(uint256)"(
      id?: BigNumberish | null
    ): ProposalCanceledEventFilter;
    ProposalCanceled(id?: BigNumberish | null): ProposalCanceledEventFilter;

    "ProposalCreated(uint256,address,address[],uint256[],string[],bytes[],uint256,uint256,string)"(
      id?: BigNumberish | null,
      proposer?: string | null,
      targets?: null,
      values?: null,
      signatures?: null,
      calldatas?: null,
      startBlock?: BigNumberish | null,
      endBlock?: null,
      description?: null
    ): ProposalCreatedEventFilter;
    ProposalCreated(
      id?: BigNumberish | null,
      proposer?: string | null,
      targets?: null,
      values?: null,
      signatures?: null,
      calldatas?: null,
      startBlock?: BigNumberish | null,
      endBlock?: null,
      description?: null
    ): ProposalCreatedEventFilter;

    "ProposalExecuted(uint256)"(
      id?: BigNumberish | null
    ): ProposalExecutedEventFilter;
    ProposalExecuted(id?: BigNumberish | null): ProposalExecutedEventFilter;

    "ProposalQueued(uint256,uint256)"(
      id?: BigNumberish | null,
      eta?: null
    ): ProposalQueuedEventFilter;
    ProposalQueued(
      id?: BigNumberish | null,
      eta?: null
    ): ProposalQueuedEventFilter;

    "ProposalThresholdSet(uint256,uint256)"(
      oldProposalThreshold?: null,
      newProposalThreshold?: null
    ): ProposalThresholdSetEventFilter;
    ProposalThresholdSet(
      oldProposalThreshold?: null,
      newProposalThreshold?: null
    ): ProposalThresholdSetEventFilter;

    "QueueTransaction(bytes32,address,uint256,string,bytes,uint256)"(
      txHash?: BytesLike | null,
      target?: string | null,
      value?: null,
      signature?: null,
      data?: null,
      eta?: null
    ): QueueTransactionEventFilter;
    QueueTransaction(
      txHash?: BytesLike | null,
      target?: string | null,
      value?: null,
      signature?: null,
      data?: null,
      eta?: null
    ): QueueTransactionEventFilter;

    "VoteCast(address,uint256,uint8,uint256,string)"(
      voter?: string | null,
      proposalId?: BigNumberish | null,
      support?: null,
      votes?: null,
      reason?: null
    ): VoteCastEventFilter;
    VoteCast(
      voter?: string | null,
      proposalId?: BigNumberish | null,
      support?: null,
      votes?: null,
      reason?: null
    ): VoteCastEventFilter;

    "VotingDelaySet(uint256,uint256)"(
      oldVotingDelay?: null,
      newVotingDelay?: null
    ): VotingDelaySetEventFilter;
    VotingDelaySet(
      oldVotingDelay?: null,
      newVotingDelay?: null
    ): VotingDelaySetEventFilter;

    "VotingPeriodSet(uint256,uint256)"(
      oldVotingPeriod?: null,
      newVotingPeriod?: null
    ): VotingPeriodSetEventFilter;
    VotingPeriodSet(
      oldVotingPeriod?: null,
      newVotingPeriod?: null
    ): VotingPeriodSetEventFilter;

    "WhitelistAccountExpirationSet(address,uint256)"(
      account?: null,
      expiration?: null
    ): WhitelistAccountExpirationSetEventFilter;
    WhitelistAccountExpirationSet(
      account?: null,
      expiration?: null
    ): WhitelistAccountExpirationSetEventFilter;

    "WhitelistGuardianSet(address,address)"(
      oldGuardian?: null,
      newGuardian?: null
    ): WhitelistGuardianSetEventFilter;
    WhitelistGuardianSet(
      oldGuardian?: null,
      newGuardian?: null
    ): WhitelistGuardianSetEventFilter;
  };

  estimateGas: {
    _setImplementation(
      implementation_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "_setImplementation(address)"(
      implementation_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    implementation(overrides?: CallOverrides): Promise<BigNumber>;

    "implementation()"(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    _setImplementation(
      implementation_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "_setImplementation(address)"(
      implementation_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    implementation(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "implementation()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
