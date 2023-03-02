import React from "react";
import { useNavigate } from "react-router-dom";

function NavButton({buttonWord}) {

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
        <button onClick={buttonClicked} className="NavButton">
            {buttonWord}
         </button>
    )
}

export default NavButton