import React, { Component } from 'react';
import { useContext, useEffect, useState } from "react";

import Header from '../Header';
import Sidebar from '../Sidebar';
import Trendingslider from '../trendingslider';

import Walletmodal from "../Walletmodal";


import { getAccount } from '../../hooks/useAccount'





import {  Container, FormControl, InputGroup } from 'react-bootstrap';
import '../../css/styles.css';

import favicon from "../../images/favicon.png"
import { Link } from 'react-router-dom';

class PrivateSaleEdit extends Component {
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
        document.getElementById("privatesale_parent").classList.add("active");
      // this.showLoader();
      this.hideLoader();
    //    this.setState({ accountInfo: getAccount() });
    }

    constructor(props) {
        super(props);
        this.state = {          
            walletModal: false,
            accountInfo: ''
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
              <div className='row mt-5'>
           <div className='col-12 col-md-10 col-lg-9 mx-auto'>
           <div className="tab_img">
                 <div className='card_bg card'>
            <div className='card-body'>
                  
          

            <div>
                <div className='row'>

                <div className='col-12 col-md-12 mb-3'>
                        
                        <p className='input_desc_sm'>Title</p>
                        <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl id="file" value="New private Sale" placeholder=""
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                    </div>
                      
                            </div>
                <div className='col-12 col-md-12 mb-0'>
                        
                        <p className='input_desc_sm'>Logo URL</p>
                        <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl id="file" value={this.state.logo} onChange={(e)=>this.setState({ logo: e.target.value }) } placeholder=""
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                    </div>
                        <div className='note_desc mt-1 mb-0'>
                    <p>URL must be end with a supported image extension .png, .jpg,</p>
                    </div>
                            </div>

                            <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>Website</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl value={this.state.website} onChange={(e)=>this.setState({ website: e.target.value }) } id="logolink1" placeholder="https://cryptolaunchpad.app"
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                    </div>
                        </div>
                        <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>Facebook</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl  id="logolinkfb" placeholder="https://facebook.com"
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                    </div>
                        </div>

                        <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>Twitter</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl value={this.state.twitter} onChange={(e)=>this.setState({ twitter: e.target.value }) } id="logolink2" placeholder="https://twitter.com"
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                    </div>
                        </div>

                        <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>Github</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl id="logolinkgit" placeholder="https://github.com"
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                    </div>
                        </div>

                        <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>Telegram</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl value={this.state.telegram} onChange={(e)=>this.setState({ telegram: e.target.value }) } id="logolink3" placeholder="https://telegram.com"
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                    </div>
                        </div>

                        <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>Instagram</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl  id="logolinkinsta" placeholder="https://instagram.com"
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                    </div>
                        </div>

                        <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>Discord</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl  id="logolinkdiscord" placeholder="https://discord.com"
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                    </div>
                        </div>
                        
                        <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>Reddit</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl  id="logolinkreddit" placeholder="https://reddit.com"
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                    </div>
                        </div>

                        <div className='col-12 col-md-12 mb-0'>
                    <p className='input_desc_sm'>Youtube Video</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl  id="logolinkyoutube" placeholder="https://youtube.com"
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                    </div>

                    <div className='note_desc mt-1 mb-0'>
                    <p>Input your youtube URL</p>
                    </div>
                        </div>

                        <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>Description</p>
                    <div className="inputs input-groups text_are_grp">
                        <InputGroup className="">
                            <textarea value={this.state.description} onChange={(e)=>this.setState({ description: e.target.value }) } id="description" rows="3"
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                    </div>
                    </div>



                    
                    <div className='col-12 col-md-12 text-center'>
                    <Link to="/privatesaledetail" className="get-started-btn mr-2">
                           Back
                        </Link>
                        <button className="get-started-btn">
                           Update
                        </button>
                        </div>
                </div>
            </div>

          
                      
             </div>
             </div>
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

export default PrivateSaleEdit