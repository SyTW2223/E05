let supertest = require('supertest');
let app = require('../src/server');
let mocha = require('mocha');

/**
 * Testing list
 */

describe('API LIST succes', () => {
  let list = {
    name: "lista1",

  };
  let list2 = {
    name: "lista2",

  };
  it('Should successfully insert a new list.', async () => {
    await supertest(app).post('/list').send(list).expect(201);
    await supertest(app).post('/list').send(list2).expect(201);
  });
  it('Should successfully get a list2.', async () => {
    await supertest(app).get(`/list/${list2.name}`).send().expect(200);  
  });
  it('Should successfully get update a list.', async () => {
    await supertest(app).patch(`/list/${list.name}`).send({"items": ['serie']}).expect(200);
    await supertest(app).patch(`/list/${list.name}`).send({"name": "patch Tests"}).expect(200);
  });
  it('Should successfully remove lists.', async () => {
    await supertest(app).delete(`/list/patch Tests`).send().expect(200);
    await supertest(app).delete(`/list/${list2.name}`).send().expect(200);
  });
});


describe('API list errors', () => {
  const listTestError = {
    items: []
  };
  it('Should error at insert a new list because missing parameters.', async () => {
    await supertest(app).post('/list').send(listTestError).expect(400);
  });
  it('Should error get update list.', async () => {
    await supertest(app).patch('/list/test').send({"namme": "patchtest"}).expect(400);
  });
  it('Should error remove list because not exist.', async () => {
    await supertest(app).delete('/list/notexist').send().expect(404);
  });
});
