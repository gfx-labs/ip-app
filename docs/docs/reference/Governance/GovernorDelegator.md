# Governor Delegator

## Overview
The governor delegator contract is the governance/timelock contract for Interest Protocol. The contract references the implementation contract (governor delegate) for its logic. The logic can be updated by setting a new implementation contract. 

## Constructor 
The constructor needs all of the relevant protocol information so it can intialize the governor delegate.
  ```
constructor(
    address ipt_,
    address implementation_,
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

* function _setImplementation(address implementation_) public override
    * Called by itself via governance to update the implementation of the delegator. 
* function delegateTo(address callee, bytes memory data) internal
    * Internal method to delegate execution to another contract.