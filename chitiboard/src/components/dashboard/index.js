import { useState } from 'react';


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
  // {displayName:"lokhais", email:"oewiweu@nao.com", metadata:{lastSignInTime:"643q"}}
  const [currUser, setCurrUser] = useState({displayName:"lokhais", email:"yodekhi@ty.oma", metadata:{lastSignInTime:"643q"}});

  // sections of the dashboard as states
  const [currSection, setCurrSection] = useState("Chitboard");

  // the editor window
  const [editor, setEditor] = useState();

  
  // the switch function
  const switchSections = (curr)=>{
    switch (curr) {
      case "Posts":
        return <DashPosts user = {currUser} setEditor = {setEditor}/>
        break;
      case "Team":
        return <Team user = {currUser} />
        break;
      case "Site Settings":
        return <Settings user = {currUser}/>
        break;
      default:
      return <Info user = {currUser} />
      break;
    }
  };

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
          <div className='sidebarItem' id='dash-infoTab' onClick={()=>{setCurrSection("Chitiboard")}}>
            <p>
              <span className='smScreen'><IoInformationCircleOutline /></span>
              <span className='wideScreen'>Info</span>
            </p>
          </div>
          
          <div className='sidebarItem' id='dash-postsTab' onClick={()=>{setCurrSection("Posts")}}>
            <p>
              <span className='smScreen'><IoReaderOutline /></span>
              <span className='wideScreen'>Posts</span>
            </p>
          </div>

          <div className='sidebarItem' id='dash-teamTab' onClick={()=>{setCurrSection("Team")}}>
            <p>
              <span className='smScreen'><IoPeopleOutline /></span>
              <span className='wideScreen'>Team</span>
            </p>
          </div>

          <div className='sidebarItem' id='dash-settingsTab' onClick={()=>{setCurrSection("Site Settings")}}>
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
        <Header currSection={currSection} user={currUser} currUser={setCurrUser} editor={editor} setEditor={setEditor}/>
        
        {/* main */}
        {(editor) ? 
          (<Editor user= {currUser} currSection = {setCurrSection} features={editor}/>):
          (switchSections(currSection))
        }
        

      </section>
    );
  } else {
    return <SignIn currUser = {setCurrUser}/>
  }
 
    
    
  }
  
  export default Dashboard;