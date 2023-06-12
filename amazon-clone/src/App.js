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
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/payment' element={<Payment/>}/>
        
        
      </Routes>
    </div>
    </Router>
  );
}

export default App;
