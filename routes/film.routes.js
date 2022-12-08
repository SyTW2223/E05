module.exports = app => {
    const film = require("../controllers/film.controler");
  
    var router = require("express").Router();
  
    // Create a new film
    router.post("/", film.create);
  
    // Retrieve all film
    router.get("/", film.findAll);
  
    // Retrieve a single film with id
    router.get("/:title", film.findOne);
  
    // Update a film with title
    router.patch("/:title", film.update);
  
    // Delete a film with title
    router.delete("/:title", film.delete);
  
    // Delete all films database
    router.delete("/", film.deleteAll);
  
    app.use("/api/film", router);
  };