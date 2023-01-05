import http from "../http-common";
import authHeader from './auth-header';

class Item {
    listItems(route) {
        return http.get("/" + route);
    }
    getItem(route, title) {
        return http.get("/" + title);
    }
    createItem(route, data) {
        return http.post("/", data,  { headers: authHeader() });
    }
    updateItem(route, data) {
        return http.patch("/", data, { headers: authHeader() });
    }
    deleteItem(route, title) {
        return http.delete("/" + title, { headers: authHeader() });
    }
}

export default new Item();