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
        {accountClicked ? (
          <div ref={accountDetailsRef} className="accountDetailsDiv">
            <ul>
              <div className="accountSection">
                <p>{user.displayName}</p>
                <p>{user.email}</p>
              </div>
              <div
                onClick={() => {
                  setAccountClicked(false);
                  navigate(`/account/:${user.uid}`);
                }}
                className="section-link accountSection"
              >
                Your Watches
              </div>
              <div onClick={logout} className="section-link accountSection">
                Sign Out
              </div>
            </ul>
          </div>
        ) : null}
      </>
    );
  };
  
  export default YourAccountPopUp;
  
