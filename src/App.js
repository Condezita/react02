import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useAuth} from "./ruteo/AuthContext";
import BarraRutasProtected from './ruteo/BarraRutasProtected';
import BarraRutasPublic from './ruteo/BarraRutasPublic';


const App = () => {
  const { user } = useAuth();
  return (
    <div>
      
      <h1>Examen App.js</h1>
      <p>14/11/2023 - COMPUTACION E INFORMATICA NOCHE VI --- Cabrera Camargo, Nicole Sara</p>
      <Router>
      { user ? <BarraRutasProtected /> : <BarraRutasPublic />}
      </Router>
    </div>
  )
}

export default App
