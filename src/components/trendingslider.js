import React, { Component } from "react";

import '../css/styles.css';
import { getUnsold, getUnsoldtokentrending } from "../hooks/useAdmin";
import { gettrendingdisplayhook } from "../hooks/usebackend";
import { getSaleInfoCard } from "../hooks/useContract";
import { getTotalSalesInfo } from "../hooks/useProjects";

class Trendingslider extends Component{


    constructor(props) {
        super(props);
        this.state = {          
            trending : []
        };
    }
    componentDidMount(){
       this.gettrending()
    }

    async gettrending(){
      const totalsale = await getTotalSalesInfo();
      console.log("totalsale",totalsale);
      var totalproxy = [];
      totalsale.map(async(val , i)=>{
        let data = await getSaleInfoCard(val._sale);
        // if(data?.LaunchpadType)
        // let deposittoken = data?.presaleRate * data?.hardCap/10**18;
        // (hardCap / liquidityPercent) * 100;
        // let unsoldtoken =  await getUnsoldtokentrending(data?.saleAddress);
        // console.log("unsoldtoken" , unsoldtoken);
        // console.log("depositt oken" , deposittoken);
        // let trend = deposittoken - (unsoldtoken/10**18);
        // var obj2 = {...data, trend : trend}
        // Object.assign(data , {trend : trend})
        // data.trend = trend;
        totalproxy.push(data);
      })
      console.log("totalproxy" , totalproxy);
      // totalproxy.sort(
      //   (p1, p2) => (p1.trend < p2.trend) ? 1 : (p1.trend > p2.trend) ? -1 : 0);
    //  var sortedtotalproxy =  totalproxy.sort((a, b) => parseFloat(a.participants) - parseFloat(b.participants))
    var sortedtotalproxy = await totalproxy.sort((a, b) => (parseFloat(a.participants) > parseFloat(b.participants)) ? 1 : -1);
        console.log("totalproxy" , sortedtotalproxy);
      this.setState({trending : sortedtotalproxy})
    }
   
    
    // async gettrending(){
    //     let data = await gettrendingdisplayhook();
    //     console.log("dataa trending" , data?.data?.data);
    //     if(data?.data?.data?.length > 0)
    //     this.setState({trending : data?.data?.data}) 
    // }



    render(){
        return(
            <div className="text-white topBar d-flex justify-content-start">
                <small>Trending</small>
                {this?.state?.trending && this?.state?.trending?.map((data , i) =>i <10 && data.isWhitelisted  ?
                <>
                    
                        <small>
                            
                            <a href={`/privatesaledetail/${data.saleAddress}`}>
                        #{i+1}&nbsp;<span>{data.name} </span>
                    </a>

                        </small>
                        
                </> : i < 10 &&<>
                    
                    <small>
                    <a href={`/launchpaddetail/${data?.saleAddress}`}>
                            #{i+1}&nbsp;<span>{data.name} </span>
                </a>

                    </small>
                    
            </>

                
                )}
                  
        
        
      {/* <small>
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
      </small> */}
      
      
    </div>
        )
    }
}

export default Trendingslider;