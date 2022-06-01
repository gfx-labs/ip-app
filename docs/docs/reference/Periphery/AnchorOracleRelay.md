# Anchored View Relay

## Overview
The anchor view relay uses a main relay and anchor relay to return an asset price. The main relay price is checked against the anchor relay on each call to certify the main relay price is within bounds of the anchor relay.

More information on oracle system available [here](../../../concepts/Borrowing/OracleSystem).

## Constructor
```
constructor(
    address anchor_address,
    address main_address,
    uint256 widthNumerator,
    uint256 widthDenominator
  )
```
* anchor_address: the relay address of the anchor. This will be the Uniswap v3 relay at launch but additional relays could be implemented.
* main_address: the relay address of the main. This will be the Chainlink relay at launch but additional relays could be implemented.
* widthNumerator: to implement the buffer around the anchor price.
* widthDenominator: to implement the buffer around the anchor price.

## Functions
* function currentValue() external view override returns (uint256)
    * Is an external function that calls getLastSecond() which is a private functions.
* function getLastSecond() private view returns (uint256)
    * This calls the main and anchor prices and performs the check that the main price is within the defined anchor buffer. In the event it is not the transaction will revert. 

