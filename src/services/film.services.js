import http from "../http-common";
import authHeader from './auth-header';

class Film {
    listFilms() {
        return http.get("/film/");
    }
    getFilm(title) {
        return http.get("/film/" + title);
    }
    createFilm(title, description, categories, year) {
        let data = {
            "title": title,
            "description": description,
            "categories": categories,
            "year": year,
        }
        return http.post("/film/", data,  { headers: authHeader() });
    }
    updateFilm(title, description, categories, year) {
        let data = {
            "title": title,
            "description": description,
            "categories": categories,
            "year": year,
        }
        return http.patch("/film", data, { headers: authHeader() });
    }
    deleteFilm(title) {
        return http.delete("/film" + title, { headers: authHeader() });
    }
}

export default new Film();