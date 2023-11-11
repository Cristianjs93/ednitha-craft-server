import supertest from 'supertest';
import app from '../../app'
import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';

const request = supertest(app);

afterAll(async () => {
  await mongoose.disconnect();
});

describe('User controller', () => {
  describe('POST /api/user', () => {
    test('Should return error: Name must be at least 3 characters long', async () => {
      const user = {
        email: 'abc123@test.com',
        name: 'ab',
        password: 'Mypassword123',
        role: 'USER'
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
        password: 'Mypassword123',
        role: 'USER'
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
        password: 'Mypassword123',
        role: 'USER'
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
        password: 'Mypassword123',
        role: 'USER'
      }
      const response = await request.post('/api/user/register').send(user)

      expect(response.status).toBe(201)
      expect(response.body.data).toHaveProperty('_id')
      expect(response.body.data).toMatchObject({ name: user.name })
    })
  })
  describe('GET /api/user', () => {
    test('Should return status 200 OK', async () => {
      const response = await request.get('/api/user')

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('message')
      expect(response.body).toHaveProperty('data')
      expect(response.body.message).toEqual('Users listed')
    })
  })
  describe('GET /api/user/email', () => {
    test('Should return error: User not found', async () => {
      const email = 'example@test.com'

      const response = await request.get('/api/user/email').send({ email })

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('message')
      expect(response.body.message).toEqual('Error searching user')
      expect(response.body).toHaveProperty('error')
      expect(response.body.error).toEqual('User not found')
    })
    test('Should return status 200 OK', async () => {
      const user = {
        email: faker.internet.email(),
        name: faker.person.firstName(),
        password: 'Mypassword123',
        role: 'USER'
      }
      const { email } = user

      await request.post('/api/user/register').send(user)
      const response = await request.get('/api/user/email').send({ email })

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('message')
      expect(response.body.message).toEqual('User found')
      expect(response.body).toHaveProperty('data')
      expect(response.body.data.email).toEqual(email)
    })
  })
  describe('PUT /api/user/update', () => {
    test('Should return status 200', async () => {
      const user = {
        email: faker.internet.email(),
        name: faker.person.firstName(),
        password: 'Mypassword123',
        role: 'USER'
      }
      const updatedUser = {
        email: user.email,
        name: 'John Doe'
      }
      await request.post('/api/user/register').send(user)
      const response = await request.put('/api/user/update').send(updatedUser)

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('message')
      expect(response.body.message).toEqual('User updated successfully')
      expect(response.body).toHaveProperty('data')
      expect(response.body.data.name).toEqual(updatedUser.name)
    })
  })
  describe('DELETE /api/user/delete', () => {
    test('Should return status 200', async () => {
      const user = {
        email: faker.internet.email(),
        name: faker.person.firstName(),
        password: 'Mypassword123',
        role: 'USER'
      }
      const { email } = user
      await request.post('/api/user/register').send(user)
      const response = await request.delete('/api/user/delete').send({ email })

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('message')
      expect(response.body.message).toEqual('User deleted successfully')
      expect(response.body).toHaveProperty('data')
      expect(response.body.data.email).toEqual(email)
    })
  })
})
