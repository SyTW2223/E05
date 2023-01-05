const serieModel = require("../models/serie.model");


// Create and Save a new serie
exports.create = async (req, res) => 
{
  const allowedCreated = ['description', 'rating', 'yearPublication', 'categories', 'title', 'seasons'];
  const actualCreated = Object.keys(req.body);
  const isValidCreate = actualCreated.every((create) => allowedCreated.includes(create));

  if (!isValidCreate) {
    return res.status(400).send({
      error: 'Post is not permitted. Check the parameters.',
    });
  }
  // Create a serie
  const newSerie = new serieModel({
    title: req.body.title,
    description: req.body.description,
    seasons: req.body.seasons,
    categories: req.body.categories,
    rating: req.body.rating,
    yearPublication: req.body.yearPublication,
  });

  // Save Serie in the database
  newSerie.save().then(data => {
      res.status(201).send(data);
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Error create serie."
      });
    });
};


// Update a serie by the title in the request
exports.update = (req, res) => 
{
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const allowedUpdates = ['description', 'rating', 'id', 'categories', 'title', 'seasons'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'Update is not permitted. Check the parameters.',
    });
  }
  const title = req.params.title;
  // busca el libro original para actualizarlo
  serieModel.findOneAndUpdate({'title': title}, req.body, { new: true })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update serie with title=${title}. Maybe serie was not found!`
        });
      } else res.status(200).send({ message: "Serie was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: 
          err.message || "Error updating serie with title=" + title
      });
    });
};


// Retrieve all elements from the database.
exports.findAll = (req, res) => 
{
  serieModel.find()
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error found series."
      });
    });
};

// Find a element with an title
exports.findOne = (req, res) => 
{
  const title = req.params.title;
  serieModel.findOne({'title': title})
  .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found serie with title " + title });
      else res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({ message: 
        err.message || "Unknown error when searching for " + title 
      });
    });
};


// Delete a serie with the specified id in the request
exports.delete = (req, res) => 
{
  const title = req.params.title;

  serieModel.findOneAndDelete({'title': title})
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete serie with title=${title}. Maybe serie was not found!`
        });
      } else {
        res.status(200).send({message: "Serie was deleted successfully!"});
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 
          err.message || "Could not delete serie with title=" + title
      });
    });
};

// Delete all series from the database.
exports.deleteAll = (req, res) => 
{  
  serieModel.deleteMany({})
    .then(data => {
      res.status(200).send({
        message: `${data.deletedCount} series were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all series."
      });
    });
};
