# Token Delegator

## Overview
The token delegator contract is the base contract for IPT. 

## Constructor
The account is where the initial supply is trasfered to. The owner is the governance contract. The implementation is the token delegate contract. The initial supply is the amount of IPT to mint and trasfer to the account. 
```
constructor(
    address account_,
    address owner_,
    address implementation_,
    uint256 initialSupply_
  )
```

## Functions
* function _setImplementation(address implementation_) external override onlyOwner
    * Called by the admin to update the implementation of the delegator
* function delegateTo(address callee, bytes memory data) internal
    * Internal method to delegate execution to another contract
* fallback() external payable override
    * Delegates execution to an implementation contract. It returns to the external caller whatever the implementation returns or forwards reverts.



