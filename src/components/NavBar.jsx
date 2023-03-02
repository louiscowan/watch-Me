import { onAuthStateChanged, signOut } from "firebase/auth"
import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../firebase.js"
import NavButton from './NavButton.jsx'
import SearchBar from "./SearchBar.jsx"

function NavBar() {
    const [ accountClicked, setAccountClicked ] = useState(false)

    const navigate = useNavigate()
    const [ user, setUser ] = useState()

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
          });   
        }, [])

        const logout = async () => {
            await signOut(auth)
            setAccountClicked(false)
        }
    

    return (
        <nav className={`navBar`}>
            <div className="logo-search-div">
                <h1 onClick={() => navigate('/')} className="logo">Watch Me</h1>
                <SearchBar />
            </div>
            <div className="user-div">
                {user
                ?   <button className="userButton" onClick={() => setAccountClicked(!accountClicked)}><i class="fa-solid fa-3x fa-user-secret"></i></button>
                :   <NavButton buttonWord={'Login'}/>
                }
            </div>
            {accountClicked 
            ?   <div className="acountDetailsDiv">
                    <ul>
                        <section>
                            <li>{user.displayName}</li>
                            <li>{user.email}</li>
                        </section>
                    <hr className="hr"/>
                        <section className="section-link">
                            <li ><Link onClick={() => {setAccountClicked(false)}} className="link" to={`/account/:${user.uid}`}>Your Watches</Link></li>
                        </section>
                    <hr className="hr"/>
                        <section className="section-link">
                            <li onClick={logout}>Sign Out</li>
                        </section>
                    </ul>
                </div>   
            :   null
            }
        </nav>
    )
}

export default NavBar