import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  LOGIN_ADMIN_SUCCESS,
  //GET_LIST_SUCCESS,
} from "../actions/types";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user ? (
  user.role.includes("ADMIN") ? {isAdminLoggedIn: true, user } : { isLoggedIn: true, user }
) : { isLoggedIn: false, user: null };


// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        isAdminLoggedIn: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        isAdminLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case LOGIN_ADMIN_SUCCESS:
      return {
        ...state,
        isAdminLoggedIn: true,
        user: payload.user,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        isAdminLoggedIn: false,
        user: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        isAdminLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
}
