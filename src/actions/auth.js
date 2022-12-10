/**
 * register/login/logout actions, acciones relacionadas con la autentificacion
 * con authservide se hacen las solicitides http asincronas, 
 * se lanza los mensajes creados en types tras llamar a authservice-login y authservice-register
 */

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
} from "./types";

import AuthService from "../services/auth.service";

// REGISTRO
export const register = (username, email, password) => (dispatch) => {
    return AuthService.register(username, email, password).then(
        (response) => {
            // lanza el siguiente mensaje
        dispatch({
            type: REGISTER_SUCCESS,
            payload: response.data
        });
        return Promise.resolve();
        },
        (error) => {
            dispatch({
                type: REGISTER_FAIL,
                payload: error.data
        });
        return Promise.reject();
        }
    );
};

// INICIO DE SESION
export const login = (username, password)=> (dispatch) => {
    return AuthService.login(username, password).then(
      (response) => {
        const passwd = response.data.password
        if (password === passwd) {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data
          })
        } else {
          dispatch({
            type: LOGIN_FAIL,
            payload: "Contraseña incorrecta"
          })
        }    
        return Promise.resolve();
      },
      (error) => {
        dispatch({
          type: LOGIN_FAIL,
          payload: error.data
        });
        return Promise.reject();
      }
    )
}

// CERRAR SESION
export const logout = () => (dispatch) => {
    AuthService.logout();

    dispatch({
        type: LOGOUT,
    });
};

