const FTGovernance = artifacts.require("FTGovernance");

contract("FTGovernance", (accounts) => {
  it("should prevent voting on executed proposals", async () => {
    const governanceInstance = await FTGovernance.deployed();
    await governanceInstance.createProposal("Test Proposal", 300, { from: accounts[0] });
    await governanceInstance.voteOnProposal(0, { from: accounts[0] });
    await governanceInstance.executeProposal(0, { from: accounts[0] });

    try {
      await governanceInstance.voteOnProposal(0, { from: accounts[1] });
      assert.fail("Vote should not be allowed on executed proposal");
    } catch (error) {
      assert.include(error.message, "Proposal already executed");
    }
  });
});
