import React, { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useContext, useEffect, useState } from "react";
import { InputGroup, FormControl,Form, Container } from 'react-bootstrap';
import isEmpty from 'is-empty';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { ONEDAYINSECONDS, CHAINS, userFeeWithtoken, userFee } from '../../config/env'
import { UseTokenInfo,IsValidAddress,createPresale,toFixedNumber,getSaleAddress,depositTokens, isFloat, getSalecreationFee, Checkaddress, Approvetoken, GetAdminfee } from '../../hooks/useContract'
import { getAccount } from '../../hooks/useAccount'
import {CURRENT_CHAIN_ID,CURRENT_RPC_URL} from '../../hooks/useWeb3'
import { Link } from 'react-router-dom';
import TokenModal from "./TokenModal"
import { urlvalidation } from '../../hooks/kycvalidation';



  
class CreatetabFair extends Component
{

       
    constructor(props) {
        super(props);
        this.state = {   
          logo: '',       
          name: '',
          symbol: '',
          address: '',
          decimal: '',
          presaleRate: "0",
          softCap: 0,
          hardCap: 0,
          min: 0,
          max : 0,
          isVested: false,
          isPancake: true,
          pancakeRate:0,
          liquidityPercent:0,
          unlockOn: 0,
          startDate: '',
          endDate: '',
          vestPercent: 0,
          vestInterval: 0,
          isWithoutToken: false,
          description: '',
          website: '',
          twitter: '',
          telegram: '',
          facebook: '',
          githup: '',
          instagram:'',
          discord:'',
          reddit:'',
          youtube:'',
          deposit: 0,
          decimals: 0,
          createdSale: '',
          isDeposited: false,
          isWhitelisted: false,
          currentStep:1,
          tokenModal: false,  
          
          //fairlaunch
          title : "",
          currency : "BNB",
          
          currency : "BNB",
          isToken : false,
          userFee : 0,
          WithTokenaddress : "",
          LaunchpadType: false, // fair
          Fee:0,
          tokenaddress : "",
          tokeninfo : {},
          errors : {},
          button1: true,
   button2 : true,
   button3 : true,
   fee : 5,
//   isToken : false,
  userFee : 0,
  approvebutton : false,
  poolfee : ""
         
        };
    }

    handledisable = () =>{
        // console.log("vest" , isvalid);
        this.setState({button2 : false})
        var isvalid = true;
        var i = 1;
        // let pancake = this.state.isPancake ? 
        if(isEmpty(this.state.error) && this.state.presaleRate && this.state.softCap
        && this.state.hardCap && this.state.min && this.state.max  && this.state.startDate &&
        this.state.endDate && this.state.unlockOn &&this.state.liquidityPercent){
            isvalid = false
            console.log("vest1" , isvalid);
                // if(this.state.isPancake){
                //     isvalid = true;
                //     console.log("vest2" , isvalid);
                //     if(this.state.unlockOn &&
                //         this.state.liquidityPercent && this.state.pancakeRate){
                //             console.log("vest3" , isvalid);
                //             isvalid = false;
                //             console.log("vest3" , isvalid);
                //         }
                // }
                // else if(!this.state.ispancake && this.state.isvested){
                //     isvalid = true;
                // }
                // else{
                //     isvalid = false;
                // }
                if(this.state.isVested){
                    isvalid = true;
                    console.log("vest4" , isvalid);
                    if(this.state.vestInterval && this.state.vestPercent){
                        isvalid = false
                        console.log("vest5" , isvalid);
                    }
                }
                // else if(this.state.ispancake && !this.state.isvested){
                //     isvalid = true;
                // }
                // else{
                //     isvalid = false;
                // }
                // else{
                //     isvalid = false;
                // }
                // if(!this.state.isvested || !this.state.isPancake){
                //     isvalid = false;
                // }
        }
            this.setState({button2 : isvalid}) ;
            console.log("isvalid" , isvalid);
            return isvalid;
    }

    handledisableurlbutton = () => {
        var isvalid = true;
        if(this.state.logo && this.state.website && this.state.facebook && this.state.twitter && 
            this.state.github && this.state.telegram && this.state.instagram && this.state.discord
            && this.state.reddit && this.state.youtubevideo && this.state.description){
                isvalid = false;
            }
            this.setState({button3 : isvalid})
    }

    // componentDidMount(){
    //     const CHAIN_ID = CURRENT_CHAIN_ID();
    //     const CURRENT_RPC = CURRENT_RPC_URL();
    //     console.log("current chain id",CHAIN_ID);
    //     let ROUTER;
    //     CHAINS.map((data)=>{
    //         ROUTER = ((data.CHAIN_ID==CHAIN_ID)&&(data.RPC_URL == CURRENT_RPC))&&data.ROUTER;
    //         console.log((data.CHAIN_ID==CHAIN_ID)&&data.ROUTER,"data in map");
    //     })
    // }

    componentDidMount(){
        this.GetTokenAddress("BNB")
        this.getData()
        this.getfee();
    }
    
    async getData(){
        var fee = await getSalecreationFee();
        this.setState({Fee : Number(fee)})

    }
    getfee = async()=>{
        let fee = await GetAdminfee();
        this.setState({poolfee : fee.deploymentfee/10**18})
    }



    
  // Presale Creation
  async CreateSale(){
    console.log("call");
     let Addresses = [];
     let Values = [];
     let Details = [];
     let isSetter = [];

     const account= getAccount()
    

     const startTime = this.state.startDate;
     const endTime = this.state.endDate;

       // let startDiff = 0;
     // let endDiff = 0;
     // var now = new Date();
       
     // if(startTime > now.getTime())
     //     startDiff = parseInt((new Date(startTime).getTime() - now.getTime())/86400/1000) ;
     
     // endDiff =  parseInt(((new Date(endTime).getTime() - now.getTime())/86400/1000)-startDiff) ;

     const CHAIN_ID = CURRENT_CHAIN_ID();
     const CURRENT_RPC = CURRENT_RPC_URL();
     let ROUTER;
     CHAINS.map((data)=>{
     if((((data.CHAIN_ID==CHAIN_ID)&&(data.RPC_URL == CURRENT_RPC))&&data.ROUTER)!=false)
         ROUTER = ((data.CHAIN_ID==CHAIN_ID)&&(data.RPC_URL == CURRENT_RPC))&&data.ROUTER;
         
     })
     
     const startDiff = parseInt(parseInt((new Date(startTime).getTime()))/1000);
     const endDiff =  parseInt(parseInt((new Date(endTime).getTime()))/1000);
    
      // _token 0
     //_router 1
     //owner 2
     //UsewithToken 3
    Addresses.push(this.state.tokenaddress); 
    Addresses.push(ROUTER);
    Addresses.push(account);
    Addresses.push(this.state.WithTokenaddress)
 


       //_min 0 
     //_max 1
     //_rate 2
     // _soft  3
     // _hard 4
     //_pancakeRate  5
     //_unlockon  6
     // _percent 7
     // _start 8
     //_end 9
     //_vestPercent 10
     //_vestInterval 11
     //_useFee 12
     Values.push(toFixedNumber(this.state.min*10**18).toString());
     Values.push(toFixedNumber(this.state.max*10**18).toString());
     Values.push(this.state.presaleRate);
     Values.push(toFixedNumber(this.state.softCap*10**18).toString());
     Values.push(toFixedNumber(this.state.hardCap*10**18).toString());
     Values.push(this.state.pancakeRate.toString());
     Values.push(this.state.unlockOn.toString());
     Values.push(this.state.liquidityPercent.toString());
     Values.push(startDiff.toString());
     Values.push(endDiff.toString());
     Values.push((this.state.vestPercent*100).toString());
     Values.push((this.state.vestInterval * ONEDAYINSECONDS).toString());
     Values.push((this.state.userFee).toString())

      // isAuto 0
     //_isvested 1
     // isWithoutToken 2
     // isWhitelisted 3
     // buyType isBNB or not 4
     // isToken isToken or not 5
     // launchpadtype isnormal or fair
     isSetter.push(this.state.isPancake);
     isSetter.push(this.state.isVested);
     isSetter.push(this.state.isWithoutToken);
     isSetter.push(this.state.isWhitelisted);
     isSetter.push(this.state.currency === "BNB" ? true : false)
     isSetter.push(this.state.isToken)
     isSetter.push(this.state.LaunchpadType)
      // description 0 
     // website,twitter,telegram 1,2,3
     //logo 4
     //name 5
     //symbol 6
     // githup 7
     // instagram 8
     // discord 9
     // reddit 10
     // youtube 11
     Details.push(this.state.description);
     Details.push(this.state.website);
     Details.push(this.state.twitter);
     Details.push(this.state.telegram);
     Details.push(this.state.logo);
     Details.push(this.state.name);
     Details.push(this.state.symbol);
     Details.push(this.state.githup);
     Details.push(this.state.instagram);
     Details.push(this.state.discord);
     Details.push(this.state.reddit);
     Details.push(this.state.youtube);

     const data = this.validate()
     if(data)
         return false;


     console.log("DATA : ",Addresses,Values,isSetter,Details)
     const sale = await createPresale(Addresses,Values,isSetter,Details,account)
     this.setState({createdSale: sale});
    
 }



