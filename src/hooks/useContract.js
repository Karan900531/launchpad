import { ERC20_ABI, ERC20_ADDRESS, DECIMAL } from "../config/erc20";
import { PROXY_SALE,PROXY_SALE_ABI,PROXY } from '../config/proxy'
import { CHAINS, FUND_RECEIVER, TOKEN_FEE, WBNB_Address, ZEROTH_ADDRESS } from "../config/env";
import { SALE_ABI } from '../config/presale'
import toast, { Toaster } from 'react-hot-toast';
import { CURRENT_CHAIN_ID, CURRENT_RPC_URL, useWeb3 } from "./useWeb3";
import { DEPLOYMENT_FEE, STANDARD_TOKEN_ABI,  STANDARD_TOKEN_BYTECODE } from "../config/standard";
import { getAccount } from "./useAccount";
import Web3 from "web3"
import { LIQUIDITY_TOKEN_ABI, LIQUIDITY_TOKEN_BYTECODE, LIQUIDITY_TOKEN_DEPLOYMENT_FEE } from "../config/liquiditytoken";
import { iconTheme, position, style } from "./useToast";
import { LOCK_ABI, LOCK_ADDRESS } from "../config/lock";
import { userlaunchpadhook } from "./usebackend";


   
export const UseERC20 = async (VALUE) =>{
    const web3 = await useWeb3();
    const contract = new web3.eth.Contract(ERC20_ABI, VALUE);
    return contract;                
}

export const UseSale = async (VALUE) =>{
   
    const web3 = await useWeb3();
    const contract = new web3.eth.Contract(SALE_ABI, VALUE);
    return contract;                
}

export const getProxyAddress = ()=>{
    const CHAIN_ID = CURRENT_CHAIN_ID();
    return PROXY[CHAIN_ID];
}

export const checkChainId = (chainId) =>{
    const CHAIN_ID = CURRENT_CHAIN_ID();
    if(parseInt(chainId) != parseInt(CHAIN_ID)){
        toast.error(`Connected to Wrong Network !`,
            {
                style: {
                minWidth: '300px',
                minHeight: '55px'
                }
            });
    }
    return true;
}

export const UseProxySale = async () =>{
     const web3 = await useWeb3();
     const chainId = await web3.eth.getChainId();
     checkChainId(chainId);
     const proxysale = getProxyAddress();
     
     const contract = new web3.eth.Contract(PROXY_SALE_ABI, proxysale);
     console.log("proxysale",contract);
    return contract;   
}

export const getProxyOwner = async () => {
    const proxy = await UseProxySale();
    const owner = await proxy.methods.owner().call();
    return owner;
}

export const getSalecreationFee = async () => {
    const proxy = await UseProxySale();
   
    const Fee = await proxy.methods.depolymentFee().call();
    return Fee;
}


export const UseTokenInfo = async (TOKEN) => {
    console.log("token" , TOKEN);
    const token = await UseERC20(TOKEN);
    const name= await token.methods.name().call();console.log("name" , name);
    const symbol= await token.methods.symbol().call();
    const decimals= await token.methods.decimals().call();
    const data = {
        name: name,
        symbol: symbol,
        decimals: decimals
    }
    console.log("data" , data);
    return data;
}

export const IsValidAddress = async(ADDRESS) =>{
    const web3 = await useWeb3();
    const value = await web3.utils.isAddress(ADDRESS);
    return value;
}

export const getFullBalance = (value) =>{
    const balance = parseFloat(value) / 10 ** parseFloat(DECIMAL)
    return balance.toFixed(2)
}

export const getWholeNumber = (value) => {
    const balance = (parseFloat(value) * 10 ** parseFloat(DECIMAL))
    return toFixedNumber(balance).toString()
}

export const isFloat = (x) => {
    if(!!(x % 1)){
        toast.error(`Decimal Values are not accepted !`,
            {
                style: {
                minWidth: '300px',
                minHeight: '55px'
                }
            });
    }
    return !!(x % 1);
}

