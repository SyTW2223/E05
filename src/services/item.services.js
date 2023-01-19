import http from "../http-common";
// import { AuthHeader } from './auth-header';

class Item {
    listItems(route) {
        return http.get("/" + route);
    }
    async getItem(route, title) {
        try {
            return await http.get("/" + route + "/" + title);
        } catch (error) {
            console.log(error);
        }
    }
    async createItem(route, data) {
        try {
            await http.post("/" + route, data);
        } catch (error) {
            console.log(error);
        }
    }
    async updateItem(route, data) {
        try {
            await http.patch("/" + route + "/" + data.title, data);
        } catch (error) {
            console.log(error);
        }
    }
    async deleteItem(route, title) {
        try {
            await http.delete("/" + route + "/" + title);
        } catch (error) {
            console.log(error);
        }
    }
}

export default new Item();