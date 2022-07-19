// imports
import {initializeApp} from 'firebase/app';
import { getFirestore, collection, doc, getDocs, addDoc, deleteDoc, updateDoc, onSnapshot } from 'firebase/firestore';

// chitiboard firebase console config
const firebaseConfig = {
    apiKey: "AIzaSyCDgaQPtZxiqU56QPGYPZ4M-3Cd4-hTXMU",
    authDomain: "newchitiboard-9ed3e.firebaseapp.com",
    projectId: "newchitiboard-9ed3e",
    storageBucket: "newchitiboard-9ed3e.appspot.com",
    messagingSenderId: "462130296630",
    appId: "1:462130296630:web:abcf3b0774f95b2f96e597"
};

// init firebase 
initializeApp(firebaseConfig);


/** 
remind database structure in firestore
Firestore --> collection --> documents --> data(key:value)
*/

// init firestore -- for database
const database = getFirestore();

/**  the collections from the Firestore database */ 

// the posts collection
const posts = collection(database, 'posts');
// the teams collection 
// and others

/** the documents in the collection  */

// getin the document ---this returns a promise
// getDocs(posts)
//     .then((docSnapshot)=> {
//         // console.log(docSnapshot.docs); // array of the documents
//         // array to store posts data
//         let postsArray = [];

//         docSnapshot.docs.forEach((doc)=>{
//             postsArray.push({...doc.data(), id: doc.id}); // each document objs in posts array
//             console.log(postsArray);
//         })
//     })
//     // error in promise
//     .catch(err => {
//         console.log(err.message);
//     })

// Real time get data from the collections-- this runs once and whenever the data changes in the back
onSnapshot(posts, (docSnapshot)=>{

    // console.log(docSnapshot.docs); // array of the documents that are caught in this snapshot
    // array to store posts data
    let postsArray = [];

    docSnapshot.docs.forEach((doc)=>{
        postsArray.push({...doc.data(), id: doc.id}); // each document objs in posts array
        console.log(postsArray);
    })
});

// adding the documents -- add a document to the collection defined as posts --also returns a promise
// addDoc(posts, {
//     author: 'author name',
//     text: 'text of the posts',
//     title: 'give a title man'
// })
// .then(()=>{
//     // if the docs are added succesfully
// })
// .catch(err=>{
//     console.log(err.message);
// })

// the document reference
// const post1 = doc(database, 'posts', docid)

// deleting the document post1 is defined above as a doc reference --also a promise 
// deleteDoc(post1)
//     .then(()=>{
//         // doc deleted succesfully
//     })
//     .catch(err=>{
//         console.log(err.message);
//     })


// update the document --also a promise
// only need those field that needs to be updated
// updateDoc(post1, {
//     title: 'new title'
// })
// .then(()=>{
//     // updated succesfully
// })
// .catch(err=>{
//     console.log(err.message);
// })