import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

import WatchListings from "./WatchListings"

import { db, storage } from '../firebase'
import 'firebase/storage'
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc  } from 'firebase/firestore' 
import { ref, uploadBytes, listAll, getDownloadURL, updateMetadata } from "firebase/storage"

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
            {searchedWatches ? searchedWatches.map(watch => <WatchListings key={watch.id} watch={watch}/>) : null}
        </div>
    )
}

export default SearchedWatches