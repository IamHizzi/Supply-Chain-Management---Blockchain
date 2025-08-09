import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from 'react';
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import AdminPanel from './adminPanel'
import { Provider } from 'react-redux'
import store from './store'
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { logoutUser, setCurrentUser} from './actions/authActions';
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import BookShipment from "./components/layout/bookShipment";
import TrackShipment from "./components/layout/TrackShipment";
import HomePage from "./components/layout/HomePage";
import RegisterVehicle from "./components/layout/RegisterVehicle";

// Check for token
if (localStorage.jwtToken) {
    // Set auth token header auth
    setAuthToken(localStorage.jwtToken);
    // Decode token and get user info and exp
    const decoded = jwt_decode(localStorage.jwtToken);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // TODO: Clear current Profile
    // Redirect to login
    window.location.href = '/login';
  }
  
}



function App() {
    //allServices.clearStorage()
    //const [user, setLoginUser] = useState({})
    /*<Route exact path="/">
    {
      user && user.name ? <AdminPanel setLoginUser={setLoginUser} /> : <Login setLoginUser={setLoginUser} />
    }
  </Route>*/
  //const state=store.getState()
  //const user=state.auth.user
  //const isAuthenticated=state.auth.isAuthenticated
  const [user,setLoginUser]=useState(store.getState().auth.user)
    return (
    <div className = "App" >
      <Provider store={store}>         
        <Router>
        <Switch>
          <Route exact path='/'>
            {
              user.name ? <AdminPanel setLoginUser={setLoginUser} user={user}/>:<Login setLoginUser={setLoginUser}/>
              //user.name ? <HomePage/>:<Login setLoginUser={setLoginUser}/>
            }
            </Route> 
          <Route exact path="/login">
            <Login setLoginUser={setLoginUser} />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path='/bookOrder'>
            {
              user.name ? <BookShipment/>:<Login setLoginUser={setLoginUser}/>
            }
          </Route>
          <Route exact path='/trackOrder'>
            {
              user.name ? <TrackShipment/>:<Login setLoginUser={setLoginUser}/>
            }

          </Route>
          <Route exact path='/registerVehicle'>
            {
              user.name ? <RegisterVehicle/>:<Login setLoginUser={setLoginUser}/>
            }
            
          </Route>
        </Switch>
      </Router>   
      </Provider>
    </div>
    );
}


export default App;