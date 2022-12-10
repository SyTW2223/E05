module.exports = app => {
    const book = require("../controllers/book.controler");
  
    var router = require("express").Router();
  
    // Create a new book
    router.post("/", book.create);
  
    // Retrieve all book
    router.get("/", book.findAll);
  
    // Retrieve a single book with id
    router.get("/:title", book.findOne);
  
    // Update a book with title
    router.patch("/:title", book.update);
  
    // Delete a book with title
    router.delete("/:title", book.delete);
  
    // Delete all books database
    router.delete("/", book.deleteAll);
  
    app.use("/book", router);
  };