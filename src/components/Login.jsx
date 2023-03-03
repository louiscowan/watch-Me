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
                alert(error.message)
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
        <div className={styles.loginDiv}>
            <form onSubmit={login} className={styles.loginForm}>
                <h3>Welcome Back!</h3>

                <section>
                    <div className={styles.theDiv}>
                        <label htmlFor="email">Email</label>
                        <input 
                        id="email"
                        placeholder="Email..."
                        onChange={(e) => {
                            setLoginEmail(e.target.value)
                        }}
                        value={loginEmail}
                        />
                    </div>
                </section>

                <section>
                    <div className={styles.theDiv}>
                        <label htmlFor="password">Password</label>
                        <input 
                        id="password"
                        placeholder="Password..."
                        type={password}
                        onChange={(e) => {
                            setLoginPassword(e.target.value)
                        }} 
                        value={loginPassword}
                        />
                        <button className={styles.showPasswordButton} onClick={showPassword}>Show Password</button>
                    </div>
                </section>

                <button className={styles.login}>Login</button>
                <Link to='/register'>Register</Link >
            </form>
        </div>
    )
}

export default Login