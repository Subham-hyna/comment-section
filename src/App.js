import React from 'react'
import './App.css'
import { Route , Routes } from "react-router-dom";
import Home from './components/Home';

const App = () => {
  return (
      <Routes>
        <Route exact path='/' element={<Home/>} ></Route>
      </Routes>
  )
}

export default App