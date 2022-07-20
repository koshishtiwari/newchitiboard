//imports
import { getFirestore, collection, doc, getDocs, addDoc, deleteDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { el, mount, setChildren } from "redom";
import { FIREBASE_APP } from './index';

// aile lai yo simple wrapper banako paxi alik efficeint banamla hai TODO::

export function dashBoard(){
    // all the dahsBoardy thing
    const dataField = document.getElementById('postsData');

    const database = getFirestore();

    // the posts collection
    const posts = collection(database, 'posts');
        onSnapshot(posts, (docSnapshot)=>{

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
        });












} //wrapper fns
