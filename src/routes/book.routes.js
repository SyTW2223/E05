module.exports = app => {
  const book = require("../controllers/book.controler");
  var router = require("express").Router();

  router
  .route("/")
  .post(book.create)
  .get(book.findAll)
  .delete(book.deleteAll);

  router
  .route("/:title")
  .get(book.findOne)
  .delete(book.delete)
  .patch(book.update);

  app.use("/book", router);
};