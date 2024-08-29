import React from 'react';
import { Card, CardContent, Button, Typography } from '@mui/material';

const ProposalList = ({ proposals, voteOnProposal }) => {
  return (
    <>
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
    </>
  );
};

export default ProposalList;
