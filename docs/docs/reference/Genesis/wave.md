# Wave

## Overview
Contract for IDO

(maybe what I wrote below is more appropriate as a medimum article)

Interest Protocol IDO distributes up to Y Interest Protocol Tokens (IPT) at a price between $0.50 and $2.00 per token. The IDO proceeds in three Waves. During each Wave, each address can commit USDC up to the address's individual cap for that Wave, determined by the whitelist. There is also a global cap on the total amount of USDC that can be committed. At the end of the Wave, each address can claim their pro-rata share of the IPT tokens, based on the amount of USDC that they sent. We move on to the next Wave if and only if there are IPT tokens that remain unsold.

## Whitelist

Interest Protocol IDO is designed to encourage a wide dispersion of IPT and decentralize the protocol from the outset. It also aims to distribute voting power to historical governance participants and DeFi users. To achieve these goals, each Wave has a whitelist that specifies the maximum amount of USDC that each address can commit during the Wave. In the Wave 1 whitelist, 
 
In addition to a max number of tokens each address is able to purchase, the protocol gives an opportunity to historical governance participants to get points, then DeFi users, and finally everyone. The protocol prefers IPT holders to have a track record in protocol participation, so giving them the first opportunity is ideal for the longevity of the Any remaining points are rolled into the next wave for claim. Additional waves will occur until all points are claimed or all waves are completed.

## Sale Rules

- Each Wave lasts for 48 hours. During Wave 1, each address can commit USDC to the Wave contract, subject to the following constraints:
    1. Each address can commit up to its individual allocation cap, determined by the whitelist.
    2. The total amount of USDC committed to the contract cannot exceed the global cap, which is 2Y USDC. Once this global cap is reached, the contract will no longer accept USDC commitments.
  Once committed, the USDC cannot be withdrawn.

- At the end of Wave 1, all USDC committed to the contract is sent to the protocol treasury. Each address can claim its share of IPT tokens. Let X be the total amount of USDC that has been committed. The amount of IPT tokens claimable by an address that has committed z USDC is determined as follows:
    1. If X is less than 0.5Y, then the address receives 0.5z IPT. The price of IPT is 0.50.
    2. If X is greater than 0.5Y but less than 2Y, then the address receives (Y/X)z IPT. The price of IPT is Y/X.
    3. If X equals 2Y, then the address receives 0.5z IPT. The price of IPT is 2.

- At the end of Wave 1, if we are in case 1, Y-2X IPT will remain unsold. These IPT will be rolled over to be sold in Wave 2. Wave 2 sells up to Y-2X IPT and has a new whitelist to determine individual caps, but is otherwise identical to Wave 1. In particular, it has the same floor price of $0.50 and ceiling price of $2. If there is unsold IPT after Wave 2, IDO proceeds to Wave 3. Wave 3 sells up to the amount of IPT remaining after Wave 2 and has its own whitelist, but is otherwise identical to Waves 1 and 2.

- At the end of Wave 1, if we are in cases 2 or 3, all IPT will have been sold out, and Waves 2 or 3 will not take place. Similarly, if all IPT is sold in Wave 2, Wave 3 will not take place.

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
