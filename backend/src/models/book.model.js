const mongoose = require("mongoose");
const genres = require("./genres");
// ------------------ COLECCIONES DE USUARIOS EN MONGO ------------ //
// se puede pasar las comprobaciones al front
const Book = mongoose.model(
  "Book",
  new mongoose.Schema({
    type: {
      type: String,
      default: "book",
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
    author: {
      type: String,
      require: true,
      trim: true,
    },
    saga:{
      type: String,
      trim: true,
    },
    genres: {
      type: [genres],
      trim: true,
      required: true,
    },
    yearPublication: {
      type: Number,
      trim: true,
      required: true,
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