import supertest from 'supertest';
import server from '../../app'

const request = supertest(server);

afterAll(async () => {
  server.close()
});

describe('Healthcheck endpoint', () => {
  test('should respond with a 200 status code', async () => {
    const res = await request.get('/api/healthcheck')
    expect(res.statusCode).toEqual(200)
    expect(res.body.message).toEqual('Server ok')
  })
})
