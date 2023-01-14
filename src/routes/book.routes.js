const auth = require("../middlewares/authJwt");

module.exports = app => {
  const book = require("../controllers/book.controller");
  var router = require("express").Router();

  router
  .route("/")
  .post(book.create)
  .get(book.findAll)
  .delete(book.deleteAll);

  router
  .route("/:title")
  .get(book.findBook)
  .delete(book.delete)
  .patch(book.update);

  app.use("/book", router);
};