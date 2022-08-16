import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {useParams, useNavigate } from 'react-router-dom';

import Markdown from 'markdown-to-jsx';

import { database, getDate } from '../../firebase_config';


import SiteHeader from "../header";
import SiteFooter from "../footer";



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
  const navigate = useNavigate();

  useEffect(()=>{
    const posts = collection(database, 'posts');
    const thisPost = query(posts, where('slug', '==', slug));

    getDocs(thisPost)
    .then((snapshot)=>{
      const postData = snapshot.docs[0].data();
      setIsPost(true);
      setPostContent({...postData, banako: getDate(postData.createdAt), milako:getDate(postData.modifiedAt)});
    })
    .catch((err)=>{setIsPost(false);});
    
  },[])

  return (
    <>
    <SiteHeader />
    <div className='wrapper'>
    {isPost? 
    (<div className='postContent'>
      <h1>{postContent.title}</h1>
          
      <div className='postsMeta'>
        <p>{postContent.author}</p>
        <p><span className='postCreated'>{postContent.banako}</span>
          <span className='postModified'>{postContent.milako}</span>
        </p>
      </div>
      <article className='postContentMain fromMarkdown'>
        <img className='postImage' alt={postContent.title} src={postContent.ftImgRef}></img>
        <Markdown>{postContent.text}</Markdown>
      </article>

    </div>
    
    ):
    (<div>
      <h2>Post Not Found</h2>
      <p>The post you are looking for does not exist. This button will take you to all the posts in our site</p>
      <br></br>
      <button onClick={()=>{navigate("/posts")}}>All Posts</button>
    </div>)}

    </div>
    <SiteFooter />
    </>
  );
}
  
export default PostSingle;