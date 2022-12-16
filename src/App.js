//import React, { Component, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material'

// -------- COMPONENTS ----------- //
import { Login } from './components/login/login.component';
import { Register } from './components/register/register.component';
import BookGetOne from "./components/book/book-getOne.component";
// ------------------------------- //


// cambias a app.css
const formato = createTheme({
  palette: {
    primary: {
      main: '#92C9D5',
      light: '#BDBDBD',
      dark: '#828282',
      button: '#301B52',
      buttonReg: '#F9A66C',
      fill: '#D9D9D9'
    },
    background: {
      default: '#F6F6F6'
    }
  }
})


function App() {
  return(
    <ThemeProvider theme={formato}>
      <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element = {<Login />}/>
            <Route path="/login" element = {<Login />}/>
            <Route path="/register" element = {<Register />}/>
            <Route path="/book/:title" element = {<BookGetOne />}/>
          </Routes>
        </Router>
    </ThemeProvider>
  )
}


export default App;