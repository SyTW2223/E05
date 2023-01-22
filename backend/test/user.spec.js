let supertest = require('supertest');
let app = require('../src/server');
let mocha = require('mocha');


describe('API USER succes', () => {
  let user = {
    username: "user1",
    email: "user1@ull.edu.es",
    password: "pasword",
    role: ["ADMIN"]
  };
  let userLogin = {
    username: "user1",
    password: "pasword",
  };
  let user2 = {
    username: "user2",
    email: "user2@ull.edu.es",
    password: "pasword",
  };
  let user2Login = {
    username: "user2",
    password: "pasword",
  };
  var dataUser;
  var dataUser2;

  it('Should successfully insert a new user.', async () => {
    await supertest(app).post('/user').send(user).expect(201);
  });
  it('Should successfully register user.', async () => {
    await supertest(app).post('/user/register').send(user2).expect(201);
  });
  it('Should successfully login user.', async () => {
    dataUser = await supertest(app).post('/user/login').send(userLogin).expect(200);
    dataUser2 = await supertest(app).post('/user/login').send(user2Login).expect(200);
  });
  it('Should successfully get a user2.', async () => {
    await supertest(app).get(`/user/${user.username}`).send().expect(200);
  });
  it('Should successfully get all users.', async () => {
    await supertest(app).get('/user').send().expect(200);
  });
  it('Should successfully get update a user.', async () => {
    await supertest(app).patch(`/user/${user.username}`).send({"email": "change@ull.edu"}).expect(200);
  });
  it('Should successfully remove users.', async () => {
    const token = dataUser.body.data.accessToken;
    await supertest(app).delete(`/user/${user2.username}`).set("x-access-token", token).send().expect(200);
    await supertest(app).delete(`/user/${user.username}`).set("x-access-token", token).send().expect(200);
  });
});


describe('API USER errors', () => {
  const userTestError = {
    username: "test",
    email: "test@gmail.com",
    password: "pass"
  };
  const userTestErrorLogin = {
    username: "test",
    email: "test@gmail.com",
    password: "passwordError"
  };
  it('Should error register user because email is already exist.', async () => {
    await supertest(app).post(`/user/register`).send(userTestError);
    await supertest(app).post(`/user/register`).send(userTestErrorLogin).expect(400);
  });
  it('Should error login user beacuse password is wrong.', async () => {
    await supertest(app).post(`/user/login`).send(userTestErrorLogin).expect(400);
  });
  it('Should error get update user.', async () => {
    await supertest(app).patch(`/user/${userTestError.username}`).send({usernname: "patchtest"}).expect(400);
    await supertest(app).delete(`/user/userTestError`).send();
  });
  it('Should error with get when path is wrong.', async () => {
    await supertest(app).get('/hola').send().expect(404);
  });
  it('Should error with delete user when the token is not sent.', async () => {
    await supertest(app).delete(`/user/${userTestError.username}`).send().expect(403);
  });
  it('Should error with delete user when the token is empty.', async () => {
    await supertest(app).delete(`/user/${userTestError.username}`).set("x-access-token", "").send().expect(403);
  });
});
