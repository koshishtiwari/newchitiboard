import { getFirestore, collection, doc, getDocs, addDoc, deleteDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { FIREBASE_APP, database, authenticator } from '../../chiti_firebase';

import Loader from '../loader';


// dashboard main
function Team() {

    return (
      <main className='dash-main' id='dash-team'>

        <Loader />
        
      </main>
    );

  }
  
  export default Team;