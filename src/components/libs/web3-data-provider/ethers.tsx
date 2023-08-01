import * as React from 'react'
import {type WalletClient, useWalletClient, useAccount, useNetwork} from 'wagmi'
import { providers } from 'ethers'

// stolen from https://wagmi.sh/react/ethers-adapters

interface Contract {
    address: `0x${string}`;
    blockCreated?: number;
}

interface Chain {
    id: number;
    name: string;
    contracts?: {
        ensRegistry?: Contract;
    };
}

export function walletClientToSigner(walletClient: WalletClient, chain: Chain) {
    const { account, transport } = walletClient
    const network = {
        chainId: chain.id,
        name: chain.name,
        ensAddress: chain.contracts?.ensRegistry?.address,
    }
    const provider = new providers.Web3Provider(transport, network)
    const signer = provider.getSigner(account.address)
    return {provider, signer}
}

export function getEthersProvider() {
    const { chain } = useNetwork()
    const { data: walletClient } = useWalletClient()
    return React.useMemo(
        () => (walletClient && chain ? walletClientToSigner(walletClient, chain).provider : undefined),
        [walletClient, chain],
    )
}

/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export function useEthersSigner() {
    const { chain } = useNetwork()
    const { data: walletClient } = useWalletClient()
    return React.useMemo(
        () => (walletClient && chain ? walletClientToSigner(walletClient, chain).signer : undefined),
        [walletClient, chain],
    )
}
