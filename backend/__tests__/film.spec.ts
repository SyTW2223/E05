import supertest from 'supertest';
import {app} from '../src/app';
import 'mocha';


describe('API FILM succes', () => {
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
      await supertest(app).get('/film').send({title: "film2"}).expect(201);
      /*expect(response.body).to.include({
        id: '5',
        title: 'test2',
        description: 'test filmTest2'
      });*/
    });
    it('Should successfully get update film', async () => {
      await supertest(app).patch('/film').send({"title": "patchtest"}).expect(201);
      //expect(response.body.title).to.equal("patchtest");
    });
    it('Should successfully remove film', async () => {
      await supertest(app).delete('/film').send(film2).expect(201);
    });
    it('Should successfully get all films', async () => {
      await supertest(app).get('/film').send().expect(200);
      /*expect(response.body).to.include({
        id: "2",
        title: "patchtest",
        description: "test filmTest"
      });*/
    });
});

const filmTestError = {
  id: 2,
  title: "test",
  description: "test filmTest"
}

describe('API film errors', () => {
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