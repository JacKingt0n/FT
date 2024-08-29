import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { Container, Typography, TextField, Button, Card, CardContent } from '@mui/material';
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
        <Container>
            <Typography variant="h4" gutterBottom>
                FT Platform
            </Typography>
            <Typography variant="subtitle1">
                Account: {account}
            </Typography>

            <Typography variant="h5" gutterBottom>
                Create a Proposal
            </Typography>
            <form onSubmit={(e) => {
                e.preventDefault();
                createProposal(e.target.elements.description.value);
            }}>
                <TextField fullWidth label="Proposal description" name="description" required />
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
                    Submit
                </Button>
            </form>

            <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
                Proposals
            </Typography>
            {proposals.map((proposal, index) => (
                <Card key={index} style={{ marginTop: '10px' }}>
                    <CardContent>
                        <Typography>ID: {proposal.id}</Typography>
                        <Typography>Description: {proposal.description}</Typography>
                        <Typography>Votes: {proposal.voteCount}</Typography>
                        <Typography>Executed: {proposal.executed ? 'Yes' : 'No'}</Typography>
                        <Button onClick={() => voteOnProposal(proposal.id)} variant="contained" color="secondary" style={{ marginTop: '10px' }}>
                            Vote
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </Container>
    );
}

export default App;
