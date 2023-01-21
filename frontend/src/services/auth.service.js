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
        return http.post("/user/register", data);
    }

    async login(username, pass) {
        let data = {
            "username": username,
            "password": pass
        }
        const response = await http.post(`/user/login`, data);
        if (response.data.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data.data));
        }
        return response.data;
    }

    logout() {
        localStorage.removeItem("user");
    }
}

export default new Authentication();