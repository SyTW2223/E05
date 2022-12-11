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

/**
 * Testing método get
 */
//  describe('GET /book', () => {
//   let book = {      
//     id: 31,
//     name: 'Test',
//     description: 'Testing API',
//     numberPages: 300,
//     publisher: 'Cualquiera',
//     rating: 3
//   };
//   it('Should successfully get all books', async () => {
//     await supertest(app).get('/book').send(book).expect(200);
//   });
// });
