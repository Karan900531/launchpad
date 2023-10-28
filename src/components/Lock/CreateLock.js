import React, { Component } from 'react';
import { useContext, useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

import Header from '../Header';
import Sidebar from '../Sidebar';
import Trendingslider from '../trendingslider';


import { getAccount } from '../../hooks/useAccount'
import {Card} from 'react-bootstrap'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import isEmpty from "is-empty";
import toast, { Toaster } from 'react-hot-toast';



import Web3 from "web3";

import {  Container, FormControl, InputGroup } from 'react-bootstrap';
import '../../css/styles.css';

import favicon from "../../images/favicon.png"
import { Link } from 'react-router-dom';
import { validtokenlock } from '../../hooks/kycvalidation';
import { Approvetoken, Checkaddress, Createlock, CreatelockWithout, Gettokenbalance } from '../../hooks/useContract';
import { iconTheme, position, style } from '../../hooks/useToast';

class CreateLock extends Component {
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
      document.getElementById("lock_parent").classList.add("active");
      this.hideLoader();
    //    this.setState({ accountInfo: getAccount() });
    }
    mindate(){
      let date = new Date();
      date.setDate(date.getDate() + 30)
      this.setState({mindates : date})
    }

    filterPassedTime = (time) => {
      const currentDate = new Date();
      const selectedDate = new Date(time);
  
      return currentDate.getTime() < selectedDate.getTime();
    };

    constructor(props) {
        super(props);
        this.state = {          
            accountInfo: '',
            startDate: '',
            anotherowner : false,
            tokenaddress : "",
            anotherowneraddress : "",
            amount : "",
            locktime : "",
            tgedate : "",
            tgepercent : "",
            cycle : 0,
            cyclepercent : 0,
            vesting : false,
            tokeninfo : {},
            errors : {},
            lockbutton : false,
            mindates : ""

        };
    }


    handlelock = async()=>{
      let payload = {};
      payload.tokenaddress = this.state.tokenaddress;
      payload.amount = this.state.amount;
      payload.locktime = this.state.locktime.toString();
      payload.anotherowneraddress = this.state.anotherowneraddress;
      payload.anotherowner = this.state.anotherowner;
      payload.vesting = this.state.vesting;
      payload.cycle = this.state.cycle;
      payload.cyclepercent = this.state.cyclepercent;
        
      console.log('payload' , payload);
      const validate = await validtokenlock(payload);
      if(validate.isValid){
        const lock = await Createlock(payload , this.state.tokeninfo.decimals)
        console.log("lock " , lock);
        this.props.history.push({
          pathname : "/lockinfo",
          state : lock
        });
      }
      else{
        this.setState({errors : validate.errors})
      }
    }

    handleapprove = async()=>{
      let payload = {};
      payload.tokenaddress = this.state.tokenaddress;
      payload.amount = this.state.amount;
      if(this.state.anotherowner){
        payload.owner = this.state.anotherowneraddress;
      }
      if(this.state.vesting){
        payload.tgedate =  this.state.locktime.toString()//this.state.tgedate;
        // payload.tegpercent = this.state.tgepercent;
        payload.cycle = this.state.cycle;
        payload.cyclepercent = this.state.cyclepercent;
        payload.vesting = true
      }
      else{
      payload.locktime = this.state.locktime.toString();
      }
      console.log('payload' , payload);
      const validate = await validtokenlock(payload);
      if(validate.isValid){
        const approve = await Approvetoken(this.state.tokenaddress , this.state.amount);
        this.setState({lockbutton : approve})
      }
      else{
        this.setState({errors : validate.errors})
      }
    }

    copyText(a, b){
      toast.success("Address Copied", {
          position: position.position,
          style: style,
          iconTheme: iconTheme,
      }
      )

  }
    
//     filterPassedTime = (time)
//     => {
//            const currentDate = new Date();
//            const selectedDate = new Date(time)
//    ;
       
//            return currentDate.getTime() < selectedDate.getTime();
//          };
 
    render() {
        
      const location = this.props.location.pathname.split('/')[1];

      const {startDate} = this.state

// {console.log("date" , new Date(this.state.locktime).getTime());}
      
      
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
                        <p class="text-white">Create Your Lock</p>
                        <hr class="hr_green mb-0"></hr>
                            </div>
                            {/* <div className='col-12 col-md-12 mb-3'>

                            <Card className="card_bg h-100">
                        
                        <Card.Body>
                        <Card.Title className='card_title_text'>PinkLock is audited by:</Card.Title>
                        <img style={{ height: "50px", width: "50px" }}
                          src={favicon}/>
                        </Card.Body>
                        
                      </Card>
                      </div> */}

                      <div className='col-12 col-md-12 mt-3 mb-0'>
                        
                        <p className='input_desc_sm'>Token or Token LP Address *</p>
                        <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl id="file"  onChange={async(e)=>{
                              this.setState({ tokenaddress: e.target.value })
                              const tokendata = await Checkaddress(e.target.value);
                              console.log("tokendata" , tokendata);
                              if(tokendata.isValid){
                                this.setState({tokeninfo : tokendata.tokeninfo})
                                this.setState({errors : {}});
                                this.setState({lockbutton : tokendata.allowance})
                              }
                              else{
                                this.setState({errors : tokendata.errors});
                                this.setState({tokeninfo : {}})
                              }
                             }} placeholder=""
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                        <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.tokenaddress}</span>
                        
                    </div >
                    <div className={isEmpty(this.state.tokeninfo) ? "d-none" : 'col-12 col-md-12 mb-3'}>
                        <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
                            <span className='desc_grey_txt'>Name :</span>
                            <span className='desc_grey_txt font_12'>{this.state.tokeninfo?.name}</span>
                                </p>

                        
                                <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
                            <span className='desc_grey_txt'>Symbol :</span>
                            <span className='desc_grey_txt font_12'>{this.state.tokeninfo?.symbol}</span>
                                </p>

                                <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
                            <span className='desc_grey_txt'>Decimals :</span>
                            <span className='desc_grey_txt font_12'>{this.state.tokeninfo?.decimals}</span>
                                </p>
                      </div>
                    <div className="custom-control custom-checkbox mt-3">
  <input type="checkbox" className="custom-control-input" id="customCheck1" onChange={(e)=>{this.setState({"anotherowner" : e.target?.checked})}}/>
  <label className="custom-control-label" for="customCheck1">Use another owner?</label>
</div>
                            </div>


                            <div className={this.state.anotherowner ? 'col-12 col-md-12 mt-3 mb-0' : "d-none"}>
                        
                        <p className='input_desc_sm'>Owner</p>
                        <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl id="file"  onChange={(e)=>this.setState({ anotherowneraddress: e.target.value }) } placeholder="Ex: My Lock"
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                        <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.anotherowneraddress}</span>
                    </div>
                    
                            </div>

                           

                            <div className='col-12 col-md-12 mt-3 mb-0'>
                        
                        <p className='input_desc_sm'>Amount*</p>
                        <div className="inputs input-groups date_inoput_grps">
                        <InputGroup className="datepicker_input">
                        <FormControl id="amountmax" placeholder="Enter Amount"
                                aria-describedby="basic-addon2"
                                value={this.state.amount}
                                onChange={(e)=>{
                                  this.setState({"amount" : e?.target?.value})
                                }}
                            />
                          
                        </InputGroup>
                        <InputGroup.Append className='cur_pointer'>
                                <button variant="outline-secondary" className="trans_cal_btn"
                                disabled = {this?.state?.errors?.tokenaddress || ! this.state.tokenaddress}
                                 onClick={async()=>{
                                  const balance = await Gettokenbalance(this.state.tokenaddress);
                                  this.setState({amount : balance})

                                  }}>
                                Max
                                </button>
                            </InputGroup.Append>
                    </div>
                    <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.amount}</span>

                    <div className="custom-control custom-checkbox mt-3">
  <input type="checkbox" className="custom-control-input" id="customCheck2" onChange={(e)=>{this.setState({"vesting" : e.target?.checked})}}/>
  <label className="custom-control-label" for="customCheck2">Use Vesting?</label>
