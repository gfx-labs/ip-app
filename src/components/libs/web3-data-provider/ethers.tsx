import * as React from 'react'
import { type PublicClient, usePublicClient } from 'wagmi'
import { providers } from 'ethers'
import { type HttpTransport } from 'viem'

// from https://wagmi.sh/react/ethers-adapters

export function publicClientToProvider(publicClient: PublicClient) {
    const { chain, transport } = publicClient
    const network = {
        chainId: chain.id,
        name: chain.name,
        ensAddress: chain.contracts?.ensRegistry?.address,
    }
    return new providers.JsonRpcProvider(transport.url, network)
}

/** Hook to convert a viem Public Client to an ethers.js Provider. */
export function useEthersProvider({ chainId }: { chainId?: number } = {}) {
    const publicClient = usePublicClient({ chainId })
    return React.useMemo(() => publicClientToProvider(publicClient), [publicClient])
}
