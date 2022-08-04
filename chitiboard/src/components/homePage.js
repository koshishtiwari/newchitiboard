import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { database } from '../firebase_config';
import { toast } from 'react-toastify';




// site components
import Site_Footer from "./footer";
import Site_Header from './header';

function Home() {
  const [heroSection, setHeroSection] = useState({heroImg:'', heroText:'', heroTitle:''});
  const [postFeed, setPostFeed] = useState({});

  useEffect(()=>{
      getDoc(doc(database, 'site-vitals', 'home-page'))
      .then((snapshot)=>{
        setHeroSection(snapshot.data());
      })
      .catch(err=>toast(err.message));
  },[])

  return (
    <>
    <div className='heroImg' style={{backgroundImage: `url(${heroSection.heroImg})`}}>
    <Site_Header />

    <div className='heroTextWrap'>
      <h2 className='heroTitle'>{heroSection.heroTitle}</h2>
      <p className='heroText'>{heroSection.heroText}</p>
    </div>
    </div>

    

    <div className='wrapper'>
    <section id="homeBody">
      <h1>this is Home</h1>
    </section>
    </div>
    

    <Site_Footer />
    </>
    
  );
}

export default Home;