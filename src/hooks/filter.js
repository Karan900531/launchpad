import { COINS, HC, STATUS } from "../config/env";
import { getAccount } from "./useAccount";
import { getSaleInfoCard, UseTokenInfo } from "./useContract";
import { isSaleLive, isUpcoming } from "./useProjects";


export const tokenfilter = async(data , coin , status)=>{
    var tokenfilter = [];
    var hcfilter = [];
    var coinfilter = [];
    var statusfilter = [];
    var coindata = (coin.length > 0) ? coin : COINS;
    var statusdata = (status.length > 0) ? status : STATUS;
    console.log("coinstatus" , coindata , statusdata);
    // data.filter((item)=>{
    //      coindata.includes(item);
        // arr1.some(r=> arr2.includes(r))
    // });
    var filter = []
    for(var i = 0 ; i<data.length; i++){
        var symbol;
        console.log("for");
        
        if(data[i]._usewithToken == "0x0000000000000000000000000000000000000000"){
                symbol = "BNB";
                console.log("bnbn");
        }
        else{
            var tkninfo = await UseTokenInfo(data[i]?._usewithToken);
            symbol = tkninfo.symbol
            console.log("symbol");
        }
     console.log("symbol" , symbol  , coindata.includes(symbol));
        if(coindata.includes(symbol)){
            if(statusdata.includes("Upcoming")){
                isUpcoming(data[i]._start) && filter.push(data[i]);
            }
            if(statusdata.includes("Live")){
               ( data[i]._end*1000 >= Date.now() &&  data[i]._start*1000 <= Date.now()) && filter.push(data[i]);
            }
            if(statusdata.includes("Ended")){
                data[i]._end*1000 < Date.now() && filter.push(data[i]);
            }
        }
    }
    
    console.log("statusfilter" , data);
    return filter
}

export const Sorthc = async(data , type) =>{
    var HC = data;
    if(type == "ascending"){
        data.sort(function(a,b) {return (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0);} );
    }
    if(type == "descending"){
        data.sort(function(a,b) {return (a.title < b.title) ? 1 : ((b.title < a.title) ? -1 : 0);} );
    }
    return data;
}

export const Sortcoin = async(data , type) =>{
    var HC = data;
    if(type == "ascending"){
        data.sort(function(a,b) {return (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0);} );
    }
    if(type == "descending"){
        data.sort(function(a,b) {return (a.title < b.title) ? 1 : ((b.title < a.title) ? -1 : 0);} );
    }
    return data;
}

export const sortstatus = async(data , type) =>{
    var HC = data;
    if(type == "ascending"){
        data.sort(function(a,b) {return (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0);} );
    }
    if(type == "descending"){
        data.sort(function(a,b) {return (a.title < b.title) ? 1 : ((b.title < a.title) ? -1 : 0);} );
    }
    return data;
}


