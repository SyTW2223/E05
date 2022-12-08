const db = require("../models");
const film = db.films;

// Create and Save a new film
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Debe tener un titulo!" });
    return;
  }

  // Create a film
  const film = new film({
    title: req.body.title,
    description: req.body.description,
    categorys: req.body.categorys,
  });

  // Save film in the database
  film.save(film).then(data => {
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
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const title = req.params.title;

  film.findOneAndUpdate(title, req.body, { useFindAndModify: false })
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
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  film.find(condition)
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
  film.find(title).then(data => {
      if (!data)
        res.status(404).send({ message: "Not found film with title " + id });
      else res.send(data);
    }).catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving film with title=" + title });
    });
};


// Delete a film with the specified id in the request
exports.delete = (req, res) => {
  const title = req.params.title;

  film.findByIdAndRemove(title, { useFindAndModify: false })
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
  film.deleteMany({})
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
