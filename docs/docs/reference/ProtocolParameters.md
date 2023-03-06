# Governance Defined Parameters in Interest Protocol

## Governance Parameters
* proposalThreshold: 200,000

### Proposal Parameters
* votingDelay (blocks): 13140
* votingPeriod (blocks): 40320
* proposalTimelockDelay (seconds): 172800
* quorumVotes: 2,000,000

### Emergency Parameters
* emergencyVotingPeriod (blocks): 6570
* emergencyVotingTimelockDelay (seconds): 43200
* emergencyQuorumVotes: 40,000,000

### Optimistic Parameters
* optimisticVotingDelay (blocks): 25600  
* optimisticQuorum: 500,000
* whitelist guardian: not set (can be set by governance)

## Protocol Parameters
### Interst Rate Curve
* 1st kink (s1): 25%
* 2nd kink (s2): 50%
* 1st kink rate (r1): 0.5%
* 2nd kink rate (r2): 10%
* Max rate (r3): 200%

### Fee Parameter
* Protocol Fee: 15%

## Asset Parameters
### Collateral Assset Parameters
* wETH: LTV: 85%, oracle address: 0x65dA327b1740D00fF7B366a4fd8F33830a2f03A2, liquidation incentive: 5%
* wBTC: LTV: 80%, oracle address: 0x8E7d39560b15B2D29E01b2502252C4B5f26f5326, liquidation incentive: 5%
* UNI: LTV: 55%, oracle address: 0xCE554405b9a257eD00A4e0f114fF12ab832b4e3B, liquidation incentive: 15%
* MATIC: LTV: 80%, oracle address: 0x8BfE7aE486250dBf2901843Cc73B91843c2879de, liquidation incentive: 8%
* stETH: LTV: 75%, oracle address: 0x73052741d8bE063b086c4B7eFe084B0CEE50677A, liquidation incentive: 10%
* ENS: LTV: 70%, oracle address: 0x6DB54416CBB28C6a78F606947df53E83Dd69eb70, liquidation incentive: 10%
* AAVE: LTV: 70%, oracle address: 0x27FC4059860F3d9758DCC9a871838F06333fc6ed, liquidation incentive: 10%
* BAL: LTV: 70%, oracle address: 0xf5E0e2827F60580304522E2C38177DFeC7a428a4, liquidation incentive: 10%
* DYDX: LTV: 70%, oracle address: 0x93A3411c9518D9c85054693137c87C5F14E7ECF9, liquidation incentive: 10%
* CRV: LTV: 70%, oracle address: 0x864991b13691806be077E7Ca9ef566FE7762F908, liquidation incentive: 10%
* LDO: LTV: 70%, oracle address: 0x610d4DFAC3EC32e0be98D18DDb280DACD76A1889, liquidation incentive: 10%
* cbETH: LTV: 75%, oracle address: 0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2, liquidation incentive: 10%
* rETH: LTV: 75%, oracle address: 0x69F3d75Fa1eaA2a46005D566Ec784FE9059bb04B, liquidation incentive: 10%
* ZRX: LTV: 50%, oracle address: 0xEF12fa3183362506A2dd0ff1CF06b2f4156e751E, liquidation incentive: 15%

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

### stETH Oracle
* AnchoredViewRelay: widthNumerator: 10
* AnchoredViewRelay: widthDenominator: 100
* AnchoredViewRelay: _anchorAddress: 0xAa2639C9Dcf71547e585439E8744128ED9832FE8
* AnchoredViewRelay: _mainAddress: 0xa9DD6FB60c84cc4788b02c45B6B3f59f8444674f
* StEthOracleRelay: _divide: 1
* StEthOracleRelay: _multiply: 1
* StEthOracleRelay: _oracle: 0xf4818813045E954f5Dc55a40c9B60Def0ba3D477
* ChainlinkOracleRelay: mul: 10000000000
* ChainlinkOracleRelay: div: 1
* ChainlinkOracleRelay: feedAddress: 0xcfe54b5cd566ab89272946f602d76ea879cab4a8

### ENS Oracle
* AnchoredViewRelay: _anchorAddress: 0x81f66181AB16FAa6f24FAc2593Fda31bC19FFffa
* AnchoredViewRelay: _mainAddress: 0x195fC62c513e5163E24CF47Ad626Bc630c3B3a5d
* AnchoredViewRelay: widthNumerator: 25
* AnchoredViewRelay: widthDenominator: 100
* UniswapV3OracleRelay: _div: 1
* UniswapV3OracleRelay: lookback: 14400
* UniswapV3OracleRelay: _mul: 1
* UniswapV3OracleRelay: _pool: 0x92560C178cE069CC014138eD3C2F5221Ba71f58a
* UniswapV3OracleRelay: _quoteTokenIsToken0: True
* UniswapV3OracleRelay: ethOracle: 0x22B01826063564CBe01Ef47B96d623b739F82Bf2
* ChainlinkOracleRelay: mul: 10000000000
* ChainlinkOracleRelay: div: 1
* ChainlinkOracleRelay: feedAddress: 0x5c00128d4d1c2f4f652c267d7bcdd7ac99c16e16

