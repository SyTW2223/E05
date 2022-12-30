import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material'


// -------- COMPONENTS ----------- //
import component from './components';
import { AuthVerify } from "./services/auth-verify";
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
        <component.Navbar/>
          <Routes>
            <Route path="/" element = {<component.Home />}/>
            <Route path="/home" element = {<component.Home />}/>
            <Route path="/login" element = {<component.Login />}/>
            <Route path="/register" element = {<component.Register />}/>
            <Route path="/userProfile" element = {<component.UserProfile />}/>
            <Route path="/adminProfile" element = {<component.AdminProfile />}/>
          </Routes>
          <AuthVerify/>
          <component.Footer/>
        </Router>
    </ThemeProvider>
  )
}

export default App;