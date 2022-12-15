/**
 * authentication service. Contiene las peticiones http que se haran al servidor
 */

 import axios from "axios";


 const API_URL = "http://localhost:3000/";
 
 export const register = (name, username, email, password) => {
   return axios.post(API_URL + "register", {
     "name": name,
     "username": username,
     "email": email,
     "password": password,
   });
 };
 
 
 export const login = (username, password) => {
   return axios.post(API_URL + "login", {
   params:{
     "username": username,
     "password": password
   }
   });
 };
 
 const logout = () => {
  localStorage.removeItem('user');
 }
 
 // eslint-disable-next-line import/no-anonymous-default-export
 export default {
   register,
   login,
   logout
 };