</div>
                            </div>


                            <div className='col-12 col-md-12 mt-3 mb-0'>
                        
                        <p className='input_desc_sm'>{this.state.vesting ? "TGE Date*" : "Lock until*"}</p>
                        <div className="inputs input-groups date_inoput_grps inut_grp_date_inpt_pad">
                        <InputGroup className="datepicker_input" value= {this.state.locktime} readonly  >
                        <DatePicker
                         minDate={new Date(Date.now() + (86400000 *30))}
                          filterTime={this.filterPassedTime.bind(this)}
                        // disabledKeyboardNavigation
                          showTimeSelect
                          selected={this.state.locktime}
                          onChange={(date)=> {
                            let formData = { ...this.state.errors, ["locktime"]: "" };
                            this.setState({ errors: formData });
                            this.setState({"locktime": date});
                            if(Date.parse(date) > Date.now()){
                              let formData = { ...this.state.errors, ["locktime"]: "" };
                               this.setState({ errors: formData });
                            }
                            else{
                              let formData = { ...this.state.errors, ["locktime"]: "Unlock time needs to be after now" };
                               this.setState({ errors: formData });
                            }
                          }}
                          onKeyDown={e => e.preventDefault()}
                          dateFormat="MMMM d, yyyy h:mm aa"
                                                 />
                          
                        </InputGroup>
                        <InputGroup.Append className='cur_pointer'>
                                <button variant="outline-secondary" className="trans_cal_btn">
                                <i class="far fa-calendar-alt"></i>
                                </button>
                            </InputGroup.Append>
                    </div>
                    <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.locktime}</span>

                            </div>

                            {/* <div className={this.state.vesting ? 'col-12 col-md-12 mt-3 mb-0' : "d-none"}>
                        
                        <p className='input_desc_sm'>TGE Date (UTC time)</p>
                        <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl id="file"  onChange={(e)=>this.setState({ tgedate: e.target.value }) } placeholder="Ex: My Lock"
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                    </div>
                    
                            </div> */}
                            {/* <div className={this.state.vesting ? 'col-12 col-md-12 mt-3 mb-0' : "d-none"}>
                        
                        <p className='input_desc_sm'>TGE Date (UTC time)*</p>
                        <div className="inputs input-groups date_inoput_grps">
                        <InputGroup className="datepicker_input" value = {this.state.tgedate}>
                        <DatePicker
                        //   filterTime={this.filterPassedTime.bind(this)}
                          showTimeSelect
                          selected={this.state.tgedate}
                          onChange={(date)=> {
                            this.setState({tgedate: date})
                            if(Date.parse(date) > Date.now()){
                              // this.setState({tgedate: date});
                            }
                            else{
                              let formData = { ...this.state.errors, ["tgedate"]: "TGE Date needs to be after now" };
                               this.setState({ errors: formData });
                            }
                        
                          }}
                          dateFormat="MMMM d, yyyy h:mm aa"
                                                 />
                          
                        </InputGroup>
                        <InputGroup.Append className='cur_pointer'>
                                <button variant="outline-secondary" className="trans_cal_btn">
                                <i class="far fa-calendar-alt"></i>
                                </button>
                            </InputGroup.Append>
                    </div>
                    <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.tgedate}</span>

                            </div> */}

                            {/* <div className={this.state.vesting ? 'col-12 col-md-12 mt-3 mb-0' : "d-none"}>
                        
                        <p className='input_desc_sm'>TGE Percent</p>
                        <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl id="file"  onChange={(e)=>this.setState({ tegpercent: e.target.value }) } placeholder="Ex: My Lock"
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                        <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.tgepercent}</span>
                    </div>
                    
                            </div> */}

                            <div className={this.state.vesting ? 'col-12 col-md-12 mt-3 mb-0' : "d-none"}>
                        
                        <p className='input_desc_sm'>Cycle (days)</p>
                        <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl id="file"  onChange={(e)=>this.setState({ cycle: e.target.value }) } placeholder="Ex: 20"
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                        <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.cycle}</span>
                    </div>
                    
                            </div>

                            <div className={this.state.vesting ? 'col-12 col-md-12 mt-3 mb-0' : "d-none"}>
                        
                        <p className='input_desc_sm'>Cycle Release Percent</p>
                        <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl id="file"  onChange={(e)=>this.setState({ cyclepercent: e.target.value }) } placeholder="Ex:50"
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                        <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.cyclepercent}</span>
                    </div>
                    
                            </div>

                            <div className='col-12 col-md-12 mt-3 mb-0'>
                            <div className='card_footer_form'>
                                <div className='d-flex align-items-center justify-content-center'>
                                <p className='mb-0 pl-3'>Please exclude CryptoLock's lockup address <span className='wallet_address_text'><strong className='pl-1'>0x3eb6ADf6fBbD4993809D8D5356127F8E8a885d55</strong>
                                <CopyToClipboard text={"0x3eb6ADf6fBbD4993809D8D5356127F8E8a885d55"} onCopy={() => this.copyText('invite link', "0x3eb6ADf6fBbD4993809D8D5356127F8E8a885d55")}>
                        <button variant='link' className='fa fa-copy' style={{backgroundColor:"transparent", border:0}}></button>
                  </CopyToClipboard></span>
                                {/* <span className='copy_icon'> <i class="fa fa-files-o" aria-hidden="true"></i> */}
                                {/* </span>  */}
                                from fees, rewards, max tx amount to start locking tokens. We don't support rebase tokens.</p>
                                </div>

                            </div>  
                            </div>
                            <center className={this.state.lockbutton ? "d-none" : 'mt-4 mx-auto'}>
                            <button className="get-started-btn mr-3" 
                              onClick={this.handleapprove}
                              >Approve</button>
                            </center>
                            <center className={this.state.lockbutton ? 'mt-4 mx-auto' : "d-none"}>
                            <button className="get-started-btn mr-3" onClick={this.handlelock}>Lock</button>
                            </center>
               
               
                           
                        
                       

                       

                       

                       

                       
                        
                       
                       

                       


                    
                  
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

        </div>
        </div>
        )
    }
}

export default CreateLock