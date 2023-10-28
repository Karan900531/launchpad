import React, { Component } from 'react';
import { useContext, useEffect, useState } from "react";

import { Link } from 'react-router-dom';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Trendingslider from '../trendingslider';
import TransfertokenModal from "./TransfertokenModal"

import { Container } from 'react-bootstrap';
import '../../css/styles.css';

import Countdown, { zeroPad } from 'react-countdown';

import favicon from "../../images/favicon.png";
import { Unlocktoken } from '../../hooks/useContract';
import { UpcomingDiffernce } from '../../hooks/useProjects';

const renderer = ({ days, Month, Year, hours, minutes, seconds, completed }) => {
  if (completed) {
    return <div className='btn_timer_new'>
      <span>{zeroPad(days)}</span>
      <span>{zeroPad(hours)}</span>
      <span>{zeroPad(minutes)}</span>
      <span>{zeroPad(seconds)}</span>
    </div>
  } else {
    // Render a countdown
    return <div className='btn_timer_new'>

      <span>{zeroPad(days)}</span>
      <span>{zeroPad(hours)}</span>
      <span>{zeroPad(minutes)}</span>
      <span>{zeroPad(seconds)}</span>
    </div>;
  }
};

class LockInfo extends Component {
  showLoader() {
    document.getElementsByTagName("body")[0].classList.add("overflow_hidden");
    document.getElementById("logo_overlay").style.opacity = 0.05;
    document.getElementById("loader_div").classList.remove("d-none");
    document.getElementById("loader_div").classList.add("d-block");
  }

  hideLoader() {
    document.getElementsByTagName("body")[0].classList.remove("overflow_hidden");
    document.getElementById("logo_overlay").style.opacity = 1;
    document.getElementById("loader_div").classList.remove("d-block");
    document.getElementById("loader_div").classList.add("d-none");
  }

  componentDidMount() {
    // this.showLoader();
    document.getElementById("launchpad_parent").classList.add("active");
    this.hideLoader();
    this.getlocationdata();

  }

  getlocationdata = async () => {
    //    console.log("location data" , this.props.location);
    if (this.props.location.state.tokeninfo) {
      this.setState({ tokeninfo: this.props.location.state.tokeninfo })
      this.setState({ lockerinfo: this.props.location.state.lockerinfo })
      this.setState({ owner: this.props.location.state.owner });
      this.setState({ tokenaddress: this.props.location.state.tokenaddress });
    }
    else {
      // this.props.history.push("/createlock")
    }
  }

  unlock = async () => {
    const unlocktoken = await Unlocktoken(this.props.location.state.address)
    if (unlocktoken) {
      this.setState({ sucess: true })
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      transfertokenModal: false,
      tokeninfo: {},
      lockerinfo: {},
      tokenaddress: "",
      owner: "",
      sucess: false,
      // name : "",
      // symbol : '',
      // decimal : '',
      // amount : '',
      // lockdate :''
    };
  }

  onDismiss() {
    this.setState({ transfertokenModal: false });
  }


