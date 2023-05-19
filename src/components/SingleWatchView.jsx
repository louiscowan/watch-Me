import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db, storage } from '../firebase'
import 'firebase/storage'
import { ref, getDownloadURL} from "firebase/storage"

import styles from'../styles/singleWatchView.module.css'
import { collection, getDocs } from "firebase/firestore";

function SingleWatchView() {
    const [ watch, setWatch ] = useState() 
    const [ imageUrl, setImageUrl ] = useState("")
    const [ contactDetails, setContactDetails ] = useState(true)
    const [ price, setPrice] = useState()

    const { watchId } = useParams()
    
    useEffect(() => {
        const getWatches = async () => {
            const watchCollectionRef = collection(db, "watches");
            const watchData = await getDocs(watchCollectionRef);
          
            const singleWatch = [];
            watchData.docs.forEach((doc) => {
              if (doc.id === watchId) {
                singleWatch.push({ ...doc.data(), id: doc.id });
                setWatch({ ...doc.data(), id: doc.id });
              }
            });
          
            if (singleWatch.length > 0) {
              const imageRef = ref(storage, singleWatch[0].watchImageUrl);
              getDownloadURL(imageRef).then((res) => {
                setImageUrl(res);
              });
            }
          };
          
            getWatches()
    },[watchId])




    useEffect(() => {
        console.log("watch", watch)
       if(watch) {
        let price = parseFloat(watch.price)
        const f = new Intl.NumberFormat(undefined)
        let formatedPrice = f.format(price)
        setPrice(formatedPrice)
       }
    },[watch])

    return (
        <div>
            {watch 
            ?  <div>
                    <section  className={styles.listing}>   
                        <img className={styles.watchImage} src={imageUrl} alt={watch.name}/>
                        <div className={styles.watchInfo}>
                            <p>{watch.name}</p>
                                <hr></hr>
                            <p>${price}</p>
                                <hr></hr>
                            <p>{watch.hasBoxPapers}</p>
                                <hr />
                            <div className={styles.contactButtonDiv}>
                                {contactDetails 
                                ? <button onClick={() => setContactDetails(false)} className={styles.buyButton}><i class="fa fa-solid fa-phone"></i>Contact Details</button>
                                :  <button onClick={() => setContactDetails(true)} className={styles.buyButton}><i class="fa fa-solid fa-phone"></i>{watch?.contactNumber}</button>
                                }
                                <a id="emailMe" href={`mailto:${watch.emailAddress}`}><button className={styles.buyButton}><i class="fa fa-envelope"></i>Email enquiry</button></a>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className={styles.watchDescription}>
                            <p>{watch.watchDescription}</p>    
                        </div>   
                    </section>
                </div>
            : null
            }
        </div>
    )
}

export default SingleWatchView