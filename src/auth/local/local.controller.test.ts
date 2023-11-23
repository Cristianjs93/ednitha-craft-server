import supertest from 'supertest';
import app from '../../app'
import mongoose from 'mongoose';
import { userGenerator } from '../../utils/testUtils';

const request = supertest(app);

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Local controller', () => {
  describe('POST /api/auth/local/login', () => {
    test('Should return error: User is not registered', async () => {
      const login = {
        email: 'random@test.com',
        password: 'Mypassword123'
      }

      const response = await request.post('/api/auth/local/login').send(login)

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error')
      expect(response.body.error).toEqual('User is not registered')
    })
    test('Should return error: Incorrect password', async () => {
      const user = await userGenerator(request, 'USER')

      const login = {
        email: user.email,
        password: 'RandomPassword123'
      }

      const response = await request.post('/api/auth/local/login').send(login)

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error')
      expect(response.body.error).toEqual('Incorrect password')
    })
    test('Should return status 200 Ok', async () => {
      const user = await userGenerator(request, 'USER')

      const login = {
        email: user.email,
        password: 'Mypassword123'
      }

      const response = await request.post('/api/auth/local/login').send(login)

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('token')
      expect(response.body).toHaveProperty('newUser')
      expect(response.body.newUser.email).toEqual(user.email)
    })
  })
})
