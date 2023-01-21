let supertest = require('supertest');
let app = require('../src/server');
let mocha = require('mocha');


describe('API BOOK succes', () => {
  let book = {
    title: "book1",
    description: "test book1",
    author: "prueba",
    saga: "prueba",
    genres: ["Comedia"],
    yearPublication: 2020,
    rating: 1
  };
  let book2 = {
    title: "book2",
    description: "test book2",
    author: "prueba2",
    saga: "prueba2",
    genres: ["Comedia", "Romance"],
    yearPublication: 2019,
    rating: 9
  };
  var dataBook;
  var dataBook2;
  var obj = {};
  var obj2 = {};

  it('Should successfully insert a new book.', async () => {
    dataBook = await supertest(app).post('/book').send(book).expect(201);
    dataBook2 = await supertest(app).post('/book').send(book2).expect(201);

    // para obtener _id
    dataBook = dataBook.text.replace('{', '').replace('}','').replaceAll('"', '').split(',')
    for (var i = 0; i < dataBook.length; i++) {
        var split = dataBook[i].split(':');
        obj[split[0].trim()] = split[1].trim();
    }

    for (var i = 0; i < dataBook.length; i++) {
        var split = dataBook[i].split(':');
        obj2[split[0].trim()] = split[1].trim();
    }
  });


  it('Should successfully get a book2', async () => {
    await supertest(app).get(`/book/${obj2._id}`).send().expect(200);
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
    title: "test",
    description: "book tests"
  };
  const bookParamError = {
    title: "test2"
  };
  it('Should error at insert a new book because missing parameters.', async () => {
    await supertest(app).post('/book').send(bookParamError).expect(500);
  });
  it('Should error with get when path is wrong.', async () => {
    await supertest(app).get('/hola').send().expect(404);
  });
  it('Should error get update book because worng parameter.', async () => {
    await supertest(app).patch(`/book/${bookTestError.title}`).send({tittle: "patchtest"}).expect(400);
  });
  it('Should error remove one book beacuse not exist.', async () => {
    await supertest(app).delete(`/book/notexist99565`).send().expect(404);
  });
});
