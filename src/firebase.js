import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "library-2a47d.firebaseapp.com",
    projectId: "library-2a47d",
    storageBucket: "library-2a47d.appspot.com",
    messagingSenderId: "997806433309",
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: "G-M4D4K9WHJ9",
    
  };

 export const app = initializeApp(firebaseConfig);