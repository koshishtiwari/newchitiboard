import { getFirestore, collection, doc, getDocs, addDoc, deleteDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { FIREBASE_APP, database, authenticator } from '../../chiti_firebase';


// dashboard main
function Team() {

    return (
      <main className='dash-main' id='dash-team'>
        <h1>Update your team</h1>
        
      </main>
    );

  }
  
  export default Team;