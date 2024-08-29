import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import FTToken from './contracts/FTToken.json';
import FTGovernance from './contracts/FTGovernance.json';

function App() {
    const [account, setAccount] = useState('');
    const [ftToken, setFTToken] = useState(null);
    const [ftGovernance, setFTGovernance] = useState(null);
    const [proposals, setProposals] = useState([]);

    useEffect(() => {
        loadBlockchainData();
    }, []);

    const loadBlockchainData = async () => {
        const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
        const accounts = await web3.eth.requestAccounts();
        setAccount(accounts[0]);

        const networkId = await web3.eth.net.getId();

        // Load FTToken contract
        const ftTokenData = FTToken.networks[networkId];
        if (ftTokenData) {
            const ftToken = new web3.eth.Contract(FTToken.abi, ftTokenData.address);
            setFTToken(ftToken);
        } else {
            window.alert('FTToken contract not deployed to detected network.');
        }

        // Load FTGovernance contract
        const ftGovernanceData = FTGovernance.networks[networkId];
        if (ftGovernanceData) {
            const ftGovernance = new web3.eth.Contract(FTGovernance.abi, ftGovernanceData.address);
            setFTGovernance(ftGovernance);

            const proposalCount = await ftGovernance.methods.proposals().call();
            const proposals = [];
            for (let i = 0; i < proposalCount.length; i++) {
                const proposal = await ftGovernance.methods.proposals(i).call();
                proposals.push(proposal);
            }
            setProposals(proposals);
        } else {
            window.alert('FTGovernance contract not deployed to detected network.');
        }
    };

    const createProposal = async (description) => {
        await ftGovernance.methods.createProposal(description, 300).send({ from: account });
    };

    const voteOnProposal = async (proposalId) => {
        await ftGovernance.methods.voteOnProposal(proposalId).send({ from: account });
    };

    return (
        <div>
            <h1>FT Platform</h1>
            <p>Account: {account}</p>

            <h2>Create a Proposal</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                createProposal(e.target.elements.description.value);
            }}>
                <input type="text" name="description" placeholder="Proposal description" required />
                <button type="submit">Submit</button>
            </form>

            <h2>Proposals</h2>
            {proposals.map((proposal, index) => (
                <div key={index}>
                    <p>ID: {proposal.id}</p>
                    <p>Description: {proposal.description}</p>
                    <p>Votes: {proposal.voteCount}</p>
                    <p>Executed: {proposal.executed ? 'Yes' : 'No'}</p>
                    <button onClick={() => voteOnProposal(proposal.id)}>Vote</button>
                </div>
            ))}
        </div>
    );
}

export default App;
