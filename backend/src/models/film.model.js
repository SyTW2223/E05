const mongoose = require("mongoose");
const categories = require("./categories");
// ------------------ COLECCIONES DE USUARIOS EN MONGO ------------ //
// se puede pasar las comprobaciones al front
const Film = mongoose.model(
  "Film",
  new mongoose.Schema({
    id: {
      type: Number,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    categories: {
      type: [categories],
      trim: true,
    },
    yearPublication: {
      type: Number,
      trim: true,
    },
    rating: {
      type: Number,
      trim: true,
      default: 0,
      min: 0,
      max: 10
    },
  })
);

module.exports = Film;