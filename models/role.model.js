const mongoose = require("mongoose");

// ------------ COLECCIONES DE USUARIOS EN MONGO ------------------ //
// la app contara con usuarios administradores y normales

/*
no es necesario crear funciones crud puesto que mongoose las soporta todas
estas funciones se usan en controladores y middlewares ->

new User: object.save()
find a User by id: User.findById(id)
find User by email: User.findOne({ email: … })
find User by username: User.findOne({ username: … })
find all Roles which name in given roles array: Role.find({ name: { $in: roles } })
*/


const Role = mongoose.model(
  "Role",
  new mongoose.Schema({
    name: String
  })
);

module.exports = Role;