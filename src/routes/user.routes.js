/*
  Rutas de autorizacion para los usuarios, que recursos son accesibles para cada uno
    -> GET /api/test/all
    -> GET /api/test/user for loggedin users (user/admin)
    -> GET /api/test/admin for admin
*/
module.exports = app => {
  const user = require("../controllers/user.controller");

  var router = require("express").Router();

  // Create a new user
  router.post("/", user.create);

  // Register user
  router.post("/register", user.create);

  // Login user
  router.post("/login", user.login);

  // Retrieve all user
  router.get("/", user.findAll);

  // Retrieve a single user with id
  router.get("/:username", user.findOne);

  // Update a user with username
  router.patch("/:username", user.update);

  // Delete a user with username
  router.delete("/:username", user.delete);

  // Delete all users database
  router.delete("/", user.deleteAll);

  app.use("/user", router);
};