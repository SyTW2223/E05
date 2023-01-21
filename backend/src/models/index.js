const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const dbConfig = require("../config/db.config");

const db = {};

db.mongoose = mongoose;
db.url = dbConfig.url;
db.HOST = dbConfig.HOST;
db.PORT = dbConfig.PORT;
db.DB = dbConfig.DB;
db.USER = dbConfig.USER;
db.PASSWORD = dbConfig.PASSWORD;

db.user = require("./user.model");
db.book = require("./book.model")(mongoose);
db.film = require("./film.model")(mongoose);
db.serie = require("./serie.model")(mongoose);
db.list = require("./list.model")(mongoose);

module.exports = db;