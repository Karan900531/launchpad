import React, { Component } from 'react';
import { useContext, useEffect, useState } from "react";
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Walletmodal from "./Walletmodal";
import Settingsmodal from "./Settingsmodal";

// import 'font-awesome/css/font-awesome.min.css';

import { metamaskWallet , walletConnet } from '../hooks/useWallet';
import { getAccount, getChainId, setChainId } from '../hooks/useAccount'

import bsc from "../images/bsc.png"
import bsctestnet from "../images/bsctestnet.png"
import { getProxyOwner } from '../hooks/useContract';
import { UseProvider} from '../hooks/useWeb3'
import { CHAINS } from '../config/env'

import doc from "../images/doc.svg"
import deposit from "../images/deposit.svg"

import referral from "../images/referal.png"

import { NavLink } from "react-router-dom";
import { getkychook } from '../hooks/usebackend';




class Header extends Component 
{
    // darkTheme()
    // {
    //     document.body.classList.remove('light_theme'); 
    //     document.body.classList.add('dark_theme'); 
    //     document.getElementById("sun_icon").classList.remove('active'); 
    //     document.getElementById("moon_icon").classList.add('active'); 
    //     // document.getElementById("sun_icon_mob").classList.remove('active'); 
    //     // document.getElementById("moon_icon_mob").classList.add('active'); 
    //     localStorage.setItem("theme",'dark_theme');

       
    // }
    // lightTheme()
    // {
    //     document.body.classList.remove('dark_theme'); 
    //     document.body.classList.add('light_theme'); 
    //     document.getElementById("moon_icon").classList.remove('active'); 
    //     document.getElementById("sun_icon").classList.add('active');
    //     // document.getElementById("moon_icon_mob").classList.remove('active'); 
    //     // document.getElementById("sun_icon_mob").classList.add('active');
    //     localStorage.setItem("theme",'light_theme');

        
    // }

    // darkThemeMobile()
    // {
    //     document.body.classList.remove('light_theme'); 
    //     document.body.classList.add('dark_theme'); 
       
    //     document.getElementById("sun_icon_mob").classList.remove('active'); 
    //     document.getElementById("moon_icon_mob").classList.add('active'); 
    //     localStorage.setItem("theme",'dark_theme');

       
    // }
    // lightThemeMobile()
    // {
    //     document.body.classList.remove('dark_theme'); 
    //     document.body.classList.add('light_theme'); 
      
    //     document.getElementById("moon_icon_mob").classList.remove('active'); 
    //     document.getElementById("sun_icon_mob").classList.add('active');
    //     localStorage.setItem("theme",'light_theme');

        
    // }

  
   


    showMobile()
    {
      
        //  document.getElementById("mobile_nav_item").classList.toggle('active');
        document.getElementById("mobile_nav_item").classList.toggle("left_stye");
        document.getElementById("mobileLayer").classList.toggle('active');
        document.getElementById("burger").classList.toggle('clicked');  
        document.getElementById("burger").classList.toggle("burger_stye")   
        
    }

   

    

    
   
   
    
   constructor(props)
   {
       super(props);
       this.state = {location:false,
        walletModal: false,
        accountInfo: "",
        walletConnect: "",
        proxyOwner: "",
        currentChain: 0,
        settingsModal : false,
    }
   }



//    componentDidMount() {
    // window.addEventListener("beforeunload", function (event) {
    //     this.localStorage.removeItem("accountInfo");
    //     this.sessionStorage.removeItem("accountInfo")
    //  })
//  }

  
//    handlegetkyc = async()=>{
//     // if(isEmpty(this.state.kyc)){
//       let walletaddress = localStorage.getItem("accountInfo");
//       if(walletaddress){
//         let result = await getkychook(walletaddress.toLowerCase());
//         console.log("result" , result?.data?.data);
//         if(result?.data?.data?.record?.status == 'Approved'){
//           sessionStorage.setItem("kyc" , true)
//       }
//      else{
//         sessionStorage.setItem("kyc" , false)
//      }
      
//     //   }
//     }
//     else{
       
//         this.setState({walletModal : true});
//       }
//   }
  
