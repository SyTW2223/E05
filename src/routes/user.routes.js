const auth = require("../middlewares/authJwt");
const user = require("../controllers/user.controller");
var router = require("express").Router();

module.exports = app => {
  router
  .route("/")
  .post(user.create)
  .get(user.findAll)
  .delete(user.deleteAll);

  router
  .route("/:username")
  .get(user.findOne)
  .delete(user.delete)
  .patch(user.update);

  router.post("/register", user.create);
  router.post("/login", user.login);
  router.post("/logout", user.logout);

  
  app.use("/user", router);
};
