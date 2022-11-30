/**
 * reducer se encargan de actualizar el estado
 * este fichero combina los reducers, es necesario ya que solo existe una store
 */

import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";

export default combineReducers({
    auth,
    message,
});