import React, { Component } from 'react';
import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Modal, FormControl, InputGroup } from 'react-bootstrap';
import { trendingvalidate } from '../../hooks/kycvalidation';
import { addtrendinghook } from '../../hooks/usebackend';

import proof from "../../images/proof.webp"

class AddTrendingModal extends Component
{
    constructor(props) {
        super(props);
        this.state = {          
            addtrendingModal: true,
            saleaddress : "",
            status : "",
            displayname : "",
            type : "Launchpad",
            position : "",
            date : "",
            errors : {}
           
        };
    }

    handleadd = async() => {
        let payload = {
            saleaddress : this.state.saleaddress,
            status : this.state.status,
            displayname : this.state.displayname,
            type : this.state.type,
            position : this.state.position,
            date : this.state.date.toString()
        }

        let validate = await trendingvalidate(payload);
        console.log("validate " , validate);
        if(validate.isValid){
            let settingresult = await addtrendinghook(payload);
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
        
  
        const {addtrendingModal} = this.state

        
      return (

        

        <Modal className="wallet-modal" show={addtrendingModal} centered size="md">
        <Modal.Header className='pt-3 header_odal_head'>
        <h3 className="sec-head ">Add Trending</h3>
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
                            <FormControl id="saleaddress" placeholder="Sale Address"
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
                            <FormControl id="displayname" placeholder="Display Name"
                                aria-describedby="basic-addon2"
                                value = {this.state.displayname}
                                onChange = {(e)=>this.setState({displayname : e.target.value})}
                            />
                          
                        </InputGroup>
                        <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.displayname}</span>
                    </div>
                        </div> 

                        <div className='col-12 col-md-12 px-1 mb-3'>
                    <p className='input_desc_sm'>Sale Type</p>

                        <select className="form-control custm_sel" id="exampleFormControlSelect3" 
                         
                         placeholder="Select Status"
                         onChange = {(e)=>{
                            console.log("status" , e.target.value);
                            this.setState({type : e.target.value})}}
                        >
                            
                            <option value="Launchpad">Launchpad</option>
                            <option value="Privatesale">Privatesale</option>                      

                        </select>
                        <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.status}</span>
                        </div>

                        <div className='col-12 col-md-12 px-1 mb-3'>
                    <p className='input_desc_sm'>Status</p>

                        <select className="form-control custm_sel" id="exampleFormControlSelect3" 
                         
                         placeholder="Select Status"
                         onChange = {(e)=>{
                            console.log("status" , e.target.value);
                            this.setState({status : e.target.value})}}
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
                                                   selected={this.state.date}
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
                        <button className="get-started-btn mt-2" onClick={this.handleadd}>
                           Add
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


export default AddTrendingModal