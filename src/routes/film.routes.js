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
  .get(film.findFilm)
  .delete(film.delete)
  .patch(film.update);

  app.use("/film", router);
};