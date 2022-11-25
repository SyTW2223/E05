import express from 'express';
import {Film} from '../models/film';
// import {Book} from '../models/book';
// import {Serie} from '../models/serie';
// import {User} from '../models/user';
import {List} from '../models/list';



export const patchRouter = express.Router();

/**
 * Actualización de una pelicula
 */
patchRouter.patch('/film', async (req, res) => {
  if (!req.query.name) {
    return res.status(400).send({
      error: 'A name must be provided',
    });
  }

  const allowedUpdates = ['decription', 'rating', 'yearPublication'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'Update is not permitted',
    });
  }

  try {
    const film = await Film.findOneAndUpdate({name: req.query.name.toString()}, req.body, {
      new: true,
      runValidators: true,
    });

    if (!film) {
      return res.status(404).send();
    }

    return res.send(film);
  } catch (error) {
    return res.status(400).send(error);
  }
});


/**
 * Actualiza la lista por nombre
 */
patchRouter.patch('/list', async (req: any, res) => {
  if (!req.query.name) {
    res.status(400).send({
      error: 'A name must be provided',
    });
  }

  const allowedUpdates = ['name', 'usersId', 'itemsId'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate =
    actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    res.status(400).send({
      error: 'Update is not permitted',
    });
  }
  try {
    const list = await List.findOneAndUpdate({name: req.query.name.toString()}, req.body, {
      new: true,
      runValidators: true,
    });

    if (!list) {
      return res.status(404).send();
    }

    return res.send(list);
  } catch (error) {
    return res.status(400).send(error);
  }
});