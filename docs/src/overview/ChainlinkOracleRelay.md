# Chainlink Oracle Relay

## Overview
The Chainlink oracle relay contract returns a price for a specified Chainlink oracle. At launch, this contract is used as the main relay for the AnchorViewRelay. 

## Constructor
* feed_address: the chainlink oracle address.
* mul: For scaling the price to report in 1e18 terms.
* div: For scaling the price to report in 1e18 terms.

## Functions
* function currentValue() external view override returns (uint256)
    * Is an external function that calls getLastSecond() which is a private functions.
* function getLastSecond() private view returns (uint256)
    * Calls the chainlink oracle for the latest answer and scales it to 1e18 terms.
