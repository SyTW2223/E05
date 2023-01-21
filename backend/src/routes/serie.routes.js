module.exports = app => {
  const serie = require("../controllers/serie.controller");
  const auth = require("../middlewares/authJwt");

  var router = require("express").Router();

  router
  .route("/")
  .post(serie.create)
  .get(serie.findAll)
  .delete(serie.deleteAll);

  router
  .route("/:title")
  //.get(serie.findSerie)
  .delete(serie.delete)
  .patch(serie.update);

  router
  .route("/:_id")
  .get(serie.findSerie);

  app.use("/serie", router);
};