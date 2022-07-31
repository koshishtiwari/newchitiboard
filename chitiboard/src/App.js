// Main entry for the app
// imports
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { FIREBASE_APP, database, authenticator } from './chiti_firebase';

// pages imports
import Home from './components/home';
import About from './components/aboutPage'
import Contact from './components/contactPage';
import Posts from './components/posts';
// dashboard
import Dashboard from './components/dashboard';

function App() {
  return (
    <Router>
      
   {/* other elements if needed */}
    <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/posts' element={<Posts/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
    </Routes>

    {/* display toasts globally on the site */}
    <ToastContainer
      position="bottom-center"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      />

    </Router>
  );
}

export default App;
