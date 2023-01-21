const mongoose = require("mongoose");
const genres = require("./genres");
// ------------------ COLECCIONES DE USUARIOS EN MONGO ------------ //
// se puede pasar las comprobaciones al front
const Serie = mongoose.model(
  "Serie",
  new mongoose.Schema({
    type: {
      type: String,
      default: "serie",
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
    seasons: {
      type: Number,
      trim: true,  
    },
    yearPublication: {
      type: Number,
      required: true,
    },
    genres: {
      type: [genres],
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

module.exports = Serie;