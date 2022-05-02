# Uniswap v3 Oracle Relay

## Overview
The Uniswap v3 oracle relay contract returns a price for a specified pool. At launch, this contract is used as the anchor relay for the AnchorViewRelay. 

## Secondary contracts
* IUniswapV3PoolDerivedState & TickMath to get pool info and handle the math involved.

## Constructor
* lookback: how far back to get tick data from. 
* pool_address: the address of the Uniswap v3 pool.
* quote_token_is_token0: a boolean check if the quote token is token0. If so, we need to flip the pricing around. For exmaple, this comes in handy for ETH/USDC vs USDC/ETH markets.
* mul: For scaling the price to report in 1e18 terms. 
* div: For scaling the price to report in 1e18 terms.

## Functions
* function currentValue() external view override returns (uint256)
    * Is an external function that calls getLastSecond() which is a private functions.
* function getLastSecond() private view returns (uint256 price)
    * Calls the pool address for observatation data and uses the data to compute the current price. A hardcoded tickTimeDifference is used to get time weighted price average. 


