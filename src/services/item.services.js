import http from "../http-common";
import authHeader from './auth-header';

class Item {
    listItems(route) {
        return http.get("/" + route);
    }
    getItem(route, title) {
        return http.get("/" + route + title);
    }
    createItem(route, data) {
        return http.post("/" + route, data,  { headers: authHeader() });
    }
    updateItem(route, data) {
        return http.patch("/" + route, data, { headers: authHeader() });
    }
    deleteItem(route, title) {
        return http.delete("/" + route + title, { headers: authHeader() });
    }
}

export default new Item();