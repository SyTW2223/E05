import supertest from 'supertest'
import {app} from '../src/app';

describe('POST /film', () => {
    it('Should successfully insert a new film', async () => {
      await supertest(app).post('/film').send({
        
      }).expect(201);
    });
  });