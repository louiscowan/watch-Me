import React, { useState } from "react";
import { updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

import styles from '../styles/registerAndLogin.module.css'

function Register() {
    const [ registerEmail, setRegisterEmail ] = useState('')
    const [ registerPassword, setRegisterPassword ] = useState('')
    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("password")


    const navigate = useNavigate()

    function register (e) {
        e.preventDefault()
        createUserWithEmailAndPassword(
            auth,
            registerEmail,
            registerPassword
            )
            .then((result) => {
                updateProfile(result.user, {
                    displayName: username
                })
            })
            .then(() => {
                navigate('/')
            })
            .catch((error) => {
                if(registerPassword.length < 6) {
                    alert("Password must be at least 6 characters")
                } else {
                   alert(error.message)
                }
            }
            )
    }

    function showPassword (e) {
        e.preventDefault()
        if(password === 'password') {
            setPassword("text")
        } else {
            setPassword('password')
        }
    }

    return (
        <div className={styles.loginDiv}>
            <form className={styles.loginForm} onSubmit={register}>
                <h3>Sign Up</h3>
                <section>
                    <div className={styles.theDiv}>
                        <label htmlFor="email">Email</label>
                        <input 
                            id="email"
                            value={registerEmail}
                            onChange={(e) => {
                                setRegisterEmail(e.target.value)
                            }}
                        />
                    </div>
                </section>

                <section>
                    <div className={styles.theDiv}>
                        <label htmlFor="register-password">Password</label>
                        <input 
                            type={password}
                            value={registerPassword}
                            id="register-password"
                            onChange={(e) => {
                                setRegisterPassword(e.target.value)
                            }}
                        />
                        <button className={styles.showPasswordButton} onClick={showPassword}>Show Password</button>
                    </div>
                </section>

                <section>
                    <div className={styles.theDiv}>
                        <label htmlFor="register-username">Username</label>
                        <input 
                            id="register-username"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value)
                            }}
                        />
                    </div>
                </section>
                <button className={styles.register}>Register</button>
                <Link to='/login'>Login</Link >
            </form>
        </div>
    )
}

export default Register