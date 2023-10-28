import { ERC20_ABI, ERC20_ADDRESS, DECIMAL } from "../config/erc20";
import { PROXY_SALE,PROXY_SALE_ABI } from '../config/proxy'
import { SALE_ABI } from '../config/presale'
import toast, { Toaster } from 'react-hot-toast';
import { useWeb3 } from "./useWeb3";
import { toFixedNumber, UseSale } from "./useContract";
import { getAccount } from "./useAccount";
import { userinvestedhook } from "./usebackend";
import { iconTheme, position, style } from "./useToast";

export const calculateBuy = async(saleAddress,bnbValue)=>{
    const saleContact = await UseSale(saleAddress);
    const bnbValues = toFixedNumber(bnbValue * 10 **18);
    const willGet = await saleContact.methods.getTokensPerEth(bnbValues.toString()).call();
    return willGet;
}

export const BuyToken = async(saleAddress,useramount,isMax,maxNumber,account,decimal , buytoken)=>{
    console.log("buytoken data" , saleAddress,useramount,isMax,maxNumber,account,decimal);
    const web3 = await useWeb3();
    const saleContact = await UseSale(saleAddress);
    const amount = !isMax? toFixedNumber(useramount * 10 **decimal): maxNumber ;
    if(buytoken == "BNB")
        var data =  saleContact.methods.contribute(amount.toString()).send({ from: account,value: amount.toString() })
    else 
    var data =  saleContact.methods.contribute(amount.toString()).send({ from: account})
    // const data = web3.eth.sendTransaction({ from: account, to: saleAddress, value: amount.toString() })
    
    await toast.promise(data, {
        loading: 'Making a Buy Token Request...',
        success: 'Bougt Token Successfully',
        error: 'Error ! When Buying Token',
    }, {
        position:position.position,
    style:style,
    iconTheme: iconTheme
    }
    );
    let wallet = getAccount();
    if(wallet){
        wallet = wallet.toString();
        wallet = wallet.toLowerCase();
        console.log("wallet" , wallet);
        let payload = {
            walletaddress :wallet,
            saleaddress : saleAddress,
            amount : useramount
        }
        let usercontribute = await userinvestedhook(payload);
    }
}

export const claimToken = async(saleAddress,account) => {
    const saleContact = await UseSale(saleAddress);
    const data = saleContact.methods.claimTokens().send({ from: account });
    await toast.promise(data, {
        loading: 'Requesting for Claim Tokens...',
        success: 'Tokens Claimed Successfully',
        error: 'Error ! When Claiming Token',
    }, {
        position:position.position,
        style:style,
        iconTheme: iconTheme
    }
    );
}

