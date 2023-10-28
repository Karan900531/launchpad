import React, { Component } from 'react';
import { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import Adminheader from './Adminheader';
import Adminsidebar from './Adminsidebar';
import Cookies from 'universal-cookie';

import Web3 from "web3";
import '../../css/styles.css';

import coin from "../../images/coin.png"
import favicon from "../../images/favicon.png"

import loader from "../../images/loader.gif"
import { Dropdown, Nav, Tab, Row, Col, Container, ProgressBar, InputGroup,Form } from 'react-bootstrap';
import { getlaunchpaddatalimit, getPrivatesaleCardLimit, getSaleCardsLimit, getTotalSalesInfo, isSaleLive, isUpcoming, searchCards } from '../../hooks/useProjects';
import { DeletePresale, UseTokenInfo } from '../../hooks/useContract';
import { getAccount } from '../../hooks/useAccount';
import { admintokenfilterlaunchpad, tokenfilter, tokenfilterlaunchpad } from '../../hooks/filter';
const cookies = new Cookies();

class Adminlaunchpad extends Component {
   
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
  
    componentDidMount()
    {
      this.restrict()
      // this.showLoader();
     this.hideLoader();
    this.gettotalsalesinfo();

  
    }

    restrict = async()=>{
      var email = cookies.get('cryp-launch-admin-email');
      console.log("email" , email);
      if(!email){
        this.props.history.push("/login")
      }
    }

    gettotalsalesinfo = async()=>{
      this.showLoader();
        const totalproxydata = await getTotalSalesInfo();
        console.log("Proxydata",totalproxydata);
        // const totalproxydata = Proxydata.filter(data => data._isWhitelisted == true)
        console.log("total proxy data" , totalproxydata);
        this.setState({ proxy : totalproxydata })
        this.setState({ original : totalproxydata })
        const total = await getlaunchpaddatalimit(totalproxydata , 0 , this.state.loadInterval);
        // const total = await getPrivatesaleCardLimit(Proxydata,0,this.state.interval , this.state.isuser);
        // console.log("button " ,Proxydata?.length , total.index );
        // if(Proxydata?.length == total.index || !total){
        //   this.setState({button : false})
        // }
        // await this.sleep(1000)
        //  this.setState({ totalSales: total.saleInfoCards });  
        //  this.setState({ interval: total.index+1 }); 
        console.log("limittotal" , total);
        this.setState({ totalSales: total });  
         this.setState({ interval: this.state.loadinterval}); 
        this.hideLoader();
    }
    viewmore = async()=>{
      console.log("Lad moreee",this.state.totalSales.length < this.state.proxy.length)
      this.setState({ isLoading: true});
      console.log("getlaunchpad datalimit" , this.state.interval,this.state.loadInterval );
      const newly = await getlaunchpaddatalimit(this.state.proxy,this.state.interval,this.state.interval+this.state.loadInterval );
      console.log("newly " , newly);
      const total = this.state.totalSales.concat(newly);
      this.setState({ totalSales: total,interval: this.state.interval+this.state.loadInterval });
       this.setState({ isLoading: false});  
    }
    sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
   
    // constructor(props) {
    //   super(props);
    //   this.state = { 
    //     original : [], 
    //     proxy : [],
    //    salesinfo : [],
    //    interval : 3,
    //    loadInterval : 3,
    //   //  interval : 3,
    //    record : 3,
    //    isLoading : false,
    //    //filter
    //    token : [],
    //    hc : [],
    //    coin : [],
    //    status : [],
    //    closeHcmenu:false,
    //    closeCoinmenu:false,
    //    closeKycmenu:false,
    //    closeStatusmenu:false,
    //    issearch : false,
    //    search : "",
      
      
    //   };
    // }
    constructor(props) {
      super(props);
      this.state = {  
        original : [],
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
        loadinterval : 3,

        mycontribution : [],
        accountInfo : getAccount(),
        filterdata : "All Status",
        sortdata : "No Filter",
        coin : [],
        status : [],
        type : []
      
      };
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

    async loadSearchMore(){
      console.log("Lad more",this.state.totalSales.length < this.state.proxy.length)
      this.setState({ isLoading: true});
      const newly = await getlaunchpaddatalimit(this.state.searchProxy,this.state.searchInterval,this.state.searchInterval+this.state.loadInterval);
      const total = this.state.searchSale.concat(newly);
      await this.sleep(1000)
       this.setState({ searchSale: total,searchInterval: this.state.searchInterval+this.state.loadInterval });
       this.setState({ isLoading: false});   
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
        this.gettotalsalesinfo();
      }
      // let filtered = await tokenfilter(this.state.proxy , this.state.coin , this.state.status);
      let filtered = await admintokenfilterlaunchpad(this.state.original , this.state.coin , this.state.status , this.state.type);
      console.log("filtered" , filtered);
      if(filtered.length > 0){
        this.setState({proxy : filtered})
        const salelist = await getSaleCardsLimit(filtered , 0 , this.state.interval);
        // this.GetBuytokeninfo(salelist?.useWithToken)
        
        console.log("salelist" , salelist);
        this.setState({"totalSales" : salelist});
        // this.setState({issearch : true});
        this.hideLoader()
      }
      else {
        // this.setState({button : false})
        this.setState({ totalSales: filtered });
        this.setState({"salesinfo" : filtered});
        this.hideLoader();
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
               <div className='ongoing_sec proj_bg pb-5'>
            <div className="container px-1">
                <div className='top_heqad_sec mt-5 mt-md-0'>
                   
                  <div className="row">
                      <div className="col-12 col-md-12 flex_cen_col mt-md-5 mb-md-4 flex_row_cen">
                        <p className="banner_subtitle form_subhead">Launchpad And Privatesale List</p>
                        <p className="banner_subtitle form_subhead_1">Total Records: {this?.state?.proxy?.length}</p>
                       
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
               
               
        <div class="table-responsive mt-3 table_repso_with_dropdwon">
  <table className="table table_admin_laun">
    <tr>
    <th><InputGroup className="mb-3 input_group search_bar">
                      <Form.Control
                        placeholder="Search"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        value={this.state.search}  onChange={(e)=> { this.setState({ search: e.target.value }); this.handleChange(e); }} onKeyDown={(e)=>this.handleChange(e)}  
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

<Dropdown.Item href="javascript:void(0)"><div className="custom-control custom-checkbox" onClick={()=>{this.setState({closeHcmenu:false})}}>
  <input type="checkbox" className="custom-control-input" id="customCheck3" 
    checked = {this.state.type.includes("Privatesale") ? true : false}
    onChange={()=>this.handletype("Privatesale")}
  />
  <label className="custom-control-label" for="customCheck3">Privatesale</label>
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
                    {/* <th><InputGroup className="mb-3 input_group">
                      <Form.Control
                        value="Coin"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                      />
                       <InputGroup.Text
                        id="basic-addon2"
                        className="input_group input_group_filteralign"
                      >
                        <Dropdown className='filter_dropdown'>
                        <Dropdown.Toggle id="dropdown-basic" className='table_filter_icon'>
                        <i class="fas fa-filter" onClick={()=>{this.setState({closeCoinmenu:false})}}></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className={this.state.closeCoinmenu?"table_dropdown_menu filter_menu d-none":"table_dropdown_menu filter_menu d-block"}>
        <Dropdown.Item href="javascript:viod(0)"><div className="custom-control custom-checkbox" onClick={()=>{this.setState({closeCoinmenu:false})}}>
  <input type="checkbox" className="custom-control-input" id="customCheck5" />
  <label className="custom-control-label" for="customCheck5">BNB</label>
</div></Dropdown.Item>
        <Dropdown.Item href="javascript:viod(0)"><div className="custom-control custom-checkbox" onClick={()=>{this.setState({closeCoinmenu:false})}}>
  <input type="checkbox" className="custom-control-input" id="customCheck6" />
  <label className="custom-control-label" for="customCheck6">BUSD</label>
</div></Dropdown.Item>
        <Dropdown.Item href="javascript:viod(0)"><div className="custom-control custom-checkbox" onClick={()=>{this.setState({closeCoinmenu:false})}}>
  <input type="checkbox" className="custom-control-input" id="customCheck7" />
  <label className="custom-control-label" for="customCheck7">USDT</label>
</div></Dropdown.Item>
        <Dropdown.Item href="javascript:viod(0)"><div className="custom-control custom-checkbox" onClick={()=>{this.setState({closeCoinmenu:false})}}>
  <input type="checkbox" className="custom-control-input" id="customCheck8" />
  <label className="custom-control-label" for="customCheck8">USDC</label>
</div></Dropdown.Item>
        <Dropdown.Item href="javascript:viod(0)"><div className="custom-control custom-checkbox" onClick={()=>{this.setState({closeCoinmenu:false})}}>
  <input type="checkbox" className="custom-control-input" id="customCheck9" />
  <label className="custom-control-label" for="customCheck9">ETH</label>
</div></Dropdown.Item>
        <Dropdown.Item href="javascript:viod(0)"><div className="custom-control custom-checkbox" onClick={()=>{this.setState({closeCoinmenu:false})}}>
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
</div></Dropdown.Item>
<Dropdown.Divider />
<Dropdown.Item href="javascript:viod(0)">
  <div className='dropdown_buttons d-flex justify-content-between'>
  <button className="get-started-btn mr-2">Reset</button>
  <button className="get-started-btn" onClick={()=>{this.setState({closeCoinmenu:true})}}>OK</button>
  </div>
</Dropdown.Item>
      </Dropdown.Menu>
                        </Dropdown>
                      </InputGroup.Text>
                    </InputGroup>
                    </th> */}
                    {/*<th><InputGroup className="mb-3 input_group">
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
                    </InputGroup></th>
                    <th><InputGroup className="mb-3 input_group">
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
                    </th>
                    <th><InputGroup className="mb-3 input_group">
                      <Form.Control
                        value="Status"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
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
                        <i class="fas fa-filter" onClick={()=>{this.setState({closeStatusmenu:false})}}></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu  className={this.state.closeStatusmenu?"table_dropdown_menu filter_menu d-none":"table_dropdown_menu filter_menu d-block"}>
        <Dropdown.Item href="javascript:void(0)"><div className="custom-control custom-checkbox" onClick={()=>{this.setState({closeStatusmenu:false})}}>
  <input type="checkbox" className="custom-control-input" id="customCheck17" />
  <label className="custom-control-label" for="customCheck17">Upcoming</label>
</div></Dropdown.Item>
        <Dropdown.Item href="javascript:void(0)"><div className="custom-control custom-checkbox" onClick={()=>{this.setState({closeStatusmenu:false})}}>
  <input type="checkbox" className="custom-control-input" id="customCheck18" />
  <label className="custom-control-label" for="customCheck18">Live</label>
</div></Dropdown.Item>
        <Dropdown.Item href="javascript:void(0)"><div className="custom-control custom-checkbox" onClick={()=>{this.setState({closeStatusmenu:false})}}>
  <input type="checkbox" className="custom-control-input" id="customCheck19" />
  <label className="custom-control-label" for="customCheck19">Fill</label>
</div></Dropdown.Item>
<Dropdown.Divider />
<Dropdown.Item href="javascript:void(0)">
  <div className='dropdown_buttons d-flex justify-content-between'>
  <button className="get-started-btn mr-2">Reset</button>
  <button className="get-started-btn" onClick={()=>{this.setState({closeStatusmenu:true})}}>OK</button>
  </div>
</Dropdown.Item>
      </Dropdown.Menu>
                        </Dropdown>
                      </InputGroup.Text>
                    </InputGroup></th>
                    <th><InputGroup className="mb-3 input_group">
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
</div></Dropdown.Item>
        <Dropdown.Item href="javascript:viod(0)"><div className="custom-control custom-checkbox" onClick={()=>{this.setState({closeCoinmenu:false})}}>
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
   
   
    </tr>

    {this.state.isSearch ? 
      (this.state.searchSale && this?.state?.searchSale?.map((data , index)=><>
        <tr>
  <td><span className="d-flex align-items-center">

  <div className="relative_token_div  mr-2">
    <img className="token_image_sm " src={data?.logo} />
    </div>
       {data?.name}
    </span></td>
    <td>{data ?.isWhitelisted ? "PrivateSale" : data?.LaunchpadType? "Launchpad" : "Fairlaunch"  }</td>
    <td>{data?.symbol}</td>
    <td><span >{
                                              data && isSaleLive(data?.startTime,data?.endTime,data?.isPresaleOpen) ?
                                             " Sales Live"
                                            : data && isUpcoming(data?.startTime)? "Upcoming" : "Sale Ended"
                                            }</span></td>
    <td>{data?.softCap/10**18}</td>
    <td>{data?.hardCap/10**18}</td>
    {/* <td><span className="close_icons">
      <i className="far fa-times-circle times_hover"></i>
      <i className="far fa-times-circle times_hover"></i>
      <i className="far fa-times-circle times_hover"></i>
      <i className="far fa-times-circle times_hover active_times"></i>
    </span></td> */}

    <td><ProgressBar now={ parseInt(parseInt(data?.earnedCap)/parseInt(data?.hardCap) * 100)} className='yellow_bar mt-3'/>
   <div className='d-flex align-items-center justify-content-between'>
    <span className='desc_grey_txt'>{ parseInt(parseInt(data?.earnedCap)/parseInt(data?.hardCap) * 100)} % </span>
           <span className='desc_grey_txt'>{((data?.earnedCap)/10**18).toFixed(3)}/{((data?.hardCap)/10**18).toFixed(2)} </span>
           </div>
    </td>
    {/* <td><ProgressBar now={data?.earnedCap/10 ** data?.decimals} label={data?.hardCap} className='yellow_bar'/></td> */}
    {/* <td><span>
      <a href={data?.social[1]} target = "_blank"><i class="fas fa-globe green_icons"></i></a>
      <a href={data?.social[1]} target = "_blank"><i class="fab fa-skype green_icons"></i></a>
      <a href={data?.social[5]} target = "_blank"><i class="fab fa-telegram-plane green_icons"></i></a>
    </span></td> */}
    <td className="table_time">{new Date(data?.startTime*1000)?.getDate()+"/"+new Date(data?.startTime*1000)?.getMonth()+"/"+
    new Date(data?.startTime*1000)?.getFullYear()+" "+new Date(data?.startTime*1000)?.getHours()+":"+
    new Date(data?.startTime*1000)?.getMinutes()+":"+new Date(data?.startTime*1000)?.getSeconds()}</td>
    <td className="table_time">{new Date(data?.endTime*1000)?.getDate()+"/"+new Date(data?.endTime*1000)?.getMonth()+"/"+
    new Date(data?.endTime*1000)?.getFullYear()+" "+new Date(data?.endTime*1000)?.getHours()+":"+
    new Date(data?.endTime*1000)?.getMinutes()+":"+new Date(data?.endTime*1000)?.getSeconds()}</td>
    <td><a className="link_text" onClick={()=>DeletePresale(data?.saleAddress , getAccount())}>Disable</a></td>
  </tr>
      </>)) :


(this.state.totalSales && this?.state?.totalSales?.map((data , index)=><>
  <tr>
  <td><span className="d-flex align-items-center">

  <div className="relative_token_div  mr-2">
    <img className="token_image_sm " src={data?.logo} />
    </div>
       {data?.name}
    </span></td>
    <td>{data ?.isWhitelisted ? "PrivateSale" : data?.LaunchpadType? "Launchpad" : "Fairlaunch"  }</td>
    <td>{data?.symbol}</td>
    <td><span >{
                                              data && isSaleLive(data?.startTime,data?.endTime,data?.isPresaleOpen) ?
                                             " Sales Live"
                                            : data && isUpcoming(data?.startTime)? "Upcoming" : "Sale Ended"
                                            }</span></td>
    <td>{data?.softCap/10**18}</td>
    <td>{data?.hardCap/10**18}</td>
    {/* <td><span className="close_icons">
      <i className="far fa-times-circle times_hover"></i>
      <i className="far fa-times-circle times_hover"></i>
      <i className="far fa-times-circle times_hover"></i>
      <i className="far fa-times-circle times_hover active_times"></i>
    </span></td> */}

    <td>
      {data.LaunchpadType ?<>
      <ProgressBar now={ parseInt(parseInt(data?.earnedCap)/parseInt(data?.hardCap) * 100)} className='yellow_bar mt-3'/>
   <div className='d-flex align-items-center justify-content-between'>
    <span className='desc_grey_txt'>{ parseInt(parseInt(data?.earnedCap)/parseInt(data?.hardCap) * 100)} % </span>
           <span className='desc_grey_txt'>{((data?.earnedCap)/10**18).toFixed(3)}/{((data?.hardCap)/10**18).toFixed(2)} </span>
           </div></>
            :
           <><ProgressBar now={data && parseInt(parseInt(data?.earnedCap)/parseInt(data?.softCap) * 100)} className='yellow_bar mt-3'/>
 <div className="d-flex align-items-center justify-content-between">
 <span className='desc_grey_txt'>{data && parseInt(parseInt(data.earnedCap)/parseInt(data.softCap) * 100)} %  </span>
        <span className='desc_grey_txt'>{data && ((data.earnedCap)/10**18).toFixed(3)} / {(parseInt(data?.softCap)/10**18).toFixed(2)} {this.state.buyToken}  </span>
        </div></>}
    </td>
    {/* <td><ProgressBar now={data?.earnedCap/10 ** data?.decimals} label={data?.hardCap} className='yellow_bar'/></td> */}
    {/* <td><span>
      <a href={data?.social[1]} target = "_blank"><i class="fas fa-globe green_icons"></i></a>
      <a href={data?.social[1]} target = "_blank"><i class="fab fa-skype green_icons"></i></a>
      <a href={data?.social[5]} target = "_blank"><i class="fab fa-telegram-plane green_icons"></i></a>
    </span></td> */}
    <td className="table_time">{new Date(data?.startTime*1000)?.getDate()+"/"+new Date(data?.startTime*1000)?.getMonth()+"/"+
    new Date(data?.startTime*1000)?.getFullYear()+" "+new Date(data?.startTime*1000)?.getHours()+":"+
    new Date(data?.startTime*1000)?.getMinutes()+":"+new Date(data?.startTime*1000)?.getSeconds()}</td>
    <td className="table_time">{new Date(data?.endTime*1000)?.getDate()+"/"+new Date(data?.endTime*1000)?.getMonth()+"/"+
    new Date(data?.endTime*1000)?.getFullYear()+" "+new Date(data?.endTime*1000)?.getHours()+":"+
    new Date(data?.endTime*1000)?.getMinutes()+":"+new Date(data?.endTime*1000)?.getSeconds()}</td>
    <td><a className="link_text" onClick={()=>DeletePresale(data?.saleAddress , getAccount())}>Disable</a></td>
</tr>
</>))
      
  }


    
  
    
    
    {/* <tr>
      <td><span className="d-flex align-items-center">
      <div className="relative_token_div  mr-2">
        <img className="token_image_sm " src={favicon} />
        </div> 5IREToken
        </span></td>
        <td>Fairlaunch</td>
        <td>BNB</td>
        <td>$580</td>
        <td><span className="close_icons">
          <i className="far fa-times-circle times_hover"></i>
          <i className="far fa-times-circle times_hover"></i>
          <i className="far fa-times-circle times_hover"></i>
          <i className="far fa-times-circle times_hover active_times"></i>
        </span></td>
        <td><ProgressBar now={20} label={20} className='yellow_bar'/></td>
        <td><span>
        <a href="#"><i class="fas fa-globe green_icons"></i></a>
          <a href="#"><i class="fab fa-skype green_icons"></i></a>
          <a href="#"><i class="fab fa-telegram-plane green_icons"></i></a>
        </span></td>
        <td>11/100</td>
        <td className="table_time">03:05:42:01</td>
        <td><a className="link_text">Disable</a></td>
    </tr>
    <tr>
      <td><span className="d-flex align-items-center">
      <div className="relative_token_div  mr-2">
        <img className="token_image_sm " src={favicon} />
        </div> 5IREToken
        </span></td>
        <td>Fairlaunch</td>
        <td>BNB</td>
        <td>$580</td>
        <td><span className="close_icons">
          <i className="far fa-times-circle times_hover"></i>
          <i className="far fa-times-circle times_hover"></i>
          <i className="far fa-times-circle times_hover"></i>
          <i className="far fa-times-circle times_hover active_times"></i>
        </span></td>
        <td><ProgressBar now={20} label={20} className='yellow_bar'/></td>
        <td><span>
        <a href="#"><i class="fas fa-globe green_icons"></i></a>
          <a href="#"><i class="fab fa-skype green_icons"></i></a>
          <a href="#"><i class="fab fa-telegram-plane green_icons"></i></a>
        </span></td>
        <td>11/100</td>
        <td className="table_time">03:05:42:01</td>
        <td><a className="link_text">Disable</a></td>
    </tr> */}
  </table>
  {this.state.proxy.length == 0 && <p className='no_data_text'>No Data Found</p>}
</div>

<div className='text-center mt-5'>
{ this.state.isSearch ?
              <>
            {this.state.searchSale && this.state.searchSale.length < this.state.searchProxy.length ? 
            
            <button className="get-started-btn" onClick={this.loadSearchMore.bind(this)} id="load_more_btn">{this.state.isLoading ? 'Loading...' : 'View More Pools' }</button>
            :<></>
            }
            </> :  <>
            {this.state.totalSales && this.state.totalSales.length < this.state.proxy.length ? 
            <button className="get-started-btn" onClick={this.viewmore.bind(this)} id="load_more_btn">{this.state.isLoading ? 'Loading...' : 'View More Pools' }</button>
            :<></>
            }
            </>
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

export default Adminlaunchpad