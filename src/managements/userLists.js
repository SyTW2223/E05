const list = require("../controllers/list.controller");
const listModel = require("../models/list.model");

// crea 9 listas predefinidas para el usuario actual y devuelve los id de las listas a su usuario
exports.createPredefinedList = async() => 
{
    const names = [
        'Peliculas vistas', 'Peliculas para ver', 'Peliculas viendo',
        'Series vistas', 'Series para ver', 'Series viendo', 
        'Libros leidos', 'Lbros para leer', 'Libros leyendo'];
    let idsLists = [];
    idsLists = await Promise.all(
        names.map(async (name) => {
            const newList = new listModel({
                name: name,
            });
            try {
                return { "_id": (await newList.save())._id, "name": name};
            } catch (err) {
                console.log("Error al crear lista " + name);
                return;
            }
        })
    );
    return idsLists;
}
