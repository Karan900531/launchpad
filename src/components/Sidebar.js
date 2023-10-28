import React, { Component } from 'react';
import { useContext, useEffect, useState } from "react";
import { Card, Accordion, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Walletmodal from "./Walletmodal";
import Settingsmodal from "./Settingsmodal";

// import 'font-awesome/css/font-awesome.min.css';

import { getAccount, getChainId, setChainId } from '../hooks/useAccount'


import { getProxyOwner } from '../hooks/useContract';
import { UseProvider} from '../hooks/useWeb3'


import homeicon from "../images/home.svg"
import coinsicon from "../images/coins.svg"
import exchangeicon from "../images/exchange.svg"
import kycicon from "../images/kyc.svg"
import launchpadicon from "../images/launchpad.svg"
import lockedicon from "../images/locked.svg"
import privateicon from "../images/private.svg"
import docsicon from "../images/docs.svg"
import twittericon from "../images/twitter.svg"
import telegramicon from "../images/telegram.svg"

import fbicon from "../images/fb.svg"





import { NavLink } from "react-router-dom";
import { getsettinghook } from '../hooks/usebackend';

class Sidebar extends Component 
{
    darkTheme()
    {
        document.body.classList.remove('light_theme'); 
        document.body.classList.add('dark_theme'); 
        document.getElementById("sun_icon").classList.remove('active'); 
        document.getElementById("moon_icon").classList.add('active'); 
        // document.getElementById("sun_icon_mob").classList.remove('active'); 
        // document.getElementById("moon_icon_mob").classList.add('active'); 
        localStorage.setItem("theme",'dark_theme');

       
    }
    lightTheme()
    {
        document.body.classList.remove('dark_theme'); 
        document.body.classList.add('light_theme'); 
        document.getElementById("moon_icon").classList.remove('active'); 
        document.getElementById("sun_icon").classList.add('active');
        // document.getElementById("moon_icon_mob").classList.remove('active'); 
        // document.getElementById("sun_icon_mob").classList.add('active');
        localStorage.setItem("theme",'light_theme');

        
    }
    
   
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

  
   


    // showMobile()
    // {
      
    //     document.getElementById("mobile_nav_item").classList.toggle("left_stye");
    //     document.getElementById("mobileLayer").classList.toggle('active');
    //     document.getElementById("burger").classList.toggle('clicked');  
    //     document.getElementById("burger").classList.toggle("burger_stye")   
        
    // }

    

    
   
   
    
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
        sidebarShrink:false,
        setActive:0,
        setting : [],
        telegram : {},
        facebook : {},
        twitter : {}
    }
   }

   setSidebarWidth()
   {
       this.setState({ sidebarShrink: !this.state.sidebarShrink });
       if(this.state.sidebarShrink)
       {
        document.body.classList.remove('sidebar_shr');
       }
       else
       {
        document.body.classList.add('sidebar_shr');

       }
   }
  
  componentDidMount()
   { 
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
    this.getsetting();
   }

   async getsetting(){
    let data = await getsettinghook();
    console.log("data setting" , data.data.data);
    this.setState({setting : data?.data?.data})
    data.data.data.map((val , i)=>{
        if(val.settingname == "Facebook" || val.settingname == "facebook" || val.settingname == "FaceBook" ){
            this.setState({facebook : val});
        }
        if(val.settingname == "Twitter" || val.settingname == "twitter"){
            this.setState({twitter : val});
        }
        if(val.settingname == "Telegram" || val.settingname == "telegram"){
            this.setState({telegram : val});
        }
        
    })
   }

   onDismiss(){
       this.setState({ walletModal: false });
   }

   getOwner = async() =>{
       const owner = await getProxyOwner();
       this.setState({ proxyOwner: owner });
       
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
    const {walletModal,accountInfo, settingsModal,sidebarShrink,setActive } = this.state



		return (


           <div id="sidebar" className={sidebarShrink?"side_shrink":""}>
             <button className="get-started-btn rounded_btn_wal shrink_side_btn" onClick={() => this.setSidebarWidth()}>
             <i class="fa fa-chevron-right" aria-hidden="true"></i>    
            </button>
            <ul className='sidebar_ul'>
            <NavLink to="/home" className="parent_1_grad">
                <li className='lis_paren_side li_bot_less'>
               
                <img src={homeicon} className="icon_sidebar" />
                <span>
                    Home
                </span>
               
                </li>
                </NavLink>
                <li className='px-0 py-0 li_bot_less'>
                <Accordion>
                <Card>
                <Card.Header className='lis_paren_side_accordion px-0 py-2'>
                <Accordion.Toggle as={Button} variant="link" eventKey="0" className='w-100 pl-0'>
                <div className='d-flex align-items-center justify-content-between pl-0'>
                <div className='icon_text_div pl-2' id="launchpad_parent">
                <img src={launchpadicon} className="icon_sidebar" />
                <span>
                Launchpad
                </span>
                </div>
                <button className='btn_white_outline_round'>
                <i class="fa fa fa-angle-down" aria-hidden="true"></i>
                </button>
                </div>

                </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                <Card.Body className='py-0 inner_card_body_acc'>
                <ul className='sidebar_inner_ul pl-3'>
                <NavLink to="/create" onClick={()=>{this.setState({ setActive: 1 })}}>
                <li className='li_bot_less'>                
                Create Launchpad              
                </li>
                </NavLink>
                <NavLink to="/createfairlaunch">
                <li className='li_bot_less'>

                Create Fair Launch

                </li>
                </NavLink>
                <NavLink to="/launchpadlist">
                <li className='li_bot_less'>

                Launchpad List

                </li>
                </NavLink>
                <NavLink to="/createtoken">
                <li className='li_bot_less'>

                Token Creation

                </li>
                </NavLink>
                </ul>
                </Card.Body>
                </Accordion.Collapse>
                </Card>
                <Card>
                <Card.Header className='lis_paren_side_accordion px-0 py-2'>
                <Accordion.Toggle as={Button} variant="link" eventKey="1" className='w-100 pl-0'>
                <div className='d-flex align-items-center justify-content-between pl-0'>
                <div className='icon_text_div pl-2' id="privatesale_parent">
                <img src={privateicon} className="icon_sidebar" />
                <span>
                Private Sale
                </span>
                </div>
                <button className='btn_white_outline_round'>
                <i class="fa fa fa-angle-down" aria-hidden="true"></i>
                </button>
                </div>

                </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                <Card.Body className='py-0 inner_card_body_acc'>
                <ul className='sidebar_inner_ul pl-3'>
                <NavLink to="/createprivatesale">
                <li className='li_bot_less'>                
                Create Private Sale              
                </li>
                </NavLink>
                <NavLink to="/privatesalelist">
                <li className='li_bot_less'>

                Private Sale List

                </li>
                </NavLink>               
               
                </ul>
                </Card.Body>
                </Accordion.Collapse>
                </Card>
                <Card>
                <Card.Header className='lis_paren_side_accordion px-0 py-2'>
                <Accordion.Toggle as={Button} variant="link" eventKey="2" className='w-100 pl-0'>
                <div className='d-flex align-items-center justify-content-between pl-0'>
                <div className='icon_text_div pl-2' id="lock_parent">
                <img src={lockedicon} className="icon_sidebar" />
                <span>
                In Lock
                </span>
                </div>
                <button className='btn_white_outline_round'>
                <i class="fa fa fa-angle-down" aria-hidden="true"></i>
                </button>
                </div>

                </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="2">
                <Card.Body className='py-0 inner_card_body_acc'>
                <ul className='sidebar_inner_ul pl-3'>
                <NavLink to="/createlock">
                <li className='li_bot_less'>                
                Create Lock     
                </li>
                </NavLink>
                <NavLink to="/tokenlock">
                <li className='li_bot_less'>                
                Token Lock     
                </li>
                </NavLink>
                {/* <NavLink to="/liquiditylock">
                <li className='li_bot_less'>

                Liquidity Lock

                </li>
                </NavLink>                */}
               
                </ul>
                </Card.Body>
                </Accordion.Collapse>
                </Card>

</Accordion>
                </li>
                <NavLink to="/exchange" className="parent_1_grad">
                <li className='lis_paren_side'>
               
                <img src={exchangeicon} className="icon_sidebar" />
                <span>
                    Exchange
                </span>
               
                </li>
                </NavLink>
                <NavLink to="/kyc" className="parent_1_grad">
                <li className='lis_paren_side'>
               
                <img src={kycicon} className="icon_sidebar" />
                <span>
                    KYC & Audit
                </span>
               
                </li>
                </NavLink>
                <NavLink to="/crypto" className="parent_1_grad">
                <li className='lis_paren_side'>
               
                <img src={coinsicon} className="icon_sidebar" />
                <span>
                    Crypto $225.91
                </span>
               
                </li>
                </NavLink>

                <a href="#" className="parent_1_grad">
                <li className='lis_paren_side'>
               
                <img src={docsicon} className="icon_sidebar" />
                <span>
                    Docs
                </span>
               
                </li>
                </a>

                <a href={this.state.telegram.settingvalue} target="_blank" className="parent_1_grad">
                <li className='lis_paren_side'>
               
                <img src={telegramicon} className="icon_sidebar" />
                <span>
                    Telegram
                </span>
               
                </li>
                </a>

                <a href={this.state.twitter.settingvalue} target="_blank" className="parent_1_grad">
                <li className='lis_paren_side'>
               
                <img src={twittericon} className="icon_sidebar" />
                <span>
                    Twitter
                </span>
               
                </li>
                </a>

                <a href={this.state.facebook.settingvalue} target="_blank" className="parent_1_grad">
                <li className='lis_paren_side'>
               
                <img src={fbicon} className="icon_sidebar" />
                <span>
                    Facebook
                </span>
               
                </li>
                </a>
            </ul>
            <div className='footer_theme_div'>

            <i className="fa fa-sun-o theme_icon" aria-hidden="true" id="sun_icon" onClick={()=>this.lightTheme()}></i>
            <span className='px-1 text_splash'>/</span>
            <i class="fa fa-moon-o theme_icon active" aria-hidden="true" id="moon_icon" onClick={()=>this.darkTheme()}></i>
            <span className='pl-2 text_splash mode_taxt'>Mode</span>
            </div>

           </div>
        );
    }
}



export default Sidebar