    goToSale(){
        window.location.href = `${window.location.origin}/launchpaddetail/${this.state.createdSale}`;
    }

    
    GetTokenAddress(value){
       
        let Withtokenaddress;
        
        if(value === "BUSD"){
            Withtokenaddress = CHAINS[localStorage.getItem("CHAIN")].BUSD
        }else if(value === "USDT"){
            Withtokenaddress = CHAINS[localStorage.getItem("CHAIN")].USDT
        }else if(value=== "USDC"){
            Withtokenaddress = CHAINS[localStorage.getItem("CHAIN")].USDC  
        }else if(value === "BNB"){
            Withtokenaddress = CHAINS[localStorage.getItem("CHAIN")].BNB
        }
       
       console.log("WithTokenaddress",Withtokenaddress);
            this.setState({ WithTokenaddress: Withtokenaddress});
           
    }

    async getTokenInfo(tokenAddress){
        const isValid = await IsValidAddress(tokenAddress);
        if(tokenAddress.length == 42 && !isValid){}
    //         toast.error("This is not a Valid Address !",
    // {
    //     style: {
    //     minWidth: '300px',
    //     minHeight: '55px'
    //     }
    // })
       
        console.log("IS valid ",isValid)
        if(tokenAddress.length == 42 && isValid){
            const token = await UseTokenInfo(tokenAddress);
            this.setState({ name: token.name });
            this.setState({ symbol: token.symbol });
            this.setState({ decimals: token.decimals });
        }
    }

    // calculateDepositTokens(){
    //     this.forceUpdate() 
    //     let topancakeTokens =0;
    //     let pancakeTokens = 0;
    //     const presalePrice = 1/this.state.presaleRate;
    //     if(this.state.isPancake){
    //         const pancakePrice = 1/this.state.pancakeRate;
    //         topancakeTokens = (this.state.hardCap) * this.state.liquidityPercent / 100;
    //         pancakeTokens = topancakeTokens/pancakePrice;
    //         console.log("pancake tokens : ",pancakeTokens)
    //     }
    //      const netTokens = (this.state.hardCap)/presalePrice;
    //      console.log("net Token : ",pancakeTokens + netTokens)
    //      this.setState({ deposit: pancakeTokens + netTokens });
        
    // }

    calculateDepositTokens(hardCap,liquidityPercent){
        
        this.forceUpdate() 
       
        if(this.state.isPancake){
            var DepositToken = (hardCap / liquidityPercent) * 100;
        }
         console.log("DepositToken",this.state.hardCap,this.state.liquidityPercent,DepositToken);
         this.setState({ deposit: DepositToken.toFixed(3) });
        
    }

    async DepositTokens(){
        const account= getAccount()
        const tokenAmount = toFixedNumber(this.state.deposit * 10 ** this.state.tokeninfo?.decimals).toString()
        const isDeposit = await depositTokens(this.state.tokenaddress,this.state.createdSale,tokenAmount,account)
        this.setState({ isDeposited : isDeposit});
        
    }   

    renderDeposit(){
        return( this.state.deposit > 0 ?
              <button onClick={this.DepositTokens.bind(this)} className="get-started-btn">Deposit {this.state.deposit} {this.state.symbol}</button>:
               <button onClick={() => this.calculateDepositTokens(this.state.hardCap,this.state.liquidityPercent)} className="get-started-btn">Calculate</button>)
    }

    validate(){
        console.log("this.state.hardCap",typeof this.state.hardCap,"this.state.softCap",typeof this.state.softCap,(this.state.hardCap) < (this.state.softCap),"10<8",10<8);
        if(parseFloat(this.state.hardCap) < parseFloat(this.state.softCap)){
            toast.error("Hard Cap must be Higher than Soft Cap !",
            {
                style: {
                minWidth: '300px',
                minHeight: '55px'
                }
            })
        }
        if((parseFloat(this.state.presaleRate) < 0)){
            toast.error("Price must be greater than 0",
            {
                style: {
                minWidth: '300px',
                minHeight: '55px'
                }
            })
        }
        if((parseFloat(this.state.pancakeRate) < 0)){
            toast.error("Pancake price must be greater than 0",
            {
                style: {
                minWidth: '300px',
                minHeight: '55px'
                }
            })
        }

        return (parseFloat(this.state.hardCap) < parseFloat(this.state.softCap)) || (parseFloat(this.state.presaleRate) < 0) || (parseFloat(this.state.pancakeRate) < 0) ;
    }

    filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);
    
        return currentDate.getTime() < selectedDate.getTime();
      };

      keypress = (event)=>{
        if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
          }
      }

      async settokenaddress(value){
        this.setState({ tokenaddress: value });
        // this.getTokenInfo(e.target.value);
        const tokendata = await Checkaddress(value);
      console.log("tokendata" , tokendata);
      if(tokendata.isValid){
        this.setState({tokeninfo : tokendata.tokeninfo})
        this.setState({errors : {}});
        this.setState({approvebutton : tokendata.allowance})
        this.setState({button1 : false})
      }
      else{
        let formData = { ...this.state.errors, ["tokenaddress"]: "Invalid token address !" };
        this.setState({errors : formData});
        this.setState({tokeninfo : {}})
      }
}

async approvetoken(){
    await Approvetoken(this.state.tokenaddress);
    this.setState({approvebutton : true})
}
      


      onDismiss(){
        this.setState({ tokenModal: false });
    }

    render() {
        
  
        const {tokenModal } = this.state

        
      return (
        <div>
   {/* Wizard */}
   <div className='d-none d-xl-block container px-1'>
           <div className='row mt-5'>
             <div className='col-3'>
               <div className={this.state.currentStep ==1 ? "card_bg_wizard active card":"card_bg_wizard card"} >
               {/* onClick={()=>{this.setState({ currentStep: 1})}} */}
                 <div className='card-body'>
                   <div className='d-flex align-items-center h-100'>
                     <div className='wizard_badge_num'>
                       1
                     </div>
                     <div className='pl-3 create_wiz_desc'>
                       <h5>Verify Token</h5>
                       <p className='mb-0'>Enter the token address and verify</p>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
             <div className='col-3'>
               <div className={this.state.currentStep ==2 ? "card_bg_wizard active card":"card_bg_wizard card"} >
               {/* onClick={()=>{this.setState({ currentStep: 2})}} */}
                 <div className='card-body'>
                   <div className='d-flex align-items-center h-100'>
                     <div className='wizard_badge_num'>
                       2
                     </div>
                     <div className='pl-3 create_wiz_desc'>
                       <h5>Defi Launchpad Info</h5>
                       <p className='mb-0'>Enter the launchpad information that you want to raise, that should be enter all details about your presale</p>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
             <div className='col-3'>
               <div className={this.state.currentStep ==3 ? "card_bg_wizard active card":"card_bg_wizard card"} >
               {/* onClick={()=>{this.setState({ currentStep: 3})}} */}
                 <div className='card-body'>
                   <div className='d-flex align-items-center h-100'>
                     <div className='wizard_badge_num'>
                       3
                     </div>
                     <div className='pl-3 create_wiz_desc'>
                       <h5>Add Additional Info</h5>
                       <p className='mb-0'>Let people know who you are</p>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
             <div className='col-3'>
               <div className={this.state.currentStep ==4 ? "card_bg_wizard active card":"card_bg_wizard card"} >
               {/* onClick={()=>{this.setState({ currentStep: 4})}} */}
                 <div className='card-body'>
                   <div className='d-flex align-items-center h-100'>
                     <div className='wizard_badge_num'>
                       4
                     </div>
                     <div className='pl-3 create_wiz_desc'>
                       <h5>Finish</h5>
                       <p className='mb-0'>Review your information</p>
                     </div>
                   </div>
                 </div>
               </div>
             </div>

         </div>
           </div>
          
           {/* end Wizard */}
      {/* ongoing_sec */}
          <div className='ongoing_sec form_sec'>
      
      
       <div className="inner_bg mt-5">
         <div className='row'>
           <div className='col-12 col-md-10 col-lg-9 mx-auto'>
           <div className="tab_img">
                 <div className='card_bg card'>
            <div className='card-body'>
              <div className='row align-items-center pb-4'>
                <div className='col-12 col-md-6 mb-3 mb-md-0'>
                  <p className='bottom_text mb-0'>(*) is required field.</p>
                  
                </div>
                <div className={this.state.currentStep ==1 ? "col-12 col-md-6 text-md-right d-block":"col-12 col-md-6 text-md-right d-none"}>
                <button className="get-started-btn" onClick={() => this.setState({ tokenModal: true })}>+ Create</button>
                </div>
              </div>
              <div id="firststep" className={this.state.currentStep ==1 ? "d-block":"d-none"}>
                <div className='row'>                     
                      <div className='col-12 col-md-12'>
                    <p className='input_desc_sm'>Token Address*</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl value={this.state.tokenaddress} onChange={(e)=> this.settokenaddress(e.target.value)} id="tokenaddress" placeholder=""
                                aria-describedby="basic-addon2"
                            />
                        </InputGroup>
                        <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.tokenaddress}</span>
                    </div>
                    <div className='note_desc mt-1 mb-1'>
                    <p>Pool creation fee: {this.state.poolfee} BNB</p>
                    </div>
                        </div>

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

                        <div className='col-12 col-md-12 mb-1'>
                        <p className='input_desc_sm'>Currency</p>
                        <div className='d-flex'>
                            <div className={this.state.currency === "BNB"?'currency_badge active mr-2' : "currency_badge mr-2"}  value = "BNB"
                                onClick = {(e)=>{console.log(e.target.getAttribute("value"));
                                    this.setState({"currency" :e.target.getAttribute("value")})
                                    this.GetTokenAddress(e.target.getAttribute("value"))
                                }}
                            >BNB</div>
                            <div className={this.state.currency == "BUSD"?'currency_badge active mr-2' : "currency_badge mr-2"} value = "BUSD" onClick = {(e)=>{
                                this.setState({"currency" : e.target.getAttribute("value")});
                                this.GetTokenAddress(e.target.getAttribute("value"));
                                
                            }}>BUSD</div>
                            <div className={this.state.currency == "USDT"?'currency_badge active mr-2' : "currency_badge mr-2"} value = "USDT"
                                onClick = {(e)=>{
                                    this.setState({"currency" :e.target.getAttribute("value")});
                                    this.GetTokenAddress(e.target.getAttribute("value"));
                                   
                                }}
                            >USDT</div>
                            <div className={this.state.currency == "USDC"?'currency_badge active mr-2' : "currency_badge mr-2"} value = "USDC"
                            onClick = {(e)=>{
                                this.setState({"currency" : e.target.getAttribute("value")});
                                this.GetTokenAddress(e.target.getAttribute("value"))
                            }}
                            >USDC</div>

                        </div>
                        <div className='note_desc mt-1 mb-1'>
                    <p>Users will pay with {this.state.currency} for your token</p>
                    </div>
                    {/* <p className='input_desc_sm'>Token Symbol</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl value={this.state.symbol} onChange={(e)=>this.setState({ symbol: e.target.value }) } id="tokensymbol" placeholder=""
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                    </div> */}
                        </div>

                        <div className='col-12 col-md-12 mb-3'>
                        <p className='input_desc_sm'>Fee Options</p>
                      
                        <div className="custom-control custom-radio mb-2">
                    <input type="checkbox" id="customRadio1" name="customRadio" className="custom-control-input"  value ={5}
                    // checked
                    checked ={this.state.fee == 5 ? true : false}
                    onChange ={(e)=>{
                        console.log("val" , 5);
                        this.setState({fee : e.target.value})
                        this.setState({isToken : true});
                        this.setState({userFee : userFee})
                    }}
                    />
                    <label className="custom-control-label" for="customRadio1">{userFee}% {this.state.currency} raised only <span>(recommended)</span></label>
                    </div>   

                    <div className="custom-control custom-radio">
                    <input type="checkbox" id="customRadio2" name="customRadio" value={2} className="custom-control-input" 
                    checked ={this.state.fee == 2 ? true : false}
                         onChange ={(e)=>{
                            console.log("val" , 2);
                            this.setState({fee : e.target.value})
                            this.setState({isToken : false});
                            this.setState({userFee : userFeeWithtoken})
                        }}
                    />
                    <label className="custom-control-label" for="customRadio2">{2}% {this.state.currency} raised + 2% token sold</label>
                    </div>                  
                        </div>

                        {/* <div className='col-12 col-md-12 mb-3'>
                        <p className='input_desc_sm'>Listing Options</p>
                        <div className='d-flex'>
                            <div className='currency_badge active mr-2'>Auto</div>
                            <div className='currency_badge mr-2'>Manual</div>                           

                        </div>
                    
                        </div> */}
{this.state.currency == "USDC" ? 
                        <div className='col-12 col-md-12 mb-4 mt-4'>
                            <div className='card_footer_form'>
                                <div className='d-flex align-items-center justify-content-center'>
                                <i class="fa fa-exclamation-circle text-danger-war" aria-hidden="true"></i>
                                <p className='mb-0 pl-3'>Do not use this currency for auto liquidity tokens, or tokens that depend on WETH pair. It will lead to error when finalizing the pool or transferring the tokens (for example Liquidity Generator Token, BabyToken, BuyBack Baby Token) <br />
                            Contact Crypto Launchpad for more information.</p>
                                </div>

                            </div>
                        </div> :<></>}

                        <div className='col-12 col-md-12 mb-4'>
                            <div className='card_footer_form'>
                            <p className='mb-0'>For auto listing, after you finalize the pool your token will be auto listed on DEX.</p>
                            </div>
                        </div>


                        

                        <div className='col-12 col-md-12 text-center'>
                        {/* <button className="get-started-btn" onClick={()=>{this.setState({ currentStep: 2})}}
                        disabled = {this.state.button1}
                        >
                           Next
                        </button> */}

                    {this.state.approvebutton && 
                             <button className="get-started-btn" onClick={()=>{this.setState({ currentStep: 2})}}
                             disabled = {this.state.button1}
                             >
                                Next
                             </button> 
                            }

                        {!this.state.approvebutton &&
                        <button className="get-started-btn" onClick={()=>{this.approvetoken()}}
                        disabled = {this.state.button1}
                        >
                           Approve
                        </button> 
                        }
                        </div>

             </div>
             </div>
             <div id="secondstep" className={this.state.currentStep ==2 ? "d-block":"d-none"}>
                <div className='row'>
                {/* <div className='col-12 col-md-12 mb-3'>
                        
                        <p className='input_desc_sm'>Presale Rate*</p>
                        <div className="inputs input-groups">
                            <InputGroup className="">
                                <FormControl pattern="^[1-9]+[0-9]*$" id="presalerate" value={this.state.presaleRate} onChange={(e)=>{ if(!isFloat(e.target.value)){ this.setState({ presaleRate: e.target.value })} }} placeholder=""
                                    aria-describedby="basic-addon2"
                                />
                              
                            </InputGroup>
                        </div>
                        <div className='note_desc mt-1 mb-1'>
                    <p>If I spend 1 {this.state.currency} how many tokens will I receive?</p>
                    </div>
                            </div> */}



<div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>Total Selling Amount</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl id="hardcap" value={this.state.hardCap} onChange={(e)=>{
                                
                                const formvalue = {...this.state.errors , ["hardcap"]: ""}
                                this.setState({errors : formvalue});
                                this.setState({ hardCap: e.target.value }); 
                                // if (!e.target.value || isNaN(parseFloat(e.target.value))) {
                                //     console.log("invalid");
                                //     const formvalue = {...this.state.errors , ["hardcap"]: "Invalid hardcap !"}
                                //     this.setState({errors : formvalue});
                                //   }
                                //   else if(e.target.value < this.state.softCap ){
                                //     const formvalue = {...this.state.errors , ["hardcap"]: "Hardcap must be greater than softcap !"}
                                //     this.setState({errors : formvalue});
                                //   }
                                //   else{
                                //     const formvalue = {...this.state.errors , ["hardcap"]: ""}
                                //     this.setState({errors : formvalue});
                                //   }
                                //   if(this.state.softCap < (parseFloat(e.target.value)/2)){
                                //     const formvalue = {...this.state.errors , ["softcap"]: "Softcap must be >= 50% of Hardcap"}
                                //     this.setState({errors : formvalue});
                                //   }
                                var rd = new RegExp(/^\d+$/);
                                if(!rd.test(parseFloat(e.target.value))){
                                    const formvalue = {...this.state.errors , ["hardcap"]: "Invalid Total Selling Amount"}
                                    this.setState({errors : formvalue});
                                }
                                else if(isNaN(e.target.value)){
                                    const formvalue = {...this.state.errors , ["hardcap"]: "Invalid Total Selling Amount"}
                                    this.setState({errors : formvalue});
                                }
                                else if(!e.target.value || e.target.value == 0){
                                    const formvalue = {...this.state.errors , ["hardcap"]: "Total Selling Amount field is required"}
                                    this.setState({errors : formvalue});
                                }
                               

                                  this.handledisable();
                                  console.log("condition" , e.target.value < this.state.softcap)
                                  
                            }} placeholder=""
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                        <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.hardcap}</span>
                    </div>
                        </div> 
                            <div className='col-12 col-md-12 mb-3'>
                        <p className='input_desc_sm'>Whitelist</p>
                      
                        <div className="custom-control custom-radio mb-2">
                    <input type="radio"
                    checked ={ !this.state.isWhitelisted  ? true : false}
                    onChange={(e)=> this.setState({isWhitelisted : false})} id="customRadio3" name="customRadio" className="custom-control-input" />
                    <label className="custom-control-label" for="customRadio3">Disable</label>
                    </div>   

                    <div className="custom-control custom-radio">
                    <input type="radio" 
                     checked ={this.state.isWhitelisted  ? true : false}
                    onChange={(e)=> this.setState({isWhitelisted : true})} id="customRadio4" name="customRadio" className="custom-control-input" />
                    <label className="custom-control-label" for="customRadio4">Enable</label>
                    </div>                 
                        </div>

                        <div className='col-12 col-md-12 mb-0'>
                    <p className='input_desc_sm'>Soft Cap (BNB)*</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl value={this.state.softCap} onChange={(e)=>{
                                this.setState({ softCap: e.target.value });
                                const formvalue = {...this.state.errors , ["softcap"]: ""}
                                this.setState({errors : formvalue});
                                var rd = new RegExp(/^\d+$/);
                                var rx = new RegExp(/^[-+]?[0-9]+\.[0-9]+$/)
                                if(!rd.test(parseFloat(e.target.value)) || rx.test(parseFloat(e.target.value))){
                                    const formvalue = {...this.state.errors , ["softcap"]: "Invalid softcap !"}
                                    this.setState({errors : formvalue});
                                }
                                else if(isNaN(e.target.value)){
                                    const formvalue = {...this.state.errors , ["softcap"]: "Invalid softcap"}
                                    this.setState({errors : formvalue});
                                }
                                else if(!e.target.value || e.target.value == 0){
                                    const formvalue = {...this.state.errors , ["softcap"]: "Softcap field is required"}
                                    this.setState({errors : formvalue});
                                }
                                else{
                                    const formvalue = {...this.state.errors , ["softcap"]: ""}
                                    this.setState({errors : formvalue});
                                }
                                // if (!e.target.value || isNaN(e.target.value)) {
                                //     const formvalue = {...this.state.errors , ["softcap"]: "Invalid softcap !"}
                                //     this.setState({errors : formvalue});
                                //   }
                                //   else{
                                //     const formvalue = {...this.state.errors , ["softcap"]: ""}
                                //     this.setState({errors : formvalue});
                                //   }
                                  this.handledisable();
                            
                            } } id="softcap" placeholder=""
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                        <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.softcap}</span>
                    </div>
                    <div className='note_desc mt-1 mb-0'>
                   
                    </div>
                        </div>

                       
                        <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>Minimum Buy (BNB)*</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl id="mincontribution" value={this.state.min} onChange={(e)=>{
                                const formvalue = {...this.state.errors , ["min"]: ""}
                                this.setState({errors : formvalue});
                                this.setState({ min: e.target.value });
                                if(isNaN(e.target.value)){
                                    const formvalue = {...this.state.errors , ["min"]: "Invalid Minimum Buy "}
                                    this.setState({errors : formvalue});
                                }
                                if(!e.target.value){
                                    const formvalue = {...this.state.errors , ["min"]: "Minimum Buy field is required"}
                                    this.setState({errors : formvalue});
                                }
                               if(this.state.max){
                                if(e.target.value > this.state.max){
                                    const formvalue = {...this.state.errors , ["min"]: "Minimum Buy  must be < Maximum Buy"}
                                    this.setState({errors : formvalue});
                                }
                                else{
                                    const formvalue = {...this.state.errors , ["min"]: ""}
                                    this.setState({errors : formvalue});
                                }
                               }
                               this.handledisable();
                            } } placeholder=""
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                        <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.min}</span>
                    </div>
                        </div>
                        
                        <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>Maximum Buy ({this.state.currency})*</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl id="maxcontribution" value={this.state.max} onChange={(e)=>{
                                const formvalue = {...this.state.errors , ["max"]: ""}
                                this.setState({errors : formvalue});
                                this.setState({ max: e.target.value });
                                if(isNaN(e.target.value)){
                                    const formvalue = {...this.state.errors , ["max"]: "Invalid Maximum Buy "}
                                    this.setState({errors : formvalue});
                                }
                                if(!e.target.value){
                                    const formvalue = {...this.state.errors , ["max"]: "Maximum Buy field is required"}
                                    this.setState({errors : formvalue});
                                }
                                if(this.state.min){
                                    if(e.target.value < this.state.min){
                                        const formvalue = {...this.state.errors , ["max"]: "Maximum Buy  must be > Minimum Buy"}
                                        this.setState({errors : formvalue});
                                    }
                                    else{
                                        const formvalue = {...this.state.errors , ["max"]: ""}
                                        this.setState({errors : formvalue});
                                    }
                                   }
                                   this.handledisable();
                            } } placeholder=""
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                        <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.max}</span>
                    </div>
                        </div> 

                        {/* <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>Refund Type</p>
                    <select className="form-control custm_sel" id="exampleFormControlSelect3">
                        <option>Burn</option>                       
                        </select>
                        </div> */}

                        {/* <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>Select Router Exchange</p>
                    <select className="form-control custm_sel" id="exampleFormControlSelect4">
                        <option>Pancakeswap</option>                       
                        </select>
                        </div> */}
                              {/* <div className='col-12 col-md-12 mb-3'>
                        <p className='input_desc_sm'>Listing Options</p>
                        <div className='d-flex'>
                            <div className={`currency_badge  mr-2 ${this.state.isPancake === true? "active" : ""} `} onClick={(e)=> {
                                this.setState({isPancake : true});
                                
                                // this.forceUpdate();
                                this.handledisable();
                                }}>Auto</div>
                            <div className={`currency_badge  mr-2 ${this.state.isPancake === false? "active" : ""} `} onClick={(e)=> {
                                this.setState({isPancake : false});
                                // this.forceUpdate();
                                this.handledisable();
                                }}>Manual</div>                           
                        </div>
                    
                        </div> */}
                        {this.state.isPancake ?
                        <>
                        <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>Locking Days</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl id="liquidity" value={this.state.unlockOn} onChange={(e)=>{
                                this.setState({ unlockOn: e.target.value });
                                var rx = new RegExp(/^\d+$/);
                                if(!rx.test(e.target.value)){
                                    const formvalue = {...this.state.errors , ["lockingday"] : "Invalid Locking Days !"};
                                    this.setState({errors : formvalue});
                                }
                                else{
                                    const formvalue = {...this.state.errors , ["lockingday"] : ""};
                                    this.setState({errors : formvalue});
                                }
                                this.handledisable();
                                } } placeholder="0" aria-describedby="basic-addon2" />
                          
                        </InputGroup>
                        <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.lockingday}</span>
                    </div>
                        </div> 

                      

                        {/* <div className='col-12 col-md-12 mb-0'>
                    <p className='input_desc_sm'>Listing Rate per {this.state.currency}</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl id="maxcontribution" value={this.state.pancakeRate} onChange={(e)=>{
                                if(!isFloat(e.target.value)){  
                                    this.setState({ pancakeRate: e.target.value })
                                    var rx = new RegExp(/^\d+$/);
                                if(!rx.test(e.target.value)){
                                    const formvalue = {...this.state.errors , ["listingrate"] : `Invalid Listing Rate per ${this.state.currency} !`};
                                    this.setState({errors : formvalue});
                                }
                                    else {
                                        const formvalue = {...this.state.errors , ["listingrate"] : ""};
                                        this.setState({errors : formvalue});
                                    }
                                }
                                this.handledisable();
                                }} placeholder="0" aria-describedby="basic-addon2" />
                          
                        </InputGroup>
                        <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.listingrate}</span>
                    </div>
                    <div className='note_desc mt-1 mb-1'>
                    <p>1 {this.state.currency} = {this.state.presaleRate} {this.state.name}</p>
                    </div>
                        </div>  */}
                        <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>Pancakeswap Liquidity</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl id="liquidity" value={this.state.liquidityPercent} onChange={(e)=>{
                                if(!isFloat(e.target.value)){ 
                                    this.setState({ liquidityPercent: e.target.value });
                                    if(isNaN(e.target.value) || e.target.value <51 || e.target.value > 100){
                                        const formvalue = {...this.state.errors , ["liquidity"] : "Invalid Pancakeswap Liquidity !"};
                                        this.setState({errors : formvalue});
                                    } 
                                    else {
                                        const formvalue = {...this.state.errors , ["liquidity"] : ""};
                                        this.setState({errors : formvalue});
                                    }
                                    }
                                    this.handledisable();
                                    }} placeholder="0" aria-describedby="basic-addon2" />
                          
                        </InputGroup>
                        <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.liquidity}</span>
                    </div>
                        </div> 
                        </>:<></>}
                        {this.state.isPancake ?
                        <div className='col-12 col-md-12 mb-2'>
                        <div className='note_desc mt-1 mb-0'>
                    <p>Enter the percentage of raised funds that sholud be allocated to Liquidity on (Min 51%, Max 100%)</p>
                    <p>If I spend 1 BNB on how many tokens will I receive? Usually the amount is lower than presale rate to allow for a higher listing price on</p>
                    
                    </div>
                        </div> : <></>}
                        <div className='col-12 col-md-12 mb-0'>
                    <p className='input_desc_sm'>Select Start time & End time (UTC)*</p>
                    </div>
                    <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>Start Time (UTC)*</p>
                    <div className="inputs input-groups date_inoput_grps">
                        <InputGroup className="datepicker_input">
                        <DatePicker
                         minDate={new Date()}
                                                    filterTime={this.filterPassedTime.bind(this)}
                                                   showTimeSelect
                                                   selected={this.state.startDate}
                                                   onChange={(date)=> {
                                                    this.setState({startDate: date})
                                                    // if(Date.parse(date) < Date.now()){
                                                    //     let formData = { ...this.state.errors, ["startdate"]: "Start Time needs to be after now" };
                                                    //      this.setState({ errors: formData });
                                                    //   }
                                                    //   else{
                                                    //     let formData = { ...this.state.errors, ["startdate"]: "Start Time needs to be after now" };
                                                    //      this.setState({ errors: formData });
                                                    //   }
                                                      if(this.state.endDate){
                                                        if(Date.parse(date) > this.state.endDate){
                                                            let formData = { ...this.state.errors, ["startdate"]: "Start Time must be < End Time" };
                                                            this.setState({ errors: formData });
                                                        }
                                                        if(this.state.endDate > Date.parse(date)){
                                                            let formData = { ...this.state.errors, ["enddate"]: "" };
                                                            this.setState({ errors: formData });
                                                        }
                                                        // else{
                                                        //     let formData = { ...this.state.errors, ["startdate"]: "Start Time needs to be after now" };
                                                        //      this.setState({ errors: formData });
                                                        //   }
                                                      }
                                                      this.handledisable();
                                                }
                                            
                                            }
                                                   dateFormat="MMMM d, yyyy h:mm aa"
                                                 />
                          
                        </InputGroup>
                        <InputGroup.Append className='cur_pointer'>
                                <button variant="outline-secondary" className="trans_cal_btn">
                                <i class="far fa-calendar-alt"></i>
                                </button>
                            </InputGroup.Append>
                    </div>
                     <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.startdate}</span>
                        </div>
                        <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>End Time (UTC)*</p>
                    <div className="inputs input-groups date_inoput_grps">
                        <InputGroup className="datepicker_input">
                        <DatePicker
                                                 minDate={new Date()}
                                                 filterTime={this.filterPassedTime.bind(this)}
                                                   showTimeSelect
                                                   selected={this.state.endDate}
                                                   onChange={(date)=> {
                                                    this.setState({endDate: date});
                                                   
                                                    // if(Date.parse(date) > Date.now()){
                                                    //     let formData = { ...this.state.errors, ["enddate"]: "" };
                                                    //     this.setState({ errors: formData });
                                                    //   }
                                                    //   else{
                                                    //     let formData = { ...this.state.errors, ["enddate"]: "End Time needs to be after now" };
                                                    //      this.setState({ errors: formData });
                                                    //   }
                                                      if(this.state.startDate){
                                                        if(Date.parse(date) <= this.state.startDate){
                                                            let formData = { ...this.state.errors, ["enddate"]: "End Time must be > Start Time" };
                                                            this.setState({ errors: formData });
                                                        }
                                                        if(this.state.startDate < Date.parse(date)){
                                                            let formData = { ...this.state.errors, ["startdate"]: "" };
                                                            this.setState({ errors: formData });
                                                            let formdata = { ...this.state.errors, ["enddate"]: "" };
                                                             this.setState({ errors: formdata });
                                                        }
                                                        // else{
                                                        //     let formData = { ...this.state.errors, ["enddate"]: "" };
                                                        //      this.setState({ errors: formData });
                                                        //   }
                                                      }
                                                      this.handledisable();
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
                    <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.enddate}</span>
                        </div>  

                   

               <div className='col-12 col-md-12'>
               <div className="custom-control custom-checkbox">
  <input type="checkbox" checked={this.state.isVested} onChange={(e)=> this.setState({isVested : e.target.checked})} className="custom-control-input" id="customCheck1" />
  <label className="custom-control-label" for="customCheck1">Using Vesting Contributor?</label>
</div></div>  

{this.state.isVested ?
            <>
            <div className='col-12 col-md-12 mb-3 mt-4'>
                    <p className='input_desc_sm'>Vesting Period Days</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl id="liquiditylockingdays" value={this.state.vestInterval} onChange={(e)=>{
                                this.setState({ vestInterval: e.target.value });
                                var rx = new RegExp(/^\d+$/);
                                if(!rx.test(e.target.value)){
                                    const formvalue = {...this.state.errors , ["vestinterval"] : "Invalid Vesting Period Days !"};
                                    this.setState({errors : formvalue});
                                }
                                else{
                                    const formvalue = {...this.state.errors , ["vestinterval"] : ""};
                                    this.setState({errors : formvalue});
                                }
                                this.handledisable();
                            } }  placeholder=""
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                        <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.vestinterval}</span>
                    </div>
                        </div>

                        <div className='col-12 col-md-12 mb-3 mt-4'>
                    <p className='input_desc_sm'>Rewards % per Vesting Period</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl id="liquiditylockingdays"value={this.state.vestPercent} onChange={(e)=>{
                                if(!isFloat(e.target.value)){ 
                                    this.setState({ vestPercent: e.target.value }) ;
                                    if(isNaN(e.target.value) || e.target.value <0 || e.target.value > 100){
                                        const formvalue = {...this.state.errors , ["vestpercent"] : "Invalid Rewards % per Vesting Period !"};
                                        this.setState({errors : formvalue});
                                    } 
                                    else {
                                        const formvalue = {...this.state.errors , ["vestpercent"] : ""};
                                        this.setState({errors : formvalue});
                                    }
                                    this.handledisable();
                                }} }placeholder=""
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                        <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.vestpercent}</span>
                    </div>
                        </div>

               </>:<></>     }   



                    
                    <div className='col-12 col-md-12 text-center'>
                        <button className="get-started-btn mr-2" onClick={()=>{this.setState({ currentStep: 1})}}>
                           Back
                        </button>
                        <button className="get-started-btn"  onClick={()=>{
                            console.log("disable" , this.handledisable());
                            if( this.handledisable()){
                                
                            }
                            else{
                                this.setState({ currentStep: 3})
                            }
                            // else{
                            //     toast.error("")
                            // }
                            }}>
                           Next
                        </button>
                        </div>
                </div>
            </div>

            <div id="thirdstep" className={this.state.currentStep ==3 ? "d-block":"d-none"}>
            <div className='row'>
                <div className='col-12 col-md-12 mb-0'>
                        
                        <p className='input_desc_sm'>Logo URL*</p>
                        <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl id="file" value={this.state.logo} onChange={(e)=>{
                                this.setState({ logo: e.target.value });
                                if(urlvalidation(e.target.value)){
                                    const formvalue = {...this.state.errors , ["logo"] : ""};
                                    this.setState({errors : formvalue});
                                }
                                else{
                                    const formvalue = {...this.state.errors , ["logo"] : "Invalid Logo Url!"};
                                    this.setState({errors : formvalue});
                                }
                                this.handledisableurlbutton();
                            } } placeholder=""
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                        <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.logo}</span>
                    </div>
                        <div className='note_desc mt-1 mb-0'>
                    <p>URL must be end with a supported image extension .png, .jpg,</p>
                    </div>
                            </div>

                            <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>Website*</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl value={this.state.website} onChange={(e)=>{
                                this.setState({ website: e.target.value });
                                if(urlvalidation(e.target.value)){
                                    const formvalue = {...this.state.errors , ["website"] : ""};
                                    this.setState({errors : formvalue});
                                }
                                else{
                                    const formvalue = {...this.state.errors , ["website"] : "Invalid Website Url!"};
                                    this.setState({errors : formvalue});
                                }
                                this.handledisableurlbutton();
                            } } id="logolink1" placeholder="https://cryptolaunchpad.app"
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                        <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.website}</span>
                    </div>
                        </div>
                        <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>Facebook</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl  id="logolinkfb" placeholder="https://facebook.com"
                                aria-describedby="basic-addon2"
                                onChange={(e)=>{
                                    this.setState({"facebook" : e.target.value}); 
                                    if(urlvalidation(e.target.value)){
                                        const formvalue = {...this.state.errors , ["facebook"] : ""};
                                        this.setState({errors : formvalue});
                                    }
                                    else{
                                        const formvalue = {...this.state.errors , ["facebook"] : "Invalid Facebook Url!"};
                                        this.setState({errors : formvalue});
                                    }
                                    this.handledisableurlbutton();
                                }}
                            />
                          
                        </InputGroup>
                        <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.facebook}</span>
                    </div>
                        </div>

                        <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>Twitter</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl value={this.state.twitter} onChange={(e)=>{
                                this.setState({ twitter: e.target.value });
                                if(urlvalidation(e.target.value)){
                                    const formvalue = {...this.state.errors , ["twitter"] : ""};
                                    this.setState({errors : formvalue});
                                }
                                else{
                                    const formvalue = {...this.state.errors , ["twitter"] : "Invalid Twitter Url!"};
                                    this.setState({errors : formvalue});
                                }
                                this.handledisableurlbutton();
                            } } id="logolink2" placeholder="https://twitter.com"
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                        <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.twitter}</span>
                    </div>
                        </div>

                        <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>Github</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl id="logolinkgit" placeholder="https://github.com"
                                aria-describedby="basic-addon2"
                                onChange={(e)=>{
                                    this.setState({"github" : e.target.value})
                                    if(urlvalidation(e.target.value)){
                                        const formvalue = {...this.state.errors , ["github"] : ""};
                                        this.setState({errors : formvalue});
                                    }
                                    else{
                                        const formvalue = {...this.state.errors , ["github"] : "Invalid Github Url!"};
                                        this.setState({errors : formvalue});
                                    }
                                    this.handledisableurlbutton();
                                }}
                            />
                          
                        </InputGroup>
                        <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.github}</span>
                    </div>
                        </div>

                        <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>Telegram</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl value={this.state.telegram} onChange={(e)=>{
                                this.setState({ telegram: e.target.value });
                                if(urlvalidation(e.target.value)){
                                    const formvalue = {...this.state.errors , ["telegram"] : ""};
                                    this.setState({errors : formvalue});
                                }
                                else{
                                    const formvalue = {...this.state.errors , ["telegram"] : "Invalid Telegram Url!"};
                                    this.setState({errors : formvalue});
                                }
                                this.handledisableurlbutton();
                            } } id="logolink3" placeholder="https://telegram.com"
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                        <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.telegram}</span>
                    </div>
                        </div>

                        <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>Instagram</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl  id="logolinkinsta" placeholder="https://instagram.com"
                                aria-describedby="basic-addon2"
                                onChange={(e)=>{
                                    this.setState({instagram : e.target.value});
                                    if(urlvalidation(e.target.value)){
                                        const formvalue = {...this.state.errors , ["instagram"] : ""};
                                        this.setState({errors : formvalue});
                                    }
                                    else{
                                        const formvalue = {...this.state.errors , ["instagram"] : "Invalid Instagram Url!"};
                                        this.setState({errors : formvalue});
                                    }
                                    this.handledisableurlbutton();
                                }}
                            />
                          
                        </InputGroup>
                        <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.instagram}</span>
                    </div>
                        </div>

                        <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>Discord</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl  id="logolinkdiscord" placeholder="https://discord.com"
                                aria-describedby="basic-addon2"
                                onChange={(e)=>{
                                    this.setState({discord : e.target.value});
                                    if(urlvalidation(e.target.value)){
                                        const formvalue = {...this.state.errors , ["discord"] : ""};
                                        this.setState({errors : formvalue});
                                    }
                                    else{
                                        const formvalue = {...this.state.errors , ["discord"] : "Invalid Discord Url!"};
                                        this.setState({errors : formvalue});
                                    }
                                    this.handledisableurlbutton();
                                }}
                            />
                          
                        </InputGroup>
                        <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.discord}</span>
                    </div>
                        </div>
                        
                        <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>Reddit</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl  id="logolinkreddit" placeholder="https://reddit.com"
                                aria-describedby="basic-addon2"
                                onChange={(e)=>{
                                    this.setState({reddit : e.target.value});
                                    if(urlvalidation(e.target.value)){
                                        const formvalue = {...this.state.errors , ["reddit"] : ""};
                                        this.setState({errors : formvalue});
                                    }
                                    else{
                                        const formvalue = {...this.state.errors , ["reddit"] : "Invalid Reddit Url!"};
                                        this.setState({errors : formvalue});
                                    }
                                    this.handledisableurlbutton();
                                }}
                            />
                          
                        </InputGroup>
                        <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.reddit}</span>
                    </div>
                        </div>

                        <div className='col-12 col-md-12 mb-0'>
                    <p className='input_desc_sm'>Youtube Video</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl  id="logolinkyoutube" placeholder="https://youtube.com"
                                aria-describedby="basic-addon2"
                                onChange={(e)=>{
                                    this.setState({youtubevideo : e.target.value});
                                    if(urlvalidation(e.target.value)){
                                        const formvalue = {...this.state.errors , ["youtube"] : ""};
                                        this.setState({errors : formvalue});
                                    }
                                    else{
                                        const formvalue = {...this.state.errors , ["youtube"] : "Invalid Youtube Video Url!"};
                                        this.setState({errors : formvalue});
                                    }
                                    this.handledisableurlbutton();
                                }}
                            />
                          
                        </InputGroup>
                        <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.youtube}</span>
                    </div>

                    <div className='note_desc mt-1 mb-0'>
                    <p>Input your youtube URL</p>
                    </div>
                        </div>

                        <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>Description</p>
                    <div className="inputs input-groups text_are_grp">
                        <InputGroup className="" >
                            <textarea value={this.state.description} onChange={(e)=>{
                                this.setState({ description: e.target.value });
                                if(!e.target.value){
                                    const formvalue = {...this.state.errors , ["description"] : "Invalid Description!"};
                                    this.setState({errors : formvalue});
                                }
                                else{
                                    const formvalue = {...this.state.errors , ["description"] : ""};
                                    this.setState({errors : formvalue});
                                }
                                this.handledisableurlbutton();
                            } } id="description" rows="3"
                                aria-describedby="basic-addon2"
                                
                            />
                          
                        </InputGroup>
                        <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.description}</span>
                    </div>
                    </div>



                    
                    <div className='col-12 col-md-12 text-center'>
                        <button className="get-started-btn mr-2" onClick={()=>{this.setState({ currentStep: 2})}}>
                           Back
                        </button>
                        <button className="get-started-btn" onClick={()=>{
                            this.setState({ currentStep: 4});
                            this.calculateDepositTokens();
                        }}
                         disabled={this.state.button3}
                        >
                           Next
                        </button>
                        </div>
                </div>
            </div>

            <div id="fourthstep" className={this.state.currentStep ==4 ? "d-block":"d-none"}>
            <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
            {/* <span className='desc_grey_txt'>Deposit Token :</span>
            <span className='desc_grey_txt font_12'>{this.state.deposit} {this.state.name}</span> */}
            </p>

            {/* <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
            <span className='desc_grey_txt'>Factory Address :</span>
            <span className='desc_grey_txt font_12'>0xf4567uyht8956 
            <i class="fa fa-files-o pl-2 copy_hover" aria-hidden="true"></i>
            </span>
            </p> */}

            <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
            <span className='desc_grey_txt'>Token Name :</span>
            <span className='desc_grey_txt font_12'>{this.state.tokeninfo?.name ? this.state.tokeninfo?.name : ""}
            </span>
            </p>

            <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
            <span className='desc_grey_txt'>Token Symbol :</span>
            <span className='desc_grey_txt font_12'>{this.state.tokeninfo?.symbol ? this.state.tokeninfo?.symbol : ""}
            </span>
            </p>

            <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
            <span className='desc_grey_txt'>Token Decimals :</span>
            <span className='desc_grey_txt font_12'>{this.state.tokeninfo?.decimals ? this.state.tokeninfo?.decimals : ""}
            </span>
            </p>

            <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
            <span className='desc_grey_txt'>Presale Rate :</span>
            <span className='desc_grey_txt font_12'>{this.state.presaleRate ? this.state.presaleRate : ""} {this.state.symbol ? this.state.symbol : ""}
            </span>
            </p>

             

            <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
            <span className='desc_grey_txt'>Sale Method :</span>
            <span className='desc_grey_txt font_12'>{this.state.isWhitelisted === true ? "Public" : "Private" }
            </span>
            </p> 

            <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
            <span className='desc_grey_txt'>Softcap :</span>
            <span className='desc_grey_txt font_12'>{this.state.softCap ? this.state.softCap : " "} {this.state.currency ? this.state.currency : ""}
            </span>
            </p> 

            {/* <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
            <span className='desc_grey_txt'>Hardcap :</span>
            <span className='desc_grey_txt font_12'>{this.state.hardCap ? this.state.hardCap : " "} {this.state.currency ? this.state.currency : ""}
            </span>
            </p>  */}


            

            <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
            <span className='desc_grey_txt'>Minimum Buy :</span>
            <span className='desc_grey_txt font_12'>{this.state.min} {this.state.currency}
            </span>
            </p> 

            <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
            <span className='desc_grey_txt'>Maximum Buy :</span>
            <span className='desc_grey_txt font_12'>{this.state.max} {this.state.currency}
            </span>
            </p> 
{this.state.isPancake ? 


<>


{/* <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
            <span className='desc_grey_txt'>Listing Rate :</span>
            <span className='desc_grey_txt font_12'>{this.state.pancakeRate ? this.state.pancakeRate : ""} {this.state.name}
            </span>
            </p> */}
             <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
            <span className='desc_grey_txt'>Liquidity :</span>
            <span className='desc_grey_txt font_12'>{this.state.liquidityPercent}%
            </span>
            </p>   

            <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
            <span className='desc_grey_txt'>Liquidity Lockup Time :</span>
            <span className='desc_grey_txt font_12'>{this.state.unlockOn}
            </span>
            </p> 
            </> : <></>}

            <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
            <span className='desc_grey_txt'>Start Time :</span>
            <span className='desc_grey_txt font_12'>{this.state.startDate ? new Date(this.state.startDate).toLocaleDateString()+"  "
             +new Date(this.state.startDate).getHours()+":"+new Date(this.state.startDate).getMinutes()+":"
             +new Date(this.state.startDate).getSeconds()+"(GMT)"  : "" }
            </span>
            </p>   

            <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
            <span className='desc_grey_txt'>End Time :</span>
            <span className='desc_grey_txt font_12'>{this.state.endDate ? new Date(this.state.endDate).toLocaleDateString()+"  "
             +new Date(this.state.endDate).getHours()+":"+new Date(this.state.endDate).getMinutes()+":"
             +new Date(this.state.endDate).getSeconds()+"(GMT)"  : ""}
            </span>
            </p> 

           

            <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
            <span className='desc_grey_txt'>Website :</span>
            <span className='desc_grey_txt font_12'><a href="#" target="_blank" className='link_grn_new link_brk_word'>{this.state.website ? this.state.website : ""}</a>
            </span>
            </p> 
                   
            <div className='mb-4 mt-4'>
                            <div className='card_footer_form'>
                                <div className='d-flex align-items-center justify-content-center'>
                                <i class="fa fa-exclamation-circle text-danger-war" aria-hidden="true"></i>
                                <p className='mb-0 pl-3'>For tokens with burns, rebase or other special transfers please ensure that you have a way to whitelist multiple addresses or turn off the special transfer events (By setting fees to 0 for example for the duration of the presale)</p>
                                </div>

                            </div>
                        </div>
                       

                        {this.state.deposit > 0 ?
                        <div className='col-12'>
<div className='note_desc mt-1 mb-1 text-center'>
                    <p>Need {this.state.deposit} {this.state.name} to create launchpad.</p>
                    </div>
</div> : <></> }


                        <div className='col-12 col-md-12 text-center'>
                        <button className="get-started-btn mr-2" onClick={()=>{this.setState({ currentStep: 3})}}>
                           Back
                        </button>


                        {/* <Link to="/launchpaddetail" className="get-started-btn" onClick={()=>{this.setState({ currentStep: 3})}}>
                           Submit
                        </Link> */}
                        { !this.state.isDeposited ? 
                        (this.state.createdSale == '' ?
                        <a  onClick={() => this.CreateSale()} className="get-started-btn">
                           Create
                        </a> : 
                        this.renderDeposit()):<a onClick={this.goToSale.bind(this)} className="get-started-btn">Proceed to Sale</a>
                        }
                        </div>
                        </div>
                      
             </div>
             </div>
            </div>
            </div>
        

                
               
        </div>
           </div>
         </div>

        
         {tokenModal && <TokenModal connect={"string"} address = {(val)=>this.settokenaddress(val)} onDismiss={()=>this.onDismiss()} /> }
        
       </div>
     


    
       
      )
    }

}


export default CreatetabFair