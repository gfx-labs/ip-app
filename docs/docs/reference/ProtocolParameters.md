# Governance Defined Parameters in Interest Protocol

## Protocol Parameters
### Interst Rate Curve
* 1st kink (s1): 40%
* 2nd kink (s2): 60%
* 1st kink rate (r1): 0.5%
* 2nd kink rate (r2): 10%
* Max rate (r3): 600%

### Fee Parameter
* Protocol Fee: 15%


## Asset Parameters
### Collateral Assset Parameters
* wETH: LTV: 85%, oracle address: 0x65dA327b1740D00fF7B366a4fd8F33830a2f03A2, liquidation incentive: 5%
* wBTC: LTV: 80%, oracle address: 0x8E7d39560b15B2D29E01b2502252C4B5f26f5326, liquidation incentive: 5%
* UNI: LTV: 55%, oracle address: 0xCE554405b9a257eD00A4e0f114fF12ab832b4e3B, liquidation incentive: 15%

### wETH Oracle
* AnchoredViewRelay: widthNumerator: 20
* AnchoredViewRelay: widthDenominator: 100
* UniswapV3OracleRelay: lookback: 7200
* UniswapV3OracleRelay: _mul: 1000000000000
* UniswapV3OracleRelay: _div: 1
* UniswapV3OracleRelay: _quoteTokenIsToken0: true
* UniswapV3OracleRelay: _pool: 0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8
* ChainlinkOracleRelay: feed_address: 0x38c5aa75c2e1ecb9750aa2d882adb55742ac967a
* ChainlinkOracleRelay: mul: 1000000000000
* ChainlinkOracleRelay: div: 1

### wBTC Oracle
* AnchoredViewRelay: widthNumerator: 20
* AnchoredViewRelay: widthDenominator: 100
* UniswapV3OracleRelay: lookback: 7200
* UniswapV3OracleRelay: _mul: 1000000000000
* UniswapV3OracleRelay: _div: 1
* UniswapV3OracleRelay: _quoteTokenIsToken0: false
* UniswapV3OracleRelay: _pool: 0x99ac8ca7087fa4a2a1fb6357269965a2014abc35
* ChainlinkOracleRelay: feed_address: 0x8790784510829cc6398a75b40668b30e9f3e22ac
* ChainlinkOracleRelay: mul: 100000000000000000000
* ChainlinkOracleRelay: div: 1

### UNI Oracle
* AnchoredViewRelay: widthNumerator: 40
* AnchoredViewRelay: widthDenominator: 100
* UniswapV3OracleRelay: lookback: 14400
* UniswapV3OracleRelay: _mul: 1000000000000
* UniswapV3OracleRelay: _div: 1
* UniswapV3OracleRelay: _quoteTokenIsToken0: false
* UniswapV3OracleRelay: _pool: 0xd0fc8ba7e267f2bc56044a7715a489d851dc6d78
* ChainlinkOracleRelay: feed_address: 0x1Ea3889f3c0Ad7de9Bcc7c5f13a668B0B4874344
* ChainlinkOracleRelay: mul: 10000000000
* ChainlinkOracleRelay: div: 1

### stETH Oracle
* AnchoredViewRelay: widthNumerator: 10
* AnchoredViewRelay: widthDenominator: 100
* stETHOrcleRelay: _mul: 1
* stETHOrcleRelay: _div: 1
* ChainlinkOracleRelay: feed_address: 0xa9dd6fb60c84cc4788b02c45b6b3f59f8444674f
* ChainlinkOracleRelay: mul: 10000000000
* ChainlinkOracleRelay: div: 1

### MATIC Oracle
* AnchoredViewRelay: widthNumerator: 10
* AnchoredViewRelay: widthDenominator: 100
* UniswapV3OracleRelay: lookback: 14400
* UniswapV3OracleRelay: _mul: 1000000000000
* UniswapV3OracleRelay: _div: 1
* UniswapV3OracleRelay: _quoteTokenIsToken0: false
* UniswapV3OracleRelay: _pool: 0xfe1cb3221f13a9c2aa67d29a2b7198e59de2f3b2
* ChainlinkOracleRelay: feed_address: 0xFC6b554818466A53806Bb7eb319621D97b851D94
* ChainlinkOracleRelay: mul: 10000000000
* ChainlinkOracleRelay: div: 1

## Governance Parameters
* proposalThreshold: 1,000,000

### Proposal Parameters
* votingDelay (blocks): 13140
* votingPeriod (blocks): 40320
* proposalTimelockDelay (seconds): 172800
* quorumVotes: 10,000,000

### Emergency Parameters
* emergencyVotingPeriod (blocks): 6570
* emergencyVotingTimelockDelay (seconds): 43200
* emergencyQuorumVotes: 40,000,000

### Optimistic Parameters
* optimisticVotingDelay (blocks): 25600  
* optimisticQuorum: 2,000,000
* whitelist guardian: not set (can be set by governance)

