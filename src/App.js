//import React, { Component, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// -------- COMPONENTS ----------- //
import { Login } from './components/login/login.component';
import { Register } from './components/register/register.component';

import BookGetOne from "./components/book/book-getOne.component";
// ------------------------------- //

function App() {
  return(
      <Router>
          <Routes>
              <Route path="/" element = {<Login />}/>
              <Route path="/login" element = {<Login />}/>
              <Route path="/register" element = {<Register />}/>
            <Route path="/book/:title" element = {<BookGetOne />}/>
          </Routes>
      </Router>
  )
}


export default App;