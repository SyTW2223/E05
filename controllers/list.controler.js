const listModel = require("../models/list.model");


// Create and Save a new list
exports.create = async (req, res) => {
  console.log('esto es create en list.controler');
  // Create a list
  const newList = new listModel({
    name: req.body.name,
    id: req.body.id,
    items: req.body.items,
    users: req.body.users,
  });

  // Save list in the database
  newList.save().then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Error al crear el elemento."
      });
    });
};


// Update a list by the name in the request
exports.update = (req, res) => {
  console.log('esto es update en list.controler');
  // si no hay datos nuevos no podra actualizarse
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  
  const name = req.params.name;
  // busca el libro original para actualizarlo
  listModel.findOneAndUpdate({'name': name}, req.body, { new: true })
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
    });
};


// Retrieve all elements from the database.
exports.findAll = (req, res) => {
  console.log('esto es findAll en list.controler');
  
  listModel.find()
    .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Error al buscar los elementos."
      });
    });
};

// Find a element with an name
exports.findOne = (req, res) => {
  console.log('esto es findOne en list.controler');
  const name = req.params.name;
  listModel.findOne({'name': name}).then(data => {
      if (!data)
        res.status(404).send({ message: "Not found list with name " + name });
      else res.send(data);
    }).catch(err => {
      res.status(500).send({ message: "Unknown error when searching for " + name });
    });
};


// Delete a list with the specified id in the request
exports.delete = (req, res) => {
  console.log('esto es delete en list.controler');
  
  const name = req.params.name;

  listModel.findOneAndDelete({'name': name})
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
    });
};

// Delete all lists from the database.
exports.deleteAll = (req, res) => {
  console.log('esto es deleteAll en list.controler');
  
  listModel.deleteMany({})
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
    });
};
