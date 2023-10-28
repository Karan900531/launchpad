var express = require("express");
// var ip           = require('ip');
// const bitcoin_rpc  = require('node-bitcoin-rpc');
var bodyParser = require("body-parser");
const CryptoJS = require("crypto-js");
const Tx = require("ethereumjs-tx").Transaction;
const https = require("https");

// var myip = ip.address();
// console.log(myip);
var app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
const Web3 = require("web3");

var erc20 = require("./erc20");
// const { mode } = require("crypto-js");
var environment = "Test";
if (environment == "Live") {
  var web3 = new Web3("http://localhost:8545"); //livenet
  var mode = "mainnet"; //livenet
}
if (environment == "Test") {
  var web3 = new Web3(
    "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161" // testnet
  );
  var mode = "ropsten"; //testnet
}

app.use(bodyParser.json());

var contractAddr = "0x753c974CcfD6c526CCbA157A7A0032063cf18b9e";
var minABI = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ name: "_upgradedAddress", type: "address" }],
    name: "deprecate",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_spender", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "deprecated",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ name: "_evilUser", type: "address" }],
    name: "addBlackList",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_from", type: "address" },
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "upgradedAddress",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "", type: "address" }],
    name: "balances",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "maximumFee",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "_totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "unpause",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "_maker", type: "address" }],
    name: "getBlackListStatus",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { name: "", type: "address" },
      { name: "", type: "address" },
    ],
    name: "allowed",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "paused",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "who", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "pause",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getOwner",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "owner",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "newBasisPoints", type: "uint256" },
      { name: "newMaxFee", type: "uint256" },
    ],
    name: "setParams",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ name: "amount", type: "uint256" }],
    name: "issue",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ name: "amount", type: "uint256" }],
    name: "redeem",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { name: "_owner", type: "address" },
      { name: "_spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "remaining", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "basisPointsRate",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "", type: "address" }],
    name: "isBlackListed",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ name: "_clearedUser", type: "address" }],
    name: "removeBlackList",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "MAX_UINT",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ name: "_blackListedUser", type: "address" }],
    name: "destroyBlackFunds",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "_initialSupply", type: "uint256" },
      { name: "_name", type: "string" },
      { name: "_symbol", type: "string" },
      { name: "_decimals", type: "uint256" },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: "amount", type: "uint256" }],
    name: "Issue",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: "amount", type: "uint256" }],
    name: "Redeem",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: "newAddress", type: "address" }],
    name: "Deprecate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "feeBasisPoints", type: "uint256" },
      { indexed: false, name: "maxFee", type: "uint256" },
    ],
    name: "Params",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "_blackListedUser", type: "address" },
      { indexed: false, name: "_balance", type: "uint256" },
    ],
    name: "DestroyedBlackFunds",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: "_user", type: "address" }],
    name: "AddedBlackList",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: "_user", type: "address" }],
    name: "RemovedBlackList",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "owner", type: "address" },
      { indexed: true, name: "spender", type: "address" },
      { indexed: false, name: "value", type: "uint256" },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "from", type: "address" },
      { indexed: true, name: "to", type: "address" },
      { indexed: false, name: "value", type: "uint256" },
    ],
    name: "Transfer",
    type: "event",
  },
  { anonymous: false, inputs: [], name: "Pause", type: "event" },
  { anonymous: false, inputs: [], name: "Unpause", type: "event" },
];

let contract = new web3.eth.Contract(minABI, contractAddr);

