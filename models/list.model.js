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
      trim: true,
    },
    items: {
      type: [JSON],
      trim: true,
    },
    users: {
        type: [JSON],
        trim: true,
    }
  })
);

module.exports = List;