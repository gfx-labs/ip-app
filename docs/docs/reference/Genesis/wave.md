# Wave

## Overview
Contract for IDO

The Wave contract is used for the initial IDO of Interest Protocol Tokens (IPT). During the IDO, each address can commit USDC to the Wave contract, up to the address's individual cap. There is also a global cap on the total amount of USDC that can be committed. After the end of the IDO period, each address can claim their pro-rata share of the IPT tokens, based on the amount of USDC that they sent. The IDO distributes up to X IPT tokens.

## Whitelist

A whitelist of addresses has been created to encourage a wide dispersion of IPT and thus decentralize the protocol from the outset. In addition to a max number of tokens each address is able to purchase, the protocol gives an opportunity to historical governance participants to get points, then DeFi users, and finally everyone. The protocol prefers IPT holders to have a track record in protocol participation, so giving them the first opportunity is ideal for the longevity of the protocol. Each wave gets ~2 days to get points. Any remaining points are rolled into the next wave for claim. Additional waves will occur until all points are claimed or all waves are completed.

## Sale Rules

- Up to X IPT tokens will be sold at a price between $0.50 and $2.00 per token.

- During the IDO period, each address can commit USDC to the contract, subject to the following constraints:
    1. Each address can commit up to its individual allocation cap, determined by the whitelist.
    2. The total amount of USDC committed to the contract cannot exceed the global cap, which is ______ USDC. Once this global cap is reached, the contract will no longer accept USDC commitments.

- After the IDO period ends, each address can claim its share of IPT tokens. The amount of IPT tokens claimable by each address is determined as follows:
    1. 

Each address can send USDC to the Wave contract to claim points, up to the address's maximum allocation amount. After the end of the IDO period, each address can claim IPT tokens based on its points balance. The IDO distributes a fixed total amount of IPT tokens, and each point holder receives a pro-rata

## Constructor
```
constructor(bytes32 root, uint256 totalReward, uint256 floor, 
uint256 maxPoints, uint256 enableTime, uint256 disableTime, address receiver ) {
        _enableTime = enableTime;
        _disableTime = disableTime;
        _floor = floor;
        _maxPoints = maxPoints;
        _totalClaimed = totalReward;
        _receiver = receiver;
        merkleRoot = root;
    }
```

## Functions
* function redeem() external
    * redeem points for token
* function getPoints(uint256 amount,uint256 key,bytes32[] memory merkleProof) public
    * Get points by depositing usdc up to the max allocated. Amount is usdc, key is the max number of points they can claim, and the merkle proof is the proof.  
* function verifyClaim(address claimer,uint256 key,bytes32[] memory merkleProof) private view returns (bool) 
    * Validates an address' claim by checking their proof against the merkle root. 
* function verifyProof(bytes32[] memory proof,bytes32 root,bytes32 leaf) internal pure returns (bool)
    * Called by verify claim
* function processProof(bytes32[] memory proof, bytes32 leaf) internal pure returns (bytes32)
    * Called by verify proof
* function takeFrom(address target, uint256 amount) internal
    * Called by the getPoints which transfers usdc
* function giveTo(address target, uint256 amount) internal
    * Called by the redeem function which sends the token to the target address.
* function isEnabled() public view returns (bool)
    * Tells whether or not both parties have accepted the deal. Returns true if both parties have accepted.
* function canRedeem() public view returns (bool)
    * Whether or not the wave has completed. True if completed. 
