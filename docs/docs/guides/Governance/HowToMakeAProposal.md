# How to Make a Proposal

Tally.XYZ offers a simple interface to build governance proposals. This guide describes the basic operations of making a governance proposal.

First, verify that you have a sufficient number of votes by visiting the voting interface or calling `getCurrentVotes` on the IPT contract and checking `proposalThreshold`. If your address is whitelisted, you can create proposals without meeting the voting power requirement. 
Second, the `propose` function takes as arguments `targets[]`, `values[]`, `signatures[]`, `calldatas[]`, `description` string, `emergency` boolean. Targets are addresses that, upon proposal execution, call the corresponding function from the proposal signatures with the relevant call data. Each array must be the same length. The proposal description should be in markdown but can be any string. The emergency boolean is a new feature of Governor Charlie. The proposer has the option to submit a regular proposal or an emergency proposal. Emergency proposals have a shorter execution delay but require a significantly higher quorum compared to a regular proposal. 

More information on governance can be found [here](../../../concepts/Governance/Overview).

Information on governance parameters can be found [here](../../../reference/ProtocolParameters).

Link to an example proposal:

