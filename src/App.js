import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Checkout from "./Checkout";
import { auth } from "./firebase";
import Header from './Header';
import Home from './Home';
import Login from './Login';
import Orders from "./Orders";
import Payment from "./Payment";
import { useStateValue } from "./StateProvider";

const promise = loadStripe("pk_test_51IaxZnHW5Er7mrZo2Yc3ptDUjhLAM7364LdhWKxiQEWS8hwwldvouPPcIlFVp71vDRU6H9l7g6Z9GCac86CathRR00r0jNHqEO");

function App() {

  const [user, dispatch] = useStateValue();

  useEffect(() => {
    // Will only run once when the app component loads...

    // As soon as the app loads, we attach this listener
    // If we log in, it fires off this code
    // If we log out, it fires off this code
    auth.onAuthStateChanged(authUser => {
      console.log('THE USER IS >>>', authUser);

      if (authUser) {
        // The user just logged in / the user was logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })

      } else {
        // The user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/login">
            <Login/>
          </Route>  
          <Route path="/checkout">
            <Header/>
            <Checkout/>
          </Route>    
          <Route path="/payment">
            <Header/>
              <Elements stripe={promise}>
                <Payment/> 
              </Elements>
          </Route>   
          <Route path="/">
            <Header/>
            <Home/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
