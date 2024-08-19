import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBITn9GswcHyKFq2F01_x5cepThcxUZqHk",
    authDomain: "finans-takip-projesi.firebaseapp.com",
    projectId: "finans-takip-projesi",
    storageBucket: "finans-takip-projesi.appspot.com",
    messagingSenderId: "355019829132",
    appId: "1:355019829132:web:e7d2ebd6c5852c536630a9",
    measurementId: "G-D1F1KX0MCD"
  };
  const app=initializeApp(firebaseConfig);
  export const auth=getAuth(app);
  export const db = getFirestore(app);