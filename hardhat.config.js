require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
require("dotenv").config()

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL
const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY

/** @type import('hardhat/config').HardhatUserConfig */ //1
// If you are using MetaMask with Hardhat Network, you might get an error like this when you send a transaction:

// Incompatible EIP155-based V 2710 and chain id 31337. See the second parameter of the Transaction constructor to set the chain id.
// This is because MetaMask mistakenly assumes all networks in http://127.0.0.1:8545 to have a chain id of 1337, but Hardhat uses a different number by default. Please upvote the MetaMask issue about it if you want this fixed.

// In the meantime, to resolve this you can set the chainId of Hardhat Network to 1337 in your Hardhat config:

// networks: {
//   hardhat: {
//     chainId: 1337
//   },
// }
module.exports = {
    defaultNetwork: "hardhat", 
    networks: {
        hardhat: {
            chainId:31337,
            blockConfirmations: 1,
            forking: {
                url: MAINNET_RPC_URL,
            },
        },
        goerli: {
            chainId: 5,
            blockConfirmations: 6,
            url: GOERLI_RPC_URL,
            accounts: [PRIVATE_KEY],
        },
    },
    
    solidity: {//0.8.7 & 0.6.6
        compilers: [
            {
                version: "0.8.8",
            },
            {
                version: "0.6.12",
            },
            {
                version: "0.6.6",
            },
            {
                version: "0.6.0",
            },
            {
                version: "0.4.19",
            },
        ],
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
        player: {
            default: 1,
        },
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    gasReporter: {
        enabled: false,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COINMARKETCAP_API_KEY, 
    },
    mocha: {
        timeout: 300000, //300 seconds max
    },
}
