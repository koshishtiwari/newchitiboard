import { useState } from 'react';


// dashboard componnents
import Info from './dash_info';
import Editor from './dash_editor';
import DashPosts from './dash_posts';
import Settings from './dash_settings';
import About from './dash_about';
import Header from './dash_header';
import SignIn from './dash_signForm';

// icons
import { MdSpaceDashboard } from "react-icons/md";
import { IoInformationCircleOutline } from 'react-icons/io5';
import { IoReaderOutline } from 'react-icons/io5';
import { IoAt } from 'react-icons/io5';
import { IoOptionsOutline } from 'react-icons/io5';


// dashboard main
function Dashboard() {
  // user info
  const [currUser, setCurrUser] = useState();

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
      case "About":
        return <About user = {currUser} />
        break;
      case "Site Settings":
        return <Settings user = {currUser}/>
        break;
      default:
      return <Info  currUser = {setCurrUser} user = {currUser} />
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
          <span className='wideScreen'>dashbuda</span>
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

          <div className='sidebarItem' id='dash-aboutTab' onClick={()=>{setCurrSection("About")}}>
            <p>
              <span className='smScreen'><IoAt /></span>
              <span className='wideScreen'>About</span>
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
        <footer id='dashFooter'>
          <p>\(o_o)/ \(-_-)/ \('O')/</p>
        </footer>

      </aside>
        
        {/* headerwith nav */}
        <Header currSection={currSection} user={currUser} currUser={setCurrUser} editor={editor} setEditor={setEditor}/>
        
        {/* main */}
        {(editor) ? 
          (<Editor user= {currUser} setEditor = {setEditor} features={editor}/>):
          (switchSections(currSection))
        }
        

      </section>
    );
  } else {
    return <SignIn currUser = {setCurrUser}/>
  }
 
    
    
  }
  
  export default Dashboard;