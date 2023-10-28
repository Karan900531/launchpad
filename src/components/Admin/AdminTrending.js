import React, { Component } from 'react';
import { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

import Adminheader from './Adminheader';
import Adminsidebar from './Adminsidebar';
import EditTrendingModal from "./EditTrendingModal";
import AddTrendingModal from "./AddTrendingModal";


import Web3 from "web3";
import '../../css/styles.css';

import coin from "../../images/coin.png"
import favicon from "../../images/favicon.png"

import loader from "../../images/loader.gif"
import { Dropdown, Nav, Tab, Row, Col, Container, ProgressBar, InputGroup,Form } from 'react-bootstrap';
import { getsettinghook, gettrendinghook } from '../../hooks/usebackend';
const cookies = new Cookies();

class AdminTrending extends Component {
   
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

      this.gettrending()
  
    }

    restrict = async()=>{
      var email = cookies.get('cryp-launch-admin-email');
      console.log("email" , email);
      if(!email){
        this.props.history.push("/login")
      }
    }

    gettrending = async( req , res) => {
      let payload = {
        skip : this.state.skip,
        limit : this.state.limit
      }
      
      let trending = await gettrendinghook(payload);
      if(trending.data.success == true || trending.data.success == "true"){
      console.log("trending result" , trending);
      this.setState({trending : trending.data.data})
      // let count = Math.ceil(trending?.data?.count / this.state.limit)
      // this.setState({"pagecount" : count});
      }
      let count = Math.ceil(trending?.data?.count / this.state.limit)
      this.setState({"pagecount" : count});
    }
  
   
  

    constructor(props) {
      super(props);
      this.state = {  
        edittrendingModal: false,
        addtrendingModal: false, 
        trending : [],
        singletrending : {},
        skip : 0,
        limit : 10,
        pagecount : 0,
        button : 0,
        currentpage : 1,

        stepcount : 5    
      };
    }
    
    onDismiss(){
        this.setState({ edittrendingModal: false });
    }

    onDismissAdd(){
        this.setState({ addtrendingModal: false });
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

    render() {
     

      const location = this.props.location.pathname.split('/')[1];

      const {edittrendingModal,addtrendingModal } = this.state
      
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
                        <p className="banner_subtitle form_subhead">OnTop List</p>



                       
                        {/* <hr className='hr_yellow mt-5'/> */}
                      </div>
                      <div className="col-12 col-md-6 flex_cen_col mt-md-5 mb-md-4">
                        {/* <div className='text-right'>
            <button className="get-started-btn btn_width_auto" onClick={() => this.setState({ addtrendingModal: true })}>Add</button>
            </div> */}
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
      <th>Position</th>
      <th>Sale Address</th>
      <th>Display Name</th>
      <th>Status</th>
    </tr>
    </thead>
    {this.state.trending && this.state.trending.map((data , i)=><>
      <tr>
      <td>
     
    
     <div className="p-0 table_det">
       <span className="table_text">{data?.position}</span>
 
   </div>
   </td>
      <td>
     
    
        <div className="p-0 table_det">
          <span className="table_text">{data?.saleaddress}</span>
    
      </div>
      </td>
      <td>{data?.displayname}</td>
      <td>{data?.status}</td>
      <td className="d-flex justify-content-end"><a className="link_text" onClick={() => {
        this.setState({singletrending : data})
        this.setState({ edittrendingModal: true })}}>Edit</a></td>
      
    </tr>
    </>)}
    


    {/* <tr>
      <td>
     
    
        <div className="p-0 table_det">
          <span className="table_text">Lorem Ipsum</span>
    
      </div>
      </td>
      <td>Lorem Ipsum</td>
      <td className="d-flex justify-content-end"><a className="link_text" onClick={() => this.setState({ edittrendingModal: true })}>Edit</a></td>
      
    </tr>
    <tr>
      <td>
     
    
        <div className="p-0 table_det">
          <span className="table_text">Lorem Ipsum</span>
    
      </div>
      </td>
      <td>Lorem Ipsum</td>
      <td className="d-flex justify-content-end"><a className="link_text" onClick={() => this.setState({ edittrendingModal: true })}>Edit</a></td>
      
    </tr> */}
   
  </table>
</div>
{/* <div className="mt-2 d-flex justify-content-center align-items-center btn_pagin_wrap">
<button className="pagination_btn"><i class="fa fa-angle-left" aria-hidden="true"></i></button>
  <button className="pagination_btn">1</button>
  <button className="pagination_btn">2</button>
  <button className="pagination_btn">3</button>
  <button className="pagination_btn">4</button>
  <button className="pagination_btn">5</button>
  <button className="pagination_btn"><i class="fa fa-angle-right" aria-hidden="true"></i></button>
</div> */}
<div className={this.state.trending.length ?"mt-2 d-flex justify-content-center align-items-center btn_pagin_wrap" : "d-none"}>
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

{this.state.trending.length == 0 && <p className='no_data_text'>No Data Found</p>}
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
            {edittrendingModal && <EditTrendingModal data = {this.state.singletrending} onDismiss={()=>this.onDismiss()} getset = {()=>this.gettrending()}/> }
            {/* {addtrendingModal && <AddTrendingModal onDismiss={()=>this.onDismissAdd()} getset = {()=>this.gettrending()}/> } */}


            {/* <Footer /> */}
        </div>
        </div>
        )
    }
}

export default AdminTrending