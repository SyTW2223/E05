import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { logout }  from "../../actions/auth.action";
import {Link, useNavigate} from 'react-router-dom';
import React from 'react';
import { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBIcon,
  MDBCollapse,
} from 'mdb-react-ui-kit';

const selectorIsLoggedIn = (state) => state.auth.isLoggedIn;
const selectorUserData = (state) => state.auth?.user?.data;

export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectorIsLoggedIn); 
  const userData = useSelector(selectorUserData);
  const [showNavSecond, setShowNavSecond] = useState(false);


  return (
    <MDBNavbar expand='lg' style={{ backgroundColor: '#92C9D5' }}>
      <MDBContainer fluid>
        <Button
          component={Link} to="/"
          color="inherit"
          sx={{
            color: 'inherit',
            backgroundColor: 'primary.main'
          }}
          > My Story App
        </Button>
        <MDBNavbarToggler
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowNavSecond(!showNavSecond)}
          >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar show={showNavSecond}>
          <MDBNavbarNav>
            { isLoggedIn && (
              <Button
              color="inherit"
              sx={{
                color: 'inherit',
                backgroundColor: 'primary.main'
              }}
              onClick={() => {dispatch(logout())}}
              >Cerrar Sesion</Button>)
            }

            { isLoggedIn && (
              <Button
                color="inherit"
                sx={{
                  color: 'inherit',
                  backgroundColor: 'primary.main'
                }}
                onClick={() => {
                  if (userData.role[0] === "ADMIN") navigate('/AdminProfile');
                  if (userData.role[0] === "USER") navigate('/UserProfile');
                }}
                >
                Mi Perfil
              </Button>
              )
            }
            { isLoggedIn === false && (
              <Button
                component={Link} to="/login"
                color="inherit"
                sx={{
                  color: 'inherit',
                  backgroundColor: 'primary.main'
                }}
              >Iniciar Sesion</Button>)
            }
            { isLoggedIn === false && (
              <Button
                component={Link} to="/register"
                color="inherit"
                sx={{
                  color: 'inherit',
                  backgroundColor: 'primary.main'
                }}
              >Registro</Button>)
            }
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}