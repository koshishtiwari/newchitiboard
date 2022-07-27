import { getFirestore, collection, doc, getDocs, addDoc, deleteDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { authenticator } from '../../chiti_firebase';

import { useState } from 'react';
// toast messages
import { toast } from 'react-toastify';


// dashboard componnents
import Info from './dash_info';
import Editor from './dash_editor';
import DashPosts from './dash_posts';
import Settings from './dash_settings';
import Team from './dash_team';
import Header from './dash_header';
import SignIn from './dash_signForm';


// icons
import { MdSpaceDashboard } from "react-icons/md";
import { IoInformationCircleOutline } from 'react-icons/io5';
import { IoReaderOutline } from 'react-icons/io5';
import { IoPeopleOutline } from 'react-icons/io5';
import { IoOptionsOutline } from 'react-icons/io5';

// dashboard main
function Dashboard() {

  // user info
  const [currUser, setCurrUser] = useState();

  // sections of the dashboard as states
  const [currSection, setCurrSection] = useState("Chitiboard");

  onAuthStateChanged(authenticator, (user)=>{
    if (user){
      setCurrUser(authenticator.currentUser);
    }
    else {
      setCurrUser();
    }
  })
  // the switch function
  const switchSections = (curr)=>{
    switch (curr) {
      case "Posts":
        return <DashPosts />
        break;
      case "editor":
        return <Editor />
        break;
      case "Team":
        return <Team />
        break;
      case "Site Settings":
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
  
  if (currUser) {
    return (
      <section id="dashboardBody">
        {/* aside */}
        <aside className='dash-sidebar'>
        <div className="side-main">
        <h2>
          <span className='smScreen'><MdSpaceDashboard /></span>
          <span className='wideScreen'>dashback</span>
        </h2>
        <nav className='sidebar'>
          <div className='sidebarItem' id='dash-infoTab' onClick={()=>{setCurrentSection("Chitiboard")}}>
            <p>
              <span className='smScreen'><IoInformationCircleOutline /></span>
              <span className='wideScreen'>Information</span>
            </p>
          </div>
          
          <div className='sidebarItem' id='dash-postsTab' onClick={()=>{setCurrentSection("Posts")}}>
            <p>
              <span className='smScreen'><IoReaderOutline /></span>
              <span className='wideScreen'>Posts</span>
            </p>
          </div>

          <div className='sidebarItem' id='dash-teamTab' onClick={()=>{setCurrentSection("Team")}}>
            <p>
              <span className='smScreen'><IoPeopleOutline /></span>
              <span className='wideScreen'>Team</span>
            </p>
          </div>

          <div className='sidebarItem' id='dash-settingsTab' onClick={()=>{setCurrentSection("Site Settings")}}>
            <p>
              <span className='smScreen'><IoOptionsOutline /></span>
              <span className='wideScreen'>Settings</span>
            </p>
          </div>

        </nav>
        </div>
        <footer>
          <p>(o_o)</p>
        </footer>

      </aside>
        
        {/* headerwith nav */}
        <Header currSection = {currSection} user = {currUser}/>
        
        {/* main */}
        {switchSections(currSection)}

      </section>
    );
  } else {
    return(
      <SignIn />
    );
  }
 
    
    
  }
  
  export default Dashboard;