import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './App.css';

import LaunchpadList from './components/Launchpad/LaunchpadList';
import Create from './components/Launchpad/Create';
import CreateFairlaunch from './components/Launchpad/CreateFairlaunch';
import CreatePrivatesale from './components/Privatesale/CreatePrivatesale';

import PrivatesaleList from './components/Privatesale/PrivatesaleList';
import Home from './components/Projects/Home';
import CreateToken from './components/Launchpad/CreateToken';

import PrivatesaleDetail from './components/Privatesale/PrivatesaleDetail';
import PrivateSaleEdit from './components/Privatesale/PrivateSaleEdit';
import LaunchpadDetail from './components/Launchpad/LaunchpadDetail';
import LaunchpadEdit from './components/Launchpad/LaunchpadEdit';


import FairLaunchDetail from './components/Launchpad/FairLaunchDetail';
import FairLaunchEdit from './components/Launchpad/FairLaunchEdit';

import TokenLock from './components/Lock/TokenLock';
import CreateLock from './components/Lock/CreateLock';
import LiquidityLock from './components/Lock/LiquidityLock';
import LockDetail from './components/Lock/LockDetail';


import Comingsoon from './components/Projects/Comingsoon';
import Kyc from './components/Projects/Kyc';


import Login from './components/Admin/Login';
import Adminlaunchpad from './components/Admin/Adminlaunchpad';
import Adminkyc from './components/Admin/Adminkyc';
import Adminsettings from './components/Admin/Adminsettings';


import Wallethome from './components/Projects/Wallethome';

import TokenSuccess from './components/Launchpad/TokenSuccess';

import Liquiditytokensuccess from "./components/Launchpad/Liquiditytokensuccess";

import LockInfo from "./components/Lock/LockInfo";

import UpdateLock from "./components/Lock/UpdateLock";

import ViewLockInfo from "./components/Lock/Viewlockinfo";

import Adminlaunchpadsettings from './components/Admin/Adminlaunchpadsettings';

import Achievement from "./components/Projects/Achievement";
import AdminTrending from './components/Admin/AdminTrending';








function App() {
  return (
    <div>  
    <div><Toaster/></div>
    <Router >	     
    <Route exact path='/' component={Home} />
    <Route exact path='/launchpadlist' component={LaunchpadList} />
    {/* <Route exact path='/sale/:id' component={Singlesale} /> */}
    <Route exact path='/create' component={Create} />
    <Route exact path='/createfairlaunch' component={CreateFairlaunch} />
    <Route exact path='/createprivatesale' component={CreatePrivatesale} />
    <Route exact path='/privatesaledetail/:id' component={PrivatesaleDetail} />
    <Route exact path='/privatesaledetail' component={PrivatesaleDetail} />
    <Route exact path='/privatesaleedit' component={PrivateSaleEdit} />
    <Route exact path='/launchpaddetail' component={LaunchpadDetail} />
    <Route exact path='/launchpaddetail/:id' component={LaunchpadDetail} />
    <Route exact path='/launchpadedit' component={LaunchpadEdit} />
    <Route exact path='/launchpadedit/:id' component={LaunchpadEdit} />
    <Route exact path='/fairlaunchdetail' component={FairLaunchDetail} />
    <Route exact path='/fairlaunchedit' component={FairLaunchEdit} />
    



  
    <Route exact path='/privatesaleList' component={PrivatesaleList} />
    <Route exact path='/home' component={Home} />
    <Route exact path='/createtoken' component={CreateToken} />

    <Route exact path='/tokenlock' component={TokenLock} />

    <Route exact path='/createlock' component={CreateLock} />
    <Route exact path='/liquiditylock' component={LiquidityLock} />
    <Route exact path='/lockdetail/:id' component={LockDetail} />


    

    <Route exact path='/exchange' component={Comingsoon} /> 
    <Route exact path='/kyc' component={Kyc} />  
    <Route exact path='/crypto' component={Comingsoon} /> 

    <Route exact path='/login' component={Login} />  
    <Route exact path='/adminlaunchpad' component={Adminlaunchpad} />  
    <Route exact path='/adminkyc' component={Adminkyc} />  
    <Route exact path='/adminsettings' component={Adminsettings} />  


    <Route exact path='/wallet' component={Wallethome} /> 
    <Route exact path='/tokensuccess' component={TokenSuccess} /> 
    <Route exact path = '/liquidity-tokensuccess' component={Liquiditytokensuccess} />


    <Route exact path = '/lockinfo' component={LockInfo} />
    <Route exact path = '/updatelock' component={UpdateLock} />
    <Route exact path = '/view-lockinfo' component={ViewLockInfo}/>
    <Route exact path='/launchpadsettings' component={Adminlaunchpadsettings} />

    <Route exact path='/achievement/:id' component={Achievement} /> 

    <Route exact path='/admintrending' component={AdminTrending} />  




    

    

    

    </Router>
    </div>
  );
}

export default App;