  render() {

    // const location = this.props.location?.pathname?.split('/')[1];
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const { transfertokenModal } = this.state

    return (
      <div id="loader_main">
        <div id="loader_div">
          <span className="spin_round">
          </span>
          <img src={favicon} className="logo_load" />
        </div>
        <div className='logo_overlay' id="logo_overlay">
          <Header />
          <div className="whole_sec pb-5">
            <div className='flex_side_right'>
              <Sidebar />
              <div className='right_side_sec'>
                {/* <div className="text-white topBar d-flex justify-content-between">

                  <small>Trending</small>
                  <small>
                    #1&nbsp;<span>Husy</span>
                  </small>
                  <small>
                    #2&nbsp;<span>ORL</span>
                  </small>
                  <small>
                    #3&nbsp;<span>UWC</span>
                  </small>
                  <small>
                    #4&nbsp;<span>777</span>
                  </small>
                  <small>
                    #5&nbsp;<span>IDXS</span>
                  </small>
                  <small>
                    #6&nbsp;<span>COUGNU</span>
                  </small>
                  <small>
                    #7&nbsp;<span>CRICLE</span>
                  </small>
                  <small>
                    #8&nbsp;<span>KASA</span>
                  </small>
                  <small>
                    #9&nbsp;<span>FIFAPP</span>
                  </small>
                  <small>
                    #10&nbsp;<span>SOG</span>
                  </small>
                  <small>
                    #11&nbsp;<span>COOSHA</span>
                  </small>
                  <small>
                    #12&nbsp;<span>Honey</span>
                  </small>


                </div> */}
                {/* <Trendingslider/> */}

                <div className="right_side_spacing">
                  <div className='row mt-3'>
                    <div className='col-12 col-md-10 col-lg-9 mx-auto'>
                      <div className='card_bg card mt-4'>
                        <div className="card-body">
                          <p className='text-white text-center'>Unlock in</p>
                          <div className='text-center mt-3 mb-2'>
                            <Countdown date={Date.now() + (UpcomingDiffernce(this.props.location.state.lockdata.unlockOn))} renderer={renderer} className="countdown_grey" zeroPadTime={2} />
                          </div>{console.log("date", Date.now() + new Date(this.props.location.state.lockdata.unlockOn * 1000).getTime())}
                        </div>
                      </div>
                      <div className='card_bg card mt-4'>
                        <div className="card-body">
                          <p class="text-white">Token Info</p>
                          <hr class="hr_green"></hr>
                          <p className='white_txt_sm d-flex justify-content-between mt-4 mb-1'>
                            <span className='desc_grey_txt'>Token Address :</span>
                            <span className='desc_grey_txt font_12'>{this.props.location.state.address}
                            </span>
                          </p>

                          <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
                            <span className='desc_grey_txt'>Token Name :</span>
                            <span className='desc_grey_txt font_12'>{this.props.location.state.lockdata.name}</span>
                          </p>

                          <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
                            <span className='desc_grey_txt'>Token Symbol :</span>
                            <span className='desc_grey_txt font_12'>{this.props.location.state.lockdata.symbol}
                            </span>
                          </p>

                          <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
                            <span className='desc_grey_txt'>Token Decimals :</span>
                            <span className='desc_grey_txt font_12'>{this.props.location.state.lockdata.decimal}
                            </span>
                          </p>


                        </div>
                      </div>
                      <div className='card_bg card mt-4'>
                        <div className="card-body">
                          <p class="text-white">Lock Info</p>
                          <hr class="hr_green"></hr>
                

                          <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
                            <span className='desc_grey_txt'>Total Amount Locked :</span>
                            <span className='desc_grey_txt font_12'>{this.props.location.state.lockdata.amount / 10 ** 18}</span>
                          </p>

                          <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
                            <span className='desc_grey_txt'>Owner :</span>
                            <span className='desc_grey_txt font_12'>{this.props.location.state.lockdata.to}</span>
                          </p>

                          <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
                            <span className='desc_grey_txt'>Lock Date :</span>
                            <span className='desc_grey_txt font_12'>{new Date(this.props.location.state.lockdata.unlockOn * 1000).toLocaleDateString("en-US", options)} </span>
                          </p>

                          <div className={this.state.sucess ? 'd-none' : 'col-12 col-md-12 text-center mt-4 btn_lock_info_div'}>
                            <button className="get-started-btn mr-2" onClick={() => this.setState({ transfertokenModal: true })}>
                              Transfer Lock Ownership
                            </button>
                    
                            <button className="get-started-btn" 
                            disabled = {(this.props.location.state.lockdata.unlockOn * 1000)>Date.now()}
                            onClick={this.unlock}>
                              Unlock
                            </button>
                          </div>
                        </div>
                      </div>
                      <div>
                      </div>
                    </div>
                  </div>


                  <Container className='pb-5 px-0 mt-4'>

                    <center>
                      <small className="mt-3 bottom_text">
                        Disclaimer: The information provided shall not in any way
                        constitute a recomendation as to whether you should invest
                        in any product discussed. We accept no liability for any
                        loss occasioned to any person acting or refraining from
                        action as a result of any material provided or published.
                      </small>
                    </center>
                  </Container>
                </div>
              </div>
            </div>
          </div>

          {/* <Footer /> */}
        </div>
        {transfertokenModal && <TransfertokenModal tokenaddress={this.props.location.state.address} onDismiss={() => this.onDismiss()} />}

      </div>
    )
  }
}

export default LockInfo