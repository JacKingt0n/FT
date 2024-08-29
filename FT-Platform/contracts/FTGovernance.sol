// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FTGovernance {
    struct Proposal {
        uint256 id;
        string description;
        uint256 voteCount;
        address proposer;
        bool executed;
    }

    Proposal[] public proposals;
    mapping(address => uint256) public tokenBalances;

    function createProposal(string memory description) public {
        proposals.push(Proposal({
            id: proposals.length,
            description: description,
            voteCount: 0,
            proposer: msg.sender,
            executed: false
        }));
    }

    function voteOnProposal(uint256 proposalId) public {
        require(tokenBalances[msg.sender] > 0, "No tokens to vote with");
        proposals[proposalId].voteCount += 1;
    }

    function executeProposal(uint256 proposalId) public {
        require(proposals[proposalId].voteCount > 0, "Not enough votes");
        proposals[proposalId].executed = true;
        // Add logic to execute proposal
    }
}
