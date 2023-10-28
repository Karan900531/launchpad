import React, { Component } from 'react';
import { useContext, useEffect, useState } from "react";

import Header from '../Header';
import Sidebar from '../Sidebar';
import Walletmodal from "../Walletmodal";

import Trendingslider from "../trendingslider";

import CreatePrivatesaletab from "./CreatePrivatesaletab";
import { getAccount } from '../../hooks/useAccount'





import {  Container } from 'react-bootstrap';
import '../../css/styles.css';

import favicon from "../../images/favicon.png"
import { getkychook } from '../../hooks/usebackend';
import toast from 'react-hot-toast';


class CreatePrivatesale extends Component {
  showLoader()
  {
    document.getElementsByTagName("body")[0].classList.add("overflow_hidden");
    document.getElementById("logo_overlay").style.opacity = 0.05;
    document.getElementById("loader_div").classList.remove("d-none");
    document.getElementById("loader_div").classList.add("d-block");


  }

  hideLoader()
  {
    document.getElementsByTagName("body")[0].classList.remove("overflow_hidden");
    document.getElementById("logo_overlay").style.opacity = 1;
    document.getElementById("loader_div").classList.remove("d-block");
    document.getElementById("loader_div").classList.add("d-none");



  }

  showLoaderConnect()
  {
    document.getElementsByTagName("body")[0].classList.add("overflow_hidden");
    // document.getElementById("logo_overlay").style.opacity = 0.05;
    document.getElementById("loader_div_connect").classList.remove("d-none");
    document.getElementById("loader_div_connect").classList.add("d-block");


  }

  hideLoaderConnect()
  {
    document.getElementsByTagName("body")[0].classList.remove("overflow_hidden");
    // document.getElementById("logo_overlay").style.opacity = 1;
    document.getElementById("loader_div_connect").classList.remove("d-block");
    document.getElementById("loader_div_connect").classList.add("d-none");
  }
  async fetchdata1(){
        // let walletaddress = localStorage.getItem("accountInfo");
        //   let result = await getkychook(walletaddress.toLowerCase());
        //   console.log("result" , result?.data?.data?.type);
        //   if(result?.data?.data?.type== "nodata" || result?.data?.data?.record?.status != "Approved"){
        //     toast.error("Register your account")
        //     return 0;
        //   }
    if(!await window?.ethereum?._metamask.isUnlocked() || !localStorage.getItem("accountInfo") || !sessionStorage.getItem("accountInfo")){
      this.showLoaderConnect()
    }
    else{
      this.hideLoaderConnect();
      // this.showLoaderConnect()
    }
  }
  
    componentDidMount()
    {
      this.hideLoader()
      // this.showLoader();
      document.getElementById("privatesale_parent").classList.add("active");
      
      this.fetchdata1()
      // var kyc = sessionStorage.getItem("kyc")
      // if(kyc == "false" || !kyc){
      //   console.log("sessionStorage.getItem" , kyc)
      //   this.props.history.push("/kyc");
      // }
      
    }
    onDismiss(){
      this.setState({ walletModal: false }); 
      if(!sessionStorage.getItem("accountInfo")){
        this.hideLoaderConnect();
      }
    }

    constructor(props) {
        super(props);
        this.state = {          
            walletModal: false,
            accountInfo: '',

            loaders : false
        };
    }
 
    render() {
        


      
      
	return (
    <div id="loader_main">
    <div id="loader_div">
      <div className={!this.state.loaders ?'loader_only' : "d-none"}>
    <span className="spin_round">

    </span>
    <img src={favicon} className="logo_load" />
    </div>


    {/* <div className='load_connect_text'>
    <button className="get-started-btn btn_connect_loader" onClick={() => {
      this.hideLoader()
      this.setState({ walletModal: true }); 
      }}>
                     Connect Wallet to Continue
            </button>
        </div> */}

  </div>
        <div className='logo_overlay' id="logo_overlay">

           <Header/>
          
           <div className="whole_sec pb-5">
           <div className='flex_side_right'>
            <Sidebar />
           {/* ongoing_sec */}
           <div className='right_side_sec'>
           <div id="loader_div_connect">
     
     <div className='load_connect_text'>
     <button className="get-started-btn btn_connect_loader" onClick={() => this.setState({ walletModal: true })}>
                     Connect Wallet to Continue
             </button>
         </div>

   </div>
           {/* <div className="text-white topBar d-flex justify-content-between">
                  
                  <small>Trending</small>
                <small>
                  #1&nbsp;<span>Husy</span>
                </small>
                <small>
                  #2&nbsp;<span>ORL</span>
                </small>
                <small>
                  #3&nbsp;<span>UWC</span>
                </small>
                <small>
                  #4&nbsp;<span>777</span>
                </small>
                <small>
                  #5&nbsp;<span>IDXS</span>
                </small>
                <small>
                  #6&nbsp;<span>COUGNU</span>
                </small>
                <small>
                  #7&nbsp;<span>CRICLE</span>
                </small>
                <small>
                  #8&nbsp;<span>KASA</span>
                </small>
                <small>
                  #9&nbsp;<span>FIFAPP</span>
                </small>
                <small>
                  #10&nbsp;<span>SOG</span>
                </small>
                <small>
                  #11&nbsp;<span>COOSHA</span>
                </small>
                <small>
                  #12&nbsp;<span>Honey</span>
                </small>
                
                
              </div> */}
              {/* <Trendingslider/> */}
              <div className="right_side_spacing">
             <CreatePrivatesaletab />

            <Container className='pb-5 px-0 mt-4'>
                 
                 <center>
                   <small className="mt-3 bottom_text">
                     Disclaimer: The information provided shall not in any way
                     constitute a recomendation as to whether you should invest
                     in any product discussed. We accept no liability for any
                     loss occasioned to any person acting or refraining from
                     action as a result of any material provided or published.
                   </small>
                 </center>
               </Container>
              
            </div>
           </div>
           </div>
           </div>

            {/* <Footer /> */}
        </div>
        {this.state.walletModal && <Walletmodal connect={"string"} onDismiss={()=>this.onDismiss()} /> }
        </div>
        )
    }
}

export default CreatePrivatesale