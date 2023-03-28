import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function YourAccountPopUp ({ user, accountClicked, setAccountClicked, logout }) {
    const accountDetailsRef = useRef(null);
  
    const navigate = useNavigate()

    useEffect(() => {
      const handleClickOutside = (e) => {
        if (accountDetailsRef.current && !accountDetailsRef.current.contains(e.target)) {
          setAccountClicked(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
  
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [accountDetailsRef, setAccountClicked]);
  
    return (
      <>
        {accountClicked ? 
          <div ref={accountDetailsRef} className="accountDetailsDiv">
            <ul>
              <section>
                <li>{user.displayName}</li>
                <li>{user.email}</li>
              </section>
              <hr className="hr" />
              <section
                onClick={() => {
                  setAccountClicked(false);
                  navigate(`/account/:${user.uid}`);
                }}
                className="section-link"
              >
                <li>Your Watches</li>
              </section>
              <hr className="hr" />
              <section onClick={logout} className="section-link">
                <li>Sign Out</li>
              </section>
            </ul>
          </div>
        : null}
      </>
    );
  };
  
  export default YourAccountPopUp;
  
