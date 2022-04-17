# ThreeLines0_100

## Overview

The interest rate curve math for USDi is a piecewise linear function which returns the borrow rate from the input of the reserve ratio.

The variables: r for rate and s for reserve ratio
* _r0: the rate at full utilization.
* _r1: the rate at the second kink
* _r2: the rate at the first kink
* _r3:
* _s0: the second kink
* _s1: the the first kink 

![](https://i.imgur.com/0gKHGQ5.png)


* function valueAt(int256 x_value) external view override returns (int256)
    * Returns the rate from an entered reserve ratio.
* function linearInterpolation(int256 rise,int256 run,int256 distance,int256 b)
    * helper math function to valueAt