  componentDidMount()
   {
    localStorage.setItem("CHAIN" , 2)
    window.addEventListener('scroll', function() {
        if(window.pageYOffset >100)
        {
            document.getElementById("header").classList.add('header-scrolled');
            
        }
        else{
            document.getElementById("header").classList.remove('header-scrolled');

        }
    });


   
    // if(!(localStorage.getItem("theme") == "dark_theme"))
    // {
    //     document.body.classList.remove('dark_theme'); 
    //     document.body.classList.add('light_theme'); 
    //     document.getElementById("moon_icon").classList.remove('active'); 
    //     document.getElementById("sun_icon").classList.add('active');
    //     document.getElementById("moon_icon_mob").classList.remove('active'); 
    //     document.getElementById("sun_icon_mob").classList.add('active');
    //     localStorage.setItem("theme",'light_theme');
    // }
    // else
    // {
    //     document.body.classList.remove('light_theme'); 
    //     document.body.classList.add('dark_theme'); 
    //     document.getElementById("sun_icon").classList.remove('active'); 
    //     document.getElementById("moon_icon").classList.add('active'); 
    //     document.getElementById("sun_icon_mob").classList.remove('active'); 
    //     document.getElementById("moon_icon_mob").classList.add('active');
    //     localStorage.setItem("theme",'dark_theme');  
    // }
    this.setState({ accountInfo: getAccount() });
    this.setState( { currentChain: getChainId() });
    this.getOwner();

    // this.handlegetkyc();
   }

   onDismiss(){
       this.setState({ walletModal: false });
   }

   getOwner = async() =>{
       const owner = await getProxyOwner();
       this.setState({ proxyOwner: owner });
       console.log("owner : ",owner)
   }

    logOut = async () =>{
        this.setState({accountInfo : ""})
        localStorage.removeItem("accountInfo")
        if(localStorage.getItem("walletconnect")!=null)
     {
        const provider = await UseProvider();
        await provider.disconnect()
     }
      //  this.setState({accountModal: false})
        window.location.reload()
        console.log("logout")
    }
  

