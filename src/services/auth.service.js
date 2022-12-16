/**
 * authentication service. Contiene las peticiones http que se haran al servidor
 */

import http from "../http-common";

class Authentication {

    register(username, email, pass) {
        let data = {
            "username": username,
            "email": email,
            "password": pass
        }
        http.post("/user/", data);
    }

    login(username, pass) {
        let data = {
            "username": username,
            "password": pass
        }
        return http.post(`/user/login`, data);
    }
}

export default new Authentication();