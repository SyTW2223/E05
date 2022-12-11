//import React, { Component, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// -------- COMPONENTS ----------- //
import BookGet from "./components/book/book-get.component";
//import { Login } from './components/login';
//import { Register } from './components/register';
// ------------------------------- //

function App() {
  return(
      <Router>
          <Routes>
            <Route path="/book/:title" element = {<BookGet />}/>
          </Routes>
      </Router>
  )
}


export default App;