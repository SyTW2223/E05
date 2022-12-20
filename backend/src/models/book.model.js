const mongoose = require("mongoose");
const categories = require("./categories");
// ------------------ COLECCIONES DE USUARIOS EN MONGO ------------ //
// se puede pasar las comprobaciones al front
const Book = mongoose.model(
  "Book",
  new mongoose.Schema({
    id: {
      type: Number,
      require: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      unique: true,
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
    rating: {
      type: Number,
      trim: true,
      default: 0,
      min: 0,
      max: 10
    },
  })
);

module.exports = Book;