# ThreeLines0_100

## Overview

The interest rate curve math for USDi is a piecewise linear function which returns the borrow rate from the input of the reserve ratio. To learn more about the interest rate curve and the math involved please see the whitepaper. 

More information on governance available [here](../../../concepts/Borrowing/InterestRates).

## Constructor
The variables: r for rate and s for reserve ratio
* _r0: the rate at full utilization.
* _r1: the rate at the first kink
* _r2: the rate at the second kink
* _s1: the first kink
* _s2: the the second kink 

## Functions
* function valueAt(int256 x_value) external view override returns (int256)
    * Returns an interest rate based upon the entered reserve ratio.
* function linearInterpolation(int256 rise, int256 run, int256 distance, int256 b) private pure returns (int256)
    * helper math function to valueAt


