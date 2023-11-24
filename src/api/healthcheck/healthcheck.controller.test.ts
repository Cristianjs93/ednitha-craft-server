import supertest from 'supertest';
import app from '../../app';

import mongoose from 'mongoose';

const request = supertest(app);

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Healthcheck endpoint', () => {
  test('should respond with a 200 status code', async () => {
    const res = await request.get('/api/healthcheck');
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Server ok');
  });
});
