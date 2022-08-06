import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {useParams } from 'react-router-dom';

import Markdown from 'markdown-to-jsx';

import { database, getDate } from '../../firebase_config';
import { toast } from 'react-toastify';

import Site_Header from "../header";
import Site_Footer from "../footer";



function PostSingle() {
  const [postContent, setPostContent] = useState({
    title: '',
    text : '',
    brief: '',
    ftImgRef : '',
    slug : '',
    author : '',
    createdAt : '',
    modifiedAt : ''
  });

  const [isPost, setIsPost] = useState(true);
  const {slug} = useParams();

  useEffect(()=>{
    const posts = collection(database, 'posts');
    const thisPost = query(posts, where('slug', '==', slug));

    getDocs(thisPost)
    .then((snapshot)=>{
      const postData = snapshot.docs[0].data();
      setIsPost(true);
      setPostContent({...postData, banako: getDate(postData.createdAt), milako:getDate(postData.modifiedAt)});
      console.log(postContent);
    })
    .catch((err)=>{setIsPost(false);});
    
  },[])

  return (
    <>
    <Site_Header />
    <div className='wrapper'>
    {isPost? 
    (<div className='postContent'>
      <h3>{postContent.title}</h3>
          
      <div className='postsMeta'>
        <p>{postContent.author}</p>
        <p><span className='postCreated'>{postContent.banako}</span>
          <span className='postModified'>{postContent.milako}</span>
        </p>
      </div>
      <article className='postContentMain'>
        <img className='postImage' alt={postContent.title} src={postContent.ftImgRef}></img>
        <Markdown>{postContent.text}</Markdown>
      </article>

    </div>
    
    ):
    (<div>
      <p>The post you are looking for does not exist. This button will take you to all the posts in our site</p>
      <button> <a href='/posts'>All Posts</a></button>
    </div>)}

    </div>
    <Site_Footer />
    </>
  );
}
  
export default PostSingle;