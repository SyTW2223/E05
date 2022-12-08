const mongoose = require("mongoose");
// ------------------ COLECCIONES DE USUARIOS EN MONGO ------------ //
// se puede pasar las comprobaciones al front
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: {
      type: String,
      unique: true,
      required: [true, 'El usuario debe tener un nombre de usuario'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'El usuario debe tener un correo electronico'],
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'El usuario debe tener una contraseña'],
      trim: true,
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);

module.exports = User;