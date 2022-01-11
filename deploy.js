// deploy code will go here
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    'step trust twist dinner april oil involve antenna enjoy hello alert museum', 
    'https://rinkeby.infura.io/v3/5b84946db2454b80ae466cdf94a8c0dc'
);

const web3 = new Web3(provider);

// creating a funct so we can use async
const deploy = async () => {
    // get a list of all accounts associated with mnemonic above
    const accounts = await web3.eth.getAccounts();        

    console.log('Attempting to deploy from account', accounts[0]);

    // deploying
    const result = await new web3.eth.Contract(JSON.parse(interface))
        // this is constructing the contract object
        .deploy({ 
            data: bytecode, 
            arguments: ['Hi there!']})
        // deploying is happening here
        .send({ from: accounts[0], gas: '1000000'});

    console.log('Contract deployed to', result.options.address);
    provider.engine.stop();

};
deploy();
