const serieModel = require("../models/serie.model");


// Create and Save a new serie
exports.create = async (req, res) => {
  //console.log('esto es create en serie.controler');
  // Create a serie
  const newSerie = new SerieModel({
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    seasons: req.body.seasons,
    categories: req.body.categories,
    rating: req.body.rating,
  });

  // Save Serie in the database
  newSerie.save().then(data => {
      res.status(201).send(data);
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Error al crear la serie."
      });
    });
};


// Update a serie by the title in the request
exports.update = (req, res) => {
  //console.log('esto es update en serie.controler');
  // si no hay datos nuevos no podra actualizarse
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
      } else res.send({ message: "serie was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating serie with title=" + title
      });
    });
};


// Retrieve all elements from the database.
exports.findAll = (req, res) => {
  //console.log('esto es findAll en serie.controler');
  
  serieModel.find()
    .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Error al buscar las series."
      });
    });
};

// Find a element with an title
exports.findOne = (req, res) => {
  //console.log('esto es findOne en serie.controler');
  const title = req.params.title;
  serieModel.findOne({'title': title}).then(data => {
      if (!data)
        res.status(404).send({ message: "Not found serie with title " + title });
      else res.send(data);
    }).catch(err => {
      res.status(500).send({ message: "Unknown error when searching for " + title });
    });
};


// Delete a serie with the specified id in the request
exports.delete = (req, res) => {
  //console.log('esto es delete en serie.controler');
  
  const title = req.params.title;

  serieModel.findOneAndDelete({'title': title})
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete serie with title=${title}. Maybe serie was not found!`
        });
      } else {
        res.send({
          message: "Serie was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete serie with title=" + title
      });
    });
};

// Delete all series from the database.
exports.deleteAll = (req, res) => {
  //console.log('esto es deleteAll en serie.controler');
  
  serieModel.deleteMany({})
    .then(data => {
      res.send({
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
