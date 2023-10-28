import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../css/footer.css';


class Footer extends Component 
{ 
    
   
    render() {
		return (
           <div>
               <div className="footer">
               <div className="footer_bg_purple">
                  
               <div className="footer_sec_2">
               <div className="container conatiner_custom">
                  
                   <ul className="footer_ul footer_ul_hor">
                                   
                                   <li><a href="https://twitter.com/tatswap" target="_blank" className="mr-3"><span className="fa fa-twitter"></span></a></li>
                                   <li><a href="https://telegram.me/joinchat/n0YGQTuVWw02N2M0" target="_blank" className="mr-3"> <span className=" fa fa-paper-plane"></span> </a></li>
                                   {/* <li><a href={pdffile} target="_blank" className="mr-3"><span className="fa fa-file"></span></a></li> */}
                                   <li><a href="mailto:mailto:support@tatwap.com" target="_blank" className="mr-0"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>

                                    
                               </ul>
                               <p className="mb-0 text-center footer_text mb-0 mt-3">© Copyrights 2021, Wealth Universe all rights reserve. Terms | Privacy</p>
                   </div>
               </div>
               </div>
       
           </div>
           </div>
        );
    }
}

export default Footer