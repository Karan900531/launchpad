import React, { Component } from 'react';
import { useContext, useEffect, useState } from "react";

import { Link } from 'react-router-dom';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Trendingslider from '../trendingslider';
import TransfertokenModal from "./TransfertokenModal"

import {  Container, InputGroup, FormControl } from 'react-bootstrap';
import '../../css/styles.css';

import Countdown, {zeroPad} from 'react-countdown';

import favicon from "../../images/favicon.png"

const renderer = ({ days, Month, Year, hours, minutes, seconds, completed }) => {
  if (completed) {
    return  <div className='btn_timer_new'>
    <span>{zeroPad(days)}</span>
    <span>{zeroPad(hours)}</span>
    <span>{zeroPad(minutes)}</span>   
    <span>{zeroPad(seconds)}</span>        
 </div>
  } else {
    // Render a countdown
    return <div className='btn_timer_new'>
           
           <span>{zeroPad(days)}</span>
    <span>{zeroPad(hours)}</span>
    <span>{zeroPad(minutes)}</span>   
    <span>{zeroPad(seconds)}</span>  
          </div>;
  }
};

class UpdateLock extends Component {
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
      document.getElementById("launchpad_parent").classList.add("active");

      this.hideLoader();
    }

    constructor(props) {
        super(props);
        this.state = {          
        };
    }
 

    render() {
        
      const location = this.props.location.pathname.split('/')[1];


      
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
           {/* ongoing_sec */}
           <div className='right_side_sec'>
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
                <div className='row mt-3'>
                    <div className='col-12 col-md-10 col-lg-9 mx-auto'>
                  
                    <div className='card_bg card mt-4'>
                        <div className="card-body">
                        <p class="text-white">Update Your Lock</p>
                        <hr class="hr_green"></hr>
                        <div className='mt-4'>
                        <small class="mt-3 bottom_text">IgniteLaunchpad is audited by Certik: 
                        <a href="https:leaderboard.certik.io/projects" target="_blank" className='link_blue_new pl-1 block_link_new_blue'>
                            https:leaderboard.certik.io/projects
                        </a>
                        </small>
                        </div>
                        <p className='white_txt_sm d-flex justify-content-between mt-3 mb-1'>
            <span className='desc_grey_txt'>Token Address :</span>
            <span className='desc_grey_txt font_12'>0xB3gjyo78954634hgFEGFTE           
            </span>
            </p>

            <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
            <span className='desc_grey_txt'>Name :</span>
            <span className='desc_grey_txt font_12'>Binance 
          
            </span>
            </p>

            <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
            <span className='desc_grey_txt'>Symbol :</span>
            <span className='desc_grey_txt font_12'>BTC
            </span>
            </p>

            <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
            <span className='desc_grey_txt'>Decimals :</span>
            <span className='desc_grey_txt font_12'>18
            </span>
            </p>  
            <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
            <span className='desc_grey_txt'>Balance :</span>
            <span className='desc_grey_txt font_12'>999.5
            </span>
            </p>  
            <div className='col-12 col-md-12 mb-3 px-0 mt-4'>
                        
                        <p className='input_desc_sm'>Title</p>
                        <div className="inputs input-groups">
                            <InputGroup className="">
                                <FormControl id="title" placeholder="Title"
                                    aria-describedby="basic-addon2"
                                />
                              
                            </InputGroup>
                        </div>
                        
                            </div>
            <div className='col-12 col-md-12 text-center mt-4'>
        <button className="get-started-btn">
       Update
        </button>
        </div>           

       
                            </div>
                        </div>
                       
                    <div>        
                        </div>
                    </div>
                </div>
             

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

        </div>
        )
    }
}

export default UpdateLock