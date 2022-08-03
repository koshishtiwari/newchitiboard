import {useState} from 'react';
import { getAuth, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { IoPersonCircleOutline } from 'react-icons/io5';
import {toast} from 'react-toastify';

import { storage } from '../../chiti_firebase';
import Loader from '../loader';



function Info({user, currUser}) {

// user Information
const [userName, setUserName] = useState(user.displayName);
const [userImg, setUserImg] = useState(user.photoURL);

const [isLoaded, setIsLoaded] = useState(true);
const [isLoadingImg, setIsLoadingImg] = useState(null);


const setImg = (e) => {
  const uploadedFile = e.target.files[0];
  setIsLoadingImg(true);
  setUserImg(null);
  
  const userImgRef = ref(storage, `images/user-${user.uid}`);
  uploadBytes(userImgRef, uploadedFile)
    .then((snapshot)=>{
      getDownloadURL(snapshot.ref)
        .then((url)=>{
          setUserImg(url);
          setIsLoadingImg(false);
        })
        .catch(err=>toast(err.message));
    })
    .catch(err=>toast(err.message));
   

}

// update in the firebase 
const updateUser = (e) => {
  e.preventDefault();
  setIsLoaded(false);
         
  updateProfile(user, {
    displayName: userName,
    photoURL: userImg
  })
  .then(()=>{
    toast("Profile updated succesfully !");
    setIsLoaded(true);
    currUser(getAuth().currentUser)
  })
  .catch(err=>toast(err.message));

}

  return (
    <main className='dash-main' id='dash-info'>
      <section className='welcomeSection'>
        <h2 className="sectionHead">Welcome</h2>
        <p>Congratulations and welcome to the team! </p>
        <p>We believe that what a strong group of people can accomplish together is much larger, far greater, and will exceed what an individual can achieve alone.</p>
        <br></br>
        <p>To update your username and profile picture check the User Details below.</p>
      </section>

      <section className='userSection cards lightOverlay'>
        <h3>User Details</h3>
        <form className="updateUser">

        <label htmlFor="userImage" id='userImgInput' className='profilePic' title='Click to change the profile photo'>
         
        {!userImg ?
        (isLoadingImg)?(<Loader />):(<IoPersonCircleOutline />)
        : (<img alt="Current User Image" src={userImg}></img>)}
        
        </label>
        <input type={'file'} id='userImage' onChange={setImg}></input>


        <label htmlFor="userName">Username</label>
        <input type={'text'} id='userName' value={userName} onChange={e=>setUserName(e.target.value)}></input>


        <label htmlFor="userEmail">Email</label>
        <input type={'text'} id='userEmail' disabled value ={user.email}></input>
        {!isLoaded ? 
        (<p>Updating...</p>):
        (<button onClick={updateUser}>Update</button>)}

        </form>
        
      </section>

      <section className='miscSection lightOverlay'>
        <h3 className="sectionHead">Probably useless</h3>
        <p>The information provided by [business entity name] (“we,” “us” or “our”) on [website name] (the “Site”) [and our mobile application] is for general informational purposes only. All information on the Site [and our mobile application] is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability or completeness of any information on the Site [or our mobile application].</p>
      </section>
      
    </main>
  );

}
  
export default Info;