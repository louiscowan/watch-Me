import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBQcCWPwUALaaS-ncdOM82u6ktlTTebPxU",
    authDomain: "watch-app-503ee.firebaseapp.com",
    projectId: "watch-app-503ee",
    storageBucket: "watch-app-503ee.appspot.com",
    messagingSenderId: "1019510453943",
    appId: "1:1019510453943:web:35be7490078f02d0ecbf32",
    measurementId: "G-SR6PHERKXY"
  };
  
  const app = initializeApp(firebaseConfig)
  export const storage = getStorage(app)
  export const db = getFirestore(app)
  export const auth = getAuth(app)