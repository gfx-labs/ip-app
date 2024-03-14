import { ChainIDs } from './chains'
import { TokenInfo, UniPosition } from './tokens'

export const tickerToName: {[index: string]: string} = {
  WBTC: 'Wrapped Bitcoin',
  WETH: 'Wrapped ETH',
  stETH: 'Lido Staked Ether',
  wstETH: 'Wrapped stETH',
  cbETH: 'Coinbase Wrapped Staked ETH',
  UNI: 'Uniswap',
  MATIC: 'Polygon',
  ENS: 'Ethereum Name Service',
  BAL: 'Balancer',
  DYDX: 'dYdX',
  CRV: 'Curve',
  LDO: 'Lido DAO',
  LINK: 'Chainlink',
  OP: 'Optimism',
  rETH: 'Rocket Pool ETH',
  AAVE: 'Aave',
  CHAI: 'Chai',
  ZRX: '0x Protocol',
  YFI: 'yearn.finance',
  B_stETH: 'wstETH-WETH Pool',
  MKR: 'Maker',
  RPL: 'Rocket Pool',
  wOETH: 'Wrapped Origin Ether',
  OETH: 'Origin Ether',
  AUSDC: 'Aave USDC.e'
}

// if token has an address on a chain, it means it is enabled on that chain
// use undefined if it is not enabled on a chain
// if a token has a capped address it also has to have a normal address
export const tokensToChains: {[key: string]: Record<ChainIDs, TokenInfo>} = {
  WBTC: {
    [ChainIDs.MAINNET]: {addr:'0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
                          decimals: 8},
    [ChainIDs.OPTIMISM]: {addr: '0x68f180fcCe6836688e9084f035309E29Bf0A2095', 
                          capped_addr: '0x5a83002E6d8dF75c79ADe9c209F21C31B0AB14B2',
                          decimals: 18},
  },
  WETH: {
    [ChainIDs.MAINNET]: {addr: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'},
    [ChainIDs.OPTIMISM]: {addr: '0x4200000000000000000000000000000000000006', 
                          capped_addr: '0x696607447225f6690883e718fd0Db0Abaf36B6E2'},
  },
  stETH: {
    [ChainIDs.MAINNET]: {addr: '0xae7ab96520de3a18e5e111b5eaab095312d7fe84'},
    [ChainIDs.OPTIMISM]: {},
  },
  wstETH: {
    [ChainIDs.MAINNET]: {},
    [ChainIDs.OPTIMISM]: {addr: '0x1F32b1c2345538c0c6f582fCB022739c4A194Ebb', 
                          capped_addr: '0xE1442bA08e330967Dab4fd4Fc173835e9730bff6'},
  },
  cbETH: {
    [ChainIDs.MAINNET]: {addr: '0xbe9895146f7af43049ca1c1ae358b0541ea49704',
                         capped_addr: '0x99bd1f28a5A7feCbE39a53463a916794Be798FC3'},
    [ChainIDs.OPTIMISM]: {},
  },
  rETH: {
    [ChainIDs.MAINNET]: {addr: '0xae78736cd615f374d3085123a210448e74fc6393',
                         capped_addr: '0x64eA012919FD9e53bDcCDc0Fc89201F484731f41'},
    [ChainIDs.OPTIMISM]: {addr: '0x9Bcef72be871e61ED4fBbc7630889beE758eb81D',
                          capped_addr: '0x399bA3957D0e5F6e62836506e760787FDDFb01c3'},
  },
  UNI: {
    [ChainIDs.MAINNET]: {addr: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
                         can_delegate: true},
    [ChainIDs.OPTIMISM]: {},
  },
  MATIC: {
    [ChainIDs.MAINNET]: {addr: '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',
                         capped_addr: '0x5aC39Ed42e14Cf330A864d7D1B82690B4D1B9E61'},
    [ChainIDs.OPTIMISM]: {},
  },
  ENS: {
    [ChainIDs.MAINNET]: {addr: '0xc18360217d8f7ab5e7c516566761ea12ce7f9d72',
                         capped_addr: '0xfb42f5afb722d2b01548f77c31ac05bf80e03381',
                         can_delegate: true},
    [ChainIDs.OPTIMISM]: {},
  },
  AAVE: {
    [ChainIDs.MAINNET]: {addr: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
                         capped_addr: '0xd3bd7a8777c042De830965de1C1BCC9784135DD2',
                         can_delegate: true},
    [ChainIDs.OPTIMISM]: {},
  },
  BAL: {
    [ChainIDs.MAINNET]: {addr: '0xba100000625a3754423978a60c9317c58a424e3D',
                         capped_addr: '0x05498574BD0Fa99eeCB01e1241661E7eE58F8a85'},
    [ChainIDs.OPTIMISM]: {},
  },
  DYDX: {
    [ChainIDs.MAINNET]: {addr: '0x92d6c1e31e14520e676a687f0a93788b716beff5',
                         capped_addr: '0xDDB3BCFe0304C970E263bf1366db8ed4DE0e357a',
                         can_delegate: true},
    [ChainIDs.OPTIMISM]: {},
  },
  CRV: {
    [ChainIDs.MAINNET]: {addr: '0xd533a949740bb3306d119cc777fa900ba034cd52',
                         capped_addr: '0x9d878eC06F628e883D2F9F1D793adbcfd52822A8'},
    [ChainIDs.OPTIMISM]: {},
  },
  LDO: {
    [ChainIDs.MAINNET]: {addr: '0x5a98fcbea516cf06857215779fd812ca3bef1b32',
                         capped_addr: '0x7C1Caa71943Ef43e9b203B02678000755a4eCdE9'},
    [ChainIDs.OPTIMISM]: {},
  },
  ZRX: {
    [ChainIDs.MAINNET]: {addr: '0xE41d2489571d322189246DaFA5ebDe1F4699F498',
                         capped_addr: '0xDf623240ec300fD9e2B7780B34dC2F417c0Ab6D2'},
    [ChainIDs.OPTIMISM]: {},
  },
  CHAI: {
    [ChainIDs.MAINNET]: {addr: '0x06AF07097C9Eeb7fD685c692751D5C66dB49c215',
                         capped_addr: '0xDdAD1d1127A7042F43CFC209b954cFc37F203897'},
    [ChainIDs.OPTIMISM]: {},
  },
  YFI: {
    [ChainIDs.MAINNET]: {addr: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
                         capped_addr: '0xe2C1d2E7aA4008081CAAFc350A040246b9EBB579'},
    [ChainIDs.OPTIMISM]: {},
  },
  LINK: {
    [ChainIDs.MAINNET]: {addr: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
                         capped_addr: '0x5F39aD3df3eD9Cf383EeEE45218c33dA86479165'},
    [ChainIDs.OPTIMISM]: {},
  },
  OP: {
    [ChainIDs.MAINNET]: {},
    [ChainIDs.OPTIMISM]: {addr: '0x4200000000000000000000000000000000000042',
                          capped_addr: '0xb549c8cc8011CA0d023A73DAD54d725125b25F31',
                          can_delegate: true},
  },
  B_stETH: {
    [ChainIDs.MAINNET]: {addr: '0x32296969Ef14EB0c6d29669C550D4a0449130230',
                         capped_addr: '0x7d3CD037aE7efA9eBed7432c11c9DFa73519303d',
                         bpt: true,
                         icons: ['wstETH', 'WETH']},
    [ChainIDs.OPTIMISM]: {},
  },
  MKR: {
    [ChainIDs.MAINNET]: {addr: '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2',
                         capped_addr: '0xbb5578c08bC08c15AcE5cd09c6683CcCcB2A9148',
                         can_delegate: true},
    [ChainIDs.OPTIMISM]: {},
  },
  RPL: {
    [ChainIDs.MAINNET]: {addr: '0xD33526068D116cE69F19A9ee46F0bd304F21A51f',
                         capped_addr: '0x6b68C5708DAffD0393aCC6A8cc92f8C2146346Ae'},
    [ChainIDs.OPTIMISM]: {},
  },
  wOETH: {
    [ChainIDs.MAINNET]: {addr: '0xDcEe70654261AF21C44c093C300eD3Bb97b78192',
                         capped_addr: '0x739D346421a42beb13FD8D560dd2F42250d4Ac88',
                         can_wrap: true,
                         unwrapped: 'OETH'},
    [ChainIDs.OPTIMISM]: {},
  },
  OETH: {
    [ChainIDs.MAINNET]: {addr: '0x856c4Efb76C1D1AE02e20CEB03A2A6a08b0b8dC3',
                         can_wrap: true,
                         unwrapped: 'wOETH',
                         display: false},
    [ChainIDs.OPTIMISM]: {},
  },
  AUSDC: {
    [ChainIDs.MAINNET]: {},
    [ChainIDs.OPTIMISM]: {addr: '0x625E7708f30cA75bfd92586e17077590C60eb4cD',
                          capped_addr: '0x6F7A2f0d9DBd284E274f28a6Fa30e8760C25F9D2',
                        decimals: 6},
  },
}

export const UniPoolAddresses: {[index: string]: UniPosition} = {
  'WETH/USDC500': {
    name: 'Uniswap WETH/USDC 0.05%',
    address: '0x7131ff92a3604966d7d96ccc9d596f7e9435195c',
    token0: 'WETH',
    token1: 'USDC',
    pool: '0x85149247691df622eaF1a8Bd0CaFd40BC45154a9',
    fee: 500
  }
}