import React, { Component } from 'react';
import { useContext, useEffect, useState } from "react";

import Header from '../Header';
import Sidebar from '../Sidebar';
import Trendingslider from '../trendingslider';

import { getAccount, getAllocationInfo } from '../../hooks/useAccount'

import Chart from "react-apexcharts";


import Countdown from 'react-countdown';


import {  Container, ProgressBar,InputGroup, FormControl, Button} from 'react-bootstrap';
import '../../css/styles.css';

import favicon from "../../images/favicon.png"
import { Link } from 'react-router-dom';
import { DeletePresale, getSaleInfoCard, GetSalePerAccount, UseTokenInfo } from '../../hooks/useContract';
import { isSaleLive, isUpcoming, Salediffernce, UpcomingDiffernce } from '../../hooks/useProjects';
import { ONEDAYINSECONDS } from '../../config/env';


import WhitelistModal from "../WhitelistModal"
import RemoveWhitelistmodal from "../RemoveWhitelistmodal"
import ChangeStatusmodal from "../ChangeStatusmodal"
import { BuyToken, calculateBuy, claimToken } from '../../hooks/useBuy';
import { Finalise, getUnsold, SetWhitelisted, updateStopEvent, withdrawBNB } from '../../hooks/useAdmin';


const renderer = ({ days, Month, Year, hours, minutes, seconds, completed }) => {
    if (completed) {
      return  <div className='cout_man_div'>
      <div>{days}d </div>
      <div>{hours}h</div>
      <div>{minutes}m</div>   
      <div>{seconds}s </div>         
   </div>
    } else {
      // Render a countdown
      return <div className='cout_man_div'>           
                 <div>{days}d </div>
      <div>{hours}h</div>
      <div>{minutes}m</div>   
      <div>{seconds}s </div>
            </div>;
    }
  };


class LaunchpadDetail extends Component {
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
      document.getElementById("launchpad_parent").classList.add("active");
      // this.showLoader();
     
      
    
      this.refreshData()
      this.hideLoader();
    }

    constructor(props) {
        super(props);
        this.state = { 
        saleAddress: window.location.pathname.split('/')[2],
        saleInfo: {},
        userData: {},
        allocations: [],
         series: [44, 55, 41, 17, 15],
          options: {
            chart: {
              type: 'donut',
            },
            responsive: [
              {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              },
            },
            {
              breakpoint: 600,
              options: {
                chart: {
                  width: 300
                },
                legend: {
                  position: 'right'
                }
              }
            },
            {
              breakpoint: 1199,
              options: {
                chart: {
                  width: 300
                },
                legend: {
                  position: 'bottom'
                }
              }
            },
            {
              breakpoint: 2000,
              options: {
                chart: {
                  width: 350
                },
                legend: {
                  position: 'right'
                }
              }
            }
          ]
          },
          iswhitelisted : true,
          whitelistModal : false,
          removewhitelistModal:false,
          changestatueModal:false,
          buyToken: "",
          buyTokenDecimal : 0,
          amount: 0,
          claim: 0,
          max: 0,
          isMax: false,
          isWhitelistedDisabled : false
          
        }
      
    }
    async BNBwithdraw(){
      await withdrawBNB(this.state.saleAddress,getAccount());
      await this.refreshData()
      
    }



    async loadData(){
     
    
     
      this.showLoader();
      const saleDetail = await getSaleInfoCard(this.state.saleAddress);
      this.setState({ saleInfo: saleDetail });
      if(localStorage.getItem("accountInfo")){
        const user = await GetSalePerAccount(localStorage.getItem("accountInfo"),this.state.saleAddress);
        this.setState({userData: user});
       
        if(saleDetail.isClaimable){
          const allocated = await getAllocationInfo(user.actualBalance,user.userClaimbale,saleDetail.vestingInterval,saleDetail.vestingPercent,user.initialClaim);
          this.setState({ allocations: allocated });
          
        }
        
      }
      this.hideLoader();
      
    }
    
    async refreshData(){
      const saleDetail = await getSaleInfoCard(this.state.saleAddress);
     
      this.setState({ saleInfo: saleDetail });
      this.GetBuytokeninfo(saleDetail?.useWithToken)
      if(localStorage.getItem("accountInfo")){
        const user = await GetSalePerAccount(localStorage.getItem("accountInfo"),this.state.saleAddress);
       
       this.setState({userData: user});
       if(saleDetail.isClaimable){
        const allocated = await getAllocationInfo(user.actualBalance,saleDetail.vestingInterval,saleDetail.vestingPercent,user.initialClaim);
       this.setState({ allocations: allocated });
       }
       
      }
    }


  async  GetBuytokeninfo (value){
     
  if(value === "0x0000000000000000000000000000000000000000"){
  
     this.setState( { buyToken: "BNB"});
     this.setState({buyTokenDecimal : 18})
  }else{
 
      const token = await UseTokenInfo(this.state.saleInfo && this.state.saleInfo?.useWithToken);
      this.setState({ buyToken: token?.symbol });
      this.setState({buyTokenDecimal : Number(token?.decimals)})
      
  }
  }

 async max(){
    this.setState({ max: this.state.saleInfo && (parseInt(this.state.saleInfo?.maxEthLimit)/10** this.state.buyTokenDecimal), isMax: true })
    this.setState({amount : this.state.saleInfo && (parseInt(this.state.saleInfo?.maxEthLimit)/10** this.state.buyTokenDecimal)})
    
  }
   
  
  async calculateToken(value){
   
    const tokenValue = await calculateBuy(this.state.saleAddress,value);
    this.setState({ claim: (tokenValue/10**this.state.saleInfo?.decimals) })
   
}