app.get("/test", function (req, res) {
  var account = web3.eth.accounts.create();
  res.json(account);

  // web3.eth.getBlockNumber(function(err,block){

  //   if(err)
  //   {
  //     res.json({err:err.message});
  //   }
  //   else
  //   {
  //     res.json({block:block});
  //   }

  // });
});
app.post("/ethnode", async function (req, res) {
  console.log(req.body, "bodyyyyyy ETH");
  var type = req.body.type;
  if (type == "getnewaddress") {
    var account = web3.eth.accounts.create();
    res.json(account);
  } else if (type == "getbalance") {
    var ethaddress = req.body.ethaddress;
    console.log(ethaddress, "ethaddress");

    web3.eth.getBalance(ethaddress, (err, balance) => {
      if (err) {
        console.error(err);
      }
      console.log(balance, "balancebalancelr");
      var balance = web3.utils.fromWei(balance, "ether");
      res.json({ result: balance.toString() });
    });
  } else if (type == "listtransactions") {
    var argmns = [];
  } else if (type == "sendtoaddress") {
    var account1 = req.body.account1;
    var userprivatekey = req.body.privkey;
    var useraddress = req.body.adminaddress;
    var amount = req.body.amount;
    web3.eth.getBalance(useraddress, (err, balance) => {
      var balance = web3.utils.fromWei(balance, "ether");
      var kjhkhkhkh = amount;
      if (balance >= kjhkhkhkh) {
        web3.eth.getGasPrice(function (err, getGasPrice) {
          console.log("err", err);
          console.log(getGasPrice, "ggetgasprice");
          web3.eth.getTransactionCount(useraddress, (err, txCount) => {
            var gaslimit = web3.utils.toHex(21000);
            var fee = web3.utils.toHex(getGasPrice) * gaslimit;
            // var amount = balance - fee;
            if (kjhkhkhkh > 0) {
              var updateVal = {};
              // var amount = web3.utils.toWei(kjhkhkhkh.toString(),'hex');
              var amount = web3.utils.toHex(
                web3.utils.toWei(kjhkhkhkh.toString(), "ether")
              );
              console.log(amount, "amountamount");
              const txObject = {
                nonce: web3.utils.toHex(txCount),
                gasLimit: web3.utils.toHex(gaslimit),
                gasPrice: web3.utils.toHex(getGasPrice),
                to: account1.toString(),
                from: useraddress,
                value: amount,
              };
              console.log(txObject, "txObject");
              var userprivatekey1 = Buffer.from(userprivatekey, "hex");

              const tx = new Tx(txObject, { chain: mode });
              tx.sign(userprivatekey1);
              const serializedTx = tx.serialize();
              console.log(serializedTx);
              const raw1 = "0x" + serializedTx.toString("hex");
              console.log(raw1);
              web3.eth.sendSignedTransaction(raw1, (err, txHash) => {
                console.log(txHash);
                console.log(err);
                return res.json({ status: true, txHash: txHash });
              });
            } else {
              console.log("no balance");
            }
          });
        });
      } else {
        res.json({ status: false, message: "Insuffient funds" });
      }
    });
  } else if (type == "movetoadmin") {
    var account1 = req.body.adminaddress;
    var userprivatekey = req.body.privkey;
    if (userprivatekey.substring(0, 2) != "0x") {
      var userprivatekey = userprivatekey.substring(2);
    }
    var cryptoPass = req.body.cryptoPass;
    var useraddress = req.body.useraddress;
    console.log(useraddress, "useraddress");
    console.log(userprivatekey, "userprivatekey");
    web3.eth.getBalance(useraddress, (err, balance) => {
      web3.eth.getGasPrice(function (err, getGasPrice) {
        web3.eth.getTransactionCount(useraddress, (err, txCount) => {
          console.log(getGasPrice, "getGasPrice");
          var gaslimit = web3.utils.toHex(21000);
          var fee = web3.utils.toHex(getGasPrice) * gaslimit;
          console.log("-----fee", fee);
          console.log("-----balance", balance);
          var amount = balance - fee;

          if (amount > 0) {
            var updateVal = {};
            const txObject = {
              nonce: web3.utils.toHex(txCount),
              gasLimit: web3.utils.toHex(gaslimit),
              gasPrice: web3.utils.toHex(getGasPrice),
              to: account1.toString(),
              from: useraddress.toString(),
              value: amount,
            };

            var userprivatekey1 = Buffer.from(userprivatekey, "hex");
            //  const tx = new Tx(txObject, { chain: mode });
            const tx = new Tx(txObject, { chain: mode });
            tx.sign(userprivatekey1);
            const serializedTx = tx.serialize();
            const raw1 = "0x" + serializedTx.toString("hex");
            web3.eth.sendSignedTransaction(raw1, (err, txHash) => {
              console.log(err, "err");
              console.log(txHash, "txHash");
              var recamount = web3.utils.fromWei(amount.toString(), "ether");
              res.json({ txHash: txHash, recamount: recamount });
            });
          } else {
            console.log("no balance");
            return res.status(500).json({ message: "no balance" });
          }
        });
      });
    });
  } else if (type == "usdtsendtoaddress") {
    console.log(req.body, "req.body in sudt send");
    var account1 = req.body.account1;
    var privkey = req.body.privkey;
    var cryptoPass = req.body.cryptoPass;
    var useraddress = req.body.adminaddress;
    var tokenamount = req.body.amount;
    var tokenInst = new web3.eth.Contract(
      minABI,
      "0xdac17f958d2ee523a2206206994597c13d831ec7"
    );

    tokenInst.methods
      .balanceOf(useraddress)
      .call()
      .then(function (bal) {
        console.log(bal / 1000000, "token balance=====");

        var usdt_balance = bal / 1000000;
        console.log(usdt_balance, "usdt_balanceusdt_balance");
        console.log(req.body.amount, "MOUNTSSS");
        if (usdt_balance > req.body.amount) {
          console.log(bal / 1000000, "token----- balance=====");
          var balance = 0;
          web3.eth.getBalance(useraddress, (err, balance) => {
            balance = balance;
            console.log(balance, "=---0000balance)");
            var balance = web3.utils.fromWei(balance, "ether");
            web3.eth.getGasPrice(function (err, getGasPrice) {
              console.log(balance, "console.log(balance);");
              web3.eth.getTransactionCount(useraddress, (err, txCount) => {
                var gaslimit = web3.utils.toHex(21000);
                var fee = web3.utils.toHex(getGasPrice) * gaslimit;
                var tokenamount = parseFloat(req.body.amount) * 1000000;
                console.log(tokenamount, "token amount");
                var data = contract.methods
                  .transfer(account1, tokenamount)
                  .encodeABI();
                let transactionObject = {
                  gasLimit: web3.utils.toHex(70000),
                  gasPrice: web3.utils.toHex(getGasPrice),
                  data: data,
                  nonce: web3.utils.toHex(txCount),
                  from: useraddress,
                  to: "0xdac17f958d2ee523a2206206994597c13d831ec7",
                  value: "0x0",
                  chainId: 1,
                  // value:web3.utils.toHex(web3.utils.toWei(tokenamount,'ether'))
                };
                console.log(privkey, "privkeyprivkey");
                console.log(transactionObject, "transactionObject");

                var userprivatekey1 = Buffer.from(privkey, "hex");

                const tx = new Tx(transactionObject, { chain: mode });

                tx.sign(userprivatekey1);
                const serializedTx = tx.serialize();
                const raw1 = "0x" + serializedTx.toString("hex");

                web3.eth.sendSignedTransaction(raw1, (err, txHash) => {
                  console.log(err, "err");
                  console.log(txHash, "txHash");
                  if (txHash) {
                    res.json({
                      status: true,
                      message: "Succefully transfer",
                      txHash: txHash,
                    });
                  } else {
                    res.json({
                      status: false,
                      message: "Please try again later",
                    });
                  }
                });
              });
            });
          });
        } else {
          res.json({
            status: false,
            message: "Insufficient balance from admin",
          });
        }
      });
  } else if (type == "tokenupdation") {
    var currencyAddress = req.body.currencyAddress;
    var privateKey = req.body.privkey;
    var cryptoPass = req.body.cryptoPass;
    var userAddress = req.body.userAddress;
    var userprivatekey = req.body.userprivatekey;
    //var decimals = req.body.decimals;
    var decimals = 18;
    console.log(req.body, "req.body in token updation");
    // var contractAddr = req.body.contract_address;
    console.log(userAddress, "userAddress");
    console.log(userAddress, "userAddress");

    let contract = new web3.eth.Contract(minABI, contractAddr);
    contract.methods
      .balanceOf(currencyAddress)
      .call(function (err, tokenbalance) {
        console.log(err, ")))))))))))))");

        var realtokenbalance = tokenbalance / Math.pow(10, decimals);
        // var tokenbalnce = web3.utils.fromWei(tokenbalance, "ether");

        console.log(tokenbalance, "tokenbalnce");
        if (realtokenbalance > 0) {
          var account = currencyAddress;

          web3.eth.getBalance(account, (err, balance) => {
            console.log(balance, "jhhk");
            // return false;
            const accountNonce = (
              web3.eth.getTransactionCount(userAddress) + 1
            ).toString(16);
            console.log("in balance");
            web3.eth.getTransactionCount(account, (err, txCount) => {
              web3.eth.getGasPrice(function (err, getGasPrice) {
                var gaslimit = web3.utils.toHex(50000);
                var fee = web3.utils.toHex(getGasPrice) * gaslimit;
                console.log(fee, "feeeeeee");
                if (balance > fee) {
                  var send_amount = tokenbalance;
                  var tokenamount = web3.utils.toHex(send_amount);
                  console.log(tokenamount, "token amount");
                  try {
                    //https.get("https://"+config.apitype+".etherscan.io/api?module=contract&action=getabi&address=" + curncydet.contractAddress, (resp) => {
                    https
                      .get(
                        "https://api.etherscan.io/api?module=contract&action=getabi&address=" +
                          contractAddr +
                          "&apikey=Y7QU8FKWFUT55RHCES4NXMJRBDX8Q29YPG",
                        (resp) => {
                          let data = "";
                          resp.on("data", (chunk) => {
                            data += chunk;
                          });
                          resp.on("end", () => {
                            var abiResponse = JSON.parse(data);
                            if (
                              abiResponse.message == "OK" &&
                              abiResponse.result != ""
                            ) {
                              var to_address = userAddress;
                              var contractAddress = contractAddr;
                              const abi = JSON.parse(abiResponse.result);
                              try {
                                erc20.sendERC20Transaction(
                                  currencyAddress,
                                  userAddress,
                                  tokenamount,
                                  privateKey,
                                  contractAddress,
                                  abi,
                                  function (txid) {
                                    if (txid != "" && txid) {
                                      res.json({
                                        status: true,
                                        message: "Succefully transfer",
                                        tokenbalnce: realtokenbalance,
                                        txHash: txid,
                                      });
                                    }
                                  }
                                );
                              } catch (e) {
                                console.log("catch", e);
                              }
                            } else {
                              console.log(abiResponse);
                            }
                          });
                        }
                      )
                      .on("error", (err) => {
                        console.log("Error: " + err.message);
                      });
                  } catch (err) {
                    console.log("catch", err);
                  }
                } else {
                  console.log("no balance");
                  web3.eth.getBalance(userAddress, (err, balance) => {
                    web3.eth.getTransactionCount(
                      userAddress,
                      (err, txCount) => {
                        console.log(balance, "Admin___balance");
                        web3.eth.getGasPrice(function (err, getGasPrice) {
                          var gaslimit = web3.utils.toHex(50000);

                          var fee = web3.utils.toHex(getGasPrice) * gaslimit;
                          var admin_send_amt =
                            parseFloat(0.01) * 1000000000000000000;

                          var fee = admin_send_amt - fee;

                          let transactionObject = {
                            from: userAddress,
                            gasLimit: web3.utils.toHex(50000),
                            gasPrice: web3.utils.toHex(getGasPrice),
                            nonce: txCount,
                            to: currencyAddress,
                            value: fee,
                          };
                          console.log("transactionObject", transactionObject);

                          // return false;
                          console.log("transactionObject", transactionObject);
                          var adminprivkey = req.body.userprivatekey;
                          console.log(adminprivkey, "userprivatekey55");
                          console.log(req.body.cryptoPass, "cryptoPass");

                          var decrypted = CryptoJS.AES.decrypt(
                            adminprivkey.toString(),
                            req.body.cryptoPass
                          );
                          var decryptedData = decrypted.toString(
                            CryptoJS.enc.Utf8
                          );
                          // var adminprivkey = decryptedData.substring(2);
                          var adminprivkey = decryptedData;
                          console.log(adminprivkey, "adminprivkeyadminprivkey");
                          var userprivatekey1 = Buffer.from(
                            adminprivkey,
                            "hex"
                          );

                          const tx = new Tx(transactionObject, {
                            chain: mode,
                          });
                          tx.sign(userprivatekey1);
                          const serializedTx = tx.serialize();
                          console.log(serializedTx);
                          const raw1 = "0x" + serializedTx.toString("hex");
                          console.log(raw1);
                          if (fee > 0) {
                            web3.eth
                              .sendSignedTransaction(raw1)
                              .on("receipt", function (receipt) {
                                console.log(receipt, "receipt");
                              })
                              .then(function (receipt) {
                                console.log(receipt, "receiptreceipt");
                                console.log("in balance");

                                var send_amount = tokenbalance;
                                var tokenamount = web3.utils.toHex(send_amount);
                                console.log(tokenamount, "token amount");

                                try {
                                  //https.get("https://"+config.apitype+".etherscan.io/api?module=contract&action=getabi&address=" + curncydet.contractAddress, (resp) => {
                                  https
                                    .get(
                                      "https://api.etherscan.io/api?module=contract&action=getabi&address=" +
                                        contractAddr +
                                        "&apikey=Y7QU8FKWFUT55RHCES4NXMJRBDX8Q29YPG",
                                      (resp) => {
                                        let data = "";
                                        resp.on("data", (chunk) => {
                                          data += chunk;
                                        });
                                        resp.on("end", () => {
                                          var abiResponse = JSON.parse(data);
                                          if (
                                            abiResponse.message == "OK" &&
                                            abiResponse.result != ""
                                          ) {
                                            var to_address = userAddress;
                                            var contractAddress = contractAddr;
                                            const abi = JSON.parse(
                                              abiResponse.result
                                            );
                                            try {
                                              erc20.sendERC20Transaction(
                                                currencyAddress,
                                                userAddress,
                                                tokenamount,
                                                privateKey,
                                                contractAddress,
                                                abi,
                                                function (txid) {
                                                  if (txid != "" && txid) {
                                                    res.json({
                                                      status: true,
                                                      message:
                                                        "Succefully transfer",
                                                      tokenbalnce:
                                                        realtokenbalance,
                                                      txHash: txid,
                                                    });
                                                  }
                                                }
                                              );
                                            } catch (e) {
                                              console.log("catch", e);
                                            }
                                          } else {
                                            console.log(abiResponse);
                                          }
                                        });
                                      }
                                    )
                                    .on("error", (err) => {
                                      console.log("Error: " + err.message);
                                    });
                                } catch (err) {
                                  console.log("catch", err);
                                }
                              })
                              .catch((err) => {
                                console.log(err, "receipt error");
                              });
                          }
                        });
                      }
                    );
                  });
                }
              });
            });
          });
        } else {
          console.log("else part");
          res.json({ status: false, message: "There is no new deposit" });
        }
      });

    //   console.log(req.body,"token incomming changes")
    //   var currencyAddress = req.body.currencyAddress;
    //   var privKey = req.body.privKey;
    //   var cryptoPass = req.body.cryptoPass;
    //   var userAddress = req.body.userAddress;
    //   var userprivatekey = req.body.userprivatekey;
    //   var decimals = req.body.decimals;
    //   console.log(req.body, "req.body in token updation");
    //   console.log(privKey,"privKey",currencyAddress,"currencyAddress")
    //   contract.methods
    //     .balanceOf(currencyAddress)
    //     .call(function (err, tokenbalance) {
    //       console.log(err);
    //       console.log(tokenbalance,"tokenbalancetokenbalancetokenbalance",cryptoPass,"cryptoPass",userAddress,"userAddress",userprivatekey,"userprivatekey",decimals,"decimals")

    //       var muldecimal;
    //       if (decimals == 1) {
    //         muldecimal = 10
    //       } else if (decimals == 2) {
    //         muldecimal = 100
    //       }
    //       else if (decimals == 4) {
    //         muldecimal = 10000
    //       }
    //       else if (decimals == 8) {
    //         muldecimal = 100000000
    //       }
    //        else if (decimals == 6) {
    //         muldecimal = 1000000
    //       }
    //       else if (decimals == 18) {
    //         muldecimal = 1000000000000000000
    //       }
    //       var realtokenbalance = tokenbalance;
    //       // var tokenbalnce = web3.utils.fromWei(tokenbalance, "ether");

    //       var tokenbalnce = parseFloat(tokenbalance) * muldecimal;

    //       console.log(tokenbalance, "tokenbalnce");
    //       if (tokenbalance > 0) {
    //         var account = currencyAddress;

    //         web3.eth.getBalance(account, (err, balance) => {
    //           console.log(balance, "jhhk");
    //           // return false;
    //           const accountNonce = (
    //             web3.eth.getTransactionCount(userAddress) + 1
    //           ).toString(16);
    //           console.log("in balance");
    //           web3.eth.getTransactionCount(account, (err, txCount) => {
    //             web3.eth.getGasPrice(function (err, getGasPrice) {
    //               var gaslimit = web3.utils.toHex(500000);
    //               var fee = web3.utils.toHex(getGasPrice) * gaslimit;
    //               console.log(fee, "feeeeeee");
    //               if (balance > fee) {
    //                 var tokenamount = web3.utils.toHex(
    //                   web3.utils.toWei(tokenbalnce.toString(), "ether")
    //                 );
    //                 console.log(tokenamount, "token amount");
    //                 var data = contract.methods
    //                   .transfer(userAddress, tokenamount)
    //                   .encodeABI();
    //                 let transactionObject = {
    //                       gasLimit: web3.utils.toHex(50000),
    //                       gasPrice: web3.utils.toHex(getGasPrice),
    //                       // gasPrice : web3.utils.toHex(web3.utils.toWei('5','gwei')),
    //                       data: data,
    //                       nonce: txCount,
    //                       from: account,
    //                       to: contractAddr,
    //                       // value:web3.utils.toHex(web3.utils.toWei(tokenamount,'ether'))
    //                 };
    //                 web3.eth.accounts.signTransaction(
    //                   transactionObject,
    //                   privKey,
    //                   function (error, signedTx) {
    //                     if (error) {
    //                       console.log(error);
    //                       // handle error
    //                     } else {
    //                       web3.eth
    //                         .sendSignedTransaction(signedTx.rawTransaction)
    //                         .on("receipt", function (receipt) {
    //                           console.log(receipt, "receipt");
    //                           res.json({
    //                             status: true,
    //                             message: "Succefully transfer",
    //                             tokenbalnce: realtokenbalance,
    //                             txHash: receipt.blockHash,
    //                           });
    //                           //do something
    //                         });
    //                     }
    //                   }
    //                 );
    //               } else {
    //                 console.log("no balance");
    //                 web3.eth.getTransactionCount(userAddress, (err, txCount) => {
    //                   web3.eth.getGasPrice(function (err, getGasPrice) {
    //                     var gaslimit = web3.utils.toHex(50000);
    //                     var fee = web3.utils.toHex(getGasPrice) * gaslimit;

    //                     fee =
    //                       parseFloat(fee - balance) +
    //                       parseFloat(web3.utils.toWei("0.00001", "ether"));
    //                     let transactionObject = {
    //                       gasLimit: web3.utils.toHex(500000),
    //                       gasPrice: web3.utils.toHex(getGasPrice),
    //                       nonce: txCount,
    //                       to: account,
    //                       value: fee,
    //                     };
    //                     var adminprivkey = req.body.userprivatekey;
    //                     console.log(adminprivkey, "userprivatekey55");
    //                     console.log(req.body.cryptoPass, "cryptoPass");

    //                     var decrypted = CryptoJS.AES.decrypt(
    //                       adminprivkey.toString(),
    //                       req.body.cryptoPass
    //                     );
    //                     var decryptedData = decrypted.toString(CryptoJS.enc.Utf8);
    //                     var adminprivkey = decryptedData.substring(2);
    //                     console.log(adminprivkey);
    //                     var userprivatekey1 = Buffer.from(adminprivkey, "hex");

    //                     const tx = new Tx(transactionObject, {
    //                       chain: mode
    //                     });
    //                     tx.sign(userprivatekey1);
    //                     const serializedTx = tx.serialize();
    //                     console.log(serializedTx);
    //                     const raw1 = "0x" + serializedTx.toString("hex");
    //                     console.log(raw1);

    //                     web3.eth
    //                       .sendSignedTransaction(raw1)
    //                       .on("receipt", function (receipt) {
    //                         console.log(receipt, "receipt");
    //                       })
    //                       .then(function (receipt) {
    //                         console.log("in balance");
    //                         web3.eth.getTransactionCount(
    //                           account,
    //                           (err, txCount) => {
    //                             web3.eth.getGasPrice(function (err, getGasPrice) {
    //                               var tokenamount = web3.utils.toHex(
    //                                 web3.utils.toWei(
    //                                   tokenbalnce.toString(),
    //                                   "ether"
    //                                 )
    //                               );
    //                               console.log(tokenamount, "token amount");
    //                               var data = contract.methods
    //                                 .transfer(userAddress, tokenamount)
    //                                 .encodeABI();
    //                               let transactionObject = {
    //                                 gasLimit: web3.utils.toHex(500000),
    //                                 gasPrice: web3.utils.toHex(getGasPrice),
    //                                 // gasPrice : web3.utils.toHex(web3.utils.toWei('5','gwei')),
    //                                 data: data,
    //                                 nonce: txCount,
    //                                 from: account,
    //                                 to: contractAddr,
    //                                 // value:web3.utils.toHex(web3.utils.toWei(tokenamount,'ether'))
    //                               };
    //                               var decrypted = CryptoJS.AES.decrypt(
    //                                 privKey.toString(),
    //                                 req.body.cryptoPass
    //                               );
    //                               var decryptedData = decrypted.toString(
    //                                 CryptoJS.enc.Utf8
    //                               );
    //                                 web3.eth.accounts.signTransaction(
    //                                 transactionObject,
    //                                 userprivatekey,
    //                                 function (error, signedTx) {
    //                                   if (error) {
    //                                     console.log(error);
    //                                     // handle error
    //                                   } else {
    //                                     web3.eth
    //                                       .sendSignedTransaction(
    //                                         signedTx.rawTransaction
    //                                       )
    //                                       .on("receipt", function (receipt) {
    //                                         console.log(receipt, "receipt");
    //                                        return res.json({
    //                                             status: true,
    //                                             message: "Succefully transfer",
    //                                             tokenbalnce: realtokenbalance,
    //                                             txHash: receipt.blockHash,
    //                                         });
    //                                       });
    //                                   }
    //                                 }
    //                               );
    //                             });
    //                           }
    //                         );
    //                       });
    //                   });
    //                 });
    //               }
    //             });
    //           });
    //         });
    //       } else {
    //         console.log("else part");
    //         res.json({ status: false, message: "There is no new deposit" });
    //       }
    //     });
  } else if (type == "tokentoadmin") {
    console.log(req.body, "req.body in move token");
    var curminabi = JSON.parse(req.body.curminabi);
    var currencyAddress = req.body.currencyAddress;
    var privKey = req.body.privKey;
    var cryptoPass = req.body.cryptoPass;
    var userAddress = req.body.userAddress;
    var userprivatekey = req.body.userprivatekey;
    var curcontractaddress = req.body.curcontractaddress;
    var decimals = req.body.decimals;

    console.log("---curcontractaddress", curcontractaddress);

    // var curminabi = req.body.curminabi;
    try {
      let contract = new web3.eth.Contract(curminabi, curcontractaddress);
      contract.methods
        .balanceOf(currencyAddress)
        .call(function (err, tokenbalance) {
          console.log(err, "------------");
          var realtokenbalance = tokenbalance;
          var muldecimal = 2;
          if (decimals == 1) {
            muldecimal = 10;
          } else if (decimals == 2) {
            muldecimal = 100;
          } else if (decimals == 4) {
            muldecimal = 10000;
          } else if (decimals == 6) {
            muldecimal = 1000000;
          }
          // else if (decimals == 8) {
          //   muldecimal = 100000000
          // }
          console.log("tokenbalance", tokenbalance);
          // var tokenbalnce = web3.utils.fromWei(tokenbalance, "ether");

          var tokenbalnce = parseFloat(tokenbalance) * parseFloat(muldecimal);
          // var tokenbalnce = web3.utils.fromWei(tokenbalance, "ether");
          console.log(tokenbalnce, "tokenbalnce");
          if (tokenbalance > 0) {
            var account = currencyAddress;

            web3.eth.getBalance(account, (err, balance) => {
              console.log(balance, "jhhk");
              // return false;
              const accountNonce = (
                web3.eth.getTransactionCount(userAddress) + 1
              ).toString(16);
              console.log("in balance");
              web3.eth.getTransactionCount(account, (err, txCount) => {
                web3.eth.getGasPrice(function (err, getGasPrice) {
                  var gaslimit = web3.utils.toHex(500000);
                  var fee = web3.utils.toHex(getGasPrice) * gaslimit;
                  console.log(fee, "feeeeeee");
                  console.log("---Inside balance > fee", balance > fee);
                  if (balance > fee) {
                    console.log("----tokenbalnce--1", tokenbalnce);
                    tokenbalnce = parseFloat(tokenbalnce);
                    console.log("----tokenbalnce--2", tokenbalnce);
                    console.log(
                      "--web3.utils.toWei(tokenbalnce.toString()",
                      web3.utils.toWei(tokenbalnce.toString(), "ether")
                    );
                    var tokenamount = web3.utils.toHex(
                      web3.utils.toWei(tokenbalnce.toString(), "ether")
                    );
                    console.log(tokenamount, "token amount");
                    var data = contract.methods
                      .transfer(userAddress, tokenbalance)
                      .encodeABI();
                    console.log("testing on token");
                    let transactionObject = {
                      gasLimit: web3.utils.toHex(500000),
                      gasPrice: web3.utils.toHex(getGasPrice),
                      // gasPrice : web3.utils.toHex(web3.utils.toWei('5','gwei')),
                      data: data,
                      nonce: txCount,
                      from: account,
                      to: curcontractaddress,
                      // value:web3.utils.toHex(web3.utils.toWei(tokenamount,'ether'))
                    };
                    var decrypted = CryptoJS.AES.decrypt(
                      privKey.toString(),
                      cryptoPass
                    );
                    var decryptedData = decrypted.toString(CryptoJS.enc.Utf8);
                    var userprivatek = decryptedData.substring(2);
                    web3.eth.accounts.signTransaction(
                      transactionObject,
                      userprivatek,
                      function (error, signedTx) {
                        if (error) {
                          console.log(error);
                          // handle error
                        } else {
                          web3.eth
                            .sendSignedTransaction(signedTx.rawTransaction)
                            .on("receipt", function (receipt) {
                              console.log(receipt, "receipt");
                              res.json({
                                status: true,
                                message: "Succefully transfer",
                                tokenbalnce: realtokenbalance,
                                txHash: receipt.blockHash,
                              });
                              //do something
                            });
                        }
                      }
                    );
                  } else {
                    console.log("no balance");
                    web3.eth.getTransactionCount(
                      userAddress,
                      (err, txCount) => {
                        console.log("----getTransactionCount-err", err);
                        web3.eth.getGasPrice(function (err, getGasPrice) {
                          console.log("----getGasPrice-err", err);
                          var gaslimit = web3.utils.toHex(500000);
                          var fee = web3.utils.toHex(getGasPrice) * gaslimit;

                          fee =
                            parseFloat(fee - balance) +
                            parseFloat(web3.utils.toWei("0.00001", "ether"));
                          let transactionObject = {
                            gasLimit: web3.utils.toHex(500000),
                            gasPrice: web3.utils.toHex(getGasPrice),
                            nonce: txCount,
                            to: account,
                            value: fee,
                          };
                          var adminprivkey = req.body.userprivatekey;
                          console.log(adminprivkey, "userprivatekey55");
                          // console.log(req.body.cryptoPass, "cryptoPass");

                          var decrypted = CryptoJS.AES.decrypt(
                            adminprivkey.toString(),
                            req.body.cryptoPass
                          );
                          var decryptedData = decrypted.toString(
                            CryptoJS.enc.Utf8
                          );
                          var adminprivkey = decryptedData.substring(2);
                          // console.log(adminprivkey);
                          var userprivatekey1 = Buffer.from(
                            adminprivkey,
                            "hex"
                          );

                          const tx = new Tx(transactionObject, {
                            chain: mode,
                          });
                          tx.sign(userprivatekey1);
                          const serializedTx = tx.serialize();
                          console.log(serializedTx);
                          const raw1 = "0x" + serializedTx.toString("hex");
                          console.log(raw1);

                          web3.eth
                            .sendSignedTransaction(raw1)
                            .on("receipt", function (receipt) {
                              console.log(receipt, "receipt");
                            })
                            .then(function (receipt) {
                              console.log("in balance");
                              web3.eth.getTransactionCount(
                                account,
                                (err, txCount) => {
                                  web3.eth.getGasPrice(function (
                                    err,
                                    getGasPrice
                                  ) {
                                    var tokenamount = web3.utils.toHex(
                                      web3.utils.toWei(
                                        tokenbalnce.toString(),
                                        "ether"
                                      )
                                    );
                                    console.log(tokenamount, "token amount");
                                    var data = contract.methods
                                      .transfer(userAddress, tokenbalance)
                                      .encodeABI();
                                    let transactionObject = {
                                      gasLimit: web3.utils.toHex(500000),
                                      gasPrice: web3.utils.toHex(getGasPrice),
                                      // gasPrice : web3.utils.toHex(web3.utils.toWei('5','gwei')),
                                      data: data,
                                      nonce: txCount,
                                      from: account,
                                      to: curcontractaddress,
                                      // value:web3.utils.toHex(web3.utils.toWei(tokenamount,'ether'))
                                    };
                                    var decrypted = CryptoJS.AES.decrypt(
                                      privKey.toString(),
                                      req.body.cryptoPass
                                    );
                                    var decryptedData = decrypted.toString(
                                      CryptoJS.enc.Utf8
                                    );
                                    var userprivatekey =
                                      decryptedData.substring(2);
                                    web3.eth.accounts.signTransaction(
                                      transactionObject,
                                      userprivatekey,
                                      function (error, signedTx) {
                                        if (error) {
                                          console.log(error);
                                          // handle error
                                        } else {
                                          web3.eth
                                            .sendSignedTransaction(
                                              signedTx.rawTransaction
                                            )
                                            .on("receipt", function (receipt) {
                                              console.log(receipt, "receipt");
                                              res.json({
                                                status: true,
                                                message: "Succefully transfer",
                                                tokenbalnce: realtokenbalance,
                                                txHash: receipt.transactionHash,
                                              });

                                              //do something
                                            });
                                        }
                                      }
                                    );
                                  });
                                }
                              );
                            });
                        });
                      }
                    );
                  }
                });
              });
            });
          } else {
            console.log("else part");
            res.json({ status: false, message: "There is no new deposit" });
          }
        });
    } catch (err) {
      console.log("----err", err);
    }
  } else if (type == "sendtokentouser") {
    // console.log(req.body, "req.body in move token");
    var curminabi = JSON.parse(req.body.curminabi);
    var currencyAddress = req.body.currencyAddress;
    var privKey = req.body.privKey;
    var cryptoPass = req.body.cryptoPass;
    var userAddress = req.body.userAddress;
    var userprivatekey = req.body.userprivatekey;
    var curcontractaddress = req.body.curcontractaddress;
    var decimals = req.body.decimals;
    var tokentosend = req.body.amount;

    // var curminabi = req.body.curminabi;
    let contract = new web3.eth.Contract(curminabi, curcontractaddress);
    contract.methods
      .balanceOf(currencyAddress)
      .call(function (err, tokenbalance) {
        console.log(err);
        var realtokenbalance = tokenbalance;
        var muldecimal = 2;
        if (decimals == 1) {
          muldecimal = 10;
        } else if (decimals == 2) {
          muldecimal = 100;
        } else if (decimals == 4) {
          muldecimal = 10000;
        } else if (decimals == 6) {
          muldecimal = 1000000;
        } else if (decimals == 8) {
          muldecimal = 100000000;
        }
        console.log("tokentosend", tokentosend);
        console.log("muldecimal", muldecimal);

        // var tokenbalnce = web3.utils.fromWei(tokenbalance, "ether");

        var tokenbalnce = parseFloat(tokentosend) * parseFloat(muldecimal);
        // var tokenbalnce = web3.utils.fromWei(tokenbalance, "ether");
        console.log(tokenbalnce, "tokenbalnce");
        if (tokenbalance > 0) {
          var account = currencyAddress;

          web3.eth.getBalance(account, (err, balance) => {
            console.log(balance, "jhhk");
            // return false;
            const accountNonce = (
              web3.eth.getTransactionCount(userAddress) + 1
            ).toString(16);
            console.log("in balance");
            web3.eth.getTransactionCount(account, (err, txCount) => {
              web3.eth.getGasPrice(function (err, getGasPrice) {
                var gaslimit = web3.utils.toHex(500000);
                var fee = web3.utils.toHex(getGasPrice) * gaslimit;
                console.log(fee, "feeeeeee");
                if (balance > fee) {
                  var tokenamount = web3.utils.toHex(
                    web3.utils.toWei(tokenbalnce.toString(), "ether")
                  );
                  console.log(tokenamount, "token amount");
                  var data = contract.methods
                    .transfer(userAddress, tokenbalnce)
                    .encodeABI();
                  console.log("testing on token");
                  let transactionObject = {
                    gasLimit: web3.utils.toHex(500000),
                    gasPrice: web3.utils.toHex(getGasPrice),
                    // gasPrice : web3.utils.toHex(web3.utils.toWei('5','gwei')),
                    data: data,
                    nonce: txCount,
                    from: account,
                    to: curcontractaddress,
                    // value:web3.utils.toHex(web3.utils.toWei(tokenamount,'ether'))
                  };
                  var decrypted = CryptoJS.AES.decrypt(
                    privKey.toString(),
                    cryptoPass
                  );
                  var decryptedData = decrypted.toString(CryptoJS.enc.Utf8);
                  var userprivatek = decryptedData.substring(2);

                  var userprivatekey1 = Buffer.from(userprivatek, "hex");

                  const tx = new Tx(transactionObject);
                  tx.sign(userprivatekey1);
                  const serializedTx = tx.serialize();
                  const raw1 = "0x" + serializedTx.toString("hex");
                  web3.eth.sendSignedTransaction(raw1, (err, txHash) => {
                    console.log("txhash ", txHash);
                    res.json({ status: true, txHash: txHash });
                    if (err) {
                      console.log("Errorr in sending", err);
                    }
                  });
                } else {
                  console.log("no balance");
                }
              });
            });
          });
        } else {
          console.log("else part");
          res.json({ status: false, message: "There is no new deposit" });
        }
      });
  } else if (type == "getTokenBalance") {
    console.log("-----------------Hi body", req.body);
    let balance = await getContractBalance(req.body);
    console.log("-----------------getTokenBalance", balance);
    res.json({ result: balance });
  } else if (type == "crypto_withdraw") {
    try {
      var address = req.body.walletaddress;
      var privKey = req.body.privKey;

      let reqBody = {
        adminPrivateKey: privKey,
        adminAddress: address,
        amount: req.body.amount,
        userAddress: req.body.toaddress,
      };
      let adminPrivateKey = reqBody.adminPrivateKey;
      let getBalance = await web3.eth.getBalance(reqBody.adminAddress);
      let balance = web3.utils.fromWei(getBalance, "ether");
      //console.log(balance, "---balance");
      if (balance >= reqBody.amount) {
        // console.log('oooooo')
        let getGasPrice = await web3.eth.getGasPrice();
        // console.log('oooooo',getGasPrice)
        let txCount = await web3.eth.getTransactionCount(reqBody.adminAddress);
        let gaslimit = web3.utils.toHex(500000);
        let fee = web3.utils.toHex(getGasPrice) * gaslimit;
        if (reqBody.amount > 0) {
          let amount = web3.utils.toHex(
            web3.utils.toWei(reqBody.amount.toString(), "ether")
          );

          const txObject = {
            nonce: web3.utils.toHex(txCount),
            gasLimit: web3.utils.toHex(gaslimit),
            gasPrice: web3.utils.toHex(getGasPrice),
            to: reqBody.userAddress.toString(), // toaddress
            from: reqBody.adminAddress, // from address
            value: amount,
          };
          //console.log(mode, 'mmmmm')

          const tx = new Tx(txObject, { chain: mode });
          let adminPrivateKey1 = Buffer.from(
            adminPrivateKey.substring(2, 66),
            "hex"
          );
          //console.log("-----,adminPrivateKey1", adminPrivateKey1)
          tx.sign(adminPrivateKey1);
          //console.log("-----,adminPrivateKey1-----", adminPrivateKey1)
          const serializedTx = tx.serialize();
          //console.log("-----,serializedTx-----", serializedTx)
          const raw1 = "0x" + serializedTx.toString("hex");
          //console.log("-----,raw1-----", raw1)

          let txHash = await web3.eth.sendSignedTransaction(raw1);
          //console.log("-----,txHash-----", txHash)
          var txid = txHash.transactionHash;

          // let result = {
          //   txHash: txHash
          // }

          res.json({
            message: "Payment sucessfully done",
            status: true,
            txid: txid,
          });
        } else {
          res.json({ status: false, message: "Invalid Amount" });
        }
      } else {
        res.json({ status: false, message: "Insuffient funds" });
      }
    } catch (err) {
      console.log(err, "ETH withdraw coin error");
      res.json({ status: false, message: err.toString() });
    }
  } else if (type == "token_withdraw") {
    try {
      // postData Start Type Format
      // 1.currencySymbol
      // 2.amount
      // 3.sendUserAddress
      // postData End Type Format
      console.log(req.body, "body tokennnnn");
      let reqBody = {
        address: req.body.walletaddress,
        toaddress: req.body.toaddress,
        privKey: req.body.privKey,
        curcontractaddress: req.body.contractAddress,
        amount: req.body.amount,
      };
      var currencyData = req.body.currencyData;
      var curminabi = JSON.parse(currencyData.minABI);
      var currencyAddress = reqBody.address; // login User Address
      var privKey = reqBody.privKey; //  login User Private Key
      // var cryptoPass = reqBody.cryptoPass;
      var userAddress = reqBody.toaddress;
      // var userprivatekey = reqBody.userprivatekey;
      var curcontractaddress = currencyData.contractAddress;
      var decimals = currencyData.decimals;
      var tokentosend = reqBody.amount;

      // var curminabi = req.body.curminabi;
      let contract = new web3.eth.Contract(curminabi, curcontractaddress);
      // console.log(contract,'contractcontractcontractcontract')
      contract.methods
        .balanceOf(currencyAddress)
        .call(function (err, tokenbalance) {
          //console.log(err);
          var realtokenbalance = tokenbalance;
          var muldecimal = 10 ** parseFloat(decimals);
          // if (decimals == 1) {
          //   muldecimal = 10;
          // } else if (decimals == 2) {
          //   muldecimal = 100;
          // } else if (decimals == 4) {
          //   muldecimal = 10000;
          // } else if (decimals == 6) {
          //   muldecimal = 1000000;
          // } else if (decimals == 8) {
          //   muldecimal = 100000000;
          // }

          //console.log("tokentosend", tokentosend);
          //console.log("muldecimal", muldecimal);

          // var tokenbalnce = web3.utils.fromWei(tokenbalance, "ether");

          var tokenbalnce = parseFloat(tokentosend) * parseFloat(muldecimal);
          // console.log(tokenbalnce,'tokenbalncetokenbalncetokenbalnce')
          // var tokenbalnce = web3.utils.fromWei(tokenbalance, "ether");
          //console.log(tokenbalnce, "tokenbalnce");
          if (tokenbalance > 0) {
            var account = currencyAddress;

            web3.eth.getBalance(account, (err, balance) => {
              //console.log(balance, "jhhk");
              // return false;
              const accountNonce = (
                web3.eth.getTransactionCount(userAddress) + 1
              ).toString(16);
              web3.eth.getTransactionCount(account, (err, txCount) => {
                web3.eth.getGasPrice(function (err, getGasPrice) {
                  var gaslimit = web3.utils.toHex(500000);
                  var fee = web3.utils.toHex(getGasPrice) * gaslimit;
                  if (balance > fee) {
                    var tokenamount = web3.utils.toHex(
                      web3.utils.toWei(tokenbalnce.toString(), "ether")
                    );
                    var data = contract.methods
                      .transfer(userAddress, tokenbalnce.toString())
                      .encodeABI();
                    let transactionObject = {
                      gasLimit: web3.utils.toHex(500000),
                      gasPrice: web3.utils.toHex(getGasPrice),
                      data: data,
                      nonce: txCount,
                      from: account,
                      to: curcontractaddress,
                      // value:web3.utils.toHex(web3.utils.toWei(tokenamount,'ether'))
                    };

                    // console.log(
                    //   transactionObject,
                    //   "transactionObjecttransactionObject"
                    // );

                    // sri comment

                    // var decrypted = CryptoJS.AES.decrypt(
                    //   privKey.toString(),
                    //   cryptoPass
                    // );

                    // var decryptedData = decrypted.toString(CryptoJS.enc.Utf8);
                    // var userprivatek = decryptedData.substring(2);

                    // sri End comment

                    if (privKey.substring(0, 2) == "0x") {
                      var userprivatek = privKey.substring(2);
                    } else {
                      var userprivatek = privKey;
                    }
                    console.log("------userprivatek", userprivatek);
                    const EthereumTx = require("ethereumjs-tx").Transaction;

                    var userprivatekey1 = Buffer.from(userprivatek, "hex");

                    const tx = new EthereumTx(transactionObject, {
                      chain: mode,
                    });
                    tx.sign(userprivatekey1);
                    const serializedTx = tx.serialize();
                    const raw1 = "0x" + serializedTx.toString("hex");
                    web3.eth.sendSignedTransaction(raw1, (err, txHash) => {
                      //console.log("txhash ", txHash);

                      res.json({
                        message: "Payment sucessfully done",
                        status: true,
                        txHash: txHash,
                      });
                      if (err) {
                        console.log("Errorr in sending", err);
                      }
                    });
                  } else {
                    // console.log("no balance");
                  }
                });
              });
            });
          } else {
            // console.log("else part");
            res.json({ status: false, message: "There is no new deposit" });
          }
        });
    } catch (err) {
      console.log(err, "ETH withdraw token error");

      res.json({ status: false, message: err.toString() });
    }
  }
});

const getContractBalance = async (reqBody) => {
  try {
    console.log(reqBody, "Cont body");
    let contract = new web3.eth.Contract(
      JSON.parse(reqBody.minABI),
      reqBody.contractAddress
    );
    let balance = await contract.methods.balanceOf(reqBody.ethaddress).call();
    return balance;
  } catch (err) {
    console.log("---error on getContractBalance", err);
    return 0;
  }
};
app.get("/ethnode/fromWei", async function (req, res) {
  try {
    let reqBody = req.body;
    let balance = await web3.utils.fromWei(reqBody.balance, "ether");
    let result = {
      amount: balance,
    };
    return res.status(200).json({ result });
  } catch (err) {
    return res.status(500).json({ error: err.toString() });
  }
});

web3.eth.getBalance(
  "0x897bb4D4f4bb1106a7a40B35f234bbA5D39b112b",
  (err, balance) => {
    if (err) {
      console.error(err);
    }
    console.log(balance, "balancebalancelr 12313111");
  }
);

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
