import supertest from 'supertest';
import app from '../../app'
import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';

const request = supertest(app);

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Product controller', () => {
  describe('POST /api/product', () => {
    test('Should return error: Product name is required. Product description is required', async () => {
      const product = {
        image: 'https://picsum.photos/100/100',
        name: '',
        description: '',
        price: faker.commerce.price({ min: 10, max: 500, dec: 0 })
      }

      const response = await request.post('/api/product/create').send(product)

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('message')
      expect(response.body.message).toEqual('Error creating product')
      expect(response.body).toHaveProperty('error')
      expect(response.body.error).toEqual('Product name is required. Product description is required')
    })
    test('Should return error: Product name must be at least 4 characters long', async () => {
      const product = {
        image: 'https://picsum.photos/100/100',
        name: 'abc',
        description: faker.commerce.productDescription(),
        price: faker.commerce.price({ min: 10, max: 500, dec: 0 })
      }

      const response = await request.post('/api/product/create').send(product)

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error')
      expect(response.body.error).toEqual('Product name must be at least 4 characters long')
    })
    test('Should return status 201 Created', async () => {
      const product = {
        image: 'https://picsum.photos/100/100',
        name: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price({ min: 10, max: 500, dec: 0 })
      }

      const response = await request.post('/api/product/create').send(product)

      expect(response.status).toBe(201)
      expect(response.body.data).toHaveProperty('_id')
      expect(response.body.data).toMatchObject({ name: product.name })
    })
  })
  describe('GET /api/product', () => {
    test('Should return status 200 OK', async () => {
      const response = await request.get('/api/product')

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('message')
      expect(response.body).toHaveProperty('data')
      expect(response.body.message).toEqual('Products listed')
    })
  })
  // describe('GET /api/users/email', () => {
  //   test('Should return error: User not found', async () => {
  //     const email = 'example@test.com'

  //     const response = await request.get('/api/user/email').send({ email })

  //     expect(response.status).toBe(400)
  //     expect(response.body).toHaveProperty('message')
  //     expect(response.body.message).toEqual('Error searching user')
  //     expect(response.body).toHaveProperty('error')
  //     expect(response.body.error).toEqual('User not found')
  //   })
  //   test('Should return status 200 OK', async () => {
  //     const user = {
  //       email: faker.internet.email(),
  //       name: faker.person.firstName(),
  //       password: 'Mypassword123',
  //       role: 'USER'
  //     }
  //     const { email } = user

  //     await request.post('/api/user/register').send(user)
  //     const response = await request.get('/api/user/email').send({ email })

  //     expect(response.status).toBe(200)
  //     expect(response.body).toHaveProperty('message')
  //     expect(response.body.message).toEqual('User found')
  //     expect(response.body).toHaveProperty('data')
  //     expect(response.body.data.email).toEqual(email)
  //   })
  // })
  // describe('PUT /api/users/update', () => {
  //   test('Should return status 200', async () => {
  //     const user = {
  //       email: faker.internet.email(),
  //       name: faker.person.firstName(),
  //       password: 'Mypassword123',
  //       role: 'USER'
  //     }
  //     const updatedUser = {
  //       email: user.email,
  //       name: 'John Doe'
  //     }
  //     await request.post('/api/user/register').send(user)
  //     const response = await request.put('/api/user/update').send(updatedUser)

  //     expect(response.status).toBe(200)
  //     expect(response.body).toHaveProperty('message')
  //     expect(response.body.message).toEqual('User updated successfully')
  //     expect(response.body).toHaveProperty('data')
  //     expect(response.body.data.name).toEqual(updatedUser.name)
  //   })
  // })
  // describe('DELETE /api/users/delete', () => {
  //   test('Should return status 200', async () => {
  //     const user = {
  //       email: faker.internet.email(),
  //       name: faker.person.firstName(),
  //       password: 'Mypassword123',
  //       role: 'USER'
  //     }
  //     const { email } = user
  //     await request.post('/api/user/register').send(user)
  //     const response = await request.delete('/api/user/delete').send({ email })

  //     expect(response.status).toBe(200)
  //     expect(response.body).toHaveProperty('message')
  //     expect(response.body.message).toEqual('User deleted successfully')
  //     expect(response.body).toHaveProperty('data')
  //     expect(response.body.data.email).toEqual(email)
  //   })
  // })
})
