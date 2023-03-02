import React, {useState} from "react";
import { auth, db, storage } from '../firebase'
import 'firebase/storage'
import { collection, addDoc } from 'firebase/firestore' 
import { ref, uploadBytes } from "firebase/storage"
import { useNavigate } from "react-router-dom";

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
        <div className="App App-Header">
            <div className="createWatchListing">
                <h2>Create a Watch Listing</h2>
                <form onSubmit={createWatchListing}>
                <input type="file" onChange={(e) => {setImageUpload(e.target.files[0])}}/>
                    <input placeholder="Watch Name..." onChange={e => {
                        setWatchName(e.target.value)
                    }}/>
                    <input type="number" placeholder="Price..."onChange={e => {setWatchPrice(e.target.value)}}/>
                    <fieldset className="Original box and papers">
                        <h3>Do you have the original box and papers?</h3>
                        <input 
                            onChange={hasBoxAndPapers}
                            type="radio"
                            id="Original box and papers"
                            name="box-and-papers"
                            value="Original box and papers"
                            required
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
                        />
                        <label htmlFor="No Box or Papers">No Box or Papers</label>
                    <br />
                        <label htmlFor="other">Other</label>
                        <input 
                            onChange={hasBoxAndPapers}
                            type="text"
                            id="other"
                        />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="watchDescription">Tell us more about your watch</label>
                        <input 
                            onChange={(e) => setWatchDescription(e.target.value)}
                            type='text'
                            id="watchDescription"
                        /> 
                    </fieldset>
                    <fieldset>
                        <label htmlFor="contactNumber">Phone Number</label>
                        <input 
                            onChange={(e) => setContactNumber(e.target.value)}
                            type='number'
                            id="contactNumber"
                        /> 
                        <label htmlFor="emailAddress">Email Address</label>
                        <input 
                            onChange={(e) => setEmailAddress(e.target.value)}
                            type='text'
                            id="emailAddress"
                        /> 
                    </fieldset>
                    <button>Add Watch Listing</button>
                </form>
            </div>
        </div>
    )
}

export default CreateWatchListing