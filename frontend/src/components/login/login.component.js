
import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { Box, Typography, TextField, Button } from "@mui/material";
import { Link } from 'react-router-dom';
import { login } from '../../actions/auth.action';



export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

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
            marginTop={5}
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
                    dispatch(login(username, password), ).then((data) => {
                        console.log('Sesion iniciada');
                        console.log(data);
                    }).catch(() => {
                        console.log('Error. La cuenta no existe, debe crearse una cuenta.');
                    });
                }}
            >
                Iniciar Sesion
            </Button>
            <Typography marginTop={1}>
                ??No tienes cuenta?
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
                ??Reg??strate ahora!
            </Button>
            </Box>
        </form>
        </div>
    )
}