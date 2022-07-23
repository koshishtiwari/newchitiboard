import { getFirestore, collection, doc, getDocs, addDoc, deleteDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { FIREBASE_APP, database, authenticator } from '../../chiti_firebase';


// dashboard main
function Info({currSection}) {

    return (
      <main className='dash-main' id='dash-info'>
        <h1>Welcome</h1>
        <p>You are at chitiboard Dashboard.</p>
        <p>Login is somewhere around. Find it and put your email on it.</p>
        <p>Then watch the spinner go round.</p>
        <p>You are at: {currSection}</p>
      </main>
    );

  }
  
  export default Info;