import supertest from 'supertest';
import {app} from '../src/app';
import 'mocha';
import { Film } from '../src/models/film';


describe('API FILM succes', () => {
  before(async () => {
    await Film.deleteMany();
  });
  let film = {
    id: 2,
    name: "film1",
    description: "test film1"
  };
  let film2 = {
    id: 5,
    name: "film2",
    description: "test film2"
  };
  it('Should successfully insert a new film', async () => {
    await supertest(app).post('/film').send(film).expect(201);
    await supertest(app).post('/film').send(film2).expect(201);
  });
  it('Should successfully get a film2', async () => {
    await supertest(app).get('/film').send(film2).expect(200);
  });
  // it('Should successfully get update film', async () => {
  //   await supertest(app).patch('/film').send({"title": "patchtest"}).expect(201);
  //   //expect(response.body.title).to.equal("patchtest");
  // });
  // it('Should successfully remove film', async () => {
  //   await supertest(app).delete('/film').send(film2).expect(201);
  // });
  it('Should successfully get all films', async () => {
    await supertest(app).get('/film').send().expect(200);
  });
});

describe('API film errors', () => {
  const filmTestError = {
    id: 2,
    title: "test",
    description: "test filmTest"
  };
  it('Should error at insert a new film', async () => {
    await supertest(app).post('/film').send(filmTestError).expect(400);
  });
  it('Should error get update film', async () => {
    await supertest(app).patch('/film').send({"title": "iiiih"}).expect(400);
  });
  it('Should error remove film', async () => {
    await supertest(app).delete('/film').send({"title": "iiiih"}).expect(400);
  });
});