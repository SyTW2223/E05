import axios from "axios";


const API_URL = "http://localhost:8080/";


export const getPost = (name, username, email, password) => {
    return axios.get(API_URL + "post", {
        username: username,
    });
};



// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getPost
};