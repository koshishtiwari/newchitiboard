import { getFirestore, collection, doc, getDocs, addDoc, deleteDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { FIREBASE_APP, database, authenticator } from '../../chiti_firebase';


function Header() {

    return (
      <header>
        <h1>Header</h1>
      </header>
    );

  }
  
  export default Header;