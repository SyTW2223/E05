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
    SET_MESSAGE,
} from "./types";

import AuthService from "../services/auth.service";

// REGISTRO
export const register = (username, email, password) => (dispatch) => {
    return AuthService.register(username, email, password).then(
        (response) => {
            // lanza el siguiente mensaje
        dispatch({
            type: REGISTER_SUCCESS,
        });

        dispatch({
            type: SET_MESSAGE,
            payload: response.data.message,
        });

        return Promise.resolve();
        },
        (error) => {
        const message =
            (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();

        dispatch({
            type: REGISTER_FAIL,
        });

        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });

        return Promise.reject();
        }
    );
};

// INICIO DE SESION
export const login = (username, password) => (dispatch) => {
return AuthService.login(username, password).then(
    (data) => {
    dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
    });

    return Promise.resolve();
    },
    (error) => {
    const message =
        (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString();

    dispatch({
        type: LOGIN_FAIL,
    });

    dispatch({
        type: SET_MESSAGE,
        payload: message,
    });

    return Promise.reject();
    }
);
};

// CERRAR SESION
export const logout = () => (dispatch) => {
AuthService.logout();

dispatch({
    type: LOGOUT,
});
};

