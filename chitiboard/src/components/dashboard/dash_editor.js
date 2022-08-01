import { collection, doc, addDoc, deleteDoc, updateDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { database, getDate } from '../../chiti_firebase';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

import Loader from '../loader';

const posts = collection(database, 'posts');


function Editor({user, setEditor, features}) {

  const [isLoaded, setIsLoaded] = useState(true);
   // state to store post data
   const [postTitle, setPostTitle] = useState('');
   const [postImage, setPostImage] = useState('');
   const [postBrief, setPostBrief] = useState('');
   const [postText, setPostText] = useState('');
   const [postMilako, setPostMilako] = useState('Just now');
   const [postAuthor, setPostAuthor] = useState('');


  // get the post
  const getPostSnap = ()=>{
    if(!features.novo){
      // ref to the current post if the editor is on update mode i.e features.novo = false
      const thisPost = doc(database, 'posts', features.id);
      getDoc(thisPost)
        .then((postSnap)=>{
          const postData = postSnap.data();
          setPostTitle(postData.title);
          setPostBrief(postData.brief);
          setPostText(postData.text);
          setPostImage(postData.ftImgRef);
          setPostMilako(getDate(postData.modifiedAt));
          setPostAuthor(postData.author);

        })
        .catch((err)=>{
          toast(err.message);
        })
    }
  }

  useEffect(()=>{
    getPostSnap();
  },[])
  
  // save the post
  const savePost = (e)=>{
    e.preventDefault();
    setIsLoaded(false);

    addDoc(posts, {
      title: postTitle,
      text : postText,
      brief: postBrief,
      ftImgRef : postImage,

      author : user.email,
      createdAt : serverTimestamp(),
      modifiedAt : serverTimestamp()
    })
    .then(()=>{
      setEditor();
      toast("Save Succesfully!");
    })
    .catch((err) =>{
      toast(err.message);
    })


  }

  // update the post
  const updatePost = (e)=>{
    e.preventDefault();
    setIsLoaded(false);

    if(!features.novo){
      // ref to the current post if the editor is on update mode i.e features.novo = false
      const thisPost = doc(database, 'posts', features.id);
   
    updateDoc(thisPost, {
      title: postTitle,
      text : postText,
      brief: postBrief,
      ftImgRef : postImage,
      modifiedAt : serverTimestamp()
    })
    .then(()=>{
      setIsLoaded(true);
      toast("Updated Succesfully");
    })
    .catch((err)=>{toast(err.message)});
    }
  }

  // delete the post
  const delPost = (e)=>{
    e.preventDefault();
    setIsLoaded(false);
    if(!features.novo){
      // ref to the current post if the editor is on update mode i.e features.novo = false
      const thisPost = doc(database, 'posts', features.id);
   
    deleteDoc(thisPost)
    .then(()=>{
      toast("Deleted Succesfully");
      setEditor();
    })
    .catch((err)=>{toast(err.message)});
    }
  }

  if (user){
    return (
      <main className='dash-main' id='dash-editor'>
        {(features.novo) ? 
          (<h3>Create a New Post</h3>):
          (<div>
            <h3>Update the post</h3>
          </div>
          )
        }
        <p>Please fill in the fields below and hit the save button when done.</p>
        
        {isLoaded ? 
        (<div className='editorContainer'>
        <section className='editorArea'>
        <form id='editPost'>
          <div className='formElement'>
            <label htmlFor='titleInput' >Title of the post </label>
            <input type={"text"} id='titleInput' value={postTitle} onChange={(e)=>setPostTitle(e.target.value)}></input>
          </div>
          <div className='formElement'>
            <label htmlFor='ftImageInput'>Featured image</label>
            <input type={"text"} id='ftImageInput' value={postImage} onChange={(e)=>setPostImage(e.target.value)}></input>
          </div>
          <div className='formElement'>
            <label htmlFor='briefInput' >Brief Summary</label>
            <textarea id='briefInput' rows={10} value={postBrief} onChange={(e)=>setPostBrief(e.target.value)}></textarea>
          </div>
          <div className='formElement'>
            <label htmlFor='textInput' >Everything</label>
            <textarea id='textInput' rows={30} value={postText} onChange={(e)=>setPostText(e.target.value)}></textarea>
          </div>

          {(!features.novo) ?
          (<button onClick={updatePost}>Update Post</button>):
          (<button onClick={(e)=>{savePost(e)}}>Save Post</button>)}
        
        </form>
        </section>

        <section className='editorMeta'>
          <div className='postVitals'>
            <h4>Post Vitals</h4>
            <p>Author: {postAuthor}</p>
            <p>Last updated: {postMilako}</p>
          </div>
          {!features.novo && 
          <button className='btnDanger' title='Once you delete you cannot get it back!' onClick={delPost}>Delete Post</button>}
          
          
        </section>

      </div>):
        (<Loader />)}
        
        
  
      </main>
    );
  
  } else {
    return <p>Refresh the page and sign in first!</p>
  }
  
}
  
export default Editor;