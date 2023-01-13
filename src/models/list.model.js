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
    books: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Book",
      trim: true,
    },
    films: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Film",
      trim: true,
    },
    series: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Serie",
      trim: true,
    },
  })
);

module.exports = List;