import React from 'react';
import './App.css';
import Signup from './Components/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {LoginPage} from "./Components/LoginPage"
import AfterLogin from './Components/AfterLogin';
function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/afterLogin' element={<AfterLogin/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
