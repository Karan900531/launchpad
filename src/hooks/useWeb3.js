import Web3 from "web3"
import WalletConnectProvider from "@walletconnect/web3-provider";
import { CHAINS } from "../config/env";
import toast, { Toaster } from 'react-hot-toast';
import { iconTheme, position, style } from "./useToast";

export const useWeb3 = async() =>{
  
 const RPC_URL =  CURRENT_RPC_URL();
 const CHAIN_ID = CURRENT_CHAIN_ID();
const httpProvider = new Web3.providers.HttpProvider(RPC_URL)
let web3;

  if(localStorage.getItem("walletconnect")!=null){
    const RPC_DATA = {};
    RPC_DATA[CHAIN_ID] = RPC_URL
    const ethereum = new WalletConnectProvider({
        rpc: RPC_DATA,
        network: 'binance',
        chainId: CHAIN_ID,
        // infuraId: "69de03b5c7194095980c9233f9cf71df",
    }
    );

    await ethereum.enable()
    web3 = new Web3(ethereum);

  //  return web3;
  }else if(localStorage.getItem("accountInfo")!=null){
   web3 = new Web3(window.ethereum);
 //   return web3;
  }else{
   web3 = new Web3(httpProvider);
 //   return web3;
  }
  const chainIds = await web3.eth.getChainId();
  if(parseInt(chainIds) != parseInt(CHAIN_ID)){
        const data = await SwitchChain();
        if(data){
          window.location.reload();
        }
    }

  return web3;
  
}

export const UseProvider = async () =>{
  const RPC_URL =  CURRENT_RPC_URL();
  const CHAIN_ID = CURRENT_CHAIN_ID();
  if(localStorage.getItem("walletconnect")!=null){
    const RPC_DATA = {};
    RPC_DATA[CHAIN_ID] = RPC_URL
    const ethereum = new WalletConnectProvider({
        rpc: RPC_DATA,
        network: 'binance',
        chainId: CHAIN_ID,
        // infuraId: "69de03b5c7194095980c9233f9cf71df",
    }
    );
 
     await ethereum.enable()
    
 
     return ethereum;
   }else if(localStorage.getItem("accountInfo")!=null){
     return window.ethereum;
   }
}

export const addTokentoMetamask = async (tokenAddress,tokenSymbol,tokenDecimals,tokenImage)=>{
  try {
    // wasAdded is a boolean. Like any RPC method, an error may be thrown.
    const wasAdded =  await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20', // Initially only supports ERC20, but eventually more!
        options: {
          address: tokenAddress, // The address that the token is at.
          symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
          decimals: tokenDecimals, // The number of decimals in the token
          image: tokenImage, // A string url of the token logo
        },
      },
    });
  
    if (wasAdded) {
      console.log('Token Added');
    } else {
      console.log('Your loss!');
    }
  } catch (error) {
    console.log(error);
  }
}

export const CURRENT_RPC_URL = ()=>{
   const index = localStorage.getItem("CHAIN") ? localStorage.getItem("CHAIN") : "0";
   console.log("rpc url : ",CHAINS[index].RPC_URL)
   return CHAINS[index].RPC_URL;
}

export const CURRENT_CHAIN_ID = ()=>{
  const index = localStorage.getItem("CHAIN") ? localStorage.getItem("CHAIN") : "0";
  return CHAINS[index].CHAIN_ID;
}

const SwitchChain = async()=>{
  const RPC_URL =  CURRENT_RPC_URL();
  const CHAIN_ID = CURRENT_CHAIN_ID();
     // Check if MetaMask is installed
 // MetaMask injects the global API into window.ethereum
 const hexString = CHAIN_ID.toString(16);
 if (window.ethereum) {
    try {
      // check if the chain to connect to is installed
      
      const data =  window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: "0x"+hexString }], // chainId must be in hexadecimal numbers
      });
      await toast.promise(data, {
        loading: 'Switching Network ...',
        success: 'Network Switched Successfully',
        error: 'Error ! When Switching Network',
    }, {
      position:position.position,
      style:style,
      iconTheme: iconTheme
    });
     return true;
    } catch (error) {
      // This error code indicates that the chain has not been added to MetaMask
      // if it is not, then install it into the user MetaMask
      if (error.code === 4902) {
        try {
          const data =  window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: "0x"+hexString,
                rpcUrl: RPC_URL,
              },
            ],
          });
          await toast.promise(data, {
            loading: 'Switching Network ...',
            success: 'Network Switched Successfully',
            error: 'Error ! When Switching Network',
        }, {
          position:position.position,
          style:style,
          iconTheme: iconTheme
        });
          return true;
        } catch (addError) {
          console.error(addError);
          toast.error(`Error : ${addError}`,
      {
        position:position.position,
        style:style,
        iconTheme: iconTheme
      });
        }
      }
      console.error(error);
    }
  } else {
    // if no window.ethereum then MetaMask is not installed
    console.log('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
    return false;
    
  } 
}


