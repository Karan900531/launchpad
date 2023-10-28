import { useWeb3 } from "./useWeb3";
import { API_URL, CHAINS } from "../config/env";
import axios from "axios";


export const getAccount = () => {
    return localStorage.getItem("accountInfo")? localStorage.getItem("accountInfo"): null;
}

export const getAllocationInfo = (actualBalance,userBalance,vestingInterval,vestingPercentage,initalClaimed) => {
    console.log("Vesting Balance : ",actualBalance,vestingInterval,vestingPercentage,initalClaimed)
   
    let vestingCount = parseInt(100 / (parseInt(vestingPercentage)/100));
    const vestingBalance = parseInt(actualBalance) - (parseInt(actualBalance * vestingPercentage/10000)*vestingCount)
    console.log("Vesting Balance counyt :",vestingCount,vestingBalance)
    if(initalClaimed<=0)
        initalClaimed = Date.now()/1000;
    
    let allocations = [];   
    for(var i=0;i<vestingCount; i++){
        const data = {
            no: i+1,
            allocation: parseInt(actualBalance * vestingPercentage/10000),
            unlockon: (i==0) ? initalClaimed : parseInt(initalClaimed)+ (vestingInterval*(i)),
            isClaimed: (i==0) ? (initalClaimed*1000 == Date.now()) : ((Date.now() >= parseInt(parseInt(initalClaimed)+ (vestingInterval*(i)))*1000)),
            isDid: (i==0) ? (parseInt(actualBalance * vestingPercentage/10000)  <= (actualBalance - userBalance)) : (parseInt(actualBalance * vestingPercentage/10000)*(i+1)  <= (actualBalance - userBalance))
        };
      //  console.log("Alocation data : ",data.isDid,(parseInt(actualBalance * vestingPercentage/10000)*i , (actualBalance - userBalance)))
        allocations.push(data);
    }
    if(vestingBalance > 0){
        const data = {
            no: (allocations.length)+1,
            allocation: vestingBalance,
            unlockon: initalClaimed+ (vestingInterval*(allocations.length)+1),
            isClaimed: (Date.now() >= parseInt(initalClaimed+ (vestingInterval*(allocations.length)+1))*1000),
            isDid: (parseInt(actualBalance * vestingPercentage/10000)*(allocations.length)+1)  <= (actualBalance - userBalance)
        };
        allocations.push(data);
    }

    console.log("Allocation : ",allocations)
    return allocations;
}

export const setChainId = (i) =>{
    localStorage.setItem("CHAIN",i);
    window.location.reload();
}

export const getChainId = ()=>{
    const index = localStorage.getItem("CHAIN");
    return index!=null ? index : "0";
}





// export const Userdollar = async(userbinaryIncome) => {
   
//     // const userbinaryIncome =  await   axios.get(`${API_URL}/api/user/binaryIncome/${Userid}`)
  
//     let usdvalue = 0;
//       if(Number(userbinaryIncome) > 0){
//              await axios.get("https://min-api.cryptocompare.com/data/price?fsym=BNB&tsyms=USD")
//           .then (data => {
//               usdvalue = Number(data.data.USD) * Number(userbinaryIncome?.data?.BinaryIncome);
              
//           })
          
//     }
//     return usdvalue;
//  }


export const Userdollar = async(userbinaryIncome) => {
   console.log("userbinaryIncome" , userbinaryIncome);
    // const userbinaryIncome =  await   axios.get(`${API_URL}/api/user/binaryIncome/${Userid}`)
  
    let usdvalue = 0;
    //   if(Number(userbinaryIncome) > 0){
             await axios.get("https://min-api.cryptocompare.com/data/price?fsym=BNB&tsyms=USD")
          .then (data => {console.log("dollar data" , data);
              usdvalue = parseFloat(data.data.USD) * parseFloat(userbinaryIncome);
              
          })
          
    // }
    return usdvalue;
 }



