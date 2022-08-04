import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { database } from '../firebase_config';
import { toast } from 'react-toastify';


function SiteHeader() {

  const [siteVital, setSiteVital] = useState({});

  useEffect(()=>{
    getDoc(doc(database, 'site-vitals', 'main'))
      .then((snapshot)=>{
        setSiteVital(snapshot.data());
      })
      .catch(err=>toast(err.message));
  },[])

  return (
    <div className="wrapper">
      <header className="pageHeader">
        <a className="siteLogo" href="/">
          {siteVital.logo && <img src={siteVital.logo} alt="Site Logo"></img>}
          <p className="siteTitle">{siteVital.name}</p>
        </a>
        <nav className="topNav-menu">
          <a className="topNav-menu-item" href="/about">
            <span>About us</span>
          </a>
          <a className="topNav-menu-item" href="/posts">
            <span>Posts</span>
          </a>
        </nav>
      </header>
    </div>
  );
}
    
export default SiteHeader;