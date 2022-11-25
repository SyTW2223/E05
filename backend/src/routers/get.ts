import express from 'express';
import {Serie} from '../models/serie';
import {Book} from '../models/book';
import {Film} from '../models/film';
import {User} from '../models/user';



export const getRouter = express.Router();

/**
 * Consulta de una pelicula mediante query string
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
 * Consulta de una pelicula mediante un parámetro
 */
getRouter.get('/film/:id', async (req, res) => {
  try {
    const film = await Film.findById(req.params.id);
    if (!film) {
      return res.status(404).send();
    }

    return res.send(film);
  } catch (error) {
    return res.status(500).send();
  }
});


/**
 * Consulta de una serie mediante query string
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
 * Consulta de una serie mediante un parámetro
 */
getRouter.get('/serie/:id', async (req, res) => {
  try {
    const serie = await Serie.findById(req.params.id);
    if (!serie) {
      return res.status(404).send();
    }

    return res.send(serie);
  } catch (error) {
    return res.status(500).send();
  }
});

/**
 * Consulta de un libro mediante query string
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
 * Consulta de un libro mediante un parámetro
 */
getRouter.get('/book/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send();
    }

    return res.send(book);
  } catch (error) {
    return res.status(500).send();
  }
});


/**
 * Consulta de un usuario mediante query string
 */
 getRouter.get('/user', async (req, res) => {
  const filter = req.query.name?{name: req.query.name.toString()}:{};

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

/**
 * Consulta de un usuario mediante un parámetro
 */
getRouter.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }

    return res.send(user);
  } catch (error) {
    return res.status(500).send();
  }
});