### BAL Oracle
* AnchoredViewRelay: _anchorAddress: 0x9C3b60A1ad08740fCD842351ff0960C1Ee3FeA52
* AnchoredViewRelay: _mainAddress: 0xe53B24294F74018D974F7e47b7d49B6dF195387F
* AnchoredViewRelay: widthNumerator: 25
* AnchoredViewRelay: widthDenominator: 100
* UniswapV3OracleRelay: _div: 1
* UniswapV3OracleRelay: lookback: 14400
* UniswapV3OracleRelay: _mul: 1
* UniswapV3OracleRelay: _pool: 0xDC2c21F1B54dDaF39e944689a8f90cb844135cc9
* UniswapV3OracleRelay: _quoteTokenIsToken0: False
* UniswapV3OracleRelay: ethOracle: 0x22B01826063564CBe01Ef47B96d623b739F82Bf2
* ChainlinkOracleRelay: feed_address: 0xFC6b554818466A53806Bb7eb319621D97b851D94
* ChainlinkOracleRelay: mul: 10000000000
* ChainlinkOracleRelay: div: 1
* ChainlinkOracleRelay: feedAddress: 0xdf2917806e30300537aeb49a7663062f4d1f2b5f

### AAVE Oracle
* AnchoredViewRelay: _anchorAddress: 0xcA9e15Eb362388FFC537280fAe93f35b4A3f230c
* AnchoredViewRelay: _mainAddress: 0x706d1bb99d8ed5B0c02c5e235D8E3f2a406Ad429
* AnchoredViewRelay: widthNumerator: 25
* AnchoredViewRelay: widthDenominator: 100
* UniswapV3OracleRelay: _div: 1
* UniswapV3OracleRelay: lookback: 14400
* UniswapV3OracleRelay: _mul: 1
* UniswapV3OracleRelay: _pool: 0x5aB53EE1d50eeF2C1DD3d5402789cd27bB52c1bB
* UniswapV3OracleRelay: _quoteTokenIsToken0: False
* UniswapV3OracleRelay: ethOracle: 0x22B01826063564CBe01Ef47B96d623b739F82Bf2
* ChainlinkOracleRelay: feed_address: 0xFC6b554818466A53806Bb7eb319621D97b851D94
* ChainlinkOracleRelay: mul: 10000000000
* ChainlinkOracleRelay: div: 1
* ChainlinkOracleRelay: feedAddress: 0x547a514d5e3769680ce22b2361c10ea13619e8a9

### LDO Oracle
* AnchoredViewRelay: _anchorAddress: 0xcD17f6766Cdff24a4642b99f0DE481c3E704EA39
* AnchoredViewRelay: _mainAddress: 0x9816d7C448f79CdD4aF18c4Ae1726A14299E8C75
* AnchoredViewRelay: widthNumerator: 20
* AnchoredViewRelay: widthDenominator: 100
* UniswapV3OracleRelay: _div: 1
* UniswapV3OracleRelay: lookback: 14400
* UniswapV3OracleRelay: _mul: 1
* UniswapV3OracleRelay: _pool: 0xf4aD61dB72f114Be877E87d62DC5e7bd52DF4d9B
* UniswapV3OracleRelay: _quoteTokenIsToken0: False
* UniswapV3OracleRelay: ethOracle: 0x22B01826063564CBe01Ef47B96d623b739F82Bf2
* ChainlinkOracleRelay: feed_address: 0xFC6b554818466A53806Bb7eb319621D97b851D94
* ChainlinkOracleRelay: mul: 10000000000
* ChainlinkOracleRelay: div: 1
* ChainlinkOracleRelay: feedAddress: 0x4e844125952d32acdf339be976c98e22f6f318db

### DYDX Oracle
* AnchoredViewRelay: _anchorAddress: 0x7FFF1525B560cf5Da9e9c72736bCC7A908b140D4
* AnchoredViewRelay: _mainAddress: 0x8C8AE22fea16C43743C846902eC7E34204894189
* AnchoredViewRelay: widthNumerator: 20
* AnchoredViewRelay: widthDenominator: 100
* UniswapV3OracleRelay: _div: 1
* UniswapV3OracleRelay: lookback: 14400
* UniswapV3OracleRelay: _mul: 1
* UniswapV3OracleRelay: _pool: 0xe0CfA17aa9B8f930Fd936633c0252d5cB745C2C3
* UniswapV3OracleRelay: _quoteTokenIsToken0: False
* UniswapV3OracleRelay: ethOracle: 0x22B01826063564CBe01Ef47B96d623b739F82Bf2
* ChainlinkOracleRelay: feed_address: 0xFC6b554818466A53806Bb7eb319621D97b851D94
* ChainlinkOracleRelay: mul: 10000000000
* ChainlinkOracleRelay: div: 1
* ChainlinkOracleRelay: feedAddress: 0x478909D4D798f3a1F11fFB25E4920C959B4aDe0b

