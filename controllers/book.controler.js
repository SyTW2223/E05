const db = require("../models/book.model");
const book = db.books;

// Create and Save a new book
exports.create = async (req, res) => {
  console.log('esto es create en book.controler');

  // Create a book
  const book = new book({
    title: req.body.title,
    description: req.body.description,
    categorys: req.body.categorys,
  });

  // Save book in the database
  book.save(book).then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Error al crear el elemento."
      });
    });
};



// Update a book by the title in the request
exports.update = (req, res) => {
  console.log('esto es update en book.controler');
  // si no hay datos nuevos no podra actualizarse
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const title = req.params.title;
  // busca el libro original para actualizarlo
  book.findOneAndUpdate(title, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update book with title=${title}. Maybe book was not found!`
        });
      } else res.send({ message: "book was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating book with title=" + title
      });
    });
};


// Retrieve all elements from the database.
exports.findAll = (req, res) => {
  console.log('esto es findAll en book.controler');
  
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  book.find()
  console.log('tercer all')
    .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Error al buscar los elementos."
      });
    });
};

// Find a element with an title
exports.findOne = (req, res) => {
  console.log('esto es findOne en book.controler');
  console.log(req.params.title)
  book.find(req.body.title).then(data => {
      if (!data)
        res.status(404).send({ message: "Not found book with title " + id });
      else res.send(data);
    }).catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving book with title=" + title });
    });
};


// Delete a book with the specified id in the request
exports.delete = (req, res) => {
  console.log('esto es delete en book.controler');
  
  const title = req.params.title;

  book.findByIdAndRemove(title, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete book with title=${title}. Maybe book was not found!`
        });
      } else {
        res.send({
          message: "book was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete book with title=" + title
      });
    });
};

// Delete all books from the database.
exports.deleteAll = (req, res) => {
  console.log('esto es deleteAll en book.controler');
  
  book.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} books were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all books."
      });
    });
};
