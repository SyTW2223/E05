let supertest = require('supertest');
let app = require('../src/server');
let mocha = require('mocha');

/**
 * Testing list
 */

describe('API LIST succes', () => {
  let list = {
    name: "Lista 1",
  };
  let list2 = {
    name: "Lista 2",
  };
  var dataList;
  var dataList2;
  var obj = {};
  var obj2 = {};

  it('Should successfully insert a new list.', async () => {
    dataList = await supertest(app).post('/list').send(list).expect(201);
    dataList2 = await supertest(app).post('/list').send(list2).expect(201);

    // para obtener _id
    dataList = dataList.text.replace('{', '').replace('}','').replaceAll('"', '').split(',')
    for (var i = 0; i < dataList.length; i++) {
        var split = dataList[i].split(':');
        obj[split[0].trim()] = split[1].trim();
    }

    for (var i = 0; i < dataList.length; i++) {
        var split = dataList[i].split(':');
        obj2[split[0].trim()] = split[1].trim();
    }
  });
  
  it('Should successfully get a list2.', async () => {
    await supertest(app).get(`/list/${obj2._id}`).send().expect(200);  
  });
  it('Should successfully get update a list.', async () => {
    await supertest(app).patch(`/list/${obj._id}`).send({"items": ['ewfg23456fdg']}).expect(200);
    await supertest(app).patch(`/list/${obj._id}`).send({"name": "patch Tests"}).expect(200);
  });
  it('Should successfully remove lists.', async () => {
    await supertest(app).delete(`/list/${obj._id}`).send().expect(200);
    await supertest(app).delete(`/list/${obj2._id}`).send().expect(200);
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
  it('Should error remove list because rute is bad.', async () => {
    await supertest(app).delete('/list/notexist').send().expect(500);
  });
});
