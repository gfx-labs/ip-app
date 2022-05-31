# Sale of Interest Protocol Tokens (IPT)

## Overview

The wave contract handles the IPT token sale. GFX has allocated 35,000,000 IPT, or 35% of the token supply, to be sold at a price between $0.50 and $1.00 per IPT. The sale mechanics are described in the next section.

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
    2. The total amount of USDC committed to the contract cannot exceed the global cap of 35,000,000 USDC. Once this global cap is reached, the contract will no longer accept USDC commitments.
    3. Once committed, the USDC cannot be withdrawn. Committed USDC does not remain in the wave contract, but is sent directly to a receiver address controlled by GFX.

- At the end of the sale, each address that participated can claim their IPT tokens based on the math below:
Let X be the total amount of USDC that has been committed. The amount of IPT tokens claimable by an address that has committed y USDC is determined as follows:
    1. If X is less than 17,500,000 USDC, then the address receives 2y IPT. The price of IPT is 0.50.
    2. If X is greater than 17,500,000 USDC but less than 35,000,000 USDC, then the address receives (35,000,000/X)y IPT. The price of IPT is X/35,000,000.

- All participants pay the same price. Since the global cap is 35,000,000 USDC, the maximum price that participants can pay is 1 USDC per IPT.

- Upon completion of the IPT sale, GFX's team and investors will collectively control a minority share of the protocol and will not be necessary for Interest Protocol to function. (*this is not necessarily true if the sale is undersubscribed. Also, we should specify what will happen to the remaining tokens. Set aside for future sale but cannot vote?*) GFX will continue to be involved in Interest Protocol, but as community members subject to the same governance rules as any token holder. We have ideas for additional functionalities and components and intend to work with the community to create or vote for proposals that reflect those ideas.

## Token Distribution

Pie Chart

- Sale: 35%
- GFX Labs: 30%
- Liquidity Mining Program: 10%
- Recongized Delegate Program: 5%
- Treasury: 20%

## Constructor
```
constructor(
    address receiver,
    uint256 totalReward,
    address rewardToken,
    uint256 claimTime,
    bytes32 merkle1,
    uint256 enable1,
    bytes32 merkle2,
    uint256 enable2,
    bytes32 merkle3,
    uint256 enable3
  ) {
    // price information
    _floor = 500_000; // 50 cents
    _cap = 500_000 * 30_000_000 * 4; // 4 * 50 cents * 30,000,000 tokens, or $60,000,000 of USDC
    _claimTime = claimTime;
    // reward information
    _rewardToken = IERC20(rewardToken);
    _totalReward = totalReward;

    // set receiver of IPT
    _receiver = receiver;

    // wave metadata
    _metadata[1].enabled = true;
    _metadata[1].merkleRoot = merkle1;
    _metadata[1].enableTime = enable1;

    _metadata[2].enabled = true;
    _metadata[2].merkleRoot = merkle2;
    _metadata[2].enableTime = enable2;

    _metadata[3].enabled = true;
    _metadata[3].merkleRoot = merkle3;
    _metadata[3].enableTime = enable3;

    calculated = false;
    saturation = false;
    withdrawn = false;
  }
```

## Functions
* function isEnabled() public view returns (bool)
    * Whether the wave is in progress. True if yes.
* function canClaim() public view returns (bool)
    * Whether or not the USDC cap has been reached
* function canRedeem() public view returns (bool)
    * Whether or not the wave has started. True is yes. 
* function calculatePricing() internal
    * calculate the price once after the waves have ended.
* function redeem() external
    * redeem points for token
* function getPoints(uint 256 wave, uint256 amount,uint256 key,bytes32[] memory merkleProof) public
    * Get points by depositing usdc up to the max allocated. Wave is their wave number, amount is usdc, key is the max number of points they can claim, and the merkle proof is the proof.  
* function verifyClaim(uint256 wave, address claimer,uint256 key,bytes32[] memory merkleProof) private view returns (bool) 
    * Validates an address' claim by checking their proof against the merkle root. 
* function verifyProof(bytes32[] memory proof,bytes32 root,bytes32 leaf) internal pure returns (bool)
    * Called by verify claim
* function processProof(bytes32[] memory proof, bytes32 leaf) internal pure returns (bytes32)
    * Called by verify proof
* function takeFrom(address target, uint256 amount) internal
    * Called by the getPoints which transfers usdc
* function giveTo(address target, uint256 amount) internal
    * Called by the redeem function which sends the token to the target address.
* function withdraw() external
    * sends all of the unclaimed rewards tokens to the receiver
