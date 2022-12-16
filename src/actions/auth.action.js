/**
 * register/login/logout actions, acciones relacionadas con la autentificacion
 * con authservide se hacen las solicitides http asincronas, 
 * se lanza los mensajes creados en types tras llamar a authservice-login y authservice-register
 */

import {
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
} from "./types";

import Authentication from "../services/auth.service";

// INICIO DE SESION
export const login = (username, password) => async (dispatch) => {
    try {
        const res = await Authentication.login(username, password);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });
    
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

// REGISTRO
export const register = (username, email, password) => async (dispatch) => {
    try {
        const res = Authentication.register(username, email, password);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
        });
    
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};
