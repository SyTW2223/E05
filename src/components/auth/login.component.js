
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Typography, TextField, Button } from "@mui/material";
import { login } from '../../actions/auth.action';


const selectorIsLoggedIn = (state) => state.auth.isLoggedIn;
const selectorIsAdminLoggedIn = (state) => state.auth.isLoggedIn;


export const Login = () => {
    const isLoggedIn = useSelector(selectorIsLoggedIn);
    const isAdminLoggedIn = useSelector(selectorIsAdminLoggedIn);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    return (
        <div className="login">
        <form className="loginForm">
            <Box
            display="flex"
            color="primary"
            flexDirection={"column"}
            maxWidth={400}
            alignItems="center"
            justifyContent={"center"}
            margin="auto"
            marginTop={15}
            padding={3}
            borderRadius={5}
            sx={{backgroundColor: 'primary.fill'}}
            >
            <Typography variant="h4" padding={3}>
                Inicio de sesion
            </Typography>
            <TextField
                label="Username"
                type={'text'}
                value={username}
                variant="outlined"
                margin="dense"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                label="Password"
                type={'password'}
                value={password}
                variant="outlined"
                margin="dense"
                placeholder="***********" 
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button 
                sx={{
                marginTop: 2,
                borderRadius: 3,
                color: 'primary.light',
                backgroundColor: 'primary.button'
                }}
                variant="contained"
                color="inherit"
                onClick={() => {
                    dispatch(login(username, password)).then((data) => { 
                        if (data.role[0] === "ADMIN") navigate('/AdminProfile');
                        if (data.role[0] === "USER") navigate('/UserProfile');
                    }).catch(err => {
                        console.log('Error. La cuenta no existe, debe crearse una cuenta.', err);
                    });
                }}
            >
                Iniciar Sesion
            </Button>
            <Typography marginTop={1}>
                ¿No tienes cuenta?
            </Typography>
            <Button
                component={Link} to='/register'
                sx={{
                marginTop: 1,
                borderRadius: 3,
                backgroundColor: 'primary.buttonReg'
                }}
                variant="contained"
                color="inherit"
            >
                ¡Regístrate ahora!
            </Button>
            </Box>
        </form>
        {isLoggedIn === true && 
            <span>You're logged in USER</span>
        }
        {isAdminLoggedIn === true && 
            <span>You're logged in ADMIN</span>
        }
        </div>
        
    )
}