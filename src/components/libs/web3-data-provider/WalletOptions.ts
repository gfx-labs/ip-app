import { InjectedConnector } from '@web3-react/injected-connector'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { Chains } from '../../../chain/chains'

export enum WalletType {
  INJECTED = 'injected', // browser wallets (metamask)
  WALLET_LINK = 'wallet_link', // Coinbase
  WALLET_CONNECT = 'wallet_connect', // Wallet Connect
}

const appName = 'IP'

export const getWallet = (
  wallet: WalletType,
  chainId: number
): AbstractConnector => {
  switch (wallet) {
    case WalletType.INJECTED:
      return new InjectedConnector({})

    case WalletType.WALLET_LINK:
      return new WalletLinkConnector({
        url: Chains[chainId].rpc,
        appName,
        appLogoUrl: 'https://interestprotocol.io/images/ip_green.svg',
        supportedChainIds: [1, 3, 4, 5, 10, 42],
      })

    case WalletType.WALLET_CONNECT:
      return new WalletConnectConnector({
        rpc: {
          1: Chains[1].rpc,
          10: Chains[10].rpc
        },
        bridge: 'https://app.bridge.walletconnect.org',
        qrcode: true,
      })
    default: {
      throw new Error(`Unsupported wallet`)
    }
  }
}
