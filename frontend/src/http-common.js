import axios from "axios";

export default axios.create({
  baseURL: "http://10.6.131.130:80", // envia peticiones al proxy 
  headers: {
    "Content-type": "application/json"
  }
});