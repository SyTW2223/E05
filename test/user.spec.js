let supertest = require('supertest');
let app = require('../src/server');
let mocha = require('mocha');


describe('API USER succes', () => {
  let user = {
    id: 0,
    username: "user1",
    email: "user1@ull.edu.es",
    password: "pasword"
  };
  let userLogin = {
    username: "user1",
    password: "pasword"
  };
  let user2 = {
    username: "user2",
    email: "user2@ull.edu.es",
    password: "pasword"
  };
  it('Should successfully insert a new user.', async () => {
    await supertest(app).post('/user').send(user).expect(201);
  });
  it('Should successfully register user.', async () => {
    await supertest(app).post('/user/register').send(user2).expect(201);
  });
  it('Should successfully get a user2.', async () => {
    await supertest(app).get(`/user/${user2.username}`).send().expect(200);
  });
  it('Should successfully get all users.', async () => {
    await supertest(app).get('/user').send().expect(200);
  });
  it('Should successfully login user.', async () => {
    await supertest(app).post('/user/login').send(userLogin).expect(200);
  });
  it('Should successfully get update a user.', async () => {
    await supertest(app).patch(`/user/${user.username}`).send({"email": "change@ull.edu"}).expect(200);
    await supertest(app).patch(`/user/${user2.username}`).send({"password": "password"}).expect(200);
  });
  it('Should successfully remove one user.', async () => {
    await supertest(app).delete(`/user/${user.username}`).send().expect(200);
    await supertest(app).delete(`/user/${user2.username}`).send().expect(200);
  });
});


describe('API USER errors', () => {
  const userTestError = {
    id: 2,
    username: "test",
    email: "test@gmail.com",
    password: "pass"
  };
  const userTestErrorLogin = {
    id: 2,
    username: "test",
    email: "test@gmail.com",
    password: "passwordError"
  };
  it('Should error register user beacuse email is already exist.', async () => {
    await supertest(app).post(`/user/register`).send(userTestError);
    await supertest(app).delete(`/user/register`).send(userTestError).expect(404);
  });
  it('Should error login user beacuse password is wrong.', async () => {
    await supertest(app).delete(`/user/login`).send(userTestErrorLogin).expect(404);
  });
  it('Should error get update user.', async () => {
    await supertest(app).patch(`/user/${userTestError.username}`).send({usernname: "patchtest"}).expect(400);
    await supertest(app).delete(`/user/userTestError`).send();
  });
  it('Should error with get when path is wrong.', async () => {
    await supertest(app).get('/hola').send().expect(404);
  });
  it('Should error remove one user beacuse not exist.', async () => {
    await supertest(app).delete(`/user/usernotexist987654`).send().expect(404);
  });
});
