import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { auth, db, storage } from "../firebase";
import NavButton from "./NavButton";

import YourWatches from "./YourWatches";

import styles from '../styles/yourAccount.module.css'
import { collection, getDocs } from "@firebase/firestore";

function YourAccount () {
    const [ yourWatches, setYourWatches ] = useState()

    const theUser = auth.currentUser

    useEffect(() => {
        
        const getWatches = async () => {
            const watchCollectionRef = collection(db, "watches");
            const watchData = await getDocs(watchCollectionRef);
        
            const watches = [];
            watchData.docs.forEach((doc) => {
              watches.push({ ...doc.data(), id: doc.id });
            });
        
            return watches;
          };
        
          const downloadImageUrls = async (watches) => {
            const newArray = [];
            const promises = watches.map(async (watch) => {
              if (watch.user === theUser.uid) {
                const imageRef = ref(storage, watch.watchImageUrl);
                const res = await getDownloadURL(imageRef);
                const updatedWatch = {
                  ...watch,
                  imageUrl: res || null,
                };
                newArray.push(updatedWatch);
              }
            });
        
            await Promise.all(promises);
            setYourWatches(newArray);
          };
        
          const fetchData = async () => {
            const watches = await getWatches();
            if (watches) {
              await downloadImageUrls(watches);
            }
          };
        
          fetchData();
  }, []);

    return (
        <>
        {theUser           
        ?   <div>
                <div className={styles.listingButtonDiv}>
                    <NavButton buttonWord={'Create Watch Listing'}/>
                </div>
                    <div className={styles.watchListings}>
                    {yourWatches
                    ?    yourWatches.map((watch) => {
                                return <YourWatches watch={watch} key={watch.id}/>
                            })
                        : <p>you do not have any watches</p>
                    }                   
                </div>
            </div>
        :   null
        }
    </>
    )
}

export default YourAccount