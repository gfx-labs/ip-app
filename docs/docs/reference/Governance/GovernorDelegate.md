# Governor Delegate
The governor delegate contract contains the logic for the governor delegator to reference. The delegate can be changed by governance to introduce new logic without changing the governance contract of the protocol 

More information on governance available [here](../../../concepts/Governance/Overview).


## Initialize
  ```
function initialize(
    address ipt_,
    uint256 votingPeriod_,
    uint256 votingDelay_,
    uint256 proposalThreshold_,
    uint256 proposalTimelockDelay_,
    uint256 quorumVotes_,
    uint256 emergencyQuorumVotes_,
    uint256 emergencyVotingPeriod_,
    uint256 emergencyTimelockDelay_
  )

```

## Functions
* function propose(address[] memory targets,uint256[] memory values,string[] memory signatures,bytes[] memory calldatas,string memory description,bool emergency) public override returns (uint256)
    * Function used to propose a new proposal. Sender must have delegates above the proposal threshold
* function queue(uint256 proposalId) external override 
    * Queues a proposal of state succeeded
* function queueTransaction(address target,uint256 value,string memory signature,bytes memory data,uint256 eta,uint256 delay) internal returns (bytes32)
    * Queue helper functions for each function call in a proposal.
* function execute(uint256 proposalId) external payable override
    * Executes a queued proposal if eta has passed
* function executeTransaction(address target,uint256 value,string memory signature,bytes memory data,uint256 eta) external payable override returns (bytes memory)
    * Execute helper function for each function call in a proposal. 
* function cancel(uint256 proposalId) external override
    * Cancels a proposal only if sender is the proposer, or proposer delegates dropped below proposal threshold.
* function cancelTransaction(address target,uint256 value,string memory signature,bytes memory data,uint256 eta) internal
    * Cancel helper function for each function call in a proposal.
* function getActions(uint256 proposalId) external view override returns (address[] memory targets,uint256[] memory values,string[] memory signatures,bytes[] memory calldatas)
    * Gets actions (function calls) of a proposal.
* function getReceipt(uint256 proposalId, address voter) external view override returns (Receipt memory)
    * Gets the receipt for a voter on a given proposal. Used to track who has  voted. 
* function state(uint256 proposalId) public view override returns (ProposalState)
    * Gets the state of a proposal. Canceled, pending, active, defeated, succeded, queued, executed, or expired.
* function castVote(uint256 proposalId, uint8 support) external override 
    * Cast a vote for a proposal.
* function castVoteWithReason(uint256 proposalId,uint8 support,string calldata reason) external override
    * Cast a vote for a proposal with a reason.
* function castVoteBySig(uint256 proposalId,uint8 support,uint8 v,bytes32 r,bytes32 s) external override 
    * Cast a vote for a proposal by signature.
* function castVoteInternal(address voter,uint256 proposalId,uint8 support) internal returns (uint96)
    * Internal function that caries out voting logic.
* function isWhitelisted(address account) public view override returns (bool)
    * View function which returns if an account is whitelisted.
* function _setDelay(uint256 proposalTimelockDelay_) public override
    * Used to update the timelock period by time.
* function _setEmergencyDelay(uint256 emergencyTimelockDelay_) public override
    * Used to update the emergency timelock period by time. 
* function _setVotingDelay(uint256 newVotingDelay) external override
    * Governance function for setting the voting delay (review period).
* function _setVotingPeriod(uint256 newVotingPeriod) external override
    * Governance function for setting the voting period in blocks.
* function _setEmergencyVotingPeriod(uint256 newEmergencyVotingPeriod) external override
    * Governance function for setting the emergency voting period in blocks.
* function _setProposalThreshold(uint256 newProposalThreshold) external override
    * Governance function for setting the proposal threshold.
* function _setQuorumVotes(uint256 newQuorumVotes) external override
    * Governance function for setting the quorum threshold.
* function _setEmergencyQuorumVotes(uint256 newEmergencyQuorumVotes) external override
    * Governance function for setting the emergency quorum threshold.
* function _setWhitelistAccountExpiration(address account, uint256 expiration) external override
    *  Governance function for adding a whitelisted address and a timestamp for expiration.
* function _setWhitelistGuardian(address account) external override
    * Governance function for setting the whitelistGuardian. WhitelistGuardian can cancel proposals from whitelisted addresses.
