import Validator from "validator";
import isEmpty from "is-empty";
import { IsValidAddress } from "./useContract";

export const kycvalid = (data) => {
    var errors = {};
    var isValid = true;
    if (Validator.isEmpty(data.idtype)) {
        isValid = false;
        errors.idtype = "Document Type field is required !"
    }
    if (Validator.isEmpty(data?.idnumber)) {
        isValid = false;
        errors.idnumber = "Id Number field is required !";
    }
    if (Validator.isEmpty(data?.address)) {
        isValid = false;
        errors.address = "Address field is required !";
    }
    if (!data?.front) {
        isValid = false;
        errors.front = "Zip file is required !";
    }
    else if (!filevalidate(data?.front)) {
        isValid = false;
        errors.front = "Invalid file format !"
    }
    // if(!data?.back){
    //     isValid = false;
    //     errors.back = "Back Side Image is required !";
    // }
    // else if(!filevalidate(data?.back)){
    //     isValid = false;
    //     errors.back = "Invalid file format !"
    // }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

//validate file
const filevalidate = (image) => {
    console.log("image", image);
    var fileName = image?.name ? image?.name : image;
    var idxDot = fileName?.lastIndexOf(".") + 1;
    var extFile = fileName?.substr(idxDot, fileName.length).toLowerCase();
    console.log("extFiole", extFile);
    // || extFile=="jpeg" || extFile=="png" || extFile=="webp"
    if (extFile == "zip") {
        return true;
    } else {
        return false;
    }

}

export const validatelogin = (data) => {


    let errors = {};
    let isValid = true;
    if (Validator.isEmpty(data?.email)) {
        isValid = false;
        errors.email = "Email field is required";

    }
    else if (!Validator.isEmail(data?.email)) {
        isValid = false;
        errors.email = "Invalid email"
    }
    if (Validator.isEmpty(data.password)) {
        isValid = false;
        errors.password = "Password field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)

    };
};

export const settingvalidate = (data) => {
    let errors = {};
    let isValid = true;
    if (Validator.isEmpty(data?.settingname)) {
        isValid = false;
        errors.settingname = "Setting name field is required";
    }
    if (Validator.isEmpty(data?.settingvalue)) {
        isValid = false;
        errors.settingvalue = "Setting Value field is required !";
    }
    return {
        isValid: isEmpty(errors),
        errors: errors
    }
}

export const validstandardtoken = (data) => {
    var rd = new RegExp(/^\d+$/);

    let isValid = true;
    let errors = {};
    if (Validator.isEmpty(data?.name)) {
        isValid = false
        errors.name = "Name field is required !"
    }
    if (Validator.isEmpty(data?.symbol)) {
        isValid = false;
        errors.symbol = "Symbol field is required !"
    }
    if (Validator.isEmpty(data?.decimal)) {
        isValid = false;
        errors.decimal = "Decimal field is required"
    }
    if (!rd.test(parseFloat(data?.decimal))) {
        isValid = false;
        errors.decimal = "Invalie Decimal field "
    }
    if (isNaN(parseFloat(data?.decimal))) {
        isValid = false;
        errors.decimal = "Invalid Decimal field"
    }
    if (Validator.isEmpty(data?.totalsupply)) {
        isValid = false;
        errors.totalsupply = "Total supply field is required"
    }

    if (isNaN(data?.totalsupply)) {
        isValid = false;
        errors.totalsupply = "Invalid Total supply field"
    }
    if (!rd.test(parseFloat(data?.totalsupply))) {
        isValid = false;
        errors.totalsupply = "Invalid Total supply field"
    }
    return {
        isValid: isEmpty(errors),
        errors: errors
    }
}

export const validliquiditytoken = (data) => {
    console.log("data", data);
    var rd = new RegExp(/^\d+$/);
    var rx = new RegExp(/^[-+]?[0-9]+\.[0-9]+$/)
    let isValid = true;
    let errors = {};
    if (Validator.isEmpty(data?.name)) {
        isValid = false
        errors.name = "Name field is required !"
    }
    if (Validator.isEmpty(data?.symbol)) {
        isValid = false;
        errors.symbol = "Symbol field is required !"
    }
    if (Validator.isEmpty(data?.decimal)) {
        isValid = false;
        errors.decimal = "Decimal field is required"
    }
    if (Validator.isEmpty(data?.totalsupply)) {
        isValid = false;
        errors.totalsupply = "Total supply field is required"
    }
    if (!rd.test(parseFloat(data?.totalsupply))) {
        isValid = false;
        errors.totalsupply = "Invalid Total supply field"
    }

    if (!rd.test(parseFloat(data?.decimal))) {
        isValid = false;
        errors.decimal = "Decimal field is required"
    }
    if (isNaN(parseFloat(data?.decimal))) {
        isValid = false;
        errors.decimal = "Invalid Decimal field"
    }


    if (isNaN(data?.totalsupply)) {
        isValid = false;
        errors.totalsupply = "Invalid Total supply field"
    }
    // if(!rd.test(parseFloat(data?.yieldfee)) && !rd.test(parseFloat(data?.yieldfee))){
    //     isValid = false;
    //     errors.yieldfee = "Transaction fee to generate yield  field is required"
    // }
    if (isNaN(parseFloat(data?.yieldfee))) {
        isValid = false;
        errors.yieldfee = "Invalid Transaction fee to generate yield .."
    }
    else {console.log("parseFloat(data?.yieldfee)" , parseFloat(data?.yieldfee) , parseFloat(data?.yieldfee) > 0 && parseFloat(data?.yieldfee) <= 100);
        if (!(parseFloat(data?.yieldfee) > 0 && parseFloat(data?.yieldfee) <= 100)) {
            isValid = false;
            errors.yieldfee = "Invalid Transaction fee to generate yield"
        }
    }

    // if (!rd.test(parseFloat(data?.liquidityfee)) && !rd.test(parseFloat(data?.liquidityfee))) {
    //     isValid = false;
    //     errors.liquidityfee = "Transaction fee to generate liquidity  field is required"
    // }
    if (isNaN(parseFloat(data?.liquidityfee))) {
        isValid = false;
        errors.liquidityfee = "Invalid Transaction fee to generate liquidity "
    }
    else if (!(parseFloat(data?.liquidityfee) > 0 && parseFloat(data?.liquidityfee) <= 100)) {
        isValid = false;
        errors.liquidityfee = "Transaction fee to generate liquidity must be 0-100"
    }

    // if (rd.test(parseFloat(data?.maximumtransaction)) || rd.test(parseFloat(data?.maximumtransaction))) {
    //     isValid = false;
    //     errors.maximumtransaction = "Maximum transaction Amount field is required"
    // }
    if (isNaN(parseFloat(data?.maximumtransaction))) {
        isValid = false;
        errors.maximumtransaction = "Invalid Maximum transaction Amount field "
    }
    else if (!(parseFloat(data?.maximumtransaction) > 0 && parseFloat(data?.maximumtransaction) <= 100)) {
        isValid = false;
        errors.maximumtransaction = "Maximum Transaction  must be 0-100"
    }

    // if (!rd.test(parseFloat(data?.exchangethresold)) && !rd.test(parseFloat(data?.exchangethresold))) {
    //     isValid = false;
    //     errors.exchangethresold = "Exchange Thersold field is required"
    // }
    if (isNaN(parseFloat(data?.exchangethresold))) {
        isValid = false;
        errors.exchangethresold = "Invalid Exchange Thersold field "
    }
    else if (!(parseFloat(data?.exchangethresold) > 0 && parseFloat(data?.exchangethresold) <= 100)) {
        isValid = false;
        errors.exchangethresold = "Exchange Thresold  must be 0-100"
    }
    if (Validator.isEmpty(data?.yieldfee)) {
        isValid = false;
        errors.yieldfee = "Transaction fee to generate yield  field is required"
    }
    if (Validator.isEmpty(data?.liquidityfee)) {
        isValid = false;
        errors.liquidityfee = "Transaction fee to generate liquidity  field is required"
    }
    if (Validator.isEmpty(data?.maximumtransaction)) {
        isValid = false;
        errors.maximumtransaction = "Maximum transaction Amount field is required"
    }
    if (Validator.isEmpty(data?.exchangethresold)) {
        isValid = false;
        errors.exchangethresold = "Exchange Thersold field is required"
    }
    return {
        isValid: isEmpty(errors),
        errors: errors
    }
}

export const validtokenlock = (data) => {
    console.log("data", data);
    let isValid = true;
    let errors = {};
    if (Validator.isEmpty(data?.tokenaddress)) {
        isValid = false
        errors.tokenaddress = "Token Address field is required !"
    }
    if (Validator.isEmpty(data?.amount)) {
        isValid = false
        errors.amount = "Amount field is required !"
    }

    if (data.vesting) {
        if (Validator.isEmpty(data?.cycle)) {
            isValid = false
            errors.cycle = "Cycle field is required !"
        }
        if (Validator.isEmpty(data?.cyclepercent)) {
            isValid = false
            errors.cyclepercent = "Cycle release percent  field is required !"
        }
        if (data?.cyclepercent < 0 && data?.cyclepercent >= 100) {
            isValid = false
            errors.cyclepercent = "Cycle release percent  field value must be 0 to 100 !"
        }
        // if(Validator.isEmpty(data?.tgedate)){
        //     isValid = false
        //     errors.tgedate = "TGE date  field is required !"
        // }
        // if(data.tgedate )
        // if(Validator.isEmpty(data?.tgepercent)){
        //     isValid = false
        //     errors.tgepercent = "TGE Percent  field value must be 0 to 100 !"
        // }
        // if(data?.tgepercent > 0 && data?.tgepercent <=100){
        //     isValid = false
        //     errors.tgepercent = "TGE Percent  field value must be 0 to 100 !"
        // }
    }
    else {
        if (Validator.isEmpty(data?.locktime)) {
            isValid = false
            errors.locktime = "Lock Until field is required !"
        }
    }
    if (data?.anotherowner) {
        if (Validator.isEmpty(data?.anotherowneraddress)) {
            isValid = false;
            errors.anotherowneraddress = "Owner field is required !";
        }

    }
    return {
        isValid: isEmpty(errors),
        errors: errors
    }
}

export const validprivatesalestep1 = (data) => {
    let isValid = true;
    let errors = {};
    if (Validator.isEmpty(data?.title)) {
        isValid = false
        errors.title = "Title field is required !"
    }
    return {
        isValid: isEmpty(errors),
        errors: errors
    }
}

export const validprivatesalestep2 = (data) => {
    let isValid = true;
    let errors = {};
    if (Validator.isEmpty(data?.whitelist)) {
        isValid = false
        errors.whitelist = "Token Address field is required !"
    }
}


export const urlvalidation = (data) => {
    const regex = new RegExp(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/);
    console.log("valid url ", regex.test(data));
    return regex.test(data);
}


export const addwhitelistvalidation = async (val) => {
    let isValid = true;
    // var errors ={} ;
    let ob = {}
    console.log("val", val);
    // data.map(async(val , i)=>{
    if (Validator.isEmpty(val.user)) {
        isValid = false;
        ob.user = "Wallet Address field is required !";
    }
    else {
        let isvalid = await IsValidAddress(val.user);
        console.log("isvalid", isvalid);
        if (!isvalid) {
            isValid = false
            ob.user = "Invalid wallet address !"
        }
    }

    if (isNaN(parseFloat(val.bnbvalue)) || val.bnbvalue <= 0) {
        isValid = false
        ob.bnbvalue = "Invalid BNB value !"
    }
    // errors[i]=ob;
    // ob = {}
    // })
    // errors = Object.keys(errors)
    console.log("length", ob);
    return {
        isValid: isEmpty(ob),
        errors: ob
    }
}

export const removewhitelistvalidation = async (val) => {
    let isValid = true;
    // var errors ={} ;
    let ob = {}
    console.log("val", val);
    // data.map(async(val , i)=>{
    if (Validator.isEmpty(val.user)) {
        isValid = false;
        ob.user = "Wallet Address field is required !";
    }
    else {
        let isvalid = await IsValidAddress(val.user);
        console.log("isvalid", isvalid);
        if (!isvalid) {
            isValid = false
            ob.user = "Invalid wallet address !"
        }
    }

    if (isNaN(val.bnbvalue) || validliquiditytoken.bnbvalue != 0) {
        isValid = false
        ob.bnbvalue = "Invalid BNB value !"
    }
    // errors[i]=ob;
    // ob = {}
    // })
    // errors = Object.keys(errors)
    console.log("length", ob);
    return {
        isValid: isEmpty(ob),
        errors: ob
    }
}


export const trendingvalidate = (data) => {
    let errors = {};
    let isValid = true;
    if (Validator.isEmpty(data?.saleaddress)) {
        isValid = false;
        errors.saleaddress = "Saleaddress field is required";
    }
    if (Validator.isEmpty(data?.displayname)) {
        isValid = false;
        errors.displayname = "Display name field is required !";
    }
    if (Validator.isEmpty(data?.status)) {
        isValid = false;
        errors.status = "Status field is required !";
    }
    if (Validator.isEmpty(data?.position)) {
        isValid = false;
        errors.status = "Position field is required !";
    }
    if (Validator.isEmpty(data?.date)) {
        isValid = false;
        errors.status = "Date field is required !";
    }
    return {
        isValid: isEmpty(errors),
        errors: errors
    }
}