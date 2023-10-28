import axios from 'axios';
import Cookies from 'universal-cookie';
import { API_URL } from '../config/env';
import * as api from "../routes/userroutefront";
import * as admin from "../routes/adminroutesfront";
const cookies = new Cookies();

export const loginhook = async(data) => {
  // console.log("login data" , data);
  var formdata = new FormData();
  try{
    if(data){
      formdata.append("email" , data?.email);
      formdata.append("password" , data?.password);
    }
    try {
      let respdata = await axios({
        'method': 'POST',
        'url': API_URL + admin.loginApi,
        'credentials': true,
        'headers': {
          'content-Type':'multipart/form-data',
        },
        data: formdata,
      });
      console.log("response",respdata);
      if(respdata?.data?.success){
        cookies.set('cryp-launch-admin-email', respdata.data.email, { path: '/' }, {expires: new Date(Date.now()+600000) });
        cookies.set('cryp-launch-admin-Datas',respdata.data, { path: '/' }, {expires: new Date(Date.now()+600000) })
      }
      return {
        data: respdata
      }
    }
    catch (err) {
      return {
        error: err
      }
    }
  }
  catch(e){
    console.log("error" , e);
  }
}

export const logouthook = async()=>{
  cookies.remove("cryp-launch-admin-email");
  cookies.remove("cryp-launch-admin-Datas");
  localStorage.removeItem("accountInfo");
  sessionStorage.clear();
}


