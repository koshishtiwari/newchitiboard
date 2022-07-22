// Main entry for the app
// imports
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

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
        <Route path='/about-us' element={<About/>} />
        <Route path='/contact-us' element={<Contact/>} />
        <Route path='/posts' element={<Posts/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
    </Routes>

    </Router>
  );
}

export default App;
