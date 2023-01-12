const list = require("../controllers/list.controller");

// crea 9 listas predefinidas para el usuario actual y devuelve los id de las listas a su usuario
exports.createPredefinedList = (userId) => 
{
    const names = ['Peliculas vistas', 'Series vistas', 'Libros leidos', 'Peliculas para ver',
        'Series para ver', 'Libros para leer', 'Peliculas viendo', 'Series viendo', 'Libros leyendo'];

    return ids = names.map((name) => {
        const data = {
            name: name,
            users: [userId],
        }
        console.log('data', data)
        const dataList = list.create(data);
        //console.log('datalist management', dataList)
        //return dataList._id;
    });
}
