import React, { Component } from 'react';
import { useContext, useEffect, useState } from "react";
import { Modal, InputGroup,FormControl,ProgressBar } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class ChangeStatusmodal extends Component
{
    constructor(props) {
        super(props);
        this.state = {   
                   
            changestatueModal: true, 
            openstatus: "public" 
           
        };
    }
   
    render() {
        
  
        const {changestatueModal, openstatus} = this.state

        
      return (


        <Modal className="wallet-modal" show={changestatueModal} centered size="md">
        <Modal.Header className='pt-3 header_odal_head'>
        <h3 className="sec-head ">Change Status</h3>
            <button type="button" class="close" onClick={() => this.props.onDismiss()}><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>

        </Modal.Header>
        <Modal.Body className="select-wallet modal_body">

       <p className='wallet_address_text'>Change this pool to public</p>
       <div className="custom-control custom-radio mb-2">
                    <input type="radio" id="customRadio1new" name="customRadioNew" className="custom-control-input" onChange={() => this.setState({ openstatus: "public"})}/>
                    <label className="custom-control-label" for="customRadio1new">Public now</label>
                    </div>   

                    <div className="custom-control custom-radio">
                    <input type="radio" id="customRadio2new" name="customRadioNew" className="custom-control-input" onChange={() => this.setState({ openstatus: "publictime"})} />
                    <label className="custom-control-label" for="customRadio2new">Public with specific time</label>
                    </div>  
{this.state.openstatus == "public"? 
<div className="text-center mt-4">
        <button className="get-started-btn mt-2">Public Now</button>

</div>:
<div>
<div className='mt-4'>
                    <p className='input_desc_sm'>Public Sale Start time</p>
                    <div className="inputs input-groups date_inoput_grps">
                        <InputGroup className="datepicker_input">
                            
                        <DatePicker
                         minDate={new Date()}
                                                   
                                                   showTimeSelect
                                                   
                                                   onChange={(date)=> this.setState({startDate: date})}
                                                   dateFormat="MMMM d, yyyy h:mm aa"
                                                 />
                          
                        </InputGroup>
                        <InputGroup.Append className='cur_pointer'>
                                <button variant="outline-secondary" className="trans_cal_btn">
                                <i class="far fa-calendar-alt"></i>
                                </button>
                            </InputGroup.Append>
                    </div>
                    <div className='note_desc mt-1 mb-0'>
                    <p>Set the time that you want to open this pool to public</p>
                    </div>
                        </div>

                        <div className="text-center">
        <button className="get-started-btn mt-2">Save Settings</button>

</div>
</div>
}


        </Modal.Body>
    </Modal>



      )
    }

}


export default ChangeStatusmodal