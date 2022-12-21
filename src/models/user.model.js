const mongoose = require("mongoose");
// ------------------ COLECCIONES DE USUARIOS EN MONGO ------------ //
// se puede pasar las comprobaciones al front
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    id: {
      type: Number,
      trim: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      min: 6,
    },
    role: {
      type: ["ADMIN" | "USER"],
      trim: true,
      default: "USER",
    }
  })
);

module.exports = User;