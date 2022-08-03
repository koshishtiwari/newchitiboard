import { authenticator } from '../../chiti_firebase';
import { signOut } from 'firebase/auth';

import { useState } from 'react';
import { toast } from 'react-toastify';

import {IoArrowBack} from 'react-icons/io5';
import { IoPersonCircleOutline } from 'react-icons/io5';



function Header({currSection, user, currUser, editor, setEditor}) {

  const [userTab, setUserTab] = useState(false);

  const signOutter = (event)=>{
    event.preventDefault();
    signOut(authenticator)
      .then(()=>{
        currUser();
        toast.info("Signed out Succesfully!")
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }


    return (
      <header className='dash-header'>
        {(editor)? (<button className="icoBtn" onClick={()=>{setEditor()}}><IoArrowBack /></button>):
        (<p id='dashTitle'>{currSection}</p>) }
        
        <nav className="topBtns">
          <a href="./" target={"_blank"} rel={"noopener"}>
            <button>Live</button>
          </a>
          
          <div id="userInfo">
            <button className="icoBtn" onClick={()=>{setUserTab(!userTab)}}>
              {user.photoURL ? 
              (<img alt="Current User Image" src={user.photoURL}></img>):
              (<span id='userIcon'><IoPersonCircleOutline/></span>)}
              
            </button>

            {userTab &&
              <section id="userTab" className='lightOverlay'>
              <div className="userTabInfo">
                <h3>Hi, {user.displayName}</h3>
                <p>Good to see you!</p>
              </div>
              <button className="btnAccentHollow" onClick={(event)=>signOutter(event)}>Sign out!</button>
              </section>
            }
          
          </div>

        </nav>
      </header>
    );

  }
  
  export default Header;