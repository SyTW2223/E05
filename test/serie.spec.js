let supertest = require('supertest');
let app = require('../src/server');
let mocha = require('mocha');

/**
 * Testing series
 */
describe('API SERIE succes.', () => {
  let serie = {
    title: "serieTest1",
    description: "test serie1",
    seasons: 3,
    yearPublication: 2021,
    genres: ['Accion'],
    rating: 4
  };
  let serie2 = {
    title: "serieTest2",
    description: "test serie2",
    seasons: 1,
    yearPublication: 2000,
    genres: ['Accion'],
    rating: 9
  };
  it('Should successfully insert a new serie.', async () => {
    await supertest(app).post('/serie').send(serie).expect(201);
    await supertest(app).post('/serie').send(serie2).expect(201);
  });
  it('Should successfully get a serie2.', async () => {
    await supertest(app).get(`/serie/${serie.title}`).send().expect(200);
  });
  it('Should successfully get all series.', async () => {
    await supertest(app).get('/serie').send().expect(200);
  });
  it('Should successfully get update a serie.', async () => {
    await supertest(app).patch(`/serie/${serie.title}`).send({"seasons": 3}).expect(200);
    await supertest(app).patch(`/serie/${serie.title}`).send({"description": "Modify description tests"}).expect(200);
    await supertest(app).patch(`/serie/${serie2.title}`).send({"rating": 8}).expect(200);
  });
  it('Should successfully remove a serie2.', async () => {
    await supertest(app).delete(`/serie/${serie.title}`).send().expect(200);
    await supertest(app).delete(`/serie/${serie2.title}`).send().expect(200);
  });
});


describe('API serie errors.', () => {
  const serieTestError = {
    title: "test",
    description: "test serieTest"
  };
  it('Should error at insert a new serie.', async () => {
    await supertest(app).post('/serie').send(serieTestError).expect(500);
  });
  it('Should error get update serie because wrong parameter.', async () => {
    await supertest(app).patch(`/serie/${serieTestError.title}`).send({"seassons": 3}).expect(400);
  });
  it('Should error remove serie.', async () => {
    await supertest(app).delete(`/serie/notexist`).send().expect(404);
  });
  it('Should error becouse rute not exist.', async () => {
    await supertest(app).delete('/series').send().expect(404);
  });
});
