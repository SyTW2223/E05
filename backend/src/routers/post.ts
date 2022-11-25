import express from 'express';
import {Film} from '../models/film';

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