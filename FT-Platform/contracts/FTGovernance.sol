// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract FTGovernance {
    IERC20 public ftToken;

    struct Proposal {
        uint256 id;
        string description;
        uint256 voteCount;
        address proposer;
        bool executed;
        uint256 deadline;
    }

    Proposal[] public proposals;
    mapping(address => uint256) public tokenBalances;
    mapping(uint256 => mapping(address => bool)) public votes;

    event ProposalCreated(uint256 id, string description, address proposer);
    event Voted(uint256 proposalId, address voter);
    event ProposalExecuted(uint256 proposalId);

    constructor(address tokenAddress) {
        ftToken = IERC20(tokenAddress);
    }

    function createProposal(string memory description, uint256 duration) public {
        require(ftToken.balanceOf(msg.sender) > 0, "Must hold tokens to create proposal");

        proposals.push(Proposal({
            id: proposals.length,
            description: description,
            voteCount: 0,
            proposer: msg.sender,
            executed: false,
            deadline: block.timestamp + duration
        }));

        emit ProposalCreated(proposals.length - 1, description, msg.sender);
    }

    function voteOnProposal(uint256 proposalId) public {
        require(ftToken.balanceOf(msg.sender) > 0, "Must hold tokens to vote");
        require(!votes[proposalId][msg.sender], "Already voted on this proposal");
        require(proposals[proposalId].deadline > block.timestamp, "Voting period has ended");

        proposals[proposalId].voteCount += ftToken.balanceOf(msg.sender);
        votes[proposalId][msg.sender] = true;

        emit Voted(proposalId, msg.sender);
    }

    function executeProposal(uint256 proposalId) public {
        require(proposals[proposalId].voteCount > 0, "Not enough votes");
        require(!proposals[proposalId].executed, "Proposal already executed");
        require(proposals[proposalId].deadline < block.timestamp, "Voting period still active");

        proposals[proposalId].executed = true;

        // Custom logic for proposal execution
        // For example, sending funds to the proposer, initiating smart contract actions, etc.

        emit ProposalExecuted(proposalId);
    }
}
