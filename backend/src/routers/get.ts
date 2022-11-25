import express from 'express';
import {Serie} from '../models/serie';
import {Book} from '../models/book';
import {Film} from '../models/film';
import {User} from '../models/user';



export const getRouter = express.Router();

/**
 * Consulta de una pelicula
 */
getRouter.get('/film', async (req, res) => {
  const filter = req.query.name?{name: req.query.name.toString()}:{};

  try {
    const film = await Film.find(filter);
    if (film.length !== 0) {
      return res.send(film);
    }

    return res.status(404).send();
  } catch (error) {
    return res.status(500).send();
  }
});


/**
 * Consulta de una serie
 */
getRouter.get('/serie', async (req, res) => {
  const filter = req.query.name?{name: req.query.name.toString()}:{};

  try {
    const serie = await Serie.find(filter);
    if (serie.length !== 0) {
      return res.send(serie);
    }

    return res.status(404).send();
  } catch (error) {
    return res.status(500).send();
  }
});

/**
 * Consulta de un libro 
 */
getRouter.get('/book', async (req, res) => {
  const filter = req.query.name?{name: req.query.name.toString()}:{};

  try {
    const book = await Book.find(filter);
    if (book.length !== 0) {
      return res.send(book);
    }

    return res.status(404).send();
  } catch (error) {
    return res.status(500).send();
  }
});


/**
 * Consulta de un usuario 
 */
 getRouter.get('/user', async (req, res) => {
  const filter = req.query.username?{username: req.query.username.toString()}:{};

  try {
    const user = await User.find(filter);
    if (user.length !== 0) {
      return res.send(user);
    }

    return res.status(404).send();
  } catch (error) {
    return res.status(500).send();
  }
});
