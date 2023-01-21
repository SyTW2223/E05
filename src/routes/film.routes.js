const film = require("../controllers/film.controller");
var router = require("express").Router();
const auth = require("../middlewares/authJwt");

module.exports = app => {

  router
  .route("/")
  .post([auth.verifyToken, auth.isAdmin], film.create)
  .get(film.findAll)
  .delete([auth.verifyToken, auth.isAdmin], film.deleteAll);

  router
  .route("/:title")
  .delete([auth.verifyToken, auth.isAdmin], film.delete)
  .patch([auth.verifyToken, auth.isAdmin], film.update);

  router
  .route("/:_id")
  .get(film.findFilm);

  app.use("/film", router);
};