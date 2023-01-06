module.exports = app => {
  const serie = require("../controllers/serie.controller");
  var router = require("express").Router();

  router
  .route("/")
  .post(serie.create)
  .get(serie.findAll)
  .delete(serie.deleteAll);

  router
  .route("/:title")
  .get(serie.findSerie)
  .get(serie.findSerie)
  .delete(serie.delete)
  .patch(serie.update);

  app.use("/serie", router);
};