export const privatesalefilterby = async(data , type , isuser) => {
    let SaleInfoCards = [];
    for(var i = 0 ; i<data?.length ; i++){
        // let saleInfo = await getSaleInfoCard(data[i]._sale);
        if(type == "Upcoming"){
            // if(!isuser){
            //     if(saleInfo.isWhitelisted){
            //         if(saleInfo?.useWithToken == "0x0000000000000000000000000000000000000000"){
            //             // saleInfo.coin = "BNB";
            //             // Object.assign({coin:"BNB"} , saleInfo);
            //             saleInfo = {...saleInfo, ...{coin:"BNB"}};
            //             // saleInfo["coin"] = "BNB"
            //             if(isUpcoming(saleInfo.startTime))
            //             SaleInfoCards.push(saleInfo);
                    
            //         }
            //         else{
            //             const newdata = await UseTokenInfo(saleInfo.useWithToken);
            //             // saleInfo.coin = newdata.symbol;
            //             // Object.assign(saleInfo , {coin:newdata.symbol});
            //             saleInfo = {...saleInfo, ...{coin:newdata.symbol}};
            //             // saleInfo["coin"] = newdata.symbol
            //             if(isUpcoming(saleInfo.startTime))
            //             SaleInfoCards.push(saleInfo);
                    
            //         }
            //     }
            // }

            // if(isuser){
            //     const account = getAccount();
            //     if(saleInfo.isWhitelisted && saleInfo.owner == account){
            //         if(saleInfo?.useWithToken == "0x0000000000000000000000000000000000000000"){
            //             // saleInfo.coin = "BNB";
            //             // Object.assign({coin:"BNB"} , saleInfo);
            //             saleInfo = {...saleInfo, ...{coin:"BNB"}};
            //             // saleInfo["coin"] = "BNB"
            //             if(isUpcoming(saleInfo.startTime))
            //             SaleInfoCards.push(saleInfo);
                    
            //         }
            //         else{
            //             const newdata = await UseTokenInfo(saleInfo.useWithToken);
            //             // saleInfo.coin = newdata.symbol;
            //             // Object.assign(saleInfo , {coin:newdata.symbol});
            //             saleInfo = {...saleInfo, ...{coin:newdata.symbol}};
            //             // saleInfo["coin"] = newdata.symbol
            //             if(isUpcoming(saleInfo.startTime))
            //             SaleInfoCards.push(saleInfo);
                    
            //         }
            //     }
            // }
            var valid = isUpcoming(data[i]._start)
            valid && SaleInfoCards.push(data[i]);
        }
        if(type == "Live"){
            var valid = ( data[i]._end*1000 >= Date.now() &&  data[i]._start*1000 <= Date.now());
            valid && SaleInfoCards.push(data[i]);

            // if(!isuser){
            //     if(saleInfo.isWhitelisted){
            //         if(saleInfo?.useWithToken == "0x0000000000000000000000000000000000000000"){
            //             // saleInfo.coin = "BNB";
            //             // Object.assign({coin:"BNB"} , saleInfo);
            //             saleInfo = {...saleInfo, ...{coin:"BNB"}};
            //             // saleInfo["coin"] = "BNB"
            //             if(isSaleLive(saleInfo.startTime , saleInfo.endTime , saleInfo.isPresaleOpen))
            //             SaleInfoCards.push(saleInfo);
                    
            //         }
            //         else{
            //             const newdata = await UseTokenInfo(saleInfo.useWithToken);
            //             // saleInfo.coin = newdata.symbol;
            //             // Object.assign(saleInfo , {coin:newdata.symbol});
            //             saleInfo = {...saleInfo, ...{coin:newdata.symbol}};
            //             // saleInfo["coin"] = newdata.symbol
            //             if(isSaleLive(saleInfo.startTime , saleInfo.endTime , saleInfo.isPresaleOpen))
            //             SaleInfoCards.push(saleInfo);
                    
            //         }
            //     }
            // }

            // if(isuser){
            //     const account = getAccount();
            //     if(saleInfo.isWhitelisted && saleInfo.owner == account){
            //         if(saleInfo?.useWithToken == "0x0000000000000000000000000000000000000000"){
            //             // saleInfo.coin = "BNB";
            //             // Object.assign({coin:"BNB"} , saleInfo);
            //             saleInfo = {...saleInfo, ...{coin:"BNB"}};
            //             // saleInfo["coin"] = "BNB"
            //             if(isSaleLive(saleInfo.startTime , saleInfo.endTime , saleInfo.isPresaleOpen))
            //             SaleInfoCards.push(saleInfo);
            //         }
            //         else{
            //             const newdata = await UseTokenInfo(saleInfo.useWithToken);
            //             // saleInfo.coin = newdata.symbol;
            //             // Object.assign(saleInfo , {coin:newdata.symbol});
            //             saleInfo = {...saleInfo, ...{coin:newdata.symbol}};
            //             // saleInfo["coin"] = newdata.symbol
            //             if(isSaleLive(saleInfo.startTime , saleInfo.endTime , saleInfo.isPresaleOpen))
            //             SaleInfoCards.push(saleInfo);
                    
            //         }
            //     }
            // }
            // var valid = isSaleLive(data[i]._start ,  data[i]._end)
            // valid && SaleInfoCards.push(data[i]);
        }
        if(type == "Ended"){

            // if(!isuser){
            //     if(saleInfo.isWhitelisted){
            //         if(saleInfo?.useWithToken == "0x0000000000000000000000000000000000000000"){
            //             // saleInfo.coin = "BNB";
            //             // Object.assign({coin:"BNB"} , saleInfo);
            //             saleInfo = {...saleInfo, ...{coin:"BNB"}};
            //             // saleInfo["coin"] = "BNB"
            //             if(saleInfo.endTime*1000 < Date.now())
            //             SaleInfoCards.push(saleInfo);
                    
            //         }
            //         else{
            //             const newdata = await UseTokenInfo(saleInfo.useWithToken);
            //             // saleInfo.coin = newdata.symbol;
            //             // Object.assign(saleInfo , {coin:newdata.symbol});
            //             saleInfo = {...saleInfo, ...{coin:newdata.symbol}};
            //             // saleInfo["coin"] = newdata.symbol
            //             if(saleInfo.endTime*1000 < Date.now())
            //             SaleInfoCards.push(saleInfo);
                    
            //         }
            //     }
            // }

            // if(isuser){
            //     const account = getAccount();
            //     if(saleInfo.isWhitelisted && saleInfo.owner == account){
            //         if(saleInfo?.useWithToken == "0x0000000000000000000000000000000000000000"){
            //             // saleInfo.coin = "BNB";
            //             // Object.assign({coin:"BNB"} , saleInfo);
            //             saleInfo = {...saleInfo, ...{coin:"BNB"}};
            //             // saleInfo["coin"] = "BNB"
            //             if(saleInfo.endTime*1000 < Date.now())
            //             SaleInfoCards.push(saleInfo);
            //         }
            //         else{
            //             const newdata = await UseTokenInfo(saleInfo.useWithToken);
            //             // saleInfo.coin = newdata.symbol;
            //             // Object.assign(saleInfo , {coin:newdata.symbol});
            //             saleInfo = {...saleInfo, ...{coin:newdata.symbol}};
            //             // saleInfo["coin"] = newdata.symbol
            //             if(saleInfo.endTime*1000 < Date.now())
            //             SaleInfoCards.push(saleInfo);
                    
            //         }
            //     }
            // }
            var valid = data[i]._end*1000 < Date.now();
            valid && SaleInfoCards.push(data[i]);
        }
    }
    return SaleInfoCards;
}

