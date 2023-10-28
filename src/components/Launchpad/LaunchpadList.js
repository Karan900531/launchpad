import React, { Component } from 'react';
import { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import Header from '../Header';
import Sidebar from '../Sidebar';
import Trendingslider from '../trendingslider';

import Buycard from "./Buycard";

import Web3 from "web3";
import '../../css/styles.css';

import coin from "../../images/coin.png"
import favicon from "../../images/favicon.png"

import loader from "../../images/loader.gif"
import { getlaunchpaddatalimit, getLaunchpadsaleCardLimit, getmycontributiondatalimit, getPrivatesaleCardLimit, getSaleCards, getSaleCardsLimit, getsaledatalimit, getTotalSalesInfo, searchCards, searchSale } from '../../hooks/useProjects';
import { Dropdown, Nav, Tab, Row, Col, Container, ProgressBar, InputGroup,Form, Alert } from 'react-bootstrap';
import { CHAINS } from '../../config/env'
import { getAccount, getChainId, setChainId } from '../../hooks/useAccount'
import { UseTokenInfo } from '../../hooks/useContract';
import { gettrendingdisplayhook, getuserdatahook } from '../../hooks/usebackend';
import { privatesalefilterby, privatesalesortby, tokenfilter, tokenfilterlaunchpad } from '../../hooks/filter';

class LaunchpadList extends Component {
   
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

  closeAllMenusStatus()
  {
    this.setState({closeKycmenu:true});
    this.setState({closeHcmenu:true});
    this.setState({closeCoinmenu:true});
  }

  closeAllMenusKyc()
  {
    this.setState({closeStatusmenu:true});
    this.setState({closeHcmenu:true});
    this.setState({closeCoinmenu:true});
  }

  closeAllMenusCoin()
  {
    this.setState({closeStatusmenu:true});
    this.setState({closeHcmenu:true});
    this.setState({closeKycmenu:true});  
  }

  
  closeAllMenusHc()
  {
    this.setState({closeStatusmenu:true});
    this.setState({closeCoinmenu:true});
    this.setState({closeKycmenu:true});  
  }
  
  // menuToggle(e)
  // {
  //   console.log(e,"fsd");
  //   console.log(this.state.closeHcmenu,"fdsf");
  // }



    componentDidMount()
    {
      // this.showLoader();
     this.hideLoader();
     document.getElementById("launchpad_parent").classList.add("active");
      this.setState( { currentChain: getChainId() });
      this.gettrending();
      this.getuserdata();
      this.loadData();
    }

    async gettrending(){
      let data = await gettrendingdisplayhook();
      console.log("dataa trending" , data?.data?.data);
      if(data?.data?.data?.length > 0)
      this.setState({trending : data?.data?.data}) 
  }
    getuserdata = async()=>{
      const totalsale = await getTotalSalesInfo();
      let userdata = await getuserdatahook(this.state.accountInfo && this.state.accountInfo.toLowerCase());
      console.log("userdata" , userdata.data.data);
      // this.setState({investedpools : userdata.data.data.investedpools})
      // this.setState({wishlist : userdata.data.data.wishlist})
      // this.setState({viewlist : userdata.data.data.viewlist})
      // this.setState({investedamount : userdata.data.data.investedamount})
      // const totalproxydata = userdata.data.data.launchpad.filter(data => data.iswhitelist == true)
      // console.log("totalproxydata" , totalproxydata);
      let totalproxydata = userdata.data.data.launchpad;
      const newly = totalproxydata.filter(data => data.iswhitelist == false || data.iswhitelist == "false")
      let newarray = [];
      newly.map((val , i) => {
         let newvalue = totalsale.find((e) => e._sale == val.saleaddress);
         newarray.push(newvalue)
      })
      console.log("userdatanewly" , newly , newarray);
      this.setState({mycontribution : newarray.reverse()})
    }
   
    constructor(props) {
      super(props);
      this.state = {  
        proxy: [],        
        totalSales: [],
        onGoingSales: [],
        upComingSales: [],
        isSearch: false,
        searchSale: [],
        search: '',
        interval: 3,
        loadInterval: 3,
        searchInterval: 3,
        searchProxy: [],
        isLoading: false,
        currentChain: 0,
        closeHcmenu:false,
        closeCoinmenu:false,
        closeKycmenu:false,
        closeStatusmenu:false,
        isuser : false,
        button : true,

        mycontribution : [],
        accountInfo : getAccount(),
        interval : 0,
        loadinterval : 3,
        original : [],
        filterdata : "All Status",
        sortdata : "No Filter",
        coin : [],
        status : [],
        type : [],
        trending : []

      
      };
    }

    sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

    async loadData(){
      this.showLoader();
      const Proxydata = await getTotalSalesInfo();
      console.log("Proxydata",Proxydata);
      const totalproxydata = Proxydata.filter(data => data._isWhitelisted == false)


      let trenddata = await gettrendingdisplayhook();
      console.log("dataa trending" , trenddata?.data?.data);
      if(trenddata?.data?.data?.length > 0)
      this.setState({trending : trenddata?.data?.data})
      var trending = trenddata?.data?.data
console.log("trendingdataaaaaaaaaaaaaa" , trending);
      let newtotalproxy = [];
        trending.map((val , i)=>{
          let singledata = totalproxydata.find(e=>e?._sale == val.saleaddress);
          if(singledata){
            newtotalproxy.push(singledata)
          }
        })
        totalproxydata.map((datas , i) => {
          let singlesale = newtotalproxy.find(e=>e._sale == datas?._sale);
          if(!singlesale){
            newtotalproxy.push(datas)
          }
        })
        this.setState({ proxy : newtotalproxy })
console.log("trendingdataaaaaaaaaaaaaa" , newtotalproxy);


      console.log("total proxy data" , totalproxydata);
      // this.setState({ proxy : totalproxydata })
      this.setState({ original : newtotalproxy })
      const total = await getlaunchpaddatalimit(newtotalproxy , 0 , this.state.loadinterval);
      // const total = await getPrivatesaleCardLimit(Proxydata,0,this.state.interval , this.state.isuser);
      // console.log("button " ,Proxydata?.length , total.index );
      // if(Proxydata?.length == total.index || !total){
      //   this.setState({button : false})
      // }
      // await this.sleep(1000)
      //  this.setState({ totalSales: total.saleInfoCards });  
      //  this.setState({ interval: total.index+1 }); 
      this.setState({ totalSales: total });  
       this.setState({ interval: this.state.loadinterval}); 
      this.hideLoader();
  }

  async loadMore(){
    console.log("Lad moreee",this.state.totalSales.length < this.state.proxy.length)
    this.setState({ isLoading: true});
    const newly = await getlaunchpaddatalimit(this.state.proxy,this.state.interval,this.state.interval+this.state.loadInterval );
    console.log("newly " , newly);
    const total = this.state.totalSales.concat(newly);
    this.setState({ totalSales: total,interval: this.state.interval+this.state.loadInterval });
     this.setState({ isLoading: false});
  }
  async loadmycontribution(){
    this.showLoader()
    // this.setState({ isLoading: true});
    this.setState({proxy : this.state.mycontribution})
    const newly = await getmycontributiondatalimit(this.state.mycontribution,0,this.state.loadInterval);
    console.log("newly " , newly);
    this.setState({ totalSales: newly});
    //  this.setState({ isLoading: false});
    this.hideLoader();
  }

  // async loadMoremycontribution(){
  //   console.log("Lad more",this.state.totalSales.length < this.state.proxy.length)
  //   this.setState({ isLoading: true});
  //   const newly = await getmycontributiondatalimit(this.state.mycontribution,this.state.interval,this.state.interval+this.state.loadInterval );
  //   console.log("newly " , newly);
  //   const total = this.state.totalSales.concat(newly);
  //   // if(this?.state?.proxy?.length == newly.index || !newly.saleInfoCards){
  //   //   console.log("button");
  //   //   this.setState({button : false})
  //   // }
  //   // await this.sleep(1000)
  //   //  this.setState({ totalSales: total,interval: this.state.interval+this.state.loadInterval });
  //    this.setState({ totalSales: total,interval: this.state.interval+this.state.loadInterval });
  //    this.setState({ isLoading: false});
  //   //  this.setState({ isLoading: false});   
  // }

  async loadMoremycontribution(){
    console.log("Lad more",this.state.totalSales.length < this.state.proxy.length)
    this.setState({ isLoading: true});
    const newly = await getmycontributiondatalimit(this.state.mycontribution,this.state.interval,this.state.interval+this.state.loadInterval );
    console.log("newly " , newly);
    const total = this.state.totalSales.concat(newly);
    // if(this?.state?.proxy?.length == newly.index || !newly.saleInfoCards){
    //   console.log("button");
    //   this.setState({button : false})
    // }
    // await this.sleep(1000)
    //  this.setState({ totalSales: total,interval: this.state.interval+this.state.loadInterval });
     this.setState({ totalSales: total,interval: this.state.interval+this.state.loadInterval });
     this.setState({ isLoading: false});
    //  this.setState({ isLoading: false});   
  }

  async loadSearchMore(){
    console.log("Lad more",this.state.totalSales.length < this.state.proxy.length)
    this.setState({ isLoading: true});
    const newly = await getlaunchpaddatalimit(this.state.searchProxy,this.state.searchInterval,this.state.searchInterval+this.state.loadInterval);
    const total = this.state.searchSale.concat(newly);
    await this.sleep(1000)
     this.setState({ searchSale: total,searchInterval: this.state.searchInterval+this.state.loadInterval });
     this.setState({ isLoading: false});   
  }

  async handleChange(e){
    if((e.target.value).length > 0){
          if (e.key === 'Enter') {
          console.log("Search : ",e.target.value)
          this.showLoader();
          const searchS = await searchCards(this.state.proxy,e.target.value);
          this.setState({ searchProxy : searchS});
          const data = await getlaunchpaddatalimit(searchS,0,this.state.searchInterval);
          await this.sleep(1050)
          console.log("Search sale : ",searchS)
          this.setState({ searchSale: data, isSearch: true})
          this.hideLoader();
          }
    }else{
      this.setState({ isSearch: false})
    }
 
}

  async nouser(){
    this.setState({isuser : false});
    // this.setState({loadInterval : 3});
    this.setState({interval : 0});
    this.setState({searchInterval : 3});
    // this.setState({button : true});
    this.setState({filterdata : "All Status",
    sortdata : "No Filter",})
    // this.setState({ isSearch: true})
    await this.loadData()
  }

  async yesuser(){
    this.setState({isuser : true});
    // this.setState({loadInterval : 3});
    this.setState({interval : 3});
    this.setState({searchInterval : 3});
    // this.setState({button : true})
    // this.setState({ isSearch: true})
    this.setState({filterdata : "All Status",
    sortdata : "No Filter",})
    await this.loadmycontribution()

  }

  async handlefilter(val){
    if(val=="All Status"){
      this.setState({filterdata : val});
      this.setState({button : true})
      this.loadData();
    }
    else{
      this.showLoader();
      this.setState({button : true})
      this.setState({filterdata : val});
      var filtered = await privatesalefilterby(this.state.original , val , this.state.isuser);
      console.log("filtered" , filtered);
      // var saleinfo = await getPrivatesaleFilter(filtered , this.state.isuser);
      this.setState({proxy : filtered})
      if(filtered.length > 0){
        const total = await getlaunchpaddatalimit(filtered,0,this.state.loadInterval );
        console.log("button " ,filtered?.length , total );

      if(filtered?.length == 0){
        this.setState({ totalSales: filtered})
      }
      await this.sleep(1000)
      this.setState({ totalSales: total});  
      this.setState({ interval: 3 }); 
     this.hideLoader();
      } 
      else {
        // this.setState({button : false})
        this.setState({ totalSales: filtered });
        this.hideLoader();
      }
    }
  }
 
  async handlesort(val){
    if(val=="No Filter"){
      this.setState({button : true})
      this.loadData();
      this.setState({sortdata : val})
    }
    else{
      this.showLoader();
      this.setState({sortdata : val})
      this.setState({button : true});
      var sorted = await privatesalesortby(this.state.original , val , this.state.isuser);
      console.log("sorted" , sorted);
      this.setState({proxy : sorted});
      if(sorted.length > 0){
        const total = await getLaunchpadsaleCardLimit(sorted,0,this.state.interval , this.state.isuser);
        console.log("button " ,sorted?.length , total );

      if(sorted?.length == total.index || !total){
        this.setState({button : false})
      }
      await this.sleep(1000)
      this.setState({ totalSales: total.saleInfoCards });  
      this.setState({ interval: total.index+1 }); 
     this.hideLoader();
      } 
      else {
        this.setState({button : false})
        this.setState({ totalSales: sorted });
        this.hideLoader();
      }
    }
  }

  async handlecoin(val){
    var coins = this.state.coin
    if(coins.length==0){
      coins.push(val);
    }
    else{
      if(coins.includes(val)){
        const index = coins.indexOf(val);
        if (index > -1) { 
          coins.splice(index, 1); 
        }
      }
      else{
        coins.push(val)
      }
    }
    console.log("coin" , coins);
    this.setState({coin : coins})
  }

  async handlestatus(val){
    var statuss = this.state.status
    if(statuss.length==0){
      statuss.push(val);
    }
    else{
      if(statuss.includes(val)){
        const index = statuss.indexOf(val);
        if (index > -1) { 
          statuss.splice(index, 1); 
        }
      }
      else{
        statuss.push(val)
      }
    }
    console.log("status" , statuss);
    this.setState({status : statuss})
  }

  async handletype(val){
    var statuss = this.state.type
    if(statuss.length==0){
      statuss.push(val);
    }
    else{
      if(statuss.includes(val)){
        const index = statuss.indexOf(val);
        if (index > -1) { 
          statuss.splice(index, 1); 
        }
      }
      else{
        statuss.push(val)
      }
    }
    console.log("status" , statuss);
    this.setState({type : statuss})
  }

  async handleadvancefilter(){
    this.showLoader();
    if(this.state.coin.length == 0 && this.state.status.length == 0 && this.state.type.length == 0){
      this.loadData();
    }
    else{
      // let filtered = await tokenfilter(this.state.proxy , this.state.coin , this.state.status);
      let filtered = await tokenfilterlaunchpad(this.state.proxy , this.state.coin , this.state.status , this.state.type);
      this.setState({proxy : filtered})
      console.log("filtered" , filtered);
      if(filtered.length > 0){
        const total = await getlaunchpaddatalimit(filtered,0,this.state.interval);
          console.log("button " ,filtered?.length , total );
        // if(filtered?.length == 0){
        //   this.setState({button : false})
        // }
        await this.sleep(1000)
        this.setState({ totalSales: total });  
        this.setState({ interval: 3 }); 
       this.hideLoader();
      }
      else {
        this.setState({button : false})
        this.setState({ totalSales: filtered });
        this.hideLoader();
      }
    }
    this.hideLoader();
  }


    render() {
      const location = this.props.location.pathname.split('/')[1];
      const {totalSales,onGoingSales,upComingSales,search,isSearch,searchSale, accountInfo } = this.state
    
      
	return (
    <div id="loader_main">
    <div id="loader_div">
    <span className="spin_round">

    </span>
    <img src={favicon} className="logo_load" />
  </div>
        <div className='logo_overlay' id="logo_overlay">
      

           <Header onUpdate={this.loadData.bind(this)} />
        
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
              <Trendingslider/>
              <div className="right_side_spacing">
               <div className='ongoing_sec proj_bg pb-5'>
            <div className="container px-1">
                <div className='top_heqad_sec mt-5 mt-md-0'>
                   
                  <div className="row">
                      <div className="col-12 col-md-12 flex_cen_col mt-md-5 mb-md-4">
                        <p className="banner_subtitle form_subhead">Current Presales</p>

                       
                        {/* <hr className='hr_yellow mt-5'/> */}
                      </div>
                    
                  </div>
                </div>
            </div>
           
            <div className="inner_bg mt-4">
            <div className="container px-1">
            <Tab.Container  defaultActiveKey="first">
  <Row className="container-fluid w-100 mx-0 px-0">
    <Col lg={12} className="px-0">
      <Nav variant="pills" className="nav_green">
        <Nav.Item>
          <Nav.Link eventKey="first" id="first">
          <p className='mb-0'
            onClick={()=>{ this.nouser()}}
          >All Launchpads</p>

          </Nav.Link>
         </Nav.Item>
         
        <Nav.Item>
          <Nav.Link eventKey="second" id="second">
          <p className='mb-0' 
             onClick={()=>{ this.nouser()}}
          >Advanced Mode</p>
   
          </Nav.Link>
                               
        </Nav.Item>
        
        <Nav.Item>
          <Nav.Link eventKey="third" id="third">
          <p className='mb-0'
            onClick={()=>{
              //  this.test()
              this.yesuser();
                
              }}
          >My Contributions</p>
   
          </Nav.Link>
        
        </Nav.Item>
        
      </Nav>
    </Col>
    <hr class="hr_yellow mt-0 mt-5 mb-3" />

    <Col lg={12} className="img_center_lg px-0">
    <div className='container container_custom px-0'>
      <Tab.Content>
        <Tab.Pane eventKey="first">
        <div className='row_div'>
                <div>
                <div className='row'>
                    <div className='col-12 col-md-6 col-xl-8 mb-2 mb-md-0'>
                    <p className='label_input invisible'>Search</p>

                    <input className="form-control searc_style_2" value={search} type="text" onChange={(e)=> { this.setState({ search: e.target.value }); this.handleChange(e); }} onKeyDown={(e)=>this.handleChange(e)}  placeholder="Enter token name or token symbol" aria-label="Search" />

                    </div>
                    <div className='col-6 col-md-3 col-xl-2'>
                    <p className='label_input'>Filter By</p>
                    <Dropdown className='dropdown_normal' >
                  <Dropdown.Toggle variant="success" id="dropdown-basic" >
                  {this.state.filterdata}
                  </Dropdown.Toggle>

                  <Dropdown.Menu className='dropdown_normal_menu' key = {"up"}>
                  <Dropdown.Item ><p onClick={(e)=>this.handlefilter("All Status")}>All Status</p></Dropdown.Item>
                      {/* <Dropdown.Item>KYC</Dropdown.Item> */}
                      <Dropdown.Item key ={"up"}><p onClick={(e)=>this.handlefilter("Upcoming")}>Upcoming</p></Dropdown.Item>
                      <Dropdown.Item><p onClick={(e)=>this.handlefilter("Live")}>Live</p></Dropdown.Item>
                      {/* <Dropdown.Item>Filled</Dropdown.Item> */}
                      <Dropdown.Item><p onClick={(e)=>this.handlefilter("Ended")}>Ended</p></Dropdown.Item>
                      {/* <Dropdown.Item>Cancelled</Dropdown.Item> */}
                  </Dropdown.Menu>
                </Dropdown>                     
                    </div>
                    <div className='col-6 col-md-3 col-xl-2'>
                    <p className='label_input'>Sort By</p>
                    <Dropdown className='dropdown_normal'>
                  <Dropdown.Toggle variant="success" id="dropdown-basic-1">
                  {/* No Filter */}{this.state.sortdata}
                  </Dropdown.Toggle>

                  <Dropdown.Menu className='dropdown_normal_menu'>
                  <Dropdown.Item><p onClick={(e)=>this.handlesort("No Filter")}>No Filter</p></Dropdown.Item>
                      {/* <Dropdown.Item>Hard Cap</Dropdown.Item>
                      <Dropdown.Item>Soft Cap</Dropdown.Item>
                      <Dropdown.Item>LP Percent</Dropdown.Item> */}
                      <Dropdown.Item><p onClick={(e)=>this.handlesort("Start Time")}>Start Time</p></Dropdown.Item>
                      <Dropdown.Item><p onClick={(e)=>this.handlesort("End Time")}>End Time</p></Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>  
                  </div>
                  </div>
                
                </div>
              </div>
              {true?
              <>
            <div className='row mt-5'>

            { !isSearch ? 
            (totalSales && totalSales.map((index)=>
            <Buycard saleData={index} user = {true} connect={"string"} />
            )):
            (searchSale && searchSale.map((index)=>
            <Buycard saleData={index} user = {true} connect={"string"} />
            ))
            }
            </div>
            <div className='text-center mt-3'>
            {/* { this.state.button ? isSearch  ?
              <>
            {searchSale && searchSale.length < this.state.searchProxy.length ? 
            ( !this.state.isLoading ?
            <button className="get-started-btn" onClick={this.loadSearchMore.bind(this)} id="load_more_btn">{this.state.isLoading ? 'Loading...' : 'View More Pools' }</button>: <img src={loader}  id="loader_div_sm" />)
            :<></>
            }
            </> :  <>
            {totalSales && totalSales.length < this.state.proxy.length ? 
            ( !this.state.isLoading ?
            <button className="get-started-btn" onClick={this.loadMore.bind(this)} id="load_more_btn">{this.state.isLoading ? 'Loading...' : 'View More Pools' }</button>: <img src={loader}  id="loader_div_sm" />)
            :<></>
            }
            </> : <></>
            } */}


{ isSearch ?
              <>
            {searchSale && searchSale.length < this.state.searchProxy.length ? 
            
            <button className="get-started-btn" onClick={this.loadSearchMore.bind(this)} id="load_more_btn">{this.state.isLoading ? 'Loading...' : 'View More Pools' }</button>
            :<></>
            }
            </> :  <>
            {totalSales && totalSales.length < this.state.proxy.length ? 
            <button className="get-started-btn" onClick={this.loadMore.bind(this)} id="load_more_btn">{this.state.isLoading ? 'Loading...' : 'View More Pools' }</button>
            :<></>
            }
            </>
            }
            
            {/* {this.state.totalSales.length < this.state.proxy.length ?
            <button className="get-started-btn" 
            onClick={this.loadMore.bind(this)} id="load_more_btn">
              {this.state.isLoading ? 'Loading...' : 'View More Pools' }</button>
              : <></>
          } */}


           
            </div>
            </> :
            <div className='row mt-5'>
            <div className='col-12'>
              <p className='no_data_txt'>No Data</p>
            </div>
          </div>
          }
        </Tab.Pane>
        <Tab.Pane eventKey="second">
               
               
        <div class="table-responsive mt-3">
  <table className="table table_poricat_list">
  <tr>
    <th><InputGroup className="mb-3 input_group search_bar">
                      <Form.Control
                        placeholder="Search"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        value={this.state.search}
                        onChange={(e)=> { this.setState({ search: e.target.value }); this.handleChange(e); }} 
                        onKeyDown={(e)=>this.handleChange(e)}
                      />
                      <InputGroup.Text
                        id="basic-addon2"
                        className="input_group"
                      >
                        <i class="fas fa-search"></i>
                      </InputGroup.Text>
                    </InputGroup></th>

                    <th><InputGroup className="mb-3 input_group input_group_prepend">
                      <Form.Control
                        value={"Type"}
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                      />
                      <InputGroup.Text
                        id="basic-addon2"
                        className="input_group input_group_filteralign"
                      >
                        <i class="fa fa-sort" aria-hidden="true"></i>
                      </InputGroup.Text>
                      <InputGroup.Text
                        id="basic-addon2"
                        className="input_group input_group_filteralign"
                      >
                        <Dropdown className='filter_dropdown '>
                        <Dropdown.Toggle id="dropdown-basic" className='table_filter_icon'>
                        <i class="fas fa-filter" onClick={()=>{this.setState({closeHcmenu:false});this.closeAllMenusHc()}}></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className={this.state.closeHcmenu?"table_dropdown_menu filter_menu d-none":"table_dropdown_menu filter_menu d-block"}>
        <Dropdown.Item href="javascript:void(0)"><div className="custom-control custom-checkbox" onClick={()=>{this.setState({closeHcmenu:false})}}>
  <input type="checkbox" className="custom-control-input" id="customCheck1" 
  checked = {this.state.type.includes("Launchpad") ? true : false}
  onChange={()=>this.handletype("Launchpad")}
  />
  <label className="custom-control-label" for="customCheck1">Launchpad</label>
</div></Dropdown.Item>
        <Dropdown.Item href="javascript:void(0)"><div className="custom-control custom-checkbox" onClick={()=>{this.setState({closeHcmenu:false})}}>
  <input type="checkbox" className="custom-control-input" id="customCheck2" 
    checked = {this.state.type.includes("Fairlaunch") ? true : false}
    onChange={()=>this.handletype("Fairlaunch")}
  />
  <label className="custom-control-label" for="customCheck2">Fairlaunch</label>
</div></Dropdown.Item>


        {/* <Dropdown.Item href="javascript:void(0)"><div className="custom-control custom-checkbox" onClick={()=>{this.setState({closeHcmenu:false})}}>
  <input type="checkbox" className="custom-control-input" id="customCheck3" />
  <label className="custom-control-label" for="customCheck3">Action</label>
</div></Dropdown.Item>
        <Dropdown.Item href="javascript:void(0)"><div className="custom-control custom-checkbox" onClick={()=>{this.setState({closeHcmenu:false})}}>
  <input type="checkbox" className="custom-control-input" id="customCheck4" />
  <label className="custom-control-label" for="customCheck4">Subscription</label>
</div></Dropdown.Item> */}
<Dropdown.Divider />
<Dropdown.Item href="javascript:void(0)">
  <div className='dropdown_buttons d-flex justify-content-between'>
  <button className="get-started-btn mr-2" onClick={()=>{this.setState({type : []})}}>Reset</button>
  <button className="get-started-btn" id="ok_hc" onClick={()=>{this.setState({closeHcmenu:true});
  this.handleadvancefilter()
}}>OK</button>
  </div>
</Dropdown.Item>

      </Dropdown.Menu>
                        </Dropdown>
                      </InputGroup.Text>
                    </InputGroup></th>
      {/* <th><InputGroup className="mb-3 input_group input_group_prepend"> */}
                      {/* <Form.Control
                        value="HC"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                      />
                      <InputGroup.Text
                        id="basic-addon2"
                        className="input_group input_group_filteralign"
                      >
                        <i class="fa fa-sort" aria-hidden="true"></i>
                      </InputGroup.Text> */}
                      {/* <InputGroup.Text
                        id="basic-addon2"
                        className="input_group input_group_filteralign"
                      > */}
                        {/* <Dropdown className='filter_dropdown '>
                        <Dropdown.Toggle id="dropdown-basic" className='table_filter_icon'>
                        <i class="fas fa-filter" onClick={()=>{this.setState({closeHcmenu:false})}}></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className={this.state.closeHcmenu?"table_dropdown_menu filter_menu d-none":"table_dropdown_menu filter_menu d-block"}>
        <Dropdown.Item href="javascript:void(0)"><div className="custom-control custom-checkbox" onClick={()=>{this.setState({closeHcmenu:false})}}>
  <input type="checkbox" className="custom-control-input" id="customCheck1" />
  <label className="custom-control-label" for="customCheck1">Presale</label>
</div></Dropdown.Item>
        <Dropdown.Item href="javascript:void(0)"><div className="custom-control custom-checkbox" onClick={()=>{this.setState({closeHcmenu:false})}}>
  <input type="checkbox" className="custom-control-input" id="customCheck2" />
  <label className="custom-control-label" for="customCheck2">Fairlaunch</label>
</div></Dropdown.Item>
        <Dropdown.Item href="javascript:void(0)"><div className="custom-control custom-checkbox" onClick={()=>{this.setState({closeHcmenu:false})}}>
  <input type="checkbox" className="custom-control-input" id="customCheck3" />
  <label className="custom-control-label" for="customCheck3">Action</label>
</div></Dropdown.Item>
        <Dropdown.Item href="javascript:void(0)"><div className="custom-control custom-checkbox" onClick={()=>{this.setState({closeHcmenu:false})}}>
  <input type="checkbox" className="custom-control-input" id="customCheck4" />
  <label className="custom-control-label" for="customCheck4">Subscription</label>
</div></Dropdown.Item>
<Dropdown.Divider />
<Dropdown.Item href="javascript:void(0)">
  <div className='dropdown_buttons d-flex justify-content-between'>
  <button className="get-started-btn mr-2">Reset</button>
  <button className="get-started-btn" id="ok_hc" onClick={()=>{this.setState({closeHcmenu:true})}}>OK</button>
  </div>
</Dropdown.Item>

      </Dropdown.Menu>
                        </Dropdown> */}
                      {/* </InputGroup.Text>
                    </InputGroup></th> */}
                    <th><InputGroup className="mb-3 input_group">
                      <Form.Control
                        value="Coin"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        readOnly
                      />
                       <InputGroup.Text
                        id="basic-addon2"
                        className="input_group input_group_filteralign"
                      >
                        <Dropdown className='filter_dropdown'>
                        <Dropdown.Toggle id="dropdown-basic" className='table_filter_icon'>
                        <i class="fas fa-filter" onClick={()=>{this.setState({closeCoinmenu:false});this.closeAllMenusCoin()}}></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className={this.state.closeCoinmenu?"table_dropdown_menu filter_menu d-none":"table_dropdown_menu filter_menu d-block"}>
        <Dropdown.Item href="javascript:viod(0)"><div className="custom-control custom-checkbox" onClick={()=>{this.setState({closeCoinmenu:false})}}>
  <input type="checkbox" className="custom-control-input" 
    checked = {this.state.coin.includes("BNB") ? true : false}
  id="customCheck5" onChange={()=>this.handlecoin("BNB")}/>
  <label className="custom-control-label" for="customCheck5" >BNB</label>
</div></Dropdown.Item>
        <Dropdown.Item href="javascript:viod(0)"><div className="custom-control custom-checkbox" onClick={()=>{this.setState({closeCoinmenu:false})}}>
  <input type="checkbox" onChange={()=>this.handlecoin("BUSD")} 
  checked = {this.state.coin.includes("BUSD") ? true : false}
  className="custom-control-input" id="customCheck6" />
  <label className="custom-control-label" for="customCheck6">BUSD</label>
</div></Dropdown.Item>
        <Dropdown.Item href="javascript:viod(0)"><div className="custom-control custom-checkbox" onClick={()=>{this.setState({closeCoinmenu:false})}}>
  <input type="checkbox" className="custom-control-input" 
  checked = {this.state.coin.includes("USDT") ? true : false}
  onChange={()=>this.handlecoin("USDT")} id="customCheck7" />
  <label className="custom-control-label" for="customCheck7">USDT</label>
</div></Dropdown.Item>
        <Dropdown.Item href="javascript:viod(0)"><div className="custom-control custom-checkbox" onClick={()=>{this.setState({closeCoinmenu:false})}}>
  <input type="checkbox" className="custom-control-input" 
    checked = {this.state.coin.includes("USDC") ? true : false}
  onChange={()=>this.handlecoin("USDC")}  id="customCheck8" />
  <label className="custom-control-label" for="customCheck8">USDC</label>
</div></Dropdown.Item>
        {/* <Dropdown.Item href="javascript:viod(0)"><div className="custom-control custom-checkbox" onClick={()=>{this.setState({closeCoinmenu:false})}}>
  <input type="checkbox" className="custom-control-input" onChange={()=>this.handlecoin("ETH")} id="customCheck9" />
  <label className="custom-control-label" for="customCheck9">ETH</label>
</div></Dropdown.Item> */}
        {/* <Dropdown.Item href="javascript:viod(0)"><div className="custom-control custom-checkbox" onClick={()=>{this.setState({closeCoinmenu:false})}}>
  <input type="checkbox" className="custom-control-input" id="customCheck10" />
  <label className="custom-control-label" for="customCheck10">MATIC</label>
</div></Dropdown.Item>
        <Dropdown.Item href="javascript:viod(0)"><div className="custom-control custom-checkbox" onClick={()=>{this.setState({closeCoinmenu:false})}}>
  <input type="checkbox" className="custom-control-input" id="customCheck11" />
  <label className="custom-control-label" for="customCheck11">AVAX</label>
</div></Dropdown.Item>
        <Dropdown.Item href="javascript:viod(0)"><div className="custom-control custom-checkbox" onClick={()=>{this.setState({closeCoinmenu:false})}}>
  <input type="checkbox" className="custom-control-input" id="customCheck12" />
  <label className="custom-control-label" for="customCheck12">CRO</label>
</div></Dropdown.Item> */}
<Dropdown.Divider />
<Dropdown.Item href="javascript:viod(0)">
  <div className='dropdown_buttons d-flex justify-content-between'>
  <button className="get-started-btn mr-2" onClick={()=>this.setState({coin : []})}>Reset</button>
  <button className="get-started-btn" onClick={()=>{this.setState({closeCoinmenu:true});
  this.handleadvancefilter();
}}>OK</button>
  </div>
</Dropdown.Item>
      </Dropdown.Menu>
                        </Dropdown>
                      </InputGroup.Text>
                    </InputGroup>
                    </th>
                    {/* <th><InputGroup className="mb-3 input_group">
                      <Form.Control
                        value="InitialCap"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                      />
                      <InputGroup.Text
                        id="basic-addon2"
                        className="input_group"
                      >
                        <i class="fa fa-sort" aria-hidden="true"></i>
                      </InputGroup.Text>
                    </InputGroup></th> */}
                    {/* <th><InputGroup className="mb-3 input_group">
                      <Form.Control
                        value="KYC/Audit"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                      />
                       <InputGroup.Text
                        id="basic-addon2"
                        className="input_group input_group_filteralign"
                      >
                        <Dropdown className='filter_dropdown'>
                        <Dropdown.Toggle id="dropdown-basic" className='table_filter_icon'>
                        <i class="fas fa-filter" onClick={()=>{this.setState({closeKycmenu:false})}}></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className={this.state.closeKycmenu?"table_dropdown_menu filter_menu d-none":"table_dropdown_menu filter_menu d-block"}>
        <Dropdown.Item href="javascript:void(0)"><div className="custom-control custom-checkbox" onClick={()=>{this.setState({closeKycmenu:false})}}>
  <input type="checkbox" className="custom-control-input" id="customCheck13" />
  <label className="custom-control-label" for="customCheck13">KYC</label>
</div></Dropdown.Item>
        <Dropdown.Item href="javascript:void(0)"><div className="custom-control custom-checkbox" onClick={()=>{this.setState({closeKycmenu:false})}}>
  <input type="checkbox" className="custom-control-input" id="customCheck14" />
  <label className="custom-control-label" for="customCheck14">Audit</label>
</div></Dropdown.Item>
        <Dropdown.Item href="javascript:void(0)"><div className="custom-control custom-checkbox" onClick={()=>{this.setState({closeKycmenu:false})}}>
  <input type="checkbox" className="custom-control-input" id="customCheck15" />
  <label className="custom-control-label" for="customCheck15">Safu</label>
</div></Dropdown.Item>
        <Dropdown.Item href="javascript:void(0)"><div className="custom-control custom-checkbox" onClick={()=>{this.setState({closeKycmenu:false})}}>
  <input type="checkbox" className="custom-control-input" id="customCheck16" />
  <label className="custom-control-label" for="customCheck16">Doxx</label>
</div></Dropdown.Item>
<Dropdown.Divider />
<Dropdown.Item href="javascript:void(0)">
  <div className='dropdown_buttons d-flex justify-content-between'>
  <button className="get-started-btn mr-2">Reset</button>
  <button className="get-started-btn" onClick={()=>{this.setState({closeKycmenu:true})}}>OK</button>
  </div>
</Dropdown.Item>
      </Dropdown.Menu>
                        </Dropdown>
                      </InputGroup.Text>
                    </InputGroup>
                    </th> */}
                    <th><InputGroup className="mb-3 input_group">
                      <Form.Control
                        value="Status"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        readOnly
                      />
                      <InputGroup.Text
                        id="basic-addon2"
                        className="input_group"
                      >
                        <i class="fa fa-sort" aria-hidden="true"></i>
                      </InputGroup.Text>
                      <InputGroup.Text
                        id="basic-addon2"
                        className="input_group input_group_filteralign"
                      >
                        <Dropdown className='filter_dropdown'>
                        <Dropdown.Toggle id="dropdown-basic" className='table_filter_icon'>
                        <i class="fas fa-filter" onClick={()=>{this.setState({closeStatusmenu:false});this.closeAllMenusStatus()}}></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu  className={this.state.closeStatusmenu?"table_dropdown_menu filter_menu d-none":"table_dropdown_menu filter_menu d-block"}>
        <Dropdown.Item href="javascript:void(0)"><div className="custom-control custom-checkbox" onClick={()=>{this.setState({closeStatusmenu:false})}}>
  <input type="checkbox" className="custom-control-input" 
    checked = {this.state.status.includes("Upcoming") ? true : false} 
  onChange={()=>this.handlestatus("Upcoming")} id="customCheck17" />
  <label className="custom-control-label" for="customCheck17">Upcoming</label>
</div></Dropdown.Item>
        <Dropdown.Item href="javascript:void(0)"><div className="custom-control custom-checkbox" onClick={()=>{this.setState({closeStatusmenu:false})}}>
  <input type="checkbox" className="custom-control-input" id="customCheck18" 
  checked = {this.state.status.includes("Live") ? true : false} 
  onChange={()=>this.handlestatus("Live")} />
  <label className="custom-control-label" for="customCheck18">Live</label>
</div></Dropdown.Item>
        <Dropdown.Item href="javascript:void(0)"><div className="custom-control custom-checkbox" onClick={()=>{this.setState({closeStatusmenu:false})}}>
  <input type="checkbox" checked = {this.state.status.includes("Ended") ? true : false} 
  className="custom-control-input" id="customCheck19" onChange={()=>this.handlestatus("Ended")}/>
  <label className="custom-control-label" for="customCheck19">Ended</label>
</div></Dropdown.Item>
<Dropdown.Divider />
<Dropdown.Item href="javascript:void(0)">
  <div className='dropdown_buttons d-flex justify-content-between'>
  <button className="get-started-btn mr-2" onClick={()=>this.setState({status : []})}>Reset</button>
  <button className="get-started-btn" onClick={()=>{this.setState({closeStatusmenu:true});
  this.handleadvancefilter();
}}>OK</button>
  </div>
</Dropdown.Item>
      </Dropdown.Menu>
                        </Dropdown>
                      </InputGroup.Text>
                    </InputGroup></th>
                    <th></th>
                    <th></th>

                    <th></th>

                    <th></th>

                    <th></th>

                    <th></th>

                    <th></th>

                    {/* <th><InputGroup className="mb-3 input_group">
                      <Form.Control
                        value="Links"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                      />
                    </InputGroup></th>
                    <th><InputGroup className="mb-3 input_group">
                      <Form.Control
                        value="TGOnline"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                      />
                      <InputGroup.Text
                        id="basic-addon2"
                        className="input_group"
                      >
                        <i class="fa fa-sort" aria-hidden="true"></i>
                      </InputGroup.Text>
                    </InputGroup></th>
                    <th><InputGroup className="mb-3 input_group">
                      <Form.Control
                        value="Countdown"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                      />
                      <InputGroup.Text
                        id="basic-addon2"
                        className="input_group"
                      >
                        <i class="fa fa-sort" aria-hidden="true"></i>
                      </InputGroup.Text>
                    </InputGroup></th> */}
    </tr>


    { !isSearch ? 
            (totalSales && totalSales.map((data)=><>
            {/* {console.log("index" , index)} */}
            <tr>
      <td><span className="d-flex align-items-center">

      <div className="relative_token_div  mr-2">
        <img className="token_image_sm " src={data?.logo} />
        </div>
           {data?.name}
        </span></td>
        <td>{data?.LaunchpadType? "Launchpad" : "Fairlaunch"}</td>
        <td>{data?.coin}</td>
        <td>{data?.symbol}</td>
        <td>{data?.softCap/10**18}</td>
        <td>{data?.hardCap/10**18}</td>
        {/* <td><span className="close_icons">
          <i className="far fa-times-circle times_hover"></i>
          <i className="far fa-times-circle times_hover"></i>
          <i className="far fa-times-circle times_hover"></i>
          <i className="far fa-times-circle times_hover active_times"></i>
        </span></td> */}

        <td>
          {data?.LaunchpadType ? <><ProgressBar now={ parseInt(parseInt(data?.earnedCap)/parseInt(data?.hardCap) * 100)} className='yellow_bar mt-3'/>
        <div className="d-flex align-items-center justify-content-between">
        <span className='desc_grey_txt'>{ parseInt(parseInt(data?.earnedCap)/parseInt(data?.hardCap) * 100)} % </span>
               <span className='desc_grey_txt'>{((data?.earnedCap)/10**18).toFixed(3)}/{((data?.hardCap)/10**18).toFixed(2)} </span>
               </div></>
               :
               <><ProgressBar now={data && parseInt(parseInt(data?.earnedCap)/parseInt(data?.softCap) * 100)} className='yellow_bar mt-3'/>
        <div className="d-flex align-items-center justify-content-between">
        <span className='desc_grey_txt'>{data && parseInt(parseInt(data.earnedCap)/parseInt(data.softCap) * 100)} % </span>
               <span className='desc_grey_txt'>{data && ((data.earnedCap)/10**18).toFixed(3)} / {(parseInt(data?.softCap)/10**18).toFixed(2)} {this.state.buyToken} </span>
               </div></>
              
              }
        </td>
        {/* <td><ProgressBar now={data?.earnedCap/10 ** data?.decimals} label={data?.hardCap} className='yellow_bar'/></td> */}
        <td><span>
          <a href={data?.social[1]} target = "_blank"><i class="fas fa-globe green_icons"></i></a>
          <a href={data?.social[1]} target = "_blank"><i class="fab fa-skype green_icons"></i></a>
          <a href={data?.social[5]} target = "_blank"><i class="fab fa-telegram-plane green_icons"></i></a>
        </span></td>
        <td className="table_time">{new Date(data?.startTime*1000)?.getDate()+"/"+new Date(data?.startTime*1000)?.getMonth()+"/"+
        new Date(data?.startTime*1000)?.getFullYear()+" "+new Date(data?.startTime*1000)?.getHours()+":"+
        new Date(data?.startTime*1000)?.getMinutes()+":"+new Date(data?.startTime*1000)?.getSeconds()}</td>
        <td className="table_time">{new Date(data?.endTime*1000)?.getDate()+"/"+new Date(data?.endTime*1000)?.getMonth()+"/"+
        new Date(data?.endTime*1000)?.getFullYear()+" "+new Date(data?.endTime*1000)?.getHours()+":"+
        new Date(data?.endTime*1000)?.getMinutes()+":"+new Date(data?.endTime*1000)?.getSeconds()}</td>
        {/* <td><a className="link_text">Disable</a></td> */}
        <td><a className="link_text" href={`/launchpaddetail/${data.saleAddress}`}>View</a></td>
    </tr>
            </>
            
            )):
            (searchSale && searchSale.map((data)=><>
             {/* {console.log("index" , index)} */}
             <tr>
      <td><span className="d-flex align-items-center">

      <div className="relative_token_div  mr-2">
        <img className="token_image_sm " src={data?.logo} />
        </div>
           {data?.name}
        </span></td>
        <td>{data?.LaunchpadType? "Launchpad" : "Fairlaunch"}</td>
        <td>{data?.coin}</td>
        <td>{data?.symbol}</td>
        <td>{data?.softCap/10**18}</td>
        <td>{data?.hardCap/10**18}</td>
        {/* <td><span className="close_icons">
          <i className="far fa-times-circle times_hover"></i>
          <i className="far fa-times-circle times_hover"></i>
          <i className="far fa-times-circle times_hover"></i>
          <i className="far fa-times-circle times_hover active_times"></i>
        </span></td> */}

        <td><ProgressBar now={ parseInt(parseInt(data?.earnedCap)/parseInt(data?.hardCap) * 100)} className='yellow_bar mt-3'/>
        <div className="d-flex align-items-center justify-content-between">
        <span className='desc_grey_txt'>{ parseInt(parseInt(data?.earnedCap)/parseInt(data?.hardCap) * 100)} % </span>
               <span className='desc_grey_txt'>{((data?.earnedCap)/10**18).toFixed(3)}/{((data?.hardCap)/10**18).toFixed(2)} </span>
               </div>
       </td>
        {/* <td><ProgressBar now={data?.earnedCap/10 ** data?.decimals} label={data?.hardCap} className='yellow_bar'/></td> */}
        <td><span>
          <a href={data?.social[1]} target = "_blank"><i class="fas fa-globe green_icons"></i></a>
          <a href={data?.social[1]} target = "_blank"><i class="fab fa-skype green_icons"></i></a>
          <a href={data?.social[5]} target = "_blank"><i class="fab fa-telegram-plane green_icons"></i></a>
        </span></td>
        <td className="table_time">{new Date(data?.startTime*1000)?.getDate()+"/"+new Date(data?.startTime*1000)?.getMonth()+"/"+
        new Date(data?.startTime*1000)?.getFullYear()+" "+new Date(data?.startTime*1000)?.getHours()+":"+
        new Date(data?.startTime*1000)?.getMinutes()+":"+new Date(data?.startTime*1000)?.getSeconds()}</td>
        <td className="table_time">{new Date(data?.endTime*1000)?.getDate()+"/"+new Date(data?.endTime*1000)?.getMonth()+"/"+
        new Date(data?.endTime*1000)?.getFullYear()+" "+new Date(data?.endTime*1000)?.getHours()+":"+
        new Date(data?.endTime*1000)?.getMinutes()+":"+new Date(data?.endTime*1000)?.getSeconds()}</td>
        <td><a className="link_text">View</a></td>
    </tr>
            </>
           
            ))
            }
  </table>
</div>
<div className='text-center mt-5'>
{ isSearch ?
              <>
            {searchSale && searchSale.length < this.state.searchProxy.length ? 
            
            <button className="get-started-btn" onClick={this.loadSearchMore.bind(this)} id="load_more_btn">{this.state.isLoading ? 'Loading...' : 'View More Pools' }</button>
            :<></>
            }
            </> :  <>
            {totalSales && totalSales.length < this.state.proxy.length ? 
            <button className="get-started-btn" onClick={this.loadMore.bind(this)} id="load_more_btn">{this.state.isLoading ? 'Loading...' : 'View More Pools' }</button>
            :<></>
            }
            </>
            }
             
      </div>       
        </Tab.Pane>
        <Tab.Pane eventKey="third">
        <div className="tab_img">
        <div className='row_div'>
                <div>
                <div className='row_div'>
                <div>
                  <div className='row'>
                    <div className='col-12 col-md-6 col-xl-8 mb-2 mb-md-0'>
                    <p className='label_input invisible'>Search</p>

                    <input className="form-control searc_style_2" value={search} type="text" onChange={(e)=> { this.setState({ search: e.target.value }); this.handleChange(e); }} onKeyDown={(e)=>this.handleChange(e)}  placeholder="Enter token name or token symbol" aria-label="Search" />

                    </div>
                    <div className='col-6 col-md-3 col-xl-2'>
                    <p className='label_input'>Filter By</p>
                    <Dropdown className='dropdown_normal' >
                  <Dropdown.Toggle variant="success" id="dropdown-basic" >
                  {this.state.filterdata}
                  </Dropdown.Toggle>

                  <Dropdown.Menu className='dropdown_normal_menu' key = {"up"}>
                  <Dropdown.Item ><p onClick={(e)=>this.handlefilter("All Status")}>All Status</p></Dropdown.Item>
                      {/* <Dropdown.Item>KYC</Dropdown.Item> */}
                      <Dropdown.Item key ={"up"}><p onClick={(e)=>this.handlefilter("Upcoming")}>Upcoming</p></Dropdown.Item>
                      <Dropdown.Item><p onClick={(e)=>this.handlefilter("Live")}>Live</p></Dropdown.Item>
                      {/* <Dropdown.Item>Filled</Dropdown.Item> */}
                      <Dropdown.Item><p onClick={(e)=>this.handlefilter("Ended")}>Ended</p></Dropdown.Item>
                      {/* <Dropdown.Item>Cancelled</Dropdown.Item> */}
                  </Dropdown.Menu>
                </Dropdown>                     
                    </div>
                    <div className='col-6 col-md-3 col-xl-2'>
                    <p className='label_input'>Sort By</p>
                    <Dropdown className='dropdown_normal'>
                  <Dropdown.Toggle variant="success" id="dropdown-basic-1">
                 {this.state.sortdata}
                  </Dropdown.Toggle>

                  <Dropdown.Menu className='dropdown_normal_menu'>
                  <Dropdown.Item><p onClick={(e)=>this.handlesort("No Filter")}>No Filter</p></Dropdown.Item>
                      {/* <Dropdown.Item>Hard Cap</Dropdown.Item>
                      <Dropdown.Item>Soft Cap</Dropdown.Item>
                      <Dropdown.Item>LP Percent</Dropdown.Item> */}
                      <Dropdown.Item><p onClick={(e)=>this.handlesort("Start Time")}>Start Time</p></Dropdown.Item>
                      <Dropdown.Item><p onClick={(e)=>this.handlesort("End Time")}>End Time</p></Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>  
                  </div>
                  </div>
                
                </div>
              </div>
                
                </div>
              </div>
              {true?
              <>
               <div className='row mt-5'>

               { !isSearch ? 
               (totalSales && totalSales.map((index)=>
               <Buycard saleData={index} user = {false} connect={"string"} />
               )):
               (searchSale && searchSale.map((index)=>
               <Buycard saleData={index} user = {false} connect={"string"} />
               ))
               }
               </div>
               <div className='text-center mt-3'>
                

            { isSearch ?
              <>
            {searchSale && searchSale.length < this.state.searchProxy.length ? 
            
            <button className="get-started-btn" onClick={this.loadSearchMore.bind(this)} id="load_more_btn">{this.state.isLoading ? 'Loading...' : 'View More Pools' }</button>
            :<></>
            }
            </> :  <>
            {totalSales && totalSales.length < this.state.proxy.length ? 
            <button className="get-started-btn" onClick={this.loadMoremycontribution.bind(this)} id="load_more_btn">{this.state.isLoading ? 'Loading...' : 'View More Pools' }</button>
            :<></>
            }
            </>
            }
              
               </div>
               </>:
               
            <div className='row mt-5'>
            <div className='col-12'>
              <p className='no_data_txt'>No Data</p>
            </div>
          </div>
              }
           
          
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

              {/* upcoming_sec */}
              {/* <div className='upcoming_sec mt-5'>
            <div className="container container_custom">
                <div  className='top_heqad_sec'>
                <div className='text-right'>
                <input className="form-control searc_style_1" type="text" placeholder="&#xF002; Project Name" aria-label="Search" />
                </div>
                  <div className="row py-3">
                      <div className="col-12 col-md-12 flex_cen_col">
                        <p className="banner_title text-center">Upcoming IDOs</p>
                        <hr className='hr_yellow mt-5'/>
                      </div>
                    
                  </div>
                </div>
            </div>
           
            <div className="inner_bg mt-4">
            <div className="container container_custom">


            <div className='row  justify-content-between'>
             
            <Buycard connect={"string"} />
            <Buycard connect={"string"} />
            </div>
            <div className='text-center mt-3'>

            <button className="get-started-btn" id="load_more_btn_1">Load More</button>
            <img src={loader}  id="loader_div_sm_1" className='d-none'/>
            </div>
                </div>
            </div>
            </div> */}
            {/* end upcoming_sec */}

            <Container className='pb-5 px-0'>
                 
                  <center>
                    <small className="mt-0 bottom_text">
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

export default LaunchpadList