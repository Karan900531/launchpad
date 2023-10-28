import React, { Component } from 'react';
import { useContext, useEffect, useState } from "react";

import Header from '../Header';
import Sidebar from '../Sidebar';
import Trendingslider from '../trendingslider';


import { getAccount } from '../../hooks/useAccount'





import {  Container, FormControl, InputGroup } from 'react-bootstrap';
import '../../css/styles.css';

import favicon from "../../images/favicon.png"

import { Link } from 'react-router-dom';
import { getSaleInfo } from '../../hooks/useContract';
import {  updateTokenInfo } from '../../hooks/useAdmin';

class LaunchpadEdit extends Component {
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
  
   

    constructor(props) {
        super(props);
        this.state = {          
            accountInfo: '',
            saleAddress: window.location.pathname.split('/')[2],
            saleInfo: {},
           
        };
    }
 
async Getdata(){
    const saleDetail = await getSaleInfo(this.state.saleAddress);
  
    this.setState({ saleInfo: saleDetail });
    this.hideLoader();
    
}


async setSocialInfo(){
    await updateTokenInfo(this.state.saleInfo,this.state.saleAddress,getAccount());
    // this.props.onUpdate();
 }




componentDidMount()
{
    
    document.getElementById("launchpad_parent").classList.add("active");
//    this.showLoader();
  this.Getdata()
}
    render() {
        
      const location = this.props.location.pathname.split('/')[1];

      const { walletModal,saleInfo} = this.state

     
      
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

              
                <div className='col-12 col-md-12 mb-0'>
                        
                        <p className='input_desc_sm'>Logo URL</p>
                        <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl id="file" placeholder={ !saleInfo.logo ? saleInfo.logo : saleInfo.logo }
                            onChange={(e)=>{ let data = saleInfo; data.logo=e.target.value; this.setState({ saleInfo: data }); }} 
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
                            
                            <FormControl placeholder={!saleInfo.website  ? saleInfo.social && saleInfo.social[0] : saleInfo.website }  id="logolink1" 
                            
                            onChange={(e)=>{ let data = saleInfo; data.website=e.target.value; this.setState({ saleInfo: data }); }} 
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                    </div>
                        </div>
                        <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>Twitter</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl placeholder={!saleInfo.twitter  ? saleInfo.social && saleInfo.social[1] : saleInfo.twitter } 
                            onChange={(e)=>{ let data = saleInfo; data.twitter=e.target.value; this.setState({ saleInfo: data }); }} 
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                    </div>
                        </div>
                        <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>Telegram</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl placeholder={!saleInfo.telegram  ? saleInfo.social && saleInfo.social[2] : saleInfo.telegram } 
                             onChange={(e)=>{ let data = saleInfo; data.telegram=e.target.value; this.setState({ saleInfo: data }); }} 
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                    </div>
                        </div>
                      

                        

                        <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>Github</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl id="logolinkgit" placeholder={!saleInfo.githup  ? saleInfo.social && saleInfo.social[7] : saleInfo.githup }
                            onChange={(e)=>{ let data = saleInfo; data.githup=e.target.value; this.setState({ saleInfo: data }); }} 
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                    </div>
                        </div>

                       

                        <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>Instagram</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl  id="logolinkinsta" placeholder={!saleInfo.instagram  ? saleInfo.social && saleInfo.social[8] : saleInfo.instagram }
                           onChange={(e)=>{ let data = saleInfo; data.instagram=e.target.value; this.setState({ saleInfo: data }); }} 
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                    </div>
                        </div>

                        <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>Discord</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl  id="logolinkdiscord" placeholder={!saleInfo.discord  ? saleInfo.social && saleInfo.social[9] : saleInfo.discord }
                            onChange={(e)=>{ let data = saleInfo; data.discord=e.target.value; this.setState({ saleInfo: data }); }} 
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                    </div>
                        </div>
                        
                        <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>Reddit</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl  id="logolinkreddit" placeholder={!saleInfo.reddit  ? saleInfo.social && saleInfo.social[10] : saleInfo.reddit }
                            onChange={(e)=>{ let data = saleInfo; data.reddit=e.target.value; this.setState({ saleInfo: data }); }} 
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                    </div>
                        </div>

                        <div className='col-12 col-md-12 mb-0'>
                    <p className='input_desc_sm'>Youtube Video</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl  id="logolinkyoutube" placeholder={!saleInfo.githup  ? saleInfo.social && saleInfo.social[11] : saleInfo.youtube }
                            onChange={(e)=>{ let data = saleInfo; data.youtube=e.target.value; this.setState({ saleInfo: data }); }} 
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
                        {console.log("sal",saleInfo)}
                            <textarea placeholder={ !saleInfo.description ? saleInfo.description : saleInfo.description } id="description" rows="3"
                            onChange={(e)=>{ let data = saleInfo; console.log("data",data); this.setState({ saleInfo: data.description=e.target.value }); }}
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                    </div>
                    </div>



                    
                    <div className='col-12 col-md-12 text-center'>
                        <Link to="/launchpaddetail" className="get-started-btn mr-2">
                           Back
                        </Link>
                        <button onClick={()=>this.setSocialInfo()}className="get-started-btn">
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

export default LaunchpadEdit