    render() {
    const {location} = this.props;
    const {walletModal,accountInfo, settingsModal } = this.state



		return (


           <div>

                          
<div id="mobileLayer">
                   <div id="header" className="fixed-top-navbar d-none d-md-block">
               <div className="container-fluid" id="mobileshow">
               <header className={`${location}`}>
                   <div className='d-flex headerleft'>
                        <NavLink to="/" className='mr-lg-5'><span className='logo_img_sm'/></NavLink>                  
                      
                   </div>
      

<div className='d-block d-lg-block web_menu'>
<div className="d-flex align-items-center justify-content-between py-0 header_flex">

  
      
       <div className='d-flex align-items-center nav_parnt'>
<div className='nav_parnt_1'>


                        {/* <button className="get-started-btn mr-2 text-uppercase" onClick={() => this.setState({ settingsModal: true })}>
                        { this.state.currentChain && CHAINS[this.state.currentChain].NAME }
                        </button> */}


    
            


       
</div>
<div className='nav_parnt_2'>
    <div className="nav-menu">
          <ul className="pl-0 mb-0">
         
            {(accountInfo == "" || localStorage.getItem("accountInfo")== null)?
            <button className="get-started-btn rounded_btn_wal" onClick={() => this.setState({ walletModal: true })}>
                        <svg viewBox="0 0 24 24" height="24" width="24" color="textSubtle" xmlns="http://www.w3.org/2000/svg" class="sc-bdnxRM xpLe"><path d="M19.43 12.98C19.47 12.66 19.5 12.34 19.5 12C19.5 11.66 19.47 11.34 19.43 11.02L21.54 9.37C21.73 9.22 21.78 8.95 21.66 8.73L19.66 5.27C19.54 5.05 19.27 4.97 19.05 5.05L16.56 6.05C16.04 5.65 15.48 5.32 14.87 5.07L14.49 2.42C14.46 2.18 14.25 2 14 2H9.99996C9.74996 2 9.53996 2.18 9.50996 2.42L9.12996 5.07C8.51996 5.32 7.95996 5.66 7.43996 6.05L4.94996 5.05C4.71996 4.96 4.45996 5.05 4.33996 5.27L2.33996 8.73C2.20996 8.95 2.26996 9.22 2.45996 9.37L4.56996 11.02C4.52996 11.34 4.49996 11.67 4.49996 12C4.49996 12.33 4.52996 12.66 4.56996 12.98L2.45996 14.63C2.26996 14.78 2.21996 15.05 2.33996 15.27L4.33996 18.73C4.45996 18.95 4.72996 19.03 4.94996 18.95L7.43996 17.95C7.95996 18.35 8.51996 18.68 9.12996 18.93L9.50996 21.58C9.53996 21.82 9.74996 22 9.99996 22H14C14.25 22 14.46 21.82 14.49 21.58L14.87 18.93C15.48 18.68 16.04 18.34 16.56 17.95L19.05 18.95C19.28 19.04 19.54 18.95 19.66 18.73L21.66 15.27C21.78 15.05 21.73 14.78 21.54 14.63L19.43 12.98ZM12 15.5C10.07 15.5 8.49996 13.93 8.49996 12C8.49996 10.07 10.07 8.5 12 8.5C13.93 8.5 15.5 10.07 15.5 12C15.5 13.93 13.93 15.5 12 15.5Z"></path></svg>
            </button>:
            <NavLink to="/wallet" className="get-started-btn link_wallet_new">
            {`${accountInfo.substring(0, 5)}...${accountInfo.substring(38,42)}`}</NavLink>}
          
        </ul>
    </div>
   
    </div>
     

</div>
   
    

</div>
</div>

{/* {walletModal && <Walletmodal connect={"string"} onDismiss={()=>this.onDismiss()} /> } */}


</header>
</div>
</div>

<div id="header1" className="fixed-top-navbar d-block d-md-none">
               <div className="container-fluid  h-100" id="mobileshow1">
               <header className="h-100">
               <Link to="/" className='mr-3 logo_mob_mar'><span className='logo_img_sm'/></Link>

                 
      

               <div className='d-flex align-items-center'>
{/* <div className='d-flex'>


                        <button className="get-started-btn rounded_btn_wal px-0 mr-3" onClick={() => this.setState({ settingsModal: true })}>
                        <svg viewBox="0 0 24 24" height="24" width="24" color="textSubtle" xmlns="http://www.w3.org/2000/svg" class="sc-bdnxRM xpLe"><path d="M19.43 12.98C19.47 12.66 19.5 12.34 19.5 12C19.5 11.66 19.47 11.34 19.43 11.02L21.54 9.37C21.73 9.22 21.78 8.95 21.66 8.73L19.66 5.27C19.54 5.05 19.27 4.97 19.05 5.05L16.56 6.05C16.04 5.65 15.48 5.32 14.87 5.07L14.49 2.42C14.46 2.18 14.25 2 14 2H9.99996C9.74996 2 9.53996 2.18 9.50996 2.42L9.12996 5.07C8.51996 5.32 7.95996 5.66 7.43996 6.05L4.94996 5.05C4.71996 4.96 4.45996 5.05 4.33996 5.27L2.33996 8.73C2.20996 8.95 2.26996 9.22 2.45996 9.37L4.56996 11.02C4.52996 11.34 4.49996 11.67 4.49996 12C4.49996 12.33 4.52996 12.66 4.56996 12.98L2.45996 14.63C2.26996 14.78 2.21996 15.05 2.33996 15.27L4.33996 18.73C4.45996 18.95 4.72996 19.03 4.94996 18.95L7.43996 17.95C7.95996 18.35 8.51996 18.68 9.12996 18.93L9.50996 21.58C9.53996 21.82 9.74996 22 9.99996 22H14C14.25 22 14.46 21.82 14.49 21.58L14.87 18.93C15.48 18.68 16.04 18.34 16.56 17.95L19.05 18.95C19.28 19.04 19.54 18.95 19.66 18.73L21.66 15.27C21.78 15.05 21.73 14.78 21.54 14.63L19.43 12.98ZM12 15.5C10.07 15.5 8.49996 13.93 8.49996 12C8.49996 10.07 10.07 8.5 12 8.5C13.93 8.5 15.5 10.07 15.5 12C15.5 13.93 13.93 15.5 12 15.5Z"></path></svg>
                        </button>


       
</div> */}
<div className=''>
    <div className="nav-menu">
          <ul className="pl-0 mb-0">
         
            {(accountInfo == "" || localStorage.getItem("accountInfo")== null)?
            <button className="get-started-btn text-uppercase" onClick={() => this.setState({ walletModal: true })}>
            BSC Mainnet</button>:
            <NavLink to="/wallet" className="get-started-btn link_wallet_new">
            {`${accountInfo.substring(0, 5)}...${accountInfo.substring(38,42)}`}</NavLink>}
          
        </ul>
    </div>
   
    </div>
     

</div>

{walletModal && <Walletmodal connect={"string"} onDismiss={()=>this.onDismiss()} /> }


</header>
</div>
</div>

</div>
{settingsModal && <Settingsmodal onDismiss={()=> this.setState({ settingsModal: false })} connect={"string"} /> }


           </div>
        );
    }
}



export default Header