import { ERC20_ABI, ERC20_ADDRESS, DECIMAL } from "../config/erc20";
import { PROXY_SALE,PROXY_SALE_ABI } from '../config/proxy'
import { SALE_ABI } from '../config/presale'
import toast, { Toaster } from 'react-hot-toast';
import { useWeb3 } from "./useWeb3";
import { getSaleInfo, getSaleInfoCard, UseProxySale, UseSale, UseTokenInfo } from "./useContract";
import { ONEDAYINSECONDS } from "../config/env";
import { getAccount } from "./useAccount";

export const getTotalSalesInfo = async()=>{
    const proxy = await UseProxySale();
   
    let data = await proxy.methods.getTotalSales().call();
    console.log("proxy inside getTotalSales info:",data);
    // const initial = [{
    //     _sale  : "0xA802274ba245171A37d39beC1Fd01cF459A8aeA8",
    //     _start : 142108977862384,
    //     _end : 142116442822384,
    //     _name : "Metaverse Lab"
    // }];
    // data = (initial).concat(data);
  
    const reverseArray = [...data].reverse();
    return (reverseArray);
   
}

export const getSaleCards = async (cards)=>{
    let SaleInfoCards = [];
    await cards.map( async(index)=>{
        const saleInfo = await getSaleInfoCard(index._sale);
        SaleInfoCards.push(saleInfo);
    })
    return SaleInfoCards;
}

export const getSaleCardsLimit = async (cards,start,end)=>{
    let SaleInfoCards = [];
    console.log("Cards data : ",cards,start,end)
    if(cards.length > 0){
   
    for(var i=start;i<cards.length;i++){
        if(i<cards.length){
            const saleInfo = await getSaleInfoCard(cards[i]._sale);
            // if(saleInfo.isWhitelisted){
                SaleInfoCards.push(saleInfo);
                if(SaleInfoCards.length==3){
                    return SaleInfoCards;
                } 
            // }
               
        }   
        else{
            return SaleInfoCards;
        } 
    }
    
    }
    return SaleInfoCards;
}

export const getsaledatalimit = async(cards , start , end) => {
    let SaleInfoCards = [];
    console.log("card" , cards , start , end , cards.length);
    if(cards.length > 0){
        for(var i = start ; i<end ; i++){
            console.log("forlop");
            if(cards.length > i){
                console.log("card[i]" , cards[i]);
                const saleInfo = await getSaleInfoCard(cards[i]);
                // let tokeninfo = await UseTokenInfo()
                SaleInfoCards.push(saleInfo);
            }
            else {
                return SaleInfoCards;
            }
        }
    }
    return SaleInfoCards;
}

export const getlaunchpaddatalimit = async(cards , start , end) => {
    let SaleInfoCards = [];
    console.log("card" , cards , start , end , cards.length);
    if(cards.length > 0 && cards.length > start){
        for(var i = start ; i<end ; i++){
            console.log("forlop" , i);
            if(cards.length > i){
                console.log("card[i]" , cards[i]._sale , i);
                var saleInfo = await getSaleInfoCard(cards[i]._sale ? cards[i]._sale : cards[i].saleaddress);
                if(saleInfo?.useWithToken == "0x0000000000000000000000000000000000000000"){
                    saleInfo = {...saleInfo, ...{coin:"BNB"}};
                    SaleInfoCards.push(saleInfo);
                    console.log("bnb" , SaleInfoCards);
                }
                else{
                    const newdata = await UseTokenInfo(saleInfo.useWithToken);
                    saleInfo = {...saleInfo, ...{coin:newdata.symbol}};
                    SaleInfoCards.push(saleInfo);
                    
                }
                // let tokeninfo = await UseTokenInfo()
                // SaleInfoCards.push(saleInfo);
            }
            else {
                console.log("other" , SaleInfoCards);
                return SaleInfoCards;
            }
        }
    }
    console.log("other" , SaleInfoCards);
    return SaleInfoCards;
}

export const getmycontributiondatalimit = async(cards , start , end) => {
    let SaleInfoCards = [];
    console.log("card" , cards , start , end , cards.length);
    if(cards.length > 0){
        for(var i = start ; i<end ; i++){
            console.log("forlop");
            if(cards.length > i){
                console.log("card[i]" , cards[i]);
                const saleInfo = await getSaleInfoCard(cards[i].saleaddress? cards[i].saleaddress : cards[i]._sale);
                // let tokeninfo = await UseTokenInfo()
                SaleInfoCards.push(saleInfo);
            }
            else {
                return SaleInfoCards;
            }
        }
    }
    return SaleInfoCards;
}

export const gethomelaunchpaddetail = async(cards) => {
    let SaleInfoCards = [];
    console.log("card" , cards , );
    for(var i=0 ;i < cards.length ; i++){
        var saleInfo = await getSaleInfoCard(cards[i].saleaddress);
        SaleInfoCards.push(saleInfo);
    }
    console.log("other" , SaleInfoCards);
    return SaleInfoCards;
}

export const getsearchmycontribution = async(cards) => {
    
}








