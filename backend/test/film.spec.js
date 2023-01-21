let supertest = require('supertest');
let app = require('../src/server');
let mocha = require('mocha');
let Film = require('../src/models/film.model');


describe('API FILM succes', () => {
  let film = {
    title: "film1",
    description: "test film1",
    genres: ['Comedia'],
    yearPublication: 2020,
    rating: 5
  };
  let film2 = {
    title: "film2",
    description: "test film2",
    genres: ['Comedia', 'Romance'],
    yearPublication: 2020,
    rating: 5
  };
  var dataFilm;
  var dataFilm2;
  var obj = {};
  var obj2 = {};

  it('Should successfully insert a new film.', async () => {
    dataFilm = await supertest(app).post('/film').send(film).expect(201);
    dataFilm2 = await supertest(app).post('/film').send(film2).expect(201);

    // para obtener _id
    dataFilm = dataFilm.text.replace('{', '').replace('}','').replaceAll('"', '').split(',')
    for (var i = 0; i < dataFilm.length; i++) {
        var split = dataFilm[i].split(':');
        obj[split[0].trim()] = split[1].trim();
    }

    for (var i = 0; i < dataFilm.length; i++) {
        var split = dataFilm[i].split(':');
        obj2[split[0].trim()] = split[1].trim();
    }
  });
  it('Should successfully get a film2', async () => {
    await supertest(app).get(`/film/${obj2._id}`).send().expect(200);
  });
  it('Should successfully get all films', async () => {
    await supertest(app).get('/film').send().expect(200);
  });
  it('Should successfully get update a film', async () => {
    await supertest(app).patch(`/film/${film.title}`).send({"rating": 3}).expect(200);
    await supertest(app).patch(`/film/${film.title}`).send({"description": "Modify description tests"}).expect(200);
    await supertest(app).patch(`/film/${film.title}`).send({"yearPublication": 2022}).expect(200);
  });
  it('Should successfully remove a film2', async () => {
    await supertest(app).delete(`/film/${film.title}`).send().expect(200);
    await supertest(app).delete(`/film/${film2.title}`).send().expect(200);
  });
});

describe('API film errors', () => {
  const filmTestError = {
    title: "film test error",
    description: "test error",
    genre: ['Romance'],
    yearPublication: 2020,
    rating: 5
  };
  it('Should error at insert a new film for wrong parameters', async () => {
    await supertest(app).post('/film').send(filmTestError).expect(400);
  });
  it('Should error get update film', async () => {
    await supertest(app).patch(`/film/${filmTestError.title}`).send({"tittle": "iiiih"}).expect(400);
  });
  it('Should error remove film because not exist', async () => {
    await supertest(app).delete('/film/noexist').send().expect(404);
  });
  it('Should error with get when path is wrong.', async () => {
    await supertest(app).get('/hola').send().expect(404);
  });
});
