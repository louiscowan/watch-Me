import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

import WatchListings from "./WatchListings"

import 'firebase/storage'

function SearchedWatches () {
    const { searchedWatch } = useParams()

    const watches = useSelector((state) => state.watches)

    const [ searchedWatches, setSearchedWatches ] = useState()

    useEffect(() => {
        const filteredWatches = watches.filter(watch => {
          let theWatch = watch.name.toLowerCase() 
          return theWatch.includes(searchedWatch.toLowerCase())
        })
        
        setSearchedWatches(filteredWatches)
    },[searchedWatch])


    return (
        <div className="watchListings">
            {searchedWatches 
            ? searchedWatches.map(watch => <WatchListings key={watch.id} watch={watch}/>) 
            : <p>There are no current listings for your search.</p>}
        </div>
    )
}

export default SearchedWatches