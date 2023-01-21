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

    login(username, pass) {
        let data = {
            "username": username,
            "password": pass
        }
        return http.post(`/user/login`, data)
            .then((response) => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            })
    }

    logout() {
        localStorage.removeItem("user");
    }
}

export default new Authentication();