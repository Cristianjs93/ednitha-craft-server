import supertest from 'supertest';
import server from '../../app'
import { faker } from '@faker-js/faker';

const request = supertest(server);

afterAll(async () => {
  server.close()
});

describe('User controller', () => {
  describe('POST /api/users', () => {
    test('Should return 201 Created', async () => {
      const user = {
        email: faker.internet.email(),
        name: faker.person.firstName()
      }
      const response = await request.post('/api/user/register').send(user)

      expect(response.status).toBe(201)
    })
  })
})