export const createPresale = async(token,values,setters,details,account) =>{
    console.log("createsale");
    await InitiatePresale(token,values,setters,details,account);
    // console.log("token[0] in create presale",token[0]);
    const sale = await getSaleAddress(token[0]);
    // console.log("sale in createpresale",sale);

    let wallet = getAccount();
    wallet = wallet.toString();
    wallet = wallet.toLowerCase();
    console.log("wallet" , wallet);
    let payload = {
        walletaddress : wallet,
        saleaddress : sale,
        whitelist : setters[3]
    }
    let createlaunchpad = await userlaunchpadhook(payload);
    console.log("create" , createlaunchpad);
    return sale;  
}

export const InitiatePresale = async(token,values,setters,details,account) =>{
   
    const proxyContract = await UseProxySale();
    const deploymentFee = await proxyContract.methods.getDeploymentFee().call();
    const data =  proxyContract.methods.createPresale(token,values,setters,details).send({ from: account,value:deploymentFee})
    console.log("data in initiate presale",data);
    await toast.promise(data, {
        loading: 'Creating New Presale ...',
        success: 'Presale Created Successfully',
        error: (err) => `Error : ${err.toString()}`,
    }, {
        position:position.position,
    style:style,
    iconTheme: iconTheme
    }
    );
}


export const DeletePresale = async (saleAddress,account) => {
   
    const proxyContract = await UseProxySale();
    const data = proxyContract.methods.deleteSalePresale(saleAddress).send({ from: account})
    await toast.promise(data, {
        loading: 'Deleting the Sale...',
        success: 'Sale Deleted Successfully',
        error: 'Error ! When Delete sale',
    }, {
        position:position.position,
    style:style,
    iconTheme: iconTheme
    });
    await sleep(1000);
    window.location.reload();
}

export const getSaleAddress = async (tokenAddress)=>{
    // console.log("token address inside get sale address",tokenAddress);
      const proxyContract = await UseProxySale();
    const sale = await proxyContract.methods.getSale(tokenAddress).call()
    // console.log("sale in get sale address",sale);
    return sale;
}

export const depositTokens = async (tokenAddress,saleAddress,value,account) => {
 console.log("value",value);  
    const erc20 = await UseERC20(tokenAddress)
    const data = erc20.methods.transfer(saleAddress,value).send({ from: account})
    await toast.promise(data, {
        loading: 'Depositing Tokens ...',
        success: 'Tokens Deposited Successfully',
        error: 'Error ! When Depositing Tokens',
    }, {
        position:position.position,
        style:style,
        iconTheme: iconTheme
    });
    const balance = await erc20.methods.balanceOf(saleAddress).call();
    if(balance >= parseInt(value)){
        return true;
    }else{
        return false;
    }
}

export const checkbalnceTokens = async (tokenAddress,saleAddress) => {
   
       const erc20 = await UseERC20(tokenAddress)
       const balance = await erc20.methods.balanceOf(saleAddress).call();
       return balance;
}



