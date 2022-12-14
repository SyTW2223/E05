import express from 'express';
import {Film} from '../models/film';
import {Book} from '../models/book';
import {Serie} from '../models/serie';
import {User} from '../models/user';
import {List} from '../models/list';

import authenticateToken from '../middlewares/authJwt';

const jwt = require('jsonwebtoken');
const cript = require('bcryptjs');

export const postRouter = express.Router();

/**
 * Creacion de una pelicula
 */
postRouter.post('/film', async (req, res) => {
  const film = new Film(req.body);

  try {
    await film.save();
    return res.status(201).send(film);
  } catch (error) {
    return res.status(400).send(error);
  }
});


/**
 * Creacion de un libro
 */
postRouter.post('/book', async (req, res) => {
  const book = new Book(req.body);

  try {
    await book.save();
    return res.status(201).send(book);
  } catch (error) {
    return res.status(400).send(error);
  }
});


/**
 * Creacion de una serie
 */
postRouter.post('/serie', async (req, res) => {
  const serie = new Serie(req.body);

  try {
    await serie.save();
    return res.status(201).send(serie);
  } catch (error) {
    return res.status(400).send(error);
  }
});


/**
 * Creacion de un usuario
 */
postRouter.post('/user', async (req, res) => {
  let passwd = await cript.hash(req.body.password, 10);
  const user = new User({
    username: req.body.username,
    name: req.body.name,
    password: passwd,
    email: req.body.email,
    dob: req.body.dob,
    list: req.body.lists
  });
  try {
    await user.save();
    return res.status(201).send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
});


/**
 * Comprobar si un usuario está registrado
 */
 postRouter.post('/login', (req, res) => {
  if (!req.body.username) {
    // Esta parte funciona
    res.status(400).send({
      error: 'Se debe añadir el nombre de usuario',
    })
  } else {
    const filter = { username: req.body.username.toString() };
    User.findOne(filter).then(async (user) => {
      const pass = req.body.password.toString();
      if (user === null) {
        // Esto funciona
        res.status(404).send("No se encuentra al usuario");
      } else {
        let compare = await cript.compare(pass, user.password);
        
        if (compare) {
          const name = user.username;
          const usuario = { username: name };
          const accessToken = jwt.sign(usuario, process.env.TOKEN_SECRET);

          // El programa llega bien hasta aquí pero una vez llega no crea el token o no lo envia
          // y no se porque 
          res.send({
            "Token de acceso": accessToken
          });
        } else {
          // Esta parte funciona
          res.status(404).send("Constraseña incorrecta");
        }
      }
    }).catch(() => {
      res.status(500).send();
    });
  }
});

/**
 * Creacion de una lista en la base de datos
 */
postRouter.post('/list', async (req, res) => {
  const list = new List(req.body);
  try {
    await list.save();
    return res.status(201).send(list);
  } catch (error) {
    return res.status(400).send(error);
  }
});