export const getPrivatesaleFilter = async (cards , isuser)=>{
    let SaleInfoCards = [];
    for(var i =0 ; i < cards.length ; i++){
        let saleInfo = await getSaleInfoCard(cards[i]._sale);
        if(!isuser){
            if(saleInfo.isWhitelisted){
                if(saleInfo?.useWithToken == "0x0000000000000000000000000000000000000000"){
                    // saleInfo.coin = "BNB";
                    // Object.assign({coin:"BNB"} , saleInfo);
                    saleInfo = {...saleInfo, ...{coin:"BNB"}};
                    // saleInfo["coin"] = "BNB"
                    SaleInfoCards.push(saleInfo);
                
                }
                else{
                    const newdata = await UseTokenInfo(saleInfo.useWithToken);
                    // saleInfo.coin = newdata.symbol;
                    // Object.assign(saleInfo , {coin:newdata.symbol});
                    saleInfo = {...saleInfo, ...{coin:newdata.symbol}};
                    // saleInfo["coin"] = newdata.symbol
                    SaleInfoCards.push(saleInfo);
                
                }
            }
        }

        if(isuser){
            const account = getAccount();
            if(saleInfo.isWhitelisted && saleInfo.owner == account){
                if(saleInfo?.useWithToken == "0x0000000000000000000000000000000000000000"){
                    // saleInfo.coin = "BNB";
                    // Object.assign({coin:"BNB"} , saleInfo);
                    saleInfo = {...saleInfo, ...{coin:"BNB"}};
                    // saleInfo["coin"] = "BNB"
                    SaleInfoCards.push(saleInfo);
                
                }
                else{
                    const newdata = await UseTokenInfo(saleInfo.useWithToken);
                    // saleInfo.coin = newdata.symbol;
                    // Object.assign(saleInfo , {coin:newdata.symbol});
                    saleInfo = {...saleInfo, ...{coin:newdata.symbol}};
                    // saleInfo["coin"] = newdata.symbol
                    SaleInfoCards.push(saleInfo);
                
                }
            }
        }
    }
    return SaleInfoCards;
}


export const getPrivatesaleCardLimit = async (cards,start,end , user)=>{
    console.log("user" , user);
    let SaleInfoCards = [];
    console.log("Cards data : ",cards,start,end)
    if(cards.length > 0){
    for(var i=start;i<cards.length;i++){
        if(i<cards.length){
            let saleInfo = await getSaleInfoCard(cards[i]._sale);
            if(!user){
                if(saleInfo.isWhitelisted){
                    if(saleInfo?.useWithToken == "0x0000000000000000000000000000000000000000"){
                        // saleInfo.coin = "BNB";
                        // Object.assign({coin:"BNB"} , saleInfo);
                        saleInfo = {...saleInfo, ...{coin:"BNB"}};
                        // saleInfo["coin"] = "BNB"
                        SaleInfoCards.push(saleInfo);
                    if(SaleInfoCards.length==3){
                        return {index : i+1 , saleInfoCards : SaleInfoCards};
                    } 
                    }
                    else{
                        const newdata = await UseTokenInfo(saleInfo.useWithToken);
                        // saleInfo.coin = newdata.symbol;
                        // Object.assign(saleInfo , {coin:newdata.symbol});
                        saleInfo = {...saleInfo, ...{coin:newdata.symbol}};
                        // saleInfo["coin"] = newdata.symbol
                        SaleInfoCards.push(saleInfo);
                    if(SaleInfoCards.length==3){
                        return {index : i+1 , saleInfoCards : SaleInfoCards};
                    } 
                    }
                   
                console.log("saleinfoooo" , saleInfo);
                }
            }

            if(user){
                const account = getAccount();
                if(saleInfo.owner == account && saleInfo.isWhitelisted){
                    if(saleInfo?.useWithToken == "0x0000000000000000000000000000000000000000"){
                        // saleInfo.coin = "BNB";
                        // Object.assign({coin:"BNB"} , saleInfo);
                        saleInfo = {...saleInfo, ...{coin:"BNB"}};
                        // saleInfo["coin"] = "BNB"
                        SaleInfoCards.push(saleInfo);
                    if(SaleInfoCards.length==3){
                        return {index : i+1 , saleInfoCards : SaleInfoCards};
                    } 
                    }
                    else{
                        const newdata = await UseTokenInfo(saleInfo.useWithToken);
                        // saleInfo.coin = newdata.symbol;
                        // Object.assign(saleInfo , {coin:newdata.symbol});
                        saleInfo = {...saleInfo, ...{coin:newdata.symbol}};
                        // saleInfo["coin"] = newdata.symbol
                        SaleInfoCards.push(saleInfo);
                    if(SaleInfoCards.length==3){
                        return {index : i+1 , saleInfoCards : SaleInfoCards};
                    } 
                    }
                }
            }
        }   
        else{
            return {index : i+1 , saleInfoCards : SaleInfoCards};
        } 
    }
    
        return {index : cards.length , saleInfoCards : SaleInfoCards};
    
    }
    // return SaleInfoCards;
}

