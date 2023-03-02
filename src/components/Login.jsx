import React, { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

import styles from '../styles/registerAndLogin.module.css'

function Login() {
    const [ loginEmail, setLoginEmail ] = useState('')
    const [ loginPassword, setLoginPassword ] = useState('')
    const [ password, setPassword ] = useState("password")


    const navigate = useNavigate()
  
    const login = async (e) => {
        e.preventDefault()
        try {
            await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            )
            navigate('/')
        } catch(error) {
                console.log(error.message)
        }
    }

    function showPassword () {
        if(password === 'password') {
            setPassword("text")
        } else {
            setPassword('password')
        }
    }

    return (
        <div>
            <form onSubmit={login}>
                <h3>Welcome Back!</h3>
                <label htmlFor="username">Username</label>
                <input 
                placeholder="Email..."
                onChange={(e) => {
                    setLoginEmail(e.target.value)
                }}
                value={loginEmail}
                />

                <input 
                placeholder="Password..."
                type={password}
                onChange={(e) => {
                    setLoginPassword(e.target.value)
                }} 
                value={loginPassword}
                />
                <button className={styles.showPasswordButton} onClick={showPassword}>Show Password</button>
                <button>Login</button>
                <Link to='/register'>Register</Link >
            </form>
        </div>
    )
}

export default Login