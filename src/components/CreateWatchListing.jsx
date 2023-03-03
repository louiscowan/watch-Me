import React, {useState} from "react";
import { auth, db, storage } from '../firebase'
import 'firebase/storage'
import { collection, addDoc } from 'firebase/firestore' 
import { ref, uploadBytes } from "firebase/storage"
import { useNavigate } from "react-router-dom";

import styles from '../styles/createWatchListing.module.css'

function CreateWatchListing() {
    const [ imageUpload, setImageUpload ] = useState(null)
    const [ watchName, setWatchName ] = useState("")
    const [ watchPrice, setWatchPrice ] = useState(0)
    const [ hasBoxPapers, setHasBoxPapers] = useState()
    const [ watchDescription, setWatchDescription] = useState()
    const [ contactNumber, setContactNumber] = useState()
    const [ emailAddress, setEmailAddress] = useState()

    const navigate = useNavigate()

    const watchCollectionRef = collection(db, "watches")

    const theUser = auth.currentUser

    const createWatchListing = async (e) => {
        e.preventDefault()
        await addDoc(watchCollectionRef, {
            name: watchName, 
            price: watchPrice, 
            watchImageUrl: `images/${imageUpload.name}.jpeg`, 
            hasBoxPapers: hasBoxPapers, 
            watchDescription: watchDescription, 
            emailAddress: emailAddress, 
            contactNumber: contactNumber,
            user: theUser.uid
        })
        uploadImage()
      }

    function uploadImage () {
        if(imageUpload == null) return
        const imageName = `images/${imageUpload.name}.jpeg`
        const imageRef = ref(storage, imageName)   
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            navigate('/')
        })
    }

    function hasBoxAndPapers(e) {
        setHasBoxPapers(e.target.value)
    }

    return (
        <div className={styles.createWatchListing}>
            <h2 className={styles.heading}>Create a Watch Listing</h2>
            <form onSubmit={createWatchListing}>
                <label htmlFor='imageUpload'>Choose Watch Image<span>  *</span></label>
                <input 
                    type="file"
                    id="imageUpload" 
                    onChange={(e) => {setImageUpload(e.target.files[0])}} 
                    className={styles.input}
                    />
                <label htmlFor="watchName">Name of watch<span>  *</span></label>
                <input 
                    id="watchName" 
                    placeholder="Rolex Daytona..." 
                    type="text" 
                    onChange={e => {
                        setWatchName(e.target.value)
                    }} 
                    className={styles.input}
                />
                <label htmlFor="price">Name of watch<span>  *</span></label>
                <input 
                    type="number" 
                    id="price"
                    placeholder="Price..."
                    onChange={e => {setWatchPrice(e.target.value)}} 
                    className={styles.input}
                    />
                <fieldset className={styles.fieldset}>
                    <h3>Do you have the original box and papers?<span>  *</span></h3>
                    <input 
                    onChange={hasBoxAndPapers}
                    type="radio"
                    id="Original box and papers"
                    name="box-and-papers"
                    value="Original box and papers"
                    required
                    className={styles.radioButton}
                    />
                    <label htmlFor="Original box and papers">Box and Papers</label>
                    <br />
                    <input 
                    onChange={hasBoxAndPapers}
                    type="radio"
                    id="Original Box"
                    name="box-and-papers"
                    value="Original Box"
                    required
                    className={styles.radioButton}
                    />
                    <label htmlFor="Original Box">Original Box</label>
                    <br />
                    <input 
                    onChange={hasBoxAndPapers}
                    type="radio"
                    id="Original Papers"
                    name="box-and-papers"
                    value="Original Papers"
                    required
                    className={styles.radioButton}
                    />
                    <label htmlFor="Original Papers">Original Papers</label>
                    <br />
                    <input 
                    onChange={hasBoxAndPapers}
                    type="radio"
                    id="No Box or Papers"
                    name="box-and-papers"
                    value="No Box or Papers"
                    required
                    className={styles.radioButton}
                    />
                    <label htmlFor="No Box or Papers">No Box or Papers</label>
                    <br />
                </fieldset>
                <fieldset className={styles.fieldset}>
                    <label htmlFor="watchDescription">Tell us more about your watch</label>
                    <input 
                    onChange={(e) => setWatchDescription(e.target.value)}
                    type='text'
                    id="watchDescription"
                    className={styles.input}
                    /> 
                </fieldset>
                <fieldset className={styles.fieldset}>
                    <label htmlFor="contactNumber">Phone Number<span>  *</span></label>
                    <input 
                    onChange={(e) => setContactNumber(e.target.value)}
                    type='number'
                    id="contactNumber"
                    className={styles.input}
                    /> 
                    <label htmlFor="emailAddress">Email Address<span>  *</span></label>
                    <input 
                    onChange={(e) => setEmailAddress(e.target.value)}
                    type='text'
                    id="emailAddress"
                    className={styles.input}
                    /> 
                </fieldset>
                <button className={styles.button}>Add Watch Listing</button>
            </form>
        </div>
        )
}

export default CreateWatchListing