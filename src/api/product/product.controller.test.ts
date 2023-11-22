import supertest from 'supertest';
import app from '../../app'
import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import { loginGenerator, userGenerator } from '../utils/testUtils';

const request = supertest(app);

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Product controller', () => {
  describe('POST /api/product', () => {
    test('Should return error: Product name is required. Product description is required', async () => {
      const { email } = await userGenerator(request, 'ADMIN')
      const { token } = await loginGenerator(request, email)
      const product = {
        image: 'https://picsum.photos/100/100',
        name: '',
        description: '',
        price: faker.commerce.price({ min: 10, max: 500, dec: 0 })
      }

      const response = await request.post('/api/product/create').set('Authorization', `Bearer ${token}`).send(product)

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('message')
      expect(response.body.message).toEqual('Error creating product')
      expect(response.body).toHaveProperty('error')
      expect(response.body.error).toEqual('Product name is required. Product description is required')
    })
    test('Should return error: Product name must be at least 4 characters long', async () => {
      const { email } = await userGenerator(request, 'ADMIN')
      const { token } = await loginGenerator(request, email)
      const product = {
        image: 'https://picsum.photos/100/100',
        name: 'abc',
        description: faker.commerce.productDescription(),
        price: faker.commerce.price({ min: 10, max: 500, dec: 0 })
      }

      const response = await request.post('/api/product/create').set('Authorization', `Bearer ${token}`).send(product)

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error')
      expect(response.body.error).toEqual('Product name must be at least 4 characters long')
    })
    test('Should return status 201 Created', async () => {
      const { email } = await userGenerator(request, 'ADMIN')
      const { token } = await loginGenerator(request, email)
      const product = {
        image: 'https://picsum.photos/100/100',
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price({ min: 10, max: 500, dec: 0 })
      }

      const response = await request.post('/api/product/create').set('Authorization', `Bearer ${token}`).send(product)

      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty('message')
      expect(response.body.message).toEqual('Product created successfully')
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
  describe('PUT /api/product/update', () => {
    test('Should return status 200', async () => {
      const { email } = await userGenerator(request, 'ADMIN')
      const { token } = await loginGenerator(request, email)
      const product = {
        image: 'https://picsum.photos/100/100',
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price({ min: 10, max: 500, dec: 0 })
      }

      const { body: { data: productCreateResponse } } = await request.post('/api/product/create').set('Authorization', `Bearer ${token}`).send(product)

      const updatedProduct = {
        _id: productCreateResponse._id,
        price: faker.commerce.price({ min: 10, max: 500, dec: 0 })
      }

      const response = await request.put('/api/product/update').set('Authorization', `Bearer ${token}`).send(updatedProduct)

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('message')
      expect(response.body.message).toEqual('Product updated successfully')
      expect(response.body).toHaveProperty('data')
      expect(response.body.data.price).toEqual(parseInt(updatedProduct.price))
    })
  })
  describe('DELETE /api/product/delete', () => {
    test('Should return status 200', async () => {
      const { email } = await userGenerator(request, 'ADMIN')
      const { token } = await loginGenerator(request, email)

      const product = {
        image: 'https://picsum.photos/100/100',
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price({ min: 10, max: 500, dec: 0 })
      }

      const { body: { data: productCreateResponse } } = await request.post('/api/product/create').set('Authorization', `Bearer ${token}`).send(product)

      const { _id } = productCreateResponse

      const response = await request.delete('/api/product/delete').set('Authorization', `Bearer ${token}`).send({ _id })

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('message')
      expect(response.body.message).toEqual('Product deleted successfully')
      expect(response.body).toHaveProperty('data')
      expect(response.body.data.name).toEqual(product.name)
      expect(response.body.data.description).toEqual(product.description)
    })
  })
})
