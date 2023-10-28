import React, { Component } from 'react';
import { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

import Adminheader from './Adminheader';
import Adminsidebar from './Adminsidebar';
import Editsettingmodal from "./Editsettingmodal";
import Addsettingmodal from "./Addsettingmodal";


import Web3 from "web3";
import '../../css/styles.css';

import coin from "../../images/coin.png"
import favicon from "../../images/favicon.png"

import loader from "../../images/loader.gif"
import { Dropdown, Nav, Tab, Row, Col, Container, ProgressBar, InputGroup,Form } from 'react-bootstrap';
import { getsettinghook } from '../../hooks/usebackend';

const cookies = new Cookies();
class Adminsettings extends Component {
   
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
      this.restrict()
      // this.showLoader();
     this.hideLoader();

      this.getsetting()
  
    }

    restrict = async()=>{
      var email = cookies.get('cryp-launch-admin-email');
      console.log("email" , email);
      if(!email){
        this.props.history.push("/login")
      }
    }
    
    getsetting = async()=>{
      let payload = {
        skip : this.state.skip,
        limit : this.state.limit
      }
      let setting = await getsettinghook(payload);
      console.log("setting" , setting?.data?.data);
      this.setState({"settings" : setting?.data?.data});
      let count = Math.ceil(setting?.data?.count / this.state.limit)
      this.setState({"pagecount" : count});
      // if(count < 5){
      //   this.setState({"stepcount" : count})
      // }
    }


    handlenextpage = async()=>{
      let payload = {
        limit : this.state.limit,
        skip : this.state.skip + this.state.limit
      }
      let result = await getsettinghook(payload);
      this.setState({"settings" : result?.data?.data})
      if(this.state.currentpage %5 == 0){
        this.setState({"button" : this.state.button + 5})
        // if(this.state.pagecount )
      }
      this.setState({"skip" : this.state.skip + this.state.limit})
      this.setState({"currentpage" : this.state.currentpage+1})
    }

    handleprevpage = async()=>{
      let payload = {
        limit : this.state.limit,
        skip : this.state.skip - this.state.limit
      }
      let result = await getsettinghook(payload);
      this.setState({"settings" : result?.data?.data})
      if((this.state.currentpage-1) %5 == 0){
        this.setState({"button" : this.state.button - 5})
        // if(this.state.pagecount )
      }
      this.setState({"skip" : this.state.skip - this.state.limit});
      this.setState({"currentpage" : this.state.currentpage-1});
    }

    handlenumpage = async(val) => {
      this.setState({"currentpage" : parseInt(val)})
      let payload = {
        limit : this.state.limit,
        skip : (parseInt(val)*10)-10
      }
      
      let result = await getsettinghook(payload);
      this.setState({"settings" : result?.data?.data})
      this.setState({"skip" :(parseInt(val)*10)-10 })
      
    }
   
    constructor(props) {
      super(props);
      this.state = {  
        editsettingModal: false,
        addsettingModal: false,
        settings : [],
        singlesetting : {},
        
        skip : 0,
        limit : 10,
        pagecount : 0,
        button : 0,
        currentpage : 1,

        stepcount : 5
      };
    }
    
    onDismiss(){
        this.setState({ editsettingModal: false });
    }

    onDismissAdd(){
        this.setState({ addsettingModal: false });
    }

    render() {
     

      const location = this.props.location.pathname.split('/')[1];

      const {editsettingModal,addsettingModal } = this.state
      
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
               <div className='ongoing_sec proj_bg pb-5'>
            <div className="container px-1">
                <div className='top_heqad_sec mt-5 mt-md-0'>
                   
                  <div className="row">
                      <div className="col-12 col-md-6 flex_cen_col mt-md-5 mb-md-4">
                        <p className="banner_subtitle form_subhead">Settings List</p>



                       
                        {/* <hr className='hr_yellow mt-5'/> */}
                      </div>
                      <div className="col-12 col-md-6 flex_cen_col mt-md-5 mb-md-4">
                        <div className='text-right'>
            <button className="get-started-btn btn_width_auto" onClick={() => this.setState({ addsettingModal: true })}>Add</button>
            </div>
                        </div>
                    
                  </div>
                </div>
            </div>
           
            <div className="inner_bg">
            <div className="container px-1">
            <Tab.Container  defaultActiveKey="second">
  <Row className="container-fluid w-100 mx-0 px-0">
 

    <Col lg={12} className="img_center_lg px-0">
    <div className='container container_custom px-0'>
      <Tab.Content>
      
        <Tab.Pane eventKey="second">
               
        <div class="table-responsive">
  <table className="table recepients_table">
    <thead>
    <tr>
      <th>Setting Name</th>
      <th>Setting Value</th>
    </tr>
    </thead>
    {this.state.settings && this.state.settings?.map((data , i)=><>
      <tr>
      <td>
     
    
        <div className="p-0 table_det">
          <span className="table_text">{data.settingname}</span>
    
      </div>
      </td>
      <td>{data.settingvalue}</td>
      <td className="d-flex justify-content-end"><a className="link_text" onClick={() => {
        this.setState({"singlesetting" : data})
        this.setState({ editsettingModal: true });
      }
        }>Edit</a></td>
      
    </tr>
    </>
    )}
    


    {/* <tr>
      <td>
     
    
        <div className="p-0 table_det">
          <span className="table_text">Lorem Ipsum</span>
    
      </div>
      </td>
      <td>Lorem Ipsum</td>
      <td className="d-flex justify-content-end"><a className="link_text" onClick={() => this.setState({ editsettingModal: true })}>Edit</a></td>
      
    </tr>
    <tr>
      <td>
     
    
        <div className="p-0 table_det">
          <span className="table_text">Lorem Ipsum</span>
    
      </div>
      </td>
      <td>Lorem Ipsum</td>
      <td className="d-flex justify-content-end"><a className="link_text" onClick={() => this.setState({ editsettingModal: true })}>Edit</a></td>
      
    </tr> */}
   
  </table>
</div>
<div className="mt-2 d-flex justify-content-center align-items-center btn_pagin_wrap">
<button className="pagination_btn"
onClick = {this.handleprevpage}
disabled ={this.state.currentpage == 1}
><i class="fa fa-angle-left" aria-hidden="true"

></i></button>
  
  
{[...Array(this.state.stepcount)].map((val,i)=>{
  if((this.state.button+i+1) <=this.state.pagecount)
  return(
  <button className={this.state.currentpage==(this.state.button+i+1)?"pagination_btn active" : "pagination_btn"} value = {this.state.button+i+1} onClick={
    (e)=>{
      console.log("e" , e?.target?.value);
      this.handlenumpage(e?.target?.value)
    }
    }>{this.state.button+i+1}</button>
)
}

)}
  
  
  {/* <button className="pagination_btn">2</button>
  <button className="pagination_btn">3</button>
  <button className="pagination_btn">4</button>
  <button className="pagination_btn">5</button> */}
  <button className="pagination_btn"
  onClick={this.handlenextpage}
  disabled ={this.state.currentpage == this.state.pagecount}
  ><i class="fa fa-angle-right" aria-hidden="true"
  
  ></i></button>
</div>
        </Tab.Pane>
     
       
      </Tab.Content>
      </div>
    </Col>
  </Row>
</Tab.Container>

              
                </div>
            </div>
            </div>
            {/* end ongoing_sec */}

            </div>
            </div>
            </div>
            </div>
            {editsettingModal && <Editsettingmodal data = {this.state.singlesetting} onDismiss={()=>this.onDismiss()} getset = {()=>this.getsetting()}/> }
            {addsettingModal && <Addsettingmodal onDismiss={()=>this.onDismissAdd()}  getset = {()=>this.getsetting()}/> }


            {/* <Footer /> */}
        </div>
        </div>
        )
    }
}

export default Adminsettings