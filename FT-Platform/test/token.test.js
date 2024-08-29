const FTToken = artifacts.require("FTToken");

contract("FTToken", (accounts) => {
  it("should mint the initial supply to the creator's address", async () => {
    const tokenInstance = await FTToken.deployed();
    const balance = await tokenInstance.balanceOf(accounts[0]);
    assert.equal(balance.toNumber(), 1000000, "Initial supply wasn't minted to the creator");
  });
});
