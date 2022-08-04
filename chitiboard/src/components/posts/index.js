import { database, getDate } from '../../firebase_config';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { useState, useEffect } from 'react';

import Markdown from 'markdown-to-jsx';
import Loader from '../loader';
import SiteHeader from '../header';
import SiteFooter from '../footer';




function Posts() {

  // hold the posts data
  const [postsArray, setpostsArray] = useState([]);

  // post tanne
  const postsCollection = collection(database, 'posts');
  const queryPosts = query(postsCollection, orderBy('modifiedAt'));

  useEffect(()=>{
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
    .catch(err=>{
      console.log(err.message);
    });
  },[])

  return (
    <>
    <SiteHeader />

    <div className='wrapper'>
    <section id='postFeed'>
      <h2>Posts</h2>
      <div className='data-table'>
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
    </div>
    

    <SiteFooter />
    </>
    
  );
}
  
export default Posts;