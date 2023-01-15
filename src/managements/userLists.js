const list = require("../controllers/list.controller");
const listModel = require("../models/list.model");

// crea 9 listas predefinidas para el usuario actual y devuelve los id de las listas a su usuario
exports.createPredefinedList = async() => 
{
    const names = ['Peliculas vistas', 'Series vistas', 'Libros leidos', 'Peliculas para ver',
        'Series para ver', 'Libros para leer', 'Peliculas viendo', 'Series viendo', 'Libros leyendo'];
    let idsLists = [];
    idsLists = await Promise.all(
        names.map(async (name) => {
            const newList = new listModel({
                name: name,
            });

            try {
                return (await newList.save())._id;
            } catch (err) {
                console.log("Error al crear lista " + name);
                return;
            }
        })
    );
    return idsLists;
}
