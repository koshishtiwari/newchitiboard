import { database } from '../../chiti_firebase';
import { collection, doc, getDocs, addDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { useEffect, useState } from 'react';
// toast messages
import { toast } from 'react-toastify';
import Loader  from './../loader';

// dashboard main
function DashPosts({user, currSection}) {
  // hold the posts data
  const [postsArray, setpostsArray] = useState([]);

  // post tanne
  const postsCollection = collection(database, 'posts');
  const queryPosts = query(postsCollection, orderBy('modifiedAt'));

  // convert timestamps into string date
  const getDate = (timeStamp)=>{
    const currDate = new Date(timeStamp.seconds * 1000);
    return currDate.toDateString();
  }

  
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
      toast(err.message);
    });
  }

  useEffect(()=>{
    fetchAllPosts();
    
  },[])

  if (user){
    return (
      <main className='dash-main' id='dash-posts'>
        <section className='dash-dataInfo'>
          <p id='datainfoType'>All Posts (<span id='datainfoCount'>{postsArray.length}</span>)</p>
          <div className='dataOp'>
            <button className='btnAccent dataOpBtn' id='addPost' onClick={()=>{currSection("Editor");}}>Compose New</button>
          </div>
        </section>

        <section className='data' id='postData'>
            <div className='data-table'>
              {(postsArray.length < 1) ?
              
              (<Loader />) :

              (postsArray.map((post)=>
                <div key={post.id} className="data-document">
                  <h3>{post.title}</h3>
                  <div className='postsMeta'>
                    <p>{post.author}</p>
                    <p><span className='postCreated'>created: {post.banako}</span>
                      <span className='postModified'> modified: {post.milako}</span>
                    </p>
                    
                  </div>
                </div>
              ))
              }
              

            </div>
        </section>
        
      </main>
    );
  } else {
    return <p>Refresh the page and sign in please</p>
  }
  

}


export default DashPosts;