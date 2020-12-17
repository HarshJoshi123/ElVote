var Migrations = artifacts.require("../build/contracts/Migrations.sol");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
