const auth = require("../middlewares/authJwt");

module.exports = app => {
  const book = require("../controllers/book.controller");
  var router = require("express").Router();

  router
  .route("/")
  .post([auth.verifyToken, auth.isAdmin], book.create)
  .get(book.findAll)
  .delete([auth.verifyToken, auth.isAdmin], book.deleteAll);

  router
  .route("/:title")
  .get(book.findBook)
  .delete([auth.verifyToken, auth.isAdmin], book.delete)
  .patch([auth.verifyToken, auth.isAdmin], book.update);

  app.use("/book", router);
};