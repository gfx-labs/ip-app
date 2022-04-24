# Oracle Master

## Overview
The Oracle Master acts as the addressbook for oracle relays. The VaultController can call the getLivePrice() to fecth the price of an asset and this contract will route that call to the appropriate oracle relay.

## Functions
* function getLivePrice(address token_address) external view override returns (uint256)
    * Gets the current price of the oracle registered for a token. 
* function set_relay(address token_address, address relay_address) public override onlyOwner
    * Sets the relay for a token address to it's relay oracle address.
* function pause_relay(address token_address, bool state) public override onlyOwner
    * Pauses the relay for a token address.

