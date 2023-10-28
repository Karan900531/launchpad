import React, { Component } from 'react';
import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Modal, FormControl, InputGroup } from 'react-bootstrap';
import { trendingvalidate } from '../../hooks/kycvalidation';
import { edittrendinghook } from '../../hooks/usebackend';

import proof from "../../images/proof.webp"

class EditTrendingModal extends Component
{
    constructor(props) {
        super(props);
        this.state = {          
            edittrendingModal: true,
            saleaddress : "",
            status : "",
            displayname : "",
            errors : {},
            position : "",
            date : "",
            type : "Launchpad"
           
        };
    }

    componentDidMount(){
        this.editdata();
    }

    editdata = async() => {
        this.setState({saleaddress : this.props.data.saleaddress})
        this.setState({status : this.props.data.status})
        this.setState({displayname : this.props.data.displayname})
        this.setState({type : this.props.data.saletype})
        this.setState({position : this.props.data.position})
        this.setState({date : this.props.data.date})   
        console.log("datessss" , this.props.data, new Date(parseFloat(this.props.data.date)));
    }

    handleedit = async() => {
        let payload = {
            saleaddress : this.state.saleaddress,
            status : this.state.status,
            displayname : this.state.displayname,
            id : this.props.data._id,
            type : this.state.type,
            position : this.state.position.toString(),
            date : this.state.date.toString()
        }

        let validate = await trendingvalidate(payload);
        if(validate.isValid){
            let settingresult = await edittrendinghook(payload);
            console.log("trending result" , settingresult);
            this.props.onDismiss();
            this.props.getset();
        }
        else{
            this.setState({"errors" : validate.errors})
        }
    }

    filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);
    
        return currentDate.getTime() < selectedDate.getTime();
      };


   render() {
        
  
        const {edittrendingModal} = this.state

        
      return (

        

        <Modal className="wallet-modal" show={edittrendingModal} centered size="md">
        <Modal.Header className='pt-3 header_odal_head'>
        <h3 className="sec-head ">Edit Trending</h3>
            <button type="button" class="close" onClick={() => this.props.onDismiss()}><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>

        </Modal.Header>
        <Modal.Body className="select-wallet modal_body pt-0 pb-0 px-0">

        <div className="wallet-lists px-2">
                              
        <div className='mod_pad_space pt-0'>
        <div className='row'>
                <div className='col-12 col-md-12 px-1 mb-3'>
                        
                        
                        
                       </div>
                        <div className='col-12 col-md-12 px-1 mb-3'>
                    <p className='input_desc_sm'>Sale Address</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl id="saleaddress"  placeholder="Sale Address"
                                aria-describedby="basic-addon2"
                                value = {this.state.saleaddress}
                                onChange = {(e)=>this.setState({saleaddress : e.target.value})}
                            />
                          
                        </InputGroup>
                        <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.saleaddress}</span>
                    </div>                    
                        </div>

                        <div className='col-12 col-md-12 px-1 mb-3'>
                    <p className='input_desc_sm'>Display Name</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl id="displayname"  placeholder="Display Name"
                                aria-describedby="basic-addon2"
                                value = {this.state.displayname}
                                onChange = {(e)=>this.setState({displayname : e.target.value})}
                            />
                          
                        </InputGroup>
                        <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.displayname}</span>
                    </div>
                        </div> 

                        <div className='col-12 col-md-12 px-1 mb-3'>
                    <p className='input_desc_sm'>Sale type</p>

                        <select className="form-control custm_sel" id="exampleFormControlSelect3" 
                         value={this.state.type}
                         onChange = {(e)=>{
                            console.log("status" , e.target.value);
                            this.setState({type : e.target.value})}}
                         placeholder="Select Status"
                        >
                            {/* <option value="">Select Status</option> */}
                         <option value="Launchpad">Launchpad</option>
                            <option value="Privatesale">Privatesale</option>                      

                        </select>
                        <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.status}</span>
                        </div>

                        <div className='col-12 col-md-12 px-1 mb-3'>
                    <p className='input_desc_sm'>Status</p>

                        <select className="form-control custm_sel" id="exampleFormControlSelect3" 
                         value={this.state.status}
                         onChange = {(e)=>{
                            console.log("status" , e.target.value);
                            this.setState({status : e.target.value})}}
                         placeholder="Select Status"
                        >
                            <option value="">Select Status</option>
                         <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>                      

                        </select>
                        <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.status}</span>
                        </div>


                        <div className='col-12 col-md-12 px-1 mb-3'>
                    <p className='input_desc_sm'>Position</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl id="displayname" placeholder="Position"
                                aria-describedby="basic-addon2"
                                value = {this.state.position}
                                onChange = {(e)=>this.setState({position : e.target.value})}
                                readOnly = {true}
                            />
                          
                        </InputGroup>
                        <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.position}</span>
                    </div>
                        </div> 
                   



                    <div className='col-12 col-md-12 px-1 mb-3'>
                    <p className='input_desc_sm'>End Date</p>
                    <div className="inputs input-groups themeinputgroup">
                    <InputGroup className="datepicker_input" >
                        <DatePicker
                         minDate={new Date()}
                                                    filterTime={this.filterPassedTime.bind(this)}
                                                   showTimeSelect
                                                //    new Date(timestamp.seconds*1000)
                                                //    selected={new Date(this.state.date)}
                                                selected = {this.state.date && new Date(parseFloat(this.state.date))}
                                                   onChange={(date)=> {
                                                      let newdate = Date.parse(date);
                                                      console.log("newdate" , newdate);
                                                      this.setState({date : newdate})
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
                        <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.displayname}</span>
                    </div>
                        </div> 
                       
          
         
                    <div className='col-12 col-md-12 px-1 text-center'>
                        <button className="get-started-btn mt-2" onClick={this.handleedit}>
                           Edit
                        </button>
                        
                        </div>
                </div>

            </div>
    </div>
        </Modal.Body>
    </Modal>



      )
    }

}


export default EditTrendingModal