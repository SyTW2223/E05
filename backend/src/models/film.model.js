const mongoose = require("mongoose");
const genres = require("./genres");
// ------------------ COLECCIONES DE USUARIOS EN MONGO ------------ //
// se puede pasar las comprobaciones al front
const Film = mongoose.model(
  "Film",
  new mongoose.Schema({
    type: {
      type: String,
      default: "film",
    },
    title: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    genres: {
      type: [genres],
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