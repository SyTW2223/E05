import supertest from 'supertest';
import {app} from '../src/app';
import 'mocha';


describe('API BOOK succes', () => {
  let book = {
    id: 2,
    name: "book1",
    description: "test book1"
  };
  let book2 = {
    id: 5,
    name: "book2",
    description: "test book2"
  };
    it('Should successfully insert a new book', async () => {
      await supertest(app).post('/book').send(book).expect(201);
      await supertest(app).post('/book').send(book2).expect(201);
    });
    it('Should successfully get a book2', async () => {
      await supertest(app).get('/book').send(book2).expect(201);
      /*expect(response.body).to.include({
        id: '5',
        name: 'test2',
        description: 'test bookTest2'
      });*/
    });
    it('Should successfully get update book', async () => {
      await supertest(app).patch('/book').send({"name": "patchtest"}).expect(201);
      //expect(response.body.name).to.equal("patchtest");
    });
    it('Should successfully remove book', async () => {
      await supertest(app).delete('/book').send(book2).expect(201);
    });
    it('Should successfully get all books', async () => {
      await supertest(app).get('/book').send().expect(200);
      /*expect(response.body).to.include({
        id: "2",
        name: "patchtest",
        description: "test bookTest"
      });*/
    });
});

const bookTestError = {
  id: 2,
  name: "test",
  description: "test bookTest"
}

describe('API BOOK errors', () => {
  it('Should error at insert a new book', async () => {
    await supertest(app).post('/book').send(bookTestError).expect(400);
  });
  it('Should error get update book', async () => {
    await supertest(app).patch('/book').send({"name": "patchtest"}).expect(400);
  });
  it('Should error remove book', async () => {
    await supertest(app).delete('/book').send({"name": "noexist"}).expect(400);
  });
});
