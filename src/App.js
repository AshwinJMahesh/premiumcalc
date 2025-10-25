import {BrowserRouter as Router,Route,Routes,useNavigate} from 'react-router-dom'
import React,{useState,useEffect} from 'react';
import './App.css';
import MainFile from './Components/MainFile';
import SecretSectionImage from './Components/AdminSession';
import Calculator from './Components/testFile';
import AdminSession from './Components/dataAdd.jsx';
import ListData from './Components/listData.jsx';
import SearchComponent from './Components/SearchComponent.jsx';


// import React from 'react';
function App(){
  return (
      <>
    
    <Router>
    {" "}
    {/* <AdminSession/> */}
    {/* <Navbar/> */}
      <Routes>{" "}
      {/* <Route path='/' element='' /> */}
      <Route path='/' element={<AdminSession />} />
      <Route path='/search' element={<SearchComponent />} />
      <Route path='/list' element={<ListData />} />
        {/* <Route path='qAdd' element={<Qstnadd/>} /> */}
      </Routes>{" "}
    </Router></>
  );
}

export default App;
