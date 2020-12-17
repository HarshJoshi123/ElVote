var Election = artifacts.require("../build/contracts/Election.sol");

module.exports = function (deployer) {
  deployer.deploy(Election);
};
