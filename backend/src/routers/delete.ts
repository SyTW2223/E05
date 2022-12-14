import express from 'express';
import {Film} from '../models/film';
import {Book} from '../models/book';
import {Serie} from '../models/serie';
import {User} from '../models/user';
import {List} from '../models/list';

import authenticateToken from '../middlewares/authJwt';


export const deleteRouter = express.Router();

/**
 * Eliminar una pelicula
 */
 deleteRouter.delete('/film', async (req, res) => {
  if (!req.query.name) {
    return res.status(400).send({
      error: 'A name must be provided',
    });
  }

  try {
    const film = await Film.findOneAndDelete({name: req.query.name.toString()});

    if (!film) {
      return res.status(404).send();
    }

    return res.send(film);
  } catch (error) {
    return res.status(400).send();
  }
});

/**
 * Eliminar una serie
 */
 deleteRouter.delete('/serie', async (req, res) => {
  if (!req.query.name) {
    return res.status(400).send({
      error: 'A name must be provided',
    });
  }

  try {
    const serie = await Serie.findOneAndDelete({name: req.query.name.toString()});

    if (!serie) {
      return res.status(404).send();
    }

    return res.send(serie);
  } catch (error) {
    return res.status(400).send();
  }
});


/**
 * Eliminar un libro
 */
 deleteRouter.delete('/book', async (req, res) => {
  if (!req.query.name) {
    return res.status(400).send({
      error: 'A name must be provided',
    });
  }

  try {
    const book = await Book.findOneAndDelete({name: req.query.name.toString()});

    if (!book) {
      return res.status(404).send();
    }

    return res.send(book);
  } catch (error) {
    return res.status(400).send();
  }
});


/**
 * Eliminar un usuario
 */
 deleteRouter.delete('/user', async (req, res) => {
  if (!req.query.username) {
    return res.status(400).send({
      error: 'A name must be provided',
    });
  }

  try {
    const user = await User.findOneAndDelete({username: req.query.username.toString()});

    if (!user) {
      return res.status(404).send();
    }

    return res.send(user);
  } catch (error) {
    return res.status(400).send();
  }
});

/**
 * Elimina una lista por nombre
 */
deleteRouter.delete ('/list', async (req:any, res) => {
  if (!req.query.name) {
    res.status(400).send({
      error: 'A name must be provided',
    });
  }
  try {
    const list = await List.findOneAndDelete({name: req.query.name.toString()});

    if (!list) {
      return res.status(404).send();
    }

    return res.send(list);
  } catch (error) {
    return res.status(400).send();
  }
});