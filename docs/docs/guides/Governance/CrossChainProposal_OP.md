# How to Make a Cross-Chain Proposal intended for the Interest Protocol Deployment on Optimism


This guide builds off off [How To Make A Proposal](./HowToMakeAProposal.md), so the basics of how to make proposals and IP governance should be understood prior to this guide. 

## Technical Cross Chain Governance Details

The following describes the general process for which mainnet IP governance will control the Optimisim deployment. 

[Layer 1 Cross Chain Messenger](https://etherscan.io/address/0x25ace71c97B33Cc4729CF772ae268934F7ab5fA1#code)  
This is the official contract for sending data from Mainnet to Optimism. Upon execution of a cross-chain proposal to Optimism, IP governance will call `sendMessage` on this contract, initiating the passing of data to Optimism. 

[Cross Chain Account](https://optimistic.etherscan.io/address/0x48fa7528bFD6164DdF09dF0Ed22451cF59c84130)  
This contract receives the data sent from Mainnet, and forwards it to the Interest Protocol contracts. As such, this contract has ownership of all Interest Protocol contracts on Optimism. 

All of the data to make these transactions happen must be carefully nested in the proposal on Mainnet. An example script to do this can be found [here](https://gfx.cafe/ip/contracts/-/blob/master/scripts/proposals/SNX_OP/propose.ts)

So for example, if we are to set the new oracle on the [Oracle Master](https://optimistic.etherscan.io/address/0xBdCF0bb40eb8642f907133bDB5Fcc681D81f0651), we need to first package the data to do this, which we can call addOracleData.  

Then we take this data, and use it as the "bytes" argument when we call call to forward(address,bytes) on the [Cross Chain Account](https://optimistic.etherscan.io/address/0x48fa7528bFD6164DdF09dF0Ed22451cF59c84130) on Optimism. This function takes two arguments, first the Oracle Master address on Optimism, and second, our addOracleData (bytes).

We take our addOracleForwardData, and pass it as the _message (bytes) when we call sendMessage(address,bytes,uint32) on the [Layer 1 Cross Chain Messenger](https://etherscan.io/address/0x25ace71c97B33Cc4729CF772ae268934F7ab5fA1#code)

Assuming the Oracle Master on Optimism has its owner set to the [Cross Chain Account](https://optimistic.etherscan.io/address/0x48fa7528bFD6164DdF09dF0Ed22451cF59c84130), this should set the new relay as expected.