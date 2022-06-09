# IPT Sale

GFX Labs will conduct the sale of Interest Protocol Tokens (IPT) from June 13th to June 19th in tandem with the launch of the protocol. This post introduces both IPT and Governor Charlie, along with how the sale of IPT will take place.

## IPT and Governor Charlie

IPT holders collectively control the entire protocol, revenues, and reserves through the governance process. Because IP contracts designate the core governance contract as their owner, IPT holders can propose and vote on changes to IP such as: adding new collateral assets, changing the parameters of existing collateral assets, updating the interest rate curve, and adjusting oracle contract combinations. They can also modify the governance and USDi contracts themselves by adding additional features or updating voting parameters. IPT holders also control protocol fees and how any treasury funds and USDi accrued will be used. In short, IPT enables its holder to manage the entire protocol and its periphery contracts.

IP’s governance contract — aptly named Governor Charlie — is an extension of Compound’s Governor Bravo. Charlie inherits all the functionalities of Bravo but merges the governor and timelock contracts. In addition, Charlie introduces a special process for emergency proposals: IPT holders can make changes to the protocol contract on a faster timeline, albeit with a higher quorum threshold.

## IPT Sale

We designed the sale to incentivize meaningful participation from the outset. Instead of an airdrop, we chose a targeted approach: historical governance participants and users of existing DeFi protocols will have priority. We believe that quality participation from a broad base of engaged contributors is the best defense against centralization. Those active contributors, rather than VCs, should thus have first access to IPT.

The GFX team will only retain a minority interest in the protocol. After the sale, GFX efforts are not necessary for IP to function properly and the token holders will assume control of the protocol. GFX will continue to be involved in IP, but as community members with the same powers in governance as any token holder.
 
Below is the initial distribution of IPT total supply:
![IPTdistribution](./IPTdistribution.png)


GFX has allocated 35,000,000 IPT (35% of the total token supply) to the token sale. Each IPT will sell for between 0.25 and 2.00 USDC, depending on demand. The exact price calculations are available in more detail below.

There will be three successive waves of eligible IPT buyers: governance participants in major DAOs, DeFi users, and the general public. GFX has compiled a public whitelist of addresses that qualify for the first and second waves. Anyone can purchase in the third wave.

There is a global cap of 70,000,000 USDC. This is the maximum amount of USDC that can be committed to the sales contract. If the global cap is reached during the course of the sale, the contract will no longer accept USDC commitments, even from whitelisted addresses that have not yet participated.

## Timing (all times in Central Daylight Time)

* Wave 1: Starts at noon on Monday, June 13th, and ends at noon on Wednesday, June 15th.
* Wave 2: Starts at noon on Wednesday, June 15th, and ends at noon on Friday, June 17th. 
* Wave 3: Starts at noon on Friday, June 17th, and ends at noon on Sunday, June 19th. 
* IPT purchasers can claim their IPT starting at noon on Sunday, June 19th.

## Wave Eligibility

The Wave 1 whitelist consists of historical voters on MakerDao, Compound, Aave, Uniswap, dYdX, Balancer (snapshot), Fei (onchain & snapshot), and Curve (non-gauge). The preliminary number of eligible Wave 1 participants is 8,654. Each address can commit up to an individual cap of 1,000,000 USDC.

The Wave 1 whitelist will be updated to also include early community members - details will be announced in the coming days. Join our Discord for more information.

The Wave 2 whitelist consists of historical users of MakerDao, Compound, and Aave. In the preliminary whitelist, the total number of eligible participants is 54,231. Each address can commit up to an individual cap of 500,000 USDC.

Wave 3 has no whitelist and no individual cap; anyone can participate. 

Note that the sum of individual caps in Wave 1 or Wave 2 is substantially larger than the total number of tokens offered. This decision was based on the assumption that not all whitelisted addresses would participate.

## Rule Details
* No address has been whitelisted for both Wave 1 and Wave 2. Any address that qualifies for both whitelists has only been whitelisted for Wave 1.
* During each wave, an address may commit USDC to the Wave contract subject to the following constraints:
    * Each address may commit up to its individual cap. They may commit multiple times over the course of the sale, as long as their total commitment remains below their cap.
    * The total amount of USDC committed to the contract cannot exceed the global cap of 70,000,000 USDC. Once the global cap is reached, the contract will no longer accept USDC commitments.
* Commitment is final. Once committed, USDC cannot be withdrawn.
* USDC committed to the contract are sent to GFX Labs.
* After the sale ends, each participating address can claim its share of IPT tokens. Suppose X USDC has been committed during the sale. The amount of IPT tokens claimable by an address that has committed y USDC is determined as follows:
    * If X is less than 8,750,000 USDC, then the address receives 4y IPT. The price of IPT is 0.25 USDC.
    * If X is greater than 8,750,000, then the address receives (35,000,000/X)y IPT. The price of IPT is X/35,000,000.
    * All participants pay the same price. Since the global cap is 70,000,000 USDC, the maximum price that participants can pay is 2 USDC per IPT.

## Check Whitelist

We have compiled a preliminary whitelist for Wave 1 and Wave 2. To check if your address has been included in the first two waves, please see visit: https://interestprotocol.io/#/whitelist. If your whitelisted address is a smart contract that doesn’t have the functionality to participate, send an email to whitelist@interestprotocol.io with the whitelisted address, the EOA controlling the smart contract, and any necessary information to prove their on-chain ownership of the account by Friday, June 10th, 2022.

## Disclaimer

This page is for general information purposes only. It should not be relied upon for accounting, legal, or tax advice.



