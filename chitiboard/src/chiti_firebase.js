// Import 
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';



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