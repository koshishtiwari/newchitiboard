import { database } from '../../chiti_firebase';
import { collection, doc, addDoc, getDoc, getDocs, updateDoc, query, orderBy } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import Loader  from './../loader';

import Cards from './dash_about-cards';


// dashboard main
function About() {

  const [teamMembers, setTeamMembers] = useState([]);
  const [projectAbout, setProjectAbout] = useState('');
  
  const [isLoadedProj, setIsLoadedProj] = useState(false);
  const [isLoadedTeam, setIsLoadedTeam] = useState(false);

    // team members tanne
    const teamCollection = collection(database, 'team');
    const queryTeam = query(teamCollection, orderBy('name'));

    const fetchAboutProject = ()=>{
      const projectDoc = doc(database, 'site-vitals', 'about-project');
      setIsLoadedProj(false);

      getDoc(projectDoc)
        .then((projectDesc)=>{
            setProjectAbout(projectDesc.data().content);
            setIsLoadedProj(true);
        })
        .catch((err)=>{
            toast(err.message);
        })
    }

    const fetchTeam = ()=>{
      setIsLoadedTeam(false);
      getDocs(queryTeam)
      .then((docSnapshot)=>{
        let teamArray = [];
  
        docSnapshot.docs.forEach((document)=>{
          teamArray.push({...document.data(), id: document.id});
        });
  
        setTeamMembers(teamArray);
        setIsLoadedTeam(true);
      })
      .catch(err=>{
        toast(err.message);
      });
    }
  
    useEffect(()=>{
      fetchTeam();
      fetchAboutProject();
      
    },[])


    const addTeamMember = (e) =>{
      e.preventDefault();
      setIsLoadedTeam(false);

      addDoc(teamCollection, {
        name:'', 
        nickname:'',
        pic:'',
        primaryLink: '',
        secondaryLink: '',
        title: '',
        desc: ''
      })
      .then(()=>{
        setIsLoadedTeam(true);
        fetchTeam();
      })
      .catch((err) =>{
        toast(err.message);
      })
    }

    const updateProjAbout = (e)=>{
      e.preventDefault();
      setIsLoadedProj(false);
      
      const projectDoc = doc(database, 'site-vitals', 'about-project');
  
      updateDoc(projectDoc, {
        content: projectAbout
      })
      .then(()=>{
          setIsLoadedProj(true);
      })
      .catch(err=>toast(err.message));

    }

  return (
    <main className='dash-main' id='dash-about'>
        
      <section className='aboutProject'>
        <h4>Project Details</h4>
        {isLoadedProj? 
        (<form id='projectForm' onSubmit={(e)=>e.preventDefault()}>
          <div className='formElement'>
            <label htmlFor='aboutProject' >Something about the Project</label>
            <textarea id='aboutProject' rows={10} value={projectAbout} onChange={(e)=>setProjectAbout(e.target.value)}></textarea>
          </div>
          <button onClick={updateProjAbout}>Update</button>
        </form>):
        (<p>Loading Project Description...</p>)}
      </section>
      
        
        
        <section className='aboutTeam'>
          <h3>Project Members</h3>
          <button className='btnAccent' title='Add a new member of the project' onClick={addTeamMember}>Add New</button>
          <div className='teamCards'>
          {!isLoadedTeam ?
              
              (<Loader message/>) :

              (teamMembers.map((member)=>
              <Cards key={member.id} memberId={member.id}  refreshTeam={fetchTeam}/>
              ))
              }
            
          </div>
        </section>
            
    </main>
  );

}
  
export default About;