export const privatesalesortby = async(data , type) => {
    var sortedarray = [];
    console.log("sort data" , data);
    // data.map((val , i) => {
        if(type == "Start Time"){
            data.sort(function(a,b) {return (a._start > b._start) ? 1 : ((b._start > a._start) ? -1 : 0);} );
        }

        if(type == "End Time"){
            data.sort(function(a,b) {return (a._end > b._end) ? 1 : ((b._end > a._end) ? -1 : 0);} );
        }
    // })
    console.log("sort data" , data);
    return data;
}


export const tokenfilterlaunchpad = async(data , coin , status , type)=>{
    var tokenfilter = [];
    var hcfilter = [];
    var coinfilter = [];
    var statusfilter = [];
    var coindata = (coin.length > 0) ? coin : COINS;
    var statusdata = (status.length > 0) ? status : STATUS;
    console.log("coinstatus" , coindata , statusdata);
    // data.filter((item)=>{
    //      coindata.includes(item);
        // arr1.some(r=> arr2.includes(r))
    // });
    var filter = []
    for(var i = 0 ; i<data.length; i++){
        var symbol;
        console.log("for");
        
        if(data[i]._usewithToken == "0x0000000000000000000000000000000000000000"){
                symbol = "BNB";
                console.log("bnbn");
        }
        else{
            var tkninfo = await UseTokenInfo(data[i]?._usewithToken);
            symbol = tkninfo.symbol
            console.log("symbol");
        }
     console.log("symbol" , symbol  , coindata.includes(symbol));
        if(coindata.includes(symbol)){
            if(statusdata.includes("Upcoming")){
                isUpcoming(data[i]._start) && filter.push(data[i]);
            }
            if(statusdata.includes("Live")){
               ( data[i]._end*1000 >= Date.now() &&  data[i]._start*1000 <= Date.now()) && filter.push(data[i]);
            }
            if(statusdata.includes("Ended")){
                data[i]._end*1000 < Date.now() && filter.push(data[i]);
            }

            
        }
    }
    console.log("filter " , filter , type);

    if(type.includes("Launchpad") && !type.includes("Fairlaunch")){
        var fil = [true];
        var filterdata = filter.filter(value => ((fil.includes(value._launchpadType)))); 
        console.log("filtereddata" , filterdata);
        return filterdata; 
    }
    if(type.includes("Fairlaunch") && !type.includes("Launchpad")){
        var fil = [false];
        var filterdata = filter.filter(value => ((fil.includes(value._launchpadType))));  
        return filterdata;
    }
    
    if(type.includes("Launchpad") && type.includes("Fairlaunch")){
        return filter;
    }

    
    
    console.log("statusfilter" , data);
    if(type.length == 0)
    return filter
}

