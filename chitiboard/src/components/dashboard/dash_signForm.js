import { FIREBASE_APP, authenticator } from '../../chiti_firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import Message from '../message';


function SignIn() {
  const [userMessages, setUserMessages] = useState ('');

  const signInner = (event)=>{
    event.preventDefault();
    const form = document.getElementById("signForm");
    const signInput = {email: form.elements['emailInput'].value, pass: form.elements['passInput'].value};
    
    signInWithEmailAndPassword(authenticator, signInput.email, signInput.pass)
      .then((userCred)=>{
      })
      .catch((err) =>{
        setUserMessages(err.message);
    });



  }

    return (
      <section className='modal'>
        <div className='signModal'>
          <h3> Sign in</h3>
          <form id='signForm'>
            <label htmlFor="emailInput">Email</label>
            <input type={"email"} id="emailInput" placeholder='ratablanca@prada.gn'></input>

            <label htmlFor="passInput">Password</label>
            <input type={"password"} id="passInput"></input>

            <button onClick={(event)=>{signInner(event)}}>Let's go</button>
            <button className='btnAccentHollow'>Cancel</button>
          </form>
        </div>
        
        {userMessages &&
        <Message messages={userMessages}/>}
        
      </section>
    );

  }
  
  export default SignIn;