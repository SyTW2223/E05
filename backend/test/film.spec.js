let supertest = require('supertest');
let app = require('../src/server');


describe('API FILM succes', () => {
  let film = {
    title: "film1",
    description: "test film1",
    genres: ['Comedia'],
    yearPublication: 2020,
    rating: 5
  };
  var dataFilm;

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

  it('Should successfully insert a new film.', async () => {
    dataFilm = await supertest(app)
      .post('/film')
      .set("x-access-token", tokenAdmin)
      .send(film)
      .expect(201);

    });
    it('Should successfully get a film2', async () => {
      await supertest(app)
        .get(`/film/${dataFilm.body._id}`)
        .send()
        .expect(200);
    });
    it('Should successfully get all films', async () => {
      await supertest(app)
        .get('/film')
        .send()
        .expect(200);
    });
    it('Should successfully get update a film', async () => {
      await supertest(app)
        .patch(`/film/${film.title}`)
        .set("x-access-token", tokenAdmin)
        .send({"rating": 3})
        .expect(200);
      await supertest(app)
        .patch(`/film/${film.title}`)
        .send({"description": "Modify description tests"})
        .set("x-access-token", tokenAdmin)
        .expect(200);

    });
    it('Should successfully remove one film', async () => {
      await supertest(app)
        .delete(`/film/${film.title}`)
        .set("x-access-token", tokenAdmin)
        .send()
        .expect(200);

    });



    it('Should error at insert a new film because token is not valid.', async () => {
      await supertest(app)
        .post('/film')
        .send(film)
        .set("x-access-token", "noSoyValido")
        .expect(401);
    });
    it('Should error at insert a new film because user does not have permissions.', async () => {
      await supertest(app)
        .post('/film')
        .send(film)
        .set("x-access-token", tokenUser)
        .expect(403);
    });
    it('Should error at insert a new film because not token provided.', async () => {
      await supertest(app)
        .post('/film')
        .send(film)
        .expect(403);
    });
    it('Should error at insert a new film because missing parameters.', async () => {
      await supertest(app)
        .post('/film')
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
    it('Should error get update film because worng parameter.', async () => {
      await supertest(app)
        .patch(`/film/${film}`)
        .set("x-access-token", tokenAdmin)
        .send({tittle: "patchtest"})
        .expect(400);
    });
    it('Should error remove one film beacuse not exist.', async () => {
      await supertest(app)
        .delete(`/film/notexist99565`)
        .set("x-access-token", tokenAdmin)
        .send()
        .expect(404);
    });
});
