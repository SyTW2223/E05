import http from "../http-common";
import authHeader from './auth-header';


class UserService {
  getUserBoard() {
    return http.get("/user/userBoard", { headers: authHeader() });
  }

  getAdminBoard() {
    return http.get("/user/adminBoard", { headers: authHeader() });
  }
}

export default new UserService();