import { Route, Routes } from "react-router-dom";
//import { useState } from 'react';
import Landing from './components/LandingPage/LandingPage';
import Home from "./components/Home/Home.jsx";
import Details from "./components/Details/Details";
import CreateActivity from './components/Create Activity/Create-Activity';
//import reactLogo from './assets/react.svg';
//import viteLogo from './vite.svg';

//import './App.css';


function App() {
 

  return (
    <>
      
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/countries" element={<Home />} />
        <Route path="/countries/:id" element={<Details/>} />
        <Route path="/activity" element={<CreateActivity/>}/>
        
        

      </Routes>
     

         
        </>
    
    
  )
}

export default App;


