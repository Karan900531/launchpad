import React, { Component } from "react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Header from "../Header";
import Sidebar from "../Sidebar";
import PlaceholdingLoader from "../PlaceholdingLoader";
import Trendingslider from '../trendingslider';


import "../../css/styles.css";

import home_image from "../../images/home_image.svg";
import home_logo from "../../images/home_logo.svg";

import branding_icon from "../../images/branding_icon.svg";
import community_icon from "../../images/community_icon.svg";
import customization_icon from "../../images/customization_icon.svg";
import deflationary_icon from "../../images/deflationary_icon.svg";
import launchpad_icon from "../../images/launchpad_icon.svg";
import locking_icon from "../../images/locking_icon.svg";
import management_icon from "../../images/management_icon.svg";
import standard_icon from "../../images/standard_icon.svg";

import coin_img from "../../images/bsc.png";




















import {
  Container,
  Row,
  Col,
  Card,
  ProgressBar,
  InputGroup,
  Form,
  Tab,
  Nav
} from "react-bootstrap";
import { gethomecalculationhook, gettrendingdisplayhook } from "../../hooks/usebackend";
import { gethomelaunchpaddetail, getTotalSalesInfo, isSaleLive, isUpcoming } from "../../hooks/useProjects";
import { Userdollar } from "../../hooks/useAccount";
import { getSaleInfoCard, Totalvaluelocked, UseTokenInfo } from "../../hooks/useContract";


class Landing extends Component {
 
  




  constructor(props) {
    super(props);
    this.state = {
      proxy: [],
      totalSales: [],
      onGoingSales: [],
      upComingSales: [],
      isSearch: false,
      searchSale: [],
      search: "",
      interval: 3,
      loadInterval: 3,
      searchInterval: 3,
      searchProxy: [],
      isLoading: false,
      currentChain: 0,
      setUpdateCms: false,
      trending : [],
      projects : 0,
      bnbindollar : 0,
      users : 0,
      loadingText:true,
      totallockedvalue : 0
    };
  }

  componentDidMount(){
    this.gettrending();
  }

  async gettrending(){
    let data = await gettrendingdisplayhook();
    console.log("dataa trending" , data?.data?.data);
    if(data?.data?.data?.length > 0){
      let trenddata = await gethomelaunchpaddetail(data?.data?.data)
      console.log("trenddata" , trenddata);
      this.setState({trending : trenddata}) 
      const Proxydata = await getTotalSalesInfo();
     
      if(Proxydata?.length > 0){
        let totallock = 0;
        this.setState({projects : Proxydata?.length});
        Proxydata?.map(async(data)=>{console.log("mapdata" , data);
          let saledata = await getSaleInfoCard(data?._sale);
          
          let value = saledata.presaleRate * saledata.hardCap/10**18;
          
          console.log("calculated value" , value , totallock);
          totallock = totallock + value;
          this.setState({totallockedvalue : Math.round(totallock*100)/100})
        })
        
      }
      
      

      let calculation = await gethomecalculationhook();
      console.log("calculation" , calculation);
      let dollar = await Userdollar(calculation?.data?.totalbnb);
      console.log("dollar in bnb" , Math.round(dollar*100)/100);
      this.setState({bnbindollar : Math.round(dollar*100)/100})
      this.setState({users : calculation?.data?.user});
      // let lockedvalue = await Totalvaluelocked();
      this.setState({loadingText : false})
    }
  }