### CRV Oracle
* AnchoredViewRelay: _anchorAddress: 0xfD76D7EcbF91b2bF7F225af29C1cb7f213fA71b6
* AnchoredViewRelay: _mainAddress: 0xb549c8cc8011CA0d023A73DAD54d725125b25F31
* AnchoredViewRelay: widthNumerator: 20
* AnchoredViewRelay: widthDenominator: 100
* UniswapV3OracleRelay: _div: 1
* UniswapV3OracleRelay: lookback: 14400
* UniswapV3OracleRelay: _mul: 1
* UniswapV3OracleRelay: _pool: 0x4c83A7f819A5c37D64B4c5A2f8238Ea082fA1f4e
* UniswapV3OracleRelay: _quoteTokenIsToken0: True
* UniswapV3OracleRelay: ethOracle: 0x22B01826063564CBe01Ef47B96d623b739F82Bf2
* ChainlinkOracleRelay: feed_address: 0xFC6b554818466A53806Bb7eb319621D97b851D94
* ChainlinkOracleRelay: mul: 10000000000
* ChainlinkOracleRelay: div: 1
* ChainlinkOracleRelay: feedAddress: 0xcd627aa160a6fa45eb793d19ef54f5062f20f33f


### cbETH Oracle
* AnchoredViewRelay: _anchorAddress: 0x9128bA6B88a3851d6aa856aadE7dA0Bb694560Db
* AnchoredViewRelay: _mainAddress: 0xA8c7eaeD981c433A7424ce244d753A69d4e24363
* AnchoredViewRelay: widthNumerator: 10
* AnchoredViewRelay: widthDenominator: 100
* UniswapV3OracleRelay: _div: 1
* UniswapV3OracleRelay: lookback: 14400
* UniswapV3OracleRelay: _mul: 1
* UniswapV3OracleRelay: _pool: 0x840DEEef2f115Cf50DA625F7368C24af6fE74410
* UniswapV3OracleRelay: _quoteTokenIsToken0: False
* UniswapV3OracleRelay: ethOracle: 0x22B01826063564CBe01Ef47B96d623b739F82Bf2
* ChainlinkOracleRelay: feed_address: 0xFC6b554818466A53806Bb7eb319621D97b851D94
* ChainlinkOracleRelay: mul: 10000000000
* ChainlinkOracleRelay: div: 1
* ChainlinkOracleRelay: feedAddress: 0x67eF3CAF8BeB93149F48e8d20920BEC9b4320510

### rETH Oracle
* AnchoredViewRelay: _anchorAddress: 0x6e55a6e8a1f37426b22039776431e4d20798D9C1
* AnchoredViewRelay: _mainAddress: 0xd829adF0FB755f38d1d691f822619C3fBaa5ccD0
* AnchoredViewRelay: widthNumerator: 10
* AnchoredViewRelay: widthDenominator: 100
* UniswapV3OracleRelay: _div: 1
* UniswapV3OracleRelay: lookback: 14400
* UniswapV3OracleRelay: _mul: 1
* UniswapV3OracleRelay: _pool: 0xa4e0faA58465A2D369aa21B3e42d43374c6F9613
* UniswapV3OracleRelay: _quoteTokenIsToken0: False
* UniswapV3OracleRelay: ethOracle: 0x22B01826063564CBe01Ef47B96d623b739F82Bf2
* BalancerPeggedAssetRelay: _divide: 1
* BalancerPeggedAssetRelay: _multiply: 1
* BalancerPeggedAssetRelay: _secs: 14400
* BalancerPeggedAssetRelay: _underlyingOracle: 0x22B01826063564CBe01Ef47B96d623b739F82Bf2

### ZRX Oracle
* AnchoredViewRelay: _anchorAddress: 0xCfae22EAD912F7F8299113915bEC0c92F98Cd4a7
* AnchoredViewRelay: _mainAddress: 0x8cd06C41617B0882A2a5D1334BdE48664fD89b5A
* AnchoredViewRelay: widthNumerator: 20
* AnchoredViewRelay: widthDenominator: 100
* UniswapV3OracleRelay: _div: 1
* UniswapV3OracleRelay: lookback: 14400
* UniswapV3OracleRelay: _mul: 1
* UniswapV3OracleRelay: _pool: 0x14424eEeCbfF345B38187d0B8b749E56FAA68539
* UniswapV3OracleRelay: _quoteTokenIsToken0: True
* UniswapV3OracleRelay: ethOracle: 0x22B01826063564CBe01Ef47B96d623b739F82Bf2
* ChainlinkOracleRelay: feed_address: 0xFC6b554818466A53806Bb7eb319621D97b851D94
* ChainlinkOracleRelay: mul: 10000000000
* ChainlinkOracleRelay: div: 1
* ChainlinkOracleRelay: feedAddress: 0x2da4983a622a8498bb1a21fae9d8f6c664939962
