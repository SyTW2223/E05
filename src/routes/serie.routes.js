var router = require("express").Router();
const serie = require("../controllers/serie.controller");
const auth = require("../middlewares/authJwt");


module.exports = app => {
  router
  .route("/")
  .post([auth.verifyToken, auth.isAdmin], serie.create)
  .get(serie.findAll)
  .delete([auth.verifyToken, auth.isAdmin], serie.deleteAll);

  router
  .route("/:title")
  .delete([auth.verifyToken, auth.isAdmin], serie.delete)
  .patch([auth.verifyToken, auth.isAdmin], serie.update);

  router
  .route("/:_id")
  .get(serie.findSerie);

  app.use("/serie", router);
};