import supertest from 'supertest';
import server from '../../app'
import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';

const request = supertest(server);

afterAll(async () => {
  await mongoose.disconnect();
});

describe('User controller', () => {
  describe('GET /api/users', () => {
    test('Should return status 200 OK', async () => {
      const response = await request.get('/api/user')

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('message')
      expect(response.body).toHaveProperty('data')
      expect(response.body.message).toEqual('Users listed')
    })
  })
  describe('POST /api/users', () => {
    test('Should return error: Name must be at least 3 characters long', async () => {
      const user = {
        email: 'abc123@test.com',
        name: 'ab',
        password: faker.internet.password({ length: 10 })
      }

      const response = await request.post('/api/user/register').send(user)

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error')
      expect(response.body.error).toEqual('Name must be at least 3 characters long')
    })
    test('Should return error: Name is not valid. Email is not valid', async () => {
      const user = {
        email: 'abc1@test.com',
        name: 'ab@',
        password: faker.internet.password({ length: 10 })
      }

      const response = await request.post('/api/user/register').send(user)

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error')
      expect(response.body.error).toEqual('Name is not valid. Email is not valid')
    })
    test('Should return error: Email already exists', async () => {
      const user = {
        email: faker.internet.email(),
        name: faker.person.firstName(),
        password: faker.internet.password({ length: 10 })
      }
      const anotherUser = { ...user }

      await request.post('/api/user/register').send(user)
      const response = await request.post('/api/user/register').send(anotherUser)

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error')
      expect(response.body.error).toEqual('Email already exists')
    })
    test('Should return status 201 Created', async () => {
      const user = {
        email: faker.internet.email(),
        name: faker.person.firstName(),
        password: faker.internet.password({ length: 10 })
      }
      const response = await request.post('/api/user/register').send(user)

      expect(response.status).toBe(201)
      expect(response.body.data).toHaveProperty('_id')
      expect(response.body.data).toMatchObject({ name: user.name })
    })
  })
})

server.close()
