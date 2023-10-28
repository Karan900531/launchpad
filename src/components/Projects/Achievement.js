import React, { Component } from 'react';
import { useContext, useEffect, useState } from "react";

import Header from '../Header';
import Sidebar from '../Sidebar';
import Trendingslider from '../trendingslider';

import Walletmodal from "../Walletmodal";


import { getAccount, Userdollar } from '../../hooks/useAccount'

import bsc from "../../images/bsc.png"






import {  Container, FormControl, InputGroup, Dropdown, Nav, Form, Tab, Row, Col } from 'react-bootstrap';
import '../../css/styles.css';

import favicon from "../../images/favicon.png"
import proof from "../../images/proof.webp"
import loader from "../../images/loader.gif"
import { Link } from 'react-router-dom';
import { UseProvider } from '../../hooks/useWeb3';
import { Getbalance } from '../../hooks/useContract';
import { getuserdatahook } from '../../hooks/usebackend';
import { getsaledatalimit } from '../../hooks/useProjects';

class Achievement extends Component {
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
      this.getbalance();
      this.getuserdata()
    //    this.setState({ accountInfo: getAccount() });
    }

    getbalance = async()=>{
      const balance = await Getbalance();
      this.setState({"balance" : balance})
    }

    makeTimercopyaddress(){
      setInterval(() => {
          this.setState({copyaddress: "Copy"})
      }, 5000)
    }

    logOut = async () =>{
      this.setState({accountInfo : ""})
      localStorage.removeItem("accountInfo")
      if(localStorage.getItem("walletconnect")!=null)
   {
      const provider = await UseProvider();
      await provider.disconnect()
   }
    //  this.setState({accountModal: false})
      window.location.reload()
      console.log("logout")
  }

  getuserdata = async()=>{
    let userdata = await getuserdatahook(this.state.accountInfo.toLowerCase());
    console.log("userdata" , userdata.data.data);
    this.setState({investedpools : userdata.data.data.investedpools})
    // this.setState({wishlist : userdata.data.data.wishlist})
    // this.setState({viewlist : userdata.data.data.viewlist})
    // this.setState({investedamount : userdata.data.data.investedamount})
    let dollar = await Userdollar(userdata.data.data.investedamount);
    this.setState({dollar : dollar});
    this.loadData(userdata.data.data.investedpools);
  }


  async loadData(Proxydata){
    this.showLoader();
    // const Proxydata = await getTotalSalesInfo();
    // this.setState({ proxy : Proxydata })
    if(Proxydata.length>0){
      const newly = await getsaledatalimit(Proxydata,0 , this.state.loadinterval);
      await this.sleep(1000)
      console.log("newly" , newly);
      // const total = this.state.totalsales.concat(newly);
      // console.log("total" , total);
      this.setState({ totalsales: newly }); 
      this.setState({interval :   this.state.loadinterval})
    }
    else{
      this.setState({ totalsales: [] });
    }
      
   
    this.hideLoader();
}

