import { collection, doc, getDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Markdown from 'markdown-to-jsx';

import { database, getDate } from '../firebase_config';
import { toast } from 'react-toastify';
import Loader from './loader';




// site components
import SiteFooter from "./footer";
import SiteHeader from './header';

function Home() {
  const [heroSection, setHeroSection] = useState({heroImg:'', heroText:'', heroTitle:''});
  const [postsArray, setpostsArray] = useState([]);

  const [inquiries, setInquiries] = useState({});

  // post tanne
  const postsCollection = collection(database, 'posts');
  const queryPosts = query(postsCollection, orderBy('modifiedAt'), limit(5));

  useEffect(()=>{
    getDoc(doc(database, 'site-vitals', 'home-page'))
    .then((snapshot)=>{
      setHeroSection(snapshot.data());
    })
    .catch(err=>toast(err.message));

    getDocs(queryPosts)
    .then((docSnapshot)=>{
      let postsAray = [];

      docSnapshot.docs.forEach((document)=>{
        const banakoDate = getDate(document.data().createdAt);
        const milakoDate = getDate(document.data().modifiedAt);
        postsAray.push({...document.data(), id: document.id, banako:banakoDate, milako:milakoDate});
      });

      setpostsArray(postsAray);
    })
    .catch(err=>toast(err.message));

  },[])

  return (
    <>
    <div className='heroImg' style={{backgroundImage: `url(${heroSection.heroImg})`}}>
    <SiteHeader />

    <div className='heroTextWrap'>
      <h2 className='heroTitle'>{heroSection.heroTitle}</h2>
      <p className='heroText'>{heroSection.heroText}</p>
    </div>
    </div>

    

    <div className='wrapper'>
    <section id="homeBody">
      <h2>Read our recent posts</h2>

      <div className='homePostFeeds'>
        {(postsArray.length < 1) ?
        
        (<Loader message/>) :

        (postsArray.map((post)=>
          <div key={post.id} className="data-document lightOverlay">
            <h3>{post.title}</h3>
            
            <div className='postsMeta'>
              <p>{post.author}</p>
              <p><span className='postCreated'>{post.banako}</span>
                <span className='postModified'>{post.milako}</span>
              </p>
            </div>
            <section className='postFeedMain'>
            
            <article className='postContents'>
              <Markdown>{post.brief}</Markdown>
            </article>
            <img className='postImage' alt={post.title} src={post.ftImgRef}></img>
            </section>
            
            
          </div>
        ))
        }
        
      </div>

    </section>
    <section id='contactSection'>
      <h2>Say us Hi !</h2>
      <form id='contactForm'>
        <input type={'text'} placeholder={'Your Name'}></input>
        <input type={'email'} placeholder={'Email'}></input>
        <textarea placeholder='Your messages'></textarea>
      </form>
      <button>Send</button>
    </section>
    </div>
    

    <SiteFooter />
    </>
    
  );
}

export default Home;