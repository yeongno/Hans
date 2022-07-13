import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Header';
import React from 'react';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
    </Routes>
    </BrowserRouter>
  ); 
}

export default App;
