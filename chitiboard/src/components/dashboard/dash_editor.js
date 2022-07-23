import { getFirestore, collection, doc, getDocs, addDoc, deleteDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { FIREBASE_APP, database, authenticator } from '../../chiti_firebase';


// dashboard main
function Editor(post) {

    return (
      <main className='dash-main' id='dash-editor'>
        <h1>Welcome</h1>
        <input type="textarea"/>
        <p>This is editor area </p>
      </main>
    );

  }
  
  export default Editor;