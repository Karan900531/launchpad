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
import { Getsinglelockerdetail, Getsinglelockerinfo } from '../../hooks/useContract';

class LockDetail extends Component {
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
      document.getElementById("lock_parent").classList.add("active");
      console.log("location datga" , this.props.location.state)
      // this.showLoader();
      this.hideLoader();
      this.getlockerdetail();
    }

    getlockerdetail = async()=>{
      let addressinfo = await Getsinglelockerinfo(this.state.lpaddress);
      this.setState({"addressdetail" : addressinfo})
      let lockdetail = await Getsinglelockerdetail(this.state.lpaddress);
      this.setState({lockdetail : lockdetail});
      console.log("getlockerdetail" , addressinfo , lockdetail);
    }

    constructor(props) {
        super(props);
        this.state = {          
            accountInfo: '',
            lpaddress : window.location.pathname.split('/')[2],
            addressdetail : {},
            lockdetail : []
        };
    }
 
    render() {
        
      const location = this.props.location.pathname.split('/')[1];

      const { walletModal} = this.state

      
      
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
                <p class="text-white">Lock Info</p>
            <hr class="hr_green"></hr>
                </div>
                    

              
                <div className='col-12 col-md-12 mb-3'>
                        
                <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
            <span className='desc_grey_txt'>Current Locked Amount</span>
            <span className='desc_grey_txt font_12'>{this.state.addressdetail.amount / 10**this.state.addressdetail.decimal}</span>
            </p>  
                            </div>

                            {/* <div className='col-12 col-md-12 mb-3'>
                            <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
            <span className='desc_grey_txt'>Current Values Locked</span>
            <span className='desc_grey_txt font_12'>$0</span>
            </p>  
                        </div> */}
                        <div className='col-12 col-md-12 mb-3'>
                        <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
            <span className='desc_grey_txt'>Token Address</span>
            <span className='desc_grey_txt font_12'>{this.state.lpaddress}</span>
            </p>  
                        </div>

                        <div className='col-12 col-md-12 mb-3'>
                        <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
            <span className='desc_grey_txt'>Token Name:</span>
            <span className='desc_grey_txt font_12'>{this.state.addressdetail.name}</span>
            </p>  
                        </div>

                        <div className='col-12 col-md-12 mb-3'>
                        <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
            <span className='desc_grey_txt'>Token Symbol</span>
            <span className='desc_grey_txt font_12'>{this.state.addressdetail.symbol}</span>
            </p>  
                        </div>

                        <div className='col-12 col-md-12 mb-3'>
                        <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
            <span className='desc_grey_txt'>Token Decimals</span>
            <span className='desc_grey_txt font_12'>{this.state.addressdetail.decimal}</span>
            </p>  
                        </div>

                        

                       
                        
                        

                       

                     



                    
                  
                </div>
            </div>
            <p class="text-white mt-3">Lock records</p>
            <hr class="hr_green"></hr>
            <div class="table-responsive">
           
  <table className="table lockdetail_table recepients_table">
    <thead>
    <tr>
      <th>Wallet</th>
      <th>Amount</th>
      {/* <th>Cycle(m)</th>
      <th>Cycle Release(%)</th> */}
      {/* <th>TGE(%)</th> */}
      <th>Unlock Time(UTC)</th>
    </tr>
    </thead>
    {this.state.lockdetail?.map((data , i)=><>
      <tr>
      
      
       
        
      <td className="table_text">{data?.Createduser}</td>
      <td className="sub_tabletext">{data?.amount / 10**this.state.addressdetail.decimal}</td>
      {/* <td className="sub_tabletext">{this.props.location.state.lockdata.isVested ?
        this.props.location.state.lockdata.vestingInterval
        : "-" 
    }</td>
      <td className="sub_tabletext">{this.props.location.state.lockdata.isVested
          ? this.props.location.state.lockdata.vestingPercent : "-"
      }</td> */}
      {/* <td className="sub_tabletext">-</td> */}
      <td className="sub_tabletext">{new Date(data?.unlockOn*1000).toLocaleDateString()}</td>
  
  {/* <td className="d-flex justify-content-end"><Link className="link_text" to='/'>View</Link></td> */}
  
</tr>
    </>)}
    
   
  </table>
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

export default LockDetail