export const getSaleInfo = async(ADDRESS)=>{
    const saleContract = await UseSale(ADDRESS);
    const tokenAddress = await saleContract.methods.tokenAddress().call();
    const isWithoutToken = await saleContract.methods.isWithoutToken().call();
    let name,symbol,decimals = "";
    if(isWithoutToken){
        name = await saleContract.methods.tokenName().call();
        symbol = await saleContract.methods.tokenSymbol().call();
        decimals = await saleContract.methods.tokenDecimals().call();
    }else{
        const tokenContract = await UseERC20(tokenAddress);
         name = await tokenContract.methods.name().call();
         symbol = await tokenContract.methods.symbol().call();
         decimals = await tokenContract.methods.decimals().call();
    }
    const description = await saleContract.methods.description().call();
    const logo = await saleContract.methods.logo().call();
    const start = await saleContract.methods.startTime().call();
    const end = await saleContract.methods.endTime().call();
    const islive = Date.now() >= start && Date.now <= end;
    const earnedCap = await saleContract.methods.earnedCap().call();
    const participants = await saleContract.methods.participants().call();
    const website = await saleContract.methods.social(0).call();
    const twitter = await saleContract.methods.social(1).call();
    const telegram = await saleContract.methods.social(2).call();
    const githup = await saleContract.methods.social(5).call();
    const instagram = await saleContract.methods.social(6).call();
    const discord = await saleContract.methods.social(7).call();
    const reddit = await saleContract.methods.social(8).call();
    const youtube = await saleContract.methods.social(9).call();
    const isPancake = await saleContract.methods.isautoAdd().call();
    const isVested = await saleContract.methods.isVested().call();
    const vestingInterval = await saleContract.methods.vestingInterval().call();
    const vestingPercent = await saleContract.methods.vestingPercent().call();
    const hardCap = await saleContract.methods.hardCap().call();
    const softCap = await saleContract.methods.softCap().call();
    const tokenRatePerEth = await saleContract.methods.tokenRatePerEth().call();
    const minEthLimit = await saleContract.methods.minEthLimit().call();
    const maxEthLimit = await saleContract.methods.maxEthLimit().call();
    const ownerAddress = await saleContract.methods.owner().call();
    const data = {
        name: name,
        symbol: symbol,
        decimals: decimals,
        tokenAddress: tokenAddress,
        logo: logo,
        isWithoutToken: isWithoutToken,
        description: description,
        start: start,
        end: end,
        islive: islive,
        earnedCap: earnedCap,
        participants: participants,
        website: website,
        twitter: twitter,
        telegram: telegram,
        isPancake: isPancake,
        isVested: isVested,
        vestingInterval:vestingInterval,
        vestingPercent: vestingPercent,
        hardCap: hardCap,
        softCap: softCap,
        tokenRatePerEth: tokenRatePerEth,
        minEthLimit: minEthLimit,
        maxEthLimit: maxEthLimit,
        owner: ownerAddress,
        githup:githup,
        instagram:instagram,
        discord:discord,
        reddit:reddit,
        youtube:youtube ,

    }
console.log("owner>>>",data.owner);
    return data;
}

export const GetSalePerAccount = async (account,saleAddress) => {
    // console.log("User data " ,account )
    // const web3 = await useWeb3();
    const saleContract = await UseSale(saleAddress);
    const userData = await saleContract.methods.getUserInfo(account).call();

//     const tokenAddress = await saleContract.methods.tokenAddress().call();
//     const erc20 = await UseERC20(tokenAddress);
//     const bnbBalance = await web3.eth.getBalance(account);
//    const userTokenBalance = await erc20.methods.balanceOf(account).call();
//     console.log("Token address : ",tokenAddress)
//     const userInvested = await saleContract.methods.getUserInvestments(account).call();
//     const userClaimbale = await saleContract.methods.getUserClaimbale(account).call();
//     const getUnsoldTokens = await saleContract.methods.getUnsoldTokensBalance().call();
//     const userWhitelistedAmount = await saleContract.methods.whitelistedAddresses(tokenAddress,account).call();
//     const userData = {
//         bnbBalance: bnbBalance,
//         userInvested: userInvested,
//         userClaimbale: userClaimbale,
//         userWhitelistedAmount: userWhitelistedAmount,
//         userTokenBalance: userTokenBalance,
//         unSoldTokens: getUnsoldTokens
//     }
//     console.log("User data " ,userData )
    return userData;
}

export const getSaleInfoCard = async (saleAddress) => {
    
    const saleContract = await UseSale(saleAddress);
     const data = await saleContract.methods.getSaleInfo().call();
     console.log("new",data);
    
    return data;

}


