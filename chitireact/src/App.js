import logo from './logo.svg';
import './App.css';
import  { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import {db} from './firebase-config';
import {getDocs, collection} from 'firebase/firestore';

let postRef = collection(db, "posts");
function App() {
  let postData = getDocs(postRef);
    console.log(postData);
  return 
}

export default App;
