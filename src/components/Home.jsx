import '../styles/App.css';
import React,  {useEffect, useState}  from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { auth, db } from '../firebase'
import 'firebase/storage'
import { collection, getDocs } from 'firebase/firestore' 


import WatchListings from './WatchListings';
import WatchBrands from './WatchBrands'
import { addUser, addWatchesAction } from '../actions';
import { onAuthStateChanged } from 'firebase/auth';


function Home() {

  const watchCollectionRef = collection(db, "watches")

  const dispatch = useDispatch()

  const watches = useSelector((state) => state.watches)

  useEffect(() => {
    const getWatches = async () => {
      const watchData = await getDocs(watchCollectionRef)
      const watchArray = []
      watchData.docs.map((doc) => watchArray.push({...doc.data(), id: doc.id}))
      dispatch(addWatchesAction(watchArray))
    }
    getWatches()
    
    onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser)
    });   
  }, [])


  return (
    <div className="App App-header">
      <WatchBrands />
      <div className='watchListings'>  
        {watches.map((watch, index) => {
          return (
            <WatchListings key={index} watch={watch}/>
          )
        })} 
      </div>
    </div>
  );
}

export default Home;