export const approveContract = async(contract, account,CONTRACT_ADDRESS)=>{
    await contract.methods.approve(CONTRACT_ADDRESS,"115792089237316195423570985008687907853269984665640564039457584007913129639935").send({ from: account})
}

export const  sleep = (ms) => 
{
    new Promise(resolve => setTimeout(resolve, ms))
}

export const Usestandardtoken = async (VALUE) =>{
    const web3 = await useWeb3();
    const contract = new web3.eth.Contract(STANDARD_TOKEN_ABI, VALUE);
    return contract;                
  }

export const CreateStandardToken = async(argument)=>{
    const web3 = await useWeb3();
    const account = getAccount();
    const contract = await Usestandardtoken(CHAINS[localStorage.getItem("CHAIN")].STANDARD_TOKEN_ADDRESS);
    console.log("contract" , contract.methods , account , web3);
    // const fundreceiver = await contract.methods.fundReciever().call();
    // argument.push(fundreceiver);
    
    const balance = await web3.eth.getBalance(account)
    // argument.push(balance > 0.01)
    console.log("argument" , argument , balance > 0.01);
    var fee = await contract.methods._depolymentFee().call();
    var hash = "";
    let createpresale =  contract.methods.createPresaleToken( argument[0] , argument[1] , argument[2] ,
                            argument[3] ).send({from : account , value:fee.toString()}) .on('transactionHash', async(tx) => {
                                // localStorage.setItem("HASH" , JSON.stringify(tx))  , FUND_RECEIVER  , (balance > 0.01)
                            })

    await toast.promise(createpresale, {
        loading: 'Creating New Token ...',
        success: 'Token Created Successfully',
        error: 'Try Again',
    }, { position:position.position,
    style:style,
    iconTheme: iconTheme,
    }
    );
    await sleep(1000);
    console.log("createpresale" , createpresale);
    let length = await contract.methods.tokenLength().call();
    let presaledata = await contract.methods._tokeninfo(length-1).call();
    console.log("presaledata" , presaledata , length);
    sessionStorage.setItem("TKNDATA" , JSON.stringify(presaledata));
    // localStorage.setItem("HASH" , JSON.stringify(createpresale))
    return createpresale;
}


export const gettokendata = async(address) => {
    const contract = await Usestandardtoken(CHAINS[localStorage.getItem("CHAIN")].STANDARD_TOKEN_ADDRESS);
    let tokendata =  contract.methods._presale(address).call();
    return tokendata;
}

export const toFixedNumber = (x)=> {
    if (Math.abs(x) < 1.0) {
        var e = parseInt(x.toString().split('e-')[1]);
        if (e) {
            x *= Math.pow(10, e - 1);
            x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
        }
    } else {
        var e = parseInt(x.toString().split('+')[1]);
        if (e > 20) {
            e -= 20;
            x /= Math.pow(10, e);
            x += (new Array(e + 1)).join('0');
        }
    }
    return x;
}


export const Useliquiditytoken = async (VALUE) =>{
    const web3 = await useWeb3();
    const contract = new web3.eth.Contract(LIQUIDITY_TOKEN_ABI, VALUE);
    return contract;                
  }

  const getRouter = async()=>{
    let chain = localStorage.getItem("CHAIN");
    let router = CHAINS[chain].ROUTER;
    console.log("router" , router);
    return router
  }

  export const Getbalance = async()=>{
    const web3 = await useWeb3();
    const account =  getAccount();
    console.log("amount" , account);
    
    if(account){
        const balance = await web3.eth.getBalance(account);
        return balance/10**18;
    }
    else{
        return null;
    }
    
  }

