import { getFirestore, collection, doc, getDocs, addDoc, deleteDoc, updateDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { database } from '../../chiti_firebase';
import { toast } from 'react-toastify';

const posts = collection(database, 'posts');

function Editor({user}) {
  
  const savePost = (e)=>{
    e.preventDefault();

    const form = document.getElementById('editPost');
    addDoc(posts, {
      title: form.titleInput.value,
      text : form.textInput.value,
      brief: form.briefInput.value,
      ftImgRef : form.ftImageInput.value,

      meta:{
        author : user.email,
        banako : serverTimestamp(),
        milako : serverTimestamp()
      }
    })
    .then(()=>{
      toast("Save Succesfully!");
      form.reset();
    })
    .catch(err =>{
      toast("Fail Update Post: "+err.message);
    })


  }

    return (
      <main className='dash-main' id='dash-editor'>

        <form id='editPost'>
          <label htmlFor='titleInput' >Title of the post</label>
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