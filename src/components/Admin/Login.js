import React, { Component } from "react";
import { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import Header from "../Header";
import Sidebar from "../Sidebar";
import Cookies from 'universal-cookie';

import "../../css/styles.css";

import logo_grad from "../../images/logo_grad.png";


import {
  Container,
  Row,
  Col,
  Card,
  ProgressBar,
  InputGroup,
  FormControl,
  Tab,
  Nav
} from "react-bootstrap";
import { validatelogin } from "../../hooks/kycvalidation";
import { loginhook } from "../../hooks/usebackend";
import toast from "react-hot-toast";
const cookies = new Cookies();
class Login extends Component {
  
 
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
      email : "",
      password : "",
      passwordeye : false,
      errors : {}
    };
   
  }

  componentDidMount(){
    this.restrict();
  }

  restrict = async()=>{
    var email = cookies.get('cryp-launch-admin-email');
    console.log("email" , email);
    if(email){
      this.props.history.push("/adminlaunchpad")
    }
  }
  
   showPassword = (e) => {

    var e = document.getElementById("password");
    if (e.type === "password") {
        this.setState({"passwordeye" : true})
        e.type = "text";
    } else {
      this.setState({"passwordeye" : false})
        e.type = "password";
    }
};

handlelogin = async()=>{
  let payload = {
    email : this.state.email,
    password : this.state.password
  }

  let validate = await validatelogin(payload);
  if(validate.isValid){
    var loged = await loginhook(payload);
    if(loged?.data?.data?.success == "false" || !loged?.data?.data?.success){
      toast.error("Invalid Credential!")
    }else {
      console.log("loginhook" , loged);
      window.location.href = window.location.origin + "/adminlaunchpad"
    }
   
  }
  else{
    this.setState({"errors" : validate?.errors})
  }
}




  render() {
 

    return (
      <div id="loader_main">
      
        <div className="logo_overlay" id="logo_overlay" style={{opacity:1}}>
          {/* <Header /> */}

          <div className="whole_sec pb-5">
            <div>
          
            <Container className="container">
                  <div className="coming_soon login_text">
                  <div className='row'>
           <div className='col-10 col-sm-8 col-md-8 col-lg-9 mx-auto'>
            <div className="text-center">
                   <img src={logo_grad} className="img-fluid logo_grad_width" />
                   </div>
                   <div className='card_bg card mt-5'>
            <div className='card-body'>
            <div className='row'>

<div className='col-12 col-md-12 mb-3'>
        
        
        <p class="text-white">Login</p>
        <hr class="hr_green mb-0"></hr>       
      
            </div>
         

      <div className='col-12 col-md-12 mt-3 mb-0'>
        
        <p className='input_desc_sm'>Email Address</p>
        <div className="inputs input-groups">
        <InputGroup className="">
            <FormControl id="email" placeholder="Enter your email"
                aria-describedby="basic-addon2"
                onChange={(e)=>{
                  this.setState({"email" : e?.target?.value})
                }}
            />
          
        </InputGroup>
        <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.email}</span>
    </div>   
            </div>


            <div className='col-12 col-md-12 mt-3 mb-0'>
        
        <p className='input_desc_sm'>Password</p>
        <div className="inputs input-groups">
        <InputGroup className="">
        <InputGroup.Text ><span className='fa fa-key'></span></InputGroup.Text>
            <FormControl id="password" placeholder="Enter your password" type = "password"
                aria-describedby="basic-addon2"
                onChange={(e)=>{
                  this.setState({"password" : e?.target?.value})
                }}
            />
          {!this.state.passwordeye ? 
        <InputGroup.Text><span className='fa fa-eye-slash' onClick={this.showPassword}></span></InputGroup.Text>
        :<InputGroup.Text><span className='fa fa-eye' onClick={this.showPassword}></span></InputGroup.Text>
        }
        </InputGroup>
        <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.password}</span>
    </div>
    
            </div>

           
            <center className='mt-4 mx-auto'>
            <button className="get-started-btn mr-3" onClick={this.handlelogin}>Login</button>
            </center>
</div>
                </div>
                </div>
                </div>
                </div>
                  </div>                
                </Container>
            </div>
          </div>
          {/* <Footer /> */}
        </div>
      </div>
    );
  }
}

export default Login;
