import React, { Component } from 'react';
import { useContext, useEffect, useState } from "react";
import { Card, Accordion, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


// import 'font-awesome/css/font-awesome.min.css';




import settingsicon from "../../images/settings_icon.png"
import kycicon from "../../images/kyc.svg"
import launchpadicon from "../../images/launchpad.svg"

import adminlaunchpad from "../../images/adminlaunchpad.png"
import trending from "../../images/trending.svg"




import { NavLink } from "react-router-dom";

class Adminsidebar extends Component 
{ 
    
   constructor(props)
   {
       super(props);
       this.state = {
        location:false,       
        sidebarShrink:false,
        setActive:0
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


 



    render() {
    const {sidebarShrink,setActive } = this.state



		return (


           <div id="sidebar" className={sidebarShrink?"side_shrink lis_paren_side_admn":"lis_paren_side_admn"}>
             <button className="get-started-btn rounded_btn_wal shrink_side_btn" onClick={() => this.setSidebarWidth()}>
             <i class="fa fa-chevron-right" aria-hidden="true"></i>    
            </button>
            <ul className='sidebar_ul'>
            <NavLink to="/adminlaunchpad" className="parent_1_grad">
                <li className='lis_paren_side li_bot_less'>
               
                <img src={launchpadicon} className="icon_sidebar" />
                <span>
                    Launchpad
                </span>
               
                </li>
                </NavLink>

                <NavLink to="/adminkyc" className="parent_1_grad">
                <li className='lis_paren_side li_bot_less'>
               
                <img src={kycicon} className="icon_sidebar" />
                <span>
                    KYC
                </span>
               
                </li>
                </NavLink>

                <NavLink to="/adminsettings" className="parent_1_grad">
                <li className='lis_paren_side li_bot_less'>
               
                <img src={settingsicon} className="icon_sidebar" />
                <span>
                    Settings
                </span>
               
                </li>
                </NavLink>      

                 <NavLink to="/launchpadsettings" className="parent_1_grad">
                <li className='lis_paren_side li_bot_less'>
               
                <img src={adminlaunchpad} className="icon_sidebar" />
                <span>
                    Launchpad Settings
                </span>
               
                </li>
                </NavLink>  

                <NavLink to="/admintrending" className="parent_1_grad">
                <li className='lis_paren_side li_bot_less'>
               
                <img src={trending} className="icon_sidebar" />
                <span>
                    OnTop
                </span>
               
                </li>
                </NavLink>       
              
          
              
            </ul>
         

           </div>
        );
    }
}



export default Adminsidebar