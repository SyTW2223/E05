const bookModel = require("../models/book.model");


// Create and Save a new book
exports.create = async (req, res) => {
  //console.log('esto es create en book.controler');
  const allowedCreated = ['description', 'rating', 'id', 'categories', 'title'];
  const actualCreated = Object.keys(req.body);
  const isValidCreate = actualCreated.every((create) => allowedCreated.includes(create));

  if (!isValidCreate) {
    return res.status(400).send({
      error: 'Update is not permitted. Check the parameters.',
    });
  }
  // Create a book
  const newBook = new bookModel({
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    categories: req.body.categories,
    rating: req.body.rating,
  });
  
  // Save book in the database
  newBook.save().then(data => {
      res.status(201).send(data);
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Error created book."
      });
    });
};


// Update a book by the title in the request
exports.update = (req, res) => {
  //console.log('esto es update en book.controler');
  // si no hay datos nuevos no podra actualizarse
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const allowedUpdates = ['description', 'rating', 'id', 'categories', 'title'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'Update is not permitted. Check the parameters.',
    });
  }
  const title = req.params.title;
  // busca el libro original para actualizarlo
  bookModel.findOneAndUpdate({'title': title}, req.body, { new: true })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update book with title=${title}. Maybe book was not found!`
        });
      } else res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error updating book with title=" + title
      });
    });
};


// Retrieve all elements from the database.
exports.findAll = (req, res) => {
  //console.log('esto es findAll en book.controler');
  
  bookModel.find()
    .then(data => {
      res.status(200).send(data);
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Error found book."
      });
    });
};

// Find a element with an title
exports.findOne = (req, res) => {
  //console.log('esto es findOne en book.controler');
  const title = req.params.title;
  bookModel.findOne({'title': title}).then(data => {
      if (!data)
        res.status(404).send({ message: "Not found book with title " + title });
      else res.status(200).send(data);
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Unknown error when searching for " + title
      });
    });
};


// Delete a book with the specified id in the request
exports.delete = (req, res) => {
  //console.log('esto es delete en book.controler');
  
  const title = req.params.title;

  bookModel.findOneAndDelete({'title': title})
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete book with title=${title}. Maybe book was not found!`
        });
      } else {
        res.status(200).send({
          message: "Book was deleted successfully!"
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
  //console.log('esto es deleteAll en book.controler');
  
  bookModel.deleteMany({})
    .then(data => {
      res.status(200).send({
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
