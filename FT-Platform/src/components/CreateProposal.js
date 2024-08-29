import React from 'react';
import { TextField, Button } from '@mui/material';

const CreateProposal = ({ createProposal }) => {
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      createProposal(e.target.elements.description.value);
    }}>
      <TextField fullWidth label="Proposal description" name="description" required />
      <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
        Submit
      </Button>
    </form>
  );
};

export default CreateProposal;
