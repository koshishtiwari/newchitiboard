import { MdSpaceDashboard } from "react-icons/md";
import { IoInformationCircleOutline } from 'react-icons/io5';
import { IoReaderOutline } from 'react-icons/io5';
import { IoPeopleOutline } from 'react-icons/io5';
import { IoOptionsOutline } from 'react-icons/io5';

function Aside() {

    return (
        <aside className='dash-sidebar'>
        <h2>
          <span className='smScreen'><MdSpaceDashboard /></span>
          <span className='wideScreen'>dashback</span>
        </h2>
        <nav className='sidebar'>
          <div className='sidebarItem' id='dash-infoTab'>
            <p>
              <span className='smScreen'><IoInformationCircleOutline /></span>
              <span className='wideScreen'>Information</span>
            </p>
          </div>
          
          <div className='sidebarItem' id='dash-postsTab'>
            <p>
              <span className='smScreen'><IoReaderOutline /></span>
              <span className='wideScreen'>Posts</span>
            </p>
          </div>

          <div className='sidebarItem' id='dash-teamTab'>
            <p>
              <span className='smScreen'><IoPeopleOutline /></span>
              <span className='wideScreen'>Team</span>
            </p>
          </div>

          <div className='sidebarItem' id='dash-settingsTab'>
            <p>
              <span className='smScreen'><IoOptionsOutline /></span>
              <span className='wideScreen'>Settings</span>
            </p>
          </div>

        </nav>

      </aside>
    );

  }
  
  export default Aside;