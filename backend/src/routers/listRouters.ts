import * as express from 'express';
import {List} from '../models/list';


export const listRouter = express.Router();

// POST
/**
 * Crea una lista en la base de datos
 */
listRouter.post('/list', async (req, res) => {
  const list = new List(req.body);
  try {
    await list.save();
    return res.status(201).send(list);
  } catch (error) {
    return res.status(400).send(error);
  }
});

// GET
/**
 * Consulta una lista por nombre
 */
listRouter.get('/lists', async (req, res) => {
  const filter = req.query.name?{name: req.query.name?.toString()}:{};
  try {
    const lists = await List.find(filter);
    if (lists.length !== 0) {
      return res.send(lists);
    }

    return res.status(404).send();
  } catch (error) {
    return res.status(500).send();
  }
});

/**
 * Consulta una lista por id
 */
listRouter.get('/lists/:id', async (req, res) => {
  try {
    const film = await List.findById(req.params.id);
    if (!film) {
      return res.status(404).send();
    }

    return res.send(film);
  } catch (error) {
    return res.status(500).send();
  }
});

// PATCH
/**
 * Actualiza la lista por nombre
 */
listRouter.patch('/list', async (req: any, res) => {
  if (!req.query.name) {
    res.status(400).send({
      error: 'A name must be provided',
    });
  }

  const allowedUpdates = ['name', 'listId', 'usersId', 'itemsId'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate =
    actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    res.status(400).send({
      error: 'Update is not permitted',
    });
  }
  try {
    const element = await List.findOneAndUpdate({name: req.query.name.toString()}, req.body, {
      new: true,
      runValidators: true,
    });

    if (!element) {
      return res.status(404).send();
    }

    return res.send(element);
  } catch (error) {
    return res.status(400).send(error);
  }
});

/**
 * Actualiza la lista por id
 */
listRouter.patch('/lists/:id', async (req, res) => {
  const allowedUpdates = ['name', 'listId', 'usersId', 'itemsId'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate =
    actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    res.status(400).send({
      error: 'Update is not permitted',
    });
  }
  try {
    const element = await List.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!element) {
      return res.status(404).send();
    }
    return res.send(element);
  } catch (error) {
    return res.status(400).send(error);
  }
});

// DELETE
/**
 * Elimina una lista por nombre
 */
listRouter.delete ('/lists', async (req:any, res) => {
  if (!req.query.name) {
    res.status(400).send({
      error: 'A name must be provided',
    });
  }
  try {
    const element = await List.findOneAndDelete({name: req.query.name.toString()});

    if (!element) {
      return res.status(404).send();
    }

    return res.send(element);
  } catch (error) {
    return res.status(400).send();
  }
});
/**
 * Elimina una lista por id
 */
listRouter.delete ('/lists/:id', async (req, res) => {
  if (!req.query.listId) {
    res.status(400).send({
      error: 'A id must be provided',
    });
  }
  try {
    const element = await List.findOneAndDelete({name: req.query.listId?.toString()});

    if (!element) {
      return res.status(404).send();
    }

    return res.send(element);
  } catch (error) {
    return res.status(400).send();
  }
});
