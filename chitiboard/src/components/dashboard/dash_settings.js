import { getFirestore, collection, doc, getDocs, addDoc, deleteDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { FIREBASE_APP, database, authenticator } from '../../chiti_firebase';


// dashboard main
function Settings() {

    return (
      <main className='dash-main' id='dash-settings'>
        <h1>The site settings</h1>
        {/* mainly home page ma display garne ka kuraharu: hero_img/title/text  number of posts, contact info and others*/}
        
      </main>
    );

  }
  
  export default Settings;