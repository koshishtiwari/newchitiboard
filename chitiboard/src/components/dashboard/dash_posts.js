import { getFirestore, collection, doc, getDocs, addDoc, deleteDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { FIREBASE_APP, database, authenticator } from '../../chiti_firebase';


// dashboard main
function DashPosts() {

    return (
      <main className='dash-main' id='dash-posts'>
        <h1>All your posts displayer</h1>
        
      </main>
    );

  }
  
  export default DashPosts;