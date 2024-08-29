const FTToken = artifacts.require("FTToken");
const FTGovernance = artifacts.require("FTGovernance");

module.exports = function (deployer) {
  deployer.deploy(FTToken, 1000000);
  deployer.deploy(FTGovernance);
};
