import supertest from 'supertest';
import {app} from '../src/app';
import 'mocha';

/**
 * Testing método post
 */

const book1 = {
  id: 2,
  title: "test",
  description: "test bookTest"
}
const book2 = {
  id: 5,
  title: "test2",
  description: "test bookTest2"
}


describe('API BOOK succes', () => {
    it('Should successfully insert a new book', async () => {
      await supertest(app).post('/book').send(book1).expect(200);
      await supertest(app).post('/book').send(book2).expect(201);
    });
    it('Should successfully get a bookTest2', async () => {
      const response = await supertest(app).get('/book/test2').expect(201);
      /*expect(response.body).to.include({
        id: '5',
        title: 'test2',
        description: 'test bookTest2'
      });*/
    });
    it('Should successfully get update book', async () => {
      const response = await supertest(app).patch('/book/book1').send({"title": "patchtest"}).expect(201);
      //expect(response.body.title).to.equal("patchtest");
    });
    it('Should successfully remove book', async () => {
      await supertest(app).delete('/book/book2').send(book2).expect(201);
    });
    it('Should successfully get all books', async () => {
      const response = await supertest(app).get('/book').send().expect(201);
      /*expect(response.body).to.include({
        id: "2",
        title: "patchtest",
        description: "test bookTest"
      });*/
    });
});

const bookTestError = {
  id: 2,
  title: "test",
  description: "test bookTest"
}

describe('API BOOK errors', () => {
  it('Should error at insert a new book', async () => {
    await supertest(app).post('/book').send(bookTestError).expect(400);
  });
  it('Should error get update book', async () => {
    await supertest(app).patch('/book/noexist').send({"title": "patchtest"}).expect(501);
  });
  it('Should error remove book', async () => {
    await supertest(app).delete('/book/noexist').send().expect(501);
  });
});
