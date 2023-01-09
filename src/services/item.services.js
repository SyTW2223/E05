import http from "../http-common";
import { AuthHeader } from './auth-header';

class Item {
    listItems(route) {
        return http.get("/" + route);
    }
    getItem(route, title) {
        return http.get("/" + route + title);
    }
    createItem(route, data) {
        return http.post("/" + route, data,  { headers: AuthHeader() });
    }
    updateItem(route, data) {
        return http.patch("/" + route, data, { headers: AuthHeader() });
    }
    deleteItem(route, title) {
        return http.delete("/" + route + title, { headers: AuthHeader() });
    }
}

export default new Item();