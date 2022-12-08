const db = require("../models");
const list = db.lists;

// Create and Save a new list
exports.create = (req, res) => {/*
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Debe tener un titulo!" });
    return;
  }

  // Create a list
  const list = new list({
    name: req.body.name,
  });

  // Save list in the database
  list.save(list).then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Error al crear el elemento."
      });
    });*/
};



// Update a list by the name in the request
exports.update = (req, res) => {/*
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const name = req.params.name;

  list.findOneAndUpdate(name, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update list with name=${name}. Maybe list was not found!`
        });
      } else res.send({ message: "list was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating list with name=" + name
      });
    });*/
};


// Retrieve all elements from the database.
exports.findAll = (req, res) => {/*
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  list.find(condition)
    .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Error al buscar los elementos."
      });
    });*/
};

// Find a element with an name
exports.findOne = (req, res) => {/*
  const name = req.query.name?{name: req.query.name.toString()}:{};
  list.find(name).then(data => {
      if (!data)
        res.status(404).send({ message: "Not found list with name " + id });
      else res.send(data);
    }).catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving list with name=" + name });
    });*/
};


// Delete a list with the specified id in the request
exports.delete = (req, res) => {/*
  const name = req.params.name;

  list.findByIdAndRemove(name, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete list with name=${name}. Maybe list was not found!`
        });
      } else {
        res.send({
          message: "list was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete list with name=" + name
      });
    });*/
};

// Delete all lists from the database.
exports.deleteAll = (req, res) => {/*
  list.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} lists were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all lists."
      });
    });*/
};
