# Token Delegate

## Overview
The token delegate contract contains the core logic of IPT. The protocol can add or change the functionality by updating the implementation contract on the delegetor.

## Initialize
Used to initialize the contract during delegator constructor. The account is where the total supply of IPT is initially transfered.
```
function initialize(address account_, uint256 initialSupply_) public override {
    require(totalSupply == 0, "initialize: can only do once");
    require(account_ != address(0), "initialize: invalid address");
    require(initialSupply_ > 0, "invalid initial supply");

    totalSupply = initialSupply_;

    balances[account_] = uint96(totalSupply);
    emit Transfer(address(0), account_, totalSupply);
  }
```
## Functions
* function changeName(string calldata name_) external override onlyOwner
    * Change token name
* function changeSymbol(string calldata symbol_) external override onlyOwner
    * Change token symbol
* function allowance(address account, address spender) external view override returns (uint256)
    * Get the number of tokens `spender` is approved to spend on behalf of `account`
* function approve(address spender, uint256 rawAmount) external override returns (bool)
    * Approve `spender` to transfer up to `amount` from `src`
* function permit(address owner,address spender,uint256 rawAmount,uint256 deadline,uint8 v,bytes32 r,bytes32 s) external override
    * Triggers an approval from owner to spends
* function balanceOf(address account) external view override returns (uint256)
    * Get the number of tokens held by the `account`
* function transfer(address dst, uint256 rawAmount) external override returns (bool)
    * Transfer `amount` tokens from `msg.sender` to `dst`
* function transferFrom(address src,address dst,uint256 rawAmount) external override returns (bool)
    * Transfer `amount` tokens from `src` to `dst`
* function mint(address dst, uint256 rawAmount) external override onlyOwner
    * Mint new tokens
* function delegate(address delegatee) public override
    * Delegate votes from `msg.sender` to `delegatee`
* function delegateBySig(address delegatee,uint256 nonce,uint256 expiry,uint8 v,bytes32 r,bytes32 s) public override
    * Delegates votes from signatory to `delegatee`
* function getCurrentVotes(address account) external view override returns (uint96)
    * Gets the current votes balance for `account`
* function getPriorVotes(address account, uint256 blockNumber) public view override returns (uint96) 
    * Determine the prior number of votes for an account as of a block number.
* function _naivePriorVotes(address account, uint256 blockNumber) internal view returns (bool ok, uint96 ans) 
    * Hepler function for getPriorVotes.
* function _delegate(address delegator, address delegatee) internal 
    * Helper function for delegate.
* function _transferTokens(address src,address dst,uint96 amount) internal 
    * Helper function for transfering IPT
* function _moveDelegates(address srcRep,address dstRep,uint96 amount) internal 
    * Helper function for delegation and transfers.
* function _writeCheckpoint(address delegatee,uint32 nCheckpoints,uint96 oldVotes,uint96 newVotes) internal 
    * Helper function for _moveDelegates
* function safe32(uint256 n, string memory errorMessage) internal pure returns (uint32)
    * overflow check
* function safe96(uint256 n, string memory errorMessage) internal pure returns (uint96) 
    * overflow check
* function add96(uint96 a,uint96 b,string memory errorMessage) internal pure returns (uint96) 
    * math helper
* function sub96(uint96 a,uint96 b,string memory errorMessage) internal pure returns (uint96)
    * math helper
* function getChainid() internal view returns (uint256) 
    * returns the chain ID. 
