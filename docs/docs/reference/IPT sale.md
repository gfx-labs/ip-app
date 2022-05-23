# Sale of Interest Protocol Tokens (IPT)

## Overview

The wave contract handles the IPT token sale. GFX has allocated 30,000,000 IPT, or 30% of the token supply, to be sold at a price between $0.50 and $2.00 per IPT. The sale mechanics are described in the next section.

Interest Protocol Token sale is designed to encourage a wide dispersion of IPT and decentralize the protocol from the outset. It also aims to distribute voting power to historical governance participants and DeFi users. To achieve these goals, the sale has two whitelists that specify the maximum amount of USDC that each address can commit.

The sale will take place in three staggered waves. Only addresses whitelisted by GFX Labs according to the criterion below will be able to participate in Waves 1 and 2, while Wave 3 will be available to the general public. All participants, regardless of which wave(s) they belong to, will pay the same final price per IPT. However, there is a global cap on the total amount of USDC that can be committed to the sale. If the global cap is reached during the course of the sale, no further participation will be possible.

At the end of the sale, each address can claim their pro-rata share of the IPT tokens based on the amount of USDC they sent.

## Sale Rules

- Each Wave starts 48 hours apart. 
- Wave 1 starts at noon CDT on June 13th, 2022. 
- Wave 2 starts at noon CDT on June 15th, 2022.
- Wave 3 starts at noon CDT on June 17th, 2022.
- All 3 waves close at noon CDT on June 19th, 2022. At this time, IPT claiming will begin.

- Wave 1 whitelist consists of historical governance participants at Aave, Compound, MakerDao, Uniswap, dYdX, Sushi, and ENS. Each address can commit up to an individual cap of 1,200,000 USDC.

- Wave 2 whitelist consists of historical users of Aave, Compound, MakerDao, Uniswap, dYdX, Sushi, and ENS. Each address can commit up to an individual cap of 200,000 USDC. If an address meets the criteria for both Waves 1 and 2, it is only whitelisted for Wave 1, and its individual cap remains at 1,200,000 USDC.

- Wave 3 has no whitelist. Once Wave 3 starts, anyone can participate without being subject to individual caps.

- The sum of individual caps in Wave 1 or Wave 2 is substantially larger than the total number of tokens offered. This decision was based on the assumption that many whitelisted addresses would not participate. 

- Each address can commit USDC via the wave contract, subject to the following rules:
    1. Each address can commit up to its individual cap determined by the whitelist.
    2. The total amount of USDC committed to the contract cannot exceed the global cap of 60,000,000 USDC. Once this global cap is reached, the contract will no longer accept USDC commitments.
    3. Once committed, the USDC cannot be withdrawn. Committed USDC does not remain in the wave contract, but is sent directly to a receiver address controlled by GFX.

- At the end of the sale, each address that participated can claim their IPT tokens based on the math below:
Let X be the total amount of USDC that has been committed. The amount of IPT tokens claimable by an address that has committed y USDC is determined as follows:
    1. If X is less than 15,000,000 USDC, then the address receives 2y IPT. The price of IPT is 0.50.
    2. If X is greater than 15,000,000 USDC but less than 60,000,000 USDC, then the address receives (30,000,000/X)y IPT. The price of IPT is X/30,000,000.

- All participants pay the same price. Since the global cap is 60,000,000 USDC, the maximum price that participants can pay is 2 USDC per IPT.

- Upon completion of the IPT sale, GFX's team & investors will collectively control a minority share of the protocol and will not be necessary for Interest Protocol to function. GFX will continue to be involved in Interest Protocol, but as community members subject to the same governance rules as any token holder. We have ideas for additional functionalities and components and intend to work with the community to create or vote for proposals that reflect those ideas.

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
    * Whether the wave is in progress. True if yes.
* function canRedeem() public view returns (bool)
    * Whether or not the wave has completed. True if completed. 
