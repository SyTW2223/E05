module.exports = app => {
  const film = require("../controllers/film.controler");
  var router = require("express").Router();

  router
  .route("/")
  .post(film.create)
  .get(film.findAll)
  .delete(film.deleteAll);

  router
  .route("/:title")
  .get(film.findOne)
  .delete(film.delete)
  .patch(film.update);

  app.use("/film", router);
};