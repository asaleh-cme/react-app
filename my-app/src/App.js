import logo from './logo.svg';
import React, { StrictMode } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import Routing from './Components/Common/Routing.jsx';
import { propTypes } from 'react-bootstrap/esm/Image';


function App(props) {
  return (
    <Routing />
  );
}


export default App
