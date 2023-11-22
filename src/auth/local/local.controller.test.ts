import supertest from 'supertest';
import app from '../../app'
import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';

const request = supertest(app);

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Local controller', () => {
  describe('POST /api/auth/local/login', () => {
    test('Should return error: User is not registered', async () => {
      const user = {
        email: faker.internet.email({ firstName: faker.person.firstName(), lastName: faker.person.lastName(), provider: 'test.com', allowSpecialCharacters: true }),
        name: faker.person.firstName(),
        lastname: faker.person.lastName(),
        password: 'Mypassword123',
        role: 'USER'
      }

      await request.post('/api/user/register').send(user)

      const login = {
        email: 'random@test.com',
        password: user.password
      }

      const response = await request.post('/api/auth/local/login').send(login)

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error')
      expect(response.body.error).toEqual('User is not registered')
    })
    test('Should return error: Incorrect password', async () => {
      const user = {
        email: faker.internet.email({ firstName: faker.person.firstName(), lastName: faker.person.lastName(), provider: 'test.com', allowSpecialCharacters: true }),
        name: faker.person.firstName(),
        lastname: faker.person.lastName(),
        password: 'Mypassword123',
        role: 'USER'
      }

      await request.post('/api/user/register').send(user)

      const login = {
        email: user.email,
        password: '123'
      }

      const response = await request.post('/api/auth/local/login').send(login)

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error')
      expect(response.body.error).toEqual('Incorrect password')
    })
    test('Should return status 200 Ok', async () => {
      const user = {
        email: faker.internet.email({ firstName: faker.person.firstName(), lastName: faker.person.lastName(), provider: 'test.com', allowSpecialCharacters: true }),
        name: faker.person.firstName(),
        lastname: faker.person.lastName(),
        password: 'Mypassword123',
        role: 'USER'
      }

      await request.post('/api/user/register').send(user)

      const login = {
        email: user.email,
        password: user.password
      }

      const response = await request.post('/api/auth/local/login').send(login)

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('token')
      expect(response.body).toHaveProperty('newUser')
      expect(response.body.newUser.email).toEqual(user.email)
    })
  })
})
