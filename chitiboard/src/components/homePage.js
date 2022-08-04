import { doc, getDoc } from 'firebase/firestore';

import { database } from '../firebase_config';

import { useEffect, useState } from 'react';


// site components
import Site_Footer from "./footer";
import Site_Header from './header';

function Home() {
  return (
    <>
    <Site_Header />
    
    <section id="homeBody">
      <h1>this is Home</h1>
    </section>

    <Site_Footer />
    </>
    
  );
}
  
export default Home;