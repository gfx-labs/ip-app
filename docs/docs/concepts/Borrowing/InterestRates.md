# Interest Rates

All USDi borrowers pay a single borrowing interest rate that varies depending on the current reserve ratio. The interest paid by borrowers, net of a protocol fee, is distributed pro rata to all USDi holders.

## Reserve Ratio

The *reserve ratio* is defined as

\frac{USDC in protocol reserve}{USDi total supply}.

The reserve ratio measures the amount of USDC liquidity that the protocol currently has to meet the potential redemption demand of USDi holders.

## Interest Rate
The borrow APR is a decreasing function of the reserve ratio and is defined as follows:

	r_B (s)= \begin{cases}
		r_3+\frac{r_2-r_3}{s_2}s & \text{ if } 0\leq s \leq s_2\\
		r_2+\frac{r_1-r_2}{s_1-s_2}(s-s_2) & \text{ if } s_2<s\leq s_1\\
		r_1 & \text{ if } s_1\leq s\leq 1,
	\end{cases}

The function has two kinks, at (s_1,r_1) and (s_2,r_2). The interval [s1,s2] is the range of reserve ratios that the protocol targets. The current parameters are given by the tables below.

| $s_1$ | $s_2$ |
|-------|-------|
| 60%   | 40%   |

| $r_1$ | $r_2$ | r_3$ |
|-------|-------|------|
| 0.5%  | 10%   | 200% |


Given the protocol fee rate of $f$, the deposit rate is determined as follows:

	\text{Deposit rate at reserve ratio $s$}= \text{Borrow rate at reserve ratio $s$}\times (1-s) \times (1-f).

The figure below plots the borrow and deposit rates at each level of reserve ratio:

![interestRateCurve](./rateCurve.png)

