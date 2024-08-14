import "./App.css";
import Insert from './components/Insert';
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import React from "react";
import {BrowserRouter, Routes ,Route} from 'react-router-dom';
import ProjectList from "./components/ProjectList";
function App() {
 
 
 
  return (
    <>
      
       <div className="App">
        <BrowserRouter>
        <Routes>  
        <Route path="/" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/projectlist" element={<ProjectList/>}/>
          <Route path="/create" element={<Insert/>}/>
       </Routes>
      </BrowserRouter>
    </div> 
    </>
  );
}

export default App;
