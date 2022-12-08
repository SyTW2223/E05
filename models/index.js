const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.ROLES = ["user", "admin"];

db.book = require("./book.model");
db.film = require("./film.model");
db.serie = require("./serie.model");
db.list = require("./list.model");

module.exports = db;