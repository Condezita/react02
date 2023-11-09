
//import logo from './logo.svg';
//import './App.css';

import { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes, } from 'react-router-dom';
import Dashboard from './public/Dashboard';
import Home from './public/Home';
//import PublicRutas from './ruteo/PublicRutas';
import {useAuth } from './ruteo/AuthContext';
//import ProtectedRutas from './ruteo/ProtectedRutas';
import BarraRutasProtected from './ruteo/BarraRutasProtected';
import BarraRutasPublic from './ruteo/BarraRutasPublic';

function App() { 
  const {user} = useAuth();

  return (
    <div style={{background:"plum"}}>

      <Router>

        { user ? <BarraRutasProtected/> : <BarraRutasPublic /> }
          
        </Router>


    </div>
  );
}

export default App;
  























 