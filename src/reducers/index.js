import { combineReducers } from "redux";
import auth from "./auth.reducer";
import message from "./message";

export default combineReducers({
  auth,
  message,
});