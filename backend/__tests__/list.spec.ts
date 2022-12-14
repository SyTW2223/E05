import supertest from 'supertest';
import {app} from '../src/app';
import 'mocha';
import { List } from '../src/models/list';

/**
 * Testing list
 */
describe('API LIST succes', () => {
  before(async () => {
    await List.deleteMany();
  });
  let list = {
    itemsId: [1,3,4,5],
    usersId: [1,3,2],
    name: "Lista2",
    listId: 2
  };
  let list2 = {
    itemsId: [1,3,4,5],
    usersId: [1,3,2],
    name: "Lista4",
    listId: 4
  };
  it('Should successfully insert a new list', async () => {
    await supertest(app).post('/list').send(list).expect(201);
    await supertest(app).post('/list').send(list2).expect(201);
  });
  it('Should successfully get a list2', async () => {
    await supertest(app).get('/list').send(list2).expect(200);  
  });
  it('Should successfully get update a list', async () => {
    await supertest(app).patch('/list?name=' + list.name).send({"usersId": [1,2,6,7]}).expect(200);
    await supertest(app).patch('/list?name=' + list.name).send({"itemsId": [3,6,7,8]}).expect(200);
    await supertest(app).patch('/list?name=' + list.name).send({"name": "Lista Tests"}).expect(200);
  });
  it('Should successfully remove a list2', async () => {
    await supertest(app).delete('/list?name=' + list2.name).send().expect(200);
  });
  it('Should successfully get all lists', async () => {
    await supertest(app).get('/list').send().expect(200);
  });
});


describe('API list errors', () => {
  const listTestError = {
    id: 2,
    name: "test",
    description: "test listTest"
  };
  it('Should error at insert a new list', async () => {
    await supertest(app).post('/list').send(listTestError).expect(400);
  });
  it('Should error get update list', async () => {
    await supertest(app).patch('/list').send({"name": "patchtest"}).expect(400);
  });
  it('Should error remove list', async () => {
    await supertest(app).delete('/list').send({"name": "noexist"}).expect(400);
  });
});