# IP Dao Governance Processes

## Governance Responsibilities & Capabilities
Holders of IPT have the ability to make substantial upgrades to Interest Protocol. These include, but are not limited to:

* Altering interest rate curves
* Altering required levels of collateralization
* Registering and de-registering new forms of collateral
* Funding grants to support the development of the protocol
* Revising liquidation incentives
* Improving the governance mechanism 

## Governance Communications & Discussions
Interest Protocol governance centers its communications around the Interest Protocol governance forum. Discussions around the governance of Interest Protocol, as well as any official communications or reports will be published on the forum. Holders of IPT are encouraged to visit it regularly for updates and participate in discussions.

## Proposal Process
The process for upgrading or altering the Interest Protocol requires an on-chain proposal and vote.

### Standard Proposal
When formulating a proposal, authors should strive to:

* Be clear and avoid ambiguity about the effects of their proposal.
* Avoid contradiction with existing code unless the intent is to remove/edit active code.
* Be as brief as possible.
* Be complete. Any reliance upon previous or future proposals should be explicit and clear.

A *Standard Proposal* approves and executes a formalized proposal, and has completed and reviewed code.

Standard Proposals have a 6-day (40320 block) voting window and a 48-hour time lock during which they are queued before execution.

In order to initiate a Standard Proposal, a proposer must have (or have been delegated) 200k IPT.

In order for a Standard Proposal to be successful, it must have more Yes votes than No, and meet a quorum of 2m IPT.

Proposal Votes occur on [Interest Protocol](https://interestprotocol.io/#/proposal).

Governance token holders are strongly encouraged to communicate early about proposal ideas, and to solicit feedback in the forum. 

### Emergency Proposals
There may be a need for urgent action, for which an Emergency Proposal can be used.

An *Emergency Proposal* is a special proposal that skips the review period, has a 1-day (6570 block) voting window, and 12-hour timelock period.

In order to initiate an Emergency Proposal, a proposer must have (or have been delegated) 200k IPT.

In order for an Emergency Proposal to be successful, it must have more Yes votes than No, and meet a quorum of 40m IPT.

Emergency Proposals occur on [Interest Protocol](https://interestprotocol.io/#/proposal).

### Optimistic Proposals
Frequent proposers making low-risk proposals may find Optimistic Proposals helpful in improving the protocol while not requiring the significant strategic lift of a standard proposal.
 
Before making an Optimistic Proposal, the proposer must be whitelisted/approved by governance to become an optimistic proposer. In addition to providing an address to be whitelisted, the proposal must provide an expiration time. Proposers have an expiry, so the protocol has an automatic method to delist old pariticpants. 
 
Optimistic Proposals have the same voting period and timelock period as a standard governance proposal but have their configurable review period and negative quorum threshold.
 
Note: a proposal may not be both Optimistic and an Emergency. 

## Info
More information on governance available [here](../../../concepts/Governance/Overview).

Information on governance parameters available [here](../../../reference/ProtocolParameters).

