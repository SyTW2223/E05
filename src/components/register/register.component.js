import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { Box, Typography, TextField, Button } from "@mui/material";

import { register } from '../../actions/auth.action';

export const Register = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    return (
        <div className="register">
        <form className="registerForm">
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
                Registro
            </Typography>
            <TextField 
                label="Fullname"
                type={'text'}
                value={name}
                variant="outlined"
                margin="dense"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
            />
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
                label="Email"
                type={'email'}
                value={email}
                variant="outlined"
                margin="dense"
                placeholder="email@ejemplo.com" 
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                label="Password"
                type={'password'}
                value={password}
                variant="outlined"
                margin="dense"
                placeholder="*************" 
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                variant="contained"
                color="inherit"
                sx={{
                marginTop: 2,
                borderRadius: 3,
                backgroundColor: 'primary.buttonReg'
                }}
                onClick={() => {
                    dispatch(register(name, username, email, password)).then(data => {
                        console.log(data);
                        }).catch(() => {
                            console.log('Error, no se ha podido registrar el usuario.');
                        });
                    }}
            >
                Registrarse
            </Button>
            </Box>
        </form>
        </div>
    )
}