export const CreateLiquidityToken = async(argument)=>{
   try{const web3 = await useWeb3();
    const account = getAccount();
    const contract = await Useliquiditytoken(CHAINS[localStorage.getItem("CHAIN")].LIQUIDITY_TOKEN_ADDRESS);
    console.log("contract" , contract.methods , account , web3);
    // const fundreceiver = await contract.methods.fundReciever().call();
    // argument.push(fundreceiver);
    
    // const balance = await web3.eth.getBalance(account)
    // argument.push(balance > 0.01)
    console.log("argument" , argument);
    var fee = await contract.methods.fee().call();
    var deployfee = (fee/10**18).toString()
    const router = await getRouter();
    console.log("deploy fee" , fee);
    // await new web3.eth.Contract(LIQUIDITY_TOKEN_ABI)
    //             .deploy({ data: LIQUIDITY_TOKEN_BYTECODE, arguments: argument })
    //             .send({ from: account, value:deployfee })
    //             .then(async(newContractInstance)=>{
    //                 console.log("newContractInstance" , newContractInstance);
    //                 return newContractInstance;
    //             })
    let createpresale =  contract.methods.createPresaleToken( argument[0] , argument[1] , argument[2] ,
        argument[3] , argument[4] , argument[5] , argument[6] , argument[7] ,router).send({from : account , value:fee}) .on('transactionHash', async(tx) => {
            // localStorage.setItem("HASH" , JSON.stringify(tx))
        })

    await toast.promise(createpresale, {
    loading: 'Creating Liquidity Token...',
    success: 'Liquidity Token Created Successfully',
    error: 'Try Again',
    }, { position:position.position,
    style:style,
    iconTheme: iconTheme,
    }
    );
    await sleep(1000);
    console.log("createpresale" , createpresale);
    let length = await contract.methods.tokenLength().call();
    let presaledata = await contract.methods._tokeninfo(length-1).call();
    console.log("presaledata" , presaledata , length);
    sessionStorage.setItem("TKNDATA" , JSON.stringify(presaledata));
    // localStorage.setItem("HASH" , JSON.stringify(createpresale))
    return createpresale;
}
catch(e){
    console.log("error" , e);
}
}



export const Checkaddress = async(address) => {
    const web3 = await useWeb3();
    const account = getAccount();
    
    let errors = {}
    const data = web3.utils.isAddress(address)
    if(data){console.log("checkaddress")
        let tokeninfo = await UseTokenInfo(address);
        console.log("tokeninfo" , tokeninfo);
        const contract = new web3.eth.Contract(ERC20_ABI, address);
        const allowance = await contract.methods.allowance(account , CHAINS[localStorage.getItem("CHAIN")].LOCK_ADDRESS).call();
        const approvebutton = allowance > 0 ? true : false
        console.log("checkaddress" , tokeninfo);
        return {
            isValid : true,
            tokeninfo : tokeninfo,
            allowance : approvebutton
        }
    }
    else{
        errors.tokenaddress = "Invalid address !"
        return {
            isValid : false,
            errors : errors
        };
    }
}

export const Checklaunchpadaddress = async(address) => {
    const web3 = await useWeb3();
    const account = getAccount();
    
    let errors = {}
    const data = web3.utils.isAddress(address)
    if(data){console.log("checkaddress")
        let tokeninfo = await UseTokenInfo(address);
        console.log("tokeninfo" , tokeninfo);
        const contract = new web3.eth.Contract(ERC20_ABI, address);
        const allowance = await contract.methods.allowance(account , CHAINS[localStorage.getItem("CHAIN")].LOCK_ADDRESS).call();
        const approvebutton = allowance > 0 ? true : false
        console.log("checkaddress" , tokeninfo);
        return {
            isValid : true,
            tokeninfo : tokeninfo,
            allowance : approvebutton
        }
    }
    else{
        errors.tokenaddress = "Invalid address !"
        return {
            isValid : false,
            errors : errors
        };
    }
}

export const Gettokenbalance = async(address) => {
    const web3 = await useWeb3();
    const account = getAccount();
    console.log("account" , account);
    const contract = new web3.eth.Contract(ERC20_ABI, address);
    const tokenbalance = await contract.methods.balanceOf(account).call();
    console.log("account" , tokenbalance);
    return tokenbalance;
}

