import React, {useEffect, useState} from "react";
import { storage } from '../firebase'
import 'firebase/storage'
import { ref, getDownloadURL} from "firebase/storage"
import { useNavigate } from "react-router-dom";


function WatchListings (props) {
    const [ imageUrl, setImageUrl ] = useState("")
    const [ price, setPrice ] = useState("")

    const navigate = useNavigate()

    const watch = props.watch
    
    useEffect(() => {
        if(watch.watchImageUrl) {
        const imageRef = ref(storage, watch.watchImageUrl)
          getDownloadURL(imageRef)
            .then(res => {
              setImageUrl(res)
            })
        }
    }, [])

    useEffect(() => {
      if(watch) {
       let price = parseFloat(watch.price)
       const f = new Intl.NumberFormat(undefined)
       let formatedPrice = f.format(price)
       setPrice(formatedPrice)
      }
   },[watch])

    function navigateToSingleWatchView() {
      navigate(`/singleWatchView/${watch.id}`)
    }

    return (
      <div onClick={navigateToSingleWatchView} className="watch-card">
        <div className="watch-card-image-container">
            <img src={imageUrl} alt={watch.name} className="watch-card-image" />
        </div>
        <div className="watch-card-details">
            <h2 className="watch-card-name">{watch.name}</h2>
            <p className="watch-card-price">${price}</p>
        </div>
      </div>
      )
}

export default WatchListings