import axios from "axios";


const API_URL = "http://10.6.130.239:80/";


export const getPost = (username, accountName, email, password) => {
    return axios.get(API_URL + "post", {
        accountName: accountName,
    });
};



// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getPost
};