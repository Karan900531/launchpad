import React, { Component } from 'react';
import { useContext, useEffect, useState } from "react";
import { Modal, InputGroup,FormControl,ProgressBar } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { addwhitelistvalidation } from '../hooks/kycvalidation';
import { getAccount } from '../hooks/useAccount';
import { addWhitelistMembers } from '../hooks/useAdmin';
import { IsValidAddress } from '../hooks/useContract';


class RemoveWhitelistmodal extends Component
{
    constructor(props) {
        super(props);
        this.state = {   
                   
            removewhitelistModal: true,  
            count:1,
            inputList:[{ user: "", bnbvalue: "0" }],
            isPending: false,    
            errors :[]  
           
        };
    }


    handleInputChange = async(e, index) => {
        const { name, value } = e.target;
        const list = [...this.state.inputList];
           list[index][name] = value;
           console.log(list, "sdf");
           if(name == "user" && value.length == 42){
               const valid = await IsValidAddress(value);
               if(!valid){
                toast.error(`Non Valid Address (${value}) !`,
                {
                    style: {
                    minWidth: '700px',
                    minHeight: '55px'
                    }
                });
               }
              }
            };
    
    
        handleRemoveClick = index => {
            console.log("index", index);
            const list = [...this.state.inputList];
            list.splice(index, 1);
            this.setState ({ inputList: list });
    
          };

        handleAddUserList = async() => {
            this.setState({ isPending : true });
            this.setState({errors : []})
            // this.state.inputList.map(async(val , i)=>
            for(var i =0 ; i< this.state.inputList.length ; i++)
            {
                var val = this.state.inputList[i]
                let valid = await addwhitelistvalidation(val);
                console.log("valid" , valid);
                if(!valid.isValid){
                    this.setState({ errors: [...this.state.errors, valid.errors] })
                }
            }
            if(this.state.errors.length == 0){
                console.log("empty" , this.state.errors.length , this.state.inputList);
                await addWhitelistMembers(this.state.inputList,this.props.saleAddress,getAccount());
                this.setState({ isPending : false });
                this.props.onDismiss()
            }
            // console.log("valid " ,typeof(valid.errors),Object.keys(valid),Object.values(valid), valid.errors.length);
            // await addWhitelistMembers(this.st(ate.inputList,this.props.saleAddress,getAccount());
            // this.setState({ isPending : false });
            // this.props.onDismiss()
        }
         
          // handle click event of the Add button
           handleAddClick = () => {
            this.setState ({ inputList: [...this.state.inputList, { user: "", bnbvalue: "" }] });
        };
   
    render() {
        
  
        const {removewhitelistModal} = this.state

        
      return (


        <Modal className="wallet-modal" show={removewhitelistModal} centered size="md">
        <Modal.Header className='pt-3 header_odal_head'>
        <h3 className="sec-head ">Remove Whitelist Users</h3>
            <button type="button" class="close" onClick={() => this.props.onDismiss()}><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>

        </Modal.Header>
        <Modal.Body className="select-wallet modal_body">

        {/* {[...Array(this.state.count)].map((val,index)=>{
                        return (
                        <div>

                        <div className="row form_row row_add_remove mb-2 px-3">
                        <div className="col-6 col-sm-5 px-1">

                        <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl name="user" placeholder="Wallet Address"
                            />
                          
                        </InputGroup>
                    </div>
                      
                        </div>
                        <div className="col-6 col-sm-5  px-1">

                        <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl name="bnbvalue" placeholder="Allocated BNB Value"
                            />
                          
                        </InputGroup>
                    </div>

                     
                        </div>
                     
                        <div className="col-2 col-sm-1  px-1">
                            <button
                            className="get-started-btn bnt_icon_new mb-2 mt-sm-2 mt-3" onClick={() => this.setState({ count: this.state.count - 1 })}><i className="fa fa-trash-alt"></i></button>
                        </div>

                       





</div>

</div>
);
})} */}

{[...Array(this.state.count)].map((val,i)=>{
                        return (
                        <div>

                        <div className="row form_row row_add_remove mb-2 px-3">
                        <div className="col-6 col-sm-5 px-1">

                        <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl name="user" placeholder="Wallet Address"
                            onChange={e => this.handleInputChange(e, i)}
                            />
                          
                        </InputGroup>
                        <span className="text-danger f-12 d-block text-left">{this?.state?.errors[i]?.user}</span>
                    </div>
                      
                        </div>
                        <div className="col-6 col-sm-5  px-1">

                        {/* <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl name="bnbvalue" placeholder="Allocated BNB Value"
                            onChange={e => this.handleInputChange(e, i)}
                            />
                          
                        </InputGroup>
                        <span className="text-danger f-12 d-block text-left">{this?.state?.errors[i]?.bnbvalue}</span>
                    </div> */}

                     
                        </div>
                        {this.state.count > 1 && 
                        <div className="col-2 col-sm-1  px-1">
                            <button
                            className="get-started-btn bnt_icon_new mb-2 mt-sm-2 mt-3" onClick={() => {
                                this.setState({ count: this.state.count - 1 })
                                this.handleRemoveClick(i);
                                }}><i className="fa fa-trash-alt"></i></button>
                        </div>}


                        {this.state.count >= 1 && 
                        <div className="col-2 col-sm-1 px-1">
                        <button className="get-started-btn bnt_icon_new mb-2 mt-sm-2 mt-3 ml-1" onClick={() => {
                            this.setState({ count: this.state.count + 1 });
                            this.handleAddClick();
                            }}><i className="fa fa-user-plus"></i></button>
                        </div> 
                        }





</div>

</div>
);
})}


<div className="text-center">
        <button className="get-started-btn mt-2" onClick={this.handleAddUserList}>Submit</button>

</div>

        </Modal.Body>
    </Modal>



      )
    }

}


export default RemoveWhitelistmodal