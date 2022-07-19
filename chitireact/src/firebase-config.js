// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();