import { InjectedConnector } from "@web3-react/injected-connector";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { FrameConnector } from '@web3-react/frame-connector';
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

import { LedgerConnector } from "@web3-react/ledger-connector";
import { TorusConnector } from '@web3-react/torus-connector';

export enum WalletType {
  INJECTED = "injected", // browser wallets (metamask)
  WALLET_LINK = 'wallet_link', // Coinbase
  WALLET_CONNECT = 'wallet_connect', // Wallet Connect
  TORUS = 'torus',
  FRAME = 'frame',
  LEDGER = 'ledger',
}

const appName = 'IP'
const rpc_url = 'https://mainnet.infura.io/v3/c21cd0dd200645f39a51d41368b956d9'

export const getWallet = (wallet: WalletType, chainId: number | undefined): AbstractConnector => {
  switch (wallet) {
    case WalletType.INJECTED:
      return new InjectedConnector({});
    case WalletType.WALLET_LINK:

      // Need to test on non gitpod
      const CoinbaseWallet = new WalletLinkConnector({
        url: rpc_url,
        appName: "IP",
        supportedChainIds: [1],
      });

      console.log(CoinbaseWallet)
      return CoinbaseWallet

    case WalletType.WALLET_CONNECT:

      return new WalletConnectConnector({
        rpc: rpc_url,
        bridge: "https://ip.bridge.walletconnect.org",
        qrcode: true
      });
    case WalletType.FRAME:
      return new FrameConnector({ supportedChainIds: [1] });

    case WalletType.LEDGER:
      return new LedgerConnector({ chainId: 1, url: rpc_url, pollingInterval: 12000 });

    case WalletType.TORUS:
      return new TorusConnector({
        chainId: chainId || 1
      });


    default: {
      throw new Error(`unsupported wallet`);
    }
  }
};
