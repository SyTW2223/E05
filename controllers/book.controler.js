const db = require("../models");
const book = db.books;

// Create and Save a new book
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Debe tener un titulo!" });
    return;
  }

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
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const title = req.params.title;

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
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  book.find(condition)
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
  const title = req.query.name?{name: req.query.name.toString()}:{};
  book.find(title).then(data => {
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