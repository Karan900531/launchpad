import React, { Component } from "react";
import { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import Header from "../Header";
import Sidebar from "../Sidebar";
import Trendingslider from '../trendingslider';




import "../../css/styles.css";


import favicon from "../../images/favicon.png";


import {
  getSaleCards,
  getSaleCardsLimit,
  getTotalSalesInfo,
  searchCards,
  searchSale,
} from "../../hooks/useProjects";
import {
  Container,
  Dropdown,
  Row,
  Col,
  Card,
  ProgressBar,
  InputGroup,
  Form,
  Tab,
  Nav,
  FormControl
} from "react-bootstrap";
import { validliquiditytoken, validstandardtoken } from "../../hooks/kycvalidation";
import { CreateLiquidityToken, CreateStandardToken, GetAdminfee, Getbalance, toFixedNumber } from "../../hooks/useContract";


class CreateToken extends Component {
 
   


  showLoader() {
    document.getElementsByTagName("body")[0].classList.add("overflow_hidden");
    document.getElementById("logo_overlay").style.opacity = 0.5;
    document.getElementById("loader_div").classList.remove("d-none");
    document.getElementById("loader_div").classList.add("d-block");
  }

  hideLoader() {
    document
      .getElementsByTagName("body")[0]
      .classList.remove("overflow_hidden");
    document.getElementById("logo_overlay").style.opacity = 1;
    document.getElementById("loader_div").classList.remove("d-block");
    document.getElementById("loader_div").classList.add("d-none");
  }

  componentDidMount() {
    document.getElementById("launchpad_parent").classList.add("active");
    this.hideLoader();
    this.getfee();
  }
  getfee = async()=>{
    let fee = await GetAdminfee();
    console.log("fee" , fee);
    this.setState({poolfee : fee.tokenfee/10**18})
}

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

      tokentype : "Standard Token",
      name : "",
      symbol : "",
      decimal : "",
      tokensupply : "",
      errors : {},
      yieldfee : "",
      liquidityfee : "",
      exchangethresold : "",
      maximumtransaction : "",
      userbalance : Getbalance(),
      poolfee : ""
    };
  }

  handlecreatetoken = async()=>{
    if(this.state.tokentype == "Standard Token"){
      let payload = {
        name : this.state.name,
        symbol : this.state.symbol,
        decimal : this.state.decimal,
        totalsupply : this.state.tokensupply
      }
      let validate = await validstandardtoken(payload);
      if(validate?.isValid){
        let arg = [];
        arg[0] = this.state.name;
        arg[1] = this.state.symbol;
        arg[2] = this.state.decimal;
        arg[3] = this.state.tokensupply; //(toFixedNumber(this.state.tokensupply*10**this.state.decimal)).toString()
        let tokendata = await CreateStandardToken(arg);
        console.log("tokendata" , tokendata);
        sessionStorage.setItem("HASH" , JSON.stringify(tokendata))
        this.props.history.push("/tokensuccess" , {state: "token"})
      }
      else{
        this.setState({errors : validate?.errors})
      }
    }

    if(this.state.tokentype == "Liquidity Generator Token"){
      let payload = {
        name : this.state.name,
        symbol : this.state.symbol,
        decimal : this.state.decimal,
        totalsupply : this.state.tokensupply,
        yieldfee : this.state.yieldfee,
        liquidityfee  : this.state.liquidityfee,
        maximumtransaction : this.state.maximumtransaction,
        exchangethresold : this.state.exchangethresold
      }
      console.log("payload" , payload);
      let validate = await validliquiditytoken(payload);
      if(validate?.isValid){
        let arg = [];
        arg[0] = this.state.name;
        arg[1] = this.state.symbol;
        arg[2] = this.state.decimal;
        arg[3] = (toFixedNumber(this.state.tokensupply*10**this.state.decimal)).toString();
        arg[4] = this.state.yieldfee;
        arg[5] = this.state.liquidityfee;
        arg[6] = this.state.maximumtransaction;
        arg[7] = this.state.exchangethresold;
        let tokendata = await CreateLiquidityToken(arg);
        console.log("tokendata" , tokendata);
        sessionStorage.setItem("HASH" , JSON.stringify(tokendata))
        this.props.history.push("/tokensuccess" , {state: "token"})
      }
      else{
        this.setState({errors : validate?.errors})
      }
    }
  }



  render() {
    const location = this.props.location.pathname.split("/")[1];

    const {
      totalSales,
      onGoingSales,
      upComingSales,
      search,
      isSearch,
      searchSale,
      accountInfo,
    } = this.state;

    return (
      <div id="loader_main">
        <div id="loader_div">
          <span className="spin_round"></span>
          <img src={favicon} className="logo_load" />
        </div>
        <div className="logo_overlay" id="logo_overlay">
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
                {/* <Trendingslider/> */}
                <div className="right_side_spacing">
                <Container className="mt-5 pb-3 px-1">
                <div className='col-12  col-md-10 col-lg-9 mx-auto px-0'>
<div className="tab_img">
      <div className='card_bg card'>
 <div className='card-body'>
 <div>
                <div className='row'>
                <div className='col-12 col-md-12 mb-3'>
                        
                        
                        
                       </div>
                        <div className='col-12 col-md-12 mb-0'>
                    <p className='input_desc_sm'>Token Type <span className="text-success">*</span> </p>
                    <div className="inputs input-groups">

                    <select className="form-control custm_sel" id="exampleFormControlSelect3" 
                          value={this.state.tokentype}
                          onChange={(e)=>this.setState({ "tokentype": e.target.value }) } placeholder="Standard Token"
                        >
                         <option value="Standard Token">Standard Token</option>
                            <option value="Liquidity Generator Token">Liquidity Generator Token</option>                      

                        </select>
                        {/* <InputGroup className="">

                          
                            <FormControl value={this.state.tokentype} onChange={(e)=>this.setState({ "tokentype": e.target.value }) } id="softcap" placeholder="Standard Token"

                                aria-describedby="basic-addon2" as = "select"
                            >
                              <option value="Standard Token">Standard Token</option>
                              <option value="Liquidity Generator Token">Liquidity Generator Token</option>
                            </FormControl>
                          
                        </InputGroup> */}
                    </div>
                    <div className='note_desc mt-1 mb-0'>
                    <p>Token Creation Fee {this.state.poolfee} BNB</p>
                    </div>
                        </div>

                        <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>Name <span className="text-success">*</span></p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl id="hardcap" value={this.state.name} onChange={(e)=>{this.setState({ name: e.target.value }); }} placeholder="Ex:Ethereum"
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                        <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.name}</span>
                    </div>
                        </div> 

                        <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>Symbol <span className="text-success">*</span></p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl id="mincontribution" value={this.state.Symbol} onChange={(e)=>this.setState({ symbol: e.target.value }) } placeholder="Ex:ETH"
                                aria-describedby="basic-addon2"
                                
                            />
                          
                        </InputGroup>
                        <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.symbol}</span>
                    </div>
                        </div>
                        
                        <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>Decimals <span className="text-success">*</span></p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl id="decimals" placeholder="Ex: 18"
                                aria-describedby="basic-addon2"
                                onChange={(e)=>this.setState({decimal : e?.target?.value})}
                            />
                          
                        </InputGroup>
                        <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.decimal}</span>
                    </div>
                        </div> 

                  <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>Total Suply <span className="text-success">*</span></p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl id="totalsupply" placeholder="Ex: 100000000000"
                                aria-describedby="basic-addon2"
                                onChange={(e)=>this.setState({tokensupply : e?.target?.value})}
                            />
                          
                        </InputGroup>
                        <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.totalsupply}</span>
                    </div>
                  </div>

                {this.state.tokentype == "Liquidity Generator Token" && 
                  <>
                    <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>Transaction fee to generate yield (%) <span className="text-success">*</span></p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl id="totalsupply" placeholder="Ex: 51"
                                aria-describedby="basic-addon2"
                                onChange={(e)=>this.setState({yieldfee : e?.target?.value})}
                            />
                          
                        </InputGroup>
                        <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.yieldfee}</span>
                    </div>
                  </div>

                  <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>Transaction fee to generate liquidity (%) <span className="text-success">*</span></p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl id="totalsupply" placeholder="Ex: 51"
                                aria-describedby="basic-addon2"
                                onChange={(e)=>this.setState({liquidityfee : e?.target?.value})}
                            />
                          
                        </InputGroup>
                        <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.liquidityfee}</span>
                    </div>
                  </div>

                  <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>Maximum Transaction Amount<span className="text-success">*</span></p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl id="hardcap" value={this.state.maximumtransaction} onChange={(e)=>{this.setState({ maximumtransaction: e.target.value }); }} placeholder="Ex:10"
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                        <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.maximumtransaction}</span>
                    </div>
                        </div> 

                        <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>Exchange Thersold <span className="text-success">*</span></p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl id="hardcap" value={this.state.exchangethresold} onChange={(e)=>{this.setState({ exchangethresold: e.target.value }); }} placeholder="Ex:10"
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                        <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.exchangethresold}</span>
                    </div>
                        </div> 
                  </>
                }
                  

                        

                      
                       
                        
                      

                       
            

               {/* <div className='col-12 col-md-12'>
               <div className="custom-control custom-checkbox">
  <input type="checkbox" className="custom-control-input" id="customCheck1" />
  <label className="custom-control-label" for="customCheck1">Implement Pink Anti - Bot System?</label>
</div></div>     */}
         
                    <div className='col-12 col-md-12 text-center'>
                        <button className="get-started-btn mt-2" 
                        disabled = {this.state.userbalance < 0.01}
                        onClick={
                          // ()=>{this.setState({ currentStep: 1})}
                          this.handlecreatetoken
                          
                          }>
                           Create Token
                        </button>
                        
                        </div>
                </div>
            </div>
      </div>
      </div>
      </div>
      </div>
                </Container>
                <Container className='pb-5 px-0 mt-2'>
                 
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
                </div>
      </div>
    );
  }
}

export default CreateToken;
