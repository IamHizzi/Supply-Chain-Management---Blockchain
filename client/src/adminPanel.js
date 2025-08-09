import "./App.css";
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Sidebar from './components/AdminPanel/Sidebar'
import Booking from "./components/AdminPanel/pages/Booking";
import Home from "./components/AdminPanel/pages/Home";
import Loading from "./components/AdminPanel/pages/Loading";
import Dispatch from "./components/AdminPanel/pages/Dispatch";
import BookNewConsignment from "./components/AdminPanel/pages/booking/BookNewConsignment";
import TrackConsignment from "./components/AdminPanel/pages/booking/TrackConsignment";
import RegisterManifest from "./components/AdminPanel/pages/loading/RegisterManifest";
import SearchManifest from "./components/AdminPanel/pages/loading/SearchManifest";
import DispatchConsignment from "./components/AdminPanel/pages/dispatch/DispatchConsignment";
import GenerateGatepass from "./components/AdminPanel/pages/delivery/GenerateGatepass";
import Recieve from "./components/AdminPanel/pages/Recieve";
import Delivery from "./components/AdminPanel/pages/Delivery";
import UnloadConsignment from './components/AdminPanel/pages/recieve/UnloadConsignment';
import Setting from "./components/AdminPanel/Setting";
import PaymentsDatabase from "./components/AdminPanel/pages/payments/PaymentsDatabase";
import * as allServices from './components/AdminPanel/services/allServices';


function AdminPanel(props) {
    //allServices.clearStorage()
    // <button className="btn btn-info btn-block mt-4" onClick={() => props.setLoginUser({})}>Register</button>            
    //alert(props.user.email)
    const user=props.user
    return (
    <Router>
    <div className = "App" >   
        <Sidebar setLoginUser={props.setLoginUser}/>
            <Route exact path='/' component={Home}/>
            <Route exact path='/booking' component={Booking}/>
            <Route exact path='/booking/bookConsignment' component={BookNewConsignment}/>
            <Route exact path='/booking/trackConsignment' component={TrackConsignment}/>
            <Route exact path='/loading' component={Loading}/>
            <Route exact path='/loading/registermanifest' component={RegisterManifest}/>
            <Route exact path='/loading/searchmanifest' component={SearchManifest}/>
            <Route exact path='/dispatch' component={Dispatch}/>
            <Route exact path='/dispatch/dispatchconsignment' component={DispatchConsignment}/>
            <Route exact path="/recieve" component={Recieve}/>
            <Route exact path="/recieve/unloadconsignment" component={UnloadConsignment}/>
            <Route exact path="/delivery" component={Delivery}/>
            <Route exact path="/delivery/gatepass" component={GenerateGatepass}/>
            <Route exact path="/setting" component={Setting}/>
           </div>
    </Router>
    );
}

export default AdminPanel;