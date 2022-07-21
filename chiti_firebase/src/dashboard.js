//imports
import { getFirestore, collection, doc, getDocs, addDoc, deleteDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { el, mount, setChildren } from "redom";
import { FIREBASE_APP } from './index';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';


// aile lai yo simple wrapper banako paxi alik efficeint banamla hai TODO::

export function dashBoard(){
    // all the dahsBoardy thing

    // the authentication
    const authenticator = getAuth();

    // suruma kholda sign in navako nei thik hunxa browser le save garihalxa ni user pass ta
    // signing in
    // <form id="loginForm"> lai select garyo vane sidei 'loginForm.email.value' garna milxa

    // const emailInput = document.getElementById('emailInput').value;
    // const passInput = document.getElementById('passInput').value;
    // signInWithEmailAndPassword(authenticator, "thapatrsuman@gmail.com", "chitiboard123")
    //     .then((credentials)=>{
    //         console.log(credentials.user); //the user obj
    //     })
    //     .catch(err=>{
    //         console.log("signin:" + err.message);
    //     })


    // signing out
    // signOut(authenticator)
    //     .then(()=>{
    //         // the current user signed out
    //     })
    //     .catch(err=>{
    //         console.log('signout:', err.message);
    //     })


    
    // post data fetching
    const dataField = document.getElementById('postsData');
    const loadingData = document.getElementById('dataLoading');

    //  firestore init
    const database = getFirestore();

    // the posts collection
    const posts = collection(database, 'posts');
    const postsSnaper = onSnapshot(posts, 
        (docSnapshot)=>{
            // the task completion callback

            // console.log(docSnapshot.docs); // array of the documents that are caught in this snapshot
            // array to store posts data
            let postsArray = [];
            let postNodes = [];

            docSnapshot.docs.forEach((doc)=>{
                postsArray.push({...doc.data(), id: doc.id});
            });

            postsArray.forEach((post)=>{
                // creating divs
                const postItem = el(".dash-document");

                const postTitle = el("h3", post.title, {id:"dash-docTitle"});
                const postText = el("p", post.text, {id:"dash-docText"});
                const postAuthor = el("p", post.author, {id:"dash-docAuthor"});

                setChildren(postItem, [postTitle, postAuthor, postText]);
                postNodes.push(postItem);
            })

            const oldPostAll = document.querySelector('.dash-table');
            const postsAll = el(".dash-table");
            setChildren(postsAll, postNodes)
            dataField.replaceChild(postsAll, oldPostAll);
                        
    }, (err) =>{
        // on error callback
        console.log("post Snap:", err.message);
    });


    // the unsubscribe posts snapshot -- call the return of the snapshot fn 
    // postSnapper();











} //wrapper fns