export const Approvetoken = async(address , amount)=>{
    console.log("address" , address , amount);
    const web3 = await useWeb3();
    const account = getAccount();
    const contract = new web3.eth.Contract(ERC20_ABI, address);
    const approve =  contract.methods.approve(CHAINS[localStorage.getItem("CHAIN")].LOCK_ADDRESS , "115792089237316195423570985008687907853269984665640564039457584007913129639935").send({from : account})
    await toast.promise(approve, {
        loading: 'Approving...',
        success: 'Approved Successfully',
        error: 'Try Again',
        }, { position:position.position,
        style:style,
        iconTheme: iconTheme,
        }
        );
        await sleep(1000)
    return true;
}

export const Uselockcontract = async (VALUE) =>{
    const web3 = await useWeb3();
    const contract = new web3.eth.Contract(LOCK_ABI, CHAINS[localStorage.getItem("CHAIN")].LOCK_ADDRESS);
    return contract;                
}

export const Createlock = async(data , decimal) => {
    const account = getAccount();
    const contract = await Uselockcontract();
    const amount = (toFixedNumber(data.amount * 10**decimal)).toString();
    const locktime = Math.round(((new Date(data.locktime).getTime())-Date.now())/1000);
    const toaddress = data.anotherowneraddress ? data.anotherowneraddress : account;
    const vestinginfo = data.vesting ? [data.cycle , data.cyclepercent]   : []
    console.log("contractetail" , data.tokenaddress, amount , locktime );
    console.log("datas" , data.tokenaddress, amount , locktime , toaddress , data.vesting , vestinginfo);

    const web3 = await useWeb3();
    const lpcontract = new web3.eth.Contract(ERC20_ABI, data.tokenaddress);
    console.log("lpcontract" , lpcontract);
    let islptoken = false;
    try{
        let istoken = await lpcontract.methods.token0().call();
        console.log("istoken" , istoken);
         islptoken = (istoken.toUpperCase() == ZEROTH_ADDRESS.toUpperCase()) ? true : false;
    }
    catch(e){
        islptoken = true
    }
    // console.log("istoken" , istoken);
    // let islptoken = (istoken.toUpperCase() == ZEROTH_ADDRESS.toUpperCase()) ? true : false;
    const tokenlock =   contract.methods.deposit(data.tokenaddress, amount , locktime , toaddress , data.vesting , vestinginfo , islptoken).send({from : account });
    await toast.promise(tokenlock , {
        loading: 'Creating Lock...',
        success: 'Lock Created Successfully',
        error: 'Try Again',
        }, { position:position.position,
        style:style,
        iconTheme: iconTheme,
        }
        );
    await sleep(1000);
    let tokeninfo = await UseTokenInfo(data.tokenaddress);
    let lockerid = await contract.methods.LpLocker(data.tokenaddress).call();
    let lockerinfo = await contract.methods.lockers(lockerid).call();
    return {
        tokeninfo : tokeninfo,
        lockerinfo : lockerinfo,
        tokenaddress : data.tokenaddress,
        owner : toaddress
    }
}

export const Checkowneraddress = async(data) =>{
    const web3 = await useWeb3();
    const isaddress = web3.utils.isAddress(data)
    return isaddress;
}

export const Getmytokenlock = async(cards,start,end , user) => {
    const account = getAccount();
    const contract = await Uselockcontract();
    console.log("contract" , contract , account);
    const userlocker = await contract.methods.getuserperlocker(account).call();
    return userlocker;
}

export const ViewMylock = async(data) => {
    const account = getAccount();
    const contract = await Uselockcontract();
    const view = await contract.methods.users(account , data).call();
    return view;
}

