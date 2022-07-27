import { authenticator } from '../../chiti_firebase';
import { signOut } from 'firebase/auth';

import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Header({currSection, user}) {

  const [userTab, setUserTab] = useState(false);

  const signOutter = (event)=>{
    event.preventDefault();
    signOut(authenticator)
      .then(()=>{
        toast.info("Signed out Succesfully!")
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }


    return (
      <header className='dash-header'>
        <p id='dashTitle'>{currSection}</p>
        <nav className="topBtns">
          <a href="./" target={"_blank"} rel={"noopener"}>
            <button>Live</button>
          </a>
          
          <div id="userInfo">
            <button className="btnNeutral" onClick={()=>{setUserTab(!userTab)}}>
              <img width={"20px"} height={"20px"}></img>
              <p id="userName">{user.displayName}</p>
            </button>

            {userTab &&
              <section id="userTab">
              <div className="userTabInfo">
                <h2>{user.displayName}</h2>
                <p>{user.email}</p>
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