import { useState, useEffect, useRef } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase.js";

import NavButton from './NavButton.jsx';
import SearchBar from "./SearchBar.jsx";
import YourAccountPopUp from "./YourAccountPopUp.jsx";

function NavBar() {
  const [ user, setUser ] = useState();
  const [ accountClicked, setAccountClicked ] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    setAccountClicked(false);
    navigate('/');
  }
  
  function handleAccountClick () {
    console.log("clicked");
    setAccountClicked(!accountClicked);
  }

  return (
    <nav className="navBar">
      <div className="logo-search-div">
        <header>
          <h1 onClick={() => navigate('/')} className="logo">Watch Me</h1>
        </header>
      </div>
        <SearchBar />
      <div className="user-div">
        {user
          ? <i onClick={handleAccountClick} className="fa-solid fa-2x fa-user-secret"></i>
          : <NavButton buttonWord={'Login'} />
        }
      <YourAccountPopUp user={user} accountClicked={accountClicked} setAccountClicked={setAccountClicked} logout={logout} />
      </div>
      <button className="fa-solid fa-bars fa-2xl"></button>
    </nav>
  );
}

export default NavBar;
