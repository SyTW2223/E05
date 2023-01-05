module.exports = app => {
  const serie = require("../controllers/serie.controler");
  var router = require("express").Router();

  router
  .route("/")
  .post(serie.create)
  .get(serie.findAll)
  .delete(serie.deleteAll);

  router
  .route("/:title")
  .get(serie.findOne)
  .delete(serie.delete)
  .patch(serie.update);

  app.use("/serie", router);
};