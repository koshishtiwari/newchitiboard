import { getFirestore, collection, doc, getDocs, addDoc, deleteDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { FIREBASE_APP, database, authenticator } from '../../chiti_firebase';
import Loader from '../loader';

// dashboard main
function Settings() {

    return (
      <main className='dash-main' id='dash-settings'>
        <Loader message/>
        <section id='homeSettings'>
          <h4>Home Page Essentials</h4>
          <p>Choose a Image and text below to display on your HomePage</p>
          <form>
            <div className='formElement'>
              <label htmlFor='heroImg'>Hero Image</label>
              <input id='heroImg' type={'text'}></input>
            </div>
            <div className='formElement'>
              <label htmlFor='heroTitle'>Hero Title</label>
              <input id='heroTitle' type={'text'}></input>
            </div>
            <div className='formElement'>
              <label htmlFor='heroText'>Hero Text</label>
              <input id='heroText' type={'text'}></input>
            </div>
          </form>
          
        </section>
        
        
      </main>
    );

  }
  
  export default Settings;