/**
 * authentication service. Contiene las peticiones http que se haran al servidor
 */

import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
    // se inicia sesion con nombre usuario y contraseña
    login(username, password) {
        return axios
        .post(API_URL + "signin", { username, password })
        .then((response) => {
            if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
            }
    
            return response.data;
        });
    }
    // elimina el usuario
    logout() {
        localStorage.removeItem("user");
    }
    // crea el usuario 
    register(username, email, password) {
        return axios.post(API_URL + "signup", {
        username,
        email,
        password,
        });
    }
}
    
    export default new AuthService();