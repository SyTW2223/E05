const db = require("../models/");
const { user: userModel, refreshToken: RefreshToken } = db;
const jwt = require('jsonwebtoken');
const crypt = require('bcryptjs');
const config = require("../config/auth.config");

// Create and Save a new user 
exports.create = async (req, res) => {
  //console.log('esto es create en user.controler');
  const allowedCreated = ['id', 'username', 'email', 'password', 'role'];
  const actualCreated = Object.keys(req.body);
  const isValidCreate = actualCreated.every((create) => allowedCreated.includes(create));

  if (!isValidCreate) {
    return res.status(400).send({
      error: 'Create is not permitted. Check the parameters. [id, username, email, password]',
    });
  }

  // check email exist and send error
  const isEmailExist = await userModel.findOne({"email": req.body.email});
  if (isEmailExist) {
    return res.status(400).json({error: "Email already exist."});
  };
  // check email exist and send error
  const isUsernameExist = await userModel.findOne({"username": req.body.username});
  if (isUsernameExist) {
    return res.status(400).json({error: "Username already exist."});
  };

  // password hash
  const salt = await crypt.genSalt(10);
  const password = await crypt.hash(req.body.password, salt);

  // create new user
  const newUser = new userModel({
    id: req.body.id,
    username: req.body.username,
    email: req.body.email,
    password: password,
    role: req.body.role,
  });

  // Save user in the database
  newUser.save().then(() => {
      res.status(201).send({ message: "Succesfull created user." });
    }).catch(err => {
      res.status(500).send({
        message: 
          err.message || "Error created user."
      });
    });
};




// Login user
exports.login = async (req, res) => {
  // validations
  const allowedLogin = ['username', 'password'];
  const actualLogin = Object.keys(req.body);
  const isValidLogin = actualLogin.every((login) => allowedLogin.includes(login));

  if (!isValidLogin) {
    return res.status(400).send({
      error: 'Login is not permited. Check the parameters. [username, password]',
    });
  }

  // find a username
  const user = await userModel.findOne({ username: req.body.username });
  if (!user) return res.status(400).json({ error: 'User not found.' });

  // if user found, check password and send tokenJWT
  crypt.compare(req.body.password, user.password, async function(err, response) {
    if (err){
      console.log(err.message);
    }
    if (response) {
      const token = jwt.sign({
        name: user.username,
        id: user._id
      }, config.secret, {
        expiresIn: config.jwtExpiration,
      });
      const refreshToken = await RefreshToken.createToken(user);
      res.status(200).header('x-access-token', token).json({
        error: null,
        data: {
          accessToken: token,
          refreshToken: refreshToken,
          username: user.username,
          email: user.email,
          role: user.role,
        }
      });
    } else {
      res.status(400).send({ error: "Invalid password." });
    }
  });
};



// crea nuevo token al haber expirado
exports.refreshToken = async (req, res) => {
  const requestToken = req.body.refreshToken;
  if (requestToken == null) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }
  try {
    let refreshToken = await RefreshToken.findOne({ token: requestToken });
    if (!refreshToken) {
      res.status(403).json({ message: "Refresh token is not in database!" });
      return;
    }
    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.findByIdAndRemove(refreshToken._id, { useFindAndModify: false }).exec();
      res.status(403).json({
        message: "Refresh token was expired. Please make a new signin request.",
      });
      return;
    }
    let newAccessToken = jwt.sign({ id: refreshToken.user._id }, config.secret, {
      expiresIn: config.jwtExpiration,
    });
    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};



// exist account
exports.logout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};



// Update a user by the username in the request
exports.update = (req, res) => {
  //console.log('esto es update en user.controler');
  // si no hay datos nuevos no podra actualizarse
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const allowedUpdates = ['username', 'email', 'password', 'role'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'Update is not permitted. Check the parameters.',
    });
  }
  


  const username = req.params.username;
  // busca el usuario original para actualizarlo
  userModel.findOneAndUpdate({'username': username}, req.body, { new: true })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update user with username=${username}. Maybe user was not found!`
        });
      } else res.send({ message: "User was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: 
          err.message || "Error updating user with username=" + username
      });
    });
};



// Retrieve all elements from the database.
exports.findAll = (req, res) => {
  //console.log('esto es findAll en user.controler');
  userModel.find()
    .then(data => {
      res.status(200).send(data);
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Error found user."
      });
    });
};



// Find a element with an username
exports.findOne = async (req, res) => {
  //console.log('esto es findOne en user.controler');
  const username = req.params.username;
  userModel.findOne({'username': username}).then(data => {
      if (!data)
        res.status(404).send({ message: "Not found user with username " + username });
      else res.status(200).send(data);
    }).catch(err => {
      res.status(500).send({ message: 
        err.message || "Unknown error when searching for " + username
      });
    });
};



// Delete a user with the specified id in the request
exports.delete = (req, res) => {
  //console.log('esto es delete en user.controler');
  
  const username = req.params.username;

  userModel.findOneAndDelete({'username': username})
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete user with username=${username}. Maybe user was not found!`
        });
      } else {
        res.status(200).send({
          message: "User was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 
          err.message || "Could not delete user with username=" + username
      });
    });
};



// Delete all users from the database.
exports.deleteAll = (req, res) => {
  //console.log('esto es deleteAll en user.controler');
  
  userModel.deleteMany({})
    .then(data => {
      res.status(200).send({
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
