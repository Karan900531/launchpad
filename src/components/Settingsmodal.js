import React, { Component } from 'react';
import { useContext, useEffect, useState } from "react";
import { Modal, InputGroup,FormControl,ProgressBar } from 'react-bootstrap';

import { CHAINS } from '../config/env'
import { getAccount, getChainId, setChainId } from '../hooks/useAccount'


class Settingsmodal extends Component
{
    constructor(props) {
        super(props);
        this.state = {          
            settingsModal: true          
           
        };
    }

  






    render() {
        
  
        const {settingsModal} = this.state
        
      return (


                    <Modal className="buy-modal settings_modal" dialogClassName="modal-90w modal-dialog-lg" show={settingsModal} centered>
                    <Modal.Header className='pt-3 header_odal_head'>
                    <h3 className="sec-head ">Choose Network</h3>
                            <button type="button" class="close" onClick={() => this.props.onDismiss()} ><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="modal-cont pb-4">
                            <p class="bottom_text">Choose your network</p>
                                <div className='dropdown_yelo dropdown_yelo_mdl px-0'>

                                <div className="d-flex badge_cur_modal">
                                { CHAINS.map((index,i)=> 
                                    <div className="currency_badge mr-2">
                                         <a href=""  onClick={()=> setChainId(i)}><img src={index.IMAGE} /> {index.NAME}</a>
                                    </div>
                                    )}
                                    
                                    </div>
                                 
                           </div>
                            </div>
                        </Modal.Body>
                        
                </Modal>
      )
    }

}


export default Settingsmodal