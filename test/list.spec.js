let supertest = require('supertest');
let app = require('../src/server');
let mocha = require('mocha');
let List = require('../src/models/list.model');

/**
 * Testing list
 */

describe('API LIST succes', () => {
  let list = {
    id: 2,
    name: "lista2",
    items: [1,3,4,5],
    users: [1,3,2],
  };
  let list2 = {
    name: "lista4",
    id: 4,
    items: [1,3,4,5],
    users: [1,3,2],
  };
  it('Should successfully insert a new list', async () => {
    await supertest(app).post('/list').send(list).expect(201);
    await supertest(app).post('/list').send(list2).expect(201);
  });
  it('Should successfully get a list2', async () => {
    await supertest(app).get(`/list/${list.name}`).send().expect(200);  
  });
  it('Should successfully get update a list', async () => {
    await supertest(app).patch(`/list/${list.name}`).send({"users": [1,2,6,7]}).expect(200);
    await supertest(app).patch(`/list/${list.name}`).send({"items": [3,6,7,8]}).expect(200);
    await supertest(app).patch(`/list/${list.name}`).send({"name": "Lista Tests"}).expect(200);
  });
  it('Should successfully remove a list2', async () => {
    await supertest(app).delete(`/list/${list.name}`).send().expect(200);
    await supertest(app).delete(`/list/${list2.name}`).send().expect(200);
  });
});


describe('API list errors', () => {
  const listTestError = {
    name: "test",
    description: "test listTest"
  };
  it('Should error at insert a new list', async () => {
    await supertest(app).post('/list').send(listTestError).expect(500);
  });
  it('Should error get update list', async () => {
    await supertest(app).patch('/list/test').send({"namme": "patchtest"}).expect(400);
  });
  it('Should error remove list', async () => {
    await supertest(app).delete('/list/notexist').send().expect(404);
  });
});
