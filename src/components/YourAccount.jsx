import { signOut } from "firebase/auth";
import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { auth, storage } from "../firebase";
import NavButton from "./NavButton";

import YourWatches from "./YourWatches";

import styles from '../styles/yourAccount.module.css'

function YourAccount () {
    const [ yourWatches, setYourWatches ] = useState()

    const watches = useSelector(state => state.watches)

    const theUser = auth.currentUser

    useEffect(() => {
        const downloadImageUrls = async (watches) => {
            const newArray = []
            const promises = watches.map(async (watch) => {
                if(watch.user === theUser.uid) {
                    const imageRef = ref(storage, watch.watchImageUrl)
                    const res = await getDownloadURL(imageRef)
                    const updatedWatch = {
                        ...watch,
                        imageUrl: res || null 
                      }
                    newArray.push(updatedWatch)
                }
            })
            await Promise.all(promises)
            setYourWatches(newArray)
        }

        if (watches) {
            downloadImageUrls(watches)
        }
    }, [watches, theUser])

    return (
        <div>
            <div className={styles.listingButtonDiv}>
                <NavButton buttonWord={'Create Watch Listing'}/>
            </div>
            <div>
                <div className={styles.watchListings}>
               {yourWatches
               ?    yourWatches.map((watch) => {
                        return <YourWatches watch={watch} key={watch.id}/>
                    })
                : <p>you do not have any watches</p>
                }
            </div>
        </div>
    </div>
    )
}

export default YourAccount