async buy(){
  
  await BuyToken(this.state.saleAddress,this.state.amount,this.state.isMax,this.state.max,getAccount(),this.state.saleInfo?.decimals);
  await this.refreshData()
  // this.reset();
  
}


async Claim(){
  await claimToken(this.state.saleAddress,getAccount());
  await this.refreshData()
  
}


async stopSaleEvent(){
  await updateStopEvent(this.state.saleAddress,getAccount());
  await this.refreshData()
 
}



async withdrawToken(){
  await getUnsold(this.state.saleAddress,getAccount());
  await this.refreshData()
 ;
}

async BNBwithdraw(){
  await withdrawBNB(this.state.saleAddress,getAccount());
  await this.refreshData()
  
}

async Finalisesale(){
  await Finalise(this.state.saleAddress,getAccount());
  await this.refreshData()
  
}

async Handlewhitelist(value){
  await SetWhitelisted(this.state.saleAddress,value,getAccount());
  await this.refreshData()
}

    render() {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      

      
      
      const { saleInfo ,userData, whitelistModal,removewhitelistModal,changestatueModal, iswhitelisted} = this.state
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
        <Container className='px-1'>
        <div className='row mt-5'>
           <div className='col-12 col-md-6 col-lg-6 mb-4'>
                 <div className='card_bg card h-100'>
            <div className='card-body'>
              <div className='row align-items-center pb-4 row_left_res'>
                <div className='col-12 col-sm-7 col-md-12 col-xl-7 mb-3 mb-md-0'>
                <div className='d-flex align-items-center'>
                    <div className='d-flex align-items-center'>
                    <div className='profimg'>
                    
                    <img src={saleInfo && saleInfo.logo} alt={saleInfo && saleInfo.symbol} className='img_ind_circle'/>
                       {/* <img src="https://bscscan.com/images/svg/brands/bnb.svg?v=1.3" alt="image" className='img_ind_circle'/> */}
                   </div>
                  
                   </div>
                   <div>
                { saleInfo?.owner == localStorage.getItem("accountInfo") ?    
                   <Link to={`/launchpadedit/${this.state.saleAddress}`}  className='btn_social_new btn_social_new_link ml-2'>
                        <i class="fa fa-pencil" aria-hidden="true"></i>
                        </Link> : <></>}

                        <button className='btn_social_new ml-1'>
                        <i class="fa fa-globe" aria-hidden="true"></i>
                        </button>
                   </div>
              
           
                </div>
      
                  
                </div>
                <div className='col-12 col-sm-5 col-md-12 col-xl-5 mb-3 mb-md-0'>
               
                    
                   
                    <p className='text-right'>
                    {/* <button className='btn_social_new mr-2'>
                        <i class="fa fa-bell-o" aria-hidden="true"></i>
                        </button> */}
                        {saleInfo && isSaleLive(saleInfo.startTime,saleInfo.endTime,saleInfo.isPresaleOpen)  ?
                    <span className="badge badge-green-rect mt-0">
                        <span className='blk_txt'>Live</span>
                        </span> : ( isUpcoming(saleInfo.startTime) ? 
                      <span className="badge badge-green-rect mt-0">
                      <span className='blk_txt'>Upcoming</span>
                      </span>:
                       <span className="badge badge-green-rect mt-0">
                       <span className='blk_txt'>Closed</span>
                       </span>)
    }
                  
                    </p>
 
                    </div>
             
              </div>
         


            <div>
            {/* <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'> */}
            {/* <span className='desc_grey_txt'>Private Sale Address :</span> */}
            {/* <span><a href={`https://testnet.bscscan.com/address/${saleInfo && saleInfo?.tokenAddress}`} target='_blank'className='desc_grey_txt font_12'>{`${( saleInfo && saleInfo?.tokenAddress).substring(0, 5)}...${(saleInfo && saleInfo?.tokenAddress).substring(38,42)}`}</a></span> */}
            {/* <span><a href={`https://testnet.bscscan.com/address/${saleInfo && saleInfo.tokenAddress}`} target='_blank'className='desc_grey_txt font_12'>{saleInfo && saleInfo?.tokenAddress.substring(0,5)}</a></span> */}

            {/* </p>     */}
            <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
            <span className='desc_grey_txt'>1 {this.state.buyToken} :</span>
            <span className='desc_grey_txt font_12'>{saleInfo && saleInfo.presaleRate} {saleInfo && saleInfo.symbol}
            </span>
            </p> 
          

            <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
            <span className='desc_grey_txt'>Softcap :</span>
            <span className='desc_grey_txt font_12'>{saleInfo && (parseInt(saleInfo.softCap)/10**this.state.buyTokenDecimal).toFixed(2)} {this.state.buyToken}
            </span>
            </p> 

            <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
            <span className='desc_grey_txt'>Hardcap :</span>
            <span className='desc_grey_txt font_12'>{saleInfo && (parseInt(saleInfo.hardCap)/10**this.state.buyTokenDecimal).toFixed(2)} {this.state.buyToken}
            </span>
            </p>         

            <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
            <span className='desc_grey_txt'>Start Time :</span>
            <span className='desc_grey_txt font_12'>{saleInfo && new Date(saleInfo.startTime*1000).toLocaleDateString("en-US", options)}
            </span>
            </p>   

            <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
            <span className='desc_grey_txt'>End Time :</span>
            <span className='desc_grey_txt font_12'>{saleInfo && new Date(saleInfo.endTime*1000).toLocaleDateString("en-US", options)}
            </span>
            </p>          



            {/* <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
            <span className='desc_grey_txt'>First Release for Project :</span>
            <span className='desc_grey_txt font_12'>30%
            </span>
            </p>  
        */}
            <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
            <span className='desc_grey_txt'>Vesting Claim</span>
            <span className='desc_grey_txt font_12'> {saleInfo && saleInfo.isVested ? 'Enabled' : 'Disabled'}
            </span>
            </p>
            <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
            <span className='desc_grey_txt'>Pancake Listing</span>
            <span className='desc_grey_txt font_12'> {saleInfo && saleInfo.isPancake ? 'Enabled' : 'Disabled'}
            </span>
            </p>  
            {saleInfo && saleInfo.isVested ?
             <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
            <span className='desc_grey_txt'>Vesting for Project :</span>
            <span className='desc_grey_txt font_12'>{saleInfo && saleInfo.vestingPercent/100} % each {saleInfo && saleInfo.vestingInterval/ONEDAYINSECONDS} Day(s)
            </span>
            </p> :<></>} 

     

       
                        </div>
                      
             </div>
             </div>
            </div>

            <div className='col-12 col-md-6 col-lg-6 mb-4'>
            <div className='card_bg card h-100'>
            <div className='card-body'>
            <div className='card_footer_form'>
                                <div className='d-flex align-items-center justify-content-center'>
                                <p className='mb-0 pl-3'>Make sure the website is cryptotrading!</p>
                                </div>

                            </div>  
                            {  saleInfo && isUpcoming(saleInfo.startTime) ?
                            <>
                            <p className='text-center sale_deta_name mt-3'>Sale Starts In</p>
                            <div className='countdown_new text-center'>
                            {console.log("Salediffernce(saleInfo.endTime)",UpcomingDiffernce(saleInfo.startTime))}
                            <Countdown date={Date.now() +  (UpcomingDiffernce(saleInfo.startTime))}  renderer={renderer} className="countdown_grey" />
                            </div>
                            </> : 

(saleInfo && isSaleLive(saleInfo.startTime,saleInfo.endTime,saleInfo.isPresaleOpen)  ?  
<>
<p className='text-center sale_deta_name mt-3'>Sale Ends In</p>
<div className='countdown_new text-center'>
{console.log("Salediffernce(saleInfo.endTime)",Salediffernce(saleInfo.endTime))}
<Countdown date={Date.now() +  Salediffernce(saleInfo?.endTime)}  renderer={renderer} className="countdown_grey" />
</div>
</>:
<>
<p className='text-center sale_deta_name mt-3'>Sale Ends In</p>
<div className='countdown_new text-center'>
<p className='text-center sale_deta_name mt-3'>Not Live</p>
</div>
</>)}
                      

                            <ProgressBar now={saleInfo && parseInt(parseInt(saleInfo?.earnedCap)/parseInt(saleInfo?.hardCap) * 100)} className='yellow_bar mt-3'/>
            <p className='white_txt_sm d-flex justify-content-between mt-1'>
               <span className='desc_grey_txt'>{saleInfo && parseInt(parseInt(saleInfo?.earnedCap)/parseInt(saleInfo?.hardCap) * 100)} % </span>
               <span className='desc_grey_txt'>{saleInfo && ((saleInfo?.earnedCap)/10**this.state.buyTokenDecimal).toFixed(3)}/{(parseInt(saleInfo.hardCap)/10**this.state.buyTokenDecimal).toFixed(2)} {this.state.buyToken}</span>
                </p>
                <p className='input_desc_sm'>Amount (Min: {saleInfo && saleInfo?.minEthLimit / 10 ** this.state.buyTokenDecimal} & Max: {saleInfo && saleInfo?.maxEthLimit / 10 ** this.state.buyTokenDecimal}  {this.state.buyToken})</p>
                {/* <p className='input_desc_sm'>You Will Get : {this.state.claim} {this.state.saleInfo?.name}</p> */}
               

                <div className="inputs input-groups date_inoput_grps">
                        <InputGroup className="datepicker_input">
                        <FormControl id="amountmax" placeholder="0.0"
                        value={this.state.amount}
                        onChange={(e)=> { this.setState({ amount: e.target.value });this.calculateToken(e.target.value);}}
                        
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                        <InputGroup.Append className='cur_pointer'>
                                <button onClick={async()=> {await this.max();await this.calculateToken(this.state.amount)}} variant="outline-secondary" className="trans_cal_btn">
                                Max
                                </button>
                            </InputGroup.Append>
                    </div>
                    { saleInfo && isSaleLive(saleInfo.startTime,saleInfo.endTime,saleInfo.isPresaleOpen) ? 
                    <button onClick={this.buy.bind(this)}disabled={ saleInfo && saleInfo.isWhitelisted ? userData && !(userData.userWhitelistedAmount > 0) : false } className="get-started-btn">{saleInfo && saleInfo.isWhitelisted ? (userData && !(userData.userWhitelistedAmount > 0) ? "Not Whitelisted" : "Buy"):"Buy"} with {this.state.buyToken} </button>:
                    (isUpcoming(saleInfo.startTime,saleInfo.endTime) ? <button disabled={true} className="get-started-btn mr-2" > Upcoming </button> :
                    (!isSaleLive(saleInfo.startTime,saleInfo.endTime) ?<button disabled={true} className="get-started-btn mr-2" > Sale InActive </button>:<button onClick={this.buy.bind(this)} className="get-started-btn" > Buy </button>))
                    }


                    {saleInfo && saleInfo.isVested ?
                    <button  className="get-started-btn mt-3">Vested  {this.state.saleInfo?.symbol} </button>:
                    (saleInfo && saleInfo.isClaimable ? 
             
                    <button  onClick={() => this.Claim()} className="get-started-btn mt-3"> Claim  {this.state.saleInfo?.symbol}  </button> :
                    <button disabled className="get-started-btn mt-3"> Claim  {this.state.saleInfo?.symbol}  </button>)}
                </div>
                </div>
                </div>
        </div>

                <div className='row'>
                <div className='col-12 col-md-6 col-lg-6 mb-4'>
                <div className='card_bg card h-100'>
            <div className='card-body'>
            <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
            <span className='desc_grey_txt'>Token Address :</span>
            <span><a href={`https://testnet.bscscan.com/address/${saleInfo && saleInfo.tokenAddress}`} target='_blank'className='desc_grey_txt font_12'>{saleInfo && saleInfo?.tokenAddress}</a></span>
            </p> 
            <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
            <span className='desc_grey_txt'>Access Type:</span>
            {saleInfo && saleInfo.isWhitelisted ?
            <span className='desc_grey_txt font_12'>Private</span> :
           
           
             <span className='desc_grey_txt font_12'>Public</span>}
             </p>

        
            <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
            <span className='desc_grey_txt'>Status :</span>
  {saleInfo && isSaleLive(saleInfo.startTime,saleInfo.endTime,saleInfo.isPresaleOpen)  ?
            <span className='desc_grey_txt font_12'>Live</span> : 
            ( isUpcoming(saleInfo.startTime) ? 
            <span className='desc_grey_txt font_12'>Upcoming</span> :
            <span className='desc_grey_txt font_12'>Closed</span> )}
            </p> 
  

            <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
            <span className='desc_grey_txt'>Minimum Buy :</span>
            <span className='desc_grey_txt font_12'>{saleInfo && (parseInt(saleInfo.minEthLimit)/10**this.state.buyTokenDecimal).toFixed(3)}  {this.state.buyToken}</span>
            </p> 

            <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
            <span className='desc_grey_txt'>Maximum Buy :</span>
            <span className='desc_grey_txt font_12'>{saleInfo && (parseInt(saleInfo.maxEthLimit)/10**this.state.buyTokenDecimal).toFixed(3)}  {this.state.buyToken}</span>
            </p> 

            <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
            <span className='desc_grey_txt'>You Purchased :</span>
            {console.log("userData.userClaimbale",userData?.userClaimbale)}
            <span className='desc_grey_txt font_12'> {userData && (parseInt(userData?.userClaimbale)/10**parseInt(saleInfo.decimals)).toFixed(3)} {saleInfo && saleInfo.symbol}</span>
            </p> 

              <p className='text-white mt-4'>Token Metrics</p>
                <hr className='hr_green' />
                <Chart options={this.state.options} series={this.state.series} className="chart_donut_res" type="donut" />
                </div>
                </div>
</div>
<div className='col-12 col-md-6 col-lg-6 mb-4'>
                <div className='card_bg card h-100'>
            <div className='card-body'>
                <p className='text-white'>Owner Zone</p>
                <hr className='hr_green' />
                <div className='col-12 col-md-12 mb-3 px-0'>
                        <p className='input_desc_sm'>Sale Type</p>
                      
                        <div className="custom-control custom-radio mb-2">
                    <input type="checkbox"  checked={saleInfo && saleInfo?.isWhitelisted ? false : true} id="customRadio1" name="customRadio" className="custom-control-input" />
                    <label className="custom-control-label" for="customRadio1">Public</label>
                    </div>   

                    <div className="custom-control custom-radio mb-2">
                    <input type="checkbox"  checked={saleInfo && saleInfo?.isWhitelisted ? true : false}id="customRadio2" name="customRadio" className="custom-control-input" />
                    <label className="custom-control-label" for="customRadio2">Whitelist</label>
                    </div>  

                    {/* <div className="custom-control custom-radio">
                    <input type="radio" id="customRadio3" name="customRadio" className="custom-control-input" />
                    <label className="custom-control-label" for="customRadio3">Public Anti-Bot</label>
                    </div>                 */}
                        </div>

                       
                         <div className='whitelist_div'>
                        <button className="get-started-btn w-100 mb-2" onClick={() => this.setState({ whitelistModal: true })}>
                          Add users to whitelist
                        </button>
                        <button className="get-started-btn w-100 mb-2" onClick={() => this.setState({ removewhitelistModal: true })}>
                          Remove users from whitelist
                        </button>
                        {/* <button className="get-started-btn w-100 mb-2" onClick={() => this.setState({ changestatueModal: true })}>
                          Setting time to public
                        </button> */}
                       
                        {saleInfo && saleInfo?.isWhitelisted ? 
                        <button onClick={() => this.Handlewhitelist(false)} className="get-started-btn w-100 mb-2">
                          Disable whitelist
                        </button> :
                        <button onClick={() => this.Handlewhitelist(true)} className="get-started-btn w-100 mb-2">
                        Enable whitelist
                      </button>}
                         </div>
                       

                        <div className='col-12 col-md-12 mb-3 px-0'>
                        <p className='input_desc_sm'>Pool Actions</p>
                        <button onClick={() =>this.Finalisesale()}className="get-started-btn w-100 mb-2" >
                           Finalize
                        </button>
                        <button onClick={()=> this.withdrawToken()} className="get-started-btn w-100 mb-2" >
                         Get Unsold {this.state.saleInfo?.symbol}
                        </button>
                        <button onClick={()=> this.stopSaleEvent()}className="get-started-btn w-100 mb-2">
                          Stop Sale
                        </button>
                        <button onClick={() => this.BNBwithdraw()} className="get-started-btn w-100 mb-2">
                          Withdraw  {this.state.buyToken}
                        </button>
                       
                       
                        </div>
                </div>
                </div>
                </div>
            </div>
        

                
               

        </Container>

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
   {whitelistModal && <WhitelistModal onDismiss={() => this.setState({ whitelistModal: false })} /> }
           {removewhitelistModal && <RemoveWhitelistmodal onDismiss={() => this.setState({ removewhitelistModal: false })} /> }
           {changestatueModal && <ChangeStatusmodal onDismiss={() => this.setState({ changestatueModal: false })} /> }
        </div>
        </div>
        )
    }
}

export default LaunchpadDetail