const { createImportTypeNode } = require("typescript");
const userModel = require("../models/user.model");

const jwt = require('jsonwebtoken');
const crypt = require('bcryptjs');

// Create and Save a new user (register)
exports.create = async (req, res) => {
  console.log('esto es create en user.controler');
  // Create a user
  const newUser = new userModel({
    id: req.body.id,
    username: req.body.username,
    email: req.body.email,
    password: crypt.hashSync(req.body.password, 10),
    roles: req.body.roles,
  });

  // Save user in the database
  newUser.save().then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message:
          "Error al crear el elemento."
      });
    });
};


// login



// Update a user by the username in the request
exports.update = (req, res) => {
  console.log('esto es update en user.controler');
  // si no hay datos nuevos no podra actualizarse
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  
  const username = req.params.username;
  // busca el libro original para actualizarlo
  userModel.findOneAndUpdate({'username': username}, req.body, { new: true })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update user with username=${username}. Maybe user was not found!`
        });
      } else res.send({ message: "user was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating user with username=" + username
      });
    });
};


// Retrieve all elements from the database.
exports.findAll = (req, res) => {
  console.log('esto es findAll en user.controler');
  
  userModel.find()
    .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Error al buscar los elementos."
      });
    });
};

// Find a element with an username
exports.findOne = (req, res) => {
  console.log('esto es findOne en user.controler');
  const username = req.params.username;
  userModel.findOne({'username': username}).then(data => {
      if (!data)
        res.status(404).send({ message: "Not found user with username " + username });
      else res.send(data);
    }).catch(err => {
      res.status(500).send({ message: "Unknown error when searching for " + username });
    });
};


// Delete a user with the specified id in the request
exports.delete = (req, res) => {
  console.log('esto es delete en user.controler');
  
  const username = req.params.username;

  userModel.findOneAndDelete({'username': username})
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete user with username=${username}. Maybe user was not found!`
        });
      } else {
        res.send({
          message: "user was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete user with username=" + username
      });
    });
};

// Delete all users from the database.
exports.deleteAll = (req, res) => {
  console.log('esto es deleteAll en user.controler');
  
  userModel.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} users were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    });
};
