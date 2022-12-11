import supertest from 'supertest'
import {app} from '../src/app';
import 'mocha';
import { Book } from '../src/models/book';


/**
 * Testing método post
 */
describe('POST /book', () => {
  let book = {      
    id: 31,
    name: 'Test',
    description: 'Testing API',
    numberPages: 300,
    publisher: 'Cualquiera',
    rating: 3
  };
  it('Should successfully insert a new book', async () => {
    await supertest(app).post('/book').send(book).expect(201);
  });
  it('Should get an error if we try to insert again', async () => {
    await supertest(app).post('/book').send(book).expect(400);
  });
});
/*
  Se comprueba el buen funcionamiento y el envio de errores
  se usa metodos hook para que 'reinicie'
*/
/*
beforeEach(async () => {
  await bookModel.deleteMany();
});*/


// ------------ TEST POST ---------------- //
/*describe('POST /book', () => {
  it('Should successfully insert a new note', async () => {
    await request(app).post('/book').send({
      title: "book test",
      description: "This is a book test",
    }).expect(200);
  });
});*/


// ------------ TEST GET ---------------- //


// ------------ TEST PATCH ---------------- //


// ------------ TEST DELETE ---------------- //


