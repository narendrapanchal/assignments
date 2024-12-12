import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "../pages/home"
import About from "../pages/About"
function Allroutes() {
  return (
    <BrowserRouter>
    <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/about" element={<About/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default Allroutes
