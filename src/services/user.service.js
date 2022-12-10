import axios from "axios";
import authHeader from "./auth-header"

const API_URL = "http://localhost:3000/";


const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", {
    headers: authHeader()
  });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getPublicContent,
    getUserBoard
}