export const getLaunchpadsaleCardLimit = async (cards,start,end , user)=>{
    console.log("user" , user);
    let SaleInfoCards = [];
    console.log("Cards data : ",cards,start,end)
    if(cards.length > 0){
    for(var i=start;true;i++){
        if(i<cards.length){
            let saleInfo = await getSaleInfoCard(cards[i]._sale);
            if(!user){
                if(!saleInfo.isWhitelisted){
                    if(saleInfo?.useWithToken == "0x0000000000000000000000000000000000000000"){
                        // saleInfo.coin = "BNB";
                        // Object.assign({coin:"BNB"} , saleInfo);
                        saleInfo = {...saleInfo, ...{coin:"BNB"}};
                        // saleInfo["coin"] = "BNB"
                        SaleInfoCards.push(saleInfo);
                    if(SaleInfoCards.length==3){
                        return {index : i , saleInfoCards : SaleInfoCards};
                    } 
                    }
                    else{
                        const newdata = await UseTokenInfo(saleInfo.useWithToken);
                        // saleInfo.coin = newdata.symbol;
                        // Object.assign(saleInfo , {coin:newdata.symbol});
                        saleInfo = {...saleInfo, ...{coin:newdata.symbol}};
                        // saleInfo["coin"] = newdata.symbol
                        SaleInfoCards.push(saleInfo);
                    if(SaleInfoCards.length==3){
                        return {index : i , saleInfoCards : SaleInfoCards};
                    } 
                    }
                    // const newdata = await UseTokenInfo(saleInfo.useWithToken);
                console.log("saleinfoooo" , saleInfo);
                // console.log("saleinfoooo" , newdata);
                    // Object.assign({coin:newdata.symbol} , saleInfo)
                    // saleInfo.coin = newdata.symbol;
                    // SaleInfoCards.push(saleInfo);
                    // if(SaleInfoCards.length==3){
                    //     return SaleInfoCards;
                    // } 
                }
            }

            if(user){
                const account = getAccount();
                if(saleInfo.owner == account && !saleInfo.isWhitelisted){
                    if(saleInfo?.useWithToken == "0x0000000000000000000000000000000000000000"){
                        // saleInfo.coin = "BNB";
                        // Object.assign({coin:"BNB"} , saleInfo);
                        saleInfo = {...saleInfo, ...{coin:"BNB"}};
                        // saleInfo["coin"] = "BNB"
                        SaleInfoCards.push(saleInfo);
                    if(SaleInfoCards.length==3){
                        return {index : i , saleInfoCards : SaleInfoCards};
                    } 
                    }
                    else{
                        const newdata = await UseTokenInfo(saleInfo.useWithToken);
                        // saleInfo.coin = newdata.symbol;
                        // Object.assign(saleInfo , {coin:newdata.symbol});
                        saleInfo = {...saleInfo, ...{coin:newdata.symbol}};
                        // saleInfo["coin"] = newdata.symbol
                        SaleInfoCards.push(saleInfo);
                    if(SaleInfoCards.length==3){
                        return {index : i , saleInfoCards : SaleInfoCards};
                    } 
                    }
                }
            }
        }   
        else{
            return {index : i , saleInfoCards : SaleInfoCards};
        } 
    }
    
    }
    // return SaleInfoCards;
}

export const searchSale = async(SaleInfoCards,search) =>{
   const filteredData = await SaleInfoCards.filter(value => ((value._name).toUpperCase()).includes(search.toUpperCase()));
  // console.log("Sale filteredData : ",filteredData)
   let filteredCard = [];
   await filteredData.map( async(index)=>{
    const saleInfo = await getSaleInfoCard(index._sale);
    filteredCard.push(saleInfo);
    })
    console.log("Sale filteredCard : ",filteredCard)
   return filteredCard;
}

export const searchCards = async(SaleInfoCards, search) => {
    console.log("SaleInfoCards, search" , SaleInfoCards, search);
    const filteredData = await SaleInfoCards.filter(value => ((value._name).toUpperCase()).includes(search.toUpperCase()));
    console.log("filtered data" , filteredData);
    return filteredData;
}

export const isSaleLive = (start,end,isOpen) => {
    return (Date.now() >= (start*1000) && Date.now()<= (end*1000)) && isOpen;
}

export const isUpcoming = (start,end) =>{
    return (Date.now() < (start*1000));
}

export const isSaleEnded = (start,end,isOpen) => {
    return (Date.now() >= (end*1000)) || !isOpen
}

export const UpcomingDiffernce = (start) => {
    return ((start*1000) - Date.now());
}

export const Salediffernce = (end)=>{
    return ((end*1000)-Date.now());
}


export const processCSV = (str, delim=',') => {
    const headers = str.slice(0,str.indexOf('\n')).split(delim);
    const rows = str.slice(str.indexOf('\n')+1).split('\n');

    const newArray = rows.map( row => {
        const values = row.split(delim);
        const eachObject = headers.reduce((obj, header, i) => {
            obj[header] = values[i];
            return obj;
        }, {})
        return eachObject;
    })

    return (newArray)
}

