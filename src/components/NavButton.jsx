import React from "react";
import { useNavigate } from "react-router-dom";

function NavButton({buttonWord, buttonClass}) {

    const navigate = useNavigate()

    function buttonClicked() {
        if(buttonWord === 'Create Watch Listing') {
            navigate('/createWatchListing')
        }
       if(buttonWord === 'Login') {
        navigate('/login')
       }
    }

    return (
        <button onClick={buttonClicked} className={`NavButton ${buttonClass}`}>
            {buttonWord}
         </button>
    )
}

export default NavButton