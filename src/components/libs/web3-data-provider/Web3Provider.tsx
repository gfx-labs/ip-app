import React, { useCallback, useContext, useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

import { getWallet, WalletType } from "./WalletOptions";
import { JsonRpcProvider, TransactionResponse } from "@ethersproject/providers";
import { BigNumber, providers } from "ethers";

import { SignatureLike } from "@ethersproject/bytes";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { useWalletModalContext } from "../wallet-modal-provider/WalletModalProvider";
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { TorusConnector } from '@web3-react/torus-connector';

type transactionType = {
  value?: string | undefined;
  from?: string | undefined;
  to?: string | undefined;
  nonce?: number | undefined;
  gasLimit?: BigNumber | undefined;
  gasPrice?: BigNumber | undefined;
  data?: string | undefined;
  chainId?: number | undefined;
};

export type ERC20TokenType = {
  address: string;
  symbol: string;
  decimals: number;
  image?: string;
  aToken?: boolean;
};

export type Web3Data = {
  connectWallet: (wallet: WalletType) => Promise<void>;
  disconnectWallet: () => void;
  currentAccount: string;
  connected: boolean;
  loading: boolean;
  provider: JsonRpcProvider | undefined;
  chainId: number;
  getTxError: (txHash: string) => Promise<string>;
  sendTx: (txData: transactionType) => Promise<TransactionResponse>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  signTxData: (unsignedData: string) => Promise<SignatureLike>;
  error: Error | undefined;
};

export type Web3ContextData = {
  web3ProviderData: Web3Data;
};

export const Web3Context = React.createContext({} as Web3ContextData);



export const Web3ContextProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const {
    account,
    chainId,
    library: provider,
    activate,
    active,
    error,
    deactivate,
    setError,
  } = useWeb3React<providers.Web3Provider>();

  const [loading, setLoading] = useState<boolean>(false);
  const [connector, setConnector] = useState<AbstractConnector>();

  const [deactivated, setDeactivated] = useState<boolean>(false);
  const [tried, setTried] = useState<boolean>(false);

    // Wallet connection and disconnection
  // clean local storage
  const cleanConnectorStorage = useCallback((): void => {
    if (connector instanceof WalletConnectConnector) {
      localStorage.removeItem('walletconnect');
    } else if (connector instanceof WalletLinkConnector) {
      localStorage.removeItem('-walletlink:https://www.walletlink.org:version');
      localStorage.removeItem('-walletlink:https://www.walletlink.org:session:id');
      localStorage.removeItem('-walletlink:https://www.walletlink.org:session:secret');
      localStorage.removeItem('-walletlink:https://www.walletlink.org:session:linked');
      localStorage.removeItem('-walletlink:https://www.walletlink.org:AppVersion');
      localStorage.removeItem('-walletlink:https://www.walletlink.org:Addresses');
      localStorage.removeItem('-walletlink:https://www.walletlink.org:walletUsername');
    } else if (connector instanceof TorusConnector) {
      localStorage.removeItem('loglevel:torus.js');
      localStorage.removeItem('loglevel:torus-embed');
      localStorage.removeItem('loglevel:http-helpers');
    }
  }, [connector]);

  const disconnectWallet = useCallback(async () => {
    cleanConnectorStorage();

    localStorage.removeItem("walletProvider");
    deactivate();

    // @ts-expect-error close can be returned by wallet
    if (connector && connector.close) {
      // @ts-expect-error
      await connector.close();
    }

    setDeactivated(true);

    setLoading(false);
    
  }, [provider, connector]);

  const connectWallet = useCallback(
    async (wallet: WalletType) => {
      setLoading(false);

      try {
        const connector: AbstractConnector = getWallet(wallet, chainId);
        console.log(connector, 'this is connector')

        if (connector instanceof WalletConnectConnector) {
          connector.walletConnectProvider = undefined;
        }

        console.log('activating...')
        await activate(connector, undefined, true)

        console.log('after connectiorw', connector)

        setConnector(connector);
        localStorage.setItem("walletProvider", wallet.toString());
        setDeactivated(false);
        setLoading(false);
      } catch (e) {
        const err = e as Error;
        setError(err);
        setLoading(false);
        console.error(err)
      }
    },
    [disconnectWallet]
  );

  // handle logic to eagerly connect to the injected ethereum provider,
  // if it exists and has granted access already
  useEffect(() => {
    const lastWalletProvider = localStorage.getItem('walletProvider');
    if (!active && !deactivated) {
      if (!!lastWalletProvider) {
        connectWallet(lastWalletProvider as WalletType).catch(() => {
          setTried(true);
        });
      } else {
        setTried(true);
        // For now we will not eagerly connect to injected provider
        // const injected = getWallet(WalletType.INJECTED);
        // // @ts-expect-error isAuthorized not in AbstractConnector type. But method is there for
        // // injected provider
        // injected.isAuthorized().then((isAuthorized: boolean) => {
        //   if (isAuthorized) {
        //     connectWallet(WalletType.INJECTED).catch(() => {
        //       setTried(true);
        //     });
        //   } else {
        //     setTried(true);
        //   }
        // });
      }
    }
  }, [activate, setTried, active, connectWallet, deactivated]);

    // if the connection worked, wait until we get confirmation of that to flip the flag
    useEffect(() => {
      if (!tried && active) {
        setTried(true);
      }
    }, [tried, active]);

  const hexToAscii = (_hex: string): string => {
    const hex = _hex.toString();
    let str = "";
    for (let n = 0; n < hex.length; n += 2) {
      str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
  };

  const getTxError = async (txHash: string): Promise<string> => {
    try {
      const tx = await provider?.getTransaction(txHash);
      // @ts-expect-error TODO: need think about "tx" type
      const code = await provider.call(tx, tx?.blockNumber);
      const txError = hexToAscii(code.substr(138));

      return txError;
    } catch (err) {
      const error = err as Error;

      throw new Error(error.message);
    }
  };

  const sendTx = async (
    txData: transactionType
  ): Promise<TransactionResponse> => {
    const { from, value } = txData;

    const bigNumValue = value ? BigNumber.from(value) : undefined;
    try {
      const signer = provider?.getSigner(from);

      // @ts-expect-error
      const txResponse: TransactionResponse = await signer.sendTransaction({
        ...txData,
        value: bigNumValue,
      });

      return txResponse;
    } catch (err) {
      const error = err as Error;

      throw new Error(error.message);
    }
  };

  const signTxData = async (unsignedData: string): Promise<SignatureLike> => {
    try {
      const signature: SignatureLike = await provider?.send(
        "eth_signTypedData_v4",
        [account, unsignedData]
      );

      return signature;
    } catch (err) {
      const error = err as Error;
      throw new Error(error.message);
    }
  };

  return (
    <Web3Context.Provider
      value={{
        web3ProviderData: {
          connectWallet,
          disconnectWallet,
          provider,
          connected: active,
          loading,
          chainId: chainId || 1,
          getTxError,
          sendTx,
          signTxData,
          error,
          currentAccount: account?.toLowerCase() || "",
        },
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3Context = () => {
  const { web3ProviderData } = useContext(Web3Context);
  if (Object.keys(web3ProviderData).length === 0) {
    throw new Error(
      "useWeb3Context() can only be used inside of <Web3ContextProvider />, " +
        "please declare it at a higher level."
    );
  }

  return web3ProviderData;
};