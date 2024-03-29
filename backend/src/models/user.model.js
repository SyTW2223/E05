const mongoose = require("mongoose");

// ------------------ COLECCIONES DE USUARIOS EN MONGO ------------ //
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      min: 6,
    },
    role: {
      type: ["ADMIN" | "USER"],
      trim: true,
      default: "USER",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    lists: {
      type: [{"_id": mongoose.Schema.Types.ObjectId, "name": String }],
      ref: "List",
    }
  })
);

module.exports = User;