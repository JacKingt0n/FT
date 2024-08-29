const FTGovernance = artifacts.require("FTGovernance");

contract("FTGovernance", (accounts) => {
  it("should create a new proposal", async () => {
    const governanceInstance = await FTGovernance.deployed();
    await governanceInstance.createProposal("Test Proposal", { from: accounts[0] });
    const proposal = await governanceInstance.proposals(0);
    assert.equal(proposal.description, "Test Proposal", "Proposal description mismatch");
  });
});
