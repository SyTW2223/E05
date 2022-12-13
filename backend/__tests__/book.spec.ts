import supertest from 'supertest';
import {app} from '../src/app';
import 'mocha';
import { Book } from '../src/models/book';


describe('API BOOK succes', () => {
  before(async () => {
    await Book.deleteMany();
  });
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
      await supertest(app).get('/book').send(book2).expect(200);
    });
    // it('Should successfully update a book', async () => {
    //   await supertest(app).patch('/book').send({name: 'patchtest'}).expect(201);
    // });
    // it('Should successfully remove a book', async () => {
    //   await supertest(app).delete('/book').send(book2).expect(201);
    // });
    it('Should successfully get all books', async () => {
      await supertest(app).get('/book').send().expect(200);
    });
});


describe('API BOOK errors', () => {
  const bookTestError = {
    id: 2,
    name: "test",
    description: "test bookTest"
  };
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
