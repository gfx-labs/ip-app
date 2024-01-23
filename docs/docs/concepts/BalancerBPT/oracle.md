# Oracle System for BPTs as Collateral

## Original Oracle System

By far the biggest hurdle to this project is coming up with a robust and accurate oracle system to price BPTs as collateral.

The naïve approach to pricing an LP token is to simply gather the total asset values that back the LP (total balance of each asset multiplied by a known price) and divide by the total supply of the LP. So LTV / Total Supply.

We can call this price the naïve price, and if manipulation were not a factor, this would be the ideal price to use when deriving a value for BPTs as collateral on Interest Protocol.

If priced this way, a flash loan attack could manipulate the underlying asset balances in a significant enough way to alter the price of the LP token for a single block, allowing for malicious actions such as inflating the ‘price’ of the BPT, so a borrower on IP can borrow more than they should against their BPT collateral. If this attack can alter the balances enough to inflate the BPT price to a greater extent than the LTV, an attacker could walk away with a profit in borrowed USDi, leaving some bad debt behind.

A solution to price BPTs from Weighted Pools was already developed in principle by [Revest Finance](https://github.com/Revest-Finance/ResonateContracts/blob/public/hardhat/contracts/oracles/adapters/balancer/BalancerV2WeightedPoolPriceOracle.sol) as described in this [article](https://revestfinance.medium.com/dev-blog-on-the-derivation-of-a-safe-price-formula-for-balancer-pool-tokens-33e8993455d0). The implementation for weighted pools works based on this formula and has been tested to be accurate.

Importantly, this solution does not even ask the [Balancer Vault](https://etherscan.io/address/0xba12222222228d8ba445958a75a0704d566bf2c8) what the pool balances are, yet is still able to accurately calculate the LTV of the pool, and so should be safe and resistant to manipulation.

The solution to solving this problem for StablePools / MetaStablePools unfortunately is less straightforward.

StablePools differ from MetaStablePools in that they are made up of two assets that are often similar in value, rather than two otherwise related assets. For example, the stable pool [B-auraBAL-STABLE](https://etherscan.io/address/0x3dd0843a028c86e0b760b1a76929d1c5ef93a2dd#readContract) is a pool between AuraBal and the BPT [B-80BAL-20WETH](https://etherscan.io/address/0x5c6Ee304399DBdB9C8Ef030aB642B10820DB8F56#readContract), which is the unstaked version of veBal. Therefore, these two should be roughly equal in value, as they represent the same underlying asset and functionality.

The solution recommended by Chainlink via this [article](https://blog.chain.link/using-chainlink-oracles-to-securely-utilize-curve-lp-pools/) is to use a method that we can call MinSafePrice. This method is supposed to calculate a safe lower bound for the true price of the BPT. Protocols can then use this MinSafePrice as the market price for the BPTs, resulting in a safe (if slightly undervalued) price for the collateral.

However, in testing, the results of this method are often slightly higher than the expected naïve price, which doesn’t make much sense if this price is supposed to be a lower bound.

This behavior can further be confirmed by an audit of [Sturdy Finance](https://sturdy.finance/) which utilizes this type of oracle for StablePools / MetaStablePools. See [QSP-4 of their audit report](https://certificate.quantstamp.com/full/sturdy-aura-integration-and-leverage.pdf).

After trial and error with a number of other possible solutions, the best solution currently tested is to utilize the [outGivenIn](https://github.com/balancer/balancer-v2-monorepo/blob/93af2fda1eefe1b7d103e6c54ce159951ff001fc/pkg/pool-stable/contracts/StableMath.sol#L124) logic to determine if manipulation has taken place.

In essence, we can know the market exchange rate of the two assets in the pool if we can price them with external oracles. We can then compare this to the price rate computed by the pool.

This pool price rate is of course subject to manipulation, but we can detect this manipulation by comparing the result to the true market exchange rate.

In this way, we can confirm that manipulation has not taken place, and therefore utilize the naïve price.

## Technical Writeup

More info on this can be found in this [full technical writeup](https://docs.google.com/document/d/1u4dju8zORKWp3mEoCcEFgDvt90ro0tu17GOOLH2tHxY/edit) of the oracle systems.

