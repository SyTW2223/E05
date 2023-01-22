let supertest = require('supertest');
let app = require('../src/server');


describe('API BOOK', () => {
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

  // se necesita usuarios admin y user para comprobar la autenticacion. Existen los usuarios TestUser y TestAdmin en atlas /test
  // loguearlos para conseguir su token
  let testUser = {
    username: "TestUser",
    password: "TestUser"
  }
  let testAdmin = {
    username: "TestAdmin",
    password: "TestAdmin"
  }
  var tokenAdmin = "";
  var tokenUser = "";


  it('Se loguean los dos usuarios correctamente para comprobar autorizacion', async () => {
    var dataUser = await supertest(app)
      .post(`/user/login`)
      .send(testUser)
      .expect(200);
    var dataAdmin = await supertest(app)
      .post(`/user/login`)
      .send(testAdmin)
      .expect(200);
    tokenAdmin = dataAdmin.body.data.accessToken;
    tokenUser = dataUser.body.data.accessToken;
  });

  it('Should successfully insert a new book.', async () => {
    dataBook = await supertest(app)
      .post('/book')
      .set("x-access-token", tokenAdmin)
      .send(book)
      .expect(201);

    dataBook2 = await supertest(app)
      .post('/book')
      .set("x-access-token", tokenAdmin)
      .send(book2)
      .expect(201);
    });
    it('Should successfully get a book2', async () => {
      await supertest(app)
        .get(`/book/${dataBook.body._id}`)
        .send()
        .expect(200);
    });
    it('Should successfully get all books', async () => {
      await supertest(app)
        .get('/book')
        .send()
        .expect(200);
    });
    it('Should successfully get update a book', async () => {
      await supertest(app)
        .patch(`/book/${book.title}`)
        .set("x-access-token", tokenAdmin)
        .send({"rating": 3})
        .expect(200);
      await supertest(app)
        .patch(`/book/${book2.title}`)
        .send({"description": "Modify description tests"})
        .set("x-access-token", tokenAdmin)
        .expect(200);
      await supertest(app)
        .patch(`/book/${book2.title}`)
        .set("x-access-token", tokenAdmin)
        .send({"title": "modify_title"})
        .expect(200);
    });
    it('Should successfully remove one book', async () => {
      await supertest(app)
        .delete(`/book/${book.title}`)
        .set("x-access-token", tokenAdmin)
        .send()
        .expect(200);

      await supertest(app)
        .delete(`/book/modify_title`)
        .set("x-access-token", tokenAdmin)
        .send()
        .expect(200);
    });



    it('Should error at insert a new book because token is not valid.', async () => {
      await supertest(app)
        .post('/book')
        .send(book)
        .set("x-access-token", "noSoyValido")
        .expect(401);
    });
    it('Should error at insert a new book because user does not have permissions.', async () => {
      await supertest(app)
        .post('/book')
        .send(book2)
        .set("x-access-token", tokenUser)
        .expect(403);
    });
    it('Should error at insert a new book because not token provided.', async () => {
      await supertest(app)
        .post('/book')
        .send(book)
        .expect(403);
    });
    it('Should error at insert a new book because missing parameters.', async () => {
      await supertest(app)
        .post('/book')
        .send({description: "test", yearPublication: 1256})
        .set("x-access-token", tokenAdmin)
        .expect(500);
    });
    it('Should error with get when path is wrong.', async () => {
      await supertest(app)
        .get('/hola')
        .send()
        .expect(404);
    });
    it('Should error get update book because worng parameter.', async () => {
      await supertest(app)
        .patch(`/book/${book}`)
        .set("x-access-token", tokenAdmin)
        .send({tittle: "patchtest"})
        .expect(400);
    });
    it('Should error remove one book beacuse not exist.', async () => {
      await supertest(app)
        .delete(`/book/notexist99565`)
        .set("x-access-token", tokenAdmin)
        .send()
        .expect(404);
    });
  });
