import React, { Component } from 'react';
import { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';


import Adminheader from './Adminheader';
import Adminsidebar from './Adminsidebar';
import Cookies from 'universal-cookie';



import '../../css/styles.css';

import favicon from "../../images/favicon.png"

import loader from "../../images/loader.gif"
import { InputGroup,FormControl } from 'react-bootstrap';
import { getsettinghook } from '../../hooks/usebackend';
import { GetAdminfee, SetDeploymentfee, SetTokenfee, SetUserfee } from '../../hooks/useContract';
const cookies = new Cookies();
class Adminlaunchpadsettings extends Component {
   
  showLoader()
  {
    document.getElementsByTagName("body")[0].classList.add("overflow_hidden");
    document.getElementById("logo_overlay").style.opacity = 0.5;
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
     this.hideLoader();
     this.getfee();
     this.restrict();
    }

    restrict = async()=>{
      var email = cookies.get('cryp-launch-admin-email');
      console.log("email" , email);
      if(!email){
        this.props.history.push("/login")
      }
    }

    async getfee(){
      var fee = await GetAdminfee();
      console.log("fee" , fee);
      this.setState({deploymentfee : fee.deploymentfee/10**18});
      this.setState({tokenfee : fee.tokenfee/10**18});
      this.setState({userfee : fee.liquidityTokenFee/10**18});
    }

    async settokenFee(value){
      await SetTokenfee(value)
    }

    constructor(props) {
      super(props);
      this.state = {
        deploymentfee : 0,
        tokenfee : 0,
        userfee : 0
      }
    }

    render() {
     

      const location = this.props.location.pathname.split('/')[1];


      
	return (
    <div id="loader_main">
    <div id="loader_div">
    <span className="spin_round">

    </span>
    <img src={favicon} className="logo_load" />
  </div>
        <div className='logo_overlay' id="logo_overlay">
      

           <Adminheader />
        
           <div className="whole_sec pb-5">
            <div className='flex_side_right'>
            <Adminsidebar />
           {/* ongoing_sec */}
           <div className='right_side_sec'>
        
              <div className="right_side_spacing">
              <div className='ongoing_sec pb-5 admn_form'>
            <div className="container px-0">
                <div className='top_heqad_sec mt-5 mt-md-0'>
                   
                  <div className="row">
                      <div className="col-12 col-md-12 flex_cen_col mt-md-5 mb-md-4">
                        <p className="banner_subtitle form_subhead">Launchpad Settings</p>



                       
                      
                      </div>
                      
                        </div>

                        <div className='row'>
           <div className='col-12 col-md-10 col-lg-9 mx-auto'>
           <div className="tab_img">
                 <div className='card_bg card'>
            <div className='card-body'>
            <div className='row'>
                            <div className='col-12'>
                            <p className='input_desc_sm'>Pool Creation Fee</p>
                        <div className="inputs input-groups noearp_input_admin">
                        <InputGroup className="datepicker_input">
                        <FormControl id="price" placeholder="Enter Price"
                                aria-describedby="basic-addon2"
                               onChange={(e)=>{this.setState({deploymentfee : e?.target?.value})}}
                                value = {this.state.deploymentfee}
                            />
                              <InputGroup.Text id="basic-addon2">
                              <button className="get-started-btn"
                                onClick={()=>{SetDeploymentfee(this.state.deploymentfee)}}
                              >
                                Update
                                </button>
                                </InputGroup.Text>
                          
                        </InputGroup>
                            </div>
                            </div>
                            <div className='col-12 mt-3'>
                            <p className='input_desc_sm'>Liquidity Token Creation Fee</p>
                        <div className="inputs input-groups noearp_input_admin">
                        <InputGroup className="datepicker_input">
                        <FormControl id="tokenaddres" placeholder="Enter Token Address"
                                aria-describedby="basic-addon2"
                                onChange={(e)=>{this.setState({userfee : e?.target?.value})}}
                                value = {this.state.userfee}
                            />
                              <InputGroup.Text id="basic-addon2">
                              <button className="get-started-btn"
                                onClick={()=>{SetUserfee(this.state.userfee)}}
                              >
                                Update
                                </button>
                                </InputGroup.Text>
                          
                        </InputGroup>
                            </div>
                            </div>
                            <div className='col-12 mt-3'>
                            <p className='input_desc_sm'>Token Creation Fee</p>
                        <div className="inputs input-groups noearp_input_admin">
                        <InputGroup className="datepicker_input">
                        <FormControl id="mincontribution" placeholder="Enter Minimum Contribution"
                                aria-describedby="basic-addon2"
                                onChange={(e)=>{this.setState({tokenfee : e?.target?.value})}}
                                value = {this.state.tokenfee}
                            />
                              <InputGroup.Text id="basic-addon2">
                              <button className="get-started-btn"
                                onClick={()=>{this.settokenFee(this.state.tokenfee)}}
                              >
                                Update
                                </button>
                                </InputGroup.Text>
                          
                        </InputGroup>
                            </div>
                            </div>
                            {/* <div className='col-12 mt-3'>
                            <p className='input_desc_sm'>Maximum Contribution for USDT*</p>
                        <div className="inputs input-groups noearp_input_admin">
                        <InputGroup className="datepicker_input">
                        <FormControl id="maxcontribution" placeholder="Enter Maximum Contribution"
                                aria-describedby="basic-addon2"
                               
                                
                            />
                              <InputGroup.Text id="basic-addon2">
                              <button className="get-started-btn">
                                Update
                                </button>
                                </InputGroup.Text>
                          
                        </InputGroup>
                            </div>
                            </div>

                            <div className='col-12 mt-3'>
                            <p className='input_desc_sm'>Hard Cap for USDT*</p>
                        <div className="inputs input-groups noearp_input_admin">
                        <InputGroup className="datepicker_input">
                        <FormControl id="hardcap" placeholder="Enter Hard Cap"
                                aria-describedby="basic-addon2"
                               
                                
                            />
                              <InputGroup.Text id="basic-addon2">
                              <button className="get-started-btn">
                                Update
                                </button>
                                </InputGroup.Text>
                          
                        </InputGroup>
                            </div>
                            </div>

                            <div className='col-12 mt-3'>
                            <p className='input_desc_sm'>Deposit Token*</p>
                        <div className="inputs input-groups noearp_input_admin">
                        <InputGroup className="datepicker_input">
                        <FormControl id="deposittoken" placeholder="Enter Deposit Token"
                                aria-describedby="basic-addon2"
                               
                                
                            />
                              <InputGroup.Text id="basic-addon2">
                              <button className="get-started-btn">
                                Update
                                </button>
                                </InputGroup.Text>
                          
                        </InputGroup>
                            </div>
                            </div> */}
{/* 
                            <div className='col-12 col-md-12 text-center mt-4'>                   
                        <button className="get-started-btn">
                          Submit
                        </button>
                        </div> */}
                        </div>
                </div>
                </div>
                </div>
                </div>
                </div>
               
                       
                        </div>
                        </div>
                        </div>
            {/* end ongoing_sec */}

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

export default Adminlaunchpadsettings