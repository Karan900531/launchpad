import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
import { CURRENT_CHAIN_ID,CURRENT_RPC_URL } from "./useWeb3";
import toast, { Toaster } from 'react-hot-toast';
import { createuserhook, getuserdatahook } from "./usebackend";
import { iconTheme, position, style } from "./useToast";

 
export const MetamaskWallet = async (e) => {
  const RPC_URL =  CURRENT_RPC_URL();
  const CHAIN_ID = CURRENT_CHAIN_ID();
    try{
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            // const chainId = await web3.eth.getChainId();
            // if(parseInt(chainId) != parseInt(CHAIN_ID)){
            //     chainIdCheck()
            //     return true
            // }
             try {
                await window.ethereum.enable().then(async () => {
                    // User has allowed account access to DApp...
                    const accounts = await web3.eth.getAccounts();
                    const account = accounts[0].toString();
                    console.log("account in : ",account)
                    localStorage.setItem("accountInfo",accounts[0]);
                    
                    sessionStorage.setItem("accountInfo",accounts[0])
                    let user = await createuserhook(account.toLowerCase())
                    // window.location.href = window.location.origin + "/wallet"
                    await getuserdata(account)
                    console.log("data in walletconnect ",JSON.stringify(window.ethereum))
                    return web3;
                });
            } catch (e) {
                // User has denied account access to DApp...
            }
        }
        // Legacy DApp Browsers
        else if (window.web3) {
           const web3 = new Web3(window.web3.currentProvider);
           const chainId = await web3.eth.getChainId();
            // if(parseInt(chainId) != parseInt(CHAIN_ID)){
            //     chainIdCheck()
            //     return true
            // }
           const accounts = await web3.eth.getAccounts();
           const account = accounts[0].toString();
           let user = await createuserhook(account.toLowerCase())
           localStorage.setItem("accountInfo",accounts[0]);
           sessionStorage.setItem("accountInfo",accounts[0])
        //    if(window.location.pathname.split('/')[2]){
            
        //    }
        await getuserdata(account)
        //    window.location.href = window.location.origin + "/wallet"
           return web3;
        }
        // Non-DApp Browsers
        else {
            //alert('No Dapp Supported Wallet Found');
            console.log("No Dapp Supported Wallet Found")
            toast.error(`No Dapp Supported Wallet Found !`,
            {
                position:position.position,
                style:style,
                iconTheme: iconTheme
            });
        }
    }catch(e){
      toast.error(`Error : ${e}`,
      {
        position:position.position,
        style:style,
        iconTheme: iconTheme
      });
    }
    
 
}

export const WalletConnect = async (e) => {
  const RPC_URL =  CURRENT_RPC_URL();
  const CHAIN_ID = (CURRENT_CHAIN_ID());
    //Create WalletConnect Provider
    console.log("Wallet connect");
    const RPC_DATA = {};
    RPC_DATA[CHAIN_ID] = RPC_URL
    const provider = new WalletConnectProvider({
        rpc: RPC_DATA,
        network: 'binance',
        chainId: CHAIN_ID,
        // infuraId: "69de03b5c7194095980c9233f9cf71df",
    }
    );
    await provider.enable().then(function (error, result) {
        console.log('error: ' + error);
        console.log(result);

    })
        .catch(e => {
            //try again
            toast.error(`Error : ${e}`,
      {
        position:position.position,
        style:style,
        iconTheme: iconTheme
      });
        });
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    console.log("Account : ", accounts[0]);
    const account = accounts[0].toString();
    localStorage.setItem("accountInfo",accounts[0])
    sessionStorage.setItem("accountInfo",accounts[0])
    console.log("user" , account.toLowerCase());
    let user = await createuserhook(account.toLowerCase())
    await getuserdata(account)
    // window.location.href = window.location.origin + "/wallet"
    // localStorage.setItem("provider",JSON.stringify(provider))
                   

   return provider;
}


const getuserdata = async(account)=>{
    let userdata = await getuserdatahook(account.toLowerCase());
    console.log("userdata" , userdata.data.data);
    // this.setState({investedpools : userdata.data.data.investedpools})
    // this.setState({wishlist : userdata.data.data.wishlist})
    // this.setState({viewlist : userdata.data.data.viewlist})
    // this.setState({investedamount : userdata.data.data.investedamount})
    // let dollar = await Userdollar(userdata.data.data.investedamount);
    // this.setState({dollar : dollar});
    // this.handleactivities();
  }

