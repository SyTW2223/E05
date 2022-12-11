import supertest from 'supertest';
import {app} from '../src/app';
import 'mocha';

/**
 * Testing list
 */

describe('API LIST succes', () => {
    let list = {
        listid: 2,
        name: "list1",
    };
    let list2 = {
        listid: 5,
        name: "list2",
    };
        it('Should successfully insert a new list', async () => {
        await supertest(app).post('/list').send(list).expect(201);
        await supertest(app).post('/list').send(list2).expect(201);
        });
        it('Should successfully get a list2', async () => {
        await supertest(app).get('/list').expect(201);
        /*expect(response.body).to.include({
            listid: '5',
            name: 'test2',
        });*/
        });
        it('Should successfully get update list', async () => {
        await supertest(app).patch('/list').send({"name": "patchtest"}).expect(201);
        //expect(response.body.name).to.equal("patchtest");
        });
        it('Should successfully remove list', async () => {
        await supertest(app).delete('/list/').send(list).expect(201);
        });
        it('Should successfully get all lists', async () => {
        await supertest(app).get('/list').send().expect(200);
        /*expect(response.body).to.include({
            listid: "2",
            name: "patchtest",
        });*/
    });
});

const listTestError = {
    id: 2,
    name: "test",
    description: "test listTest"
}

describe('API list errors', () => {
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