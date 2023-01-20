const mongoose = require("mongoose");
// ------------------ COLECCIONES DE USUARIOS EN MONGO ------------ //
// se puede pasar las comprobaciones al front
const List = mongoose.model(
  "List",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    items: {
      type: [mongoose.Schema.Types.ObjectId],
      trim: true,
    },
  })
);

module.exports = List;