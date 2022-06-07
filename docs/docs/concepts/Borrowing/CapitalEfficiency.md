# Capital Efficiency of Interest Protocol

One of Interest Protocol's greatest advantages is its capital efficiency. Rather than lending out the USDC that users deposit, Interest Protocol keeps the USDC in reserve, and mints and lends out USDi against the USDC reserve. Compared to protocols that directly lend out USDC, this allows Interest Protocol to generate more loans from the same amount of capital while incurring less liquidity risk.

To illustrate this, suppose 1 USDC has been supplied to Compound, Aave, and Interest Protocol. How much loans can each protocol generate at a given level of interest rate? In other words, what utilization rate can each protocol achieve at a given level of interest rate? The following figure answers this question, using the current parameters of the three protocols.

Figure 4


At _any_ level of borrow APR, Interest Protocol has a higher utilization rate than Compound or Aave. In other words, given any borrow APR, Interest Protocol lends out more using the same amount of USDC. In fact, Compound and Aave by design cannot go above 100% utilization rate. In contrast, Interest Protocol has no upper bound on the utilization rate.

One might ask if Interest Protocol is simply taking more risk than Compound or Aave. This is not the case. Let us define *liquidity risk* as the percentage of deposits that
are not immediately redeemable for the underlying USDC. For Interest Protocol, this is 
