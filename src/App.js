/**
 * raiz del proyecto.
 * 
 */
 import React from 'react';
 // import { useDispatch, useSelector } from 'react-redux';
 import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
 import { createTheme, ThemeProvider, CssBaseline } from '@mui/material'
 
 import Navbar from './components/Navbar';
 import { Login } from './components/Login';
 import { Register } from './components/Register';
 
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
           <Navbar />
             <Routes>
               <Route path="/" element = {<Login />}/>
               <Route path="/login" element = {<Login />}/>
               <Route path="/register" element = {<Register />}/>
             </Routes>
         </Router>
       </ThemeProvider>
     )
 }
 
 export default App;