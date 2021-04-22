import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { auth } from './firebase';
import './Login.css'

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const signIn = e => {
        // prevent the page from refreshing
        e.preventDefault();

        auth.signInWithEmailAndPassword(email, password)
        .then(auth => {
            history.push('/')
        })
        .catch(error => alert(error.message))

        // do some fancy firebase login stuff
    }

    const register = e => {
        e.preventDefault();

        auth
        .createUserWithEmailAndPassword(email, password)
        .then((auth) => {
            // It successfully created a new user with email and password
            console.log(auth);

            if (auth) {
                history.push('/')
            }
        })
        .catch(error => alert(error.message))

        // do some fancy firebase register stuff
    }

    return (
        <div className="login">
            <Link to = '/'>
                <img 
                className="login__logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
                />
            </Link>

            <div className="login__container">
                <h1>Sign-in</h1>

                <form>
                    <h5>Email</h5>
                    <input type="text"
                    // I map the value email to this email state which connects the two things
                    value={email} 
                    // Whenever the user types in, it will trigger onChange which gives me an event and it will fire off this event.
                    // e.target.value is what the user types in, as the user types in, i am setting the email and it gets map to {email}
                    onChange={e => setEmail(e.target.value)}
                    />

                    <h5>Password</h5>
                    <input type="password"
                    value = {password}
                    onChange={e => setPassword(e.target.value)}
                    />
                    
                    <button type = "submit" onClick={signIn}
                    className="login__signInButton">Sign In</button>
                </form>

                <p>
                    By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.          
                </p> 

                <button onClick = {register}
                className="login__registerButton">Create your Amazon Account</button>

            </div>
        </div>
    )
}

export default Login
