# Oracle Master

## Overview
The Oracle Master acts as the addressbook for oracle relays. The VaultController can call the getLivePrice() to fecth the price of an asset and this contract will route that call to the appropriate oracle relay.

More information on governance can be found [here](../../../concepts/Borrowing/OracleSystem).

## Secondary contracts
* Ownable so the owner can manage the contract as needed.

## Constructor
* Ownable()

## Functions
* function getLivePrice(address token_address) external view override returns (uint256)
    * Gets the current price of the oracle registered for a token. 
* function setRelay(address token_address, address relay_address) public override onlyOwner
    * Sets the relay for a token address to it's relay oracle address.
* function pauseRelay(address token_address, bool state) public override onlyOwner
    * Pauses the relay for a token address.

