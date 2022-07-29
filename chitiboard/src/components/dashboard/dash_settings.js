import { getFirestore, collection, doc, getDocs, addDoc, deleteDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { FIREBASE_APP, database, authenticator } from '../../chiti_firebase';

// dashboard main
function Settings() {

    return (
      <main className='dash-main' id='dash-settings'>
        <h1>The site settings</h1>
        
        
      </main>
    );

  }
  
  export default Settings;