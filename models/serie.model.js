const mongoose = require("mongoose");
const categorys = require("./categorys");

// ------------------ COLECCIONES DE USUARIOS EN MONGO ------------ //
// se puede pasar las comprobaciones al front
const Serie = mongoose.model(
  "Serie",
  new mongoose.Schema({
    title: {
      type: String,
      unique: true,
      required: [true, 'Debe contener un titulo.'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Debe contener una descripcion.'],
      trim: true,
    },
    seasons: {
      type: Number,
      trim: true,  
    },
    categorys: {
      type: [categorys],
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