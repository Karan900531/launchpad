import bsc from "../images/bsc.png"
import polygon from "../images/polygon.png"
import bsctestnet from "../images/bsctestnet.png"
import eth from "../images/eth.png"
import ropsten from "../images/ropsten.png"
// export const RPC_URL = "https://bsc-dataseed1.binance.org/";
// export const CHAIN_ID = 56;
  
export const RPC_URL = "https://data-seed-prebsc-1-s1.binance.org:8545/";
 export const CHAIN_ID = 97;
 
 export const ONEDAYINSECONDS = 86400;

 export const userFee = 5

 export const userFeeWithtoken = 4

 export const CHAINS = [
    {
        NAME: "BSC",
        RPC_URL:"https://bsc-dataseed1.binance.org/",
        CHAIN_ID:56,
        IMAGE: bsc,
        // ROUTER: "0x10ED43C718714eb63d5aA57B78B54704E256024E" //pancake
        ROUTER: "0x2a09fba034e26852ff38d5393f3fd15748518791" 
    },
   {
        NAME: "BSC-TEST",
        RPC_URL:"https://data-seed-prebsc-1-s1.binance.org:8545/",
        CHAIN_ID:97,
        IMAGE: bsctestnet,
        ROUTER: "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3", //pancake
        // ROUTER: "0x2a09fba034e26852ff38d5393f3fd15748518791"
        LIQUIDITY_TOKEN_ADDRESS : "0xe00729604d5365E6C5C4Ca5Ef42Bc69bD703709E",
        STANDARD_TOKEN_ADDRESS : "0x634C906261B3c1Bd9cCc2CEBFceE545dc856A847",
        LOCK_ADDRESS : "0xC4f0edeB6BB56F145b1bBb9FC1cEe9A557b28358",
        TRANSACTION : 'https://testnet.bscscan.com/tx/'
    },
    {
        NAME: "Avalanche-TEST",
        RPC_URL:"https://api.avax-test.network/ext/bc/C/rpc",
        CHAIN_ID:43113,
        IMAGE: bsctestnet,
        ROUTER: "0x29035dEbC68181B33183E3A7fb9291bC2815644F", //pancake
        // ROUTER: "0x2a09fba034e26852ff38d5393f3fd15748518791"
        LIQUIDITY_TOKEN_ADDRESS : "0xf6925d546603FB10A88b493DABfA71f341a56d1e",
        STANDARD_TOKEN_ADDRESS : "0xAdf85f277B0e1D0A92092724Bb5901Db2FC33155",
        LOCK_ADDRESS : "0xa86fcd08e7692Ab47c74D45b7CdDEf98673f8191", // 0xd915682d1b33e142f0B1F4822502702e11e2F9e8 old
        BNB : "0x0000000000000000000000000000000000000000",
        BUSD : "0xd7613f4F96d039f9F15B75D51232719D220B047e",
        USDT : "0xd7613f4F96d039f9F15B75D51232719D220B047e",
        USDC : "0xd7613f4F96d039f9F15B75D51232719D220B047e",
        TRANSACTION : "https://testnet.snowtrace.io/tx/"
    },
    // {
    //     NAME: "BSC",
    //     RPC_URL:"https://bsc-dataseed1.binance.org/",
    //     CHAIN_ID:56,
    //     IMAGE: bsc,
    //     // ROUTER: "0x10ED43C718714eb63d5aA57B78B54704E256024E" //pancake
    //     ROUTER: "0x10ED43C718714eb63d5aA57B78B54704E256024E" ,
    //     LIQUIDITY_TOKEN_ADDRESS : "0xa08716AB5eb7694769fa38eAABEE730d2D93EB9c",
    //     STANDARD_TOKEN_ADDRESS : "0x6eB5022e05007647E1bC23AEDF2164F3CFb86b36",
    //     LOCK_ADDRESS : "0x2e8bAe13157A414AcA1a50E24a08c2357B2d65C0", // 0xd915682d1b33e142f0B1F4822502702e11e2F9e8 old
    //     BNB : "0x0000000000000000000000000000000000000000",
    //     BUSD : "0xe9e7cea3dedca5984780bafc599bd69add087d56",
    //     USDT : "0x55d398326f99059fF775485246999027B3197955",
    //     USDC : "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
    //     TRANSACTION : "https://bscscan.com/tx/"
    // },
    {
        NAME: "POLYGON",
        RPC_URL:"https://polygon-rpc.com",
        CHAIN_ID:137,
        IMAGE: polygon,
        // ROUTER: "0x10ED43C718714eb63d5aA57B78B54704E256024E" //pancake
        ROUTER: "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff" //polygon mainnet router address 
    },
//  {
//         NAME: "ETH",
//         RPC_URL:"https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
//         CHAIN_ID:56,
//         IMAGE: eth,
//         // ROUTER: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D" //pancake
//         ROUTER: "0x2a09fba034e26852ff38d5393f3fd15748518791"
//     },
//   {
//         NAME: "ROPSTEN",
//         RPC_URL:"https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
//         CHAIN_ID:3,
//         IMAGE: ropsten,
//         // ROUTER: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D" //pancake
//         ROUTER: "0x2a09fba034e26852ff38d5393f3fd15748518791"
//     }
];

// export const API_URL = "http://localhost:7097"

// export const API_URL = "http://43.204.99.101:7097"

export const API_URL = "https://api.cryptolaunchpad.finance"




export const FUND_RECEIVER = "0x12ABeD5514FD6F6716F1154a1Be05beD9E1a11dF"

export const COINS = ["BNB" , "BUSD" , "USDT" , "USDC" , "ETH" , "MATIC" , "AVAX" , "CRO" , "FTM"];

export const HC = ["Presale" , "Fairlaunch" , "Auction" , "Subscription"];

export const STATUS = ["Upcoming" , "Live" , "Ended"];

export const TOKEN_FEE = 0.01;

export const ZEROTH_ADDRESS = "0x0000000000000000000000000000000000000000"


// export const WBNB_Address = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"; // BSC Mainet

// export const WBNB_Address = "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd";  //BSC Testnet

export const WBNB_Address = "0x1d308089a2d1ced3f1ce36b1fcaf815b07217be3"
