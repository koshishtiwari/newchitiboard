import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { database, storage } from '../../firebase_config';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

import Loader  from './../loader';
import { IoPersonCircleOutline } from 'react-icons/io5';



function Settings() {

  const [siteMain, setSiteMain] = useState({
    logo: '',
    name: '',
    desc: ''
  });

  const [heroSection, setHeroSection] = useState({
    heroImg: '',
    heroTitle: '',
    heroText: ''
  });

  const [footer, setFooter] = useState('');

  const [isLoadedMain, setIsLoadedMain] = useState(false);
  const [isLoadedHero, setIsLoadedHero] = useState(false);
  const [isLoadedFooter, setIsLoadedFooter] = useState(false);

  const[isLoadingImgMain, setIsLoadingImgMain] = useState(false);
  const[isLoadingImgHero, setIsLoadingImgHero] = useState(false);

  const siteMainDoc = doc(database, 'site-vitals', 'main');
  const homePageDoc = doc(database, 'site-vitals', 'home-page');
  const footerDoc = doc(database, 'site-vitals', 'footer');


  const setSiteLogo = (e)=>{
    const uploadedImg = e.target.files[0];
    setSiteMain({...siteMain, logo:''});
    setIsLoadingImgMain(true);
    
    const logoRef = ref(storage, 'images/siteLogo');
    
    uploadBytes(logoRef, uploadedImg)
        .then((snapshot)=>{
            getDownloadURL(snapshot.ref)
            .then((url)=>{
              setSiteMain({...siteMain, logo:url});
              setIsLoadingImgMain(false);
            })
            .catch(err=>toast(err.message));
        })
        .catch(err=>toast(err.message));
  }

  const setHeroImg = (e) =>{
    const uploadedImg = e.target.files[0];
    setHeroSection({...heroSection, heroImg:''});
    setIsLoadingImgHero(true);
    
    const heroRef = ref(storage, 'images/heroImg');
    
    uploadBytes(heroRef, uploadedImg)
        .then((snapshot)=>{
            getDownloadURL(snapshot.ref)
            .then((url)=>{
              setHeroSection({...heroSection, heroImg:url});
              setIsLoadingImgHero(false);
            })
            .catch(err=>toast(err.message));
        })
        .catch(err=>toast(err.message));
  }


  const updateSiteMain = (e)=>{
    e.preventDefault();
    setIsLoadedMain(false);

    updateDoc(siteMainDoc, siteMain)
    .then(()=>{
      setIsLoadedMain(true);
      toast("Updated Site Essentials!")
    })
    .catch(err=>toast(err.message));


  }

  const updateHeroSection = (e) => {
    e.preventDefault();
    setIsLoadedHero(false);

    updateDoc(homePageDoc, heroSection)
    .then(()=>{
      setIsLoadedHero(true);
      toast("Updated Hero Section!")
    })
    .catch(err=>toast(err.message));
  }

  const updateFooter = (e) =>{
    e.preventDefault();
    setIsLoadedFooter(false);
  }

  useEffect(()=>{
    getDoc(siteMainDoc)
    .then((snapshot)=>{
      const data = snapshot.data();
      setSiteMain({
        logo: data.logo,
        name: data.name,
        desc: data.desc
      });
      setIsLoadedMain(true);
    })
    .catch(err=>toast(err.message));

    getDoc(homePageDoc)
    .then((snapshot)=>{
      const data = snapshot.data();
      setHeroSection({
        heroImg: data.heroImg,
        heroTitle: data.heroTitle,
        heroText: data.heroText
      });
      setIsLoadedHero(true);
    })
    .catch(err=>toast(err.message));

    getDoc(footerDoc)
    .then((snapshot)=>{
      setFooter(snapshot.data().content);
      setIsLoadedFooter(true);
    })
    .catch(err=>toast(err.message));

  },[])

  return (
    <main className='dash-main' id='dash-settings'>
      
      <section id='siteVitals'>
      <h3>Site Essentials</h3>  
      {!isLoadedMain ? (<Loader message/>)
      :(<form>
        <div className='formElement'>
          <p>Site Logo</p>
          <label htmlFor='siteLogo' id='siteLogoInput'>
          {!siteMain.logo ? 
          (isLoadingImgMain)?(<Loader />):(<IoPersonCircleOutline />)
          :(<img src={siteMain.logo}></img>)}

          </label>
          <input id='siteLogo' type={'file'} accept={'image/*'} onChange={setSiteLogo}></input>
        </div>

        <div className='formElement'>
          <label htmlFor='siteName'>Site Name</label>
          <input id='siteName' type={'text'} value={siteMain.name} onChange={e=>setSiteMain({...siteMain, name:e.target.value})} ></input>
        </div>

        <div className='formElement'>
          <label htmlFor='siteDesc'>Site Description</label>
          <textarea id='siteDesc' value={siteMain.desc} onChange={e=>setSiteMain({...siteMain, desc:e.target.value})}></textarea>
        </div>
        <button onClick={updateSiteMain}>Update</button>
      </form>)}
      
      </section>
      

      <section id='homeSettings'>
      <h3>Home Page Essentials</h3>
      <p>Choose a Hero Image and text below to display on your HomePage</p>
      {!isLoadedHero ? (<Loader message/>):
      (<form>
        <div className='formElement'>
          <label htmlFor='heroImg' className='imageLabel'>Hero Image
          {!heroSection.heroImg ? 
          (isLoadingImgHero)?(<Loader />):(<div className='bigImageLoader'></div>)
          :(<img src={heroSection.heroImg} className='bigImageLoader'></img>)}
          </label>

          <input id='heroImg' type={'file'} accept={'image/*'} onChange={setHeroImg} ></input>
        </div>

        <div className='formElement'>
          <label htmlFor='heroTitle'>Hero Title</label>
          <input id='heroTitle' type={'text'} value={heroSection.heroTitle} onChange={e=>setHeroSection({...heroSection, heroTitle:e.target.value})}></input>
        </div>

        <div className='formElement'>
          <label htmlFor='heroText'>Hero Text</label>
          <input id='heroText' type={'text'} value={heroSection.heroText} onChange={e=>setHeroSection({...heroSection, heroText:e.target.value})}></input>
        </div>
        <button onClick={updateHeroSection}>Update</button>
      </form>)}
      
    </section>
      

      <section id='footerSettings'>
        <h3>Site Footer</h3>  

        {!isLoadedFooter ? (<Loader message/>)
        :(<form>
          <div className='formElement'>
            <label htmlFor='footerCont'>Footer Content</label>
            <textarea id='footerCont' value={footer} onChange={e=>setFooter(e.target.value)} ></textarea>
          </div>
          <button onClick={updateFooter}>Update</button>
        </form>)}        
        
        
      </section>
      
      
    </main>
  );

}
  
export default Settings;