export const Transferlockownership = async(data) => {
    const account = getAccount();
    const contract = await Uselockcontract();
    const transferowner =  contract.methods.transferLockerOwner(data.lpaddress , account , data.newowneraddress).send({from : account});
    await toast.promise(transferowner , {
        loading: 'Changing Lock Ownershio...',
        success: 'ownership Changed Successfully',
        error: 'Try Again',
        }, { position:position.position,
        style:style,
        iconTheme: iconTheme,
        }
        );
    await sleep(1000);
}

export const Unlocktoken = async(data) => {
    const account = getAccount();
    const contract = await Uselockcontract();
    const unlock =  contract.methods.withdrawFunds(data , account ).send({from : account});
    await toast.promise(unlock , {
        loading: 'Creating Lock...',
        success: 'Lock Created Successfully',
        error: 'Try Again',
        }, { position:position.position,
        style:style,
        iconTheme: iconTheme,
        }
        );
    await sleep(1000);
    return true;
}

export const Getalltokenlock = async(cards,start) => {
    const contract = await Uselockcontract();
    const lock = []
    for(var i=start;i < cards;i++){
        console.log("condition " , i , cards);
        
        if(i < cards){
            const lockaddressinfo = await contract.methods.lockers(i).call();
            // var lockinfo = await contract.methods.getLockerUsersInfo(lockaddressinfo. LPAddress).call();
            var tokeninf = await UseTokenInfo(lockaddressinfo. LPAddress);
            lockaddressinfo.name = tokeninf.name;
            lockaddressinfo.decimal = tokeninf.decimals;
            lockaddressinfo.symbol = tokeninf.symbol;
            lock.push(lockaddressinfo);
            console.log("copy" , lock );
            if(lock.length == 3){
                console.log("lock arrayyyyy" , lock);
                return {
                    index : i+1,
                    lock : lock
                }
            }
        }
        else {
            console.log("elselock arrayyyyy" , lock);
            return {
                index : i,
                lock : lock
            }
        }
        
    }
    return {
        index : i,
        lock : lock
    }
    
    // var alllock = [];
    // [...Array(count)].map(async(data , i)=>{
    //     const address = await contract.methods.lockers(i).call();
    //     const lockdata = await contract.methods.users(address.LPAddress , address.to).call();
    //     alllock.push(lockdata);
    // })
    // return alllock;
}


export const Getlockercount = async()=>{
    const contract = await Uselockcontract();
    const count = await contract.methods.lockerCount().call();
    return count;
}


export const Getsinglelockerinfo = async(address)=>{
    const contract = await Uselockcontract();
    const index = await contract.methods.getLockerId(address).call();
    const lockaddressinfo = await contract.methods.lockers(index).call();
    var tokeninf = await UseTokenInfo(lockaddressinfo. LPAddress);
            lockaddressinfo.name = tokeninf.name;
            lockaddressinfo.decimal = tokeninf.decimals;
            lockaddressinfo.symbol = tokeninf.symbol;
    return lockaddressinfo;
}

export const Getsinglelockerdetail = async(address) => {
    const contract = await Uselockcontract();
    const lockdetail = await contract.methods.getLockerUsersInfo(address).call();
    return lockdetail;
}

export const GetAdminfee = async() => {
    let contract = await UseProxySale();
    const tokencontract = await Usestandardtoken(CHAINS[localStorage.getItem("CHAIN")].STANDARD_TOKEN_ADDRESS);
    const liquidityToken = await Useliquiditytoken(CHAINS[localStorage.getItem("CHAIN")].LIQUIDITY_TOKEN_ADDRESS); 
    var deploymentfee = await contract.methods.getDeploymentFee().call();
    var tokenfee = await tokencontract.methods._depolymentFee().call();
    var liquidityTokenFee = await liquidityToken.methods.fee().call();
    return {
        deploymentfee : deploymentfee,
        tokenfee : tokenfee,
        liquidityTokenFee : liquidityTokenFee
    }
}

