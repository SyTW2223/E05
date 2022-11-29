import express from 'express';
import {Film} from '../models/film';
import {Book} from '../models/book';
import {Serie} from '../models/serie';
import {User} from '../models/user';
import {List} from '../models/list';

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
  const user = new User(req.body);

  try {
    await user.save();
    return res.status(201).send(user);
  } catch (error) {
    return res.status(400).send(error);
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