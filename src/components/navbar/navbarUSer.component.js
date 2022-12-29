import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { logout }  from "../../actions/auth.action";
import {Link} from 'react-router-dom';


export default function NavbarUser() {
  const dispatch = useDispatch();

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
          <Button
            color="inherit"
            sx={{
              color: 'inherit',
              backgroundColor: 'primary.main'
            }}
            onClick={() => {dispatch(logout())}}
          >
            Cerrar Sesion
          </Button>
          <Button
            component={Link} to="/profile"
            color="inherit"
            sx={{
              color: 'inherit',
              backgroundColor: 'primary.main'
            }}
          >
            Mi Perfil
          </Button>
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
        </Toolbar>
      </AppBar>
    </Box>
  );
}