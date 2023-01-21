const filmModel = require("../models/film.model");


// Create and Save a new film
exports.create = async (req, res) => {
  const allowedCreated = ['description', 'rating', 'genres', 'title', 'yearPublication', 'image'];
  const actualCreated = Object.keys(req.body);
  const isValidCreate = actualCreated.every((create) => allowedCreated.includes(create));

  if (!isValidCreate) {
    return res.status(400).send({
      error: 'Update is not permitted. Check the parameters.',
    });
  }
  // Create a film
  const newFilm = new filmModel({
    title: req.body.title,
    description: req.body.description,
    genres: req.body.genres,
    rating: req.body.rating,
    yearPublication: req.body.yearPublication,
    image: req.body.image,
  });

  // Save film in the database
  newFilm.save().then(data => {
      res.status(201).send(data);
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Error create film."
      });
    });
};


// Update a film by the title in the request
exports.update = (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const allowedUpdates = ['description', 'rating', 'image', 'genres', 'title', 'yearPublication'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'Update is not permitted. Check the parameters.',
    });
  }
  const title = req.params.title;
  // busca el libro original para actualizarlo
  filmModel.findOneAndUpdate({'title': title}, req.body, { new: true })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update film with title=${title}. Maybe film was not found!`
        });
      } else res.status(200).send({ message: "film was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: 
          err.message || "Error updating film with title=" + title
      });
    });
};


// Retrieve all elements from the database. GET ALL
exports.findAll = (req, res) => 
{
  filmModel.find()
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error found fims."
      });
    });
};

// Find a element with an title 
exports.findFilm = async (req, res) => 
{
  await filmModel.findById({'_id': req.params._id})
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found film with title " + data.title });
      else res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({ message: "Unknown error when searching film."});
    });
};


// Delete a film with the specified id in the request 
exports.delete = (req, res) => 
{
  const title = req.params.title;
  filmModel.findOneAndDelete({'title': title})
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete film with title=${title}. Maybe film was not found!`
        });
      } else {
        res.status(200).send({
          message: "Film was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 
          err.message || "Could not delete film with title=" + title
      });
    });
};

// Delete all films from the database.
exports.deleteAll = (req, res) => 
{
  filmModel.deleteMany({})
    .then(data => {
      res.status(200).send({
        message: `${data.deletedCount} films were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all films."
      });
    });
};
