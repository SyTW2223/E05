let supertest = require('supertest');
let app = require('../src/server');
let mocha = require('mocha');

/*
 * Testing series
 */
describe('API SERIE succes.', () => {
  let serie = {
    title: "serieTest1",
    description: "test serie1",
    seasons: 3,
    yearPublication: 2021,
    genres: ['Accion'],
    rating: 4
  };

  var dataSerie;

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
    var dataUser = await supertest(app).post(`/user/login`).send(testUser).expect(200);
    var dataAdmin = await supertest(app).post(`/user/login`).send(testAdmin).expect(200);
    tokenAdmin = dataAdmin.body.data.accessToken;
    tokenUser = dataUser.body.data.accessToken;
  });

  it('Should successfully insert a new serie.', async () => {
    dataSerie = await supertest(app)
      .post('/serie')
      .set("x-access-token", tokenAdmin)
      .send(serie)
      .expect(201);

    });
    it('Should successfully get a serie2', async () => {
      await supertest(app)
        .get(`/serie/${dataSerie.body._id}`)
        .send()
        .expect(200);
    });
    it('Should successfully get all series', async () => {
      await supertest(app)
        .get('/serie')
        .send()
        .expect(200);
    });
    it('Should successfully get update a serie', async () => {
      await supertest(app)
        .patch(`/serie/${serie.title}`)
        .set("x-access-token", tokenAdmin)
        .send({"rating": 3})
        .expect(200);
      await supertest(app)
        .patch(`/serie/${serie.title}`)
        .send({"description": "Modify description tests"})
        .set("x-access-token", tokenAdmin)
        .expect(200);

    });
    it('Should successfully remove one serie', async () => {
      await supertest(app)
        .delete(`/serie/${serie.title}`)
        .set("x-access-token", tokenAdmin)
        .send()
        .expect(200);

    });



    it('Should error at insert a new serie because token is not valid.', async () => {
      await supertest(app)
        .post('/serie')
        .send(serie)
        .set("x-access-token", "noSoyValido")
        .expect(401);
    });
    it('Should error at insert a new serie because user does not have permissions.', async () => {
      await supertest(app)
        .post('/serie')
        .send(serie)
        .set("x-access-token", tokenUser)
        .expect(403);
    });
    it('Should error at insert a new serie because not token provided.', async () => {
      await supertest(app)
        .post('/serie')
        .send(serie)
        .expect(403);
    });
    it('Should error at insert a new serie because missing parameters.', async () => {
      await supertest(app)
        .post('/serie')
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
    it('Should error get update serie because worng parameter.', async () => {
      await supertest(app)
        .patch(`/serie/${serie}`)
        .set("x-access-token", tokenAdmin)
        .send({tittle: "patchtest"})
        .expect(400);
    });
    it('Should error remove one serie beacuse not exist.', async () => {
      await supertest(app)
        .delete(`/serie/notexist99565`)
        .set("x-access-token", tokenAdmin)
        .send()
        .expect(404);
    });
});
