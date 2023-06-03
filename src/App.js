import React from 'react';
import './App.css';
import Signup from './Components//Pages/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {LoginPage} from "./Components//Pages/LoginPage"
import AfterLogin from './Components//Pages/AfterLogin';
import SentBox from './Components/Pages/SentBox';
import MessageDetails from './Components/Pages/MessageDetails';
function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/afterLogin' element={<AfterLogin/>}/>
          <Route path='/sentbox' element={<SentBox/>}/>
          <Route path='/messages/:messageId' element={<MessageDetails/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
