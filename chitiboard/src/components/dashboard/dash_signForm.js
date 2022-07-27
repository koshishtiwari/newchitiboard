import { FIREBASE_APP, authenticator } from '../../chiti_firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';

import {toast } from 'react-toastify';


function SignIn({currUser}) {

  const signInner = (event)=>{
    event.preventDefault();
    const form = document.getElementById("signForm");
    const signInput = {email: form.elements['emailInput'].value, pass: form.elements['passInput'].value};
    
    signInWithEmailAndPassword(authenticator, signInput.email, signInput.pass)
      .then((userCred)=>{
        currUser(userCred.user);
        toast.info("Sign in Succesfull!")
      })
      .catch((err) =>{
        toast.error(err.message);
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
        
      </section>
    );

  }
  
  export default SignIn;