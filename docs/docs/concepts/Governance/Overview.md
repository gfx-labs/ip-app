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
- Improving the governance system

## Governance Communications & Discussions
Good governance depends on quality discussions and collaboration. The Interest Protocol Forum and Discord Channel are the two main venues for those discussions. Discord is more useful for quick questions and fluid conversation, whereas the forum is better for in-depth discussions. IPT holders are encouraged to visit both regularly to receive updates and participate in discussions.

## Proposal Process
The process for upgrading or altering the protocol requires an on-chain Proposal Vote.

When formulating a proposal, authors should strive to:

- Be clear about the impact and goals of their proposal.
- Avoid contradiction with existing code unless the intent is to remove/edit active code.
- Be as brief as possible.
- Be complete. Any reliance upon previous or future proposals should be explicit and clear.

A *Proposal Vote* approves and executes a formalized proposal. In order to initiate a Proposal Vote, a proposer must have (or have been delegated) 200k IPT. Proposal Votes have a 6-day (40320 block) voting window and a 48-hour time lock during which they are queued before execution. In order for a Proposal Vote to be successful, it must have more Yes votes than No, and meet a quorum of 2m IPT.

Token holders are strongly encouraged to communicate early about proposal ideas, and to solicit feedback in the forum. 

## Emergency Proposals

There may be a need for urgent action, for which an Emergency Proposal can be used.

An *Emergency Proposal* is a special proposal process with a unique voting period, quourm threshold, and timelock period. At launch the voting period is 24-hours (6570 blocks) and Emergency Proposals have a 12-hour time lock during which they are queued before execution.

In order to initiate an Emergency Proposal, a proposer must have (or have been delegated) 200k IPT.

In order for an Emergency Proposal to be successful, it must have more Yes votes than No, and meet a quorum of 40m IPT.

## Optimistic Proposals

A whitelisted address, as designated by governance or the whitelist guardian (currently unlisted) can propose without voting power, and doesn’t require affirmative approval by IPT voters. Instead, if votes in opposition to the proposal exceed the optimistic quorum, the proposal will fail.

In addition to the optimistic quorum parameter, there is a configurable optimistic voting delay. The delay, often referred to as the review period, is the time between a proposal’s creation and voting. Generally, the review period for optimistic proposals should be longer than the standard review period, but the standard voting period and timelock are sufficient. The proposer, once whitelisted, can make proposals without voting power, and the community doesn’t need to mobilize IPT votes, except in the event of opposition.

Optimistic governance privileges are ideal for frequent proposers who are making uncontroversial proposals. IPT holders who don’t qualify for a regular proposal but are regularly making improvements to the protocol or parameter adjustments would be clear examples. In the event a controversial optimistic proposal is made, 500k IPT opposing the proposal will successfully reject the proposal.

Optimistic governance is currently implemented in our Governor Charlie contract, and GFX Labs’ governance address (gfxlabs.eth) is a whitelisted proposer.

## Voting Parameters
The following, parameters are governed by the token holders:

### Governance Parameters
* proposalThreshold: 200,000

#### Proposal Parameters
* votingDelay (blocks): 13140
* votingPeriod (blocks): 40320
* proposalTimelockDelay (seconds): 172800
* quorumVotes: 2,000,000

#### Emergency Parameters
* emergencyVotingPeriod (blocks): 6570
* emergencyVotingTimelockDelay (seconds): 43200
* emergencyQuorumVotes: 40,000,000

### Optimistic Parameters
* optimisticVotingDelay (blocks): 25600  
* optimisticQuorum: 500,000
* whitelist guardian: not set (can be set by governance)
