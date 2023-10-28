import React, { Component } from 'react';
import { useContext, useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';

import wall1 from "../images/metamask_wallet.png";
import wall2 from "../images/connect_wallet.png";
import wall3 from "../images/wall3.png";

import { MetamaskWallet,WalletConnect } from "../hooks/useWallet"
import Web3 from 'web3';


class Walletmodal extends Component
{
    constructor(props) {
        super(props);
        this.state = {          
            walletModal: true,
           
        };
    }


        sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

   
    MetaMask = async ()=>{
        await MetamaskWallet()
        await this.sleep(1000)
       this.setState({accountInfo: localStorage.getItem("accountInfo")});
       console.log("Account : ", localStorage.getItem("accountInfo"));
        if(localStorage.getItem("accountInfo")){
            this.setState({ walletModal : false})
            window.location.reload()
        }
        
    }

    enableWallet = async () =>{
       const provider = await WalletConnect()
        this.setState({walletConnect: provider})
        this.setState({accountInfo: localStorage.getItem("accountInfo")});
        this.setState({ walletModal : false})
        if(localStorage.getItem("accountInfo")){
            this.setState({ walletModal : false})
            window.location.reload()
        }
     
    }

  



    render() {
        
  
        const {walletModal} = this.state

        
      return (

        

        <Modal className="wallet-modal" show={walletModal} centered size="md">
        <Modal.Header className='pt-3 header_odal_head'>
        <h3 className="sec-head ">Connect to a wallet</h3>
            <button type="button" class="close" onClick={() => this.props.onDismiss()}><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>

        </Modal.Header>
        <Modal.Body className="select-wallet modal_body pt-0 pb-0 px-0">

        <div className="wallet-lists px-2 wallet-lists-new-m">
                                <ul className="mb-0">
                                    <li onClick={this.MetaMask} className="liquid_raised mx-3 mx-sm-4 w-100 text-center">
                                        <div className="img">
                                            <img src={wall1} alt="img" />
                                        </div>
                                        <div className="wal-option">
                                            <h3 className="side-head-li mb-0 text-center"> Metamask</h3>

                                        </div>
                                    </li>
                                    <li onClick={this.enableWallet} className="liquid_raised mx-3 mx-sm-4 w-100 text-center">
                                        <div className="img">
                                            <img src={wall2} alt="img" />
                                        </div>
                                        <div className="wal-option">
                                            <h3 className="side-head-li mb-0 text-center">Wallet Connect</h3>
                                        </div>
                                    </li>
                                 
                                </ul>
                                <div className='mod_pad_space'>

                                <p class="bottom_text text-center">Haven’t got a crypto wallet yet?</p>
                                <div className='text-center'>

                                <button className='get-started-btn'>
                                    Learn How to Connect</button>
                                </div>

                                    </div>
                            </div>
        </Modal.Body>
    </Modal>



      )
    }

}


export default Walletmodal