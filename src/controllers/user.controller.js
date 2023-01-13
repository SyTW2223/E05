const db = require("../models/");
const { user: userModel, refreshToken: RefreshToken } = db;
const jwt = require('jsonwebtoken');
const crypt = require('bcryptjs');
const config = require("../config/auth.config");
const { schemaLogin:loginVal } = require('../validations/login.validation');
const { schemaRegister:registerVal } = require('../validations/register.validation');
const { createPredefinedList } = require("../managements/userLists.js");



// Create and Save a new user 
exports.create = async (req, res) => 
{
  const { error } = registerVal.validate(req.body);
  if (error) {
    return res.status(400).json({error: error.details[0].message})
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

  // predefined lists
  let lists = [];
  console.log(req.body.role)
  if (!req.body.role.includes("ADMIN")) {
    try {
      lists = await createPredefinedList();
    } catch (_err) {
        console.log("Error al crear las listas en controller.usuario", _err);
        return;
    }
  } 

  // create new user
  const newUser = new userModel({
    username: req.body.username,
    email: req.body.email,
    password: password,
    role: req.body.role,
    lists: lists,
  });
  // Save user in the database
  newUser.save()
  .then(() => {
    res.status(201).send({ message: "Succesfull created user." });
  })
  .catch(err => {
    res.status(500).send({
      message: 
        err.message || "Error created user."
    });
  }); 
};



// Login user
exports.login = async (req, res) => 
{
  // validations
  const { error } = loginVal.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message })

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
      // const refreshToken = await RefreshToken.createToken(user);
      res.status(200).header('x-access-token', token).json({
        error: null,
        data: {
          accessToken: token,
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


// exist account
exports.logout = async (req, res) => 
{
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};



// Update a user by the username in the request
exports.update = (req, res) => 
{
  // si no hay datos nuevos no podra actualizarse
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const allowedUpdates = ['username', 'email', 'password', 'role', 'lists'];
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
exports.findAll = (req, res) => 
{
  userModel.find()
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error found user."
      });
    });
};



// Find a element with an username
exports.findOne = async (req, res) => 
{
  const username = req.params.username;
  userModel.findOne({'username': username})
  .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found user with username " + username });
      else res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({ message: 
        err.message || "Unknown error when searching for " + username
      });
    });
};



// Delete a user with the specified id in the request
exports.delete = (req, res) => 
{
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
exports.deleteAll = (req, res) => 
{
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
