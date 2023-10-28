import React, { Component } from 'react';
import { useContext, useEffect, useState } from "react";

import Header from '../Header';
import Sidebar from '../Sidebar';


import { getAccount } from '../../hooks/useAccount'
import {Card} from 'react-bootstrap'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";




import Web3 from "web3";

import {  Container, FormControl, InputGroup } from 'react-bootstrap';
import '../../css/styles.css';

import favicon from "../../images/favicon.png"
import { Link } from 'react-router-dom';

class Comingsoon extends Component {
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
  
    componentDidMount()
    {
      // this.showLoader();
      this.hideLoader();
    //    this.setState({ accountInfo: getAccount() });
    }

    constructor(props) {
        super(props);
        this.state = {          
           
        };
    }
    

 
    render() {        



      
      
	return (
    <div id="loader_main">
    <div id="loader_div">
    <span className="spin_round">

    </span>
    <img src={favicon} className="logo_load" />
  </div>
        <div className='logo_overlay' id="logo_overlay">

           <Header/>
          
           <div className="whole_sec pb-5">
           <div className='flex_side_right'>
            <Sidebar />
           <div className='right_side_sec'>
           
              <div className="right_side_spacing">
              
                {/* Coming soon session */}

                <Container className="container">
                  <div className="coming_soon">
                    <h1 className="text-white">Coming Soon</h1>
                  </div>
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

                {/* end of Coming soon session */}

           
            </div>
           </div>
           </div>
           </div>

        </div>
        </div>
        )
    }
}

export default Comingsoon