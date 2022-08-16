import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { Helmet } from 'react-helmet';

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
      <Helmet>
        <title>{siteVital.name}</title>
        <meta name="description" content={siteVital.desc} />
      </Helmet>
      
      <header className="pageHeader">
        <Link to='/' className="siteLogo" >
          {siteVital.logo && <img src={siteVital.logo} alt="Site Logo"></img>}
          <p className="siteTitle">{siteVital.name}</p>
        </Link>
        <nav className="topNav-menu">
          <Link to='/about' className="topNav-menu-item">
            <span>About us</span>
          </Link>
          <Link to ='/posts' className="topNav-menu-item" >
            <span>Posts</span>
          </Link>
        </nav>
      </header>
    </div>
  );
}
    
export default SiteHeader;