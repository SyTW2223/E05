const listModel = require("../models/list.model");


// Create and Save a new list
exports.create = async (req, res) => {
  //console.log('esto es create en list.controler');
  const allowedUpdates = ['users', 'id', 'name', 'items'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'Update is not permitted. Check the parameters.',
    });
  }
  // Create a list
  const newList = new listModel({
    name: req.body.name,
    id: req.body.id,
    items: req.body.items,
    users: req.body.users,
  });

  // Save list in the database
  newList.save().then(data => {
      res.status(201).send(data);
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Error create list."
      });
    });
};


// Update a list by the name in the request
exports.update = (req, res) => {
  //console.log('esto es update en list.controler');
  // si no hay datos nuevos no podra actualizarse
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const allowedUpdates = ['users', 'id', 'name', 'items'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'Update is not permitted. Check the parameters.',
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
      } else res.status(200).send({ message: "List was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: 
          err.message || "Error updating list with name=" + name
      });
    });
};


// Retrieve all elements from the database.
exports.findAll = (req, res) => {
  //console.log('esto es findAll en list.controler');
  
  listModel.find()
    .then(data => {
      res.status(200).send(data);
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Error found lists."
      });
    });
};

// Find a element with an name
exports.findOne = (req, res) => {
  //console.log('esto es findOne en list.controler');
  const name = req.params.name;
  listModel.findOne({'name': name}).then(data => {
      if (!data)
        res.status(404).send({ message: "Not found list with name " + name });
      else res.status(200).send(data);
    }).catch(err => {
      res.status(500).send({ message: 
        err.message || "Unknown error when searching for " + name });
    });
};


// Delete a list with the specified id in the request
exports.delete = (req, res) => {
  //console.log('esto es delete en list.controler');
  
  const name = req.params.name;

  listModel.findOneAndDelete({'name': name})
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete list with name=${name}. Maybe list was not found!`
        });
      } else {
        res.status(200).send({
          message: "List was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 
          err.message || "Could not delete list with name=" + name
      });
    });
};

// Delete all lists from the database.
exports.deleteAll = (req, res) => {
  //console.log('esto es deleteAll en list.controler');
  
  listModel.deleteMany({})
    .then(data => {
      res.status(200).send({
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