export const SetDeploymentfee = async(value) => {
    let contract = await UseProxySale();
    let wallet = getAccount();
    let fee =  contract.methods.setDeploymentFee((value * 10**18).toString()).send({from : wallet});
    await toast.promise(fee , {
        loading: 'Updating fee...',
        success: 'Fee Updated Successfully',
        error: 'Try Again',
        }, { position:position.position,
        style:style,
        iconTheme: iconTheme,
        }
        );
        await sleep(1000);
        window.location.reload();
}

export const SetTokenfee = async(value) => {
  const contract =  await Usestandardtoken(CHAINS[localStorage.getItem("CHAIN")].STANDARD_TOKEN_ADDRESS);
    let wallet = getAccount();
   const data = value * 10**18; 
   
   console.log("value",data);
    let fee = contract.methods.setDeploymentFee(data.toString()).send({from : wallet})
    await toast.promise(fee , {
        loading: 'Updating fee...',
        success: 'Fee Updated Successfully',
        error: 'Try Again',
        }, { position:position.position,
        style:style,
        iconTheme: iconTheme,
        }
        );
        await sleep(1000);
        window.location.reload();
}

export const SetUserfee = async(value) => {
    const liquidityToken = await Useliquiditytoken(CHAINS[localStorage.getItem("CHAIN")].LIQUIDITY_TOKEN_ADDRESS); 
    let wallet = getAccount();
    let fee =  liquidityToken.methods.setFee((value *10**18).toString()).send({from : wallet})
    await toast.promise(fee , {
        loading: 'Updating fee...',
        success: 'Fee Updated Successfully',
        error: 'Try Again',
        }, { position:position.position,
        style:style,
        iconTheme: iconTheme,
        }
        );
        await sleep(1000);
        window.location.reload();
}


export const Withdrawbnb = async() => {
    const proxyContract = await UseProxySale();
    const account = getAccount();
    const data =  proxyContract.methods.withdrawBNB().send({ from: account})
    console.log("data in withdraw",data);
    await toast.promise(data, {
        loading: 'Creating Withdraw ...',
        success: 'Withdrawn Successfully',
        error: (err) => `Error : ${err.toString()}`,
    }, {
        position:position.position,
        style:style,
        iconTheme: iconTheme
    }
    );
}


export const Getliquiditytokenamount = async(address) => {
    console.log("addressaddress",address);
    const proxyContract = await UseSale(address);
    const data =  proxyContract.methods.getLiquidityTokenAmount().call();
    console.log("data in withdraw",data);
    return data;
}

export const Getunsoldtoken = async(address) => {
    const proxyContract = await UseSale(address);
    const data =  proxyContract.methods.getUnsoldTokensBalance().call();
    console.log("data in withdraw",data);
    return data;
}

export const Totalvaluelocked = async(address) => {
    let contract = await UseERC20(WBNB_Address);
    console.log("contract" , contract);
    let balance = await contract.methods.balanceOf("0x2aB5E5AdD110336D47333ed98893fa11659a35B0").call();
    console.log("balance" , balance);
}

export const checkIsApproved = async (account,token,saleaddress) => {
    try{
    const erc20contract = await UseERC20(token);
    const allow = await erc20contract.methods.allowance(account,saleaddress).call();
   
    return (parseInt(allow)>0)?true:false;
}catch (e) {
               
}
}


export const approveContractbuy = async (account, token, presaleaddress) => {

    const erc20Contract = await UseERC20(token);
    const symbol = await erc20Contract.methods.symbol().call();
    const data = erc20Contract.methods.approve(presaleaddress, "115792089237316195423570985008687907853269984665640564039457584007913129639935").send({ from: account })
    await toast.promise(data, {
        loading: `Approving ${symbol} token...`,
        success: 'Approved Successfully',
        error: 'Try Again',
    }, {
        position: position.position,
        style: style,
        iconTheme: iconTheme,
    })
}

