const mongoose = require("mongoose");
// ------------------ COLECCIONES DE USUARIOS EN MONGO ------------ //
// se puede pasar las comprobaciones al front

const itemsTypes = ["film", "serie", "book"];

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
    itemsTypes: {
      type: String,
      values: "film" | "serie" | "book",
    }
  })
);

module.exports = List;