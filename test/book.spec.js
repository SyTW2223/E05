const request = require('supertest');
const app = require('../server');
const bookModel = require("../models/book.model");


/*
  Se comprueba el buen funcionamiento y el envio de errores
  se usa metodos hook para que 'reinicie'
*/
/*
beforeEach(async () => {
  await bookModel.deleteMany();
});*/


// ------------ TEST POST ---------------- //
describe('POST /book', () => {
  it('Should successfully insert a new note', async () => {
    await request(app).post('/book').send({
      title: "book test",
      description: "This is a book test",
    }).expect(200);
  });
});


// ------------ TEST GET ---------------- //


// ------------ TEST PATCH ---------------- //


// ------------ TEST DELETE ---------------- //


