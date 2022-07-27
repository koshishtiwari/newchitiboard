import { database } from '../../chiti_firebase';
import { collection, doc, getDocs, addDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { useEffect, useState } from 'react';
// toast messages
import { toast } from 'react-toastify';

// dashboard main
function DashPosts({user, currSection}) {
  // hold the posts data
  const [postsArray, setpostsArray] = useState([]);

  // post tanne
  const postsCollection = collection(database, 'posts');
  const queryPosts = query(postsCollection, orderBy('title'));

  
  const fetchAllPosts = ()=>{
    getDocs(queryPosts)
    .then((docSnapshot)=>{
      let postsAray = [];

      docSnapshot.docs.forEach((document)=>{
        postsAray.push({...document.data(), id: document.id});
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
              
              (<div id='dataLoading'>
                  <svg version="1.1" id="L5" xmlns="http://www.w3.org/2000/svg" width={"100px"}>
                    <circle fill="#89b3c2" stroke="none" cx="6" cy="50" r="6">
                      <animateTransform 
                        attributeName="transform" 
                        dur="1s" 
                        type="translate" 
                        values="0 15 ; 0 -15; 0 15" 
                        repeatCount="indefinite" 
                        begin="0.1"/>
                    </circle>
                    <circle fill="#89b3c2" stroke="none" cx="30" cy="50" r="6">
                      <animateTransform 
                        attributeName="transform" 
                        dur="1s" 
                        type="translate" 
                        values="0 10 ; 0 -10; 0 10" 
                        repeatCount="indefinite" 
                        begin="0.2"/>
                    </circle>
                    <circle fill="#89b3c2" stroke="none" cx="54" cy="50" r="6">
                      <animateTransform 
                        attributeName="transform" 
                        dur="1s" 
                        type="translate" 
                        values="0 5 ; 0 -5; 0 5" 
                        repeatCount="indefinite" 
                        begin="0.3"/>
                    </circle>
                  </svg>
                </div>) :

              (postsArray.map((post)=>
                <div key={post.id} className="data-document">
                  <h3>{post.title}</h3>
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