module.exports = app => {
    const list = require("../controllers/list.controler");
  
    var router = require("express").Router();
  
    // Create a new list
    router.post("/", list.create);
  
    // Retrieve all list
    router.get("/", list.findAll);
  
    // Retrieve a single list with id
    router.get("/:name", list.findOne);
  
    // Update a list with name
    router.patch("/:name", list.update);
  
    // Delete a list with name
    router.delete("/:name", list.delete);
  
    // Delete all lists database
    router.delete("/", list.deleteAll);
  
    app.use("/api/list.controler", router);
  };