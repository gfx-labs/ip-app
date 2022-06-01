# Governance Overview

## The Role of IPT Holders & Protocol Governance 
Interest Protocol governance manages changes and upgrades to the protocol. 

Interest Protocol Token (IPT) is the governance token for Interest Protocol. Token holders can influence the protocol's development after launch by creating and voting on proposals. Interest Protocol governance includes the processes and mechanisms available to institute changes to the protocol; IPT gives its holder the right to use those processes and mechanisms. IPT holders thus manage the protocol.

Token holders (management) have three main responsibilities: 
1. To prevent information asymmetry and centralization of power. A protocol cannot be safe for use without a strong foundation, and the bedrock of that foundation is the community. Fair and transparent governance distributes control of the protocol but ensures community control is still possible when it counts.
2. To maintain the existing protocol. Typically, that means adjusting LTVs, interest rate curves, liquidation incentives, the protocol fee and other parameters. To make informed decisions, the community will need to attract those with a strong understanding of both the platform and its competitors.
3. To innovate and adapt. Management should think about the future of the platform. DeFi exists in an ever-evolving landscape; good governance will guide the protocol through changing circumstances, ensuring the protocol remains competitive and captures more market share.

## Capabilities

IPT holders can make substantial upgrades to Interest Protocol. These include, but are not limited to:

- Adding collateral assets
- Altering interest rate curves
- Altering collateral assets' specifications
- Funding grants to support the development of the protocol
- Revising liquidation incentives

## Governance Communications & Discussions
Good governance depends on quality discussions and collaboration. The Interest Protocol Forum and Discord Channel are the two main venues for those discussions. Discord is more useful for quick questions and fluid conversation, whereas the forum is better for in-depth discussions. IPT holders are encouraged to visit both regularly to receive updates and participate in discussions.

## Proposal Process
The process for upgrading or altering the protocol typically consists of two steps: first a Consensus Check and then a Proposal Vote.

A *Consensus Check* confirms whether the community should invest time producing and coding a proposal, and potentially whether Interest Protocol should grant funding for an audit of that proposal's code.

When formulating a Consensus Check, authors should strive to:

- Be clear about the impact and goals of their proposal.
- Avoid contradiction with existing code unless the intent is to remove/edit active code.
- Be as brief as possible.
- Be complete. Any reliance upon previous or future proposals should be explicit and clear.

Consensus Checks must have a 5-day voting window. In order to initiate a Consensus Check, a proposer must have (or have been delegated) .01% of IPT supply. For a Consensus Check to be successful, it must receive more Yes votes than No, and meet a quorum of 10% of IPT supply. Consensus Check votes occur on [Snapshot](https://snapshot.org/#/).

A *Proposal Vote* approves and executes a formalized proposal, which has already passed a Consensus Check. In order to initiate a Proposal Vote, a proposer must have (or have been delegated) 0.10% of IPT supply. Proposal Votes have a 6-day voting window and a 48-hour time lock during which they are queued before execution. In order for a Proposal Vote to be successful, it must have more Yes votes than No, and meet a quorum of 10% of IPT supply. The sponsor of a Proposal Vote does not need to be the same as the sponsor of the Consensus Check. This allows those who successfully proposed a Consensus Check to collaborate with a party that meets the proposal threshold.

Token holders are strongly encouraged to communicate early about proposal ideas, and to solicit feedback in the forum. 

## Emergency Proposals

There may be a need for urgent action, for which an Emergency Proposal can be used.

An *Emergency Proposal* is a special proposal process with a unique voting period, quourm threshold, and timelock period. At launch the voting period is 12-hours and Emergency Proposals have a 6-hour time lock during which they are queued before execution.

In order to initiate an Emergency Proposal, a proposer must have (or have been delegated) 0.10% of IPT supply.

In order for an Emergency Proposal to be successful, it must have more Yes votes than No, and meet a quorum of 50% of IPT supply.


## Voting Parameters
The following, parameters are governed by the token holders:

### Governance Parameters
* proposalThreshold: 10000000

#### Proposal Parameters
* votingDelay (blocks): 13140
* votingPeriod (blocks): 40320
* proposalTimelockDelay (seconds): 172800
* quorumVotes: 10000000

#### Emergency Parameters
* emergencyVotingPeriod (blocks): 6570
* emergencyVotingTimelockDelay (seconds): 43200
* emergencyQuorumVotes: 50000000