  render() {
 

    return (
      <div id="loader_main">
      
        <div className="logo_overlay" id="logo_overlay" style={{opacity:1}}>
          <Header />

          <div className="whole_sec pb-5">
            <div className="flex_side_right">
              <Sidebar />
              {/* ongoing_sec */}
              <div className="right_side_sec">
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
                <Trendingslider/>
<div className="right_side_spacing pb-5">
                <Container className="text-white container mt-5 pb-4">
                  <center>
                    <h3 className="h3_res">The Launchpad Protocol for Every one !</h3>

                    <span className="title_span">
                      Crypto Lanuchpad helps everyone to create their own tokens
                      and token sales in new seconds.
                    </span>
                    <br />
                    <span className="title_span">
                      Tokens created on ignite Launchpad will be verified and
                      published on explore website.
                    </span>
                  </center>
                  <div className="mt-4 d-flex justify-content-center btn_sec_mob_res">
                    <button className="get-started-btn mr-3" onClick={()=>this.props.history.push('/create')}>Create Now</button>
                    <button className="get-started-btn">Learn more</button>
                  </div>
                </Container>

                <Container className="mt-0 container pt-4 pb-4 conta_toppols">
                <div class="text-white container mt-0 pb-4 container">
                  <center>
                    <h3 class="h3_res">Top Pools</h3>
                    <span className="title_span">
                      Crypto Lanuchpad helps everyone to create their own tokens
                      and token sales in new seconds.
                    </span>
                    <br />
                    <span className="title_span">
                      Tokens created on Ignite Launchpad will be verified and
                      published on explore website.
                    </span>
                    </center>
                    </div>
                  <div className={this.state.trending ? "row justify-content-center" : "d-none"}>
                  <div className={this.state.trending[0]?'col-12 col-xl-4 col-lg-6 col-md-6 col-lg-6-custom mb-4 projects' : "d-none"}
                    onClick = {()=>{ console.log("whitelist" , this.state.trending[1]?.isWhitelisted , this.state.trending);
                      if(this.state.trending[0]?.isWhitelisted)
                        window.location.href = window.origin + `/privatesaledetail/${this?.state?.trending[0]?.saleAddress}`
                      else
                        window.location.href = window.origin + `/launchpaddetail/${this?.state?.trending[0]?.saleAddress}`
                      }
                    }
                  >
                  
                  <div className='card card_style_1 ribbox'>
                     
                      <div className='card-body'>
                      <span class="badge badge-kyc-rect mt-0 mb-2 badge_trend"><span class="blk_txt">#OnTop1</span></span>
                          <div className='pt-5 px-3 pb-3'>
                          <div className='grid_img_div'>
                              <div className='profimg'>
                                 
                                 <img src={this?.state?.trending[0]?.logo} alt="prof" />
                             </div>
                             <div>
                              <div className="btn-group btn_grp_yel mb-2 d-block d-xl-flex d-md-block d-sm-flex flex_cont_end_flex" role="group" aria-label="Basic example">
                                 
                                  <div className='d-sm-flex d-block mt-3 mt-xl-0 mt-md-3 mt-sm-0 text-right-xss'>
                                  <p className=' mb-0'>
                               
                                          
                                          <span className="badge badge_live">                      
                                         
                                          <span className='stats_txt'>{
                                              this?.state?.trending && isSaleLive(this?.state?.trending[0]?.startTime,this?.state?.trending[1]?.endTime,this?.state?.trending[0]?.isPresaleOpen) ?
                                             " Sales Live"
                                            : this?.state?.trending[0] && isUpcoming(this?.state?.trending[0].startTime)? "Upcoming" : "Sale Ended"
                                            }</span>
                                          </span>
                                 
                                
                                  </p>
                          </div>
                              </div>
                              
                             
                              <p className='text-right'>
                              <span className="badge badge-green-rect mt-0 mr-2">
                                  <span className='blk_txt'>Audit</span>
                                  </span>
                                  <span className="badge badge-kyc-rect mt-0">
                                  <span className='blk_txt'>KYC</span>
                                  </span>
                              <span className="badge badge-yellow-fill mt-0">
                                 
                                  </span> 
                               </p>
                          </div>
           
                     
                          </div>
                
                         
                       
                          <p className='text-white cardhead font_16 mb-1 mt-3'>{this?.state?.trending[0]?.name}</p>
                          <p className="desc_grey_txt pb-0 mb-0">1 BNB = {this?.state?.trending[0]?.presaleRate+" " + this?.state?.trending[0]?.symbol}</p>
                         
          
                              
                   
                    
                     
             
             
                  
                      
                          </div>
                      </div>
                  </div>
                  
          
              </div>

              <div className={this.state.trending[1]?'col-12 col-xl-4 col-lg-6 col-md-6 col-lg-6-custom mb-4 projects' : "d-none"}
                 onClick = {()=>{ console.log("whitelist" , this.state.trending[1]?.isWhitelisted);
                  if(this.state.trending[1]?.isWhitelisted)
                    window.location.href = window.origin + `/privatesaledetail/${this?.state?.trending[1]?.saleAddress}`
                  else
                    window.location.href = window.origin + `/launchpaddetail/${this?.state?.trending[1]?.saleAddress}`}
                }
              >
                  
                  <div className='card card_style_1 ribbox'>
                     
                      <div className='card-body'>
                      <span class="badge badge-kyc-rect mt-0 mb-2 badge_trend"><span class="blk_txt">#OnTop2</span></span>
                          <div className='pt-5 px-3 pb-3'>
                          <div className='grid_img_div'>
                              <div className='profimg'>
                                 
                                 <img src={this?.state?.trending[1]?.logo} alt="prof" />
                             </div>
                             <div>
                              <div className="btn-group btn_grp_yel mb-2 d-block d-xl-flex d-md-block d-sm-flex flex_cont_end_flex" role="group" aria-label="Basic example">
                                 
                                  <div className='d-sm-flex d-block mt-3 mt-xl-0 mt-md-3 mt-sm-0 text-right-xss'>
                                  <p className=' mb-0'>
                               
                                          
                                          <span className="badge badge_live">                      
                                         
                                              <span className='stats_txt'>{
                                              this?.state?.trending && isSaleLive(this?.state?.trending[1]?.startTime,this?.state?.trending[1]?.endTime,this?.state?.trending[1]?.isPresaleOpen) ?
                                             " Sales Live"
                                            : this?.state?.trending[1] && isUpcoming(this?.state?.trending[1].startTime)? "Upcoming" : "Sale Ended"
                                            }</span>
                                          </span>
                                 
                                
                                  </p>
                          </div>
                              </div>
                              
                             
                              <p className='text-right'>
                              <span className="badge badge-green-rect mt-0 mr-2">
                                  <span className='blk_txt'>Audit</span>
                                  </span>
                                  <span className="badge badge-kyc-rect mt-0">
                                  <span className='blk_txt'>KYC</span>
                                  </span>
                              <span className="badge badge-yellow-fill mt-0">
                                 
                                  </span> 
                               </p>
                          </div>
           
                     
                          </div>
                
                         
                       
                          <p className='text-white cardhead font_16 mb-1 mt-3'>{this?.state?.trending[1]?.name}</p>
                          <p className="desc_grey_txt pb-0 mb-0">1 BNB = {this?.state?.trending[1]?.presaleRate + " " +this?.state?.trending[1]?.symbol}</p>
                         
          
                              
                   
                    
                     
             
             
                  
                      
                          </div>
                      </div>
                  </div>
                  
          
              </div>

              <div className={this.state.trending[2]?'col-12 col-xl-4 col-lg-6 col-md-6 col-lg-6-custom mb-4 projects' : "d-none"}
                 onClick = {()=>{ console.log("whitelist" , this.state.trending[2]?.isWhitelisted);
                  if(this.state.trending[2]?.isWhitelisted)
                    window.location.href = window.origin + `/privatesaledetail/${this?.state?.trending[2]?.saleAddress}`
                  else
                    window.location.href = window.origin + `/launchpaddetail/${this?.state?.trending[2]?.saleAddress}`}
                }
              >
                  
                  <div className='card card_style_1 ribbox'>
                     
                      <div className='card-body'>
                      <span class="badge badge-kyc-rect mt-0 mb-2 badge_trend"><span class="blk_txt">#OnTop3</span></span>
                          <div className='pt-5 px-3 pb-3'>
                          <div className='grid_img_div'>
                              <div className='profimg'>
                                 
                                 <img src={this?.state?.trending[2]?.logo} alt="prof" />
                             </div>
                             <div>
                              <div className="btn-group btn_grp_yel mb-2 d-block d-xl-flex d-md-block d-sm-flex flex_cont_end_flex" role="group" aria-label="Basic example">
                                 
                                  <div className='d-sm-flex d-block mt-3 mt-xl-0 mt-md-3 mt-sm-0 text-right-xss'>
                                  <p className=' mb-0'>
                               
                                          
                                          <span className="badge badge_live">                      
                                         
                                          <span className='stats_txt'>{
                                              this?.state?.trending && isSaleLive(this?.state?.trending[3]?.startTime,this?.state?.trending[3]?.endTime,this?.state?.trending[3]?.isPresaleOpen) ?
                                             " Sales Live"
                                            : this?.state?.trending[3] && isUpcoming(this?.state?.trending[3].startTime)? "Upcoming" : "Sale Ended"
                                            }</span>
                                          </span>
                                 
                                
                                  </p>
                          </div>
                              </div>
                              
                             
                              <p className='text-right'>
                              <span className="badge badge-green-rect mt-0 mr-2">
                                  <span className='blk_txt'>Audit</span>
                                  </span>
                                  <span className="badge badge-kyc-rect mt-0">
                                  <span className='blk_txt'>KYC</span>
                                  </span>
                              <span className="badge badge-yellow-fill mt-0">
                                 
                                  </span> 
                               </p>
                          </div>
           
                     
                          </div>
                
                         
                       
                          <p className='text-white cardhead font_16 mb-1 mt-3'>{this?.state?.trending[2]?.name}</p>
                          <p className="desc_grey_txt pb-0 mb-0">1 BNB = {this?.state?.trending[2]?.presaleRate + this?.state?.trending[2]?.symbol}</p>
                         
          
                              
                   
                    
                     
             
             
                  
                      
                          </div>
                      </div>
                  </div>
                  
          
              </div>
                    </div>
                </Container>


                

                <Container className="mt-5 container pt-4">
                  <Row className="row_frist_home">
                    <Col
                      className="mb-5"
                      xxl={3}
                      xl={3}
                      lg={6}
                      md={6}
                      sm={6}
                      xs={12}
                    >
                      <div className="liquid_raised w-100 text-center">
                        <div className="icon_align">
                          <img src={home_image} />
                        </div>
                        {this.state.loadingText?
                         <h4 className="text-white mt-3">
                          <PlaceholdingLoader classnames="stripe small-stripe mb-2" parentclassname="loading" />
                        
                          </h4> :
                        <h4 className="text-white mt-3">
                        
                          $ {this?.state?.bnbindollar}
                          </h4>
                        }
                        
                        
                        <span className="font15">Total Liquid Raised</span>
                      </div>
                    </Col>
                    <Col
                      className="mb-5"
                      xxl={3}
                      xl={3}
                      lg={6}
                      md={6}
                      sm={6}
                      xs={12}
                    >
                      <div className="liquid_raised text-center">
                        <div className="icon_align">
                          <img src={home_image} />
                        </div>
                        {this.state.loadingText?
                         <h4 className="text-white mt-3">
                          <PlaceholdingLoader classnames="stripe small-stripe mb-2" parentclassname="loading" />
                        
                          </h4> :
                        <h4 className="text-white mt-3">{this.state.projects}</h4>
  }
                        <span className="font15">Total Projects</span>
                      </div>
                    </Col>
                    <Col
                      className="mb-5"
                      xxl={3}
                      xl={3}
                      lg={6}
                      md={6}
                      sm={6}
                      xs={12}
                    >
                      <div className="liquid_raised text-center">
                        <div className="icon_align">
                          <img src={home_image} />
                        </div>
                        {this.state.loadingText?
                         <h4 className="text-white mt-3">
                          <PlaceholdingLoader classnames="stripe small-stripe mb-2" parentclassname="loading" />
                        
                          </h4> :
                        <h4 className="text-white mt-3">{this.state.users}</h4>
  }
                        <span className="font15">Total Participants</span>
                      </div>
                    </Col>
                    <Col
                      className="mb-5"
                      xxl={3}
                      xl={3}
                      lg={6}
                      md={6}
                      sm={6}
                      xs={12}
                    >
                      <div className="liquid_raised text-center">
                        <div className="icon_align">
                          <img src={home_image} />
                        </div>
                        {this.state.loadingText?
                         <h4 className="text-white mt-3">
                          <PlaceholdingLoader classnames="stripe small-stripe mb-2" parentclassname="loading" />
                        
                          </h4> :
                        <h4 className="text-white mt-3">$ {this?.state?.totallockedvalue}</h4>
  }
                        <span className="font15">Total Values Locked</span>
                      </div>
                    </Col>
                  </Row>
                </Container>



            
                <Container className="mt-3 text-white container">
                  <center>
                    <h3 className="h3_res">A Suite of Tools for Token Sales.</h3>
                  </center>
                  <Row className="d-flex justify-content-center">
                    <Col
                      className="text-center"
                      xxl={8}
                      xl={8}
                      lg={8}
                      md={12}
                      sm={6}
                      xs={12}
                    >
                      <small className="title_span">
                        A suite of tools were built to help you create your own
                        tokens and launchpads in a fast, simple and cheap way
                        with no prior code knowldege required and 100%
                        decentralized!
                      </small>
                    </Col>
                  </Row>

                  <Row className="mt-4">
                    <Col
                      className="mb-4"
                      xxl={3}
                      xl={3}
                      lg={4}
                      md={6}
                      sm={6}
                      xs={12}
                    >
                      <Card className="card_bg h-100 py-3">
                        <div className="card_img_pare_div">
                        <Card.Img
                          variant="top"
                          className="mx-auto"                          
                          src={standard_icon}
                        />
                        </div>
                       
                        <Card.Body className="text-center pb-5">
                          <Card.Title>Standard</Card.Title>
                          <Card.Text className="sub_text">
                            Mint standard tokens on BSC.
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col
                      className="mb-4"
                      xxl={3}
                      xl={3}
                      lg={4}
                      md={6}
                      sm={6}
                      xs={12}
                    >
                      <Card className="card_bg h-100 py-3">
                      <div className="card_img_pare_div">
                        <Card.Img
                          variant="top"
                          className="mx-auto"                          
                          src={deflationary_icon}
                        />
                        </div>
                        <Card.Body className="text-center pb-5">
                          <Card.Title>Deflationary</Card.Title>
                          <Card.Text className="sub_text">
                            Generate deflationary tokens with tax and/or charity
                            functions.
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col
                      className="mb-4"
                      xxl={3}
                      xl={3}
                      lg={4}
                      md={6}
                      sm={6}
                      xs={12}
                    >
                      <Card className="card_bg h-100 py-3">
                      <div className="card_img_pare_div">
                        <Card.Img
                          variant="top"
                          className="mx-auto"                          
                          src={customization_icon}
                        />
                        </div>
                        <Card.Body className="text-center pb-5">
                          <Card.Title>Customization</Card.Title>
                          <Card.Text className="sub_text">
                            Create a token sale for your own custom token
                            easily.
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col
                      className="mb-4"
                      xxl={3}
                      xl={3}
                      lg={4}
                      md={6}
                      sm={6}
                      xs={12}
                    >
                      <Card className="card_bg h-100 py-3">
                      <div className="card_img_pare_div">
                        <Card.Img
                          variant="top"
                          className="mx-auto"                          
                          src={launchpad_icon}
                        />
                        </div>
                        <Card.Body className="text-center pb-5">
                          <Card.Title>Launchpad</Card.Title>
                          <Card.Text className="sub_text">
                            Use the token you mint to create a launchpad with
                            just a few clicks
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>

                    <Col
                      className="mb-4"
                      xxl={3}
                      xl={3}
                      lg={4}
                      md={6}
                      sm={6}
                      xs={12}
                    >
                      <Card className="card_bg h-100 py-3">
                      <div className="card_img_pare_div">
                        <Card.Img
                          variant="top"
                          className="mx-auto"                          
                          src={branding_icon}
                        />
                        </div>
                        <Card.Body className="text-center pb-5">
                          <Card.Title>Branding</Card.Title>
                          <Card.Text className="sub_text">
                            Adding logo, social links, description, listing on
                            FuzzySale
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col
                      className="mb-4"
                      xxl={3}
                      xl={3}
                      lg={4}
                      md={6}
                      sm={6}
                      xs={12}
                    >
                      <Card className="card_bg h-100 py-3">
                      <div className="card_img_pare_div">
                        <Card.Img
                          variant="top"
                          className="mx-auto"                          
                          src={management_icon}
                        />
                        </div>
                        <Card.Body className="text-center pb-5">
                          <Card.Title>Management</Card.Title>
                          <Card.Text className="sub_text">
                            The portal to help you easily update content for
                            your launchpad.
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col
                      className="mb-4"
                      xxl={3}
                      xl={3}
                      lg={4}
                      md={6}
                      sm={6}
                      xs={12}
                    >
                      <Card className="card_bg h-100 py-3">
                      <div className="card_img_pare_div">
                        <Card.Img
                          variant="top"
                          className="mx-auto"                          
                          src={community_icon}
                        />
                        </div>
                        <Card.Body className="text-center pb-5">
                          <Card.Title>Community</Card.Title>
                          <Card.Text className="sub_text">
                            Promote your launchpad to thousands of buyers on
                            FuzzySale.
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col
                      className="mb-4"
                      xxl={3}
                      xl={3}
                      lg={4}
                      md={6}
                      sm={6}
                      xs={12}
                    >
                      <Card className="card_bg h-100 py-3">
                      <div className="card_img_pare_div">
                        <Card.Img
                          variant="top"
                          className="mx-auto"                          
                          src={locking_icon}
                        />
                        </div>
                        <Card.Body className="text-center pb-5">
                          <Card.Title>Locking</Card.Title>
                          <Card.Text className="sub_text">
                            Lock your liquidity to CryptoSwap, PancakeSwap after
                            presale.
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Container>

                <Container className="mt-3 text-white container">
                  <center>
                    <h3  className="h3_res">A Growing Protocol Ecosystem.</h3>
                  </center>
                  <Row className="d-flex justify-content-center">
                    <Col
                      className="text-center"
                      xxl={8}
                      xl={8}
                      lg={8}
                      md={12}
                      sm={6}
                      xs={12}
                    >
                      <small className="title_span">
                        We build a suite of tools for the world of decentralized
                        finance. CryptoMoon, CryptoSale, CryptoElon of CrytpoLock,
                        CryptoSwap, we Crypto everything!
                      </small>
                    </Col>
                  </Row>

                  <Row className="mt-4 d-flex justify-content-center">
                    <Col
                      className="mb-4"
                      xxl={3}
                      xl={3}
                      lg={4}
                      md={6}
                      sm={6}
                      xs={12}
                    >
                      <Card className="card_bg h-100 py-3">
                      <div className="card_img_pare_div">
                        <Card.Img
                          variant="top"
                          className="mx-auto"                          
                          src={home_logo}
                        />
                        </div>
                        <Card.Body className="text-center pb-5">
                          <Card.Title>Crypto Moon</Card.Title>
                          <Card.Text className="sub_text">
                            The best launchpad for professional teams
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col
                      className="mb-4"
                      xxl={3}
                      xl={3}
                      lg={4}
                      md={6}
                      sm={6}
                      xs={12}
                    >
                      <Card className="card_bg h-100 py-3">
                      <div className="card_img_pare_div">
                        <Card.Img
                          variant="top"
                          className="mx-auto"                          
                          src={home_logo}
                        />
                        </div>
                        <Card.Body className="text-center pb-5">
                          <Card.Title>Crypto Sale</Card.Title>
                          <Card.Text className="sub_text">
                            Launch a token sale with a few clicks.
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col
                      className="mb-4"
                      xxl={3}
                      xl={3}
                      lg={4}
                      md={6}
                      sm={6}
                      xs={12}
                    >
                      <Card className="card_bg h-100 py-3">
                      <div className="card_img_pare_div">
                        <Card.Img
                          variant="top"
                          className="mx-auto"                          
                          src={home_logo}
                        />
                        </div>
                        <Card.Body className="text-center pb-5">
                          <Card.Title>Crypto Swap</Card.Title>
                          <Card.Text className="sub_text">
                            Swap tokens and farming #Crypto.
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col
                      className="mb-4"
                      xxl={3}
                      xl={3}
                      lg={4}
                      md={6}
                      sm={6}
                      xs={12}
                    >
                      <Card className="card_bg h-100 py-3">
                      <div className="card_img_pare_div">
                        <Card.Img
                          variant="top"
                          className="mx-auto"                          
                          src={home_logo}
                        />
                        </div>
                        <Card.Body className="text-center pb-5">
                          <Card.Title>Crypto Lock</Card.Title>
                          <Card.Text className="sub_text">
                            Locking liquidity on CryptoSwap.
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>

                    <Col
                      className="mb-4"
                      xxl={3}
                      xl={3}
                      lg={4}
                      md={6}
                      sm={6}
                      xs={12}
                    >
                      <Card className="card_bg h-100 py-3">
                      <div className="card_img_pare_div">
                        <Card.Img
                          variant="top"
                          className="mx-auto"                          
                          src={home_logo}
                        />
                        </div>
                        <Card.Body className="text-center pb-5">
                          <Card.Title>Crypto Elon</Card.Title>
                          <Card.Text className="sub_text">
                            The first meme token on CryptoMoon.
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col
                      className="mb-4"
                      xxl={3}
                      xl={3}
                      lg={4}
                      md={6}
                      sm={6}
                      xs={12}
                    >
                      <Card className="card_bg h-100 py-3">
                      <div className="card_img_pare_div">
                        <Card.Img
                          variant="top"
                          className="mx-auto"                          
                          src={home_logo}
                        />
                        </div>
                        <Card.Body className="text-center pb-5">
                          <Card.Title>Crypto Wallet</Card.Title>
                          <Card.Text className="sub_text">
                            Crypto wallet, buy, store, exchange & earn.
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
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

             


             

                {/* end ongoing_sec */}


                

            </div>
              </div>
            </div>
          </div>
          {/* <Footer /> */}
        </div>
      </div>
    );
  }
}

export default Landing;
