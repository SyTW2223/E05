const user = require("../controllers/user.controller");
const router = require("express").Router();
const verify = require("../middlewares/authJwt");

module.exports = app => {
  // Create a new user
  router.post("/", user.create);
  // Login user
  router.post("/login", user.login);

  // Register a new user
  router.post("/register", user.create);

  // Logout user
  router.post("/logout", user.logout);

  // Refresh token
  router.post("/refreshToken", user.refreshToken);

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