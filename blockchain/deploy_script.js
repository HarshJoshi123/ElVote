let Web3 = require("web3");
let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
web3.eth.accounts;

code = fs.readFileSync("blockchain/Election.sol", "utf8");
solc = require("solc");
var input = {
  language: "Solidity",
  sources: {
    "voting.sol": {
      content: code,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};
compiledCode = JSON.parse(solc.compile(JSON.stringify(input)));

abiDefinition = compiledCode.contracts["Election.sol"].Election.abi;
byteCode = compiledCode.contracts["Election.sol"].Election.evm.bytecode;

VotingContract = new web3.eth.Contract(abiDefinition)

deployedContract = new web3.eth.Contract(abiDefinition, {
  data: byteCode,
  from: web3.eth.accounts[0],
  gas: 4700000,
});
deployedContract.address;
JSON.stringify(abiDefinition);
contractInstance = ElectionContract.at(deployedContract.address);
