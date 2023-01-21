const book = require("../controllers/book.controller");
var router = require("express").Router();
const auth = require("../middlewares/authJwt");

module.exports = app => {
  router
  .route("/")
  .post([auth.verifyToken, auth.isAdmin], book.create)  // solo admin
  .get(book.findAll)  // publico
  .delete([auth.verifyToken, auth.isAdmin], book.deleteAll);  // solo admin

  router
  .route("/:title")
  .delete([auth.verifyToken, auth.isAdmin], book.delete) // solo para admin
  .patch([auth.verifyToken, auth.isAdmin], book.update); // solo para admin

  router
  .route("/:_id")
  .get(book.findBook); // publico

  app.use("/book", router);
};