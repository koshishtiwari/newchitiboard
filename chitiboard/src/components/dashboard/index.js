import { getFirestore, collection, doc, getDocs, addDoc, deleteDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { FIREBASE_APP, database, authenticator } from '../../chiti_firebase';

import { useState } from 'react';


// dashboard componnents
import Info from './dash_info';
import Editor from './dash_editor';
import DashPosts from './dash_posts';
import Settings from './dash_settings';
import Team from './dash_team';
import Aside from './dash_aside';
import Header from './dash_header';

// dashboard main
function Dashboard() {
  const [currSection, setCurrSection] = useState("info") // the states are 'info', 'posts', 'settings', 'team', 'editor'
  // the switch function
  const switchSections = (curr)=>{
    switch (curr) {
      case "posts":
        return <DashPosts />
        break;
      case "editor":
        return <Editor />
        break;
      case "team":
        return <Team />
        break;
      case "settings":
        return <Settings />
        break;
      default:
      return <Info />
      break;
    }
  };

  const setCurrentSection = (sectionName) =>{
    setCurrSection(sectionName);
  }
  
  return (
      <section id="dashboardBody">
        {/* headerwith nav */}
        <Header />

        {/* aside */}
        <Aside />
        
        {/* main */}
        {switchSections(currSection)}

        {/* footer */}
      </section>
    );
    
    
  }
  
  export default Dashboard;