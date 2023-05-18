import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

import WatchListings from "./WatchListings"

import 'firebase/storage'
import { collection, getDocs } from "@firebase/firestore"
import { db, storage } from "../firebase"
import { getDownloadURL, ref } from "firebase/storage"

function SearchedWatches () {
    const { searchedWatch } = useParams()

    const [ searchedWatches, setSearchedWatches ] = useState()

    useEffect(() => {
        const getWatches = async () => {
          const watchCollectionRef = collection(db, "watches");
          const watchData = await getDocs(watchCollectionRef);
      
          const watches = [];
          watchData.docs.forEach((doc) => {
            watches.push({ ...doc.data(), id: doc.id });
          });
      
          const fetchImageUrls = async () => {
            const fetchPromises = watches.map((watch) => {
              const imageRef = ref(storage, watch.watchImageUrl);
              return getDownloadURL(imageRef).then((res) => {
                return { ...watch, imageUrl: res };
              });
            });
      
            const watchesWithUrls = await Promise.all(fetchPromises);
            return watchesWithUrls;
          };
      
          fetchImageUrls().then((watchesWithUrls) => {
            const filteredWatches = watchesWithUrls.filter((watch) => {
              let theWatch = watch.name.toLowerCase();
              return theWatch.includes(searchedWatch.toLowerCase());
            });
      
            setSearchedWatches(filteredWatches);
          });
        };
      
        getWatches();
      }, [searchedWatch]);
      


    return (
        <div className="watchListings">
            {searchedWatches 
            ? searchedWatches.map(watch => <WatchListings key={watch.id} watch={watch}/>) 
            : <p>There are no current listings for your search.</p>}
        </div>
    )
}

export default SearchedWatches