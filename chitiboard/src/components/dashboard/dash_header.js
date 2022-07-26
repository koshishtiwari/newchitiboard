import { useState } from 'react';

function Header({currSection}) {
  const [userInfo, setUserInfo] = useState(false);

    return (
      <header className='dash-header'>
        <p id='dashTitle'>{currSection}</p>
        <nav className="topBtns">
          <a href="./" target={"_blank"} rel={"noopener"}>
            <button>Live</button>
          </a>
          <button id="signBtn" className="btnAccent">Sign in</button>

          <div id="userInfo">
            <button className="btnNeutral" onClick={()=>{setUserInfo(!userInfo)}}>
              <img width={"20px"} height={"20px"}></img>
              <p id="userName">Chiti</p>
            </button>

            {userInfo &&
              <section id="userTab">
              <div className="userTabInfo">
                <h2>Username</h2>
                <p>user email</p>
              </div>
              <button className="btnAccentHollow">Sign out!</button>
              </section>
            }
            
          </div>
        </nav>
      </header>
    );

  }
  
  export default Header;