export const getkychook = async(data)=> {
    // console.log("data" , data);
  try {
    // console.log("headers" , headers);
    let respData = await axios.get(API_URL + api.getkycApi,
      {params: {walletaddress:data}}
      )
  
    console.log("respdata",respData);
    return {
      data: respData
    }
  }
  catch (err) {
    return {
         error: err.response.data
    }
  }
  }

  export const uploadkychook = async(data) => {
    // console.log("login data" , data);
    var formdata = new FormData();
    try{
      if(data){
        formdata.append("idtype" , data?.idtype);
        formdata.append("walletaddress" , data?.walletaddress);
        formdata.append("idnumber" , data?.idnumber);
        formdata.append("address" , data?.address);
        formdata.append("front" , data?.front);
        // formdata.append("back" , data?.back);
      }
      try {
        let respdata = await axios({
          'method': 'POST',
          'url': API_URL + api.uploadkycApi,
          'credentials': true,
          'headers': {
            'content-Type':'multipart/form-data',
          },
          data: formdata,
        });
        console.log("response",respdata);
        return {
          data: respdata.data
        }
      }
      catch (err) {
        return {
          error: err
        }
      }
    }
    catch(e){
      console.log("error" , e);
    }
  }

  export const getallkychook = async(data)=> {
  try {
    let respData = await axios.get(API_URL + admin.getallkycApi,
      {params: {skip:data?.skip , limit : data?.limit}}
      )
  
    console.log("respdata",respData);
    return {
      data: respData
    }
  }
  catch (err) {
    return {
         error: err.response.data
    }
  }
  }

  export const approvekychook = async(data) => {
    // console.log("login data" , data);
    var formdata = new FormData();
    try{
      if(data){
        formdata.append("id" , data?.id);
        formdata.append("walletaddress" , data?.walletaddress);
      }
      try {
        let respdata = await axios({
          'method': 'POST',
          'url': API_URL + admin.aprovekycApi,
          'credentials': true,
          'headers': {
            'content-Type':'multipart/form-data',
          },
          data: formdata,
        });
        console.log("response",respdata);
        return {
          data: respdata.data
        }
      }
      catch (err) {
        return {
          error: err
        }
      }
    }
    catch(e){
      console.log("error" , e);
    }
  }

  export const rejectkychook = async(data) => {
    // console.log("login data" , data);
    var formdata = new FormData();
    try{
      if(data){
        formdata.append("id" , data?.id);
        formdata.append("walletaddress" , data?.walletaddress);
      }
      try {
        let respdata = await axios({
          'method': 'POST',
          'url': API_URL + admin.rejectkycApi,
          'credentials': true,
          'headers': {
            'content-Type':'multipart/form-data',
          },
          data: formdata,
        });
        console.log("response",respdata);
        return {
          data: respdata.data
        }
      }
      catch (err) {
        return {
          error: err
        }
      }
    }
    catch(e){
      console.log("error" , e);
    }
  }

  export const getsettinghook = async(data)=> {
    // console.log("data" , data);
  try {
    // console.log("headers" , headers);
    let respData = await axios.get(API_URL + admin.getsettingApi,
      {params: {skip : data?.skip , limit : data?.limit}}
      )
  
    console.log("respdata",respData);
    return respData
  }
  catch (err) {
    return {
         error: err.response.data
    }
  }
  }

  export const addsettinghook = async(data) => {
    // console.log("login data" , data);
    var formdata = new FormData();
    try{
      if(data){
        formdata.append("settingname" , data?.settingname);
        formdata.append("settingvalue" , data?.settingvalue);
      }
      try {
        let respdata = await axios({
          'method': 'POST',
          'url': API_URL + admin.addsettingApi,
          'credentials': true,
          'headers': {
            'content-Type':'multipart/form-data',
          },
          data: formdata,
        });
        console.log("response",respdata);
        return {
          data: respdata.data
        }
      }
      catch (err) {
        return {
          error: err
        }
      }
    }
    catch(e){
      console.log("error" , e);
    }
  }

  export const updatesettinghook = async(data) => {
    // console.log("login data" , data);
    var formdata = new FormData();
    try{
      if(data){
        formdata.append("settingname" , data?.settingname);
        formdata.append("settingvalue" , data?.settingvalue);
        formdata.append("id" , data?.id);
      }
      try {
        let respdata = await axios({
          'method': 'POST',
          'url': API_URL + admin.updatesettingApi,
          'credentials': true,
          'headers': {
            'content-Type':'multipart/form-data',
          },
          data: formdata,
        });
        console.log("response",respdata);
        return {
          data: respdata.data
        }
      }
      catch (err) {
        return {
          error: err
        }
      }
    }
    catch(e){
      console.log("error" , e);
    }
  }

  

  export const addcoinhook = async(data) => {
    // console.log("login data" , data);
    var formdata = new FormData();
    try{
      if(data){
        // formdata.append("settingname" , data?.settingname);
        // formdata.append("settingvalue" , data?.settingvalue);
        formdata.append("coin" , data);
      }
      try {
        let respdata = await axios({
          'method': 'POST',
          'url': API_URL + admin.addcoinApi,
          'credentials': true,
          'headers': {
            'content-Type':'multipart/form-data',
          },
          data: formdata,
        });
        console.log("response",respdata);
        return  respdata
      }
      catch (err) {
        return {
          error: err
        }
      }
    }
    catch(e){
      console.log("error" , e);
    }
  }

  export const getcoinhook = async(data)=> {
  try {
    let respData = await axios.get(API_URL + admin.getcoinApi,
      // {params: {skip : data?.skip , limit : data?.limit}}
      )
    return respData
  }
  catch (err) {
    return {
         error: err.response.data
    }
  }
  }


  export const wishlisthook = async(data) => {
    console.log("login data" , data);
    var formdata = new FormData();
    try{
      if(data){
        formdata.append("saleaddress" , data?.saleaddress);
        formdata.append("walletaddress" , data?.walletaddress);
        // formdata.append("idnumber" , data?.idnumber);
        // formdata.append("address" , data?.address);
        // formdata.append("front" , data?.front);
        // formdata.append("back" , data?.back);
      }
      try {
        let respdata = await axios({
          'method': 'POST',
          'url': API_URL + api.wishlistApi,
          'credentials': true,
          'headers': {
            'content-Type':'multipart/form-data',
          },
          data: formdata,
        });
        console.log("response",respdata);
        return {
          data: respdata.data
        }
      }
      catch (err) {
        return {
          error: err
        }
      }
    }
    catch(e){
      console.log("error" , e);
    }
  }

  export const viewlisthook = async(data) => {
    console.log("login data" , data);
    var formdata = new FormData();
    try{
      if(data){
        formdata.append("saleaddress" , data?.saleaddress);
        formdata.append("walletaddress" , data?.walletaddress);
      }
      try {
        let respdata = await axios({
          'method': 'POST',
          'url': API_URL + api.viewlistApi,
          'credentials': true,
          'headers': {
            'content-Type':'multipart/form-data',
          },
          data: formdata,
        });
        console.log("response",respdata);
        return {
          data: respdata.data
        }
      }
      catch (err) {
        return {
          error: err
        }
      }
    }
    catch(e){
      console.log("error" , e);
    }
  }

  export const getuserdatahook = async(data) => {
    console.log("login data" , data);
    var formdata = new FormData();
    try{
      if(data){
        // formdata.append("saleaddress" , data?.saleaddress);
        formdata.append("walletaddress" , data);
      }
      try {
        let respdata = await axios({
          'method': 'POST',
          'url': API_URL + api.getuserdata,
          'credentials': true,
          'headers': {
            'content-Type':'multipart/form-data',
          },
          data: formdata,
        });
        console.log("response",respdata);
        return {
          data: respdata.data
        }
      }
      catch (err) {
        return {
          error: err
        }
      }
    }
    catch(e){
      console.log("error" , e);
    }
  }

  export const userinvestedhook = async(data) => {
    console.log("login data" , data);
    var formdata = new FormData();
    try{
      if(data){
        formdata.append("saleaddress" , data?.saleaddress);
        formdata.append("walletaddress" , data?.walletaddress);
        formdata.append("amount" , data?.amount)
      }
      try {
        let respdata = await axios({
          'method': 'POST',
          'url': API_URL + api.userinvested,
          'credentials': true,
          'headers': {
            'content-Type':'multipart/form-data',
          },
          data: formdata,
        });
        console.log("response",respdata);
        return {
          data: respdata.data
        }
      }
      catch (err) {
        return {
          error: err
        }
      }
    }
    catch(e){
      console.log("error" , e);
    }
  }

  export const userlaunchpadhook = async(data) => {
    console.log("login data" , data);
    var formdata = new FormData();
    try{
      if(data){
        formdata.append("saleaddress" , data?.saleaddress);
        formdata.append("walletaddress" , data?.walletaddress);
        formdata.append("whitelist" , data?.whitelist);
        // formdata.append("amount" , data?.amount);
      }
      try {
        let respdata = await axios({
          'method': 'POST',
          'url': API_URL + api.userlaunchpad,
          'credentials': true,
          'headers': {
            'content-Type':'multipart/form-data',
          },
          data: formdata,
        });
        console.log("response",respdata);
        return {
          data: respdata.data
        }
      }
      catch (err) {
        return {
          error: err
        }
      }
    }
    catch(e){
      console.log("error" , e);
    }
  }

  export const createuserhook = async(data) => {
    console.log("login data" , data);
    var formdata = new FormData();
    try{
      if(data){
        // formdata.append("saleaddress" , data?.saleaddress);
        formdata.append("walletaddress" , data);
        // formdata.append("whitelist" , data?.whitelist);
        // formdata.append("amount" , data?.amount);
      }
      try {
        let respdata = await axios({
          'method': 'POST',
          'url': API_URL + api.createuserApi,
          'credentials': true,
          'headers': {
            'content-Type':'multipart/form-data',
          },
          data: formdata,
        });
        console.log("response",respdata);
        return {
          data: respdata.data
        }
      }
      catch (err) {
        return {
          error: err
        }
      }
    }
    catch(e){
      console.log("error" , e);
    }
  }



  export const gettrendinghook = async(data)=> {
    // console.log("data" , data);
  try {
    // console.log("headers" , headers);
    let respData = await axios.get(API_URL + admin.gettrending,
      {params: {skip : data?.skip , limit : data?.limit}}
      )
  
    console.log("respdata",respData);
    return respData
  }
  catch (err) {
    return {
         error: err.response.data
    }
  }
  }

  export const addtrendinghook = async(data) => {
    // console.log("login data" , data);
    var formdata = new FormData();
    try{
      if(data){
        formdata.append("saleaddress" , data?.saleaddress);
        formdata.append("displayname" , data?.displayname);
        formdata.append("status" , data?.status);
        formdata.append("type" , data?.type);
        formdata.append("position" , data?.position);
        formdata.append("date" , data?.date);
      }
      try {
        let respdata = await axios({
          'method': 'POST',
          'url': API_URL + admin.addtrending,
          'credentials': true,
          'headers': {
            'content-Type':'multipart/form-data',
          },
          data: formdata,
        });
        console.log("response",respdata);
        return {
          data: respdata.data
        }
      }
      catch (err) {
        return {
          error: err
        }
      }
    }
    catch(e){
      console.log("error" , e);
    }
  }

  export const edittrendinghook = async(data) => {
    // console.log("login data" , data);
    var formdata = new FormData();
    try{
      if(data){
        formdata.append("saleaddress" , data?.saleaddress);
        formdata.append("displayname" , data?.displayname);
        formdata.append("status" , data?.status);
        formdata.append("id" , data?.id);
        formdata.append("type" , data?.type);
        formdata.append("position" , data?.position);
        formdata.append("date" , data?.date);
      }
      try {
        let respdata = await axios({
          'method': 'POST',
          'url': API_URL + admin.updatetrending,
          'credentials': true,
          'headers': {
            'content-Type':'multipart/form-data',
          },
          data: formdata,
        });
        console.log("response",respdata);
        return {
          data: respdata.data
        }
      }
      catch (err) {
        return {
          error: err
        }
      }
    }
    catch(e){
      console.log("error" , e);
    }
  }

  export const gettrendingdisplayhook = async(data)=> {
    // console.log("data" , data);
  try {
    // console.log("headers" , headers);
    let respData = await axios.get(API_URL + api.gettrending)
  
    console.log("respdata",respData);
    return respData
  }
  catch (err) {
    return {
         error: err.response.data
    }
  }
  }

  export const gethomecalculationhook = async(data)=> {
    // console.log("data" , data);
  try {
    // console.log("headers" , headers);
    let respData = await axios.get(API_URL + api.gethomecalculation)
  
    console.log("respdata",respData);
    return respData
  }
  catch (err) {
    return {
         error: err.response.data
    }
  }
  }


  
  


