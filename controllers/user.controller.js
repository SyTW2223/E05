/*
  Controller for testing Authorization
    – /api/test/all for public access
    – /api/test/user for loggedin users (any role)
    – /api/test/admin for admin users
 */


// Create and Save a new user
exports.create = (req, res) => {/*
  // Validate request
  if (!req.body.username) {
    res.status(400).send({ message: "Debe tener un titulo!" });
    return;
  }

  // Create a user
  const user = new user({
    username: req.body.username,
    description: req.body.description,
    categorys: req.body.categorys,
  });

  // Save user in the database
  user.save(user).then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Error al crear el elemento."
      });
    });*/
};



// Update a user by the username in the request
exports.update = (req, res) => {/*
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const username = req.params.username;

  user.findOneAndUpdate(username, req.body, { useFindAndModify: false })
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
    });*/
};


// Retrieve all elements from the database.
exports.findAll = (req, res) => {/*
  const username = req.query.username;
  var condition = username ? { username: { $regex: new RegExp(username), $options: "i" } } : {};

  user.find(condition)
    .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Error al buscar los elementos."
      });
    });*/
};

// Find a element with an username
exports.findOne = (req, res) => {/*
  const username = req.query.name?{name: req.query.name.toString()}:{};
  user.find(username).then(data => {
      if (!data)
        res.status(404).send({ message: "Not found user with username " + id });
      else res.send(data);
    }).catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving user with username=" + username });
    });*/
};


// Delete a user with the specified id in the request
exports.delete = (req, res) => {/*
  const username = req.params.username;

  user.findByIdAndRemove(username, { useFindAndModify: false })
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
    });*/
};

// Delete all users from the database.
exports.deleteAll = (req, res) => {
  /*
  user.deleteMany({})
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
    });*/
};

