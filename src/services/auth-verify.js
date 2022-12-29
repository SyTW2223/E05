import { logout } from "../actions/auth.action";
import { useLocation } from 'react-router-dom';
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

// obtiene payload del token de los datos
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

const selectorUserData = (state) => state.auth?.user?.data;

// decodifica token y comprueba fecha caducidad y actual
export const AuthVerify = () => {
    const userData = useSelector(selectorUserData);
    const dispatch = useDispatch();
    let location = useLocation();
    useEffect(() => {
        if (userData) {
            const decodedJwt = parseJwt(userData.accessToken);
            if (decodedJwt.exp * 1000 < Date.now()) {
                dispatch(logout());
                console.log("Time token expired");
            }
        }
    }, [location]);
}
