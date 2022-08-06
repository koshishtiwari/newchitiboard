import { useNavigate } from 'react-router-dom';

import Site_Header from "./header";
import Site_Footer from "./footer";

function NoPage() {

const navigate = useNavigate();

  return (
    <>
    <Site_Header/>
    <div className='wrapper'>
    <h2>Page Not Found</h2>
    <p>Looks like you stumbled upon page that don't exist yet !</p>
    <p>The button below will take you back home or use the navigation above to go to specific pages.</p>

    <button onClick={()=>{navigate("/")}}>Go Home !</button>

    </div>
    
    <Site_Footer />
    </>
    
    
  );
}
    
export default NoPage;