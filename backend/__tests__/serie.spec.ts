import supertest from 'supertest';
import {app} from '../src/app';
import 'mocha';
import { Serie } from '../src/models/serie';

/**
 * Testing método post
 */
describe('API SERIE succes', () => {
  before(async () => {
    await Serie.deleteMany();
  });
  let serie = {
    id: 2,
    name: "serie1",
    description: "test serie1"
  };
  let serie2 = {
    id: 5,
    name: "serie2",
    description: "test serie2"
  };
    it('Should successfully insert a new serie', async () => {
      await supertest(app).post('/serie').send(serie).expect(201);
      await supertest(app).post('/serie').send(serie2).expect(201);
    });
    it('Should successfully get a serie2', async () => {
      await supertest(app).get('/serie/').send(serie2).expect(200);
    });
    // it('Should successfully get update serie', async () => {
    //   await supertest(app).patch('/serie').send({"title": "patchtest"}).expect(201);
    //   //expect(response.body.title).to.equal("patchtest");
    // });
    // it('Should successfully remove serie', async () => {
    //   await supertest(app).delete('/serie').send(serie2).expect(201);
    // });
    it('Should successfully get all series', async () => {
      await supertest(app).get('/serie').send().expect(200);
    });
});


describe('API serie errors', () => {
  const serieTestError = {
    id: 2,
    title: "test",
    description: "test serieTest"
  };
  it('Should error at insert a new serie', async () => {
    await supertest(app).post('/serie').send(serieTestError).expect(400);
  });
  it('Should error get update serie', async () => {
    await supertest(app).patch('/serie').send({"title": "uuuh"}).expect(400);
  });
  it('Should error remove serie', async () => {
    await supertest(app).delete('/serie').send({"title": "uuuuh"}).expect(400);
  });
  it('Should error becouse rute not exist', async () => {
    await supertest(app).delete('/serie/hola').send({"title": "uuuuh"}).expect(501);
  });
});