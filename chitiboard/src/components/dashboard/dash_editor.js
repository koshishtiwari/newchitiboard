import { collection, doc, addDoc, deleteDoc, updateDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { database } from '../../chiti_firebase';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

const posts = collection(database, 'posts');



function Editor({user, currSection, features}) {
   // state to store post data
   const [postData, setPostData] = useState({
    title: '',
    text : '',
    brief: '',
    ftImgRef : '',

    author : user.email,
  });

  if (!features.novo){
    const postRef = doc(database, 'posts', features.id);
    const fetchPost = ()=>{
      getDoc(postRef)
        .then((document)=>{
          setPostData(document.data());
        })
        .catch(err=>{
          toast(err.message);
        });
    }
    
    const updatePost = (e)=>{
      e.preventDefault();
      const form = document.getElementById('editPost');
      
      updateDoc(postRef, {
        title: form.titleInput.value,
        text : form.textInput.value,
        brief: form.briefInput.value,
        ftImgRef : form.ftImageInput.value,
  
        modifiedAt : serverTimestamp()
      })
      .then(()=>{
        toast ("Post Updated successfully !");
        currSection("Posts");
      })
      .catch(err=>{
        toast(err.message);
      })
  
    }
  }
  
  // get current post data
  // useEffect(()=>{
  //   if (fetchPost != undefined) {
  //     fetchPost();
  //   }
  // },[]);

  // make two editors for different purposes and back button mising

  const savePost = (e)=>{
    e.preventDefault();

    const form = document.getElementById('editPost');
    addDoc(posts, {
      title: form.titleInput.value,
      text : form.textInput.value,
      brief: form.briefInput.value,
      ftImgRef : form.ftImageInput.value,

      author : user.email,
      createdAt : serverTimestamp(),
      modifiedAt : serverTimestamp()
    })
    .then(()=>{
      toast("Save Succesfully!");
      currSection("Posts");
    })
    .catch(err =>{
      toast("Fail Update Post: "+err.message);
    })


  }

  
  return (
    <main className='dash-main' id='dash-editor'>
      {(features.novo) ? 
        (<h3>Create a New Post</h3>):
        (<div>
          <h3>Update the post</h3>
        </div>
        )
      }
      

      <form id='editPost'>
        <label htmlFor='titleInput' >Title of the post </label>
        <input type={"text"} id='titleInput'></input>

        <label htmlFor='briefInput' >Brief Summary</label>
        <input type={"textarea"} id='briefInput'></input>

        <label htmlFor='textInput' >Everything</label>
        <input type={"textarea"} id='textInput'></input>

        <label htmlFor='ftImageInput'>Featured image</label>
        <input type={"text"} id='ftImageInput' value={"paxi change gar imageupload ma"}></input>

        <button onClick={(e)=>{savePost(e)}}>Save</button>
      </form>

    </main>
  );

}
  
export default Editor;