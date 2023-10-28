import React, { Component } from 'react';
import { useContext, useEffect, useState } from "react";
import { Modal, Toast } from 'react-bootstrap';
import { API_URL } from '../../config/env';
import { approvekychook, rejectkychook } from '../../hooks/usebackend';
import folderimage from "../../images/folder_zip.png";

import proof from "../../images/proof.webp"

class Kycmodal extends Component
{
    constructor(props) {
        super(props);
        this.state = {          
            kycModal: true,
            kycdetail : {}
           
        };
    }
// componentDidMount(){
//   console.log("this?.props?.detail" , this?.props?.detail);
//   if(!this.state.kycdetail){
//     console.log("set")
//     this.setState({"kycdetail" : this?.props?.detail})
//   }
// }

handleapprove = async()=>{
  let payload = {
    walletaddress : this?.props?.detail?.walletaddress,
    id : this?.props?.detail?.proof[0]?.id
  }
  let approve = await approvekychook(payload);
  console.log("approve" , approve);
  if(approve?.data?.type == "success"){
    // Toast.error("Error Try Again !")
  }
  else{
    // Toast.error("Error Try Again !")
  }
  this.props.onDismiss();
}

handlereject = async()=>{
  let payload = {
    walletaddress : this?.props?.detail?.walletaddress,
    id : this?.props?.detail?.proof[0]?.id
  }
  let reject = await rejectkychook(payload);
  this.props.onDismiss();
}

   render() {
        
  
        const {kycModal} = this.state

        
      return (

        

        <Modal className="wallet-modal" show={kycModal} centered size="md">
        <Modal.Header className='pt-3 header_odal_head'>
        <h3 className="sec-head ">KYC</h3>
            <button type="button" class="close" onClick={() => this.props.onDismiss()}><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>

        </Modal.Header>
        <Modal.Body className="select-wallet modal_body pt-0 pb-0 px-0">

        <div className="wallet-lists px-2">
                              
                                <div className='mod_pad_space'>
                                
                                <div className='row'>
                                <div className='col-12 col-md-12 mb-0'>
                    <p className='input_desc_sm bold_text_proof'>{this?.props?.detail?.proof[0]?.idtype}</p>
                  
                        </div>
                        <div className='col-12 col-sm-6 mb-3 mt-1'>
                        <p className='input_desc_sm'>Kyc Document</p>
                        <div className="icon_align_border">
                          {/* <img src={API_URL+this?.props?.detail?.proof[0]?.path + this?.props?.detail?.proof[0]?.image[0]} className="img-fluid p-3" /> */}
                          {/* {API_URL +"/"+ this.state.kyc.path +"/"+ this.state.kyc.image} */}
                          <a href={API_URL +"/"+ this?.props?.detail?.proof[0]?.path +"/"+ this?.props?.detail?.proof[0]?.image} download >
                    {/* <a href={"/images/myw3schoolsimage.jpg"} download> */}
                    <img src={folderimage} alt="W3Schools" width="104" height="142"></img>

                    </a>
                        </div>
                        </div>
                        {/* <div className='col-12 col-sm-6 mb-3 mt-1'>
                        <p className='input_desc_sm'>Back Side Image</p>
                        <div className="icon_align_border">
                          <img src={API_URL+this?.props?.detail?.proof[0]?.path + this?.props?.detail?.proof[0]?.image[1]} className="img-fluid p-3" />
                        </div>
                        </div> */}
                                </div>
                                {/* <hr className='hr_green' />
                                <div className='row'>
                                <div className='col-12 col-md-12 mb-0'>
                    <p className='input_desc_sm bold_text_proof'>Driving License</p>
                  
                        </div>
                        <div className='col-12 col-sm-6 mb-3 mt-1'>
                        <p className='input_desc_sm'>Front Side Image</p>
                        <div className="icon_align_border">
                          <img src={proof} className="img-fluid p-3" />
                        </div>
                        </div>
                        <div className='col-12 col-sm-6 mb-3 mt-1'>
                        <p className='input_desc_sm'>Back Side Image</p>
                        <div className="icon_align_border">
                          <img src={proof} className="img-fluid p-3" />
                        </div>
                        </div>
                                </div> */}
                                <div className='text-center mt-4'>

                                <button className='get-started-btn mr-2'
                                onClick={this.handleapprove}
                                disabled = {this?.props?.detail?.proof[0].status != "Pending"}
                                >
                                    Approve</button>
                                    <button className='get-started-btn'
                                    onClick={this.handlereject}
                                    disabled = {this?.props?.detail?.proof[0].status != "Pending"}
                                    >
                                    Reject</button>
                                </div>

                                    </div>
                            </div>
        </Modal.Body>
    </Modal>



      )
    }

}


export default Kycmodal