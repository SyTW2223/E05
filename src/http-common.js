import axios from 'axios';

export default axios.create({
  baseURL: "http://10.6.130.239:80/api",
  headers: {
    "Content-type": "application/json"
  }
});