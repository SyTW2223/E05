module.exports = app => {
  const film = require("../controllers/film.controller");
  var router = require("express").Router();

  router
  .route("/")
  .post(film.create)
  .get(film.findAll)
  .delete(film.deleteAll);

  router
  .route("/:title")
  .delete(film.delete)
  .patch(film.update);

  router
  .route("/:_id")
  .get(film.findFilm);

  app.use("/film", router);
};