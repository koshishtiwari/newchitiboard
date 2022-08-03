import { database, getDate } from '../../chiti_firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { useState, useEffect } from 'react';

import Markdown from 'markdown-to-jsx';
import Loader from '../loader';




function Posts() {

  // hold the posts data
  const [postsArray, setpostsArray] = useState([]);

  // post tanne
  const postsCollection = collection(database, 'posts');
  const queryPosts = query(postsCollection, orderBy('modifiedAt'));

  
  const fetchAllPosts = ()=>{
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
  }

  useEffect(()=>{
    fetchAllPosts();
  },[])

  return (
    <section className='data' id='postData'>
            <div className='data-table'>
              {(postsArray.length < 1) ?
              
              (<Loader message/>) :

              (postsArray.map((post)=>
                <div key={post.id} className="data-document lightOverlay">
                  <h1>{post.title}</h1>
                  
                  <div className='postsMeta'>
                    <p>{post.author}</p>
                    <p><span className='postCreated'>{post.banako}</span>
                      <span className='postModified'>{post.milako}</span>
                    </p>
                  </div>

                  <img alt={post.title} src={post.ftImgRef}></img>
                  <article className='postContents'>
                    <Markdown>{post.text}</Markdown>
                  </article>
                  
                </div>
              ))
              }
              
            </div>
        </section>
  );
}
  
export default Posts;