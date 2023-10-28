import React, { Component } from 'react';
import { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

import Adminheader from './Adminheader';
import Adminsidebar from './Adminsidebar';
import Kycmodal from "./Kycmodal";


import Web3 from "web3";
import '../../css/styles.css';

import coin from "../../images/coin.png"
import favicon from "../../images/favicon.png"

import loader from "../../images/loader.gif"
import { Dropdown, Nav, Tab, Row, Col, Container, ProgressBar, InputGroup,Form } from 'react-bootstrap';
import { getallkychook } from '../../hooks/usebackend';
const cookies = new Cookies();
class Adminkyc extends Component {
   
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
      this.restrict();
      // this.showLoader();
     this.hideLoader();
     this.handlegetallkyc()
    }
  //  componentWillReceiveProps(nextprops){
  //   this.handlegetallkyc()
  //  }

  restrict = async()=>{
    var email = cookies.get('cryp-launch-admin-email');
    console.log("email" , email);
    if(!email){
      this.props.history.push("/login")
    }
  }
   
    constructor(props) {
      super(props);
      this.state = {  
        kycModal: false,
        kycdetails : [],
        singlekyc : {},
        skip : 0,
        limit : 10,
        pagecount : 0,
        button : 0,
        currentpage : 1,

        stepcount : 5
      };
    }

    handlegetallkyc = async()=>{
        let payload = {
          limit : this?.state?.limit ,
          skip : this.state.skip
        }
        let data = await getallkychook(payload);
        console.log("data" , data?.data?.data?.record);
        // if(data?.data?.data?.record != this.state.kycdetails)
        this.setState({"kycdetails" : data?.data?.data?.record})
        
        let counts = Math.ceil(data?.data?.data?.count/10);
        // this.setState({"count" : counts})
        this.setState({"pagecount" : counts})
        // console.log("counts" , counts , data?.data?.data?.count/10);
        // if(counts < 5){
        //   this.setState({"stepcount":counts})
        // }
    }

    handlenextpage = async()=>{
      let payload = {
        limit : this.state.limit,
        skip : this.state.skip + this.state.limit
      }
      let data = await getallkychook(payload);
        console.log("data" , data?.data?.data?.record);
        this.setState({"kycdetails" : data?.data?.data?.record})
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
      let data = await getallkychook(payload);
        console.log("data" , data?.data?.data?.record);
        this.setState({"kycdetails" : data?.data?.data?.record})
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
      
      let data = await getallkychook(payload);
        console.log("data" , data?.data?.data?.record);
        this.setState({"kycdetails" : data?.data?.data?.record})
      this.setState({"skip" :(parseInt(val)*10)-10 })
      
    }

    

    
    onDismiss(){
        this.setState({ kycModal: false });
        this.handlegetallkyc()
    }


    render() {
     

      const location = this.props.location.pathname.split('/')[1];

      const {kycModal } = this.state
      
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
                      <div className="col-12 col-md-12 flex_cen_col mt-md-5 mb-md-4">
                        <p className="banner_subtitle form_subhead">KYC List</p>

                       
                        {/* <hr className='hr_yellow mt-5'/> */}
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
      <th>Username</th>
      <th>Status</th>
    </tr>
    </thead>
    {this?.state?.kycdetails && this?.state?.kycdetails?.map((item , i)=> item?.proof?.length > 0 &&<>
      <tr>
      <td>
     
    
        <div className="p-0 table_det">
          <span className="table_text">{item?.walletaddress}</span>
    
      </div>
      </td>
      <td>{item?.proof[0]?.status}</td>
      <td className="d-flex justify-content-end"><a className="link_text" onClick={() => {
        this.setState({ kycModal: true });
        this.setState({"singlekyc" : item})
        }}>View</a></td>
      
    </tr>
    </>)}
    


    {/* <tr>
      <td>
     
    
        <div className="p-0 table_det">
          <span className="table_text">Chainscan</span>
    
      </div>
      </td>
      <td>Rejected</td>
      <td className="d-flex justify-content-end"><a className="link_text" onClick={() => this.setState({ kycModal: true })}>View</a></td>
      
    </tr>
    <tr>
      <td>
     
    
        <div className="p-0 table_det">
          <span className="table_text">Chainscan</span>
    
      </div>
      </td>
      <td>Approved</td>
      <td className="d-flex justify-content-end"><a className="link_text" onClick={() => this.setState({ kycModal: true })}>View</a></td>
      
    </tr> */}
   
  </table>
</div>
<div className="mt-2 d-flex justify-content-center align-items-center btn_pagin_wrap">
<button className="pagination_btn"
onClick={this.handleprevpage}
disabled ={this.state.currentpage == 1}
><i class="fa fa-angle-left" aria-hidden="true" 


></i></button>
{/* {[...Array(this.state.stepcount)].map((val,i)=>{
  if((this.state.button+i+1) <=this.state.pagecount)
    return(
<button className="pagination_btn" value = {this.state.button+i+1} onClick={
    (e)=>{
      console.log("e" , e?.target?.value);
      this.handlenumpage(e?.target?.value)
    }
    }>{this.state.button+i+1}</button>
    )
  
})} */}
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


  {/* <button className="pagination_btn" value = {this.state.button+1} onClick={
    (e)=>{
      console.log("e" , e?.target?.value);
      this.handlenumgetallkyc(e?.target?.value)
    }
    // this.handlenumgetallkyc
    }>{this.state.button+1}</button>
  <button className="pagination_btn"value = {this.state.button+2} onClick={
    (e)=>{
      console.log("e" , e?.target?.value);
      this.handlenumgetallkyc(e?.target?.value)
    }}
  >{this.state.button+2}</button>
  <button className="pagination_btn"value = {this.state.button+3} onClick={
    (e)=>{
      console.log("e" , e?.target?.value);
      this.handlenumgetallkyc(e?.target?.value)
    }}
  >{this.state.button+3}</button>
  <button className="pagination_btn"value = {this.state.button+4} onClick={
    (e)=>{
      console.log("e" , e?.target?.value);
      this.handlenumgetallkyc(e?.target?.value)
    }}
  
  >{this.state.button+4}</button>
  <button className="pagination_btn"value = {this.state.button+5} onClick={
    (e)=>{
      console.log("e" , e?.target?.value);
      this.handlenumgetallkyc(e?.target?.value)
    }}
  
  >{this.state.button+5}</button> */}

  
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
            {kycModal && <Kycmodal detail = {this.state.singlekyc} onDismiss={()=>this.onDismiss()} /> }
            {/* <Footer /> */}
        </div>
        </div>
        )
    }
}

export default Adminkyc