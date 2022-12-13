const request = require('supertest');
const mocha = require('mocha');
const book = require('../routes/book.routes');
const { expect } = require('chai');


const bookTest = {
  id: 2,
  title: "test",
  description: "test bookTest"
}
const bookTest2 = {
  id: 5,
  title: "test2",
  description: "test bookTest2"
}

describe('API BOOK succes', () => {
    it('Should successfully insert a new book', async () => {
      await request(book).post('/book').send(bookTest).expect(201);
      await request(book).post('/book').send(bookTest2).expect(201);
    });
    it('Should successfully get a bookTest2', async () => {
      const response = await request(book).get('/book/test2').send().expect(201);
      expect(response.body).to.include({
        id: '5',
        title: 'test2',
        description: 'test bookTest2'
      });
    });
    it('Should successfully get update book', async () => {
      const response = await request(book).patch('/book/bookTest').send({"title": "patchtest"}).expect(201);
      expect(response.body.title).to.equal("patchtest");
    });
    it('Should successfully remove book', async () => {
      await request(book).delete('/book/bookTest2').send().expect(201);
    });
    it('Should successfully get all books', async () => {
      const response = await request(book).get('/book').send().expect(201);
      expect(response.body).to.include({
        id: "2",
        title: "patchtest",
        description: "test bookTest"
      });
    });
});

const bookTestError = {
  id: 2,
  title: "test",
  description: "test bookTest"
}

describe('API BOOK errors', () => {
  it('Should error at insert a new book', async () => {
    await request(book).post('/book').send(bookTestError).expect(400);
  });
  it('Should error get update book', async () => {
    await request(book).patch('/book/bookTest').send({"title": "cambiotitle"}).expect(400);
  });
  it('Should error remove book', async () => {
    await request(book).delete('/book/noexist').send().expect(400);
  });
  it('Should error rute', async () => {
    await request(book).get('/books').send().expect(400);
  });
});