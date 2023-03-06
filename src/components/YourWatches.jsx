import React, { useState } from "react";
import { deleteDoc, doc } from 'firebase/firestore'

import styles from '../styles/yourAccount.module.css'
import { db, storage } from "../firebase";
import { deleteObject, ref } from "firebase/storage";
import { useNavigate } from "react-router-dom";

function YourWatches (props) {

    const navigate = useNavigate()

    const watch = props.watch

    const deleteUser = async () => {
        const userDoc = doc(db, 'watches', watch.id)
        const imageRef = ref(storage, watch.imageUrl)
        await deleteDoc(userDoc)
        await deleteObject(imageRef)
        navigate('/')
    }

    return (
            <div className={styles.watchCard}>
                <div className={styles.watchCardImageContainer}>
                    <img src={watch.imageUrl} alt={watch.name} className={styles.watchCardImage} />
                </div>
                <div className={styles.watchCardDetails}>
                    <h2 className={styles.watchCardName}>{watch.name}</h2>
                    <p className={styles.watchCardPrice}>${watch.price}</p>
                    <button className={styles.deleteButton} onClick={() => deleteUser()}>Delete Listing</button>
                </div>
            </div>
    )
}

export default YourWatches