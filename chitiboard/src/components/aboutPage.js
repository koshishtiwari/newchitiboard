import { collection, doc, getDocs, getDoc, query, orderBy } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Markdown from 'markdown-to-jsx';

import { database } from '../firebase_config';
import { toast } from 'react-toastify';

import Site_Header from "./header";
import Site_Footer from "./footer";
import Loader from './loader';
import {IoLinkOutline} from 'react-icons/io5';
import {IoGlobeOutline} from 'react-icons/io5'; 


// the about us page component
function About() {

  const [projDetails, setProjDetails] = useState('');
  const [teams, setTeams] = useState([]);

  const teamsCollection = collection(database, 'team');
  const queryTeam = query(teamsCollection, orderBy('name'));

  useEffect(()=>{
    getDoc(doc(database, 'site-vitals', 'about-project'))
      .then((snapshot)=>{
        setProjDetails(snapshot.data().content);
      })
      .catch(err=>toast(err.message));


      getDocs(queryTeam)
      .then((snapshot)=>{
      let teamArray = [];

      snapshot.docs.forEach((member)=>{
        teamArray.push({...member.data(), id:member.id});
      });

      setTeams(teamArray);
    })
    .catch(err=>{
      console.log(err.message);
    });

  },[])


  return (
  <>
  <Site_Header />
  
  <div className="wrapper">
  <section id="aboutSection">
    <div id="aboutProject" className='fromMarkdown'>
        <Markdown>{projDetails}</Markdown>
    </div>

    <section id="aboutTeam">
      <h2>Meet our Team</h2>
      <div className="teamCards">
        {teams && teams.map((member) => 

        <div className='cards cardsShow' key={member.id}>
          <img src={member.pic}></img>
          <h3>{member.name}</h3>
          <p><em>{member.nickname}</em></p>
          <p>{member.title}</p>
          <div className='memberLinks'>
            <a href={member.primaryLink} target={'_blank'}><IoLinkOutline /></a>
            <a href={member.primaryLink} target={'_blank'}><IoGlobeOutline /></a>
          </div>
          <div className='memberDesc fromMarkdown'>
          <Markdown>{member.desc}</Markdown>
          </div>
          
        
        </div>
        )}
        
      </div>
    </section>

    
  </section>
  </div>
  

  <Site_Footer />
  </>
  );
}
  
export default About;