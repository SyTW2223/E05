const filmModel = require("../models/film.model");


// Create and Save a new film
exports.create = async (req, res) => {
  console.log('esto es create en film.controler');
  // Create a film
  const newFilm = new filmModel({
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    categorys: req.body.categorys,
    rating: req.body.categorys,
  });

  // Save film in the database
  newFilm.save().then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Error al crear el elemento."
      });
    });
};


// Update a film by the title in the request
exports.update = (req, res) => {
  console.log('esto es update en film.controler');
  // si no hay datos nuevos no podra actualizarse
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({
      message: "Data to update can not be empty!"
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
      } else res.send({ message: "film was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating film with title=" + title
      });
    });
};


// Retrieve all elements from the database.
exports.findAll = (req, res) => {
  console.log('esto es findAll en film.controler');
  
  filmModel.find()
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
  console.log('esto es findOne en film.controler');
  const title = req.params.title;
  filmModel.findOne({'title': title}).then(data => {
      if (!data)
        res.status(404).send({ message: "Not found film with title " + title });
      else res.send(data);
    }).catch(err => {
      res.status(500).send({ message: "Unknown error when searching for " + title });
    });
};


// Delete a film with the specified id in the request
exports.delete = (req, res) => {
  console.log('esto es delete en film.controler');
  
  const title = req.params.title;

  filmModel.findOneAndDelete({'title': title})
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete film with title=${title}. Maybe film was not found!`
        });
      } else {
        res.send({
          message: "film was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete film with title=" + title
      });
    });
};

// Delete all films from the database.
exports.deleteAll = (req, res) => {
  console.log('esto es deleteAll en film.controler');
  
  filmModel.deleteMany({})
    .then(data => {
      res.send({
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
