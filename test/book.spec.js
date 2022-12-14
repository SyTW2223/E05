let supertest = require('supertest');
let app = require('../src/server');
let mocha = require('mocha');
let Book = require('../src/models/book.model');


describe('API BOOK succes', () => {
  let book = {
    id: 2,
    title: "book1",
    description: "test book1"
  };
  let book2 = {
    id: 5,
    title: "book2",
    description: "test book2"
  };
  it('Should successfully insert a new book', async () => {
    await supertest(app).post('/book').send(book).expect(201);
    await supertest(app).post('/book').send(book2).expect(201);
  });

  it('Should successfully get a book2', async () => {
    await supertest(app).get('/book?title=' + book.title).send().expect(200);
  });
  it('Should successfully get all books', async () => {
    await supertest(app).get('/book').send().expect(200);
  });
  it('Should successfully get update a book', async () => {
    await supertest(app).patch(`/book/${book.title}`).send({"rating": 3}).expect(200);
    await supertest(app).patch(`/book/${book2.title}`).send({"description": "Modify description tests"}).expect(200);
    await supertest(app).patch(`/book/${book2.title}`).send({"title": "modify_title"}).expect(200);
  });
  it('Should successfully remove one book', async () => {
    await supertest(app).delete(`/book/${book.title}`).send().expect(200);
    await supertest(app).delete(`/book/modify_title`).send().expect(200);
  });
});


describe('API BOOK errors', () => {
  const bookTestError = {
    id: 2,
    title: "test",
    description: "book tests"
  };
  const bookParamError = {
    id: 2,
    title: "test2",
  };
  it('Should error at insert a new book with wrong parameters.', async () => {
    await supertest(app).post('/book').send(bookParamError).expect(500);
  });
  it('Should error with get when path is wrong.', async () => {
    await supertest(app).get('/hola').send().expect(404);
  });
  it('Should error get update book.', async () => {
    await supertest(app).patch(`/book/${bookTestError.title}`).send({tittle: "patchtest"}).expect(400);
  });
  it('Should error remove one book beacuse not exist.', async () => {
    await supertest(app).delete(`/book/${bookParamError.title}`).send().expect(404);
  });
});
