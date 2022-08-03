import {useState} from 'react';
import { getAuth, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { IoPersonCircleOutline } from 'react-icons/io5';
import {toast} from 'react-toastify';

import { storage } from '../../chiti_firebase';


let uploadedFile;

function Info({user, currUser}) {

// user Information
const [userName, setUserName] = useState(user.displayName);
const [userImgSrc, setUserImgSrc] = useState(user.photoURL);

const [isLoaded, setIsLoaded] = useState(true);


const setImg = (e) => {
  uploadedFile = e.target.files[0];

  const photoReader = new FileReader();
  photoReader.onload = ()=> setUserImgSrc(photoReader.result);
  photoReader.readAsDataURL(uploadedFile);    

}

// update in the firebase 
const updateUser = (e) => {
  e.preventDefault();
  setIsLoaded(false);

  const userImgRef = ref(storage, `images/user-${userName}`);
  uploadBytes(userImgRef, uploadedFile)
    .then((snapshot)=>{
      toast('Image upload succesfull !');
      getDownloadURL(snapshot.ref)
        .then((url)=>{          
          updateProfile(getAuth().currentUser, {
            displayName: userName,
            photoURL: url
          })
          .then(()=>{
            
            toast("Profile updated succesfully !");
            setIsLoaded(true);
          })
          .catch(err=>toast(err.message));

        })
        .catch(err=>toast(err.message));
    })
    .catch(err=>{
      toast(err.message)
    });

  
  
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
         
        {userImgSrc ?(<img alt="Current User Image" src={userImgSrc}></img>)
        :(<IoPersonCircleOutline />)}
        
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