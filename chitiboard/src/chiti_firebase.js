// Import 
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDgaQPtZxiqU56QPGYPZ4M-3Cd4-hTXMU",
  authDomain: "newchitiboard-9ed3e.firebaseapp.com",
  projectId: "newchitiboard-9ed3e",
  storageBucket: "newchitiboard-9ed3e.appspot.com",
  messagingSenderId: "462130296630",
  appId: "1:462130296630:web:abcf3b0774f95b2f96e597"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);

// the database
export const database = getFirestore();

// authentication 
export const authenticator = getAuth();

// the firebase storage root
export const storage = getStorage();

 // convert timestamps into string date
export const getDate = (timeStamp)=>{
  const currDate = new Date(timeStamp.seconds * 1000);
  return currDate.toDateString();
}