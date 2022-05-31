# How to Make a Proposal

Tally.XYZ offers a simple interface to build governance proposals. The guide describes the base operations of making a governance proposal.

First, verify you have a sufficient number of votes visiting the voting interface or calling `getCurrentVotes` on the IPT contract and checking the `proposalThreshold` on the governance contract. Or, if the address is whitelisted, it can make proposals without the requirement of the voting power. 
Second, the `propose` function requires `targets[]`, `values[]`, `signatures[]`, `calldatas[]`, `description` string, `emergency` boolean. Targets are addresses that, upon proposal execution, call the corresponding function from the proposal signatures with the relevant call data. Each array must be the same length. The proposal description should be in markdown, but it can be any string. The emergency boolean is a new addition with governor Charlie. The proposer has the option to make a regular proposal or an emergency proposal. Emergency proposals have a short time to execute but require a significantly higher quorum compared to a regular proposal. 

For more information on governance can be found [here](../../../concepts/Governance/Overview).

For information on governance parameters can be found [here](../../../reference/ProtocolParameters).

Link to proposal example:

