import React from 'react';
import './App.css';
import Signup from './Components/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login'
function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path='/login' element={<Login/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
