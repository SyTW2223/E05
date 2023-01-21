module.exports = app => {  const list = require("../controllers/list.controller");
  var router = require("express").Router();

  router
  .route("/")
  .post(list.create)
  .get(list.findAll)
  .delete(list.deleteAll)
  .patch(list.addItem);

  router
  .route("/:_id")
  .get(list.findList)
  .delete(list.delete)
  .patch(list.update);

  app.use("/list", router);
};