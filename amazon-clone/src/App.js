import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import Payment from './Payment';
import { auth } from './firebase'
import { useStateValue } from './StateProvider';
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'

//stripe: publishable key from your stripe account
const promise = loadStripe('pk_test_51NI2bxHAqbS0RwuZ9zDDyYGa5AJTEYhPXt3vD5XHQZPVBgr6hxQLepllFwaL0VPzqg1peSDMJpASEwTSHabsBiOf00P6pDF6N3')


function App() {
  const [{},dispatch] = useStateValue()

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log('the user is ', authUser);
      if (authUser){
        //the user just logged in / the user was logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })

      } else {
        // the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  },[])

  return (
    //BEM?
    <Router>
    <div className="app">
      <Header/>
        <Elements stripe={promise}>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/payment'  element={<Payment/>}/>
        
      </Routes>
        </Elements>
    </div>
    </Router>
  );
}

export default App;
