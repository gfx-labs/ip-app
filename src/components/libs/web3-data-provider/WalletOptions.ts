import { InjectedConnector } from "@web3-react/injected-connector";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { FrameConnector } from '@web3-react/frame-connector';
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

import { LedgerConnector } from "@web3-react/ledger-connector";
//import { TorusConnector } from '@web3-react/torus-connector';

export enum WalletType {
    INJECTED = "injected", // browser wallets (metamask)
    WALLET_LINK = 'wallet_link', // Coinbase
    WALLET_CONNECT = 'wallet_connect', // Wallet Connect
    //  TORUS = 'torus',
    FRAME = 'frame',
    LEDGER = 'ledger',
}

const appName = 'IP'
const rpc_url = 'https://cloudflare-eth.com'


export const getWallet = (wallet: WalletType, chainId: number | undefined = 1): AbstractConnector => {
    switch (wallet) {
        case WalletType.INJECTED:
            return new InjectedConnector({});
        case WalletType.WALLET_LINK:
            return new WalletLinkConnector({
                url: rpc_url,
                appName,
                appLogoUrl: 'https://interestprotocol.io/images/ip_green.svg',
                supportedChainIds: [1, 3, 4, 5, 42],
            });

        case WalletType.WALLET_CONNECT:
            return new WalletConnectConnector({
                rpc: {
                    1: rpc_url
                },
                bridge: "https://app.bridge.walletconnect.org",
                qrcode: true
            });
        case WalletType.FRAME:
            return new FrameConnector({ supportedChainIds: [1, ] });

        // case WalletType.LEDGER:
        //   return new LedgerConnector({ chainId: 1, url: rpc_url, pollingInterval: 12000 });

        default: {
            throw new Error(`unsupported wallet`);
        }
    }
};
