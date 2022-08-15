// imports
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

// pages imports
import Home from './components/homePage';
import About from './components/aboutPage'
import Posts from './components/posts';
import NoPage from './components/404';
import PostSingle from './components/posts/postSingle';

// dashboard
import Dashboard from './components/dashboard';

import './overrides.css'

function App() {
  return (
    <Router>
      
   {/* other elements if needed */}
    <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/about' element={<About/>} />
        <Route path='/posts' element={<Posts/>} />
        <Route path='/posts/:slug' element={< PostSingle/>}/>
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='*' element = {<NoPage/>} />
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
