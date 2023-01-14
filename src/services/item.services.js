import http from "../http-common";
// import { AuthHeader } from './auth-header';

class Item {
    listItems(route) {
        return http.get("/" + route);
    }
    getItem(route, title) {
        return http.get("/" + route + title);
    }
    createItem(route, data) {
        console.log(route,data);
        // return http.post("/" + route, data,  { headers: AuthHeader() });
        return http.post("/" + route, data).then(res =>{
            console.log(res.data)
        })
        .catch((error)=>{
            console.log(error);
        });

    }
    updateItem(route, data) {
        // return http.patch("/" + route, data, { headers: AuthHeader() });
        return http.patch("/" + route, data);
    }
    deleteItem(route, title) {
        // return http.delete("/" + route + title, { headers: AuthHeader() });
        // Esto elimina todas las series, usa la función deleteAll en vez de delete
        return http.delete("/" + route + "?title=" + title).then(res =>{
            console.log(res.data)
        })
        .catch((error)=>{
            console.log(error);
        });
    }
}

export default new Item();