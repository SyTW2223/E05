const bookModel = require("../models/book.model");


// Create and Save a new book
exports.create = async (req, res) => 
{
  const allowedCreated = ['description', 'rating', 'genres', 'title', 'author', 'saga', 'yearPublication', 'image'];
  const actualCreated = Object.keys(req.body);
  const isValidCreate = actualCreated.every((create) => allowedCreated.includes(create));

  if (!isValidCreate) {
    return res.status(400).send({
      error: 'Update is not permitted. Check the parameters. [title, description, genres, rating, author, image, yearPublication, saga]',
    });
  }
  // Create a book
  const newBook = new bookModel({
    title: req.body.title,
    image: req.body.image,
    author: req.body.author,
    saga: req.body.saga,
    yearPublication: req.body.yearPublication,
    description: req.body.description,
    genres: req.body.genres,
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
exports.update = (req, res) => 
{
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const allowedUpdates = ['description', 'rating', 'genres', 'title', 'author', 'saga', 'image', 'yearPublication'];
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
exports.findAll = (req, res) => 
{
  bookModel.find()
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error found book."
      });
    });
};

// Find a element with an id
exports.findBook = async (req, res) => 
{
  await bookModel.findById({'_id': req.params._id})
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found book with title " + data.title });
      else res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({ message: "Unknown error when searching book."});
    });
  }

// Delete a book with the specified id in the request
exports.delete = (req, res) => 
{
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
exports.deleteAll = (req, res) => 
{
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
