import React, { useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import { auth } from './firebase';

export default function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = e => {
        e.preventDefault();

        signInWithEmailAndPassword(auth,email,password)
        .then((auth) => {
            navigate('/')
        })
        .catch(error => alert(error.message))
        //some fancy firebase login shittttttt.......

    }

    const register = e => {
        e.preventDefault();

        createUserWithEmailAndPassword(auth,email,password)
        .then((auth) => {
            //it successfully created a new user with email and password
            console.log(auth)
            if(auth){
                navigate('/')
            }
        })
        .catch(error => alert(error.message))

        //some fancy firebase register shittttttt.......
    }

  return (
    <div className='login'>
        <Link to='/'>
            <img 
                className='login__logo'
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' 
                alt=''/>
        </Link>

        <div className='login__container'>
            <h1>Sign in</h1>
            <form>
                <h5>E-mail</h5>
                <input type='text' value={email} onChange={e => setEmail(e.target.value)}/>

                <h5>Password</h5>
                <input type='password' value={password} onChange={e => setPassword(e.target.value)}/>

                <button className='login__signInButton' 
                type='submit' 
                onClick={signIn}>
                    Sign In
                    </button>
            </form>
            <p>
                By sign-in you agree to the Amazon Clone Conditions of Use & Sale. 
                Please see our Privacy Notice, 
                our Cookies Notice and our Interest-Based Ads Notice.
            </p>

            <button className='login__registerButton' 
            onClick={register}>
                Create your Amazon Account
                </button>
        </div>
    </div>
  )
}
