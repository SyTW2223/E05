const list = require("../controllers/list.controller");
const listModel = require("../models/list.model");

// crea 9 listas predefinidas para el usuario actual y devuelve los id de las listas a su usuario
exports.createPredefinedList = async() => 
{
    const names = [ 
        {"type": "film", "names": ['Peliculas vistas', 'Peliculas para ver', 'Peliculas viendo']},
        {"type": "serie", "names": ['Series vistas', 'Series para ver', 'Series viendo']},
        {"type": "book", "names": ['Libros leidos', 'Libros para leer', 'Libros leyendo']}
    ];

    let idsLists = [];
    
    idsLists = await Promise.all(
        names.map(async list => {
            let c;
                c = await Promise.all(
                    list.names.map(async name => {
                        const newList = new listModel({
                            name: name,
                            itemsTypes: list.type,
                        });
                        try {
                            return ('id', await newList.save())._id;
                        } catch (err) {
                            console.log("Error al crear lista " + name);
                            return;
                        }
                    })
                )
            return c;
        })
    )
    return idsLists.flat();
}
