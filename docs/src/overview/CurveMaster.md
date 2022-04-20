# CurveMaster

## Overview
The CurveMaster is responsible for managing the various interest rate curves utilized in Interest Protocol. 

## Functions
* function set_curve(address token_address, address curve_address) public onlyOwner
    * To add a new feborrow rate curve to the protocol. 
* function get_value_at(address curve_address, int256 x_value) external view override returns (int256)
    * Returns the borrow rate for a specified reserve asset and reserve ratio.