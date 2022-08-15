import { collection, doc, addDoc, deleteDoc, updateDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";

import { database, storage, getDate } from '../../firebase_config';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

import Loader from '../loader';

const posts = collection(database, 'posts');


function Editor({user, setEditor, features}) {

  const [isLoaded, setIsLoaded] = useState(true);
  const [isLoadingImg, setIsLoadingImg] = useState(false);

   // store post data
   const [postDetails, setPostDetails] = useState({
    title: '',
    text : '',
    brief: '',
    ftImgRef : '',
    slug : '',
    author : user.displayName,
    milako: 'Just now'
   });

  // get the post
  const getPostSnap = ()=>{
    if(!features.novo){
      // ref to the current post if the editor is on update mode i.e features.novo = false
      const thisPost = doc(database, 'posts', features.id);
      getDoc(thisPost)
        .then((postSnap)=>{
          const postData = postSnap.data();
          setPostDetails({
            title: postData.title,
            brief: postData.brief,
            text: postData.text,
            ftImgRef: postData.ftImgRef,
            slug: postData.slug,
            author: postData.author,
            milako: getDate(postData.modifiedAt)
          });

        })
        .catch((err)=>{
          toast(err.message);
        })
    }
  }

  useEffect(()=>{
    getPostSnap();
  },[])
  

  // upload Image
  const setImg = (e)=>{
    const uploadedImg = e.target.files[0];
    
    // just to show loader when the new image is being uplaoded
    setPostDetails({...postDetails, ftImgRef: null});

    setIsLoadingImg(true);
    
    const postImageRef = ref(storage, `images/post-${uploadedImg.lastModified}`);
    
    uploadBytes(postImageRef, uploadedImg)
        .then((snapshot)=>{
            getDownloadURL(snapshot.ref)
            .then((url)=>{
                setPostDetails({...postDetails, ftImgRef: url});

                setIsLoadingImg(false);
            })
            .catch(err=>toast(err.message));
        })
  }

  // save the post
  const savePost = (e)=>{
    e.preventDefault();
    setIsLoaded(false);

    addDoc(posts, {
      title: postDetails.title,
      text : postDetails.text,
      brief: postDetails.brief,
      ftImgRef : postDetails.ftImgRef,
      slug : postDetails.slug,

      author : user.displayName,
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
      title: postDetails.title,
      text : postDetails.text,
      brief: postDetails.brief,
      ftImgRef : postDetails.ftImgRef,
      slug : postDetails.slug,
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

      if(postDetails.ftImgRef !== ''){
        deleteObject(ref(storage, postDetails.ftImgRef))
        .then(()=>{
            
        })
        .catch(err=>toast(err.message));
      }
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
        <form id='editPost' onSubmit={(e)=>e.preventDefault()}>
          <div className='formElement'>
            <label htmlFor='titleInput' >Title of the post </label>
            <input type={"text"} id='titleInput' value={postDetails.title} onChange={(e)=>setPostDetails({...postDetails, title: e.target.value})}></input>
          </div>

          <div className='formElement'>
            <label htmlFor='slugInput'>Custom slug (URL path) <br></br><em>This is required to view your post</em></label>
            <input type={'text'} placeholder='eg: blog-title' id='slugInput' value={postDetails.slug} onChange={(e)=>setPostDetails({...postDetails, slug: e.target.value})}></input>
          </div>

          <div className='formElement'>
            <label htmlFor='ftImageInput' className='imageLabel'>Featured Image 
            {!postDetails.ftImgRef ? 
            (isLoadingImg) ? (<Loader />):(<div className='bigImageLoader'></div>)
            :(<img alt="featured Image" src={postDetails.ftImgRef} className='bigImageLoader'></img>)}
            </label>
            
            <input type={"file"} id='ftImageInput' onChange={setImg} accept={'images/*'}></input>
          </div>

          <div className='formElement'>
            <label htmlFor='briefInput' >Brief Summary</label>
            <textarea id='briefInput' rows={10} value={postDetails.brief} onChange={(e)=>setPostDetails({...postDetails, brief: e.target.value})}></textarea>
          </div>

          <div className='formElement'>
            <label htmlFor='textInput' >Everything</label>
            <textarea id='textInput' rows={30} value={postDetails.text} onChange={(e)=>setPostDetails({...postDetails, text: e.target.value})}></textarea>
          </div>
        
        </form>
        </section>

        <section className='editorMeta'>
          <div className='postVitals'>
            <h4>Post Vitals</h4>
            <p>Author: {postDetails.author}</p>
            <p>Last updated: {postDetails.milako}</p>
          </div>
          
          {(!features.novo) ?
          (
          <div className='editorFormBtns'>
            <button onClick={updatePost}>Update Post</button>
            <button className='btnDanger' title='Once you delete you cannot get it back!' onClick={delPost}>Delete Post</button>
          </div>
          ):
          (<button onClick={savePost}>Save Post</button>)}
          
        </section>

      </div>):
        (<Loader message/>)}
  
      </main>
    );
  
  } else {
    return <p>Refresh the page and sign in first!</p>
  }
  
}
  
export default Editor;