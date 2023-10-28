import React, { Component } from "react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Dropdown,
  Row,
  Col,
  Card,
  ProgressBar,
  InputGroup,
  Form,
  Tab,
  Nav,
  FormControl,
  Modal
} from "react-bootstrap";
import { Checkowneraddress, Transferlockownership } from "../../hooks/useContract";




class TransfertokenModal extends Component {
 
  




  constructor(props) {
    super(props);
    this.state = {
      
        transfertokenModal: true,
        newowneraddress : "",
        errors : "",
    };
  }


  transferownership = async()=>{
    let payload = {
      lpaddress : this.props.tokenaddress,
      newowneraddress : this.state.newowneraddress
    }
    await Transferlockownership(payload);
    window.location.href = window.location.origin + "/tokenlock"
    this.props.onDismiss();
  }
 
  render() {
    
    const {transfertokenModal } = this.state


    return (
      
          
        <Modal className="wallet-modal" show={transfertokenModal} centered size="md">
       <Modal.Header className='pt-3 header_odal_head'>
                    <h3 className="sec-head ">Transfer Ownership</h3>
                            <button type="button" class="close" onClick={() => this.props.onDismiss()} ><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                        </Modal.Header>
        <Modal.Body className="select-wallet modal_body pt-0 pb-0 px-0">

        
                <div className=''>
<div className="tab_img">
      <div className='card_bg card'>
 <div className='card-body pt-0'>
 <div>
                <div className='row'>
                <div className='col-12 col-md-12 mb-3'>
                <p class="bottom_text mb-0">(*) is required field.</p>
                        
                        
                        
                       </div>
                    
                        <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>New Owner Address <span >*</span></p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl id="hardcap"  placeholder="Owner Address"
                                aria-describedby="basic-addon2"
                                value = {this.state.newowneraddress}
                                onChange={async(e)=>{
                                  this.setState({newowneraddress : e?.target.value});
                                  let valid = await Checkowneraddress(e?.target.value)
                                 
                                  if(valid){
                                    this.setState({errors : ""})
                                  }
                                  else{
                                    this.setState({errors : "Invalid owner address !.."})
                                  }
                                }}
                            />
                        </InputGroup>
                        <span className="text-danger f-12 d-block text-left">{this?.state?.errors}</span>
                    </div>
                        </div> 
         
         
                    <div className='col-12 col-md-12 text-center mt-0 pb-3'>
                        <button className="get-started-btn mt-2"
                          disabled = {!this.state.newowneraddress || this.state.errors}
                          onClick ={this.transferownership}
                        >
                        Transfer Ownership
                        </button>
                        
                        </div>
                </div>
            </div>
      </div>
      </div>
      </div>
      </div>
        </Modal.Body>
    </Modal>
    );
  }
}

export default TransfertokenModal;
