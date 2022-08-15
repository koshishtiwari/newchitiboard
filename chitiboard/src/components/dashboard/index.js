import { useState } from 'react';


// dashboard componnents
import Info from './dash_info';
import Editor from './dash_editor';
import DashPosts from './dash_posts';
import Settings from './dash_settings';
import About from './dash_about';
import Header from './dash_header';
import SignIn from './dash_signForm';
import DashResponses from './dash_responses';


// icons
import { MdSpaceDashboard } from "react-icons/md";
import { IoInformationCircleOutline } from 'react-icons/io5';
import { IoReaderOutline } from 'react-icons/io5';
import { IoAt } from 'react-icons/io5';
import { IoOptionsOutline } from 'react-icons/io5';
import { IoChatboxEllipsesOutline} from 'react-icons/io5';


// dashboard main
function Dashboard() {
  // user info
  const [currUser, setCurrUser] = useState();

  // sections of the dashboard as states
  const [currSection, setCurrSection] = useState("Info");

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
      case "Responses" :
        return <DashResponses user={currUser} />
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
          <div className='sidebarItem' id='dash-infoTab' onClick={()=>{setCurrSection("Info")}} {...currSection == "Info" && {style : {background: 'var(--primaryColor)', filter:' brightness(0.8)'}}}>
            <p>
              <span className='smScreen'><IoInformationCircleOutline /></span>
              <span className='wideScreen'>Info</span>
            </p>
          </div>
          
          <div className='sidebarItem' id='dash-postsTab' onClick={()=>{setCurrSection("Posts")}} {...currSection == "Posts" && {style : {background: 'var(--primaryColor)', filter:' brightness(0.8)'}}}>
            <p>
              <span className='smScreen'><IoReaderOutline /></span>
              <span className='wideScreen'>Posts</span>
            </p>
          </div>

          <div className='sidebarItem' id='dash-aboutTab' onClick={()=>{setCurrSection("About")}} {...currSection == "About" && {style : {background: 'var(--primaryColor)', filter:' brightness(0.8)'}}}>
            <p>
              <span className='smScreen'><IoAt /></span>
              <span className='wideScreen'>About</span>
            </p>
          </div>

          <div className='sidebarItem' id='dash-settingsTab' onClick={()=>{setCurrSection("Site Settings")}} {...currSection == "Site Settings" && {style : {background: 'var(--primaryColor)', filter:' brightness(0.8)'}}}>
            <p>
              <span className='smScreen'><IoOptionsOutline /></span>
              <span className='wideScreen'>Settings</span>
            </p>
          </div>

          <div className='sidebarItem' id='dash-settingsTab' onClick={()=>{setCurrSection("Responses")}} {...currSection == "Responses" && {style : {background: 'var(--primaryColor)', filter:' brightness(0.8)'}}}>
            <p>
              <span className='smScreen'><IoChatboxEllipsesOutline /></span>
              <span className='wideScreen'>Responses</span>
            </p>
          </div>

        </nav>
        </div>
        <footer id='dashFooter'>
          <p>v-0.9.0 (2022)</p>
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