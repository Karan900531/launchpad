import React, { Component } from 'react';
import { useContext, useEffect, useState } from "react";
import { Modal, FormControl, InputGroup } from 'react-bootstrap';
import { settingvalidate } from '../../hooks/kycvalidation';
import { addsettinghook } from '../../hooks/usebackend';

import proof from "../../images/proof.webp"

class Addsettingmodal extends Component
{
    constructor(props) {
        super(props);
        this.state = {          
            addsettingModal: true,
            settingname : "",
            settingvalue : "",
            errors : {}
        };
    }

    handleadd = async()=>{
        console.log("handleadd");
        let payload = {
            settingname : this.state.settingname,
            settingvalue : this.state.settingvalue
        };
        console.log("payload" , payload);
        let validate = await settingvalidate(payload);
        if(validate.isValid){
            let settingresult = await addsettinghook(payload);
            console.log("ssetting result" , settingresult);
            this.props.onDismiss();
            this.props.getset();
        }
        else{
            this.setState({"errors" : validate.errors})
        }
        
    }

   render() {
        
  
        const {addsettingModal} = this.state

        
      return (

        

        <Modal className="wallet-modal" show={addsettingModal} centered size="md">
        <Modal.Header className='pt-3 header_odal_head'>
        <h3 className="sec-head ">Add Settings</h3>
            <button type="button" class="close" onClick={() => this.props.onDismiss()}><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>

        </Modal.Header>
        <Modal.Body className="select-wallet modal_body pt-0 pb-0 px-0">

        <div className="wallet-lists px-2">
                              
        <div className='mod_pad_space pt-0'>
        <div className='row'>
                <div className='col-12 col-md-12 px-1 mb-3'>
                        
                        
                        
                       </div>
                        <div className='col-12 col-md-12 px-1 mb-3'>
                    <p className='input_desc_sm'>Setting Name</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl id="settingname" placeholder="Setting Name"
                                aria-describedby="basic-addon2"
                                value={this?.state?.settingname}
                                onChange = {(e)=>{
                                    this.setState({"settingname" : e?.target?.value})
                                }}
                            />
                          
                        </InputGroup>
                        <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.settingname}</span>
                    </div>                    
                        </div>

                        <div className='col-12 col-md-12 px-1 mb-3'>
                    <p className='input_desc_sm'>Setting Value</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl id="hardcap" placeholder="Setting Value"
                                aria-describedby="basic-addon2"
                                value={this?.state?.settingvalue}
                                onChange = {(e)=>{
                                    this.setState({"settingvalue" : e?.target?.value})
                                }}
                            />
                          
                        </InputGroup>
                        <span className="text-danger f-12 d-block text-left">{this?.state?.errors?.settingvalue}</span>
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


export default Addsettingmodal