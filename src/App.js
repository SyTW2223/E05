import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material'


// -------- COMPONENTS ----------- //
import { Login } from './components/login/login.component';
import { Register } from './components/register/register.component';
import Home from './components/home/home.component';
import Navbar from './components/navbar/navbar.component';
import BookGet from "./components/book/book-get.component";
import Footer from './components/footer/footer.component'
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
          <Navbar/>
          <Routes>
            <Route path="/" element = {<Home />}/>
            <Route path="/home" element = {<Home />}/>
            <Route path="/login" element = {<Login />}/>
            <Route path="/register" element = {<Register />}/>
            <Route path="/book/" element = {<BookGet />}/>
          </Routes>
          <Footer/>
        </Router>
    </ThemeProvider>
  )
}

export default App;