async viewmore(Proxydata){
  this.setState({loading : true});
  if(Proxydata.length>0){
    const newly = await getsaledatalimit(Proxydata,this.state.interval, this.state.interval+this.state.loadinterval);
    await this.sleep(1000)
    console.log("newly" , newly);
    const total = this.state.totalsales.concat(newly);
    console.log("total" , total);
    this.setState({ totalsales: total }); 
    this.setState({interval :   this.state.interval + this.state.loadinterval})
    this.setState({loading : false});
  }
  else{
    this.setState({ totalsales: [] });
    this.setState({loading : false});
  }
}

    constructor(props) {
        super(props);
        this.state = {          
            walletModal: false,
            accountInfo: '',
            logined:true,
            balance : "",
            showTooltip:false,
            showTooltipOne:false,
            copyaddress : "Copy",
            copyurl : "Copy",
            dollar : 0,
            investedpools: [],
            investedamount : 0,
            totalsales : []

        };
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
              <div className='container'>
              <div className='row mt-5'>
           <div className='col-12 mx-auto px-0'>
           <div className="tab_img">
                 <div className='card_bg card'>
            <div className='card-body pt-4'>
                <div className='text-center mb-4'>
                    <img src={favicon} className="img-fluid" />
                </div>
                <p className='wallet_address_text text-center'>
                    <span>
                    <img className="token_image_sm" src={bsc} />
                    </span>
                    <span>{getAccount().toLowerCase()}</span>
                    {/* <span>{localStorage.getItem("accountInfo")}</span> */}
                  
                  
                    <span onClick={() =>  {
                        navigator.clipboard.writeText(localStorage.getItem("accountInfo"))
                        this.setState({"copyaddress" : "Copied"});
                        this.makeTimercopyaddress();
                      }}>
                        <div className='tooltip_parent'>
                        <i className={this.state.copyaddress == "Copy"?'fa fa-copy' : "fa fa-check"}
                         onMouseOver={()=>{this.setState({showTooltip:true})}}
                        onMouseLeave={()=>{this.setState({showTooltip:false})}}
                        // onClick={()=>{this.setState({showTooltip:!this.state.showTooltip})}}
                        />

                        {this.state.showTooltip?
                      <span className='tooltip_custom' id="dummy_tooltip  ">
                      {this.state.copyaddress}
                    </span>:
                    ""
                    }
                        </div>
                    </span>
                    </p>   
                
              
             </div>
             </div>
            </div>
            </div>
        

                
               
        </div>
        </div>
        <div>
        <div className="inner_bg mt-2 pb-5">
            <div className="container px-1">
            <Tab.Container  defaultActiveKey="first">
  <Row className="container-fluid w-100 mx-0 px-0">

   

    <Col lg={12} className="img_center_lg px-0">
    <div className='container container_custom px-0'>
      <Tab.Content>
        <Tab.Pane eventKey="first">
            {getAccount()?
            <div>
            <div className='card_bg card mt-4'>
     <div className='card-body'>
         <div className='row row_invested_sec'>
             <div className='col-12 col-md-4 text-center'>
                 <p className='pool_detail_title'>Total Pool Invested</p>                        
                 <p className='text_green font_18 mb-0'>{this?.state?.investedpools?.length}</p>

             </div>
             <div className='col-12 col-md-4 text-center'>
                 <p className='pool_detail_title'>Total BNB Invested</p>                        
                 <p className='text_green font_18 mb-0'>{this?.state?.investedamount}</p>

             </div>
             <div className='col-12 col-md-4 text-center'>
                 <p className='pool_detail_title'>Total Invested</p>                        
                 <p className='text_green font_18 mb-0'>{this?.state?.dollar}</p>

             </div>
         </div>
         </div>
         </div>
         <div class="table-responsive table_repso_with_dropdwon mt-3">
<table className="table">
<tr>
<th>
 <p>Name</p>
             </th>
<th>
<p>Sale type</p>
</th>
             <th>
             <p>Sale Address</p>
             </th>
           
           
             {/* <th>
                 <InputGroup className="mb-3 input_group">
               <Form.Control
                 value="Type"
                 aria-label="Recipient's username"
                 aria-describedby="basic-addon2"
               />
                <InputGroup.Text
                 id="basic-addon2"
                 className="input_group input_group_filteralign"
               >
                 <Dropdown className='filter_dropdown'>
                 <Dropdown.Toggle id="dropdown-basic" className='table_filter_icon'>
                 <i class="fas fa-filter"></i>
                 </Dropdown.Toggle>
                 <Dropdown.Menu className='table_dropdown_menu'>
 <Dropdown.Item href="#/action-1"><div className="custom-control custom-checkbox">
<input type="checkbox" className="custom-control-input" id="customCheck13" />
<label className="custom-control-label" for="customCheck13">Claimed</label>
</div></Dropdown.Item>
 <Dropdown.Item href="#/action-2"><div className="custom-control custom-checkbox">
<input type="checkbox" className="custom-control-input" id="customCheck14" />
<label className="custom-control-label" for="customCheck14">Contributed</label>
</div></Dropdown.Item>
 <Dropdown.Item href="#/action-3"><div className="custom-control custom-checkbox">
<input type="checkbox" className="custom-control-input" id="customCheck15" />
<label className="custom-control-label" for="customCheck15">Emergency Withdrawn</label>
</div></Dropdown.Item>
 <Dropdown.Item href="#/action-3"><div className="custom-control custom-checkbox">
<input type="checkbox" className="custom-control-input" id="customCheck16" />
<label className="custom-control-label" for="customCheck16">Withdrawn</label>
</div></Dropdown.Item>
<Dropdown.Divider />
<Dropdown.Item href="#/action-3">
<div className='dropdown_buttons d-flex justify-content-between'>
<button className="get-started-btn mr-2">Reset</button>
<button className="get-started-btn">OK</button>
</div>
</Dropdown.Item>
</Dropdown.Menu>
                 </Dropdown>
               </InputGroup.Text>
             </InputGroup>
             </th> */}
             <th>
             <p>Action</p>
             </th>
           
           
          
</tr>  
{this.state.investedpools.map((data , i)=><>
<tr>
<td><span className="d-flex align-items-center">
<div className="relative_token_div  mr-2">
 <img className="token_image_sm " src={favicon} />
 </div> {data.name}
 </span></td>
 <td>{data?.isWhitelisted ? "Whitelist sale" : "public sale"}</td>       
 <td>{data.saleAddress}</td>
 {/* <td>Claimed</td>        */}

 {/* <td>0x025c2166741685bc6577ujtiio768ghrtyC9</td> */}
 <td><a className="link_text" href={`/privatesaledetail/${data.saleAddress}`}>View</a></td>
</tr></>)}


{/* <tr>
<td><span className="d-flex align-items-center">
<div className="relative_token_div  mr-2">
 <img className="token_image_sm " src={favicon} />
 </div> 5IREToken
 </span></td>
 <td>03:05:42:01</td>       
 <td>$580</td>
 <td>Withdrawn</td>       

 <td>0x025c2166741685bc6577ujtiio768ghrtyC9</td>
</tr>
<tr>
<td><span className="d-flex align-items-center">
<div className="relative_token_div  mr-2">
 <img className="token_image_sm " src={favicon} />
 </div> 5IREToken
 </span></td>
 <td>03:05:42:01</td>       
 <td>$580</td>
 <td>Contributed</td>       

 <td>0x025c2166741685bc6577ujtiio768ghrtyC9</td>
</tr> */}
</table>
</div>
<div className='text-center mt-3'>
{this.state.totalsales.length < this.state.investedpools.length ?
<button className="get-started-btn" id="load_more_btn_1"
onClick={()=>this.viewmore(this.state.investedpools)}
>{this.state.loading ? "Loading..." : "View More"}</button>
: <></>
}

</div>
     </div>
            :
            <div className='text-center'>
            <p className='text-white'>We are protecting your activity. You need to sign to see it.</p>
            <button className="get-started-btn">
            Sign in
            </button>
            </div>
            }
       
        </Tab.Pane>
       
      
       
      </Tab.Content>
      </div>
    </Col>
  </Row>
</Tab.Container>

              
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

export default Achievement