import React,{ useState } from "react";
import { useNavigate } from 'react-router-dom';

function SearchBar () {
    const [ watchSearch, setWatchSearch ] = useState("") 
    const [ focus, setFocus ] = useState(false)
    const handleChange = (event) => {
      setWatchSearch(event.target.value);
    };
    const navigate = useNavigate()

    function searchWatches(e) {
        e.preventDefault()
        if(watchSearch === "") {
            return
        } else {
            navigate(`/searchedWatch/${watchSearch}`)
        }
      }

    return (
        <form onSubmit={searchWatches} className="searchBar">
            <div className={`search-bar-container`}>
            <input
                className={` searchbar-input`}
                type="text"
                value={watchSearch}
                onChange={handleChange}
                placeholder="Search Watches ..."
                onClick={() => {setFocus(!focus)}}
            />
            <button type="submit">
                <i class="fa fa-2x  fa-search" aria-hidden="true"></i>
            </button>
            </div>
        </form>
    )
}

export default SearchBar