export const admintokenfilterlaunchpad = async(data , coin , status , type)=>{
    var tokenfilter = [];
    var hcfilter = [];
    var coinfilter = [];
    var statusfilter = [];
    var coindata = (coin.length > 0) ? coin : COINS;
    var statusdata = (status.length > 0) ? status : STATUS;
    console.log("coinstatus" , coindata , statusdata);
    // data.filter((item)=>{
    //      coindata.includes(item);
        // arr1.some(r=> arr2.includes(r))
    // });
    var filter = []
    for(var i = 0 ; i<data.length; i++){
        var symbol;
        console.log("for");
        
        if(data[i]._usewithToken == "0x0000000000000000000000000000000000000000"){
                symbol = "BNB";
                console.log("bnbn");
        }
        else{
            var tkninfo = await UseTokenInfo(data[i]?._usewithToken);
            symbol = tkninfo.symbol
            console.log("symbol");
        }
     console.log("symbol" , symbol  , coindata.includes(symbol));
        if(coindata.includes(symbol)){
            if(statusdata.includes("Upcoming")){
                isUpcoming(data[i]._start) && filter.push(data[i]);
            }
            if(statusdata.includes("Live")){
               ( data[i]._end*1000 >= Date.now() &&  data[i]._start*1000 <= Date.now()) && filter.push(data[i]);
            }
            if(statusdata.includes("Ended")){
                data[i]._end*1000 < Date.now() && filter.push(data[i]);
            }

            
        }
    }
    console.log("filter " , filter , type);
var launchpad = [];
var fairlaunch = [];
var privatesale = [];
    if(type.includes("Launchpad")){
        var fil = [true];
        var fin = [false];
        var filterdata = filter.filter(value => ((fil.includes(value._launchpadType)))); 
        launchpad = filterdata.filter(value => ((fin.includes(value._isWhitelisted))))
        console.log("filtereddata" , launchpad);
        // return filterdata; 
    }
    if(type.includes("Fairlaunch")){
        var fil = [false];
        fairlaunch = filter.filter(value => ((fil.includes(value._launchpadType))));  
        // return filterdata;
    }
    if(type.includes("Privatesale")){
        var fil = [true];console.log("privatesale");
        privatesale = filter.filter(value => ((fil.includes(value._isWhitelisted))));  
        // return filterdata;
    }
    
    if(type.includes("Launchpad") && type.includes("Fairlaunch") && type.includes("Privatesale")){
        return filter;
    }
    let filteredadmindata = launchpad.concat(fairlaunch);
    let finaldata = filteredadmindata.concat(privatesale)
      

    
    
    console.log("statusfilter" , data);
    if(type.length == 0)
    return filter
    else
    return finaldata
}








//search
export const searchdata = ()=> {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }








