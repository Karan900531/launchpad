import React, { Component } from 'react';
import { useContext, useEffect, useState } from "react";
import isEmpty from "is-empty";

import Validator from "validator";
import Header from '../Header';
import Sidebar from '../Sidebar';
import Trendingslider from '../trendingslider';
import Walletmodal from "../Walletmodal";
import folderimage from "../../images/folder_zip.png";


import { getAccount } from '../../hooks/useAccount'





import {  Container, FormControl, InputGroup } from 'react-bootstrap';
import '../../css/styles.css';

import favicon from "../../images/favicon.png"
import proof from "../../images/proof.webp"
import { Link } from 'react-router-dom';
import { kycvalid } from '../../hooks/kycvalidation';
import { getkychook, uploadkychook } from '../../hooks/usebackend';
import { API_URL } from '../../config/env';
// import Walletmodal from "../Walletmodal";
// import *as valid from '../../hooks/kycvalidation';

class Kyc extends Component {
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
      this.hideLoader();
      this.handlegetkyc()
    //    this.setState({ accountInfo: getAccount() });

    var account = getAccount();
    if(!account ){
      // console.log("sessionStorage.getItem" , kyc)
      this.props.history.push("/");
    }
    }


    async fetchdata1(){
  if(!await window?.ethereum?._metamask.isUnlocked() || !localStorage.getItem("accountInfo") || !sessionStorage.getItem("accountInfo")){
    this.setState({walletModal : true})
  }

}

    constructor(props) {
        super(props);
        this.state = {          
            walletModal: false,
            accountInfo: localStorage.getItem("accountInfo"),
            front : '',
            back : '',
            idtype : '',
            idnumber : '',
            frontview : '',
            backview : '',
            address : '',
            kyc : {},
            errors: {}
        };
    }

    // componentDidUpdate(){
    //   console.log("data");
    //   this.handlegetkyc()
    // }

    handlegetkyc = async()=>{
      if(isEmpty(this.state.kyc)){
        let walletaddress = localStorage.getItem("accountInfo")?localStorage.getItem("accountInfo") : "";
        let result = await getkychook(walletaddress.toLowerCase());
        console.log("result" , result?.data?.data);
        if(result?.data?.data?.record?.status == 'Approved' || result?.data?.data?.record?.status == "Pending"){
          this.setState({kyc : result?.data?.data?.record})
        }
      }
    }
    handlesubmit = async()=>{
      let payload = {
        walletaddress : localStorage.getItem("accountInfo").toLowerCase(),
        idtype : this.state.idtype,
        idnumber : this.state.idnumber,
        address : this.state.address,
        front : this.state.front,
        back : this.state.back
      }
      var validate = await kycvalid(payload);
      if(validate.isValid){
        this.showLoader();
        let result = await uploadkychook(payload)
        this.handlegetkyc()
        this.hideLoader()
      }
      else{
        this.setState({errors : validate.errors})
        console.log("error" , validate.errors);
      }
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
                  { isEmpty(this.state.kyc)  && <>
                <div className='col-12 col-md-12 mb-3'>
                        
                        <p className='input_desc_sm'>1. Proof of Identity</p>
                        <p className='desc_grey_txt'>Please upload a clear, readable copy of any of the following:</p>
                    
                        <div className='note_desc mt-1 mb-0'>
                    <p>Document must be a supported  extension .zip</p>
                    </div>
                            </div>
                <div className='col-12 col-md-12 mb-3'>
                        
                        <p className='input_desc_sm'>Select Document Type</p>
                        <div className="inputs input-groups">
                        <select className="form-control custm_sel" id="exampleFormControlSelect3" 
                          value={this.state.idtype}
                          onChange = {(e)=>{
                            this.setState({'idtype' : e.target.value})
                          }}
                        >
                        <option value=''>Select Document Type</option>
                        <option value = 'Voter ID'>Voter ID</option>  
                        <option value = 'Aadhar Card'>Aadhar Card</option>                       
                        <option value = 'Driving License'>Driving License</option>                       

                        </select>
                        <span className="text-danger">{this.state.errors.idtype}</span>
                    </div>                      
                            </div>

                            <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>ID Number</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl id="idnumber" placeholder=""
                                aria-describedby="basic-addon2"
                                value={this?.state?.idnumber}
                                onChange = {(e)=>{
                                  this.setState({'idnumber' : e.target.value}, ()=>console.log("idtype" , this.state.idnumber))
                                }}
                            />
                          
                        </InputGroup>
                        <span className="text-danger">{this.state.errors.idnumber}</span>
                    </div>
                        </div>

                <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>Address</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl id="address" placeholder=""
                                aria-describedby="basic-addon2"
                                value={this.state.address}
                                onChange={(e)=>{
                                  this.setState({"address" : e.target.value});
                                }}
                            />
                          
                        </InputGroup>
                        <span className="text-danger">{this.state.errors.address}</span>
                    </div>
                </div>

                        <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>Upload Document in zipfile</p>
                    <div className="inputs input-groups">
                        <InputGroup className="file_grp_input" 
                            onChange={(e)=>{
                              this.setState({'front' : e.target.files[0]});
                              this.setState({'frontview' : URL.createObjectURL(e.target.files[0])})
                            }}
                        >
                        <div className="w-100">
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" />
                        <label className="custom-file-label mb-0" for="inputGroupFile04">
                          { this.state.front ? this.state.front.name :"Choose file"}</label>
                    </div>
                    
                    </div>
                          
                        </InputGroup>
                        <span className="text-danger">{this.state.errors.front}</span>
                    </div>
                        </div>
                        {/* <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>Back Side</p>
                    <div className="inputs input-groups">
                        <InputGroup className="file_grp_input"
                          onChange={(e)=>{
                            this.setState({'back' : e.target.files[0]});
                            this.setState({'backview' : URL.createObjectURL(e.target.files[0])})
                          }}
                        >
                        <div className="w-100">
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" id="inputGroupFile05" aria-describedby="inputGroupFileAddon04" />
                        <label className="custom-file-label mb-0" for="inputGroupFile04">Choose file</label>
                    </div>
                    
                    </div>
                          
                        </InputGroup>
                        <span className="text-danger">{this.state.errors.back}</span>
                    </div>
                        </div> */}
                        {/* <div className='col-12 col-sm-6 mb-3 mt-1'>
                        <p className='input_desc_sm'>Front Side Image</p>
                        <div className="icon_align_border">
                        <img src={this.state.frontview ? this.state.frontview : proof} className="img-fluid p-3" />
                        </div>
                        </div>
                        <div className='col-12 col-sm-6 mb-3 mt-1'>
                        <p className='input_desc_sm'>Back Side Image</p>
                        <div className="icon_align_border">
                        <img src={this.state.backview ? this.state.backview : proof} className="img-fluid p-3" />
                        </div>
                        </div> */}
                        </>}
                  

                  {!isEmpty(this.state.kyc) && <>
                        <div className='col-12 col-md-12 mb-3'>
                        
                        <p className='input_desc_sm'>1. Proof of identity</p>
                        <p className='desc_grey_txt'>Please upload a clear, readable copy of any of the following:</p>
                    
                        <div className='note_desc mt-1 mb-0'>
                    <p>Images must be a supported image extension .png, .jpg, .jpeg Max 3MB</p>
                    </div>
                            </div>
                <div className='col-12 col-md-12 mb-3'>
                        
                        <p className='input_desc_sm'>Select Document Type</p>
                        <div className="inputs input-groups">
                        <select className="form-control custm_sel" id="exampleFormControlSelect3"
                        value= {this.state.kyc.idtype}
                        disabled="disabled"
                        >
                        <option>Voter ID</option>  
                        <option>Aadhar Card</option>                       
                        <option>Driving License</option>                       

                        </select>
                    </div>                      
                            </div>

                <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>ID Number</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl id="idnumber" placeholder=""
                                aria-describedby="basic-addon2"
                                value={this?.state?.kyc?.idnumber}
                                readOnly = {true}
                            />
                          
                        </InputGroup>
                    </div>
                </div>

                            <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>Address</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl id="address" placeholder=""
                                aria-describedby="basic-addon2"
                                value= {this.state.kyc.address}
                                readOnly = {true}
                            />
                          
                        </InputGroup>
                    </div>
                        </div>

                        <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>Uploaded Document in zipfile</p>
                    <div className="inputs input-groups">
                    <a href={API_URL +"/"+ this.state.kyc.path +"/"+ this.state.kyc.image} download >
                    {/* <a href={"/images/myw3schoolsimage.jpg"} download> */}
                    <img src={folderimage} alt="W3Schools" width="104" height="142"></img>

                    </a>
                        {/* <InputGroup className="file_grp_input" 
                            onChange={(e)=>{
                              this.setState({'front' : e.target.files[0]});
                              // this.setState({'frontview' : URL.createObjectURL(e.target.files[0])})
                            }}
                        >
                        <div className="w-100">
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" />
                        <label className="custom-file-label mb-0" for="inputGroupFile04">
                          {/* { this.state.front ? this.state.front.name :"Choose file"} */}
                          {/* </label>
                    </div>
                    
                    </div>
                          
                        </InputGroup> */} 
                        <span className="text-danger">{this.state.errors.front}</span>
                    </div>
                        </div>
                        
                   
                        {/* <div className='col-12 col-sm-6 mb-3 mt-1'>
                        <p className='input_desc_sm'>Front Side Image</p>
                        <div className="icon_align_border">
                          {console.log("API_URL + this.state.kyc.path + this.state.kyc.image[0]" , API_URL + this.state.kyc.path + this.state.kyc.image[0])}
                          <img src={API_URL + this.state.kyc.path + this.state.kyc.image[0]} className="img-fluid p-3" />
                        </div>
                        </div>                    

                    <div className='col-12 col-sm-6 mb-3 mt-1'>
                        <p className='input_desc_sm'>Back Side Image</p>
                        <div className="icon_align_border">
                        <img src={API_URL + this.state.kyc.path + this.state.kyc.image[1]} className="img-fluid p-3" />
                        </div>
                    </div> */}
                    </>}
                    <div className='col-12 col-md-12 text-center mt-3'>                   
                        <button className="get-started-btn" onClick={this.handlesubmit}
                          disabled = {this.state.kyc.status == "Approved" || this.state.kyc.status == "Pending"}
                        >
                           {this.state.kyc.status?this.state.kyc.status: "Apply" }
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

export default Kyc