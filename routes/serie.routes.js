module.exports = app => {
    const serie = require("../controllers/serie.controler");
  
    var router = require("express").Router();
  
    // Create a new serie
    router.post("/", serie.create);
  
    // Retrieve all serie
    router.get("/", serie.findAll);
  
    // Retrieve a single serie with id
    router.get("/:title", serie.findOne);
  
    // Update a serie with title
    router.patch("/:title", serie.update);
  
    // Delete a serie with title
    router.delete("/:title", serie.delete);
  
    // Delete all series database
    router.delete("/", serie.deleteAll);
  
    app.use("/api/serie.controler", router);
  };