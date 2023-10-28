import React, { Component } from "react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  FormControl,
  Modal
} from "react-bootstrap";
import { CreateLiquidityToken, CreateStandardToken, GetAdminfee, Getbalance, toFixedNumber } from "../../hooks/useContract";
import { validliquiditytoken, validstandardtoken } from "../../hooks/kycvalidation";


class TokenModal extends Component {
 
  




  constructor(props) {
    super(props);
    this.state = {
      
        tokenModal: true,
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
      poolfee : 0
    };
  }

  componentDidMount() {
    document.getElementById("launchpad_parent").classList.add("active");
    // this.hideLoader();
    this.getfee();
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
        arg[3] = (toFixedNumber(this.state.tokensupply*10**this.state.decimal)).toString()
        let tokendata = await CreateStandardToken(arg);
        console.log("tokendata" , tokendata);
        sessionStorage.setItem("HASH" , JSON.stringify(tokendata))
        // this.props.history.push("/tokensuccess")
        this.props.address(JSON.parse(sessionStorage.getItem("TKNDATA")).tokenAddres)
        this.props.onDismiss();
        // this.props.handlesetaddress()
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
        arg[3] = (toFixedNumber(this.state.tokensupply)).toString();
        arg[4] = this.state.yieldfee;
        arg[5] = this.state.liquidityfee;
        arg[6] = this.state.maximumtransaction;
        arg[7] = this.state.exchangethresold;
        let tokendata = await CreateLiquidityToken(arg);
        console.log("tokendata" , tokendata);
        localStorage.setItem("HASH" , JSON.stringify(tokendata))
        // this.props.history.push("/liquidity-tokensuccess")
        this.props.address(JSON.parse(sessionStorage.getItem("TKNDATA")).tokenAddress)
        this.props.onDismiss();
      }
      else{
        this.setState({errors : validate?.errors})
      }
    }
  }

  getfee = async()=>{
    let fee = await GetAdminfee();
    console.log("fee" , fee);
    this.setState({poolfee : fee.tokenfee/10**18})
}

  



 
  render() {
    
    const {tokenModal, settingsModal } = this.state


    return (
      
          
        <Modal className="wallet-modal" show={tokenModal} centered size="md">
        <Modal.Header className="pb-0 modal_header">
            
            <button type="button" class="close" onClick={() => this.props.onDismiss()}><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>

        </Modal.Header>
        <Modal.Body className="select-wallet modal_body pt-0 pb-0 px-0">

        
                <div className=''>
<div className="tab_img">
      <div className='card_bg card'>
 <div className='card-body pt-0'>
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
                    <p>{this.state.poolfee} BNB</p>
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
                    <p className='input_desc_sm'>Total Supply <span className="text-success">*</span></p>
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
                            <FormControl id="totalsupply" placeholder="Ex: 4"
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
                            <FormControl id="totalsupply" placeholder="Ex: 4"
                                aria-describedby="basic-addon2"
                                onChange={(e)=>this.setState({liquidityfee : e?.target?.value})}
                            />
                          
                        </InputGroup>
                        <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.liquidityfee}</span>
                    </div>
                  </div>

                  <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>Maximum Transaction Amount %<span className="text-success">*</span></p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl id="hardcap" value={this.state.maximumtransaction} onChange={(e)=>{this.setState({ maximumtransaction: e.target.value }); }} placeholder="Ex:1"
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                        <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.maximumtransaction}</span>
                    </div>
                        </div> 

                        <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>Exchange Thersold %<span className="text-success">*</span></p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl id="hardcap" value={this.state.exchangethresold} onChange={(e)=>{this.setState({ exchangethresold: e.target.value }); }} placeholder="Ex:1"
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
        </Modal.Body>
    </Modal>
    );
  }
}

export default TokenModal;
