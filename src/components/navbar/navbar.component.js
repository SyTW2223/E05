import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { logout }  from "../../actions/auth.action";
import {Link} from 'react-router-dom';

const selectorIsLoggedIn = (state) => state.auth.isLoggedIn;

export default function Navbar() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectorIsLoggedIn); 

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <Typography
            variant="h6"
            noWrap
            component={Link} to='/'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'times new roman',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            My Story App
          </Typography>
          <Typography 
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
          </Typography>

          { isLoggedIn && (
            <Button
            color="inherit"
            sx={{
              color: 'inherit',
              backgroundColor: 'primary.main'
            }}
            onClick={() => {dispatch(logout())}}
          >
            Cerrar Sesion
          </Button>)
          }

          { isLoggedIn && 
          (<Button
            component={Link} to="/profile"
            color="inherit"
            sx={{
              color: 'inherit',
              backgroundColor: 'primary.main'
            }}
          >
            Mi Perfil
          </Button>
            )
          }
          { isLoggedIn == false && (
            <Button
            component={Link} to="/login"
            color="inherit"
            sx={{
              color: 'inherit',
              backgroundColor: 'primary.main'
            }}
          >
            Iniciar Sesion
          </Button>
            )
          }
          
          {
            isLoggedIn == false && (
            <Button
            component={Link} to="/register"
            color="inherit"
            sx={{
              color: 'inherit',
              backgroundColor: 'primary.main'
            }}
          >
            Registro
          </Button>
            )
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}