/**
 * authentication service. Contiene las peticiones http que se haran al servidor
 */

 import axios from "axios";


 const API_URL = "http://localhost:8080/";
 
 export const register = (name, username, email, password) => {
   return axios.post(API_URL + "register", {
     "name": name,
     "username": username,
     "email": email,
     "password": password,
   });
 };
 
 
 export const login = (username) => {
   return axios.post(API_URL + "login", {
   params:{
     "username": username
   }
   });
 };
 
 
 // eslint-disable-next-line import/no-anonymous-default-export
 export default {
   register,
   login
 };