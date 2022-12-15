const mongoose = require("mongoose");
// ------------------ COLECCIONES DE USUARIOS EN MONGO ------------ //
// se puede pasar las comprobaciones al front
const List = mongoose.model(
  "List",
  new mongoose.Schema({
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    id: {
      type: Number,
      unique: true,
      trim: true,
    },
    items: {
      type: [Number],
      trim: true,
    },
    users: {
        type: [Number],
        trim: true,
    }
  })
);

module.exports = List;