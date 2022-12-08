/*
  Rutas de autorizacion para los usuarios, que recursos son accesibles para cada uno
    -> GET /api/test/all
    -> GET /api/test/user for loggedin users (user/admin)
    -> GET /api/test/admin for admin
*/
module.exports = app => {
  const user = require("../controllers/user.controler");

  var router = require("express").Router();

  // Create a new user
  router.post("/", user.create);

  // Retrieve all user
  router.get("/", user.findAll);

  // Retrieve a single user with id
  router.get("/:name", user.findOne);

  // Update a user with name
  router.patch("/:name", user.update);

  // Delete a user with name
  router.delete("/:name", user.delete);

  // Delete all users database
  router.delete("/", user.deleteAll);

  app.use("/api/user.controler", router);
};